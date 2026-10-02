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
})(typeof window !== 'undefined' ? window : globalThis);
