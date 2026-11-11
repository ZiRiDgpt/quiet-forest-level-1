const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../logic/core');
const S=require('../logic/session');
const levels=require('../logic/levels');
for(const l of levels)test(`native model completes ${l.id} with three lives`,()=>{
  const s=S.create(l.grid);
  for(let y=0;y<l.grid.length;y++)for(let x=0;x<l.grid[y].length;x++)if(l.grid[y][x])S.apply(s,x,y,1);
  assert.equal(s.done,true);assert.equal(s.lives,3);assert.equal(C.matches(l.grid,s.player),true);
});
test('wrong fill costs exactly one life and remains a protected cross',()=>{
  const s=S.create([[1,0],[0,1]],null,false);
  assert.equal(S.apply(s,1,0,1,false).error,true);assert.equal(s.lives,2);assert.equal(s.player[0][1],-1);
  for(const tool of [1,-1,1])assert.equal(S.apply(s,1,0,tool,false).changed,false);
  assert.equal(s.lives,2);
});
test('three distinct mistakes fail the level and subsequent moves are blocked',()=>{
  const grid=[[1,0,0],[0,1,0],[0,0,1]],s=S.create(grid,null,false);
  S.apply(s,1,0,1,false);S.apply(s,2,0,1,false);S.apply(s,0,1,1,false);
  assert.equal(s.failed,true);assert.equal(s.lives,0);assert.equal(S.apply(s,0,0,1).changed,false);
});
test('saved progress keeps lives, marks and auto-cross preference',()=>{
  const grid=[[1,0],[0,1]],s=S.create(grid,null,false);
  S.apply(s,1,0,1,false);S.apply(s,0,0,1,false);
  const restored=S.create(grid,JSON.parse(JSON.stringify(s)),false);
  assert.deepEqual(restored,s);assert.equal(restored.player[1][0],0);
  assert.equal(S.create(grid,s,true).player[1][0],-1);
});
test('invalid saves restart safely and filled cells cannot be erased',()=>{
  const grid=[[1,0],[0,1]],s=S.create(grid,{grid,lives:99,player:[[1,1],[0,0]]},false);
  assert.equal(s.lives,3);assert.equal(s.player[0][0],0);
  S.apply(s,0,0,1,false);assert.equal(S.apply(s,0,0,1,false).changed,false);assert.equal(S.apply(s,0,0,-1,false).changed,false);
});
test('completed hint groups gray independently in either axis',()=>{
  assert.deepEqual(C.completedRuns([1,1,1,0,1,1,1,1],[1,1,1,0,0,0,0,0]),[true,false]);
});
