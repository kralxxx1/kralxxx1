/* Chapter scripts for the story of Ada Lind (docs/STORY.md). Objectives, the moments each chapter is
   built around, the way out and the chase that starts when the thing you need is taken (DESIGN.md).
   All text comes from the language packs through PB.Story (ST). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const ST = PB.Story;
  const U = PB.U;
  const t = PB.t;
  const PI = Math.PI, H = PI / 2;

  // ------------------------------------------------------------ helpers shared by every chapter
  const itemOf = (g, id) => g.items.find(i => i.id === id || i.type === id);
  const doorOf = (g, id) => g.level.doors.find(d => d.id === id);
  const doorPos = (g, id) => { const o = g.world.doorObjs.get(id); return o ? new THREE.Vector3(o.g.cx, 1.2, o.g.cz) : null; };
  const unlock = (g, id, open) => {
    const d = doorOf(g, id); if (!d) return;
    d.locked = false;
    if (open) { g.world.openDoor(d.id); g.audio.door(d.kind, doorPos(g, id), true, 1, g.world.doorSound && g.world.doorSound(d.id)); }
    g.nav.dirty = true;
  };
  const exitThrough = (g, id, next) => { unlock(g, id, true); g.exitDoorId = id; g.exitNext = next; };
  const inRoom = (g, tag) => { const r = (g.level.meta.rooms || {})[tag]; if (!r) return false; const c = g.level.cellOf(g.player.pos.x, g.player.pos.z); return c.x >= r.x0 && c.x <= r.x1 && c.y >= r.y0 && c.y <= r.y1; };
  const inTrigger = (g, id) => { const tr = g.level.triggers.find(x => x.id === id); if (!tr) return false; const c = g.level.cellOf(g.player.pos.x, g.player.pos.z); return c.x >= tr.x0 && c.x <= tr.x1 && c.y >= tr.y0 && c.y <= tr.y1; };
  const has = (g, id) => g.inv.keys.includes(id);
  const give = (g, id) => { if (!g.inv.keys.includes(id)) g.inv.keys.push(id); g.updateInventoryUI(); };
  const drop = (g, id) => { g.inv.keys = g.inv.keys.filter(k => k !== id); g.updateInventoryUI(); };
  // A shelf counts as claimed once, however many times its chapter is replayed
  const claim = g => { const w = g.save.world, id = g.levelDef.id; w.shelves = w.shelves || []; if (!w.shelves.includes(id)) w.shelves.push(id); };
  // A drawing of Wren's that is not lying anywhere (it came in the parcel, it is in a pocket)
  const giveDrawing = (g, id, after) => {
    if (!g.save.drawings.includes(id)) g.save.drawings.push(id);
    g.ui.notify(t('n.drawing', { n: g.save.drawings.length }), 'key');
    g.readNote(id, after);
  };
  const step = (g, key, vars) => { g.setObj(key, vars); g.completeStep(); };
  const species = (g, kind) => g.entities.filter(e => e.kind === kind);
  // Wake a dormant creature (or several) at its spot
  const wake = (g, kind, state = 'patrol') => { for (const e of species(g, kind)) if (e.state === 'dormant') { e.setState(state); e.mesh.visible = true; } };
  PB.ChapterKit = { itemOf, doorOf, doorPos, unlock, exitThrough, inRoom, inTrigger, has, give, drop, giveDrawing, step, species, wake };
  PB.ChapterUtil = { mementoRadio: {} };

  // A small red figure, there for a second: Wren (never a creature, never close)
  PB.wrenFigure = function (g) {
    const S = PB.SDF, K = PB.SpeciesKit;
    const fn = p => {
      const ax = Math.abs(p[0]);
      let d = S.ellipsoid(p, [0, 0.78, 0], [0.17, 0.3, 0.13]);                       // padded snowsuit
      d = S.smin(d, S.capsule([ax, p[1], p[2]], [0.08, 0.5, 0], [0.09, 0.08, 0.01], 0.07, 0.06), 0.05);
      d = S.smin(d, S.capsule([ax, p[1], p[2]], [0.16, 0.98, 0], [0.2, 0.62, 0.04], 0.055, 0.05), 0.04);
      d = S.smin(d, S.sphere(p, [0, 1.16, 0.0], 0.115), 0.05);                         // hood
      d = S.smin(d, S.sphere(p, [0, 1.27, -0.02], 0.045), 0.03);                       // pompom
      return d;
    };
    const m = new THREE.MeshStandardMaterial({ color: 0xa8141a, roughness: 0.85, vertexColors: true });
    const mesh = K.meshOf('wren:fig', fn, [[-0.3, -0.02, -0.2], [0.3, 1.35, 0.2]], 0.012, m);
    const grp = new THREE.Group(); grp.add(mesh); grp.visible = false;
    g.world.patch(m);
    g.world.group.add(grp);
    return grp;
  };
  // Show Wren at a spot (world coords) for a moment, facing away
  const glimpseWren = (g, x, z, yaw, ms = 1100) => {
    const w = g.wren || (g.wren = PB.wrenFigure(g));
    w.position.set(x, 0, z); w.rotation.y = yaw; w.visible = true;
    g.later(ms, () => { w.visible = false; });
  };
  PB.ChapterKit.glimpseWren = glimpseWren;

  const C = PB.Chapters = {};

  // ================================================================ 0. DEPOT 9
  C.depot = {
    start(g) {
      g.player.hasFlashlight = false;
      g.setObj('depot_log');
    },
    afterCard(g) { g.mono('depot_start', 5); g.later(6000, () => g.mono('depot_start2', 4)); },
    restore(g) {
      if (g.flags.parcelDropped) { const p = itemOf(g, 'parcel'); if (p && !p.taken && p.mesh) p.mesh.visible = true; }
      if (g.flags.dark && !g.flags.power) g.world.setZone(1, false);
      if (g.flags.power) { g.world.setZone(1, true); g.world.setZone(2, true); }
      if (has(g, 'ottoKey') || g.flags.ottoOpen) unlock(g, 'ottoDoor');
      if (g.flags.ottoOpen) g.world.setZone(3, true);
      this.refresh(g);
    },
    // Always worked out from what has happened, so a late timer can never put an old objective back
    refresh(g) {
      const f = g.flags;
      if (f.parcelTaken && !f.dark && !f.power) return g.setObj('depot_parcel');   // the parcel is open; the lights have not gone yet
      g.setObj(!f.logDone ? 'depot_log' : !f.parcelTaken ? 'depot_parcel' : !g.player.hasFlashlight ? 'depot_torch' : !f.power ? 'depot_power' : !has(g, 'ottoKey') && !f.ottoOpen ? 'depot_ledger' : !has(g, 'elevatorKey') ? 'depot_otto' : 'depot_elevator');
    },
    prompt(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'typewriter': return f.logDone ? null : ST.line('depot_typePrompt');
        case 'breaker': return f.power ? null : f.dark ? ST.line('depot_breakerPrompt') : null;
        case 'callPanel': return f.calling ? null : ST.line('depot_callPrompt');
        case 'gmaTape': return ST.line('depot_tapePrompt');
      }
      return undefined;
    },
    canHold(g, o) { return !(o.id === 'breaker' && !g.player.hasFlashlight); },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'typewriter': {
          if (f.logDone) return true;
          f.logDone = true;
          g.player.frozen = true;
          if (g.audio.typewriter) g.audio.typewriter(2.6, o.pos);
          g.later(2800, () => {
            g.player.frozen = false;
            g.mono('depot_logDone', 3);
            step(g, 'depot_log');
            // 02:56: something comes down the chute
            g.later(4200, () => {
              f.parcelDropped = true;
              const p = itemOf(g, 'parcel'); if (p && p.mesh) p.mesh.visible = true;
              const pos = { x: p.pos.x, y: 1.2, z: p.pos.z };
              if (g.audio.chute) g.audio.chute(pos); else g.audio.impact('cardboard', pos, 1);
              g.audio.caption('chute', t('cap.chute'), pos, 5);
              g.later(1400, () => { g.mono('depot_chute', 4); this.refresh(g); });
            });
          });
          return true;
        }
        case 'parcel': {
          g.takeItem(o); f.parcelTaken = true;
          give(g, 'mitten'); g.save.world.mitten = true;
          g.audio.paper();
          g.readNote('depot_tag', () => giveDrawing(g, 'wren1', () => {
            g.mono('depot_mitten', 5);
            // the power goes: the hum drains out of the building, one bank of lights after another
            g.later(5500, () => {
              f.dark = true;
              if (g.audio.powerDown) g.audio.powerDown(); else g.audio.mech('breaker');
              g.world.setZone(1, false);
              g.later(1400, () => { g.mono('depot_dark', 4); this.refresh(g); g.completeStep(); });
            });
          }));
          return true;
        }
        case 'torch':
          g.takeItem(o); g.player.hasFlashlight = true; g.player.battery = 80; g.player.toggleFlash(true);
          g.audio.pickup(); g.mono('depot_torch', 3); g.ui.hint(t('hint.flash'));
          this.refresh(g); if (f.dark) g.completeStep();
          return true;
        case 'gmaTape':
          g.mono(f.tapeSeen ? 'depot_tape2' : 'depot_tape', 4); f.tapeSeen = true;
          return true;
        case 'breaker': {
          if (!f.dark || f.power) return true;
          f.power = true;
          g.audio.mech('breaker', o.pos);
          g.world.setZone(1, true); g.world.setZone(2, true);
          g.fx.flash = 0.15;
          g.mono('depot_powerBack', 4);
          // and from behind the locked door at the end of the corridor, the old tube thumps
          g.later(6000, () => {
            const pos = doorPos(g, 'ottoDoor');
            if (g.audio.tube) g.audio.tube(pos); else g.audio.impact('metal', pos, 0.6);
            g.audio.caption('tube', t('cap.tube'), pos, 5);
            g.later(1800, () => { g.mono('depot_tube', 5); this.refresh(g); g.completeStep(); });
          });
          return true;
        }
        case 'ledger': {
          g.takeItem(o);
          g.audio.paper();
          g.readNote('depot_ledger', () => {
            give(g, 'ottoKey'); unlock(g, 'ottoDoor');
            g.audio.pickup('key'); g.ui.notify(t('n.found', { name: ST.item('ottoKey').name }), 'key');
            g.mono('depot_ledgerAfter', 5);
            step(g, 'depot_otto');
          });
          return true;
        }
        case 'badge':
          g.takeItem(o); give(g, 'badge'); g.save.world.badge = true; g.writeSave();
          g.audio.pickup('key'); g.mono('depot_badge', 5);
          return true;
        case 'callPanel': {
          if (!has(g, 'elevatorKey')) { g.mono(f.panelSeen ? 'depot_noKey2' : 'depot_noKey', 4); f.panelSeen = true; return true; }
          if (f.calling) return true;
          f.calling = true;
          g.player.frozen = true;
          if (g.audio.keyTurn) g.audio.keyTurn(o.pos); else g.audio.click();
          g.mono('depot_256', 4);
          // the car comes up from a long way down
          g.later(1200, () => { if (g.audio.elevatorRun) g.audio.elevatorRun(doorPos(g, 'elevator'), 6); });
          g.later(7000, () => {
            exitThrough(g, 'elevator', 'under');
            g.player.frozen = false;
            const d = doorPos(g, 'elevator');
            if (d) glimpseWren(g, d.x, d.z + 1.4, Math.PI, 900);
            g.later(1100, () => { g.world.setZone(2, false); g.later(250, () => g.world.setZone(2, true)); });
            g.later(1600, () => { g.mono('depot_wren', 4); this.refresh(g); g.completeStep(); });
          });
          return true;
        }
      }
      return false;
    },
    picked(g, id) { if (id === 'elevatorKey') { g.mono('depot_elevKey', 4); step(g, 'depot_elevator'); } },
    unlockPrompt(g, d) { if (d.id === 'ottoDoor' && has(g, 'ottoKey')) return ST.line('depot_ottoUnlock'); return null; },
    unlockDoor(g, d) {
      if (d.id === 'ottoDoor' && has(g, 'ottoKey')) { unlock(g, 'ottoDoor', true); g.flags.ottoOpen = true; g.world.setZone(3, true); return true; }
      return false;
    },
    lockedDoor(g, d) {
      if (d.id === 'ottoDoor') g.mono(g.flags.ottoTried ? 'depot_ottoLocked2' : 'depot_ottoLocked', 4), g.flags.ottoTried = true;
      if (d.id === 'concourseGate') g.mono('depot_gate', 4);
      if (d.id === 'elevator') g.mono('depot_elevatorShut', 4);
    },
    onSorter(g) { if (!g.flags.sorterSeen) { g.flags.sorterSeen = true; g.later(900, () => g.mono('depot_sorter', 4)); } },
    update(g) {
      const f = g.flags;
      // the archive: the first time in, somebody at the far end of the aisle, sorting
      if (f.power && !f.archiveIn && inTrigger(g, 'archiveIn')) {
        f.archiveIn = true; g.mono('depot_archive', 4);
        g.later(2500, () => { for (const e of species(g, 'sorter')) { e.bury(); e.setState('sorting'); e.mesh.visible = true; } });
      }
      if (f.ottoOpen && !f.ottoIn && inTrigger(g, 'ottoIn')) { f.ottoIn = true; g.mono('depot_ottoIn', 5); }
    },
  };

  // ================================================================ 1. THE UNDERNEATH
  const wakeEater = (g, near) => {
    if (g.eater && g.eater.state === 'dormant') { g.eater.wake(near); g.flags.eaterAwake = true; }
  };
  C.under = {
    start(g) { g.setObj('under_walkie'); },
    afterCard(g) { g.mono('under_start', 5); },
    restore(g) {
      if (g.flags.eaterAwake) wakeEater(g, false);
      this.refresh(g);
    },
    refresh(g) {
      const f = g.flags;
      if (f.exitOpen) { const d = g.level.meta.exit ? g.level.meta.exit.door : null; if (d) exitThrough(g, d, 'ferry'); g.setObj('under_leave'); }
      else if (g.inv.pellets >= 4) g.setObj('under_index');
      else if (g.save.world.radio) g.setObj('under_lights', { n: g.inv.pellets });
      else g.setObj('under_walkie');
      const panel = itemOf(g, 'exitPanel');
      if (panel && f.exitOpen && panel.sockets) panel.sockets.forEach(s => s.material.color.setRGB(5, 3.4, 3));
    },
    prompt(g, o) {
      if (o.type === 'exitPanel') return g.flags.exitOpen ? null : g.inv.pellets >= 4 ? ST.line('under_place') : ST.line('under_slots', { n: g.inv.pellets });
      if (o.type === 'radio') return ST.line('under_walkiePrompt');
      if (o.type === 'powerPellet') return ST.line('under_lightPrompt');
      return undefined;
    },
    use(g, o) {
      const f = g.flags;
      if (o.type === 'radio') {
        g.takeItem(o); g.save.world.radio = true; g.writeSave();
        g.audio.pickup('key'); g.mono('under_walkie', 3);
        g.radio('under_otto1', { delay: 3, force: true });
        step(g, 'under_lights', { n: g.inv.pellets });
        return true;
      }
      if (o.type === 'powerPellet') {
        g.takeItem(o); g.inv.pellets++;
        g.powerT = 8; g.audio.pickup('pellet'); g.fx.flash = 0.2;
        const n = g.inv.pellets;
        if (n === 1) { g.mono('under_light1', 5); g.radio('under_lights', { delay: 6 }); }
        if (n === 2) g.radio('under_wallpaper', { delay: 3 });
        if (n === 3) g.radio('under_hum', { delay: 3 });
        if (n === 4) {
          // the fourth light: the oldest thing down here wakes, and it is close
          g.mono('under_light4', 4);
          g.later(2500, () => { wakeEater(g, true); g.radio('under_eater', { delay: 1 }); });
          g.setObj('under_index');
        } else g.setObj('under_lights', { n });
        g.completeStep(); g.updateInventoryUI();
        return true;
      }
      if (o.type === 'exitPanel') {
        if (f.exitOpen) return true;
        if (g.inv.pellets < 4) { g.mono('under_indexSeen', 4); f.exitSeen = true; g.radio('under_index'); return true; }
        f.exitOpen = true;
        o.sockets.forEach((s, k) => g.later(k * 350, () => { s.material.color.setRGB(5, 3.4, 3); g.audio.beep(); }));
        // Otto's badge, if you brought it from his desk, goes back to him here
        const badge = !!g.save.world.badge && !g.save.world.badgeReturned;
        if (badge) { if (has(g, 'badge')) drop(g, 'badge'); g.save.world.badgeReturned = true; g.writeSave(); }
        g.later(1600, () => { const d = g.level.meta.exit ? g.level.meta.exit.door : null; if (d) exitThrough(g, d, 'ferry'); g.setObj('under_leave'); g.completeStep(); g.radio('under_open'); if (badge) g.radio('under_badge', { delay: 16 }); });
        g.updateInventoryUI();
        return true;
      }
      return false;
    },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'wallpaperMan' && !f.wpSeen) { f.wpSeen = true; g.later(1500, () => g.mono('under_wpSeen', 4)); }
      if (ent.kind === 'eater' && !f.eaterSeen) { f.eaterSeen = true; g.mono('under_eaterSeen', 3.5); }
    },
    update(g) {
      const f = g.flags;
      if (!f.exitSeen) {
        const d = g.level.meta.exit ? doorOf(g, g.level.meta.exit.door) : null;
        if (d) {
          const p = doorPos(g, d.id), pl = g.player.pos;
          if (p && Math.hypot(pl.x - p.x, pl.z - p.z) < 9 && g.level.los(pl.x, pl.z, p.x, p.z)) { f.exitSeen = true; g.mono('under_indexSeen', 5); }
        }
      }
      if (g.eater) g.eater.huntBias = g.inv.pellets >= 4;
      // A hummer close by: the place's hum deepens before you see anything wrong
      if (!f.humHeard) for (const e of species(g, 'hummer')) if (e.distToPlayer() < 8) { f.humHeard = true; g.later(800, () => g.mono('under_humNear', 4)); break; }
    },
  };

  // ================================================================ 2. SAINT BRIGID
  // The ferry in fog. The lie: Captain Aal said the deckhand Pim Rask left the fog bell and ran. The page
  // he tore out of the logbook says Aal was drunk in his cabin and the boy rang the bell to the end.
  // Claim: the page back in the logbook. Way out: lifeboat 2 (davit key from the bridge, crank from the
  // flooded engine room; taking the crank brings up the Drowned).
  C.ferry = {
    start(g) {
      this.lowering = null;
      g.setObj('ferry_start');
      // lifeboat 2 is its own object so it can be lowered
      const b = g.meshFromDef('lifeboat');
      b.position.set(8.5 * 3, 1.9, 0.25 * 3); g.world.group.add(b); g.lifeboat = b;
      g.later(500, () => { for (const e of species(g, 'drowned')) e.sp = Object.assign({}, e.sp, { ambushR: 2.2 }); });
    },
    afterCard(g) { g.mono('ferry_start', 5); g.radio('ferry_otto1', { delay: 7 }); },
    restore(g) {
      if (has(g, 'bridgeKey') || g.flags.bridgeOpen) unlock(g, 'bridgeDoor');
      if (g.flags.crank) this.wakeDrowned(g, true);
      this.refresh(g);
    },
    refresh(g) {
      const f = g.flags;
      g.setObj(!f.winchSeen ? 'ferry_start' : !f.claimed ? (has(g, 'logPage') ? 'ferry_logbook' : f.bridgeTried || has(g, 'bridgeKey') ? 'ferry_captain' : 'ferry_bridge') : !has(g, 'davitKey') ? 'ferry_key' : !has(g, 'crank') ? 'ferry_crank' : 'ferry_lower');
    },
    prompt(g, o) {
      switch (o.id) {
        case 'winch2': return g.flags.lowering ? null : ST.line(has(g, 'davitKey') && has(g, 'crank') ? 'ferry_winchGo' : 'ferry_winchLook');
        case 'logbook': return ST.line(has(g, 'logPage') ? 'ferry_logbookPut' : 'ferry_logbookRead');
        case 'bell': return ST.line('ferry_bellPrompt');
      }
      return undefined;
    },
    canHold(g, o) { return o.id !== 'winch2' || (has(g, 'davitKey') && has(g, 'crank') && g.flags.claimed); },
    holdStart(g, o) { if (o.id === 'winch2' && g.audio.winch) g.audio.winch(o.pos); if (o.id === 'winch2') g.noise(o.pos.x, o.pos.z, 26, 'loud'); },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'winch2': {
          if (!f.winchSeen) { f.winchSeen = true; g.mono('ferry_winch', 5); this.refresh(g); g.completeStep(); return true; }
          if (!has(g, 'davitKey') || !has(g, 'crank')) { g.mono(has(g, 'davitKey') ? 'ferry_winchNoCrank' : has(g, 'crank') ? 'ferry_winchNoKey' : 'ferry_winch2', 4); return true; }
          if (!f.claimed) { g.mono('ferry_brake', 5); return true; }
          if (!f.lowering) this.lower(g);
          return true;
        }
        case 'logPage':
          g.takeItem(o); give(g, 'logPage'); g.audio.paper();
          g.readNote('ferry_logpage', () => { g.mono('ferry_pageAfter', 6); this.refresh(g); g.completeStep(); });
          return true;
        case 'logbook': {
          if (!has(g, 'logPage')) { g.readNote('ferry_logbook', () => g.mono('ferry_logbookGap', 4)); return true; }
          if (f.claimed) { g.readNote('ferry_logbook'); return true; }
          // the claim: the page goes back where it was torn from
          drop(g, 'logPage'); f.claimed = true; claim(g);
          // the logbook has been read, whole: it counts once in the papers found, whichever way round
          if (!g.save.notes.includes('ferry_logbook')) g.save.notes.push('ferry_logbook');
          g.audio.paper();
          g.readNote('ferry_logbookFull', () => {
            g.mono('ferry_claimed', 6);
            // far off in the fog, the bell, once
            g.later(4000, () => { const b = itemOf(g, 'bell'); if (g.audio.shipBell) g.audio.shipBell(b ? b.pos : null, 0.35); g.audio.caption('bell', t('cap.bellFar'), b ? b.pos : null, 5); });
            g.later(7000, () => g.radio('ferry_otto2'));
            this.refresh(g); g.completeStep(); g.checkpoint(true);
          });
          return true;
        }
        case 'bell':
          if (g.audio.shipBell) g.audio.shipBell(o.pos, 0.6);
          g.noise(o.pos.x, o.pos.z, 40, 'loud');
          g.mono(f.claimed ? 'ferry_bellAfter' : 'ferry_bell', 4);
          return true;
      }
      return false;
    },
    picked(g, id) {
      if (id === 'bridgeKey') { unlock(g, 'bridgeDoor'); g.mono('ferry_bridgeKey', 4); this.refresh(g); }
      if (id === 'davitKey') { g.mono('ferry_davitKey', 4); this.refresh(g); g.completeStep(); }
      if (id === 'crank') {
        // the water in the engine room moves: they were waiting for someone to take it
        g.mono('ferry_crank', 4);
        g.later(1500, () => this.wakeDrowned(g));
        this.refresh(g); g.completeStep();
      }
    },
    wakeDrowned(g, quiet) {
      g.flags.crank = true;
      for (const e of species(g, 'drowned')) {
        e.sp = Object.assign({}, e.sp, { ambushR: 9, hunt: true });
        if (e.state === 'buried' && !quiet) g.later(Math.random() * 2500, () => { if (e.state === 'buried') e.emergeNear(g.player.pos.x, g.player.pos.z); });
      }
      if (!quiet) { if (g.audio.waterSurge) g.audio.waterSurge(g.player.pos); g.player.addTrauma(0.2); }
    },
    lower(g) {
      const f = g.flags; f.lowering = true;
      const pl = g.player, b = g.lifeboat;
      pl.frozen = true; pl.freeLook = true; pl.flashOn = false;
      g.mono('ferry_lower', 4);
      g.fadeTo(1, 0.6, () => {
        // into the boat
        pl.spawn(b.position.x, b.position.z + 0.2, PI / 2 + 0.3); pl.camLift = b.position.y + 0.2;
        for (const e of g.entities) e.update = () => {};
        g.fadeTo(0, 0.8);
        if (g.audio.winchRun) g.audio.winchRun(9);
        let t0 = g.time;
        f.lowerT = 0;
        this.lowering = () => {
          const k = Math.min(1, (g.time - t0) / 10);
          b.position.y = 1.9 - k * 8.2 + Math.sin(g.time * 3) * 0.02 * (1 - k);
          b.rotation.z = Math.sin(g.time * 1.3) * 0.03;
          pl.camLift = b.position.y + 0.25; pl.camRoll = b.rotation.z;
          if (k >= 1 && !f.touched) {
            f.touched = true;
            // the boat touches the water; in the fog the bell starts ringing by itself, steadily
            if (g.audio.splash) g.audio.splash(b.position);
            g.later(1800, () => { const bell = itemOf(g, 'bell'); if (g.audio.shipBell) g.audio.shipBellRinging(bell ? bell.pos : null); g.mono('ferry_end', 6); });
            g.later(9000, () => { pl.camLift = 0; pl.camRoll = 0; pl.frozen = false; g.whenPlaying(() => g.exitLevel('pinewood')); });
          }
        };
      });
    },
    unlockPrompt(g, d) { if (d.id === 'bridgeDoor' && has(g, 'bridgeKey')) return ST.line('ferry_bridgeUnlock'); return null; },
    unlockDoor(g, d) { if (d.id === 'bridgeDoor' && has(g, 'bridgeKey')) { unlock(g, 'bridgeDoor', true); g.flags.bridgeOpen = true; return true; } return false; },
    lockedDoor(g, d) { if (d.id === 'bridgeDoor') { g.mono('ferry_bridgeLocked', 4); if (!g.flags.bridgeTried) { g.flags.bridgeTried = true; this.refresh(g); } } },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'bellman' && !f.bellmanSeen) { f.bellmanSeen = true; g.later(1200, () => g.radio('ferry_bellman')); }
      if (ent.kind === 'passenger' && !f.passSeen) { f.passSeen = true; g.later(1500, () => g.mono('ferry_passengers', 4)); }
      if (ent.kind === 'drowned' && !f.drownedSeen) { f.drownedSeen = true; g.later(1200, () => g.mono('ferry_drowned', 4)); }
    },
    update(g, dt) {
      const f = g.flags;
      if (this.lowering) { this.lowering(); return; }
      if (!f.loungeIn && inTrigger(g, 'lounge')) { f.loungeIn = true; g.mono('ferry_lounge', 5); }
      if (!f.engineIn && inTrigger(g, 'engineIn')) { f.engineIn = true; g.mono('ferry_engineRoom', 4); }
      if (!f.foreIn && inTrigger(g, 'deckFore')) { f.foreIn = true; g.mono('ferry_fore', 4); }
    },
  };

  // ============================================================ 3. PINEWOOD
  const CELL = 3;
  C.pinewood = {
    start(g) {
      this.drive = null; this.seated = false; this.fillT = 0; this.swingA = 0;
      g.setObj('pine_start');
      const w = g.world, L = g.level;
      // the film on the screen and the projector's beam from the booth port
      const sx = 17 * CELL, sz = 1.75 * CELL + 0.09;
      this.film = PB.DriveIn.film(sx, 4.6 + 5.5, sz, 27, 11);
      w.group.add(this.film.mesh);
      const port = [16.5 * CELL, 1.55, 20 * CELL - 0.05];
      this.beam = PB.DriveIn.beam(port, [[sx - 13.5, 4.6, sz], [sx + 13.5, 4.6, sz], [sx + 13.5, 15.6, sz], [sx - 13.5, 15.6, sz]]);
      w.group.add(this.beam.mesh);
      // the swings under the screen: one hangs still, one swings while nobody is near it
      const sp = L.spots.swing[0];
      this.swings = [-0.95, 0.95].map(dx => { const m = g.meshFromDef('swing'); m.position.set(sp.wx + dx, 2.45, sp.wz); w.group.add(m); return m; });
      // the gate's two leaves and the chain between them
      const gs = L.spots.gate[0];
      this.gate = [[-3.0, 0], [3.0, PI]].map(([dx, ry]) => { const m = g.meshFromDef('gateLeaf'); m.position.set(gs.wx + dx, 0, gs.wz); m.rotation.y = ry; w.group.add(m); return m; });
      this.chain = g.meshFromDef('gateChain'); this.chain.position.set(gs.wx, 0, gs.wz); w.group.add(this.chain);
      this.gateOpen = 0;
      // the Strands' wagon, and its headlights (dark until there is a battery in it)
      const vi = L.meta.vehicles.findIndex(v => v.key === 'strand');
      this.wagon = w.vehicles[vi]; this.wagonDef = L.meta.vehicles[vi];
      const beam = new THREE.SpotLight(0xfff0d0, 0, 34, 0.42, 0.55, 1.3); beam.position.set(2.6, 0.75, 0); beam.target.position.set(14, -0.2, 0);
      this.wagon.add(beam); this.wagon.add(beam.target); this.headlights = beam;
      const lamps = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.05, 0.05, 0.04) });
      this.lampMat = lamps;
      for (const z of [-0.62, 0.62]) { const d = new THREE.Mesh(new THREE.CircleGeometry(0.09, 16), lamps); d.position.set(2.56, 0.72, z); d.rotation.y = H; this.wagon.add(d); }
    },
    afterCard(g) { g.mono('pine_start', 5); g.radio('pine_otto1', { delay: 8 }); },
    restore(g) {
      const f = g.flags;
      if (f.batteryTaken) g.world.setZone(3, false);
      if (f.battery) this.lightsOn(g, true);
      if (f.claimed) { this.film.off(); this.beam.mesh.visible = false; this.chain.visible = false; this.gateOpen = 1; g.world.setZone(4, false); }
      if (f.failed) this.wakeAll(g, true);
      this.refresh(g);
    },
    parts(g) { const f = g.flags; return (f.battery ? 1 : 0) + (f.fuel ? 1 : 0) + (has(g, 'carKeys') ? 1 : 0); },
    refresh(g) {
      const f = g.flags, n = this.parts(g);
      if (f.driving) return g.setObj('pine_leave');
      if (!f.wagonSeen) return g.setObj('pine_start');
      if (n < 3) return g.setObj('pine_parts', { n });
      if (!f.failed || f.claimed) return g.setObj('pine_startCar');
      g.setObj(has(g, 'stub') ? 'pine_claim' : 'pine_stubFind');
    },
    prompt(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'reelCan': return f.claimed ? null : ST.line(has(g, 'stub') ? 'pine_canPut' : 'pine_canLook');
        case 'tank': return f.fuel || has(g, 'fuel') ? null : ST.line(has(g, 'jerrycan') ? 'pine_tankPrompt' : 'pine_tankLook');
        case 'wagon':
          if (f.driving) return null;
          if (has(g, 'carBattery') && !f.battery) return ST.line('pine_wagonBattery');
          if (has(g, 'fuel') && !f.fuel) return ST.line('pine_wagonFuel');
          if (this.parts(g) === 3) return ST.line(f.claimed && f.failed ? 'pine_wagonGo' : 'pine_wagonStart');
          return ST.line('pine_wagonLook');
      }
      return undefined;
    },
    canHold(g, o) {
      if (o.id === 'tank') return has(g, 'jerrycan');
      if (o.id === 'wagon') return this.parts(g) === 3 && !(has(g, 'carBattery') && !g.flags.battery) && !(has(g, 'fuel') && !g.flags.fuel);
      return true;
    },
    holdStart(g, o) {
      if (o.id === 'tank') { g.mono('pine_fill', 4); this.fillT = 0.01; if (g.audio.fuelTap) g.audio.fuelTap(o.pos); g.noise(o.pos.x, o.pos.z, 34, 'loud'); }
      if (o.id === 'wagon' && g.audio.engineCrank) g.audio.engineCrank(this.wagon.position, !g.flags.failed || !g.flags.claimed);
    },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'stub':
          g.takeItem(o); give(g, 'stub'); g.audio.pickup('item');
          g.mono('pine_stub', 5); this.refresh(g); g.completeStep();
          return true;
        case 'reelCan':
          if (f.claimed) return true;
          if (!has(g, 'stub')) { g.mono('pine_canLook', 4); return true; }
          this.claim(g);
          return true;
        case 'tank':
          if (!has(g, 'jerrycan')) { g.mono('pine_tankNoCan', 4); return true; }
          drop(g, 'jerrycan'); give(g, 'fuel'); this.fillT = 0;
          g.mono('pine_filled', 3); this.refresh(g); g.completeStep();
          return true;
        case 'wagon': {
          if (!f.wagonSeen) { f.wagonSeen = true; g.mono('pine_wagon', 6); this.refresh(g); g.completeStep(); return true; }
          if (has(g, 'carBattery') && !f.battery) {
            drop(g, 'carBattery'); f.battery = true; if (g.audio.carHood) g.audio.carHood(this.wagon.position);
            g.later(1400, () => { this.lightsOn(g); g.mono('pine_fitBattery', 5); g.later(5200, () => this.treeInBeam(g)); });
            this.refresh(g); g.completeStep(); g.checkpoint(true);
            return true;
          }
          if (has(g, 'fuel') && !f.fuel) { drop(g, 'fuel'); f.fuel = true; if (g.audio.fuelPour) g.audio.fuelPour(this.wagon.position); g.mono('pine_fuel', 3); this.refresh(g); g.completeStep(); g.checkpoint(true); return true; }
          if (this.parts(g) < 3) { g.mono('pine_wagonNeeds', 5); return true; }
          this.tryStart(g);
          return true;
        }
      }
      return false;
    },
    picked(g, id) {
      const f = g.flags;
      if (id === 'carBattery') { f.batteryTaken = true; g.mono('pine_battery', 3); g.later(900, () => { g.world.setZone(3, false); g.later(600, () => g.mono('pine_batteryDark', 3)); }); this.refresh(g); }
      if (id === 'carKeys') { g.mono('pine_keys', 4); this.refresh(g); g.completeStep(); }
      if (id === 'jerrycan') { g.mono('pine_can', 3); }
    },
    lightsOn(g, quiet) {
      this.headlights.intensity = 55; this.lampMat.color.setRGB(3, 2.8, 2.4);
      if (!quiet && g.audio.click) g.audio.click(this.wagon.position);
    },
    // In the headlights, at the edge of the trees: one of the Pines, standing where no tree was
    treeInBeam(g) {
      if (g.flags.failed) return;
      const pine = species(g, 'pines').find(e => e.state !== 'chase');
      if (!pine) return;
      const w = this.wagon, a = w.rotation.y, fx = Math.cos(a), fz = -Math.sin(a);
      for (const d of [15, 13, 17, 11]) {
        const x = w.position.x + fx * d, z = w.position.z + fz * d, c = g.level.cellOf(x, z);
        if (!g.level.passable(c.x, c.y) || !pine.cellOk(c.x, c.y)) continue;
        pine.pos.set(x, 0, z); pine.cell = c; pine.next = null; pine.heading = Math.atan2(-fx, -fz); pine.setState('patrol');
        g.later(1800, () => g.mono('pine_inBeam', 4));
        return;
      }
    },
    tryStart(g) {
      const f = g.flags;
      if (!f.failed) {
        // the first time it dies, loudly, and everything on the field hears it
        f.failed = true;
        if (g.audio.engineFail) g.audio.engineFail(this.wagon.position);
        g.mono('pine_startFail', 5);
        g.later(900, () => this.wakeAll(g));
        this.refresh(g); g.completeStep(); g.checkpoint(true);
        return;
      }
      if (!f.claimed) {
        if (g.audio.engineFail) g.audio.engineFail(this.wagon.position, 0.6);
        g.noise(this.wagon.position.x, this.wagon.position.z, 30, 'loud');
        g.mono('pine_notYet', 4);
        if (!has(g, 'stub')) g.later(4500, () => g.mono('pine_stubHint', 5));
        return;
      }
      this.startDrive(g);
    },
    wakeAll(g, quiet) {
      const pl = g.player.pos;
      for (const e of g.entities) {
        e.sp = Object.assign({}, e.sp, { hunt: true, lose: (e.sp.lose || 8) * 1.5 });
        if (quiet) continue;
        e.lastKnown = { x: pl.x, z: pl.z }; e.awareness = Math.max(e.awareness || 0, 0.9);
        if (e.state !== 'chase') e.setState('investigate');
      }
      if (!quiet) { g.noise(pl.x, pl.z, 90, 'loud'); g.fearAdd(25); }
    },
    // The draw: the stub goes in the can, and every speaker on the field reads the number
    claim(g) {
      const f = g.flags;
      drop(g, 'stub'); f.claimed = true; claim(g);
      g.audio.paper();
      g.mono('pine_claimed', 5);
      g.later(3500, () => {
        if (g.audio.speakerField) g.audio.speakerField();
        g.radio('pine_draw', { force: true });
      });
      g.later(15000, () => { g.mono('pine_draw', 4); this.film.end(); });
      g.later(22000, () => {
        // the chain drops off the gate; the projector stops; the screen's light goes out
        this.gateOpen = 0.001; if (g.audio.gateChain) g.audio.gateChain(this.chain.position);
        this.chain.visible = false; g.mono('pine_gateOpen', 4);
      });
      g.later(29000, () => { this.beam.mesh.visible = false; g.world.setZone(4, false); g.radio('pine_otto2'); });
      this.refresh(g); g.completeStep(); g.checkpoint(true);
    },
    startDrive(g) {
      const f = g.flags; f.driving = true; this.refresh(g);
      const pl = g.player;
      pl.frozen = true; pl.freeLook = true; pl.flashOn = false;
      if (g.audio.engineStart) g.audio.engineStart(this.wagon.position);
      g.mono('pine_start2', 4);
      for (const e of g.entities) e.update = () => {};
      g.fadeTo(1, 0.8, () => {
        // on the road, heading for the gate
        const w = this.wagon, road = 25 * CELL;
        w.position.set(road, 0, 21.2 * CELL); w.rotation.set(0, -H, 0);      // facing south (+z)
        this.gateOpen = Math.max(this.gateOpen, 0.001);
        this.lightsOn(g, true);
        g.fadeTo(0, 1.0);
        const t0 = g.time;
        this.drive = dt => {
          const t = g.time - t0, v = Math.min(6.5, t * 1.6);
          w.position.z += v * dt;
          w.position.y = Math.sin(t * 11) * 0.008 * Math.min(1, v);
          pl.pos.set(w.position.x - 0.4, 0, w.position.z - 0.15); pl.camLift = -0.45;
          if (!this.seated) { this.seated = true; pl.yaw = PI; pl.pitch = -0.02; }
          if (t > 2.5 && !f.mirror) { f.mirror = true; g.mono('pine_end', 6); }
          if (w.position.z > 27.6 * CELL && !f.out) { f.out = true; g.whenPlaying(() => { pl.camLift = 0; pl.frozen = false; g.exitLevel('mine'); }); }
        };
      });
    },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'stag' && !f.stagSeen) { f.stagSeen = true; g.later(800, () => g.mono('pine_stag', 4)); g.later(4200, () => g.radio('pine_ottoStag')); }
      if (ent.kind === 'usher' && !f.usherSeen) { f.usherSeen = true; g.later(900, () => g.mono('pine_usher', 4)); }
      if (ent.kind === 'pines' && !f.pinesSeen) { f.pinesSeen = true; g.later(1200, () => g.mono('pine_pines', 4)); }
    },
    update(g, dt) {
      const f = g.flags, pl = g.player.pos, t = g.time;
      if (this.film) this.film.update(t, dt, g.scene.fog, 0.32);
      if (this.beam) this.beam.uniforms.time.value = t;
      // the swing swings while nobody is near; it slows and stops as you come close
      if (this.swings) {
        const s = this.swings[1], d = Math.hypot(pl.x - s.position.x, pl.z - s.position.z);
        const target = d > 11 ? 1 : 0;
        this.swingA = U.damp(this.swingA, target, d > 11 ? 0.4 : 1.6, dt);
        s.rotation.x = Math.sin(t * 1.55) * 0.55 * this.swingA;
        this.swings[0].rotation.x = Math.sin(t * 1.55 + 2) * 0.03 * this.swingA;
        if (!f.swingSeen && d < 26 && d > 11) {
          const fw = g.player.forward(), dx = s.position.x - pl.x, dz = s.position.z - pl.z;
          if ((dx * fw.x + dz * fw.z) / d > 0.93) { f.swingSeen = true; g.mono('pine_swing', 4); }
        }
      }
      // the gate swings open once the chain is off
      if (this.gateOpen > 0 && this.gateOpen < 1) {
        this.gateOpen = Math.min(1, this.gateOpen + dt * 0.35);
        const k = U.smoothstep(0, 1, this.gateOpen) * 1.35;
        this.gate[0].rotation.y = k; this.gate[1].rotation.y = PI - k;
      }
      if (this.drive) { this.drive(dt); return; }
      // filling the jerrycan: the tap bangs and spits the whole time
      if (g.holding && g.holding.it.ref && g.holding.it.ref.id === 'tank') {
        this.fillT += dt;
        if (this.fillT > 1.2) { this.fillT = 0.01; const o = g.holding.it.ref; g.noise(o.pos.x, o.pos.z, 30, 'loud'); }
      }
      if (!f.toiletsIn && inTrigger(g, 'toilets')) { f.toiletsIn = true; g.mono('pine_toilets', 4); }
      if (!f.boothIn && inTrigger(g, 'booth')) { f.boothIn = true; g.mono('pine_booth', 3); }
      if (!f.clearingIn && inTrigger(g, 'clearing')) { f.clearingIn = true; g.mono('pine_clearing', 4); }
      const gs = g.level.spots.gate[0];
      if (!f.gateSeen && Math.hypot(pl.x - gs.wx, pl.z - gs.wz) < 5) { f.gateSeen = true; g.mono('pine_gate', 4); }
      if (!f.wagonSeen && this.wagon && Math.hypot(pl.x - this.wagon.position.x, pl.z - this.wagon.position.z) < 5.5) {
        f.wagonSeen = true; g.mono('pine_wagon', 6); g.later(6500, () => g.mono('pine_wagonNeeds', 5)); this.refresh(g); g.completeStep();
      }
    },
  };

  // ============================================================ 4. HOLLOW CREEK
  // The shaft: a scene built away from the map (the cage rides in it), rock walls and timber buntons that
  // slide past while the cage and the player stay put.
  function buildShaft(g) {
    const T = PB.Tex, M = PB.Models.MATS, SX = -60, SZ = 40;
    const grp = new THREE.Group(); grp.position.set(SX, 0, SZ); grp.visible = false;
    const rs = T.get('rock', 512), map = rs.map.clone(); map.needsUpdate = true; map.wrapS = map.wrapT = THREE.RepeatWrapping; map.repeat.set(1.2, 40);
    const walls = new THREE.Mesh(new THREE.BoxGeometry(3.8, 120, 3.4), new THREE.MeshStandardMaterial({ map, color: 0x6a6258, roughness: 0.95, side: THREE.BackSide }));
    grp.add(walls);
    const plain = name => { const sp = M[name] || {}; return new THREE.MeshStandardMaterial({ color: sp.color != null ? sp.color : 0x777777, roughness: sp.rough != null ? sp.rough : 0.7, metalness: sp.metal || 0, transparent: !!sp.transparent, opacity: sp.opacity != null ? sp.opacity : 1 }); };
    const timber = plain('mineTimber'), N = 60, step = 2;
    const bunt = new THREE.InstancedMesh(new THREE.BoxGeometry(3.8, 0.22, 0.22), timber, N * 2);
    const guides = [];
    for (const x of [-1.05, 1.05]) { const gm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 120, 0.12), timber); gm.position.set(x, 0, -0.78); grp.add(gm); guides.push(gm); }
    grp.add(bunt);
    const cage = g.meshFromDef('mineCage', name => plain(name)); grp.add(cage);
    const lamp = new THREE.PointLight(0xffc880, 1.6, 7, 1.6); lamp.position.set(0.3, 2.25, 0); grp.add(lamp);
    // (with the level's own objects, so it goes when the level does)
    g.world.group.add(grp);
    const sh = {
      grp, walls, bunt, lamp, SX, SZ, off: 0,
      place(off) {
        this.off = off;
        const d = new THREE.Object3D(); let k = 0;
        for (let i = 0; i < N; i++) {
          const y = ((i * step - off) % (N * step) + N * step) % (N * step) - 20;
          for (const z of [-1.6, 1.6]) { d.position.set(0, y, z * 0.95); d.updateMatrix(); bunt.setMatrixAt(k++, d.matrix); }
        }
        bunt.instanceMatrix.needsUpdate = true;
        map.offset.y = -off / 3;
      },
    };
    sh.place(0);
    return sh;
  }
  const MINE_TAGS = ['tagA', 'tagB', 'tagC'];
  C.mine = {
    start(g) {
      this.ride = null; this.knockT = 6; this.coughT = 0; this.gasIn = false; this.tagMeshes = [];
      g.setObj('mine_start');
      const f = g.flags;
      if (!this.gasEl) { const el = document.createElement('div'); el.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:6;opacity:0;background:radial-gradient(ellipse at center, rgba(120,120,40,0.0) 20%, rgba(90,96,30,0.55) 100%);transition:opacity 0.6s'; document.body.appendChild(el); this.gasEl = el; }
      this.gasEl.style.opacity = 0;
      this.shaft = null;
      void f;
    },
    afterCard(g) { g.mono('mine_start', 4); g.radio('mine_otto1', { delay: 10 }); },
    restore(g) {
      const f = g.flags;
      if (f.down) { /* the checkpoint is below: nothing to rebuild but the board */ }
      if (f.hung) this.showTags(g, f.hung);
      if (f.genOn) g.world.setZone(2, true);
      this.refresh(g);
    },
    held(g) { return (has(g, 'tin') ? 4 : 0) + MINE_TAGS.filter(id => has(g, id)).length; },
    refresh(g) {
      const f = g.flags, n = (f.hung || 0) + this.held(g);
      if (!f.down) return g.setObj(f.needCanary && !has(g, 'canary') ? 'mine_canary' : has(g, 'canary') ? 'mine_down' : 'mine_start');
      if (!f.claimed) return g.setObj(this.held(g) && (f.boardSeen || n >= 7) ? 'mine_board' : 'mine_tags', { n });
      if (!f.genOn) return g.setObj(f.genFuel || has(g, 'diesel') ? 'mine_gen' : 'mine_power');
      g.setObj('mine_ride');
    },
    prompt(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'cageTop': return f.down ? null : ST.line(has(g, 'canary') ? 'mine_cageGo' : 'mine_cageLook');
        case 'cageBottom': return this.ride ? null : ST.line(f.genOn && f.claimed ? 'mine_cageUp' : 'mine_cageLook');
        case 'board': return f.claimed ? null : ST.line(this.held(g) ? 'mine_boardPut' : 'mine_boardLook');
        case 'gen': return f.genOn ? null : ST.line(f.genFuel ? 'mine_genPrompt' : has(g, 'diesel') ? 'mine_genFuelPrompt' : 'mine_genLook');
        case 'hoist': return ST.line('mine_hoistPrompt');
        case 'fireDoorX': return ST.line('mine_fireLook');
      }
      return undefined;
    },
    canHold(g, o) {
      if (o.id === 'gen') return g.flags.genFuel && !g.flags.genOn;
      if (o.id === 'hoist') return false;
      return true;
    },
    holdStart(g, o) { if (o.id === 'gen' && g.audio.pullStart) g.audio.pullStart(o.pos); },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'canary': g.takeItem(o); give(g, 'canary'); g.audio.pickup('item'); g.mono('mine_canary', 3); this.refresh(g); g.completeStep(); return true;
        case 'cageTop':
          if (f.down) return true;
          if (!has(g, 'canary')) { f.needCanary = true; g.mono('mine_noCanary', 5); this.refresh(g); return true; }
          this.rideDown(g); return true;
        case 'cageBottom':
          if (this.ride) return true;
          if (!f.genOn) { g.mono('mine_noCage', 4); return true; }
          if (!f.claimed) { g.mono('mine_notYet', 4); return true; }
          this.rideUp(g); return true;
        case 'tin':
          g.takeItem(o); give(g, 'tin'); g.audio.pickup('item');
          g.readNote('mine_confession', () => { g.mono('mine_tin', 5); this.refresh(g); g.completeStep(); });
          return true;
        case 'tagA': case 'tagB': case 'tagC':
          g.takeItem(o); give(g, o.id); g.audio.pickup('key');
          g.mono('mine_tagCount', 2, { n: (f.hung || 0) + this.held(g) }); this.refresh(g);
          return true;
        case 'board': {
          f.boardSeen = true;
          const n = this.held(g);
          if (!n) { g.mono(f.hung ? 'mine_boardNone' : 'mine_board', 5); this.refresh(g); return true; }
          drop(g, 'tin'); for (const id of MINE_TAGS) drop(g, id);
          f.hung = (f.hung || 0) + n; this.showTags(g, f.hung);
          if (g.audio.tagHang) g.audio.tagHang(o.pos, n);
          if (f.hung >= 7) this.claim(g); else { g.mono('mine_hung', 3); this.refresh(g); g.checkpoint(true); }
          return true;
        }
        case 'gen':
          if (f.genOn) return true;
          if (!f.genFuel) {
            if (!has(g, 'diesel')) { g.mono('mine_genNoFuel', 3); return true; }
            drop(g, 'diesel'); f.genFuel = true; if (g.audio.fuelPour) g.audio.fuelPour(o.pos); g.mono('mine_genFuel', 3); this.refresh(g); return true;
          }
          // it catches, roars, and every bulb along the haulage comes on
          f.genOn = true;
          if (g.audio.generatorStart) g.audio.generatorStart(o.pos);
          g.world.setZone(2, true);
          g.noise(o.pos.x, o.pos.z, 60, 'loud');
          for (const e of species(g, 'lamplighter')) { e.lastKnown = { x: o.pos.x, z: o.pos.z }; if (e.state !== 'chase') e.setState('investigate'); }
          g.mono('mine_genOn', 5); this.refresh(g); g.completeStep(); g.checkpoint(true);
          return true;
        case 'hoist': g.mono(f.genOn ? 'mine_hoistLit' : 'mine_hoistDead', 4); if (!f.genOn && f.claimed) this.refresh(g); return true;
        case 'fireDoorX': g.mono(f.claimed ? 'mine_fireOpen' : 'mine_fireDoor', 4); return true;
      }
      return false;
    },
    picked(g, id) { if (id === 'diesel') { g.mono('mine_diesel', 3); this.refresh(g); } },
    // the tags on their hooks, as brass discs on the board
    showTags(g, n) {
      const p = g.level.props.find(q => q.type === 'tallyBoard'); if (!p) return;
      for (const m of this.tagMeshes) g.world.group.remove(m);
      this.tagMeshes = [];
      const c = Math.cos(p.rot), s2 = Math.sin(p.rot);
      for (const h of PB.Mine.SEVEN.map(q => q[0]).slice(0, n)) {
        const [lx, ly] = PB.Mine.hookPos(h), lz = 0.085;
        const m = g.meshFromDef('tallyTag'); m.rotation.set(H, 0, 0);
        const wrap = new THREE.Group(); wrap.add(m); wrap.rotation.y = p.rot;
        // local (x, z) turned by the board's rotation about y
        wrap.position.set(p.x + lx * c + lz * s2, ly - 0.045, p.z - lx * s2 + lz * c);
        g.world.group.add(wrap); this.tagMeshes.push(wrap);
      }
    },
    claim(g) {
      const f = g.flags;
      f.claimed = true; claim(g);
      g.mono('mine_claimed', 5);
      g.later(5000, () => { g.mono('mine_knockStop', 3); });
      g.later(9000, () => { f.drawingOut = true; g.radio('mine_ottoClaim'); });
      this.refresh(g); g.completeStep(); g.checkpoint(true);
    },
    gas(g, dt) {
      const f = g.flags, pl = g.player, inGas = inTrigger(g, 'gas1') || inTrigger(g, 'gas2');
      const bird = has(g, 'canary');
      if (inGas && !this.gasIn) { this.gasIn = true; g.mono(bird ? 'mine_gas' : 'mine_gasNo', 3); if (bird && g.audio.canary) g.audio.canary(false); }
      if (!inGas && this.gasIn) { this.gasIn = false; if (bird) { g.mono('mine_gasOut', 3); if (g.audio.canary) g.audio.canary(true); } }
      this.gasEl.style.opacity = inGas ? (pl.crouching ? 0.35 : 0.85) : 0;
      if (inGas && !pl.crouching) {
        this.coughT -= dt;
        if (this.coughT <= 0) {
          this.coughT = 2.4 + Math.random() * 1.2;
          if (g.audio.cough) g.audio.cough();
          g.noise(pl.pos.x, pl.pos.z, 16, 'voice');
          pl.stamina = Math.max(0, pl.stamina - 18); pl.addTrauma(0.15);
          if (!f.gasHint) { f.gasHint = true; g.later(1500, () => g.mono('mine_gasLow', 3)); }
        }
      }
    },
    // ---- the cage
    freezeAll(g, on) { for (const e of g.entities) { if (on) e.update = () => {}; else delete e.update; } },
    rideDown(g) {
      const f = g.flags, pl = g.player;
      pl.frozen = true; pl.freeLook = true; this.freezeAll(g, true);
      if (g.audio.cageGate) g.audio.cageGate();
      g.mono('mine_down', 3);
      g.fadeTo(1, 0.8, () => {
        const sh = this.shaft || (this.shaft = buildShaft(g));
        sh.grp.visible = true; sh.lamp.intensity = 1.6;
        pl.pos.set(sh.SX, 0, sh.SZ + 0.25); pl.yaw = 0; pl.pitch = 0;
        // one of them, flat against the wall as the cage goes by
        if (!this.passer) { this.passer = PB.Species.get('crawler').model(g); this.passer.group.rotation.set(H, 0, 0); sh.grp.add(this.passer.group); }
        this.passer.group.position.set(0.4, 30, -1.55);
        if (g.audio.winchRun) g.audio.winchRun(8);
        g.fadeTo(0, 0.8);
        const t0 = g.time;
        this.ride = { kind: 'down', t0, up: false };
      });
    },
    rideUp(g) {
      const f = g.flags, pl = g.player;
      f.riding = true;
      g.checkpoint(true);
      pl.frozen = true; pl.freeLook = true; this.freezeAll(g, true);
      if (g.audio.cageGate) g.audio.cageGate();
      g.fadeTo(1, 0.8, () => {
        const sh = this.shaft || (this.shaft = buildShaft(g));
        sh.grp.visible = true; sh.lamp.intensity = 1.6; sh.place(0);
        if (this.passer) this.passer.group.visible = false;
        pl.pos.set(sh.SX, 0, sh.SZ + 0.25); pl.yaw = 0; pl.pitch = 0.1;
        // the one that follows: a real crawler, so that if it reaches you it is the one that takes you
        const e = species(g, 'crawler')[0];
        if (e) { e.setState('chase'); e.anim.emerge = 1; e.mesh.visible = true; e.mesh.rotation.set(H, 0, 0); }
        if (g.audio.winchRun) g.audio.winchRun(30);
        g.fadeTo(0, 0.8);
        this.ride = { kind: 'up', t0: g.time, v: 0, dist: 0, stopped: false, lever: 0, ent: e, cy: -14 };
      });
    },
    updateRide(g, dt) {
      const R = this.ride, sh = this.shaft, pl = g.player, t = g.time - R.t0;
      if (R.kind === 'down') {
        sh.place(sh.off - 3.2 * dt);
        this.passer.group.position.y += 3.2 * dt;
        this.passer.animate({ anim: { t, walk: t * 0.3, speed: 0.4, emerge: 1, attack: 0, frozen: 0 }, state: 'patrol', lair: null }, dt);
        if (t > 7 && !R.done) {
          R.done = true;
          g.fadeTo(1, 0.7, () => {
            sh.grp.visible = false; this.ride = null; this.freezeAll(g, false);
            const f = g.flags; f.down = true;
            const st = g.level.spots.cageBottom[0];
            pl.spawn(st.wx, st.wz + 0.9, PI); pl.frozen = false; pl.freeLook = false;
            g.fadeTo(0, 0.9);
            g.mono('mine_station', 5); this.refresh(g); g.completeStep(); g.checkpoint(true);
          });
        }
        return;
      }
      // going up
      const e = R.ent;
      if (!R.stopped && !R.resumed && t > 9) {
        R.stopped = true; R.stopT = t;
        if (g.audio.cageStop) g.audio.cageStop();
        g.mono('mine_stop', 3); g.later(2600, () => g.mono('mine_lever', 3));
        pl.addTrauma(0.35);
      }
      if (R.stopped && !R.resumed) {
        R.v = U.damp(R.v, 0, 6, dt);
        sh.lamp.intensity = Math.random() < 0.15 ? 0 : 0.35;
        // the thing above comes down the wall toward the roof of the cage
        R.cy = Math.max(R.cy, 11 - (t - R.stopT) * 0.72);
        // the emergency lever: hold E
        const holding = g.input.down('interact');
        R.lever = holding ? R.lever + dt : Math.max(0, R.lever - dt * 0.5);
        g.ui.prompt(ST.line('mine_leverPrompt'), R.lever / 3);
        if (R.lever >= 3) { R.resumed = true; R.stopped = false; g.ui.prompt(null); g.mono('mine_moving', 3); if (g.audio.cageStart) g.audio.cageStart(); R.fall = 0; }
        else if (R.cy <= 3.0 && !R.killed && e) { R.killed = true; g.ui.prompt(null); this.ride = null; pl.freeLook = false; g.killPlayer(e); return; }
      } else {
        R.v = Math.min(3.6, R.v + dt * 0.9);
        sh.lamp.intensity = 1.6;
        if (R.resumed) { R.fall += dt; R.cy -= (4 + R.fall * 9.8) * dt; }   // it loses its grip and goes past
        else R.cy = 9 + Math.sin(t * 2) * 0.3;                                 // clinging, keeping pace above
      }
      R.dist += R.v * dt; sh.place(sh.off + R.v * dt);
      if (e) {
        e.mesh.position.set(sh.SX + 0.35, R.cy, sh.SZ - 1.5);
        e.anim.t += dt; e.anim.walk += dt * (R.stopped ? 2.2 : 0.6); e.anim.speed = R.stopped ? 1.4 : 0.3;
        e.vis.animate(e, dt);
      }
      if (R.dist > 62 && !R.arrived) {
        R.arrived = true;
        g.fadeTo(1, 1.2, () => { sh.grp.visible = false; g.mono('mine_top', 3); this.ride = null; pl.frozen = false; pl.freeLook = false; g.flags.riding = false; g.whenPlaying(() => g.exitLevel('lodge')); });
      }
    },
    respawned(g) {
      // killed in the shaft: back at the station, the cage waiting, the crawler back in the timbers
      const f = g.flags;
      if (this.shaft) this.shaft.grp.visible = false;
      this.ride = null; f.riding = false; this.freezeAll(g, false);
      for (const e of species(g, 'crawler')) { e.mesh.rotation.set(0, 0, 0); e.bury(); }
      g.player.freeLook = false;
    },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'lamplighter' && !f.lampsSeen) { f.lampsSeen = true; g.later(700, () => g.mono('mine_lamps', 5)); g.later(6000, () => g.radio('mine_ottoLamps')); }
      if (ent.kind === 'burrower' && !f.burrowSeen) { f.burrowSeen = true; g.later(500, () => g.mono('mine_burrower', 3)); }
      if (ent.kind === 'crawler' && !f.crawlSeen) { f.crawlSeen = true; g.later(500, () => g.mono('mine_crawler', 3)); }
    },
    update(g, dt) {
      const f = g.flags, pl = g.player.pos;
      if (this.ride) { this.updateRide(g, dt); return; }
      if (f.down) this.gas(g, dt);
      // the knocking behind the fire door: seven, a pause, seven
      const fd = g.level.spots.fireDoorSpot[0], dd = Math.hypot(pl.x - fd.wx, pl.z - fd.wz);
      if (!f.claimed && f.down) {
        this.knockT -= dt;
        if (this.knockT <= 0) {
          this.knockT = 9 + Math.random() * 5;
          if (dd < 45) {
            if (g.audio.knockSeven) g.audio.knockSeven(new THREE.Vector3(fd.wx, 1.2, fd.wz), dd);
            if (dd < 30 && !f.knockHeard) { f.knockHeard = true; g.later(3500, () => g.mono('mine_knock', 4)); }
          }
        }
      }
      if (f.drawingOut && !f.drawingShown) { f.drawingShown = true; if (dd < 12) g.mono('mine_drawing', 3); }
      if (!f.lakeIn && inTrigger(g, 'lake')) { f.lakeIn = true; g.mono('mine_lake', 4); }
      if (!f.stopeIn && inTrigger(g, 'stope')) { f.stopeIn = true; g.mono('mine_stope', 3); }
      if (!f.fireIn && inTrigger(g, 'fire')) { f.fireIn = true; g.mono('mine_fireDoor', 4); }
    },
  };

  // ============================================================ 5. WEISSHORN
  C.lodge = {
    start(g) {
      this.ride = null; this.cold = 0.15; this.coldMsg = 0;
      g.setObj('lodge_start');
      // frost creeping in from the edges of the eyes as the cold gets in
      if (!this.frostEl) { const el = document.createElement('div'); el.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:6;opacity:0;background:radial-gradient(ellipse at center, rgba(220,235,255,0) 45%, rgba(225,238,250,0.65) 85%, rgba(240,248,255,0.95) 100%);mix-blend-mode:screen'; document.body.appendChild(el); this.frostEl = el; }
      this.frostEl.style.opacity = 0;
      // the gondola in its dock: the chapter's own object, it has to leave
      const d = g.level.spots.dock[0];
      this.gondola = g.meshFromDef('gondola'); this.gondola.position.set(d.wx, 0.05, d.wz); this.gondola.rotation.y = H; g.world.group.add(this.gondola);
      this.gLight = new THREE.PointLight(0xffe0b0, 0, 5, 1.8); this.gLight.position.set(0, 2.0, 0); this.gondola.add(this.gLight);
      this.gCol = g.world.addCollider({ minX: d.wx - 0.9, maxX: d.wx + 0.9, minZ: d.wz - 1.35, maxZ: d.wz + 1.35, maxY: 2.2 });
    },
    afterCard(g) { g.mono('lodge_start', 4); },
    restore(g) {
      const f = g.flags;
      if (f.claimed) g.world.setZone(3, true);
      if (f.power) this.gLight.intensity = 1.4;
      this.refresh(g);
    },
    refresh(g) {
      const f = g.flags;
      if (!f.inside) return g.setObj('lodge_start');
      if (!f.claimed) return g.setObj(has(g, 'telegram') ? 'lodge_pin' : f.bookRead || f.boardSeen ? 'lodge_telegram' : 'lodge_find');
      if (!f.power) return g.setObj(has(g, 'masterKey') ? 'lodge_power' : 'lodge_key');
      g.setObj('lodge_board');
    },
    prompt(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'guestBook': return ST.line('lodge_bookPrompt');
        case 'tboard': return f.claimed ? null : ST.line(has(g, 'telegram') ? 'lodge_boardPin' : 'lodge_boardPrompt');
        case 'telegram': return ST.line('lodge_stovePrompt');
        case 'control': return f.power ? null : ST.line(has(g, 'masterKey') ? 'lodge_controlPrompt' : 'lodge_controlLook');
        case 'gondola': return this.ride ? null : ST.line(f.power ? 'lodge_gondolaPrompt' : 'lodge_gondolaLook');
      }
      return undefined;
    },
    canHold(g, o) {
      if (o.id === 'control') return has(g, 'masterKey') && g.flags.claimed && !g.flags.power;
      return true;
    },
    holdStart(g, o) { if (o.id === 'control' && g.audio.motorStart) g.audio.motorStart(o.pos); },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'guestBook': f.bookRead = true; g.readNote('lodge_guestBook', () => { g.mono('lodge_book', 4); this.refresh(g); }); return true;
        case 'tboard':
          if (f.claimed) return true;
          if (has(g, 'telegram')) { this.claim(g); return true; }
          f.boardSeen = true; g.mono('lodge_board', 4); this.refresh(g); return true;
        case 'telegram':
          g.takeItem(o); give(g, 'telegram'); g.audio.paper();
          g.readNote('lodge_telegram', () => { g.mono('lodge_telegram', 6); this.refresh(g); g.completeStep(); });
          return true;
        case 'control':
          if (f.power) return true;
          if (!has(g, 'masterKey')) { g.mono('lodge_noKey', 3); return true; }
          if (!f.claimed) { g.mono('lodge_notYet', 4); return true; }
          f.power = true; this.gLight.intensity = 1.4;
          if (g.audio.cableRun) g.audio.cableRun(this.gondola.position);
          g.noise(o.pos.x, o.pos.z, 60, 'loud');
          g.mono('lodge_power', 4); this.refresh(g); g.completeStep(); g.checkpoint(true);
          return true;
        case 'gondola':
          if (this.ride) return true;
          if (!f.power) { g.mono(f.claimed ? 'lodge_noKey' : 'lodge_notYet', 3); return true; }
          this.board(g); return true;
      }
      return false;
    },
    picked(g, id) { if (id === 'masterKey') { g.mono('lodge_key', 2); this.refresh(g); g.completeStep(); } },
    claim(g) {
      const f = g.flags;
      drop(g, 'telegram'); f.claimed = true; claim(g);
      g.audio.paper();
      g.mono('lodge_pinned', 4);
      g.later(4500, () => { g.mono('lodge_claimed', 5); const sn = g.world.street && g.world.street.snowU; if (sn) { sn.uWind.value *= 0.45; sn.uAlpha.value *= 0.75; } });
      g.later(10000, () => { g.world.setZone(3, true); g.mono('lodge_stationLit', 4); });
      g.later(15000, () => g.radio('lodge_otto2'));
      this.refresh(g); g.completeStep(); g.checkpoint(true);
    },
    // The cold: outside it gets in fast; inside it leaves slowly, by a fire quickly
    updateCold(g, dt) {
      const pl = g.player.pos, L = g.level, c = L.cellOf(pl.x, pl.z);
      const out = L.inb(c.x, c.y) && L.meta.outdoor && L.meta.outdoor[L.i(c.x, c.y)];
      let warm = false;
      for (const h of L.spots.heat || []) if (Math.hypot(h.wx - pl.x, h.wz - pl.z) < (h.r || 5) * 0.6) warm = true;
      const rate = out ? 1 / (g.flags.claimed ? 110 : 80) : warm ? -1 / 7 : -1 / 70;
      this.cold = U.clamp(this.cold + rate * dt, 0, 1.05);
      this.frostEl.style.opacity = U.smoothstep(0.25, 1, this.cold).toFixed(3);
      if (out && this.cold > 0.45 && this.coldMsg < 1) { this.coldMsg = 1; g.mono('lodge_cold', 3); }
      if (out && this.cold > 0.78 && this.coldMsg < 2) { this.coldMsg = 2; g.mono('lodge_colder', 3); }
      if (warm && this.coldMsg > 0 && this.cold < 0.3) { this.coldMsg = 0; g.mono('lodge_warm', 3); }
      if (this.cold >= 1) {
        // frozen where you stand
        this.cold = 0.3; this.frostEl.style.opacity = 0;
        g.killPlayer({ kind: 'cold', killKind: () => 'frost', pos: g.player.pos.clone() });
      }
    },
    board(g) {
      const f = g.flags, pl = g.player;
      f.boarding = true;
      g.world.removeCollider(this.gCol);
      pl.frozen = true; pl.freeLook = true;
      const gp = this.gondola.position;
      pl.spawn(gp.x, gp.z + 0.2, -H + 0.3); pl.camLift = 0.05;
      g.mono('lodge_boarding', 4);
      if (g.audio.gondolaDoors) g.audio.gondolaDoors(gp);
      // it heard the motor: footprints come across the snowfield toward the station
      const w = species(g, 'whiteout')[0];
      if (w) { const sx = gp.x - 14, sz = gp.z + 2; w.pos.set(sx, 0, sz); w.cell = g.level.cellOf(sx, sz); w.next = null; w.lastKnown = { x: gp.x - 2.5, z: gp.z }; w.setState('investigate'); }
      for (const e of g.entities) if (e !== w) e.update = () => {};
      this.ride = { t0: g.time, w };
    },
    updateRide(g, dt) {
      const R = this.ride, t = g.time - R.t0, pl = g.player, gp = this.gondola.position;
      if (t < 11) {
        // the doors close slowly; something presses against the glass just as they shut
        if (R.w && t > 9.2 && !R.thump) { R.thump = true; R.w.pos.set(gp.x - 1.6, 0, gp.z); R.w.update = () => {}; R.w.vis.animate(R.w, dt); if (g.audio.glassThump) g.audio.glassThump(gp); pl.addTrauma(0.4); g.fearAdd(30); }
        if (R.w && R.thump) { R.w.anim.t += dt; R.w.vis.animate(R.w, dt); R.w.mesh.position.set(gp.x - 1.5, 0, gp.z); }
        return;
      }
      if (!R.away) { R.away = true; g.mono('lodge_away', 4); if (g.audio.gondolaLeave) g.audio.gondolaLeave(gp); }
      // out along the cable, east and down into the storm
      const v = Math.min(5, (t - 11) * 1.2);
      gp.x += v * dt; gp.y -= v * 0.28 * dt;
      this.gondola.rotation.z = Math.sin(g.time * 1.3) * 0.03;
      pl.pos.set(gp.x, 0, gp.z + 0.2); pl.camLift = gp.y + 0.05; pl.camRoll = this.gondola.rotation.z;
      if (t > 22 && !R.done) { R.done = true; g.whenPlaying(() => { pl.camLift = 0; pl.camRoll = 0; pl.frozen = false; pl.freeLook = false; g.exitLevel('village'); }); }
    },
    respawned(g) { this.cold = 0.2; },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'cook' && !f.cookSeen) { f.cookSeen = true; g.later(600, () => g.mono('lodge_cook', 4)); }
    },
    update(g, dt) {
      const f = g.flags;
      if (this.ride) { this.updateRide(g, dt); return; }
      this.updateCold(g, dt);
      if (!f.inside && inTrigger(g, 'inside')) { f.inside = true; g.mono('lodge_inside', 4); this.refresh(g); g.completeStep(); g.radio('lodge_otto1', { delay: 6 }); g.checkpoint(true); }
      if (!f.diningIn && inTrigger(g, 'dining')) { f.diningIn = true; g.mono('lodge_frozen', 5); }
      if (!f.officeIn && inTrigger(g, 'office')) { f.officeIn = true; g.mono('lodge_office', 4); }
      if (!f.stationIn && inTrigger(g, 'station')) { f.stationIn = true; g.mono('lodge_station', 4); }
      if (!f.frozenMoved && species(g, 'frozen').some(e => e.woke)) { f.frozenMoved = true; g.mono('lodge_frozenMove', 5); }
      if (!f.printsSeen) {
        const w = species(g, 'whiteout')[0], pl = g.player.pos;
        if (w && w.anim.speed > 0.3 && Math.hypot(w.pos.x - pl.x, w.pos.z - pl.z) < 14 && g.level.los(pl.x, pl.z, w.pos.x, w.pos.z)) { f.printsSeen = true; g.mono('lodge_prints', 4); }
      }
    },
  };

  // ============================================================ 6. GAMMEL OSTRA
  C.village = {
    start(g) {
      this.flood = null; this.climb = null; this.drownT = 0;
      g.choir = { phase: 'sing', t: 0, quietT: 0 };
      g.setObj('village_start');
      if (g.audio.choir) g.audio.choir(true);
      // the water that comes back: one sheet over the whole valley, rising
      const L = g.level, W = L.w * L.cell, D = L.h * L.cell;
      const m = new THREE.MeshPhysicalMaterial({ color: 0x14201e, roughness: 0.12, metalness: 0.1, transparent: true, opacity: 0.88, clearcoat: 1, clearcoatRoughness: 0.2 });
      this.water = new THREE.Mesh(new THREE.PlaneGeometry(W + 200, D + 200, 1, 1), m);
      this.water.rotation.x = -H; this.water.position.set(W / 2, -0.6, D / 2); this.water.visible = false; this.water.renderOrder = 1;
      g.world.group.add(this.water);
    },
    afterCard(g) { g.mono('village_start', 5); g.radio('village_otto1', { delay: 9 }); },
    restore(g) {
      const f = g.flags;
      if (has(g, 'signeKey') || f.signeOpen) unlock(g, 'signeDoor');
      this.refresh(g);
    },
    refresh(g) {
      const f = g.flags;
      if (f.flooding) return g.setObj(this.climb ? 'village_climb' : 'village_run');
      if (!f.signeOpen) return g.setObj(f.lockedSeen && !has(g, 'signeKey') ? 'village_key' : 'village_start');
      if (!f.claimed) return g.setObj(has(g, 'musicBox') ? 'village_mantel' : 'village_box');
    },
    prompt(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'mantel': return f.claimed ? null : ST.line(has(g, 'musicBox') ? 'village_mantelPut' : 'village_mantelLook');
        case 'ladder': return f.flooding && !this.climb ? ST.line('village_ladderPrompt') : null;
      }
      return undefined;
    },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'musicBox':
          g.takeItem(o); give(g, 'musicBox'); g.audio.pickup('item');
          if (g.audio.musicBox) g.audio.musicBox(o.pos, 3);
          g.mono('village_box', 5); this.refresh(g); g.completeStep();
          return true;
        case 'mantel':
          if (f.claimed) return true;
          if (!has(g, 'musicBox')) { g.mono('village_dust', 5); f.dustSeen = true; this.refresh(g); return true; }
          this.claim(g, o); return true;
        case 'ladder':
          if (f.flooding && !this.climb) this.startClimb(g, o);
          return true;
      }
      return false;
    },
    picked(g, id) { if (id === 'signeKey') { g.mono('village_key', 4); unlock(g, 'signeDoor'); this.refresh(g); g.completeStep(); } },
    noteRead(g, id) {
      if (id === 'village_removal' && !g.flags.listRead) { g.flags.listRead = true; g.later(400, () => g.mono('village_list', 6)); g.later(7500, () => g.mono('village_gran', 4)); }
    },
    unlockPrompt(g, d) { if (d.id === 'signeDoor' && has(g, 'signeKey')) return t('pr.unlock'); return null; },
    unlockDoor(g, d) { if (d.id === 'signeDoor' && has(g, 'signeKey')) { unlock(g, 'signeDoor', true); g.flags.signeOpen = true; this.refresh(g); return true; } return false; },
    lockedDoor(g, d) { if (d.id === 'signeDoor') { g.mono('village_locked', 4); if (!g.flags.lockedSeen) { g.flags.lockedSeen = true; this.refresh(g); } } },
    claim(g, o) {
      const f = g.flags;
      drop(g, 'musicBox'); f.claimed = true; claim(g);
      // the box on the mantel, playing by itself
      const box = g.meshFromDef('musicBox'); box.position.set(o.pos.x, 1.38, o.pos.z); box.rotation.y = 0.6; g.world.group.add(box);
      if (g.audio.musicBox) g.audio.musicBox(o.pos, 12);
      g.mono('village_placed', 4);
      g.later(4500, () => { g.mono('village_claimed', 5); if (g.audio.clockStrike) g.audio.clockStrike(o.pos, 6); });
      g.later(11000, () => this.startFlood(g));
      g.later(14000, () => g.radio('village_otto2'));
      this.refresh(g); g.completeStep(); g.checkpoint(true);
    },
    startFlood(g) {
      const f = g.flags; f.flooding = true;
      if (g.audio.choir) g.audio.choir(false);
      if (g.audio.floodRoar) g.audio.floodRoar();
      g.mono('village_water', 4); g.player.addTrauma(0.3);
      this.water.visible = true;
      this.flood = { t: 0, level: -0.6 };
      // everything in the water wakes
      for (const e of species(g, 'longone')) if (e.state === 'buried') g.later(Math.random() * 4000, () => { if (e.state === 'buried') e.emergeNear(g.player.pos.x, g.player.pos.z); });
      this.refresh(g);
    },
    startClimb(g, o) {
      const pl = g.player, sp = g.level.spots.ladder[0];
      pl.frozen = true; pl.freeLook = true;
      pl.spawn(sp.wx, sp.wz - 0.15, PI); pl.pitch = 0.4;
      this.climb = { y: 0 };
      g.mono('village_ladder', 3); this.refresh(g);
    },
    updateFlood(g, dt) {
      const F = this.flood, pl = g.player;
      F.t += dt;
      // slow at first, then the valley fills in earnest
      const rate = F.t < 25 ? 0.045 : F.t < 60 ? 0.09 : 0.16;
      F.level += rate * dt;
      this.water.position.y = F.level;
      const C = this.climb;
      if (C) {
        if (g.input.down('forward')) { C.y = Math.min(24.2, C.y + 1.15 * dt); if (g.audio.ladderStep && Math.floor(C.y / 0.6) !== Math.floor((C.y - 1.15 * dt) / 0.6)) g.audio.ladderStep(); }
        pl.camLift = C.y;
        if (C.y >= 24 && !C.done) { C.done = true; g.mono('village_top', 4); g.later(3500, () => g.whenPlaying(() => { pl.camLift = 0; pl.frozen = false; pl.freeLook = false; g.exitLevel('train'); })); }
        if (F.level > C.y + 1.5 && !C.done) this.drown(g, dt);
        return;
      }
      // wading slows you; over your head you go under
      const depth = F.level - g.world.floorAt(pl.pos.x, pl.pos.z);
      pl.speedMul = depth > 0.3 ? U.clamp(1 - (depth - 0.3) * 0.5, 0.35, 1) : 1;
      if (depth > 1.45) this.drown(g, dt); else this.drownT = Math.max(0, this.drownT - dt);
    },
    drown(g, dt) {
      this.drownT += dt;
      g.fx.blackout = Math.max(g.fx.blackout, U.clamp(this.drownT / 3, 0, 0.8));
      if (this.drownT > 3) {
        this.drownT = 0;
        const e = species(g, 'longone')[0];
        g.killPlayer(e || { kind: 'water', killKind: () => 'coil', pos: g.player.pos.clone() });
      }
    },
    respawned(g) {
      // back at the checkpoint (the mantel): the water starts again from the bottom
      if (this.flood) { this.flood = { t: 0, level: -0.6 }; this.climb = null; this.drownT = 0; g.player.speedMul = 1; }
    },
    updateChoir(g, dt) {
      const C = g.choir, pl = g.player, inChurch = inTrigger(g, 'church');
      const choir = species(g, 'choir');
      C.t += dt;
      if (C.phase === 'sing') {
        if (!inChurch) return;
        // what stops the hymn: running, a step close behind them, or walking out in front of them
        const near = choir.some(e => e.distToPlayer() < 2.6);
        const front = pl.pos.z < 3.75 * 3;
        if ((pl.sprinting && pl.moving) || (near && pl.moving && !pl.crouching) || front) {
          C.phase = 'silence'; C.t = 0;
          if (g.audio.choir) g.audio.choir(false);
          g.mono('village_silence', 2);
        }
      } else if (C.phase === 'silence') {
        if (C.t > 2.4) {
          C.phase = 'hunt'; C.t = 0; C.quietT = 0;
          g.mono('village_turn', 2);
          for (const e of choir) { e.lastKnown = { x: pl.pos.x, z: pl.pos.z }; e.awareness = 1.2; e.setState('chase'); }
          g.onSpotted(choir[0]);
        }
      } else if (C.phase === 'hunt') {
        const anyChase = choir.some(e => e.state === 'chase');
        C.quietT = anyChase ? 0 : C.quietT + dt;
        if (C.quietT > 9 && !inChurch) {
          C.phase = 'sing'; C.t = 0;
          if (g.audio.choir && !g.flags.flooding) g.audio.choir(true);
          if (Math.hypot(pl.pos.x - 21.5 * 3, pl.pos.z - 5 * 3) < 40) g.mono('village_resume', 3);
        }
      }
    },
    update(g, dt) {
      const f = g.flags;
      if (this.flood) this.updateFlood(g, dt);
      if (!f.flooding) this.updateChoir(g, dt);
      if (!f.churchIn && inTrigger(g, 'church')) { f.churchIn = true; g.mono('village_church', 4); }
      if (!f.schoolIn && inTrigger(g, 'school')) { f.schoolIn = true; g.mono('village_school', 4); }
      if (!f.atticIn && inTrigger(g, 'attic')) { f.atticIn = true; g.mono('village_attic', 4); }
      if (!f.houseIn && inTrigger(g, 'signe')) { f.houseIn = true; g.mono('village_house', 4); if (!has(g, 'musicBox')) g.later(5000, () => { if (!g.flags.claimed) { g.mono('village_dust', 5); g.flags.dustSeen = true; this.refresh(g); } }); }
    },
  };

  // ============================================================ 7. NORDLYS EXPRESS
  // The train itself never moves: the night does. Trees, poles and the snow on the ground slide back past
  // the windows, the flakes stream, the floor rocks. The halt at Kvitfjell comes past with them.
  const RUN_V = 22, SPAN = 520, KVIT_T = 75;
  C.train = {
    start(g) {
      this.v = 0; this.targetV = 0; this.dist = 0; this.clack = 0; this.kvit = null; this.brake = null;
      g.setObj('train_start');
      const L = g.level, P = PB.Props, r = U.rng(1990);
      // ---- the night outside, in one group that slides back as the train runs
      const scen = this.scen = new THREE.Group(); scen.position.x = -150; g.world.group.add(scen);
      const trees = [[], []], poles = [], banks = [];
      for (let k = 0; k < 560; k++) {
        const north = r() < 0.5, x = r() * SPAN, s = r.range(0.7, 1.4);
        const z = north ? -5 - Math.pow(r(), 1.5) * 70 : 13 + Math.pow(r(), 1.5) * 60;
        const t = { x, z, rot: r.range(0, 6.28), sx: s, sy: s * r.range(0.85, 1.3), sz: s };
        trees[k % 2].push(t, Object.assign({}, t, { x: x + SPAN }));
      }
      for (let x = 0; x < SPAN; x += 52) poles.push({ x, z: -3.2, rot: 0 }, { x: x + SPAN, z: -3.2, rot: 0 });
      for (let k = 0; k < 40; k++) { const x = r() * SPAN, z = r() < 0.5 ? -2 - r() * 3 : 12.5 + r() * 3, s = r.range(0.8, 2.2); banks.push({ x, z, rot: r.range(0, 6), sx: s, sy: s * 0.5, sz: s }, { x: x + SPAN, z, rot: 0, sx: s, sy: s * 0.5, sz: s }); }
      const own = ms => { for (const m of ms) { g.world.group.remove(m); scen.add(m); } };
      ['pineSnowFar', 'pineSnow'].forEach((d, k) => { if (P.DEFS[d]) own(g.world.instanced(d, P.DEFS[d], trees[k], { cast: false })); });
      if (P.DEFS.telegraphPole) own(g.world.instanced('telegraphPole', P.DEFS.telegraphPole, poles, { cast: false }));
      if (P.DEFS.snowPile) own(g.world.instanced('snowPile', P.DEFS.snowPile, banks, { cast: false }));
      // ---- the snow on the ground scrolls with them (its own copy of the textures)
      const sm = g.world.mats && g.world.mats.get('F:snow:');
      this.snowMat = null;
      if (sm) { for (const k of ['map', 'normalMap', 'roughnessMap', 'bumpMap', 'aoMap']) if (sm[k]) { sm[k] = sm[k].clone(); sm[k].needsUpdate = true; } sm.needsUpdate = true; this.snowMat = sm; }
      // ---- Kvitfjell halt: a strip of platform under snow, one lamp, the sign, a bench
      const halt = this.halt = new THREE.Group(); halt.visible = false; g.world.group.add(halt);
      const slab = new THREE.Mesh(new THREE.BoxGeometry(28, 0.55, 3.2), g.world.mat('snowPack')); slab.position.set(0, 0.27, 0); halt.add(slab);
      const add = (key, x, z, ry) => { const m = g.meshFromDef(key); m.position.set(x, 0.55, z); m.rotation.y = ry; halt.add(m); return m; };
      add('platformLamp', -3, 1.0, PI); add('stationSignK', 4, 1.1, PI); add('stationBench', 8, 1.2, PI); add('snowPile', -9, 0.8, 0.4);
      const hl = new THREE.PointLight(0xffd8a0, 2.4, 16, 1.6); hl.position.set(-3, 4.4, 0.4); halt.add(hl);
      halt.position.set(400, 0, 9.1);
      if (g.world.street && g.world.street.snowU) this.snowU = g.world.street.snowU;
    },
    afterCard(g) { g.mono('train_start', 5); },
    restore(g) {
      const f = g.flags;
      if (f.boarded) { this.v = this.targetV = f.stopped ? 0 : RUN_V; g.world.setZone(3, false); }
      if (has(g, 'ticket')) g.inv.ticket = true;
      if (f.claimed) { this.seatConductor(g); this.kvit = { t: 0 }; }
      this.refresh(g);
    },
    refresh(g) {
      const f = g.flags;
      if (!f.boarded) return g.setObj('train_start');
      if (!f.found) {
        if (!(g.inv && g.inv.ticket)) return g.setObj('train_ticket');
        return g.setObj(f.reportRead || f.letterRead || f.waiterRead ? 'train_lina' : 'train_who');
      }
      if (!f.claimed) return g.setObj('train_punch');
      g.setObj('train_brake');
    },
    prompt(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'board': return f.boarded ? null : ST.line('train_boardPrompt');
        case 'punch': return f.claimed ? null : ST.line(has(g, 'linaTicket') ? 'train_punchPrompt' : 'train_punchLook');
        case 'brake': return this.brake ? null : ST.line(f.claimed ? 'train_brakePrompt' : 'train_brakeLook');
      }
      return undefined;
    },
    canHold(g, o) { if (o.id === 'brake') return g.flags.claimed && !this.brake; return true; },
    holdStart(g, o) { if (o.id === 'brake' && g.audio.click) g.audio.click(o.pos); },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'board': if (!f.boarded) this.board(g); return true;
        case 'ticket':
          g.takeItem(o); give(g, 'ticket'); g.inv.ticket = true; g.audio.pickup('item'); g.audio.paper();
          g.mono('train_ticket', 4); this.refresh(g); g.completeStep();
          return true;
        case 'linaTicket':
          g.takeItem(o); give(g, 'linaTicket'); g.audio.paper();
          f.found = true; f.ticketVoid = true;
          g.mono('train_found', 4);
          // the lamp stops in the corridor somewhere; then it comes your way
          { const c = species(g, 'conductor')[0]; if (c && c.state !== 'seated') { c.lastKnown = { x: g.player.pos.x, z: g.player.pos.z }; c.awareness = 0.9; c.setState('investigate'); if (c.voice) c.voice('turn'); g.later(2600, () => g.mono('train_turn', 3)); } }
          this.refresh(g); g.completeStep(); g.checkpoint(true);
          return true;
        case 'punch':
          if (f.claimed) return true;
          if (!has(g, 'linaTicket')) { g.mono('train_punchWait', 3); return true; }
          this.claim(g, o); return true;
        case 'brake':
          if (this.brake) return true;
          if (!f.claimed) { g.mono('train_brakeWait', 3); return true; }
          this.pullBrake(g); return true;
      }
      return false;
    },
    noteRead(g, id) {
      const f = g.flags;
      if (id === 'train_lina' && !f.letterRead) { f.letterRead = true; g.later(400, () => g.mono('train_letter', 4)); this.refresh(g); }
      if (id === 'train_saether' && !f.reportRead) { f.reportRead = true; g.later(400, () => g.mono('train_report', 6)); this.refresh(g); }
      if (id === 'train_waiter') { f.waiterRead = true; this.refresh(g); }
      if (id === 'train_docket' && !f.docketRead) { f.docketRead = true; g.later(400, () => g.mono('train_docket', 7)); g.radio('train_otto2', { delay: 9 }); }
    },
    // ---- the Conductor's hooks (species7.js)
    ticketCheck(g) { if (!g.flags.checkSeen) { g.flags.checkSeen = true; g.mono('train_check', 3); } },
    ticketPunched(g) { g.mono('train_punched', 4); this.refresh(g); },
    gangwayStep(g) { if (!g.flags.gangwaySeen) { g.flags.gangwaySeen = true; g.later(300, () => g.mono('train_gangway', 3)); } },
    board(g) {
      const f = g.flags, pl = g.player;
      f.boarded = true;
      pl.frozen = true;
      if (g.audio.door) g.audio.door('metal', g.level.spots.board[0] ? new THREE.Vector3(g.level.spots.board[0].wx, 1.2, g.level.spots.board[0].wz) : pl.pos, true);
      g.fadeTo(1, 0.8, () => {
        const sp = g.level.spots.boarded[0];
        pl.spawn(sp.wx, sp.wz, -H);
        g.later(600, () => {
          g.fadeTo(0, 1.2);
          pl.frozen = false;
          g.mono('train_board', 3);
          if (g.audio.door) g.audio.door('metal', pl.pos.clone(), false);
          g.checkpoint(true);
          g.world.setZone(3, false);
          // a jolt, the couplings taking up one after another down the train, and away
          g.later(3500, () => { this.targetV = RUN_V; pl.addTrauma(0.25); if (g.audio.trainStart) g.audio.trainStart(); g.mono('train_moving', 3); });
          g.radio('train_otto1', { delay: 12 });
          this.refresh(g); g.completeStep();
        });
      });
    },
    seatConductor(g) {
      const c = species(g, 'conductor')[0]; if (!c) return;
      const sp = g.level.spots.inquiry[0];
      c.pos.set(sp.wx - 2.4, 0, 4.25); c.heading = H; c.setState('seated'); c.awareness = 0; c.mesh.visible = true;
    },
    claim(g, o) {
      const f = g.flags;
      drop(g, 'linaTicket'); f.claimed = true; f.ticketVoid = false; claim(g);
      g.player.frozen = true;
      g.mono('train_punchIt', 2);
      // in the dark: one click of the punch. When the lights come back he is sitting across from you
      g.later(1800, () => g.fadeTo(1, 0.4, () => {
        if (g.audio.click) g.audio.click(o.pos);
        this.seatConductor(g);
        g.later(1300, () => {
          g.fadeTo(0, 1.6); g.player.frozen = false;
          g.mono('train_claimed', 4);
          g.later(5000, () => g.mono('train_sat', 4));
          g.later(10000, () => this.startKvitfjell(g));
          g.later(14000, () => g.radio('train_otto3'));
        });
      }));
      this.refresh(g); g.completeStep(); g.checkpoint(true);
    },
    startKvitfjell(g) {
      this.kvit = { t: 0, passed: false };
      g.ui.subtitle(ST.line('pa_kvitfjell'), 3.5);
      if (g.audio.pa) g.audio.pa();
      g.later(3800, () => g.mono('train_kvitfjell', 3));
      // the whole train wakes: the bunks empty, one after another, behind you
      species(g, 'sleeper').forEach((e, k) => g.later(1500 + k * 1700, () => { if (e.state === 'buried') { const p = g.player.pos; e.hear(p.x, p.z, 40, 'loud'); } }));
      this.refresh(g);
    },
    pullBrake(g) {
      const f = g.flags;
      this.brake = { t: 0 };
      f.braking = true;
      if (g.audio.trainBrake) g.audio.trainBrake();
      g.player.addTrauma(0.6); g.mono('train_brake', 2);
      // where the halt must be so that it comes to rest by the cab
      const stop = (this.v * this.v) / (2 * (RUN_V / 7));
      this.halt.visible = true; this.halt.position.x = 151 + stop;
    },
    updateRun(g, dt) {
      const pl = g.player, f = g.flags;
      if (this.brake) { this.brake.t += dt; this.v = Math.max(0, this.v - RUN_V / 7 * dt); }
      else this.v = U.damp(this.v, this.targetV, this.targetV > this.v ? 0.12 : 1, dt);
      const dx = this.v * dt;
      this.dist += dx;
      this.scen.position.x = -150 - (this.dist % SPAN);
      if (this.snowMat && this.snowMat.map) { const sc = this.snowMat.userData.scale || 3; for (const k of ['map', 'normalMap', 'roughnessMap', 'bumpMap', 'aoMap']) if (this.snowMat[k]) this.snowMat[k].offset.x += dx / sc; }
      if (this.snowU) this.snowU.uWind.value = U.lerp(0.8, -16, U.clamp(this.v / RUN_V, 0, 1));
      if (g.audio.trainRun) g.audio.trainRun(this.v / RUN_V);
      // the floor: a sway, the rail joints coming up through your feet
      const k = U.clamp(this.v / RUN_V, 0, 1);
      if (!pl.hidden) { pl.camRoll = Math.sin(g.time * 1.25) * 0.006 * k + Math.sin(g.time * 3.1) * 0.002 * k; }
      this.clack += dx;
      if (this.clack > 13) { this.clack -= 13; if (g.audio.trainClack) g.audio.trainClack(k); if (k > 0.5 && Math.random() < 0.2) pl.addTrauma(0.03); }
      if (this.halt.visible) this.halt.position.x -= dx;
      // Kvitfjell coming
      const K = this.kvit;
      if (K && !this.brake) {
        K.t += dt;
        const left = (KVIT_T - K.t) * this.v;
        if (left < 400 && !K.passed) { this.halt.visible = true; this.halt.position.x = 154 + left; }
        if (K.t > KVIT_T + 9 && !K.passed) { K.passed = true; g.mono('train_passed', 4); }
        if (K.passed && this.halt.position.x < -60) {
          // round again: the same halt, the same announcement
          this.halt.visible = false; this.kvit = { t: 0, passed: false };
          g.later(4000, () => { g.ui.subtitle(ST.line('pa_kvitfjell'), 3.5); if (g.audio.pa) g.audio.pa(); g.later(3500, () => g.mono('train_again', 3)); });
          species(g, 'sleeper').forEach((e, i) => g.later(6000 + i * 1500, () => { if (e.state === 'buried') { const p = g.player.pos; e.hear(p.x, p.z, 40, 'loud'); } }));
        }
      }
      if (this.brake && this.v <= 0 && !this.brake.done) {
        this.brake.done = true; f.stopped = true;
        if (g.audio.trainRun) g.audio.trainRun(0);
        for (const e of g.entities) e.update = () => {};
        g.mono('train_stopped', 3);
        g.later(3500, () => g.mono('train_out', 7));
        g.later(11000, () => g.whenPlaying(() => { pl.camRoll = 0; g.exitLevel('carnival'); }));
      }
    },
    respawned(g) {
      // back where you were: the passengers back in their bunks, the hands under the plates, the
      // conductor somewhere far down the train
      for (const e of species(g, 'sleeper')) if (e.bed) { e.pos.set(e.bed.x, 0, e.bed.z); e.heading = 0; e.lastKnown = null; e.spotted = false; e.setState('buried'); }
      for (const e of species(g, 'underhand')) if (e.home) { e.pos.set(e.home.x, 0, e.home.z); e.onT = 0; e.setState('buried'); }
      const c = species(g, 'conductor')[0], pl = g.player.pos;
      if (c && c.state !== 'seated') {
        const x = U.clamp(pl.x + (pl.x < 70 ? 45 : -45), 4, 134);
        c.pos.set(x, 0, PB.TrainNav.laneZ(x)); c.cell = g.level.cellOf(c.pos.x, c.pos.z); c.goalX = null; c.awareness = 0; c.setState('patrol');
      }
      if (this.kvit && !this.brake) { this.kvit.t = Math.min(this.kvit.t, 20); this.kvit.passed = false; this.halt.visible = false; }
    },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'conductor' && !f.chasedOnce) { f.chasedOnce = true; }
    },
    update(g, dt) {
      const f = g.flags, pl = g.player;
      this.updateRun(g, dt);
      if (!f.boarded) return;
      // first meetings, each learned when it matters
      if (!f.condSeen) {
        const c = species(g, 'conductor')[0];
        if (c && c.distToPlayer() < 16 && c.losToPlayer()) { f.condSeen = true; g.mono('train_conductor', 4); }
      }
      if (!f.sleeperSeen) {
        for (const e of species(g, 'sleeper')) if (e.state === 'buried' && e.distToPlayer() < 3.6 && Math.abs(pl.pos.x - e.pos.x) < 1.2) { f.sleeperSeen = true; g.mono('train_sleeper', 4); break; }
      }
    },
  };

  // ============================================================ 8. FALK'S CARNIVAL
  // The way out is the ghost train: its track runs out through the back of the ride and the fence. It
  // needs a fuse; it will not run until Pipo's nose is back on his mirror; taking the nose starts the
  // organ, and while the organ plays the carousel horses run.
  const ORGAN_ON = 24, ORGAN_OFF = 11, CAR_R = 4.8;
  C.carnival = {
    start(g) {
      const L = g.level, sp = L.spots.carousel[0], f = g.flags;
      this.ride = null; this.organ = { on: false, t: 0 }; this.carRot = 0;
      f.music = false;
      g.setObj('carnival_start');
      // the carousel: the map leaves it to the chapter so that it can turn
      const car = this.carousel = g.meshFromDef('carousel'); car.position.set(sp.wx, 0, sp.wz); g.world.group.add(car);
      const paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38, vertexColors: true }); g.world.patch && g.world.patch(paint);
      this.deco = [];
      for (let k = 0; k < 16; k++) {
        if (k % 4 === 0 || !PB.carouselHorseGeo) continue;   // the four empty poles are the live ones' places
        const a = (k + 0.5) / 16 * PI * 2, m = new THREE.Mesh(PB.carouselHorseGeo(k), paint);
        m.position.set(Math.cos(a) * CAR_R, 0.0, Math.sin(a) * CAR_R); m.rotation.y = -a; m.castShadow = true; car.add(m);
        this.deco.push({ m, ph: k * 0.7 });
      }
      // the ride car to leave in, waiting at the platform
      const rs = L.spots.ride[0];
      this.rideCar = g.meshFromDef('ghostCar'); this.rideCar.position.set(rs.wx, 0, rs.wz); this.rideCar.rotation.y = PI; g.world.group.add(this.rideCar);
      this.rideCol = g.world.addCollider({ minX: rs.wx - 0.8, maxX: rs.wx + 0.8, minZ: rs.wz - 0.5, maxZ: rs.wz + 0.5, maxY: 1.1 });
      this.placeHorses(g);
    },
    afterCard(g) { g.mono('carnival_start', 4); g.radio('carnival_otto1', { delay: 10 }); },
    restore(g) {
      const f = g.flags;
      if (f.power) g.world.setZone(3, true);
      if (f.noseTaken && !f.claimed) this.organ = { on: true, t: 0 };
      this.refresh(g);
    },
    refresh(g) {
      const f = g.flags;
      if (this.ride) return;
      if (f.claimed) return g.setObj(f.power ? 'carnival_ride' : has(g, 'fuse') ? 'carnival_fit' : f.boothSeen ? 'carnival_fuse' : 'carnival_power');
      if (f.noseTaken) return g.setObj('carnival_mirror');
      if (!f.power) {
        if (has(g, 'fuse')) return g.setObj('carnival_fit');
        if (f.boothSeen) return g.setObj('carnival_fuse');
        return g.setObj(f.ghostSeen ? 'carnival_power' : 'carnival_start');
      }
      g.setObj(f.rosaRead ? 'carnival_nose' : 'carnival_why');
    },
    prompt(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'booth': return f.power ? null : ST.line(has(g, 'fuse') ? 'carnival_boothPrompt' : 'carnival_boothLook');
        case 'mirror': return f.claimed ? null : ST.line(has(g, 'nose') ? 'carnival_mirrorPut' : 'carnival_mirrorLook');
        case 'ride': return this.ride ? null : ST.line(f.power && f.claimed ? 'carnival_ridePrompt' : 'carnival_rideLook');
      }
      return undefined;
    },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'booth':
          if (f.power) return true;
          if (!has(g, 'fuse')) { g.mono('carnival_noPower', 4); if (!f.boothSeen) { f.boothSeen = true; this.refresh(g); } return true; }
          drop(g, 'fuse'); f.power = true;
          if (g.audio.click) g.audio.click(o.pos);
          g.world.setZone(3, true);
          if (g.audio.generatorStart) g.audio.generatorStart(o.pos);
          g.noise(o.pos.x, o.pos.z, 30, 'loud');
          g.mono(f.claimed ? 'carnival_running' : 'carnival_power', 4);
          this.wakeMasks(g, 'all');
          this.refresh(g); g.completeStep(); g.checkpoint(true);
          return true;
        case 'nose':
          g.takeItem(o); give(g, 'nose'); g.audio.pickup('item');
          f.noseTaken = true;
          g.mono('carnival_nose', 4);
          // the organ starts up by itself; the carousel turns; four of its horses step down
          g.later(2500, () => { this.organ = { on: true, t: 0 }; this.setMusic(g, true); g.mono('carnival_music', 3); });
          g.later(6500, () => { this.loseHorses(g); g.mono('carnival_horses', 3); });
          this.wakeMasks(g, 'all');
          this.refresh(g); g.completeStep(); g.checkpoint(true);
          return true;
        case 'mirror':
          if (f.claimed) return true;
          if (!has(g, 'nose')) { g.mono('carnival_mirrorLook', 4); return true; }
          this.claim(g, o); return true;
        case 'ride':
          if (this.ride) return true;
          if (!f.power) { g.mono('carnival_notYet', 4); return true; }
          if (!f.claimed) { g.mono('carnival_power', 4); return true; }
          this.board(g); return true;
      }
      return false;
    },
    picked(g, id) { if (id === 'fuse') { g.mono('carnival_fuse', 3); this.refresh(g); g.completeStep(); } },
    noteRead(g, id) {
      const f = g.flags;
      if (id === 'carnival_rosa' && !f.rosaRead) { f.rosaRead = true; this.refresh(g); }
      if (id === 'carnival_kasper' && !f.kasperRead) { f.kasperRead = true; g.later(400, () => g.mono('carnival_kasper', 4)); }
      if (id === 'carnival_closing' && !f.ghostSeen) { f.ghostSeen = true; this.refresh(g); }
    },
    // the horses that are alive ride round with the carousel until they get off it
    placeHorses(g) {
      const sp = g.level.spots.carousel[0], th = this.carousel ? this.carousel.rotation.y : 0;
      species(g, 'horse').forEach((e, k) => {
        if (e.state !== 'dormant') return;
        const a = (k * 4 + 0.5) / 16 * PI * 2;
        e.pos.set(sp.wx + Math.cos(a - th) * CAR_R, 0, sp.wz + Math.sin(a - th) * CAR_R); e.heading = th - a; e.mesh.visible = true;
        e.cell = g.level.cellOf(e.pos.x, e.pos.z);
      });
    },
    loseHorses(g) {
      if (g.flags.claimed) return;
      const sp = g.level.spots.carousel[0], pl = g.player.pos;
      for (const e of species(g, 'horse')) {
        if (e.state !== 'dormant') continue;
        // off the deck, outward, and away
        const a = Math.atan2(e.pos.z - sp.wz, e.pos.x - sp.wx);
        e.pos.set(sp.wx + Math.cos(a) * 7.4, 0, sp.wz + Math.sin(a) * 7.4); e.cell = g.level.cellOf(e.pos.x, e.pos.z);
        e.lastKnown = { x: pl.x, z: pl.z }; e.awareness = 1.2; e.setState('chase');
      }
      const first = species(g, 'horse')[0]; if (first) g.onSpotted(first);
    },
    wakeMasks(g, which) {
      species(g, 'mask').forEach((e, k) => {
        if (e.state !== 'dormant') return;
        if (which === 'funhouse' && k !== 3 && k !== 4) return;
        e.setState('patrol'); e.mesh.visible = true;
      });
    },
    setMusic(g, on) {
      g.flags.music = on;
      g.world.setZone(2, on);
      if (g.audio.carousel) g.audio.carousel(on);
      if (!on && species(g, 'horse').some(e => e.state !== 'dormant')) g.mono('carnival_stopped', 3);
    },
    claim(g, o) {
      const f = g.flags;
      drop(g, 'nose'); f.claimed = true; claim(g);
      const nose = g.meshFromDef('clownNose'); nose.position.set(o.pos.x, 0.79, o.pos.z + 0.05); g.world.group.add(nose);
      g.audio.pickup('item');
      g.mono('carnival_placed', 4);
      // the organ stops for good; the horses stand where they are
      this.organ = { on: false, t: 0, done: true }; if (g.flags.music) this.setMusic(g, false);
      g.later(4500, () => { g.mono('carnival_claimed', 4); g.world.setZone(4, false); });
      g.later(9000, () => { if (g.flags.power) { g.mono('carnival_running', 4); if (g.audio.rideRun) g.audio.rideRun(true); } else g.mono('carnival_notYet', 4); this.refresh(g); });
      g.later(13000, () => g.radio('carnival_otto3'));
      this.refresh(g); g.completeStep(); g.checkpoint(true);
    },
    board(g) {
      const pl = g.player, rs = g.level.spots.ride[0];
      g.world.removeCollider(this.rideCol);
      for (const e of g.entities) e.update = () => {};
      pl.frozen = true; pl.freeLook = true; pl.yaw = -PI / 2 + PI;   // facing along the car, west
      pl.pos.set(rs.wx, 0, rs.wz); pl.camLift = -0.55;
      g.mono('carnival_board', 2);
      // the route: round the platform's U, in at the entrance, along the dark, the cabin, and out
      const P = [[84.6, 31.5], [81.6, 31.5], [80.7, 30.4], [80.7, 26.6], [81.6, 25.5], [92.5, 25.5], [121.5, 25.5], [121.5, 28.5], [129.5, 28.5]];
      const seg = []; let len = 0;
      for (let k = 1; k < P.length; k++) { const l = Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1]); seg.push([P[k - 1], P[k], len, l]); len += l; }
      this.ride = { t: 0, s: 0, v: 0, seg, len, ev: {} };
      if (g.audio.rideRun) g.audio.rideRun(true);
      this.refresh(g);
    },
    updateRide(g, dt) {
      const R = this.ride, pl = g.player, car = this.rideCar, L = g.level;
      R.t += dt;
      const vT = R.t < 1.5 ? 0 : R.s > 72 ? 5.5 : 2.6;
      R.v = U.damp(R.v, vT, 1.5, dt); R.s = Math.min(R.len, R.s + R.v * dt);
      const sg = R.seg.find(q => R.s <= q[2] + q[3]) || R.seg[R.seg.length - 1];
      const k = U.clamp((R.s - sg[2]) / sg[3], 0, 1), x = U.lerp(sg[0][0], sg[1][0], k), z = U.lerp(sg[0][1], sg[1][1], k);
      const yaw = Math.atan2(sg[1][0] - sg[0][0], sg[1][1] - sg[0][1]);
      car.position.set(x, Math.sin(R.t * 9) * 0.006, z); car.rotation.y = U.angleDamp(car.rotation.y, yaw - H, 4, dt);
      pl.pos.set(x, 0, z); pl.camLift = -0.55 + car.position.y; pl.camRoll = Math.sin(R.t * 2.3) * 0.01;
      const once = (key, fn) => { if (!R.ev[key]) { R.ev[key] = true; fn(); } };
      // the doors bang open as it reaches them
      if (x > 88) once('in', () => { const d = g.level.doors.find(q => q.id === 'ghostIn'); if (d) { g.world.openDoor(d.id, x, z); g.audio.door(d.kind, new THREE.Vector3(93, 1.2, 25.5), true, 1, g.world.doorSound(d.id)); } });
      if (x > 117) once('cab', () => { const d = L.doorAt(40, 9, 1); if (d) { g.world.openDoor(d.id, x, z); g.audio.door(d.kind, new THREE.Vector3(123, 1.2, 28.5), true, 1, g.world.doorSound(d.id)); } });
      // inside: the lamps flare and die; someone laughing very close; the smell of smoke
      if (x > 100) once('flare', () => { pl.addTrauma(0.2); g.fearAdd(15); const lo = species(g, 'lotte')[0]; if (lo) lo.voice('spot'); });
      if (x > 110) once('dark', () => { g.world.setZone(3, false); });
      if (z > 27 && x > 121) once('turn', () => { g.world.setZone(3, true); });
      if (x > 124) once('crash', () => { pl.addTrauma(0.9); if (g.audio.crash) g.audio.crash(); g.mono('carnival_fence', 3); g.fadeTo(1, 0.6); });
      if (R.s >= R.len && !R.done) {
        R.done = true;
        g.later(1800, () => g.mono('carnival_out', 6));
        g.later(8500, () => g.whenPlaying(() => { pl.camLift = 0; pl.camRoll = 0; pl.freeLook = false; g.exitLevel('lake'); }));
      }
    },
    respawned(g) {
      if (this.organ.on) this.organ.t = 0;
    },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'mask' && !f.masksSeen) { f.masksSeen = true; g.later(300, () => g.mono('carnival_masks', 4)); g.radio('carnival_otto2', { delay: 6 }); }
    },
    update(g, dt) {
      const f = g.flags, pl = g.player;
      if (this.ride) { this.updateRide(g, dt); return; }
      // the organ: it plays a while and stops a while, until the nose is home
      const O = this.organ;
      if (O.on && !f.claimed) {
        O.t += dt;
        const cyc = O.t % (ORGAN_ON + ORGAN_OFF), want = cyc < ORGAN_ON;
        if (want !== f.music) this.setMusic(g, want);
      }
      if (f.music) this.carRot += dt * 0.32;
      if (this.carousel) {
        this.carousel.rotation.y = this.carRot;
        for (const d of this.deco) d.m.position.y = f.music ? (Math.sin(g.time * 2.4 + d.ph) * 0.5 + 0.5) * 0.35 : d.m.position.y;
      }
      this.placeHorses(g);
      // first sights
      if (!f.gateSeen && pl.pos.z > 36.2 * 3 && Math.abs(pl.pos.x - 22.5 * 3) < 6) { f.gateSeen = true; g.mono('carnival_gate', 4); }
      if (!f.boothNear && inTrigger(g, 'booth')) { f.boothNear = true; g.mono('carnival_booth', 4); g.later(6000, () => g.mono('carnival_lotte', 4)); }
      if (!f.ghostSeen && inTrigger(g, 'station')) { f.ghostSeen = true; g.mono('carnival_ghost', 5); this.refresh(g); }
      if (!f.funIn && inTrigger(g, 'funhouse')) { f.funIn = true; this.wakeMasks(g, 'funhouse'); }
      if (!f.mazeIn && inTrigger(g, 'maze')) { f.mazeIn = true; g.mono('carnival_maze', 5); }
      if (!f.trailerIn && inTrigger(g, 'trailer')) { f.trailerIn = true; g.mono('carnival_trailer', 3); }
    },
  };

  // ============================================================ 9. LAKE OSTRA
  // Follow her footprints out to the huts; look down the hole and remember; the storm comes, the trail
  // goes on the wrong way, out over the old river; at the end of it, Wren, with her back to you. Then
  // what you say decides the ending.
  const TRAIL_A = [[9.5, 38.3], [10.2, 36.6], [12, 33.5], [15.5, 29], [20, 24.5], [25, 20], [28.6, 16.8], [30.5, 15.3]];
  const TRAIL_B = [[34.0, 16.6], [32.5, 17.8], [29, 19.5], [25, 20.6], [21, 21.3], [17.5, 21.6], [15.2, 21.6], [13.8, 21.4]];
  C.lake = {
    start(g) {
      const f = g.flags;
      this.end = null; this.memory = null; this.storm = 0;
      give(g, 'mitten');
      g.setObj('lake_start');
      // her footprints: small, a child's boots, a stride apart
      this.prints = { A: this.lay(g, TRAIL_A), B: this.lay(g, TRAIL_B) };
      for (const m of this.prints.B) m.visible = false;
      this.fog0 = g.scene.fog ? g.scene.fog.density : 0.028;
      void f;
    },
    lay(g, path) {
      const mat = new THREE.MeshBasicMaterial({ color: 0x5a6878, transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
      const geo = new THREE.CircleGeometry(0.075, 10); geo.scale(0.7, 1.5, 1); geo.rotateX(-H);
      const out = []; let side = 1;
      for (let k = 1; k < path.length; k++) {
        const ax = path[k - 1][0] * 3, az = path[k - 1][1] * 3, bx = path[k][0] * 3, bz = path[k][1] * 3, len = Math.hypot(bx - ax, bz - az), n = Math.floor(len / 0.5);
        const yaw = Math.atan2(bx - ax, bz - az), px = Math.cos(yaw), pz = -Math.sin(yaw);
        for (let i = 0; i < n; i++) {
          const t = i / n, m = new THREE.Mesh(geo, mat); side = -side;
          m.position.set(U.lerp(ax, bx, t) + px * 0.08 * side, 0.015, U.lerp(az, bz, t) + pz * 0.08 * side); m.rotation.y = yaw + (Math.random() - 0.5) * 0.3; m.renderOrder = 2;
          g.world.group.add(m); out.push(m);
        }
      }
      return out;
    },
    afterCard(g) { g.mono('lake_start', 5); g.later(6000, () => g.mono('lake_empty', 5)); g.radio('lake_otto1', { delay: 14 }); },
    restore(g) {
      const f = g.flags;
      if (f.remembered) { for (const m of this.prints.B) m.visible = true; this.storm = 1; wake(g, 'hush'); }
      this.refresh(g);
    },
    refresh(g) {
      const f = g.flags;
      if (this.end) return g.setObj('lake_say');
      if (f.remembered) return g.setObj('lake_thin');
      if (f.atHuts) return g.setObj('lake_remember');
      if (f.onIce) return g.setObj('lake_huts');
      if (f.outside) return g.setObj('lake_trail');
      g.setObj('lake_start');
    },
    use(g, o) {
      const f = g.flags;
      switch (o.id) {
        case 'radio': g.readNote('lake_radio'); return true;
        case 'tape': g.readNote('lake_tape', () => g.mono('lake_tape', 5)); return true;
        case 'hole':
          if (f.remembered || this.memory) return true;
          this.remember(g); return true;
      }
      return false;
    },
    noteRead(g, id) {
      if (id === 'lake_granNote' && !g.flags.noteSeen) { g.flags.noteSeen = true; g.later(400, () => g.mono('lake_note', 4)); }
      if (id === 'lake_wrenNote' && !g.flags.wrenNoteSeen) { g.flags.wrenNoteSeen = true; g.later(400, () => g.mono('lake_wrenNote', 3)); }
    },
    // the hole in the ice in the second hut: looking down it, it all comes back
    remember(g) {
      const f = g.flags, pl = g.player;
      this.memory = { t: 0 };
      pl.frozen = true; pl.freeLook = true;
      g.mono('lake_hole', 3);
      const lines = ['lake_remember1', 'lake_remember2', 'lake_remember3', 'lake_remember4'];
      lines.forEach((k, i) => g.later(3500 + i * 6500, () => { g.mono(k, 6); if (i === 1) { pl.addTrauma(0.15); g.fearAdd(10); } if (i === 3) { if (g.audio.iceCrack) g.audio.iceCrack(new THREE.Vector3(13.6 * 3, 0, 21.6 * 3), 1); pl.addTrauma(0.3); } }));
      g.later(3500 + 4 * 6500, () => {
        pl.frozen = false; pl.freeLook = false; this.memory = null;
        f.remembered = true;
        for (const m of this.prints.B) m.visible = true;
        this.storm = 0.001;
        g.mono('lake_storm', 4);
        g.later(4500, () => g.mono('lake_gone', 4));
        // the trail goes on the wrong way; she is out there, ahead, for a second
        g.later(7000, () => glimpseWren(g, 25 * 3, 20.6 * 3, Math.atan2(-1, 0), 1600));
        // and what she buried gets up and follows her
        g.later(12000, () => { wake(g, 'hush', 'investigate'); const h = species(g, 'hush')[0]; if (h) h.lastKnown = { x: pl.pos.x, z: pl.pos.z }; g.radio('lake_otto2', { delay: 6 }); });
        this.refresh(g); g.completeStep(); g.checkpoint(true);
      });
    },
    // the end of the trail: Wren on the thin ice, her back to you
    meet(g) {
      const sp = g.level.spots.wrenStand[0];
      const w = g.wren || (g.wren = PB.wrenFigure(g));
      w.position.set(sp.wx, 0, sp.wz); w.rotation.y = Math.atan2(-1, -1); w.visible = true;
      this.end = { stage: 'meet' };
      // everything stops where it is, the Hush too: it stands behind her and waits to hear what she says
      for (const e of g.entities) e.update = () => {};
      g.mono('lake_found', 2);
      this.refresh(g);
      g.later(2200, () => this.ask(g));
    },
    ask(g) {
      const back = () => { if (!g.ui.touch && !g.input.lockFailed) g.input.requestLock(); };
      g.ui.subtitle(ST.line('lake_choiceTitle'), 4);
      g.choice([
        { label: ST.line('lake_sayIt'), fn: () => { back(); this.sayIt(g, 0); } },
        { label: ST.line('lake_vanished'), fn: () => { back(); this.vanished(g); } },
      ], () => { back(); g.later(4000, () => { if (this.end && this.end.stage === 'meet') this.ask(g); }); });
    },
    // say it, one thing at a time
    sayIt(g, k) {
      const back = () => { if (!g.ui.touch && !g.input.lockFailed) g.input.requestLock(); };
      const keys = ['lake_say1', 'lake_say2', 'lake_say3'];
      // once she starts telling it, what she buried has nothing left to stand on: it goes, and the sound comes back
      if (this.end.stage !== 'say') { const h = species(g, 'hush')[0]; if (h) { h.mesh.visible = false; if (g.audio.stopLoop) g.audio.stopLoop('cbreath:' + h.id, 1.5); } if (g.audio.hush) g.audio.hush(0); }
      this.end.stage = 'say';
      if (k < keys.length) {
        g.choice([{ label: ST.line(keys[k]), fn: () => { back(); g.ui.subtitle(ST.line(keys[k]), 4, null, 'ada'); g.later(3800, () => this.sayIt(g, k + 1)); } }], () => { back(); g.later(2500, () => this.sayIt(g, k)); });
        return;
      }
      // she turns round
      const w = g.wren, pl = g.player.pos;
      this.end.turn = { t: 0, from: w.rotation.y, to: Math.atan2(pl.x - w.position.x, pl.z - w.position.z) };
      g.later(3000, () => g.choice([{ label: ST.line('lake_give'), fn: () => { back(); this.giveMitten(g); } }], () => { back(); g.later(2000, () => this.sayIt(g, 3)); }));
    },
    giveMitten(g) {
      drop(g, 'mitten');
      g.audio.pickup('item');
      this.end.stage = 'home';
      this.end.walk = { t: 0 };
      const ending = g.save.drawings.length >= 8 && g.save.world.badgeReturned ? 'morning' : 'thaw';
      g.later(9000, () => g.whenPlaying(() => g.exitLevel('ending-' + ending)));
    },
    vanished(g) {
      this.end.stage = 'snow';
      const h = species(g, 'hush')[0], pl = g.player;
      if (h) {
        const fw = pl.forward();
        h.pos.set(pl.pos.x - fw.x * 1.6, 0, pl.pos.z - fw.z * 1.6); h.mesh.visible = true; h.setState('patrol'); h.update = () => {};
        h.heading = Math.atan2(pl.pos.x - h.pos.x, pl.pos.z - h.pos.z); h.unwind = 0;
        this.end.hush = h;
      }
      g.later(9000, () => g.whenPlaying(() => g.exitLevel('ending-snowfall')));
    },
    updateEnd(g, dt) {
      const E = this.end, w = g.wren;
      if (E.turn && w) { E.turn.t = Math.min(1, E.turn.t + dt / 2.5); w.rotation.y = E.turn.from + U.angleWrap(E.turn.to - E.turn.from) * U.smoothstep(0, 1, E.turn.t); }
      if (E.walk && w) {
        // home, across the ice, toward the lights; she does not look back
        E.walk.t += dt;
        const hx = 9.5 * 3, hz = 38 * 3, d = Math.hypot(hx - w.position.x, hz - w.position.z);
        if (E.walk.t > 1.5 && d > 1) { const yaw = Math.atan2(hx - w.position.x, hz - w.position.z); w.rotation.y = U.angleDamp(w.rotation.y, yaw, 3, dt); w.position.x += Math.sin(yaw) * dt * 0.9; w.position.z += Math.cos(yaw) * dt * 0.9; w.position.y = Math.abs(Math.sin(E.walk.t * 5)) * 0.02; }
        this.storm = Math.max(0, this.storm - dt * 0.15);
      }
      if (E.hush) {
        const h = E.hush; h.unwind = Math.min(1, (h.unwind || 0) + dt / 4.5); h.anim.t += dt; h.vis.animate(h, dt); h.mesh.position.set(h.pos.x, 0, h.pos.z); h.mesh.rotation.y = h.heading;
        this.storm = Math.min(1.6, this.storm + dt * 0.25);
      }
    },
    respawned(g) { if (this.end) this.end = null; },
    onSpotted(g, ent) {
      const f = g.flags;
      if (ent.kind === 'laugher' && !f.laughSeen) { f.laughSeen = true; g.later(400, () => g.mono('lake_laughers', 4)); }
      if (ent.kind === 'hush' && !f.hushSeen) { f.hushSeen = true; g.later(400, () => g.mono('lake_hush', 4)); }
    },
    update(g, dt) {
      const f = g.flags, pl = g.player, L = g.level;
      // where you are: the thin ice is a few cells wide over the old river
      const c = L.cellOf(pl.pos.x, pl.pos.z);
      f.thinIce = (PB.Maps.lakeChannel || []).some(([x0, y, x1]) => c.y === y && c.x >= x0 && c.x <= x1);
      if (!f.outside && !inTrigger(g, 'house')) { f.outside = true; g.mono('lake_out', 4); this.refresh(g); }
      if (!f.onIce && inTrigger(g, 'ice')) { f.onIce = true; g.mono('lake_ice', 3); this.refresh(g); g.later(3000, () => glimpseWren(g, 25 * 3, 20 * 3, Math.atan2(1, -0.8), 1400)); g.later(4800, () => g.mono('lake_wren', 3)); }
      if (!f.atHuts && inTrigger(g, 'huts')) { f.atHuts = true; g.mono('lake_huts', 3); this.refresh(g); g.checkpoint(true); }
      if (f.remembered && !f.thinSeen && f.thinIce) { f.thinSeen = true; g.mono('lake_thin', 4); }
      if (f.remembered && !this.end && inTrigger(g, 'thinEnd')) { const sp = L.spots.wrenStand[0]; if (Math.hypot(sp.wx - pl.pos.x, sp.wz - pl.pos.z) < 7) this.meet(g); }
      // the storm: the snow thickens, the far shore goes, then the near one
      if (this.storm > 0 && !this.end) this.storm = Math.min(1, this.storm + dt / 40);
      const fog = g.scene.fog;
      if (fog) fog.density = this.fog0 * (1 + this.storm * 2.4);
      const sn = g.world.street && g.world.street.snowU;
      if (sn) { sn.uWind.value = U.lerp(0.8, 6.5, Math.min(1, this.storm)); sn.uFall.value = U.lerp(0.9, 2.0, Math.min(1, this.storm)); sn.uAlpha.value = U.lerp(0.6, 0.8, Math.min(1, this.storm)); }
      if (this.end) this.updateEnd(g, dt);
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
