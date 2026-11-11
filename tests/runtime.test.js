const {test}=require('node:test');
const assert=require('node:assert/strict');
const project=require('../game.json');
global.NonogramCore=require('../logic/core');
global.NonogramLevels=require('../logic/levels');
global.QuietForestSession=require('../logic/session');
global.QuietForestLayouts={};
global.localStorage={getItem:()=>null,setItem:()=>{}};
global.gdjs={evtTools:{runtimeScene:{replaceScene:(scene,name)=>{scene.destination=name;}},input:{
  getCursorX:s=>s.pointer?.x||0,getCursorY:s=>s.pointer?.y||0,isKeyPressed:()=>false}}};
require('../logic/runtime');
const api=global.QuietForestGD;
function scene(name,game){
  const data=project.layouts.find(s=>s.name===name),objects={};
  const s={pointer:{x:0,y:0},getObjects:n=>objects[n]||[],getGame:()=>game,getElapsedTime:()=>100};
  for(const i of data.instances){
    const v=Object.fromEntries((i.initialVariables||[]).map(v=>[v.name,v.value]));
    const o={x:i.x,y:i.y,w:i.width,h:i.height,animation:0,opacity:255,hidden:false,
      getX(){return this.x},getY(){return this.y},getWidth(){return this.w},getHeight(){return this.h},
      setX(x){this.x=x},setPosition(x,y){this.x=x;this.y=y},setWidth(w){this.w=w},setHeight(h){this.h=h},
      setAnimation(a){if(i.name.startsWith('Discovery_')&&a===1&&this.animation!==1){this.w*=5.12;this.h*=5.12;}this.animation=a},setOpacity(a){this.opacity=a},hide(h=true){this.hidden=h},
      setString(s){this.string=s},setColor(c){this.color=c},isHidden(){return this.hidden},
      cursorOnObject(){const {x,y}=s.pointer;return x>=this.x&&x<=this.x+this.w&&y>=this.y&&y<=this.y+this.h},
      getVariables(){return {get:n=>({getAsString:()=>v[n],getAsNumber:()=>Number(v[n])})}}};
    (objects[i.name]??=[]).push(o);
  }
  return s;
}
for(const level of global.NonogramLevels)test(`GDevelop adapter completes scene cycle: ${level.id}`,()=>{
  const input={isMouseButtonPressed:()=>false,isMouseButtonReleased:()=>false,getMouseWheelDeltaX:()=>0,getMouseWheelDelta:()=>0};
  const game={getInputManager:()=>input};
  const puzzle=scene(api.sceneFor(level.id),game);
  const chapter=level.chapter||1,forestName=chapter===1?'Forest':`Forest_0${chapter}`;
  const firstCell=project.layouts.find(s=>s.name===api.sceneFor(level.id)).instances.find(i=>i.name==='Cell');
  global.QuietForestLayouts[level.id]={x:firstCell.x,y:firstCell.y,cell:firstCell.width};
  api.enter(puzzle,'puzzle',level.id);
  api.command(puzzle,'back');assert.equal(puzzle.destination,forestName);
  for(let y=0;y<level.grid.length;y++)for(let x=0;x<level.grid[y].length;x++)if(level.grid[y][x])api.applyCell(puzzle,x,y,1);
  assert.equal(puzzle.__qf.phase,'morph');
  assert.deepEqual(game.__quietForest.completed,[level.id]);
  for(let i=0;i<23;i++)api.tick(puzzle);
  assert.equal(puzzle.destination,'Reward');
  assert.equal(puzzle.getObjects('RewardArt')[0].opacity,255);
  const reward=scene('Reward',game);api.enter(reward,'reward');
  assert.equal(reward.getObjects('Art_'+level.id)[0].hidden,false);
  api.command(reward,'next');assert.equal(reward.destination,forestName);
  const forest=scene(forestName,game);api.enter(forest,'forest',chapter);
  const art=forest.getObjects('ForestArt_'+level.id)[0];
  assert.equal(art.hidden,false);
  assert.equal(art.opacity,0);
  const stillLocked=global.NonogramLevels.filter(l=>l.id!==level.id&&(l.chapter||1)===chapter);
  assert.ok(stillLocked.every(l=>forest.getObjects('ForestArt_'+l.id)[0].hidden));
  const anchor={x:art.x,y:art.y,w:art.w,h:art.h};
  const home=project.layouts.find(s=>s.name===forestName).instances.find(i=>i.name==='Discovery_'+level.id);
  assert.equal(forest.getObjects('Discovery_'+level.id)[0].getWidth(),home.width);
  assert.equal(forest.__qf.revealId,level.id);
  for(let i=0;i<24;i++)api.tick(forest);
  assert.equal(forest.__qf.revealId,null);
  assert.equal(art.opacity,255);
  assert.equal(forest.getObjects('Discovery_'+level.id)[0].opacity,0);
  assert.deepEqual({x:art.x,y:art.y,w:art.w,h:art.h},anchor);
  assert.equal(forest.getObjects('RevealRing')[0].hidden,true);
});
test('ten finds finish the standalone level without a route into another location',()=>{
  const game={__quietForest:{completed:global.NonogramLevels.map(l=>l.id),sessions:{},autoCross:true}};
  const forest=scene('Forest',game);api.enter(forest,'forest');
  assert.match(forest.getObjects('ForestCaption')[0].string,/Глава завершена/);
  api.command(forest,'nextChapter');assert.equal(forest.destination,undefined);
});
test('scrolls both landscape tiles and markers, keeps cards fixed, and does not open a puzzle after dragging',()=>{
  let held=false,released=false;
  const input={isMouseButtonPressed:i=>i===0&&held,isMouseButtonReleased:i=>i===0&&released,getMouseWheelDeltaX:()=>0,getMouseWheelDelta:()=>0};
  const game={getInputManager:()=>input},forest=scene('Forest',game);
  api.enter(forest,'forest');
  const get=n=>forest.getObjects(n)[0];
  const bg=get('ForestBackground'),east=get('ForestExtension'),slot=get('Discovery_fox'),card=get('Card_mushroom'),art=get('ForestArt_fox');
  const start=bg.x,slotStart=slot.x,cardStart=card.x,artStart=art.x;
  assert.equal(east.x,bg.x+bg.w);
  assert.equal(global.NonogramLevels.filter(l=>get('Discovery_'+l.id)).length,10);
  function frame(x,y,h=false,r=false){forest.pointer={x,y};held=h;released=r;api.tick(forest);}
  frame(0,0);frame(0,0);frame(0,0);
  frame(1100,360,true);frame(400,360,true);frame(200,710,false,true);
  assert.equal(forest.destination,undefined);
  assert.equal(bg.x,start-900);assert.equal(slot.x,slotStart-900);assert.equal(art.x,artStart-900);assert.equal(card.x,cardStart);
  frame(1165,663,false,true);assert.equal(east.x,start);
  frame(slot.x+slot.w/2,slot.y+slot.h/2,false,true);assert.equal(forest.destination,'Nonogram_fox');
  frame(60,637,false,true);assert.equal(bg.x,start);
  frame(card.x+20,card.y+20,false,true);assert.equal(forest.destination,'Nonogram');
});
