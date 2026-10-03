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
    if (open) { g.world.openDoor(d.id); g.audio.door(d.kind, doorPos(g, id), true); }
    g.nav.dirty = true;
  };
  const exitThrough = (g, id, next) => { unlock(g, id, true); g.exitDoorId = id; g.exitNext = next; };
  const inRoom = (g, tag) => { const r = (g.level.meta.rooms || {})[tag]; if (!r) return false; const c = g.level.cellOf(g.player.pos.x, g.player.pos.z); return c.x >= r.x0 && c.x <= r.x1 && c.y >= r.y0 && c.y <= r.y1; };
  const inTrigger = (g, id) => { const tr = g.level.triggers.find(x => x.id === id); if (!tr) return false; const c = g.level.cellOf(g.player.pos.x, g.player.pos.z); return c.x >= tr.x0 && c.x <= tr.x1 && c.y >= tr.y0 && c.y <= tr.y1; };
  const has = (g, id) => g.inv.keys.includes(id);
  const give = (g, id) => { if (!g.inv.keys.includes(id)) g.inv.keys.push(id); g.updateInventoryUI(); };
  const drop = (g, id) => { g.inv.keys = g.inv.keys.filter(k => k !== id); g.updateInventoryUI(); };
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
    refresh(g) {
      const f = g.flags;
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
              g.later(1400, () => { g.mono('depot_chute', 4); g.setObj('depot_parcel'); });
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
              g.later(1400, () => { g.mono('depot_dark', 4); step(g, 'depot_torch'); });
            });
          }));
          return true;
        }
        case 'torch':
          g.takeItem(o); g.player.hasFlashlight = true; g.player.battery = 80; g.player.toggleFlash(true);
          g.audio.pickup(); g.mono('depot_torch', 3); g.ui.hint(t('hint.flash'));
          if (f.dark) step(g, 'depot_power');
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
            g.later(1800, () => { g.mono('depot_tube', 5); step(g, 'depot_ledger'); });
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
            g.later(1600, () => { g.mono('depot_wren', 4); step(g, 'depot_elevator'); });
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
        g.later(1600, () => { const d = g.level.meta.exit ? g.level.meta.exit.door : null; if (d) exitThrough(g, d, 'ferry'); g.setObj('under_leave'); g.completeStep(); g.radio('under_open'); });
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
          drop(g, 'logPage'); f.claimed = true; g.save.world.claimed = (g.save.world.claimed || 0) + 1;
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
      drop(g, 'stub'); f.claimed = true; g.save.world.claimed = (g.save.world.claimed || 0) + 1;
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
    g.scene.add(grp);
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
      f.claimed = true; g.save.world.claimed = (g.save.world.claimed || 0) + 1;
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
            g.audio.caption('knock', t('cap.knock'), new THREE.Vector3(fd.wx, 1.2, fd.wz), 8);
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
      drop(g, 'telegram'); f.claimed = true; g.save.world.claimed = (g.save.world.claimed || 0) + 1;
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
})(typeof window !== 'undefined' ? window : globalThis);
