const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('../logic/core'),levels=require('../logic/levels'),project=require('../game.json');
const newLevels=require('../data/chapter-one-new.json'),samples=require('../data/chapter-one-alpha.json'),converted=require('../data/chapter-one-conversion.json');
const manifest=require('../data/art-manifest.json');
const layout=name=>project.layouts.find(s=>s.name===name);
const image=(s,name)=>s.objects.find(o=>o.name===name).animations.at(-1).directions[0].sprites[0].image;
test('the standalone level contains exactly ten unique line-solvable puzzles',()=>{
  assert.equal(project.layouts.length,12);
  assert.equal(project.firstLayout,'Forest');
  assert.deepEqual(levels.map(l=>l.grid.length).sort((a,b)=>a-b),[...Array(7).fill(10),...Array(3).fill(15)]);
  assert.equal(new Set(levels.map(l=>l.id)).size,10);
  for(const l of levels){
    const scene=layout(l.id==='mushroom'?'Nonogram':'Nonogram_'+l.id);
    assert.equal(scene.instances.filter(o=>o.name==='Cell').length,l.grid.length**2);
    assert.ok(layout('Forest').instances.some(o=>o.name==='Card_'+l.id));
    const result=C.analyze(l.grid,2500);
    assert.equal(result.status,'unique',l.id);
    assert.equal(result.solvedByLines,true,l.id);
  }
});
for(const {id,size} of newLevels)test(`${id}: sampled sprite gives the exact unique solution, without guessing`,()=>{
  const l=levels.find(l=>l.id===id),r=converted[id],rgba=samples[id].flatMap(a=>[0,0,0,a]);
  assert.deepEqual(C.pixelsToGrid(rgba,size,size,r.threshold),l.grid);
  const result=C.analyze(l.grid,2500);
  assert.equal(result.status,'unique');assert.equal(result.solvedByLines,true);assert.deepEqual(result.solution,l.grid);
  assert.equal(image(layout('Forest'),'Discovery_'+id),manifest[id]);
  assert.equal(image(layout('Nonogram_'+id),'RewardArt'),manifest[id]);
  assert.equal(image(layout('Reward'),'Art_'+id),manifest[id]);
});
