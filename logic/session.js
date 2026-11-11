(function(root){
  'use strict';
  const C=typeof module!=='undefined'?require('./core'):root.NonogramCore;
  function create(grid, saved, autoCross=true){
    C.validate(grid);
    const valid=saved && JSON.stringify(saved.grid)===JSON.stringify(grid) && Number.isInteger(saved.lives) && saved.lives>0 && saved.lives<=3 && Array.isArray(saved.player) && saved.player.length===grid.length && saved.player.every((r,y)=>Array.isArray(r)&&r.length===grid[y].length&&r.every((v,x)=>[0,1,-1].includes(v)&&!(v===1&&!grid[y][x])));
    const s={grid:grid.map(r=>r.slice()),player:valid?saved.player.map(r=>r.slice()):grid.map(r=>r.map(()=>0)),lives:valid?saved.lives:3,done:false,failed:false};
    if(autoCross)s.player=C.autoCross(s.grid,s.player);
    return s;
  }
  function apply(s,x,y,tool,autoCross=true){
    if(s.done||s.failed||!s.player[y]||s.player[y][x]===undefined||![1,-1].includes(tool))return {changed:false};
    const next=C.nextMark(s.player[y][x],tool);
    if(next===s.player[y][x])return {changed:false};
    const error=next===1&&!s.grid[y][x];
    s.player[y][x]=error?-1:next;
    if(error)s.lives--;
    s.failed=s.lives===0;
    if(autoCross&&!s.failed)s.player=C.autoCross(s.grid,s.player);
    s.done=!s.failed&&C.matches(s.grid,s.player);
    return {changed:true,error,won:s.done,failed:s.failed};
  }
  const api={create,apply};
  if(typeof module!=='undefined')module.exports=api;else root.QuietForestSession=api;
})(typeof window!=='undefined'?window:globalThis);
