const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('../logic/core'),levels=require('../logic/levels'),project=require('../game.json');
const manifest=require('../data/art-manifest.json'),cartoon=manifest.squirrel==='squirrel-cartoon-v1.png';
const forestArt=require('../data/forest-integrated.json');
test('squirrel puzzle is the direct sampled silhouette and has one solution',()=>{
  const sample=require(cartoon?'../data/squirrel-cartoon-grid.json':'../data/squirrel-painted-grid.json');
  const pixels=require(cartoon?'../data/squirrel-cartoon-rgba.json':'../data/squirrel-sampled-rgba.json');
  const level=levels.find(l=>l.id==='squirrel');
  assert.deepEqual(C.pixelsToGrid(pixels,15,15,sample.threshold),level.grid);
  assert.equal(C.analyze(level.grid,2500).status,'unique');
  const scene=project.layouts.find(s=>s.name==='Nonogram_squirrel');
  assert.equal(scene.instances.filter(i=>i.name==='Cell').length,225);
  const reward=scene.objects.find(o=>o.name==='RewardArt');
  const image=o=>o.animations.at(-1).directions[0].sprites[0].image;
  const forest=project.layouts.find(s=>s.name==='Forest');
  assert.equal(image(reward),manifest.squirrel);
  assert.equal(image(forest.objects.find(o=>o.name==='Discovery_squirrel')),manifest.squirrel);
  assert.equal(image(forest.objects.find(o=>o.name==='ForestBackground')),forestArt.backgrounds.ForestBackground);
  assert.equal(image(project.layouts.find(s=>s.name==='Reward').objects.find(o=>o.name==='Art_squirrel')),manifest.squirrel);
});
test('each discovery has its own aligned forest reveal resource',()=>{
  const forest=project.layouts.find(s=>s.name==='Forest');
  assert.deepEqual(Object.keys(forestArt.patches).sort(),levels.filter(l=>(l.chapter||1)===1).map(l=>l.id).sort());
  const bg=forest.instances.find(i=>i.name==='ForestBackground');
  for(const [id,patch] of Object.entries(forestArt.patches)){
    const obj=forest.objects.find(o=>o.name==='ForestArt_'+id);
    const inst=forest.instances.find(i=>i.name===obj.name);
    assert.equal(obj.animations[0].directions[0].sprites[0].image,patch.file);
    assert.equal(inst.x,bg.x+patch.x);assert.equal(inst.y,bg.y+patch.y);
    assert.ok(project.resources.resources.some(r=>r.name===patch.file));
  }
});
