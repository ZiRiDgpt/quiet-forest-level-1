const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const project=require('../game.json');
function embedded(events){
  for(const e of events){
    const source=(e.inlineCode||[]).join('\n');
    if(source.includes('QuietForestGD.enter(runtimeScene,'))return source;
    const nested=embedded(e.events||[]);if(nested)return nested;
  }
}
for(const electron of [false,true])test(`embedded modules initialize in ${electron?'Electron preview':'browser export'}`,()=>{
  for(const scene of project.layouts.filter(s=>s.name!=='PhotoWorkshop')){
    const sandbox={};sandbox.window=sandbox;
    const originalModule={exports:{sentinel:true}};
    if(electron){sandbox.module=originalModule;sandbox.exports=originalModule.exports;sandbox.require=()=>{throw Error('Inline event must not require a file');};}
    vm.createContext(sandbox);
    const source=embedded(scene.events);
    assert.ok(source,scene.name);
    // Execute the actual embedded bootstrap including layout metadata, before scene entry.
    vm.runInContext(source.slice(0,source.lastIndexOf('\nQuietForestGD.enter(runtimeScene,')),sandbox);
    assert.equal(typeof sandbox.NonogramCore.autoCross,'function');
    assert.equal(typeof sandbox.QuietForestGD.enter,'function');
    assert.equal(sandbox.NonogramLevels.length,10);
    const grid=[[1,0],[0,1]],session=sandbox.QuietForestSession.create(grid);
    sandbox.QuietForestSession.apply(session,0,0,1);
    sandbox.QuietForestSession.apply(session,1,1,1);
    assert.equal(session.done,true);
    if(electron)assert.deepEqual(originalModule.exports,{sentinel:true});
  }
});
