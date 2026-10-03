/* The creatures of the Nordlys Express (Chapter 7).
   - The Conductor: very tall, in the railway's long navy greatcoat and peaked cap, a hand lamp in one hand
     and the ticket punch in the other. He walks the train checking tickets. Show him a valid ticket and he
     punches it and walks on. Have none and you are getting off at the next stop.
   - Sleepers: passengers who never woke up, grey and thin in old pyjamas, a black sleep mask over the
     eyes. They lie on their sides in the lower bunks, facing the corridor. They cannot see; a footstep
     outside the compartment wakes them, and they come out after the sound.
   - Underhands: arms, only arms, long and grey and black with oil to the elbow, that come up through the
     gap in the floor plates between the cars. The fingertips are always there, curled over the plate
     edge. Stand on a gangway too long and they take hold.
   The train is one long corridor with compartments off it, so these three walk it with their own
   navigator (PB.TrainNav) instead of the grid: along the corridor lane, in and out through the doorways.
   Deaths (kills.js): offTrain (the Conductor), bunk (a Sleeper), gap (the Underhands). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;

  // ============================================================ the train navigator
  // Car x-ranges in metres from the map's car list; the corridor lane's z at each x; compartments.
  const CELL = 3, Z_MID = 4.5, Z_DOOR = 4.95;
  const TN = PB.TrainNav = {
    cars() { return (PB.Maps && PB.Maps.trainCars) || []; },
    car(x) { for (const c of TN.cars()) if (x >= c[0] * CELL && x < (c[1] + 1) * CELL) return c; return null; },
    // where you walk along the train at x: the side corridor in the sleeping cars, the aisle in the
    // dining car, past the engine on its corridor side; the middle in the vestibules and gangways
    laneZ(x) {
      const c = TN.car(x); if (!c) return Z_MID;
      const e = Math.min(x - c[0] * CELL, (c[1] + 1) * CELL - x);
      switch (c[2]) {
        case '1': case '2': case '3': return Z_MID + 0.97 * U.smoothstep(0.8, 2.55, e);
        case 'B': return 4.62;
        case 'E': return Z_MID + 0.85 * U.smoothstep(0.6, 2.4, e);
        default: return Z_MID;
      }
    },
    comp(L, x, z) {
      if (z > Z_DOOR || !L.meta.compartments) return null;
      for (const c of L.meta.compartments) if (c[3] && Math.abs(x - c[2]) < 0.98) return c;
      return null;
    },
    minX: 3.5, maxX: 154.2,
    // One step toward (tx, tz) at speed. Returns the distance still to go.
    go(cr, tx, tz, speed, dt) {
      const L = cr.L, p = cr.pos, step = speed * dt;
      tx = U.clamp(tx, TN.minX, TN.maxX);
      const myC = TN.comp(L, p.x, p.z), tC = TN.comp(L, tx, tz);
      let wx, wz, lane = false;
      if (myC && myC !== tC) {
        // out through the doorway: line up with it, then step out into the corridor
        if (Math.abs(p.x - myC[2]) > 0.06 && p.z < 4.6) { wx = myC[2]; wz = Math.min(p.z, 4.4); }
        else { wx = myC[2]; wz = TN.laneZ(myC[2]) + 0.02; }
      } else if (tC && myC !== tC) {
        if (Math.abs(p.x - tC[2]) > 0.06) { lane = true; wx = tC[2]; } else { wx = tC[2]; wz = 4.4; }
      } else if (myC) { wx = tx; wz = tz; }
      else if (Math.abs(p.x - tx) > 0.7) { lane = true; wx = tx; }
      else { wx = tx; wz = tz; }
      const ox = p.x, oz = p.z;
      if (lane) {
        const dx = wx - p.x, s = Math.sign(dx) * Math.min(Math.abs(dx), step);
        const nz = TN.laneZ(p.x + s), dz = nz - p.z;
        p.x += s; p.z += Math.sign(dz) * Math.min(Math.abs(dz), step * 1.3);
      } else {
        const dx = wx - p.x, dz = wz - p.z, d = Math.hypot(dx, dz);
        if (d > 1e-4) { const k = Math.min(1, step / d); p.x += dx * k; p.z += dz * k; }
      }
      const mx = p.x - ox, mz = p.z - oz;
      if (Math.abs(mx) + Math.abs(mz) > 1e-5) cr.heading = U.angleDamp(cr.heading, Math.atan2(mx, mz), 8, dt);
      cr.cell = L.cellOf(p.x, p.z);
      // the doors between the cars: they open them as they come
      for (const dr of L.doors) {
        if (dr.open || dr.locked || dr.d % 2 === 0) continue;
        const dx = (dr.d === 1 ? dr.x + 1 : dr.x) * CELL;
        if (Math.abs(dx - p.x) < 1.1 && Math.sign(dx - p.x) === Math.sign(mx || tx - p.x) && Math.abs(p.z - Z_MID) < 1.4) cr.g.openDoorBy(dr, cr);
      }
      return Math.hypot(tx - p.x, tz - p.z);
    },
  };
  // Seeing along a train: compartment walls hide you unless you are looking in through the doorway
  TN.los = (cr, x, z) => {
    const L = cr.L, a = TN.comp(L, cr.pos.x, cr.pos.z), b = TN.comp(L, x, z);
    if (a !== b) {
      if (a && b) return false;
      const c = a || b, o = a ? { x } : cr.pos;
      if (Math.abs(o.x - c[2]) > 1.5) return false;
    }
    return L.los(cr.pos.x, cr.pos.z, x, z);
  };
  const onTrain = cr => !!cr.L.meta.compartments;
  function trainEyes(cr) {
    if (!onTrain(cr)) return;
    cr.losToPlayer = () => { const p = cr.g.player.pos; return TN.los(cr, p.x, p.z); };
  }

  // ============================================================ THE CONDUCTOR
  function conductorModel() {
    const navy = K.cloth('conductor:coat', '#1a2236', { stains: 40, rough: 0.82, rep: 2 });
    const r = K.humanoid({
      key: 'conductor', h: 2.06, build: 0.86, coat: 0.78, long: 1.08, bodyMat: navy,
      skin: { base: '#b8b0a6', mottle: ['170,162,156', '200,192,184', '140,140,150'], veins: '110,110,140', veinCount: 14 },
      head: { eyes: 'none', mouth: 0.05, swell: 0 }, skinVC: [0.92, 0.9, 0.9],
      // brass buttons down the coat front, two rows; a lighter band of braid on the cuffs
      clothVC: p => {
        const front = p[2] > 0.08, row = Math.abs(Math.abs(p[0]) - 0.07) < 0.012 && front && p[1] > -0.4 && p[1] < 0.5 && Math.abs(((p[1] + 0.4) % 0.13) - 0.065) < 0.014;
        return row ? [5.5, 4.2, 1.6] : [1, 1, 1];
      },
    });
    for (const m of r.mats) m.roughness = Math.max(0.55, m.roughness);
    // the peaked cap: crown, band, the peak pulled low over where the eyes should be, a brass badge
    const capM = new THREE.MeshStandardMaterial({ color: 0x141a2a, roughness: 0.7 });
    const peakM = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.25, metalness: 0.2 });
    const brass = new THREE.MeshStandardMaterial({ color: 0xb08a3a, roughness: 0.32, metalness: 0.95 });
    const cap = new THREE.Group(); cap.position.set(0, 0.19 * r.s, 0.0); r.head.add(cap);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.1, 0.075, 24), capM); crown.position.y = 0.045; cap.add(crown);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.126, 0.015, 24), capM); top.position.y = 0.088; cap.add(top);
    const peak = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.008, 20, 1, false, -0.9, 1.8), peakM); peak.position.set(0, 0.0, 0.07); peak.rotation.x = 0.28; peak.scale.set(1, 1, 0.9); cap.add(peak);
    const badge = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.006, 12), brass); badge.rotation.x = H; badge.position.set(0, 0.045, 0.104); cap.add(badge);
    // the hand lamp in the left hand: a squat brass body, a lens, and a real light that comes down the
    // corridor ahead of him
    const la = r.arms.find(a => a.sx < 0).el;
    const lamp = new THREE.Group(); lamp.position.set(0, -0.4 * r.s, 0.04); la.add(lamp);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.075, 0.16, 16), brass); body.position.y = -0.12; lamp.add(body);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.008, 6, 14, PI), brass); handle.position.y = -0.02; lamp.add(handle);
    const lensM = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 2.0, 1.2) });
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), lensM); lens.position.set(0, -0.12, 0.076); lamp.add(lens);
    const light = new THREE.PointLight(0xffc880, 3.2, 7.5, 1.6); light.position.set(0, -0.12, 0.2); light.castShadow = false; lamp.add(light);
    // the punch in the right hand
    const ra = r.arms.find(a => a.sx > 0).el;
    const chrome = new THREE.MeshStandardMaterial({ color: 0xc8c8c4, roughness: 0.2, metalness: 1 });
    const punch = new THREE.Group(); punch.position.set(0, -0.38 * r.s, 0.05); ra.add(punch);
    for (const s of [-1, 1]) { const j = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.13, 0.03), chrome); j.position.set(0, -0.06, s * 0.012); j.rotation.x = s * 0.12; punch.add(j); }
    return {
      group: r.group, rig: r, mats: r.mats.concat([capM, peakM, brass]), light, punch,
      animate(cr, dt) {
        const an = cr.anim, st = cr.state;
        r.stand();
        if (st === 'seated') {
          // after the claim: sitting on the crates, the cap in his lap, head down
          r.sit(1, 0.5); r.neck.rotation.x = 0.9; cap.position.set(0.0, -0.55, 0.3); cap.rotation.x = 0.4;
          light.intensity = U.damp(light.intensity, 0.4, 1, dt);
          return;
        }
        cap.position.set(0, 0.19 * r.s, 0); cap.rotation.x = 0;
        r.walk(an.walk, U.clamp(an.speed / 1.6, 0, 1), st === 'chase' ? 0.3 : 0);
        // the lamp held out in front, swinging with the stride; in a chase it is raised
        const lA = r.arms.find(a => a.sx < 0);
        lA.sh.rotation.x = (st === 'chase' ? -1.0 : -0.55) + Math.sin(an.walk) * 0.06; lA.el.rotation.x = -0.5;
        const rA = r.arms.find(a => a.sx > 0);
        if (st === 'check') {
          // the punch held up, then the click
          const k = U.clamp((cr.stateT - (cr.arriveT || 0)) / 0.6, 0, 1);
          rA.sh.rotation.x = U.lerp(rA.sh.rotation.x, -1.15, k); rA.el.rotation.x = -0.7;
          const click = cr.punchAt && cr.g.time - cr.punchAt < 0.18;
          punch.children.forEach((j, i) => { j.rotation.x = (i ? 1 : -1) * (click ? 0.02 : 0.12); });
          r.neck.rotation.x = 0.35;
        } else if (st === 'chase') { rA.sh.rotation.x = -1.35 - (an.attack || 0) * 0.3; rA.el.rotation.x = -0.15; r.neck.rotation.x = 0.1; }
        else r.neck.rotation.x = 0.2;
        // looking into the compartments as he passes
        if (st === 'patrol' || st === 'search') r.neck.rotation.y = U.damp(r.neck.rotation.y, cr.lookY || 0, 2, dt);
        light.intensity = 3.2 * (0.92 + Math.sin(an.t * 7.3) * 0.04 + Math.sin(an.t * 2.1) * 0.04);
      },
    };
  }
  // The whole of what he does: patrol near you, check, chase. He sees down his lamp's light.
  function conductorUpdate(cr, g, dt) {
    const pl = g.player, sp = cr.sp, d = cr.distToPlayer(), f = g.flags;
    const valid = !!(g.inv && g.inv.ticket && !f.ticketVoid);
    if (cr.state === 'seated') { cr.pose(dt, 0); return; }
    const see = pl.hidden ? 0 : cr.canSeePlayer(sp.senses.sight, sp.senses.fov);
    if (see > 0) { cr.awareness = Math.min(1.2, cr.awareness + see * dt * 2.6); cr.lastKnown = { x: pl.pos.x, z: pl.pos.z }; }
    else cr.awareness = Math.max(0, cr.awareness - dt * 0.15);
    if (cr.awareness >= 1 && cr.state !== 'chase' && cr.state !== 'check') {
      if (valid) { if (!f.ticketPunched) cr.setState('check'); else cr.awareness = 0.4; }
      else { cr.setState('chase'); g.onSpotted(cr); }
    }
    if (cr.state === 'chase' && valid) cr.setState(f.ticketPunched ? 'patrol' : 'check');
    const ox = cr.pos.x, oz = cr.pos.z;
    switch (cr.state) {
      case 'patrol': {
        // walk to somewhere near you, stop, look round, look into a compartment, walk on
        if (cr.goalX == null || (cr.waitT != null && cr.stateT > cr.waitT)) {
          const side = Math.random() < 0.5 ? -1 : 1, px = pl.pos.x;
          let gx = U.clamp(px + side * U.lerp(7, 24, Math.random()), 4, 134);
          if (Math.abs(gx - cr.pos.x) < 4) gx = U.clamp(cr.pos.x - side * 12, 4, 134);
          cr.goalX = gx; cr.goalZ = TN.laneZ(gx); cr.waitT = null; cr.stateT = 0;
          const c = (cr.L.meta.compartments || []).filter(k => k[3] && Math.abs(k[2] - gx) < 3)[0];
          cr.peek = c && Math.random() < 0.45 ? c : null; if (cr.peek) cr.goalX = cr.peek[2];
        }
        if (cr.waitT == null) {
          if (TN.go(cr, cr.goalX, TN.laneZ(cr.goalX), sp.speeds.patrol * cr.dif.speed, dt) < 0.12) { cr.waitT = cr.stateT + U.lerp(2.0, 4.5, Math.random()); }
          cr.lookY = Math.sin(cr.anim.t * 0.4) * 0.3;
        } else {
          // standing: the lamp turned into the compartment, or along the corridor
          if (cr.peek) { cr.heading = U.angleDamp(cr.heading, PI, 3, dt); cr.lookY = 0; }
          else cr.lookY = Math.sin(cr.anim.t * 0.7) * 0.8;
        }
        break;
      }
      case 'investigate': {
        if (!cr.lastKnown) { cr.setState('patrol'); break; }
        if (TN.go(cr, cr.lastKnown.x, cr.lastKnown.z, sp.speeds.investigate * cr.dif.speed, dt) < 0.5 || cr.stateT > 20) cr.setState('search');
        break;
      }
      case 'search': {
        cr.lookY = Math.sin(cr.anim.t * 1.1) * 0.9;
        if (cr.stateT > (sp.searchTime || 7)) { cr.goalX = null; cr.setState('patrol'); }
        break;
      }
      case 'check': {
        // up to you, stop, hold out the punch, and wait for the ticket
        if (d > 1.35 && !cr.arriveT) { TN.go(cr, pl.pos.x, pl.pos.z, sp.speeds.investigate * cr.dif.speed, dt); if (cr.stateT > 25) { cr.goalX = null; cr.setState('patrol'); } break; }
        if (!cr.arriveT) { cr.arriveT = cr.stateT; cr.voice('ticket'); if (g.script && g.script.ticketCheck) g.script.ticketCheck(g, cr); }
        cr.faceToward(pl.pos.x, pl.pos.z, dt, 5);
        const t = cr.stateT - cr.arriveT;
        if (t > 2.4 && !cr.punchAt) {
          cr.punchAt = g.time; cr.voice('punch');
          if (valid) { f.ticketPunched = true; if (g.script && g.script.ticketPunched) g.script.ticketPunched(g, cr); }
        }
        if (t > 3.6) { cr.arriveT = 0; cr.punchAt = 0; cr.awareness = 0; cr.goalX = U.clamp(cr.pos.x + (cr.pos.x < pl.pos.x ? -14 : 14), 4, 134); cr.waitT = null; cr.setState('patrol'); cr.stateT = 0; }
        if (d > 3.5) { cr.arriveT = 0; }
        break;
      }
      case 'chase': {
        const los = see > 0 || (d < 3 && cr.losToPlayer() && !pl.hidden);
        cr.lostT = los ? 0 : (cr.lostT || 0) + dt;
        if (pl.hidden && !cr.sawHide && cr.lostT > 0.4) { cr.setState('search'); cr.awareness = 0.5; break; }
        if (cr.lostT > sp.lose) { cr.setState('search'); cr.awareness = 0.5; break; }
        const tgt = los || cr.sawHide ? pl.pos : cr.lastKnown;
        TN.go(cr, tgt.x, tgt.z, sp.speeds.chase * cr.dif.speed * (cr.cfg.speedMul || 1), dt);
        cr.anim.attack = U.damp(cr.anim.attack, d < 2 ? 1 : 0, 6, dt);
        cr.tryCatch();
        break;
      }
      default: cr.setState('patrol');
    }
    const speed = Math.hypot(cr.pos.x - ox, cr.pos.z - oz) / Math.max(dt, 1e-3);
    cr.pose(dt, speed);
    cr.breath(cr.state === 'chase' ? d : 99);
    cr.footsteps(dt, speed, d);
  }
  Sp.add({
    kind: 'conductor', model: conductorModel, radius: 0.3, catchR: 1.15, height: 2.1,
    traits: ['sight', 'hearing'], senses: { sight: 14, fov: 1.9, hearing: 1.2 },
    speeds: { patrol: 1.05, investigate: 1.7, chase: 3.35 }, lose: 7, searchTime: 7, gait: 1.25,
    kill: 'offTrain', stepRate: 1.7, stepHear: 13, voice: 'conductor', autoLairs: null,
    init(cr) { trainEyes(cr); },
    preUpdate(cr, g, dt) { if (!onTrain(cr) || cr.state === 'dormant') return true; conductorUpdate(cr, g, dt); return false; },
  });

  // ============================================================ SLEEPERS
  let sIdx = 0;
  function sleeperModel() {
    const k = sIdx++;
    const skin = K.skin('sleeper:skin', { base: '#9c9a96', mottle: ['170,168,166', '200,198,194', '150,150,156', '186,178,176'], mottleA: 0.45, veins: '110,120,150', veinCount: 26, spots: 20, spotColor: '150,140,150' }, { rough: 0.55, bump: { wrinkles: 120 }, bumpScale: 1.6, rep: 2 });
    const pj = K.cloth('sleeper:pyjamas', '#7e8088', { stains: 90, rough: 0.95, rep: 2 });
    const r = K.humanoid({
      key: 'sleeper', h: 1.9 + (k % 3) * 0.04, build: 0.68, coat: 0, long: 1.1, hands: 'long', skinMat: skin, bodyMat: pj, skinVC: [0.96, 0.95, 0.96],
      head: { eyes: 'none', mouth: 0.4, swell: 0, hair: k % 2 === 1 },
      // old striped pyjamas, the stripes running down
      clothVC: p => ((Math.floor((p[0] + 0.5) * 22 + (p[2] > 0 ? 0 : 0.5)) % 2) ? [0.55, 0.6, 0.78] : [1.05, 1.05, 1.05]),
    });
    // the black sleep mask over the eyes, its elastic round the head
    const maskM = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.85 });
    const mask = new THREE.Mesh(new THREE.CylinderGeometry(0.093 * r.s, 0.09 * r.s, 0.045 * r.s, 24, 1, true, -1.3, 2.6), maskM);
    mask.position.set(0, 0.115 * r.s, 0.0); mask.scale.set(1, 1, 1.12); maskM.side = THREE.DoubleSide; r.head.add(mask);
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.092 * r.s, 0.004, 4, 28), maskM); band.rotation.x = H; band.position.set(0, 0.115 * r.s, -0.005); band.scale.set(1, 1.1, 1); r.head.add(band);
    r.mats.push(maskM);
    const ROOT = { x: 0.92, y: 0.78, zUp: 0.75 };
    return {
      group: r.group, rig: r, mats: r.mats,
      animate(cr, dt) {
        const an = cr.anim, st = cr.state;
        r.stand();
        // how far lying down it is: 1 in the bunk, 0 on its feet
        const lie = st === 'buried' ? 1 : st === 'emerge' ? 1 - U.smoothstep(0, 1, an.emerge) : st === 'lie' ? U.smoothstep(0, 1, cr.lieK || 0) : 0;
        // emerging, its spot is the bunk and it stands up beside it; lying down, its spot is beside the bunk
        const zOff = st === 'emerge' ? ROOT.zUp * (1 - lie) : st === 'lie' ? -ROOT.zUp * lie : 0;
        r.root.rotation.z = H * lie;
        r.root.position.set(ROOT.x * lie, ROOT.y * lie, zOff);
        if (lie > 0.5) {
          // asleep on its side: knees drawn up a little, arms folded, breathing slowly
          for (const l of r.legs) { l.hp.rotation.x = -0.45; l.kn.rotation.x = 0.7; }
          for (const a of r.arms) { a.sh.rotation.x = -0.9; a.el.rotation.x = -1.3; }
          r.hips.scale.set(1, 1, 1 + Math.sin(an.t * 0.9 + k) * 0.015);
          r.neck.rotation.x = 0.25 + Math.sin(an.t * 0.3 + k) * 0.03;
          return;
        }
        r.hips.scale.set(1, 1, 1);
        r.walk(an.walk, U.clamp(an.speed / 1.6, 0, 1), st === 'chase' ? 0.2 : 0);
        // feeling the way with its hands out; the head tilted to listen
        r.reach(st === 'chase' ? 0.85 + (an.attack || 0) * 0.15 : 0.5);
        r.neck.rotation.z = Math.sin(an.t * 0.6 + k) * 0.35;
        r.neck.rotation.x = 0.15;
      },
    };
  }
  // what it hears, once it is up: footsteps it follows; crouching is too soft to hear
  function sleeperHear(cr, x, z, radius, kind) {
    if (cr.state === 'dormant' || cr.state === 'emerge' || cr.state === 'lie') return;
    const d = Math.hypot(x - cr.pos.x, z - cr.pos.z);
    if (cr.state === 'buried') {
      // asleep: a walking step close to the bunk, a run nearer, anything loud
      const wake = kind === 'step' ? (radius >= 6.5 && d < Math.min(4.6, radius * 0.6)) : d < radius * 0.6;
      if (wake) { cr.lastKnown = { x, z }; cr.anim.emerge = 0; cr.setState('emerge'); cr.voice('emerge'); cr.g.fearAdd(12); }
      return;
    }
    if (kind === 'step' && radius < 3.5) return;
    if (d > radius * 1.25) return;
    cr.lastKnown = { x, z }; cr.heardAt = cr.g.time;
    if (cr.state !== 'chase') { cr.setState('chase'); if (!cr.spotted) { cr.spotted = true; cr.g.onSpotted(cr); } }
  }
  function sleeperUpdate(cr, g, dt) {
    const sp = cr.sp, d = cr.distToPlayer();
    if (!cr.bed) cr.bed = { x: cr.pos.x, z: cr.pos.z };
    const ox = cr.pos.x, oz = cr.pos.z;
    switch (cr.state) {
      case 'buried': {
        cr.heading = 0;
        // brushing past the bunk upright wakes it as surely as a footstep
        const pl = g.player;
        if (d < 1.25 && pl.moving && !pl.crouching && !pl.hidden) sleeperHear(cr, pl.pos.x, pl.pos.z, 7, 'step');
        break;
      }
      case 'emerge': {
        cr.anim.emerge = Math.min(1, cr.anim.emerge + dt / (sp.emergeT || 1.6));
        cr.heading = 0;
        if (cr.anim.emerge >= 1) { cr.pos.z = cr.bed.z + 0.75; cr.heardAt = g.time; cr.setState('chase'); cr.spotted = true; g.onSpotted(cr); }
        break;
      }
      case 'chase': {
        const lk = cr.lastKnown || { x: g.player.pos.x, z: g.player.pos.z };
        const left = TN.go(cr, lk.x, lk.z, sp.speeds.chase * cr.dif.speed, dt);
        cr.anim.attack = U.damp(cr.anim.attack, d < 1.6 ? 1 : 0, 6, dt);
        cr.tryCatch();
        if (left < 0.6 && g.time - (cr.heardAt || 0) > 2.5) cr.setState('search');
        break;
      }
      case 'search': {
        // standing still in the corridor, head on one side, listening
        cr.tryCatch();
        if (cr.stateT > 6.5) cr.setState('return');
        break;
      }
      case 'return': {
        // back to the bunk, and down again
        if (TN.go(cr, cr.bed.x, cr.bed.z + 0.75, sp.speeds.patrol * cr.dif.speed, dt) < 0.08) { cr.lieK = 0; cr.setState('lie'); }
        cr.tryCatch();
        break;
      }
      case 'lie': {
        cr.heading = U.angleDamp(cr.heading, 0, 6, dt);
        cr.lieK = Math.min(1, (cr.lieK || 0) + dt / 1.8);
        if (cr.lieK >= 1) { cr.pos.set(cr.bed.x, 0, cr.bed.z); cr.heading = 0; cr.spotted = false; cr.lastKnown = null; cr.setState('buried'); }
        break;
      }
      default: cr.setState('return');
    }
    const speed = cr.state === 'emerge' || cr.state === 'lie' ? 0 : Math.hypot(cr.pos.x - ox, cr.pos.z - oz) / Math.max(dt, 1e-3);
    cr.mesh.visible = true;
    cr.pose(dt, speed);
    cr.breath(cr.state === 'chase' ? d : 99);
    cr.footsteps(dt, speed, d);
  }
  Sp.add({
    kind: 'sleeper', model: sleeperModel, radius: 0.28, catchR: 0.95, height: 1.95,
    traits: ['hearing', 'blind'], senses: { sight: 0, fov: 0, hearing: 1.3 },
    speeds: { patrol: 0.75, investigate: 1.5, chase: 2.75 }, lose: 6, searchTime: 6, gait: 1.6,
    ambush: 'bunk', ambushR: 0, emergeT: 1.7, wakeOnSound: false, visibleBuried: true,
    kill: 'bunk', stepRate: 1.5, stepHear: 8, voice: 'sleeper', autoLairs: null,
    init(cr) { cr.hear = (x, z, radius, kind) => sleeperHear(cr, x, z, radius, kind); trainEyes(cr); },
    preUpdate(cr, g, dt) { if (!onTrain(cr) || cr.state === 'dormant') return true; sleeperUpdate(cr, g, dt); return false; },
  });

  // ============================================================ UNDERHANDS
  function underhandModel() {
    const skin = K.skin('underhand:skin', { base: '#8a8e92', mottle: ['110,114,118', '70,74,80', '130,130,128', '50,52,56'], mottleA: 0.55, veins: '60,70,90', veinCount: 24, spots: 60, spotColor: '30,30,32' }, { rough: 0.45, bump: { wrinkles: 140 }, bumpScale: 2.2, rep: 2 });
    const s = 1.0;
    const arm = p => {
      // shoulder far below the floor, the elbow, the forearm, a long narrow hand, four long fingers
      let d = S.capsule(p, [0, -0.15, 0], [0.0, 0.8, 0.04], 0.05 * s, 0.043 * s);
      d = S.smin(d, S.capsule(p, [0.0, 0.8, 0.04], [0.0, 1.55, 0.0], 0.042 * s, 0.03 * s), 0.03);
      d = S.smin(d, S.ellipsoid(p, [0, 1.63, 0.005], [0.022, 0.07, 0.045]), 0.02);
      for (let f = 0; f < 4; f++) {
        const z = -0.03 + f * 0.02, L = f === 1 || f === 2 ? 0.27 : 0.22;
        d = S.smin(d, S.capsule(p, [0, 1.69, z], [0.0, 1.69 + L * 0.6, z + 0.006], 0.009, 0.0075), 0.008);
        d = S.smin(d, S.capsule(p, [0, 1.69 + L * 0.6, z + 0.006], [0.035, 1.69 + L, z + 0.01], 0.0075, 0.005), 0.006);   // the last joints curled
      }
      d = S.smin(d, S.capsule(p, [0, 1.62, 0.04], [0.015, 1.76, 0.06], 0.009, 0.007), 0.008);   // thumb
      return d + S.fbm(p[0] * 30, p[1] * 12, p[2] * 30, 2) * 0.004;
    };
    // oil-black from the fingertips? no: black up to the elbow from the axle grease, grey above the floor
    const col = p => { const k = U.smoothstep(0.7, 1.1, p[1]); return [U.lerp(0.18, 1, k), U.lerp(0.17, 1, k), U.lerp(0.16, 1, k)]; };
    const mk = () => K.meshOf('underhand:arm', arm, [[-0.1, -0.22, -0.1], [0.1, 2.0, 0.12]], 0.011, skin, { color: (p, n) => { const a = K.aoColor(arm, [1, 1, 1], 1)(p, n), c = col(p); return [a[0] * c[0], a[1] * c[1], a[2] * c[2]]; } });
    const g = new THREE.Group();
    const arms = [];
    const SPOTS = [[-0.12, -0.38, 0.2], [0.08, -0.12, -0.15], [-0.04, 0.16, 0.1], [0.12, 0.4, -0.25]];
    for (const [x, z, a] of SPOTS) {
      const piv = new THREE.Group(); piv.position.set(x, 0, z); piv.rotation.y = a; g.add(piv);
      const m = mk(); piv.add(m); arms.push({ piv, m, a, ph: Math.random() * 6 });
    }
    return {
      group: g, mats: [skin],
      lift(cr) {
        const st = cr.state;
        if (st === 'buried') return -1.83;
        if (st === 'emerge') return -1.83 + U.smoothstep(0, 1, cr.anim.emerge) * 1.5;
        if (st === 'withdraw') return -0.33 - U.smoothstep(0, 1, cr.anim.out || 0) * 1.5;
        return -0.33;
      },
      animate(cr, dt) {
        const an = cr.anim, st = cr.state, pl = cr.g.player;
        // toward you: the arms bend at the floor line and grope for your legs
        const tx = pl.pos.x - cr.pos.x, tz = pl.pos.z - cr.pos.z, yaw = Math.atan2(tx, tz) - cr.heading;
        for (const A of arms) {
          if (st === 'buried') { A.piv.rotation.set(Math.sin(an.t * 0.7 + A.ph) * 0.03, A.a, 0.0); continue; }
          const reach = st === 'chase' ? 0.55 + (an.attack || 0) * 0.35 : 0.25;
          A.piv.rotation.set(Math.cos(yaw) * reach + Math.sin(an.t * 3.1 + A.ph) * 0.12, A.a * 0.3, -Math.sin(yaw) * reach + Math.cos(an.t * 2.7 + A.ph) * 0.12);
        }
      },
    };
  }
  function underhandUpdate(cr, g, dt) {
    const pl = g.player, sp = cr.sp, d = cr.distToPlayer();
    if (!cr.home) cr.home = { x: cr.pos.x, z: cr.pos.z };
    const c = cr.L.cellOf(pl.pos.x, pl.pos.z);
    const on = !pl.hidden && c.y === 1 && Math.abs(pl.pos.x - cr.home.x) < 1.55;
    const v = Math.hypot(pl.vel ? pl.vel.x : 0, pl.vel ? pl.vel.z : 0);
    cr.mesh.visible = true;
    switch (cr.state) {
      case 'buried': {
        // the plates rock under you; under them, something has hold of the edge
        if (on && !cr.wasOn) { cr.voice('knock'); if (g.script && g.script.gangwayStep) g.script.gangwayStep(g, cr); }
        cr.onT = on ? (cr.onT || 0) + dt * (v > 2 ? 0.55 : 1) : Math.max(0, (cr.onT || 0) - dt * 2);
        if (cr.onT > (sp.holdT || 2.3)) { cr.anim.emerge = 0; cr.setState('emerge'); cr.voice('emerge'); g.fearAdd(16); }
        break;
      }
      case 'emerge': {
        cr.anim.emerge = Math.min(1, cr.anim.emerge + dt / (sp.emergeT || 0.6));
        if (cr.anim.emerge >= 1) { cr.setState('chase'); g.onSpotted(cr); }
        if (on && cr.anim.emerge > 0.5) cr.tryCatch();
        break;
      }
      case 'chase': {
        cr.anim.attack = U.damp(cr.anim.attack, d < 1.6 ? 1 : 0, 8, dt);
        if (on || d < 1.3) { cr.offT = 0; cr.tryCatch(); } else cr.offT = (cr.offT || 0) + dt;
        if (cr.offT > 2.4) { cr.anim.out = 0; cr.setState('withdraw'); }
        break;
      }
      case 'withdraw': {
        cr.anim.out = Math.min(1, (cr.anim.out || 0) + dt / 1.2);
        if (cr.anim.out >= 1) { cr.onT = 0; cr.setState('buried'); }
        break;
      }
      default: cr.setState('buried');
    }
    cr.wasOn = on;
    cr.pos.set(cr.home.x, 0, cr.home.z);
    cr.pose(dt, 0);
  }
  Sp.add({
    kind: 'underhand', model: underhandModel, radius: 0, catchR: 1.45, height: 1.6,
    traits: ['deaf', 'blind'], senses: { sight: 0, fov: 0, hearing: 0 }, speeds: { patrol: 0, investigate: 0, chase: 0 },
    ambush: 'gap', ambushR: 0, emergeT: 0.6, holdT: 2.3, wakeOnSound: false, visibleBuried: true,
    kill: 'gap', voice: 'underhand', autoLairs: null, noDoors: true,
    preUpdate(cr, g, dt) { if (cr.state === 'dormant') return true; underhandUpdate(cr, g, dt); return false; },
  });
})(typeof window !== 'undefined' ? window : globalThis);
