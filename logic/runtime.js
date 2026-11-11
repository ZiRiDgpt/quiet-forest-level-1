/* GDevelop adapter. Every visible game element is a native Sprite or Text object.
   This file is compiled into scene events by tools/build-project.py. */
(function(root){
  'use strict';
  if(root.QuietForestGD)return;
  const C=root.NonogramCore,S=root.QuietForestSession,levels=root.NonogramLevels;
  const KEY='quiet-forest-level-1-v1',INK='37;62;52',GRAY='153;163;147';
  const clone=v=>JSON.parse(JSON.stringify(v));
  const obj=(scene,name)=>scene.getObjects(name)[0];
  const text=(scene,name,value)=>{const o=obj(scene,name);if(o)o.setString(String(value));};
  function state(scene){
    const game=scene.getGame();
    if(!game.__quietForest){
      let saved={completed:[],sessions:{},autoCross:true};
      try{const raw=JSON.parse(localStorage.getItem(KEY));if(raw&&Array.isArray(raw.completed)&&raw.sessions&&typeof raw.sessions==='object'){saved={completed:raw.completed.filter(id=>levels.some(l=>l.id===id)),sessions:raw.sessions,autoCross:raw.autoCross!==false};}}catch(_){saved.storageWarning=true;}
      game.__quietForest=saved;
    }
    return game.__quietForest;
  }
  function persist(scene){
    const s=state(scene);
    try{localStorage.setItem(KEY,JSON.stringify({completed:s.completed,sessions:s.sessions,autoCross:s.autoCross}));}catch(_){s.storageWarning=true;}
  }
  function savePuzzle(scene){
    const q=scene.__qf,s=state(scene);
    if(!q.model)return;
    if(q.model.done||q.model.failed)delete s.sessions[q.id];
    else s.sessions[q.id]=clone(q.model);
    persist(scene);
  }
  function changeScene(scene,name){gdjs.evtTools.runtimeScene.replaceScene(scene,name,false);}
  function sceneFor(id){return id==='mushroom'?'Nonogram':`Nonogram_${id}`;}
  const chapterOf=level=>level.chapter||1;
  const forestFor=chapter=>chapter===1?'Forest':`Forest_${String(chapter).padStart(2,'0')}`;
  const chapterLevels=chapter=>levels.filter(level=>chapterOf(level)===chapter);
  function buttonHit(scene,name){const o=obj(scene,name);return o&&!o.isHidden()&&o.cursorOnObject();}
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  function placeForest(scene,offset){
    const q=scene.__qf,p=q.panorama;
    if(!p)return;
    p.offset=clamp(offset,0,p.max);
    for(const [o,x] of p.world)o.setX(x-p.offset);
    p.thumb.setX(p.x+(p.w-p.thumb.getWidth())*p.offset/p.max);
    state(scene).forestScroll=p.offset;
  }
  function setupForestPanorama(scene){
    const extension=obj(scene,'ForestExtension');
    if(!extension)return;
    const q=scene.__qf,bg=obj(scene,'ForestBackground'),x=bg.getX(),w=bg.getWidth(),thumb=obj(scene,'ForestScrollThumb');
    const world=[bg,extension,obj(scene,'ForestJoin'),...q.levels.flatMap(l=>[obj(scene,`Discovery_${l.id}`),obj(scene,`ForestArt_${l.id}`)])];
    for(let n=5;n<=10;n++)world.push(obj(scene,`ForestSlot${n}`),obj(scene,`ForestSlotNumber${n}`));
    const p=q.panorama={x,y:bg.getY(),w,h:bg.getHeight(),max:extension.getX()+extension.getWidth()-x-w,
      thumb,track:obj(scene,'ForestScrollTrack'),world:world.filter(Boolean).map(o=>[o,o.getX()]),offset:0};
    const home=q.revealId&&q[`home_${q.revealId}`];
    const saved=state(scene).forestScroll||0;
    const needsCenter=home&&(home.x< x+saved||home.x+home.w> x+saved+w);
    placeForest(scene,needsCenter?home.x+home.w/2-x-w/2:saved);
  }
  function scrollForest(scene,input,left,released,dt){
    const q=scene.__qf,p=q.panorama;
    if(!p)return true;
    const keys=gdjs.evtTools.input;
    const x=keys.getCursorX(scene,'',0),y=keys.getCursorY(scene,'',0);
    const inWorld=x>=p.x&&x<=p.x+p.w&&y>=p.y&&y<=p.y+p.h;
    const inTrack=x>=p.x&&x<=p.x+p.w&&y>=p.track.getY()-4&&y<=p.track.getY()+p.track.getHeight()+4;
    const trackToOffset=(grab=p.thumb.getWidth()/2)=>((x-p.x-grab)/(p.w-p.thumb.getWidth()))*p.max;
    if(left&&!q.left){
      if(inTrack){
        const grab=x-p.thumb.getX();
        p.gesture={track:true,grab:grab>=0&&grab<=p.thumb.getWidth()?grab:p.thumb.getWidth()/2};
        placeForest(scene,trackToOffset(p.gesture.grab));
      }
      else if(inWorld)p.gesture={x,offset:p.offset,moved:false};
    }
    if((left||released)&&p.gesture){
      const g=p.gesture;
      if(g.track)placeForest(scene,trackToOffset(g.grab));
      else if(g.moved||Math.abs(x-g.x)>6){g.moved=true;placeForest(scene,g.offset+g.x-x);}
      if(released){p.gesture=null;if(g.track||g.moved)return null;}
    }else if(!left)p.gesture=null;
    if(!left){
      const direction=Number(keys.isKeyPressed(scene,'Right'))-Number(keys.isKeyPressed(scene,'Left'));
      const wheel=inWorld?(input.getMouseWheelDeltaX()||-input.getMouseWheelDelta()):0;
      if(direction||wheel)placeForest(scene,p.offset+direction*780*dt+clamp(wheel,-140,140));
    }
    if(released&&q.age>.2){
      if(inTrack){placeForest(scene,trackToOffset());return null;}
      for(const [name,sign] of [['ForestScrollLeft',-1],['ForestScrollRight',1]])if(buttonHit(scene,name)){
        placeForest(scene,p.offset+sign*p.w*.70);return null;
      }
    }
    return inWorld;
  }
  function enter(scene,kind,id){
    const shared=state(scene);
    const q=scene.__qf={kind,id,age:0,tool:1,phase:'play',restartUntil:0,lastCell:'',left:false,right:false};
    if(kind==='forest'){
      q.chapter=id||1;
      q.levels=chapterLevels(q.chapter);
      const found=q.levels.filter(level=>shared.completed.includes(level.id)).length;
      const hasNext=chapterLevels(q.chapter+1).length>0;
      q.canAdvance=hasNext&&found===q.levels.length;
      text(scene,'Progress',`${found} / ${q.levels.length} открытий`);
      text(scene,'NextChapterLabel',q.canAdvance?'Дальше →':`Для перехода: ${found}/${q.levels.length}`);
      const next=obj(scene,'NextChapterButton');
      if(next)next.setOpacity(q.canAdvance?255:150);
      q.caption=shared.storageWarning?'Сохранения недоступны: прогресс останется до закрытия игры.':
        found===q.levels.length?(hasNext?'Все находки открыты. Можно идти дальше.':'Все находки открыты. Глава завершена!'):
        obj(scene,'ForestExtension')?'Листайте лес и нажимайте на находки или карточки.':'Нажмите на находку или её карточку.';
      text(scene,'ForestCaption',q.caption);
      q.revealId=q.levels.some(level=>level.id===shared.pendingReveal)?shared.pendingReveal:null;
      delete shared.pendingReveal;
      for(const level of q.levels){
        const o=obj(scene,`Discovery_${level.id}`),art=obj(scene,`ForestArt_${level.id}`);
        const width=o.getWidth(),height=o.getHeight(),open=shared.completed.includes(level.id),revealing=q.revealId===level.id;
        o.setAnimation(!art&&open?1:0);o.setWidth(width);o.setHeight(height);
        q[`home_${level.id}`]={x:o.getX(),y:o.getY(),w:width,h:height};
        if(art){art.hide(!open);art.setOpacity(revealing?0:255);o.setOpacity(open&&!revealing?0:255);}
        text(scene,`CardLabel_${level.id}`,`${level.title}\n${level.grid.length}×${level.grid[0].length}${open?' · '+level.object:''}`);
      }
      obj(scene,'RevealRing').hide();
      if(q.revealId){text(scene,'ForestCaption',`Открытие: ${q.levels.find(l=>l.id===q.revealId).object}.`);if(!obj(scene,`ForestArt_${q.revealId}`))obj(scene,'RevealRing').hide(false);}
      setupForestPanorama(scene);
    }else if(kind==='puzzle'){
      q.level=levels.find(l=>l.id===id);q.model=S.create(q.level.grid,shared.sessions[id],shared.autoCross);
      text(scene,'Title',q.level.title);
      text(scene,'Message','Заполняйте клетки по числам.\nОтметки не стираются.');
      obj(scene,'RewardArt').hide();
      q.geometry=clone(root.QuietForestLayouts[id]);
      q.cells=scene.getObjects('Cell').map(o=>({o,x:o.getVariables().get('GridX').getAsNumber(),y:o.getVariables().get('GridY').getAsNumber(),px:o.getX(),py:o.getY()}));
      paint(scene);savePuzzle(scene);
    }else if(kind==='reward'){
      q.id=shared.rewardId||levels[0].id;
      q.level=levels.find(l=>l.id===q.id);
      text(scene,'Title',q.level.object);
      text(scene,'Description','Секрет разгадан. Посмотрите, как находка появится на сцене.');
      levels.forEach(l=>obj(scene,`Art_${l.id}`).hide(l.id!==q.id));
    }
  }
  function paint(scene){
    const q=scene.__qf,s=q.model,shared=state(scene);
    for(const {o,x,y} of q.cells)o.setAnimation(s.player[y][x]===1?1:s.player[y][x]===-1?2:0);
    const clues=C.clues(s.grid),rows=s.grid.map((r,y)=>C.completedRuns(r,s.player[y]));
    const cols=s.grid[0].map((_,x)=>C.completedRuns(s.grid.map(r=>r[x]),s.player.map(r=>r[x])));
    for(const h of scene.getObjects('Hint')){
      const v=h.getVariables(),axis=v.get('Axis').getAsString(),line=v.get('Line').getAsNumber(),run=v.get('Run').getAsNumber();
      h.setString(String((axis==='row'?clues.rows:clues.cols)[line][run]));
      h.setColor((axis==='row'?rows:cols)[line][run]?GRAY:INK);
    }
    for(let i=0;i<3;i++)obj(scene,`Heart${i}`).setAnimation(i<s.lives?0:1);
    text(scene,'LivesLabel',`${s.lives} / 3`);
    text(scene,'AutoLabel',`${shared.autoCross?'☑':'☐'} Автокрестики`);
    text(scene,'FillLabel',`${q.tool===1?'● ':'○ '}Закрасить`);
    text(scene,'CrossLabel',`${q.tool===-1?'● ':'○ '}Крестик`);
    text(scene,'BoardSize',`${s.grid[0].length} × ${s.grid.length}`);
  }
  function command(scene,name){
    const q=scene.__qf;
    if(q.kind==='reward'&&name==='next'){
      state(scene).pendingReveal=q.id;changeScene(scene,forestFor(chapterOf(q.level)));return;
    }
    if(q.kind==='forest'){
      if(name==='nextChapter'&&q.canAdvance)changeScene(scene,forestFor(q.chapter+1));
      if(name==='previousChapter'&&q.chapter>1)changeScene(scene,forestFor(q.chapter-1));
      return;
    }
    if(q.kind!=='puzzle'||q.phase!=='play')return;
    if(name==='back'){savePuzzle(scene);changeScene(scene,forestFor(chapterOf(q.level)));return;}
    if(name==='fill'||name==='cross'){q.tool=name==='fill'?1:-1;paint(scene);return;}
    if(name==='auto'){
      state(scene).autoCross=!state(scene).autoCross;
      if(state(scene).autoCross)q.model.player=C.autoCross(q.model.grid,q.model.player);
      paint(scene);savePuzzle(scene);return;
    }
    if(name==='restart'){
      if(q.age>q.restartUntil){q.restartUntil=q.age+3;text(scene,'RestartLabel','Подтвердить сброс');return;}
      q.model=S.create(q.level.grid,null,state(scene).autoCross);q.restartUntil=0;text(scene,'RestartLabel','Начать заново');text(scene,'Message','Новая попытка. У вас три жизни.');paint(scene);savePuzzle(scene);
    }
  }
  function applyCell(scene,x,y,tool){
    const q=scene.__qf;if(q.phase!=='play')return {changed:false};
    const result=S.apply(q.model,x,y,tool,state(scene).autoCross);
    if(!result.changed)return result;
    if(result.error){q.errorAge=0;q.lostHeart=q.model.lives;text(scene,'Message',q.model.failed?'Жизни закончились.\nНажмите «Начать заново».':'Ошибка: минус одна жизнь.\nЗдесь стоит крестик.');}
    paint(scene);savePuzzle(scene);
    if(result.won){
      q.phase='morph';q.morphAge=0;
      const shared=state(scene);if(!shared.completed.includes(q.id))shared.completed.push(q.id);shared.rewardId=q.id;persist(scene);
      text(scene,'Message','Клетки оживают…');
      obj(scene,'RewardArt').hide(false);obj(scene,'RewardArt').setOpacity(0);
    }
    return result;
  }
  function tick(scene){
    const q=scene.__qf;if(!q)return;
    const dt=Math.min(scene.getElapsedTime()/1000,.1);q.age+=dt;
    const input=scene.getGame().getInputManager(),left=input.isMouseButtonPressed(0),right=input.isMouseButtonPressed(1),released=input.isMouseButtonReleased(0),rightReleased=input.isMouseButtonReleased(1);
    if(q.kind==='forest'){
      const canSelect=scrollForest(scene,input,left,released,dt);
      if(q.revealId){
        const art=obj(scene,`ForestArt_${q.revealId}`);
        if(art){
          const t=Math.min(q.age/1.3,1);
          art.setOpacity(255*t*t*(3-2*t));
          obj(scene,`Discovery_${q.revealId}`).setOpacity(255*Math.max(0,1-3*t));
          if(t===1){q.revealId=null;text(scene,'ForestCaption',q.caption);}
        }else{
        const t=Math.min(q.age/2.2,1),home=q[`home_${q.revealId}`],o=obj(scene,`Discovery_${q.revealId}`),scale=1+.65*(1-t)*(1-t);
        const x=home.x-(q.panorama?.offset||0);
        o.setWidth(home.w*scale);o.setHeight(home.h*scale);o.setPosition(x-(o.getWidth()-home.w)/2,home.y-(o.getHeight()-home.h)/2-20*(1-t));o.setOpacity(Math.min(255,q.age*550));
        const ring=obj(scene,'RevealRing'),size=home.w*(1+1.4*t);ring.setPosition(x+home.w/2-size/2,home.y+home.h/2-size/2);ring.setWidth(size);ring.setHeight(size);ring.setOpacity(255*(1-t));
        if(t===1){ring.hide();q.revealId=null;text(scene,'ForestCaption',q.caption);}
        }
      }
      if(released&&q.age>.2&&canSelect!==null){
        if(buttonHit(scene,'PreviousChapterButton')){command(scene,'previousChapter');return;}
        if(buttonHit(scene,'NextChapterButton')){command(scene,'nextChapter');return;}
        const x=gdjs.evtTools.input.getCursorX(scene,'',0),y=gdjs.evtTools.input.getCursorY(scene,'',0);
        const distance=level=>{
          const marker=obj(scene,`Discovery_${level.id}`);
          return Math.hypot(marker.getX()+marker.getWidth()/2-x,marker.getY()+marker.getHeight()/2-y);
        };
        const hit=q.levels.find(l=>buttonHit(scene,`Card_${l.id}`))||
          (canSelect&&q.levels.filter(l=>buttonHit(scene,`Discovery_${l.id}`)).sort((a,b)=>distance(a)-distance(b))[0]);
        if(hit){
          const l=hit;
          const p=q.panorama,home=q[`home_${l.id}`];
          if(p&&(home.x<p.x+p.offset||home.x+home.w>p.x+p.offset+p.w))
            state(scene).forestScroll=clamp(home.x+home.w/2-p.x-p.w/2,0,p.max);
          changeScene(scene,sceneFor(l.id));return;
        }
      }
    }else if(q.kind==='reward'){
      if(released&&q.age>.2&&buttonHit(scene,'NextButton'))command(scene,'next');
    }else if(q.kind==='puzzle'){
      if(q.phase==='morph'){
        q.morphAge+=dt;const t=Math.min(q.morphAge/.8,1),fade=Math.max(0,Math.min((q.morphAge-.7)/1.2,1)),g=q.geometry;
        const targetSize=330/q.model.grid.length,tx=430,ty=230;
        for(const c of q.cells){
          if(q.model.player[c.y][c.x]!==1){c.o.setOpacity(255*(1-t));continue;}
          const ease=1-Math.pow(1-t,3);c.o.setPosition(c.px+(tx+c.x*targetSize-c.px)*ease,c.py+(ty+c.y*targetSize-c.py)*ease);c.o.setWidth(g.cell+(targetSize-g.cell)*ease);c.o.setHeight(g.cell+(targetSize-g.cell)*ease);c.o.setOpacity(255*(1-fade));
        }
        scene.getObjects('Hint').forEach(o=>o.setOpacity(255*(1-t)));
        for(let i=0;i<=q.model.grid.length;i+=5)for(const prefix of ['GridV','GridH']){const line=obj(scene,prefix+i);if(line)line.setOpacity(255*(1-t));}
        obj(scene,'RewardArt').setOpacity(255*fade);
        if(q.morphAge>=2.1)changeScene(scene,'Reward');
        return;
      }
      if(q.restartUntil&&q.age>q.restartUntil){q.restartUntil=0;text(scene,'RestartLabel','Начать заново');}
      for(let i=0;i<3;i++){
        const heart=obj(scene,`Heart${i}`),baseX=972+i*43;
        if(q.errorAge!==undefined&&q.lostHeart===i&&q.errorAge<.6)heart.setX(baseX+Math.sin(q.errorAge*45)*5*(1-q.errorAge/.6));else heart.setX(baseX);
        if(i===0&&q.model.lives===1)heart.setOpacity(210+45*Math.sin(q.age*4));else heart.setOpacity(255);
      }
      if(q.errorAge!==undefined)q.errorAge+=dt;
      if(released&&q.age>.2){for(const [o,cmd] of [['BackButton','back'],['FillButton','fill'],['CrossButton','cross'],['AutoButton','auto'],['RestartButton','restart']])if(buttonHit(scene,o)){command(scene,cmd);break;}}
      if((left||right||released||rightReleased)&&q.age>.2&&!q.model.failed){
        const x=gdjs.evtTools.input.getCursorX(scene,'',0),y=gdjs.evtTools.input.getCursorY(scene,'',0),g=q.geometry;
        const selected=right||rightReleased?-1:q.tool;
        const cx=Math.floor((x-g.x)/g.cell),cy=Math.floor((y-g.y)/g.cell),cell=`${cx},${cy},${selected}`;
        if(!q.left&&!q.right)q.lastCell='';
        if(cell!==q.lastCell){q.lastCell=cell;applyCell(scene,cx,cy,selected);}
      }
    }
    q.left=left;q.right=right;
  }
  root.QuietForestGD={enter,tick,command,applyCell,sceneFor};
})(globalThis);
