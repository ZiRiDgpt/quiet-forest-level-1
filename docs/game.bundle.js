gdjs.projectData={"gdVersion":{"build":284,"major":5,"minor":6,"revision":0},"properties":{"adaptGameResolutionAtRuntime":false,"antialiasingMode":"MSAA","antialisingEnabledOnMobile":false,"folderProject":false,"orientation":"landscape","packageName":"com.quietforest.nonogram","pixelsRounding":false,"projectUuid":"0c31755a-0a43-406e-aa2f-4b3870c05e72","scaleMode":"linear","sizeOnStartupMode":"","templateSlug":"","version":"0.5.0","name":"Тихий лес","description":"Лесная поляна — первый уровень игры «Тихий лес»","author":"","windowWidth":1280,"windowHeight":800,"latestCompilationDirectory":"","maxFPS":60,"minFPS":20,"verticalSync":false,"platformSpecificAssets":{},"loadingScreen":{"backgroundColor":0,"backgroundFadeInDuration":0.2,"backgroundImageResourceName":"","gdevelopLogoStyle":"light","logoAndProgressFadeInDuration":0.2,"logoAndProgressLogoFadeInDelay":0.2,"minDuration":1.5,"progressBarColor":16777215,"progressBarHeight":20,"progressBarMaxWidth":200,"progressBarMinWidth":40,"progressBarWidthPercent":30,"showGDevelopSplash":true,"showProgressBar":true},"watermark":{"placement":"bottom-left","showWatermark":true},"authorIds":[],"authorUsernames":[],"categories":[],"playableDevices":["desktop","mobile"],"extensionProperties":[],"platforms":[{"name":"GDevelop JS platform"}],"currentPlatform":"GDevelop JS platform"},"firstLayout":"Forest","resources":{"resources":[{"file":"assets/acorn-cartoon-v1.png","kind":"image","metadata":"","name":"acorn-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/bird-cartoon-v1.png","kind":"image","metadata":"","name":"bird-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/button.svg","kind":"image","metadata":"","name":"button.svg","smoothed":true,"userAdded":true},{"file":"assets/cell-cross.svg","kind":"image","metadata":"","name":"cell-cross.svg","smoothed":true,"userAdded":true},{"file":"assets/cell-empty.svg","kind":"image","metadata":"","name":"cell-empty.svg","smoothed":true,"userAdded":true},{"file":"assets/cell-filled.svg","kind":"image","metadata":"","name":"cell-filled.svg","smoothed":true,"userAdded":true},{"file":"assets/flower-cartoon-v1.png","kind":"image","metadata":"","name":"flower-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-clip.svg","kind":"image","metadata":"","name":"forest-clip.svg","smoothed":true,"userAdded":true},{"file":"assets/forest-join.svg","kind":"image","metadata":"","name":"forest-join.svg","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-acorn-v1.png","kind":"image","metadata":"","name":"forest-reveal-acorn-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-bird-v1.png","kind":"image","metadata":"","name":"forest-reveal-bird-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-flower-v1.png","kind":"image","metadata":"","name":"forest-reveal-flower-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-fox-v1.png","kind":"image","metadata":"","name":"forest-reveal-fox-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-hedgehog-v1.png","kind":"image","metadata":"","name":"forest-reveal-hedgehog-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-leaf-v1.png","kind":"image","metadata":"","name":"forest-reveal-leaf-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-mushroom-v1.png","kind":"image","metadata":"","name":"forest-reveal-mushroom-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-owl-v1.png","kind":"image","metadata":"","name":"forest-reveal-owl-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-snail-v1.png","kind":"image","metadata":"","name":"forest-reveal-snail-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-reveal-squirrel-v1.png","kind":"image","metadata":"","name":"forest-reveal-squirrel-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-textured-east-v1.png","kind":"image","metadata":"","name":"forest-textured-east-v1.png","smoothed":true,"userAdded":true},{"file":"assets/forest-textured-west-v1.png","kind":"image","metadata":"","name":"forest-textured-west-v1.png","smoothed":true,"userAdded":true},{"file":"assets/fox-cartoon-v1.png","kind":"image","metadata":"","name":"fox-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/heart-empty.svg","kind":"image","metadata":"","name":"heart-empty.svg","smoothed":true,"userAdded":true},{"file":"assets/heart-full.svg","kind":"image","metadata":"","name":"heart-full.svg","smoothed":true,"userAdded":true},{"file":"assets/hedgehog-cartoon-v1.png","kind":"image","metadata":"","name":"hedgehog-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/leaf-cartoon-v1.png","kind":"image","metadata":"","name":"leaf-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/locked.svg","kind":"image","metadata":"","name":"locked.svg","smoothed":true,"userAdded":true},{"file":"assets/mushroom-cartoon-v1.png","kind":"image","metadata":"","name":"mushroom-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/owl-cartoon-v1.png","kind":"image","metadata":"","name":"owl-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/panel.svg","kind":"image","metadata":"","name":"panel.svg","smoothed":true,"userAdded":true},{"file":"assets/ring.svg","kind":"image","metadata":"","name":"ring.svg","smoothed":true,"userAdded":true},{"file":"assets/snail-cartoon-v1.png","kind":"image","metadata":"","name":"snail-cartoon-v1.png","smoothed":true,"userAdded":true},{"file":"assets/squirrel-cartoon-v1.png","kind":"image","metadata":"","name":"squirrel-cartoon-v1.png","smoothed":true,"userAdded":true}],"resourceFolders":[]},"objects":[],"objectsFolderStructure":{"folderName":"__ROOT","children":[]},"objectsGroups":[],"variables":[],"externalEvents":[],"eventsFunctionsExtensions":[],"externalLayouts":[],"layouts":[],"usedResources":[]};
(function(module, exports, require){
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

(function(root){
const levels=[{"id": "mushroom", "title": "Под старым дубом", "object": "Гриб", "x": 30, "y": 77, "grid": [[0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]]}, {"id": "owl", "title": "Хранитель сумерек", "object": "Сова", "x": 72, "y": 37, "grid": [[1, 1, 0, 0, 0, 0, 0, 0, 1, 1], [1, 1, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]]}, {"id": "squirrel", "title": "Гость на ветке", "object": "Белка", "x": 43, "y": 30.5, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], "displaySize": 140}, {"id": "hedgehog", "title": "Шорох в траве", "object": "Ёж", "x": 80, "y": 78, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}, {"id": "acorn", "title": "На дубовой ветке", "object": "Жёлудь", "x": 125, "y": 33, "displaySize": 88, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}, {"id": "snail", "title": "У папоротника", "object": "Улитка", "x": 117, "y": 77, "displaySize": 104, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}, {"id": "leaf", "title": "Золото осени", "object": "Лист", "x": 143, "y": 61, "displaySize": 86, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}, {"id": "flower", "title": "Лесной цветок", "object": "Фиалка", "x": 156, "y": 84, "displaySize": 82, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}, {"id": "bird", "title": "Песня над ручьём", "object": "Птичка", "x": 180, "y": 18, "displaySize": 100, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 0, 1, 0, 0], [0, 1, 1, 1, 1, 1, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}, {"id": "fox", "title": "Рыжий силуэт", "object": "Лиса", "x": 187, "y": 70, "displaySize": 142, "grid": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]}];
if(typeof module!=="undefined")module.exports=levels;else root.NonogramLevels=levels;
})(typeof window!=="undefined"?window:globalThis);

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

})(undefined, undefined, undefined);
gdjs["ForestCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "fox": {"x": 230, "y": 220, "cell": 30}, "leaf": {"x": 230, "y": 220, "cell": 42}, "acorn": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}};

QuietForestGD.enter(runtimeScene,"forest",null);
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["NonogramCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "fox": {"x": 230, "y": 220, "cell": 30}, "leaf": {"x": 230, "y": 220, "cell": 42}, "acorn": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}};

QuietForestGD.enter(runtimeScene,"puzzle","mushroom");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95owlCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "fox": {"x": 230, "y": 220, "cell": 30}, "leaf": {"x": 230, "y": 220, "cell": 42}, "acorn": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}};

QuietForestGD.enter(runtimeScene,"puzzle","owl");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95squirrelCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "fox": {"x": 230, "y": 220, "cell": 30}, "leaf": {"x": 230, "y": 220, "cell": 42}, "acorn": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}};

QuietForestGD.enter(runtimeScene,"puzzle","squirrel");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95hedgehogCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "fox": {"x": 230, "y": 220, "cell": 30}, "leaf": {"x": 230, "y": 220, "cell": 42}, "acorn": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}};

QuietForestGD.enter(runtimeScene,"puzzle","hedgehog");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95acornCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "acorn": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}, "leaf": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "fox": {"x": 230, "y": 220, "cell": 30}};

QuietForestGD.enter(runtimeScene,"puzzle","acorn");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95snailCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "acorn": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}, "leaf": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "fox": {"x": 230, "y": 220, "cell": 30}};

QuietForestGD.enter(runtimeScene,"puzzle","snail");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95leafCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "acorn": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}, "leaf": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "fox": {"x": 230, "y": 220, "cell": 30}};

QuietForestGD.enter(runtimeScene,"puzzle","leaf");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95flowerCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "acorn": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}, "leaf": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "fox": {"x": 230, "y": 220, "cell": 30}};

QuietForestGD.enter(runtimeScene,"puzzle","flower");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95birdCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "acorn": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}, "leaf": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "fox": {"x": 230, "y": 220, "cell": 30}};

QuietForestGD.enter(runtimeScene,"puzzle","bird");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["Nonogram_95foxCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "acorn": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}, "leaf": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "fox": {"x": 230, "y": 220, "cell": 30}};

QuietForestGD.enter(runtimeScene,"puzzle","fox");
}
QuietForestGD.tick(runtimeScene);
}};
gdjs["RewardCode"]={idToCallbackMap:new Map(),func:function(runtimeScene){
if(gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene)){
globalThis.QuietForestLayouts={"mushroom": {"x": 230, "y": 220, "cell": 42}, "owl": {"x": 230, "y": 220, "cell": 42}, "squirrel": {"x": 230, "y": 220, "cell": 30}, "hedgehog": {"x": 230, "y": 220, "cell": 30}, "fox": {"x": 230, "y": 220, "cell": 30}, "leaf": {"x": 230, "y": 220, "cell": 42}, "acorn": {"x": 230, "y": 220, "cell": 42}, "flower": {"x": 230, "y": 220, "cell": 42}, "bird": {"x": 230, "y": 220, "cell": 42}, "snail": {"x": 230, "y": 220, "cell": 42}};

QuietForestGD.enter(runtimeScene,"reward",null);
}
QuietForestGD.tick(runtimeScene);
}};