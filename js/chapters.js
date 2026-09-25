/* Chapter scripts: objectives, puzzles and story events per chapter. All text comes from the
   language packs through PB.Story (ST). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const ST = PB.Story;
  const t = PB.t;

  const itemOf = (g, type) => g.items.find(i => i.type === type);
  const exitDoorOf = g => g.level.meta.exit ? g.level.doors.find(d => d.id === g.level.meta.exit.door) : null;
  const openExit = (g, next, doorId) => {
    const d = doorId ? g.level.doors.find(x => x.id === doorId) : exitDoorOf(g);
    if (!d) return;
    d.locked = false;
    g.world.openDoor(d.id);
    const obj = g.world.doorObjs.get(d.id);
    g.audio.door(d.kind, obj ? new THREE.Vector3(obj.g.cx, 1.2, obj.g.cz) : null, true);
    g.exitDoorId = d.id; g.exitNext = next;
    g.nav.dirty = true;
  };
  // Shrine: return the memento to free the ghost
  const shrineUse = (g, o, ch) => {
    if (o.type !== 'shrine') return false;
    if (g.save.freed.includes(ch)) { g.ui.hint(ST.shrine('quiet')); return true; }
    if (g.inv.memento === ch) { g.freeGhost(ch); if (o.light) o.light.intensity = 6; return true; }
    const c = ST.char(ch);
    g.ui.subtitle(ST.shrine('missing', { name: c.name, pos: c.pos }), 4);
    return true;
  };
  const shrinePrompt = (g, o, ch) => (o.type === 'shrine' ? (g.save.freed.includes(ch) ? null : g.inv.memento === ch ? t('pr.shrinePlace') : t('pr.shrineLook')) : undefined);
  const wakePac = (g, near) => {
    if (g.pacman && g.pacman.state === 'dormant') {
      g.pacman.wake(near); g.flags.pacAwake = true;
      if (g.levelDef.id === 'lobby') { g.mono('lobby_eaterHeard', 4); g.radio('lobby_pellet1', { delay: 4.5 }); }
      else g.ui.subtitle(ST.mono('eaterFlicker'), 3);
    }
  };
  // When a ghost's memento is picked up in its own chapter
  const mementoRadio = { billy: 'mill_watch', ivy: 'pool_glasses', penny: 'office_tape', clyde: 'dark_lighter' };

  const C = {};

  // ================================================================ PROLOGUE
  C.prolog = {
    start(g) { g.player.hasFlashlight = false; g.setObj('p_flash'); },
    afterCard(g) { g.mono('prolog_start', 5); },
    restore(g) { this.refresh(g); },
    refresh(g) {
      if (!g.player.hasFlashlight) g.setObj('p_flash');
      else if (!g.flags.power) g.setObj('p_power');
      else if (!g.inv.officeKey && !g.flags.officeOpen) g.setObj('p_key');
      else if (!g.inv.token) g.setObj(g.flags.inOffice ? 'p_token' : 'p_office');
      else g.setObj('p_insert');
      if (g.flags.power && !g.world.zonesOn.has(1)) g.world.setZone(1, true);
      if (g.flags.officeOpen) { const d = g.level.doors.find(x => x.id === 'officeDoor'); if (d) d.locked = false; }
    },
    prompt(g, o) {
      if (o.type === 'fuseBox') return g.flags.power ? null : ST.line('prolog_breaker');
      if (o.type === 'register') return g.flags.power ? (g.flags.registerOpen ? null : ST.line('prolog_register')) : ST.line('prolog_registerIdle');
      if (o.type === 'specialCabinet') return g.inv.token ? ST.line('prolog_insertTok') : ST.line('prolog_inspect');
      return undefined;
    },
    use(g, o) {
      switch (o.type) {
        case 'flashlight':
          g.takeItem(o); g.player.hasFlashlight = true; g.player.battery = 70; g.player.toggleFlash(true);
          g.audio.pickup(); g.mono('prolog_flash', 4); g.ui.hint(ST.line('prolog_flashHint'));
          g.setObj('p_power'); g.completeStep();
          return true;
        case 'fuseBox':
          if (g.flags.power) return true;
          g.flags.power = true;
          g.audio.mech('breaker', o.pos);
          g.world.setZone(1, true);
          g.fx.flash = 0.25;
          g.mono('prolog_power', 4);
          g.setObj('p_key'); g.completeStep();
          g.later(9000, () => { if (g.state === 'play') g.mono('prolog_outside', 3); });
          return true;
        case 'register': {
          if (!g.flags.power) { g.ui.hint(ST.line('prolog_registerDead')); return true; }
          if (g.flags.registerOpen) return true;
          g.flags.registerOpen = true; g.inv.officeKey = true;
          const door = g.level.doors.find(d => d.id === 'officeDoor'); if (door) door.locked = false;
          g.flags.officeOpen = true;
          g.audio.mech('coin', o.pos); g.audio.pickup('key');
          g.mono('prolog_register', 4);
          g.setObj('p_office'); g.completeStep(); g.updateInventoryUI();
          return true;
        }
        case 'token':
          g.takeItem(o); g.inv.token = true; g.audio.pickup('key');
          g.mono('prolog_token', 4);
          g.setObj('p_insert'); g.completeStep(); g.updateInventoryUI();
          return true;
        case 'specialCabinet':
          if (!g.inv.token) { g.mono(g.flags.sevenSeen ? 'prolog_cabinet' : 'prolog_seven', 4); g.flags.sevenSeen = true; return true; }
          this.insertToken(g, o);
          return true;
      }
      if (o.type === 'note' && o.item.data === 'p_hiscore') { g.readNote('p_hiscore', () => g.mono('prolog_hiscore', 4)); return true; }
      return false;
    },
    insertToken(g) {
      g.inv.token = false; g.updateInventoryUI();
      g.audio.mech('coin');
      g.player.frozen = true;
      const scr = PB.Tex.cabinetScreens.special;
      if (scr) { scr.text = 'LEVEL 256'; scr.sub = 'PLAYER 2 READY'; scr.dirty = true; }
      g.mono('prolog_insert', 4);
      let k = 0;
      const step = () => {
        k++;
        g.fx.flash = 0.35; g.player.addTrauma(0.35);
        g.world.U.uLmIntensity.value = k % 2 ? 0.1 : 1;
        if (k === 3) g.audio.stinger('spot');
        if (k >= 7) { g.world.U.uLmIntensity.value = 1; g.player.frozen = false; g.whenPlaying(() => g.exitLevel('lobby')); return; }
        g.later(420, step);
      };
      g.later(420, step);
    },
    update(g) {
      const c = g.level.cellOf(g.player.pos.x, g.player.pos.z);
      if (!g.flags.inOffice && c.x >= 10 && c.y <= 2) {
        g.flags.inOffice = true; g.flags.officeOpen = true;
        g.mono('prolog_office', 3.5);
        if (!g.inv.token) g.setObj('p_token');
      }
    },
  };

  // ================================================================ LOBBY (Level 0)
  C.lobby = {
    start(g) { g.setObj('lobby_explore'); },
    afterCard(g) { g.mono('lobby_start', 5); },
    restore(g) { this.refresh(g); },
    refresh(g) {
      if (g.flags.exitOpen) { openExit(g, 'mill'); g.setObj('lobby_leave'); }
      else if (g.inv.pellets >= 4) g.setObj('lobby_insert');
      else if (g.flags.exitSeen || g.inv.pellets > 0) g.setObj('lobby_pellets', { n: g.inv.pellets });
      else g.setObj('lobby_explore');
      const panel = itemOf(g, 'exitPanel');
      if (panel && g.flags.exitOpen) panel.sockets.forEach(s => s.material.color.setRGB(5, 3.4, 3));
    },
    prompt(g, o) {
      if (o.type === 'exitPanel') return g.flags.exitOpen ? null : g.inv.pellets >= 4 ? ST.line('lobby_place') : ST.line('lobby_slots', { n: g.inv.pellets });
      if (o.type === 'radio') return ST.line('lobby_radioTake');
      return undefined;
    },
    use(g, o) {
      if (o.type === 'radio') {
        g.takeItem(o); g.save.world.radio = true; g.writeSave();
        g.audio.pickup('key'); g.mono('lobby_radio', 3);
        g.radio('lobby_meet', { delay: 2.5, force: true });
        g.updateInventoryUI();
        return true;
      }
      if (o.type === 'powerPellet') {
        g.takeItem(o); g.inv.pellets++;
        g.powerT = 8; g.audio.pickup('pellet'); g.fx.flash = 0.3;
        if (g.inv.pellets === 1) { g.mono('lobby_firstPellet', 5); g.later(6000, () => wakePac(g, false)); }
        if (g.inv.pellets === 4) { g.mono('lobby_allPellets', 3); g.setObj('lobby_insert'); }
        else g.setObj('lobby_pellets', { n: g.inv.pellets });
        g.completeStep(); g.updateInventoryUI();
        return true;
      }
      if (o.type === 'exitPanel') {
        if (g.flags.exitOpen) return true;
        if (g.inv.pellets < 4) { g.mono('lobby_exitSeen', 4); g.flags.exitSeen = true; g.radio('lobby_panel'); if (!g.inv.pellets) g.setObj('lobby_pellets', { n: 0 }); return true; }
        g.flags.exitOpen = true;
        o.sockets.forEach((s, k) => g.later(k * 350, () => { s.material.color.setRGB(5, 3.4, 3); g.audio.beep(); }));
        g.later(1600, () => { openExit(g, 'mill'); g.setObj('lobby_leave'); g.completeStep(); g.radio('lobby_open'); });
        g.updateInventoryUI();
        return true;
      }
      return false;
    },
    onSpotted(g, ent) { if (ent.kind === 'pacman' && !g.flags.eaterSeenR) { g.flags.eaterSeenR = true; g.mono('lobby_eaterSeen', 3.5); g.radio('lobby_eater', { delay: 3.5 }); } },
    update(g) {
      if (!g.flags.exitSeen) {
        const d = exitDoorOf(g);
        if (d) {
          const obj = g.world.doorObjs.get(d.id);
          const p = g.player.pos;
          if (Math.hypot(p.x - obj.g.cx, p.z - obj.g.cz) < 9 && g.level.los(p.x, p.z, obj.g.cx + obj.g.nIn.x * 0.3, obj.g.cz + obj.g.nIn.z * 0.3)) {
            g.flags.exitSeen = true; g.mono('lobby_exitSeen', 5);
            if (g.inv.pellets < 4) g.setObj('lobby_pellets', { n: g.inv.pellets });
          }
        }
      }
      // After two pellets the Eater starts to hunt
      if (g.pacman) g.pacman.huntBias = g.inv.pellets >= 2;
    },
  };

  // ================================================================ MILL WAREHOUSE (Billy)
  C.mill = {
    start(g) { g.setObj('mill_fuses', { n: 0 }); },
    afterCard(g) { g.mono('mill_start', 4); g.radio('mill_start', { delay: 5 }); },
    restore(g) {
      if (g.flags.elevatorReady) { openExit(g, 'pool'); g.setObj('mill_leave'); }
      else if (g.flags.panelDone) { g.flags.waitT = 12; g.setObj('mill_wait', { n: 12 }); }
      else if (g.inv.fuses >= 3) g.setObj('mill_panel');
      else g.setObj('mill_fuses', { n: g.inv.fuses });
    },
    prompt(g, o) {
      if (o.type === 'fusePanel') return g.flags.panelDone ? null : g.inv.fuses >= 3 ? ST.line('mill_panel') : ST.line('mill_panelIdle', { n: g.inv.fuses });
      return shrinePrompt(g, o, 'billy');
    },
    use(g, o) {
      if (o.type === 'fuse') {
        g.takeItem(o); g.inv.fuses++; g.audio.pickup();
        g.mono('mill_fuse', 2);
        if (g.inv.fuses >= 2) wakePac(g, false);
        if (g.inv.fuses >= 3) g.setObj('mill_panel'); else g.setObj('mill_fuses', { n: g.inv.fuses });
        g.completeStep(); g.updateInventoryUI();
        return true;
      }
      if (o.type === 'fusePanel') {
        if (g.flags.panelDone) return true;
        if (g.inv.fuses < 3) { g.ui.hint(ST.line('mill_slots')); return true; }
        g.flags.panelDone = true;
        o.slots.forEach((s, k) => g.later(k * 400, () => { s.material.color.setRGB(0.8, 0.6, 0.3); g.audio.mech('fuse', o.pos); }));
        g.later(1400, () => { o.lamp.material.color.setRGB(0.2, 3, 0.4); g.audio.mech('breaker', o.pos); });
        g.inv.fuses = 0; g.updateInventoryUI();
        g.flags.waitT = 30;
        g.setObj('mill_wait', { n: 30 });
        g.mono('mill_elevator', 4);
        g.radio('mill_elevator', { delay: 4 });
        g.noise(o.pos.x, o.pos.z, 60);
        g.audio.loop('elevatorHum', 'elevator', { x: o.pos.x, y: 2, z: o.pos.z }, { bus: 'sfx', gain: 0.4 });
        g.completeStep();
        return true;
      }
      return shrineUse(g, o, 'billy');
    },
    onSpotted(g, ent) { if (ent.type === 'blinky' && !g.flags.redR) { g.flags.redR = true; g.mono('mill_redSeen', 3.5); g.radio('mill_red', { delay: 1 }); } },
    update(g, dt) {
      if (g.flags.panelDone && !g.flags.elevatorReady) {
        g.flags.waitT -= dt;
        g.setObj('mill_wait', { n: Math.max(0, Math.ceil(g.flags.waitT)) });
        if (g.flags.waitT <= 0) { g.flags.elevatorReady = true; g.audio.stopLoop('elevatorHum'); openExit(g, 'pool'); g.setObj('mill_leave'); g.completeStep(); }
      }
    },
  };

  // ================================================================ THE POOL (Ivy)
  C.pool = {
    start(g) { g.setObj('pool_valves', { n: 0 }); g.flags.valves = 0; },
    afterCard(g) { g.mono('pool_start', 4); g.radio('pool_start', { delay: 5 }); },
    restore(g) {
      for (const it of g.items) if (it.type === 'valve' && g.flags['v_' + it.id]) it.done = true;
      if (g.flags.drained) { g.drainPools(true); g.setObj('pool_hatch'); }
      else if (g.flags.valves >= 4) { g.flags.drainT = 5; g.setObj('pool_drain'); }
      else g.setObj('pool_valves', { n: g.flags.valves || 0 });
    },
    prompt(g, o) {
      if (o.type === 'valve') return o.done ? null : ST.line('pool_valve');
      if (o.type === 'drain') return g.flags.drained ? ST.line('pool_hatch') : null;
      return shrinePrompt(g, o, 'ivy');
    },
    holdStart(g, o) { if (o && o.type === 'valve') { g.audio.mech('valve', o.pos); g.noise(o.pos.x, o.pos.z, 22); } },
    use(g, o) {
      if (o.type === 'valve') {
        if (o.done) return true;
        o.done = true; g.flags['v_' + o.id] = true;
        g.flags.valves = (g.flags.valves || 0) + 1;
        if (o.wheel) o.wheel.rotation.z += 3;
        g.mono('pool_valve', 2.5);
        if (g.flags.valves >= 3) wakePac(g, false);
        if (g.flags.valves >= 4) {
          g.setObj('pool_drain'); g.flags.drainT = 20; g.drainPools(false);
          const dr = itemOf(g, 'drain');
          g.audio.mech('drain', dr.pos); g.noise(dr.pos.x, dr.pos.z, 40); g.radio('pool_drain');
        } else g.setObj('pool_valves', { n: g.flags.valves });
        g.completeStep();
        return true;
      }
      if (o.type === 'drain') {
        if (!g.flags.drained) return true;
        g.audio.door('metal', o.pos, true);
        g.exitLevel('office');
        return true;
      }
      return shrineUse(g, o, 'ivy');
    },
    onSpotted(g, ent) { if (ent.type === 'inky' && !g.flags.blueR) { g.flags.blueR = true; g.mono('pool_blueSeen', 3.5); g.radio('pool_blue', { delay: 1 }); } },
    update(g, dt) {
      if (g.flags.valves >= 4 && !g.flags.drained) {
        g.flags.drainT -= dt;
        if (g.flags.drainT <= 0) { g.flags.drained = true; g.world.drained = true; g.mono('pool_drained', 4); g.setObj('pool_hatch'); g.completeStep(); }
      }
      // Ivy hears splashing much better
      const ink = g.entities.find(e => e.type === 'inky');
      if (ink) ink.hearMul = g.player.surface() === 'water' ? 2.4 : 1.1;
    },
  };

  // ================================================================ INSURANCE OFFICE (Penny)
  C.office = {
    start(g) {
      g.setObj('office_code', { n: 0 }); g.flags.digits = 0;
      const ph = g.items.find(i => i.id === 'phone1');
      if (ph) this.ring(g, ph);
    },
    afterCard(g) { g.mono('office_start', 4); g.radio('office_start', { delay: 5 }); },
    ring(g, ph) {
      if (ph.ringing || ph.answered) return;
      ph.ringing = true;
      g.audio.loop('phone:' + ph.id, 'phone', { x: ph.pos.x, y: 1, z: ph.pos.z }, { bus: 'sfx', gain: 0.5, ref: 3 });
      g.audio.caption('phone', t('cap.phone'), ph.pos, 20);
    },
    restore(g) {
      if (g.flags.stairOpen) { openExit(g, 'dark', 'stairDoor'); g.setObj('office_stairs'); }
      else if (g.inv.keycard) g.setObj('office_stairs');
      else if (g.flags.securityOpen) g.setObj('office_card');
      else if ((g.flags.digits || 0) >= 4) g.setObj('office_keypad');
      else g.setObj('office_code', { n: g.flags.digits || 0 });
      if (g.flags.securityOpen) { const d = g.level.doors.find(x => x.id === 'securityDoor'); if (d) { d.locked = false; g.world.openDoor(d.id); } }
      for (const it of g.items) if (g.flags['c_' + it.id]) it.clueDone = true;
    },
    clue(g, o) {
      if (o.clueDone) return;
      o.clueDone = true;
      g.flags['c_' + o.id] = true;
      g.flags.digits = (g.flags.digits || 0) + 1;
      if (g.flags.digits >= 4) { g.setObj('office_keypad'); g.mono('office_code', 4); }
      else g.setObj('office_code', { n: g.flags.digits });
      if (g.flags.digits === 2) { const ph = g.items.find(i => i.id === 'phone2'); if (ph) this.ring(g, ph); }
      g.completeStep();
    },
    prompt(g, o) {
      if (o.type === 'keypad') return g.flags.securityOpen ? null : ST.line('office_keypad');
      if (o.type === 'cardReader') return g.flags.stairOpen ? null : g.inv.keycard ? ST.line('office_card') : ST.line('office_cardIdle');
      if (o.type === 'phone') { if (o.answered) return null; return o.ringing ? t('pr.phoneRing') : t('pr.phone'); }
      return shrinePrompt(g, o, 'penny');
    },
    use(g, o) {
      if (o.type === 'keypad') {
        if (g.flags.securityOpen) return true;
        g.state = 'keypad'; g.input.exitLock(); g.ignoreUnlock = true;
        g.ui.showKeypad(code => {
          if (code !== g.levelDef.code) return false;
          g.flags.securityOpen = true;
          const d = g.level.doors.find(x => x.id === 'securityDoor');
          if (d) { d.locked = false; g.world.openDoor(d.id, g.player.pos.x, g.player.pos.z); }
          if (o.led) o.led.material.color.setRGB(0.1, 3, 0.2);
          g.setObj('office_card'); g.completeStep();
          wakePac(g, false);
          const ph = g.items.find(i => i.id === 'phone3'); if (ph) this.ring(g, ph);
          g.nav.dirty = true;
          return true;
        }, () => { g.state = 'play'; g.ignoreUnlock = false; g.suppressPauseUntil = performance.now() + 250; if (!g.ui.touch && !g.input.lockFailed) g.input.requestLock(); });
        return true;
      }
      if (o.type === 'keycard') { g.takeItem(o); g.inv.keycard = true; g.audio.pickup('key'); g.setObj('office_stairs'); g.updateInventoryUI(); g.completeStep(); return true; }
      if (o.type === 'cardReader') {
        if (g.flags.stairOpen) return true;
        if (!g.inv.keycard) { g.ui.hint(ST.line('office_cardRed')); g.audio.beep(false); return true; }
        g.flags.stairOpen = true; g.audio.mech('card', o.pos);
        if (o.led) o.led.material.color.setRGB(0.1, 3, 0.2);
        openExit(g, 'dark', 'stairDoor'); g.completeStep();
        return true;
      }
      if (o.type === 'phone') {
        o.answered = true;
        g.answerPhone(o, () => { if (o.item.clue) this.clue(g, o); });
        return true;
      }
      if (o.type === 'note' && o.item.data === 'office_eddie_page') { g.readNote('office_eddie_page', () => { g.save.world.eddiePage = true; g.radio('office_page', { delay: 1 }); }); return true; }
      return shrineUse(g, o, 'penny');
    },
    onSpotted(g, ent) { if (ent.type === 'pinky' && !g.flags.pinkR) { g.flags.pinkR = true; g.mono('office_pinkSeen', 3.5); g.radio('office_pink', { delay: 1 }); } },
    update(g) {
      if (!g.flags.cameraHint && g.flags.securityOpen) {
        const sec = g.level.meta.security;
        const c = g.level.cellOf(g.player.pos.x, g.player.pos.z);
        if (sec && c.x >= sec.x0 && c.x <= sec.x1 && c.y >= sec.y0 && c.y <= sec.y1) {
          g.flags.cameraHint = true; g.flags.cameras = true;
          g.mono('office_cameras', 5);
        }
      }
    },
  };

  // ================================================================ LIGHTS OUT (Clyde)
  C.dark = {
    start(g) { g.setObj('dark_generators', { n: 0 }); g.flags.gens = 0; },
    afterCard(g) { g.mono('dark_start', 4); g.player.toggleFlash(true); g.radio('dark_start', { delay: 5 }); },
    restore(g) {
      for (const it of g.items) if (it.type === 'generator' && g.flags['g_' + it.id]) it.done = true;
      if ((g.flags.gens || 0) >= 3) { openExit(g, 'maze'); g.setObj('dark_leave'); }
      else g.setObj('dark_generators', { n: g.flags.gens || 0 });
    },
    prompt(g, o) {
      if (o.type === 'generator') return o.done ? null : g.inv.fuel > 0 ? ST.line('dark_gen') : ST.line('dark_genEmpty');
      return shrinePrompt(g, o, 'clyde');
    },
    canHold(g, o) { if (o.type === 'generator' && g.inv.fuel <= 0) { g.ui.hint(ST.line('dark_needFuel')); return false; } return true; },
    holdStart(g, o) { if (o && o.type === 'generator') g.noise(o.pos.x, o.pos.z, 20); },
    use(g, o) {
      if (o.type === 'fuelCan') { g.takeItem(o); g.inv.fuel++; g.audio.pickup(); g.updateInventoryUI(); g.ui.notify(t('n.diesel')); return true; }
      if (o.type === 'generator') {
        if (o.done) return true;
        if (g.inv.fuel <= 0) { g.ui.hint(ST.line('dark_tankEmpty')); return true; }
        g.inv.fuel--; o.done = true; g.flags['g_' + o.id] = true;
        g.flags.gens = (g.flags.gens || 0) + 1;
        g.audio.mech('generator', o.pos);
        g.audio.loop('gen:' + o.id, 'engine', { x: o.pos.x, y: 0.5, z: o.pos.z }, { bus: 'sfx', gain: 0.35, ref: 3 });
        const zone = o.item.spot && o.item.spot.zone ? o.item.spot.zone : g.level.zone[g.level.i(o.item.x, o.item.y)];
        g.world.setZone(zone, true);
        g.mono('dark_gen', 3);
        g.noise(o.pos.x, o.pos.z, 30);
        if (g.flags.gens >= 2) wakePac(g, false);
        if (g.flags.gens >= 3) { openExit(g, 'maze'); g.setObj('dark_leave'); }
        else g.setObj('dark_generators', { n: g.flags.gens });
        g.updateInventoryUI(); g.completeStep();
        return true;
      }
      return shrineUse(g, o, 'clyde');
    },
    onClyde(g) { if (!g.flags.orangeR) { g.flags.orangeR = true; g.mono('dark_orangeSeen', 4); g.radio('dark_orange', { delay: 4.2 }); } },
    update(g) {
      if (!g.flags.grinnerMono && g.entities.some(e => e.kind === 'grinner' && e.state !== 'gone' && e.distToPlayer() < 10 && e.losToPlayer())) { g.flags.grinnerMono = true; g.mono('dark_grinner', 4); }
    },
  };

  // ================================================================ THE MAZE (level 255)
  C.maze = {
    start(g) { g.setObj('maze_pellets', { n: 0 }); g.flags.mp = 0; this.ready(g); },
    ready(g) {
      // "READY!" — everyone freezes for three seconds
      g.readyT = 3.2;
      if (g.world.readyText) g.world.readyText.visible = true;
      for (const e of g.entities) e.frozenReady = true;
    },
    afterCard(g) {
      g.mono('maze_start', 4);
      g.radio('maze_start', { delay: 5 });
      if (g.audio.ctx) { const o = g.audio.out('sfx', null, { rev: 0.6, gain: 0.5 }); [523, 659, 784, 1047, 988, 784, 880, 1047].forEach((f, k) => g.audio.tone(o.input, 'square', f, f, g.audio.t + k * 0.16, 0.14, 0.12)); }
    },
    restore(g) {
      g.flags.mp = g.flags.mp || 0;
      if (g.flags.houseOpen) { this.openHouse(g, true); g.setObj('maze_house'); }
      else g.setObj('maze_pellets', { n: g.flags.mp });
    },
    use(g, o) {
      if (o.type === 'powerPellet') {
        g.takeItem(o); g.flags.mp = (g.flags.mp || 0) + 1;
        g.powerT = 9; g.audio.pickup('pellet'); g.fx.flash = 0.3;
        if (g.flags.mp >= 4) { this.openHouse(g); g.setObj('maze_house'); }
        else g.setObj('maze_pellets', { n: g.flags.mp });
        g.completeStep();
        return true;
      }
      if (o.type === 'portal') { g.exitLevel('killscreen'); return true; }
      if (o.type === 'note' && o.item.data === 'maze_rules') { g.readNote('maze_rules', () => g.mono('maze_rules', 4)); return true; }
      return false;
    },
    prompt(g, o) { if (o.type === 'portal') return g.flags.houseOpen ? ST.line('maze_portal') : null; return undefined; },
    openHouse(g, instant) {
      g.flags.houseOpen = true;
      for (const id of ['houseDoorA', 'houseDoorB']) {
        const d = g.level.doors.find(x => x.id === id);
        if (d) { d.locked = false; g.world.openDoor(d.id); if (instant) { const ob = g.world.doorObjs.get(id); ob.amt = 1; g.world.applyDoor(ob); } }
      }
      g.nav.dirty = true;
      if (!instant) { g.audio.door('house'); g.mono('maze_house', 4); }
    },
    pellet(g) {
      if (g.flags.pelletsEaten === 70 && !g.flags.fruit) {
        g.flags.fruit = true;
        const L = g.level, sp = L.spots.fruit[0];
        const o = { item: { x: sp.x, y: sp.y, d: -1, data: 'maze_fruit' }, id: 'fruit', type: 'fruit', pos: new THREE.Vector3(L.cx(sp.x) + 1.5, 1, L.cz(sp.y)), taken: false };
        const grp = new THREE.Group();
        const cm = new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 0.2, 0.2) });
        for (const [x, z] of [[-0.12, 0], [0.12, 0.05]]) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), cm); s.position.set(x, 0, z); grp.add(s); }
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.35, 6), new THREE.MeshBasicMaterial({ color: 0x5a3a10 }));
        stem.position.set(0, 0.2, 0); stem.rotation.z = 0.3; grp.add(stem);
        grp.position.copy(o.pos); g.scene.add(grp); o.mesh = grp; o.spin = true; o.baseY = 1; o.bob = true; o.marker = '#ffe23b';
        g.items.push(o);
        g.interactables.push({ kind: 'item', ref: o, pos: o.pos, reach: 2.3, prompt: () => (o.taken ? null : ST.line('maze_fruitTake')), act: () => { g.takeItem(o); g.audio.pickup('key'); g.readNote('maze_fruit'); } });
        g.ui.notify(t('n.fruit'), 'key');
      }
      if (g.flags.pelletsEaten === g.world.pellets.length && !g.flags.perfect) { g.flags.perfect = true; g.ui.notify(t('n.perfect'), 'key'); }
    },
    update(g, dt) {
      if (g.readyT > 0) {
        g.readyT -= dt;
        if (g.readyT <= 0) { if (g.world.readyText) g.world.readyText.visible = false; for (const e of g.entities) e.frozenReady = false; }
      }
    },
  };

  // ================================================================ KILL SCREEN (level 256)
  C.killscreen = {
    start(g) { g.setObj('ks_core'); const d = exitDoorOf(g); if (d) d.locked = false; },
    afterCard(g) { g.mono('ks_start', 4); g.radio('ks_start', { delay: 5, force: true }); },
    restore(g) { g.setObj(g.flags.coreSeen ? 'ks_choice' : 'ks_core'); },
    prompt(g, o) { if (o.type === 'plug') return g.save.freed.length >= 4 ? ST.line('ks_plug') : ST.line('ks_plugTry'); return undefined; },
    use(g, o) {
      if (o.type === 'powerPellet') { g.takeItem(o); g.powerT = 9; g.audio.pickup('pellet'); g.fx.flash = 0.3; return true; }
      if (o.type === 'plug') {
        if (g.save.freed.length >= 4) {
          g.player.frozen = true;
          g.mono('ks_plugReady', 4);
          for (const e of g.entities) if (e.kind === 'ghost') e.placeCell(o.item.x, o.item.y + 1);
          const lil = (g.save.drawings || []).length >= 8 && g.save.world.waltMemory;
          g.later(3500, () => { g.fx.flash = 1; g.audio.stinger('spot'); g.player.frozen = false; g.whenPlaying(() => g.exitLevel(lil ? 'ending-lil' : 'ending-plug')); });
        } else {
          const missing = ['billy', 'penny', 'ivy', 'clyde'].filter(c => !g.save.freed.includes(c)).map(c => ST.char(c).name).join(', ');
          g.ui.subtitle(ST.mono('ks_plugTry') + ' ' + ST.line('ks_missing', { names: missing }), 6);
          g.setObj('ks_choice');
        }
        return true;
      }
      return false;
    },
    update(g) {
      const d = exitDoorOf(g);
      if (d && !g.flags.choiceDone) {
        const obj = g.world.doorObjs.get(d.id);
        const dist = Math.hypot(g.player.pos.x - obj.g.cx, g.player.pos.z - obj.g.cz);
        if (dist < 7 && !g.flags.pleaHeard) { g.flags.pleaHeard = true; g.mono('ks_exit', 3); g.radio('ks_plea', { delay: 3, force: true }); }
        // At the door: choose
        if (dist < 2.6 && g.state === 'play' && !g.talking() && !g.flags.choiceCool) {
          g.flags.choiceDone = true;
          g.choice([
            { label: ST.line('ks_exitGo'), fn: () => { openExit(g, 'ending-exit', d.id); g.exitLevel('ending-exit'); } },
            { label: ST.line('ks_exitHold'), fn: () => g.exitLevel('ending-deal') },
          ], () => { g.flags.choiceDone = false; g.flags.choiceCool = g.time + 4; g.player.pos.x += obj.g.nIn.x * 1.5; g.player.pos.z += obj.g.nIn.z * 1.5; });
        }
      }
      if (g.flags.choiceCool && g.time > g.flags.choiceCool) g.flags.choiceCool = 0;
      if (!g.flags.coreSeen) {
        const core = g.level.meta.core, c = g.level.cellOf(g.player.pos.x, g.player.pos.z);
        if (core && c.x >= core.x0 - 1 && c.x <= core.x1 + 1 && c.y >= core.y0 - 1 && c.y <= core.y1 + 1) { g.flags.coreSeen = true; g.mono('ks_core', 5); g.setObj('ks_choice'); g.checkpoint(true); }
      }
    },
  };

  PB.Chapters = C;
  PB.ChapterUtil = { openExit, exitDoorOf, itemOf, shrineUse, shrinePrompt, wakePac, mementoRadio };
})(typeof window !== 'undefined' ? window : globalThis);
