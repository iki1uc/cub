/* ================================================================
   AUFZUG.js — gemeinsames Skript für root index.html + alle Etagen
   ================================================================
   Zweck:
   - Etagen-Registry: welche Etagen (Unterordner mit eigener index.html)
     gibt es, wie heißen sie, welches Icon haben sie.
   - Navigation: rendert eine feste "Aufzug"-Leiste oben auf jeder Seite
     (root UND jede Etage), mit Buttons zu allen anderen Etagen + Root.
   - Fähigkeiten-Weiterleitung: gemeinsamer Speicher (localStorage),
     den jede Etage lesen/schreiben kann — so können z.B. Log-Einträge
     oder Zustände (wie ein Orbit-Index) etagenübergreifend sichtbar
     gemacht werden, ohne dass die Etagen sich gegenseitig kennen müssen.

   Einbindung:
   - root/index.html:                <script src="aufzug.js"></script>
   - etage-x/index.html:             <script src="../aufzug.js"></script>
   Danach in jeder Seite einmal aufrufen:
       Aufzug.init({ currentId: 'root', basePath: '' });        // root
       Aufzug.init({ currentId: 'etage-1-axiom-orbit', basePath: '../' }); // Etage
   ================================================================ */

const Aufzug = (function () {
  "use strict";

  // ─── 1. ETAGEN-REGISTRY ────────────────────────────────────────
  // Neue Etage hinzufügen = hier einen Eintrag ergänzen + Ordner mit
  // eigener index.html anlegen, die Aufzug.init() aufruft.
  const FLOORS = [
    { id: 'root', name: 'ROOT · Lobby', path: 'index.html', icon: '🏠', isRoot: true },
    { id: 'etage-1-axiom-orbit', name: 'Etage 1 · Axiom-Orbit', path: 'etage-1-axiom-orbit/index.html', icon: '🌀' }
  ];

  const STORAGE_KEY = 'aufzug_shared_state';
  const LOG_KEY = 'aufzug_shared_log';
  const LOG_MAX = 50;

  let currentFloorId = null;
  let basePath = '';

  // ─── 2. GETEILTER ZUSTAND (Fähigkeiten-Weiterleitung) ─────────
  function getSharedState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function setSharedValue(key, value) {
    const state = getSharedState();
    state[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  function getSharedValue(key, fallback) {
    const state = getSharedState();
    return Object.prototype.hasOwnProperty.call(state, key) ? state[key] : fallback;
  }

  // ─── 3. GETEILTES LOG (über alle Etagen sichtbar) ─────────────
  function getSharedLog() {
    try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); }
    catch (_) { return []; }
  }
  function log(msg) {
    const entries = getSharedLog();
    const floor = FLOORS.find(f => f.id === currentFloorId);
    entries.push({
      time: new Date().toLocaleTimeString('de-DE'),
      floor: floor ? floor.name : (currentFloorId || '?'),
      msg
    });
    while (entries.length > LOG_MAX) entries.shift();
    localStorage.setItem(LOG_KEY, JSON.stringify(entries));
    renderSharedLogIfPresent();
  }

  // ─── 4. NAVIGATION / UI ────────────────────────────────────────
  function linkFor(floor) {
    // basePath ist '' auf root, '../' (o.ä.) innerhalb einer Etage
    if (floor.isRoot) return basePath === '' ? floor.path : basePath + 'index.html';
    return basePath + floor.path;
  }

  function renderNav() {
    let bar = document.getElementById('aufzugBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'aufzugBar';
      bar.style.cssText = [
        'display:flex', 'flex-wrap:wrap', 'gap:6px', 'align-items:center',
        'background:rgba(10,14,20,0.9)', 'border-bottom:1px solid #2a3a4a',
        'padding:8px 14px', 'font-family:Consolas,monospace', 'font-size:12px',
        'color:#9ab0c0', 'position:sticky', 'top:0', 'z-index:1000'
      ].join(';');
      document.body.insertBefore(bar, document.body.firstChild);
    }
    bar.innerHTML = '<span style="color:#6cf;font-weight:bold;margin-right:8px;">🛗 AUFZUG</span>';
    FLOORS.forEach(floor => {
      const isCurrent = floor.id === currentFloorId;
      const a = document.createElement('a');
      a.href = linkFor(floor);
      a.textContent = `${floor.icon} ${floor.name}`;
      a.style.cssText = [
        'text-decoration:none',
        `color:${isCurrent ? '#0a0e1a' : '#9ab0c0'}`,
        `background:${isCurrent ? '#6cf' : 'rgba(255,255,255,0.05)'}`,
        'padding:4px 10px', 'border-radius:14px', 'border:1px solid #2a3a4a'
      ].join(';');
      bar.appendChild(a);
    });
  }

  function renderSharedLogIfPresent() {
    const box = document.getElementById('aufzugSharedLog');
    if (!box) return; // Seite hat keinen Platz dafür vorgesehen — überspringen
    const entries = getSharedLog().slice().reverse();
    box.innerHTML = entries.map(e =>
      `<div><span style="color:#2a3a4a;">[${e.time}]</span> <span style="color:#6cf;">${e.floor}</span>: ${e.msg}</div>`
    ).join('');
  }

  // ─── 5. INIT ────────────────────────────────────────────────────
  function init(opts) {
    currentFloorId = opts.currentId;
    basePath = opts.basePath !== undefined ? opts.basePath : '';
    renderNav();
    renderSharedLogIfPresent();
    log(`Etage geladen: ${currentFloorId}`);
  }

  // ─── ÖFFENTLICHE API ────────────────────────────────────────────
  return {
    init,
    log,
    setSharedValue,
    getSharedValue,
    getSharedLog,
    FLOORS
  };
})();
