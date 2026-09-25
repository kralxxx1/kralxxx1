/* Chapter scripts for the new chapters: Pipe Dreams, Harlow Middle School, Harlow Mall,
   Starlite Motor Inn, St. Agnes Hospital, Maple Street and the Workshop. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const ST = PB.Story;
  const t = PB.t;
  const C = PB.Chapters;
  const { openExit, wakePac } = PB.ChapterUtil;
  const has = (g, k) => (g.inv.keys || []).includes(k);
  const count = (g, prefix) => (g.inv.keys || []).filter(k => k.startsWith(prefix)).length;
  const inRoom = (g, tag) => {
    const rm = g.level.meta.rooms && g.level.meta.rooms[tag];
    if (!rm) return false;
    const c = g.level.cellOf(g.player.pos.x, g.player.pos.z);
    return c.x >= rm.x0 && c.x <= rm.x1 && c.y >= rm.y0 && c.y <= rm.y1;
  };
  const unlock = (g, id) => { const d = g.level.doors.find(x => x.id === id); if (!d) return null; d.locked = false; g.world.openDoor(d.id, g.player.pos.x, g.player.pos.z); const obj = g.world.doorObjs.get(d.id); g.audio.door(d.kind, obj ? new THREE.Vector3(obj.g.cx, 1.2, obj.g.cz) : null, true); g.nav.dirty = true; return d; };

  // ================================================================ PIPE DREAMS (storm tunnels, 1985)
  C.pipes = {
    start(g) { g.flags.valves = 0; g.setObj('pipes_valves', { n: 0 }); },
    afterCard(g) { g.mono('pipes_start', 4); g.player.toggleFlash(true); g.radio('pipes_start', { delay: 5 }); },
    restore(g) {
      for (const it of g.items) if (it.type === 'valve' && g.flags['v_' + it.id]) it.done = true;
      if ((g.flags.valves || 0) >= 3) { openExit(g, 'pool'); g.setObj('pipes_leave'); }
      else g.setObj('pipes_valves', { n: g.flags.valves || 0 });
    },
    prompt(g, o) { if (o.type === 'valve') return o.done ? null : ST.line('pipes_valve'); return undefined; },
    holdStart(g, o) { if (o && o.type === 'valve') { g.audio.mech('valve', o.pos); g.noise(o.pos.x, o.pos.z, 18); } },
    use(g, o) {
      if (o.type !== 'valve') return false;
      if (o.done) return true;
      o.done = true; g.flags['v_' + o.id] = true;
      g.flags.valves = (g.flags.valves || 0) + 1;
      if (o.wheel) o.wheel.rotation.z += 3;
      g.mono('pipes_valve', 3);
      if (g.flags.valves === 2) wakePac(g, false);
      if (g.flags.valves >= 3) { openExit(g, 'pool'); g.setObj('pipes_leave'); g.radio('pipes_done', { delay: 1.5 }); }
      else g.setObj('pipes_valves', { n: g.flags.valves });
      g.completeStep();
      return true;
    },
    update(g) {
      if (!g.flags.fortSeen && inRoom(g, 'fort')) { g.flags.fortSeen = true; g.mono('pipes_fort', 5); g.radio('pipes_fort', { delay: 5.5 }); }
      if (!g.flags.crawlerSeen && g.entities.some(e => e.kind === 'crawler' && e.distToPlayer() < 12 && e.losToPlayer())) { g.flags.crawlerSeen = true; g.mono('pipes_crawler', 4); g.radio('pipes_crawler', { delay: 4 }); }
    },
  };

  // ================================================================ HARLOW MIDDLE SCHOOL (April 16, 1987)
  C.school = {
    start(g) { g.flags.digits = 0; g.setObj('school_code', { n: 0 }); },
    afterCard(g) { g.mono('school_start', 4); g.radio('school_start', { delay: 5 }); },
    restore(g) {
      for (const it of g.items) if (g.flags['c_' + it.id]) it.clueDone = true;
      if (g.flags.closetOpen) unlock(g, 'janitorDoor');
      if (g.flags.exitOpen) { openExit(g, 'dark'); g.setObj('school_leave'); }
      else if (has(g, 'janitorKeys')) g.setObj('school_leave');
      else if (g.flags.closetOpen) g.setObj('school_keys');
      else if ((g.flags.digits || 0) >= 3) g.setObj('school_closet');
      else g.setObj('school_code', { n: g.flags.digits || 0 });
    },
    clue(g, o) {
      if (o.clueDone) return;
      o.clueDone = true; g.flags['c_' + o.id] = true;
      g.flags.digits = (g.flags.digits || 0) + 1;
      if (g.flags.digits >= 3) { g.setObj('school_closet'); g.mono('school_code', 4); }
      else g.setObj('school_code', { n: g.flags.digits });
      g.completeStep();
    },
    prompt(g, o) {
      if (o.type === 'keypad') return g.flags.closetOpen ? null : ST.line('school_keypad');
      return undefined;
    },
    use(g, o) {
      if (o.type === 'keypad') {
        if (g.flags.closetOpen) return true;
        g.state = 'keypad'; g.input.exitLock(); g.ignoreUnlock = true;
        g.ui.showKeypad(code => {
          if (code !== g.levelDef.code) return false;
          g.flags.closetOpen = true;
          unlock(g, 'janitorDoor');
          if (o.led) o.led.material.color.setRGB(0.1, 3, 0.2);
          g.setObj('school_keys'); g.completeStep();
          return true;
        }, () => { g.state = 'play'; g.ignoreUnlock = false; g.suppressPauseUntil = performance.now() + 250; if (!g.ui.touch && !g.input.lockFailed) g.input.requestLock(); }, 3);
        return true;
      }
      return false;
    },
    picked(g, k) {
      if (k === 'janitorKeys') { g.setObj('school_leave'); g.mono('school_keys', 4); wakePac(g, false); g.radio('school_keys', { delay: 4.5 }); g.completeStep(); }
    },
    unlockPrompt(g, door) { return door.id === 'exitDoor' && has(g, 'janitorKeys') ? ST.line('school_unlockExit') : null; },
    unlockDoor(g, door) {
      if (door.id === 'exitDoor' && has(g, 'janitorKeys')) { g.flags.exitOpen = true; openExit(g, 'dark'); g.completeStep(); return true; }
      return false;
    },
    onSpotted(g, ent) { if (ent.kind === 'monitor' && !g.flags.monR) { g.flags.monR = true; g.mono('school_monitor', 3.5); g.radio('school_monitor', { delay: 2 }); } },
    update(g) {
      if (!g.flags.gymSeen && inRoom(g, 'gym')) { g.flags.gymSeen = true; g.mono('school_gym', 5); }
    },
  };

  // ================================================================ HARLOW MALL (December 1986)
  C.mall = {
    start(g) { g.setObj('mall_frames', { n: 0 }); },
    afterCard(g) { g.mono('mall_start', 4); g.radio('mall_start', { delay: 5 }); },
    restore(g) {
      if (g.flags.boothDone) { openExit(g, 'motel'); g.setObj('mall_leave'); }
      else if (count(g, 'frame') >= 4) g.setObj('mall_booth');
      else g.setObj('mall_frames', { n: count(g, 'frame') });
    },
    picked(g, k) {
      if (!k.startsWith('frame')) return;
      const n = count(g, 'frame');
      g.mono('mall_frame' + Math.min(4, n), 4);
      if (n === 2) wakePac(g, false);
      if (n >= 4) { g.setObj('mall_booth'); g.radio('mall_frames', { delay: 4 }); }
      else g.setObj('mall_frames', { n });
      g.completeStep();
    },
    prompt(g, o) { if (o.type === 'booth') return g.flags.boothDone ? null : count(g, 'frame') >= 4 ? ST.line('mall_boothUse') : ST.line('mall_boothLook'); return undefined; },
    use(g, o) {
      if (o.type !== 'booth') return false;
      if (g.flags.boothDone) return true;
      if (count(g, 'frame') < 4) { g.ui.hint(ST.line('mall_boothNeed', { n: 4 - count(g, 'frame') })); return true; }
      g.flags.boothDone = true;
      g.audio.mech('coin', o.pos); g.fx.flash = 0.6; g.player.addTrauma(0.15);
      g.later(900, () => { g.fx.flash = 0.6; g.audio.beep(); });
      g.later(1800, () => { g.fx.flash = 0.6; g.audio.beep(); });
      g.later(2700, () => { g.fx.flash = 0.7; g.audio.beep(true); g.readNote('mall_strip', () => { g.mono('mall_strip', 5); g.radio('mall_booth', { delay: 5 }); }); openExit(g, 'motel'); g.setObj('mall_leave'); g.completeStep(); });
      return true;
    },
    update(g) {
      if (!g.flags.manSeen && g.entities.some(e => e.kind === 'mannequin' && e.state !== 'idle' && e.distToPlayer() < 14 && e.observed())) { g.flags.manSeen = true; g.mono('mall_mannequin', 4); g.radio('mall_mannequin', { delay: 4 }); }
    },
  };

  // ================================================================ STARLITE MOTOR INN (Eddie)
  C.motel = {
    start(g) { g.setObj('motel_find12'); },
    afterCard(g) { g.mono('motel_start', 4); g.radio('motel_start', { delay: 5 }); },
    restore(g) {
      if (g.flags.room12Open) unlock(g, 'room12Door');
      if (g.flags.notebookRead) { openExit(g, 'hospital'); g.setObj('motel_leave'); }
      else if (g.flags.room12Open) g.setObj('motel_room12');
      else if (has(g, 'room12Key')) g.setObj('motel_room12');
      else if (g.flags.registerRead) g.setObj('motel_key');
      else g.setObj('motel_find12');
    },
    use(g, o) {
      if (o.type === 'note' && o.item.data === 'motel_register') { g.readNote('motel_register', () => { g.flags.registerRead = true; if (!has(g, 'room12Key')) g.setObj('motel_key'); g.mono('motel_register', 4); }); return true; }
      if (o.type === 'note' && o.item.data === 'motel_notebook') {
        g.readNote('motel_notebook', () => {
          if (g.flags.notebookRead) return;
          g.flags.notebookRead = true; wakePac(g, true);
          g.mono('motel_notebook', 4);
          g.radio('motel_explain', { delay: 4.5, force: true });
          const ask = () => {
            if (g.state !== 'play' || g.talking()) { g.later(800, ask); return; }
            g.choice([
              { label: ST.line('motel_trust'), fn: () => { g.save.world.trustEddie = true; g.radio('motel_trusted', { delay: 0.5, force: true }); } },
              { label: ST.line('motel_doubt'), fn: () => { g.save.world.trustEddie = false; g.radio('motel_doubted', { delay: 0.5, force: true }); } },
            ], () => { g.save.world.trustEddie = false; });
          };
          g.later(9000, ask);
          openExit(g, 'hospital'); g.setObj('motel_leave'); g.completeStep();
        });
        return true;
      }
      return false;
    },
    picked(g, k) { if (k === 'room12Key') { g.setObj('motel_room12'); g.mono('motel_key', 4); g.completeStep(); } },
    unlockPrompt(g, door) { return door.id === 'room12Door' && has(g, 'room12Key') ? ST.line('motel_unlock12') : null; },
    unlockDoor(g, door) {
      if (door.id === 'room12Door' && has(g, 'room12Key')) { g.flags.room12Open = true; unlock(g, 'room12Door'); g.mono('motel_room12', 4); return true; }
      return false;
    },
    onNeighbor(g) { if (!g.flags.neighR) { g.flags.neighR = true; g.mono('motel_neighbor', 4); g.radio('motel_neighbor', { delay: 4 }); } },
  };

  // ================================================================ ST. AGNES HOSPITAL (Walt, October 1983)
  C.hospital = {
    start(g) { g.setObj('hospital_pages', { n: 0 }); },
    afterCard(g) { g.mono('hospital_start', 4); g.radio('hospital_start', { delay: 5 }); },
    restore(g) {
      if (g.flags.room207Open) unlock(g, 'room207Door');
      if (g.flags.lilyRoom) { openExit(g, 'maple'); g.setObj('hospital_leave'); }
      else if (count(g, 'page') >= 5) g.setObj('hospital_207');
      else g.setObj('hospital_pages', { n: count(g, 'page') });
    },
    picked(g, k) {
      if (k.startsWith('page')) {
        const n = count(g, 'page');
        g.readNote('hospital_diary' + k.slice(4));
        if (n === 3) wakePac(g, false);
        if (n >= 5) { g.setObj('hospital_207'); g.later(600, () => g.radio('hospital_pages', { delay: 2 })); }
        else g.setObj('hospital_pages', { n });
        g.completeStep();
      }
      if (k === 'room207Key') { g.mono('hospital_key', 4); }
    },
    unlockPrompt(g, door) { return door.id === 'room207Door' && has(g, 'room207Key') ? ST.line('hospital_unlock207') : null; },
    unlockDoor(g, door) {
      if (door.id === 'room207Door' && has(g, 'room207Key')) {
        if (count(g, 'page') < 5) { g.ui.hint(ST.line('hospital_notYet')); return true; }
        g.flags.room207Open = true; unlock(g, 'room207Door');
        return true;
      }
      return false;
    },
    update(g) {
      if (g.flags.room207Open && !g.flags.lilyRoom && inRoom(g, 'room207')) {
        g.flags.lilyRoom = true;
        // Walt's memory is complete: all five pages and Lily's room
        g.save.world.waltMemory = true;
        g.mono('hospital_207', 6);
        g.radio('hospital_207', { delay: 6.5, force: true });
        openExit(g, 'maple'); g.setObj('hospital_leave'); g.completeStep();
      }
    },
  };

  // ================================================================ MAPLE STREET (April 1987)
  C.maple = {
    start(g) { g.setObj('maple_clyde'); },
    afterCard(g) { g.mono('maple_start', 5); g.radio('maple_start', { delay: 6 }); },
    restore(g) {
      if (g.flags.echoDone) { openExit(g, 'workshop'); g.setObj('maple_leave'); }
      else if (g.flags.homeDone) g.setObj('maple_corner');
      else if (g.flags.clydeDone) g.setObj('maple_home');
      else g.setObj('maple_clyde');
    },
    use(g, o) {
      if (o.type === 'phone' && o.item.data === 'maple_machine') {
        o.answered = true;
        g.answerPhone(o, () => { if (!g.flags.homeDone) { g.flags.homeDone = true; g.mono('maple_machine', 5); g.setObj('maple_corner'); g.completeStep(); } });
        return true;
      }
      if (o.type === 'note' && o.item.data === 'maple_clyderoom') {
        g.readNote('maple_clyderoom', () => { if (!g.flags.clydeDone) { g.flags.clydeDone = true; g.mono('maple_clyderoom', 5); g.setObj(g.flags.homeDone ? 'maple_corner' : 'maple_home'); g.completeStep(); } });
        return true;
      }
      return false;
    },
    prompt(g, o) { if (o.type === 'phone') return o.answered ? null : ST.line('maple_machine'); return undefined; },
    update(g) {
      const L = g.level, c = L.cellOf(g.player.pos.x, g.player.pos.z);
      if (!g.flags.porchSeen) { const s = L.spots.clydeHousePorch && L.spots.clydeHousePorch[0]; if (s && Math.abs(c.x - s.x) <= 1 && Math.abs(c.y - s.y) <= 1) { g.flags.porchSeen = true; g.mono('maple_porch', 4); } }
      // The fight, replayed under the streetlight on the corner
      const k = L.spots.corner && L.spots.corner[0];
      if (!g.flags.echoDone && g.flags.homeDone && g.flags.clydeDone && k && Math.abs(c.x - k.x) <= 1 && Math.abs(c.y - k.y) <= 1) {
        g.flags.echoDone = true;
        g.player.frozen = true; g.fx.flash = 0.3;
        g.radio('maple_echo', { force: true });
        const freed = g.save.freed.includes('clyde');
        const wait = () => { if (g.talking()) { g.later(500, wait); return; } g.player.frozen = false; g.radio(freed ? 'maple_reconcile' : 'maple_alone', { delay: 0.8, force: true }); openExit(g, 'workshop'); g.setObj('maple_leave'); g.completeStep(); };
        g.later(1500, wait);
      }
    },
    onNeighbor(g) { if (!g.flags.neighR) { g.flags.neighR = true; g.mono('maple_neighbor', 4); g.radio('maple_neighbor', { delay: 4 }); } },
  };

  // ================================================================ THE WORKSHOP (Walt, April 1987)
  C.workshop = {
    start(g) { g.setObj('workshop_key'); },
    afterCard(g) { g.mono('workshop_start', 4); g.radio('workshop_start', { delay: 5 }); },
    restore(g) {
      const dials = g.items.filter(i => i.type === 'dial');
      dials.forEach((o, k) => { o.value = g.flags['d_' + k] || 0; if (o.knob) o.knob.rotation.y = -o.value * Math.PI / 5; });
      if (g.flags.kernelOpen) unlock(g, 'kernelDoor');
      if (g.flags.calibrated) { openExit(g, 'maze'); g.setObj('workshop_leave'); }
      else if (g.flags.kernelOpen) g.setObj('workshop_dials', { n: this.correct(g) });
      else if (has(g, 'waltKey')) g.setObj('workshop_kernel');
      else g.setObj('workshop_key');
    },
    correct(g) { const want = g.levelDef.dials; return g.items.filter(i => i.type === 'dial').filter((o, k) => o.value === want[k]).length; },
    picked(g, k) { if (k === 'waltKey') { g.setObj('workshop_kernel'); g.mono('workshop_key', 4); g.flags.chompyAwake = true; g.completeStep(); } },
    unlockPrompt(g, door) { return door.id === 'kernelDoor' && has(g, 'waltKey') ? ST.line('workshop_unlock') : null; },
    unlockDoor(g, door) {
      if (door.id === 'kernelDoor' && has(g, 'waltKey')) { g.flags.kernelOpen = true; unlock(g, 'kernelDoor'); g.setObj('workshop_dials', { n: this.correct(g) }); g.mono('workshop_kernel', 4); g.radio('workshop_kernel', { delay: 4 }); g.completeStep(); return true; }
      return false;
    },
    prompt(g, o) { if (o.type === 'dial') return g.flags.calibrated ? null : ST.line('workshop_dial', { n: o.value }); return undefined; },
    use(g, o) {
      if (o.type !== 'dial') return false;
      if (g.flags.calibrated) return true;
      if (!g.flags.kernelOpen) return true;
      const dials = g.items.filter(i => i.type === 'dial');
      const k = dials.indexOf(o);
      o.value = (o.value + 1) % 10; g.flags['d_' + k] = o.value;
      if (o.knob) o.knob.rotation.y = -o.value * Math.PI / 5;
      g.audio.play('switchThunk', 2, 'sfx', o.pos, { rev: 0.3, gain: 0.35, rate: 1.8 });
      const n = this.correct(g);
      g.setObj('workshop_dials', { n });
      if (n >= 3) {
        g.flags.calibrated = true;
        g.audio.mech('breaker', o.pos); g.fx.flash = 0.5; g.player.addTrauma(0.3);
        g.world.U.uLmIntensity.value = 0.2; g.later(700, () => { g.world.U.uLmIntensity.value = 1; });
        g.mono('workshop_calibrated', 5);
        g.radio('workshop_calibrated', { delay: 5, force: true });
        openExit(g, 'maze'); g.setObj('workshop_leave'); g.completeStep();
      }
      return true;
    },
    update(g) { if (!g.flags.chompySeen && g.entities.some(e => e.kind === 'chompy' && e.state !== 'display' && e.distToPlayer() < 14 && e.losToPlayer())) { g.flags.chompySeen = true; g.mono('workshop_chompy', 4); g.radio('workshop_chompy', { delay: 4 }); } },
  };
})(typeof window !== 'undefined' ? window : globalThis);
