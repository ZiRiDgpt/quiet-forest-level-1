(function (root) {
  'use strict';
  function hints(line) {
    const out = []; let run = 0;
    for (const cell of [...line, 0]) { if (cell) run++; else if (run) { out.push(run); run = 0; } }
    return out.length ? out : [0];
  }
  function validate(grid) {
    if (!Array.isArray(grid) || !grid.length || !Array.isArray(grid[0]) || !grid[0].length || grid.length > 50 || grid[0].length > 50 || grid.some(r => !Array.isArray(r) || r.length !== grid[0].length || r.some(v => v !== 0 && v !== 1))) throw Error('Некорректное поле (от 1 до 50 клеток по стороне).');
    return grid;
  }
  function clues(grid) {
    validate(grid);
    return { rows: grid.map(hints), cols: grid[0].map((_, x) => hints(grid.map(r => r[x]))) };
  }
  function matches(grid, player) {
    const c = clues(grid);
    return player.length === grid.length && player.every((r, y) => r.length === grid[0].length && JSON.stringify(hints(r.map(v => v === 1 ? 1 : 0))) === JSON.stringify(c.rows[y])) && c.cols.every((h, x) => JSON.stringify(hints(player.map(r => r[x] === 1 ? 1 : 0))) === JSON.stringify(h));
  }
  function pixelsToGrid(data, width, height, threshold = 128, invert = false) {
    return Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => {
      const i = (y * width + x) * 4, a = data[i + 3] / 255;
      const gray = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) * a + 255 * (1 - a);
      return Number(invert ? gray >= threshold : gray < threshold);
    }));
  }
  function autoCross(grid, player) {
    const { rows, cols } = clues(grid), next = player.map(row => row.slice());
    const complete = (line, clue) => JSON.stringify(hints(line.map(v => Number(v === 1)))) === JSON.stringify(clue);
    rows.forEach((clue, y) => {
      if (complete(next[y], clue)) next[y] = next[y].map(v => v === 0 ? -1 : v);
    });
    cols.forEach((clue, x) => {
      if (complete(next.map(row => row[x]), clue)) next.forEach(row => { if (row[x] === 0) row[x] = -1; });
    });
    return next;
  }
  function nextMark(current, tool) {
    if (current !== 0) return current;
    return tool === 1 || tool === -1 ? tool : 0;
  }
  function completedRuns(solution, player) {
    const result = []; let start = -1;
    for (let i = 0; i <= solution.length; i++) {
      if (solution[i] === 1 && start < 0) start = i;
      if (solution[i] !== 1 && start >= 0) {
        result.push(player.slice(start,i).every(v=>v===1) && player[start-1] !== 1 && player[i] !== 1);
        start = -1;
      }
    }
    return result.length ? result : [player.every(v=>v!==1)];
  }
  // Count up to two solutions; candidate generation and search share a deadline.
  function analyze(grid, budgetMs = 700) {
    const c = clues(grid), w = grid[0].length, h = grid.length, end = Date.now() + budgetMs;
    let ticks = 0, count = 0, first = null, solvedByLines = false;
    const check = () => { if (++ticks % 128 === 0 && Date.now() >= end) throw Error('timeout'); };
    function patterns(size, clue) {
      const out = [], runs = clue[0] === 0 ? [] : clue;
      function place(i, start, line) {
        check(); if (out.length > 15000) throw Error('timeout');
        if (i === runs.length) { out.push(line); return; }
        const needed = runs.slice(i).reduce((a, b) => a + b, 0) + runs.length - i - 1;
        for (let pos = start; pos <= size - needed; pos++) {
          const next = line.slice(); next.fill(1, pos, pos + runs[i]); place(i + 1, pos + runs[i] + 1, next);
        }
      }
      place(0, 0, Array(size).fill(0)); return out;
    }
    function search(rows, cols, branched = false) {
      check(); if (count >= 2) return;
      let changed = true;
      while (changed) {
        changed = false;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          check();
          for (const [source, index, target, cell] of [[rows[y], x, cols, y], [cols[x], y, rows, x]]) {
            const value = source[0][index];
            if (source.every(p => p[index] === value)) {
              const ti = target === cols ? x : y, before = target[ti];
              const filtered = before.filter(p => p[cell] === value);
              if (!filtered.length) return;
              if (filtered.length !== before.length) { target[ti] = filtered; changed = true; }
            }
          }
        }
      }
      let choice = null;
      for (const [group, name] of [[rows, 'rows'], [cols, 'cols']]) group.forEach((p, i) => { if (p.length > 1 && (!choice || p.length < choice.options.length)) choice = { name, i, options: p }; });
      if (!choice) { count++; if (!first) first = rows.map(p => p[0]); if (!branched) solvedByLines = true; return; }
      for (const p of choice.options) {
        const nr = rows.slice(), nc = cols.slice(); (choice.name === 'rows' ? nr : nc)[choice.i] = [p];
        search(nr, nc, true); if (count >= 2) break;
      }
    }
    try { search(c.rows.map(p => patterns(w, p)), c.cols.map(p => patterns(h, p))); }
    catch (e) { if (e.message !== 'timeout') throw e; return { status: 'unknown', count, solution: first }; }
    return { status: count === 1 ? 'unique' : count > 1 ? 'multiple' : 'none', count, solution: first, solvedByLines };
  }
  const api = { hints, clues, matches, validate, pixelsToGrid, autoCross, nextMark, completedRuns, analyze };
  if (typeof module !== 'undefined') module.exports = api; else root.NonogramCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
