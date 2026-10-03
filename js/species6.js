/* The creatures of Gammel Ostra (Chapter 6).
   - The Silted: shapes of river mud with people in them, weed in their hair, sloughing as they move. They
     lie under the mud of the streets. Stand still too long and one rises right there.
   - Long Ones: very tall, very thin, grey as drowned wood, arms down past their knees. They wait in the
     wells, the ditch and the river and come up out of the water when you pass close.
   - The Choir: five singers in black robes at the front of the church, facing the altar, still singing
     the last hymn. While they sing, they do not see you. When the singing stops, they turn round.
   Deaths (kills.js): mud (the Silted), coil (a Long One), pews (the Choir). */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const S = PB.SDF, U = PB.U;
  const K = PB.SpeciesKit, Sp = PB.Species;
  const PI = Math.PI, H = PI / 2;
  const outdoors = (cr, x, y) => !!(cr.L.meta.outdoor && cr.L.meta.outdoor[cr.L.i(x, y)]);
  const mudCell = (cr, x, y) => { const L = cr.L, i = L.i(x, y); if (L.floorType[i] || !outdoors(cr, x, y)) return false; const st = L.styles[L.styleOf[i]]; return !!st && (st.floor === 'mud' || st.floor === 'grass'); };
  const wet = (cr, x, y) => { const L = cr.L; return outdoors(cr, x, y) || !!L.floorType[L.i(x, y)]; };

  // ============================================================ THE SILTED
  function siltedModel() {
    const silt = K.skin('silted:mud', { base: '#4a3e30', mottle: ['62,52,40', '40,32,24', '80,70,54', '34,40,26'], mottleA: 0.6, veins: '30,26,20', veinCount: 30, spots: 70, spotColor: '50,60,30' }, { rough: 0.35, bump: { wrinkles: 160 }, bumpScale: 2.6, rep: 2 });
    const sag = p => S.fbm(p[0] * 6, p[1] * 3, p[2] * 6, 3) * 0.05 + Math.max(0, Math.sin(p[1] * 18 + p[0] * 4)) * 0.008;
    const r = K.humanoid({
      key: 'silted', h: 1.78, build: 1.12, coat: 0.25, skinMat: silt, bodyMat: silt, skinVC: [0.9, 0.85, 0.8],
      head: { eyes: 'hollow', mouth: 0.5, swell: 0.8, hair: true, hairLong: 5, extra: (p, d) => d + sag(p) * 0.5 },
      clothVC: p => { const w = S.fbm(p[0] * 7, p[1] * 7, p[2] * 7, 2); return w > 0.25 ? [0.55, 0.75, 0.45] : [1, 1, 1]; },
      torsoExtra: (p, d) => d + sag(p),
    });
    // weed trailing from the shoulders and head
    const weedM = new THREE.MeshStandardMaterial({ color: 0x2a3a1e, roughness: 0.6, side: THREE.DoubleSide });
    for (let k = 0; k < 9; k++) {
      const a = k / 9 * PI * 2, pts = [new THREE.Vector3(Math.cos(a) * 0.14, 0.5, Math.sin(a) * 0.1)];
      for (let j = 1; j < 5; j++) pts.push(new THREE.Vector3(Math.cos(a) * (0.16 + j * 0.02), 0.5 - j * 0.14, Math.sin(a) * (0.12 + j * 0.02) + Math.sin(j + k) * 0.03));
      const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 8, 0.008, 3), weedM); r.hips.add(m);
    }
    return {
      group: r.group, rig: r, mats: r.mats,
      lift(cr) {
        const st = cr.state;
        if (st === 'buried' || st === 'dormant') return -1.9;
        if (st === 'emerge') return -1.9 + U.smoothstep(0, 1, cr.anim.emerge) * 1.9;
        return 0;
      },
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 2, 0, 1), cr.state === 'chase' ? 0.2 : 0);
        r.reach(cr.state === 'emerge' ? 0.9 : cr.state === 'chase' ? 0.65 + (an.attack || 0) * 0.35 : 0.2);
        r.neck.rotation.x = 0.35 + Math.sin(an.t * 0.7) * 0.06; r.neck.rotation.z = Math.sin(an.t * 0.4) * 0.2;
        r.hips.rotation.z = Math.sin(an.walk * 0.5) * 0.08;
      },
    };
  }
  Sp.add({
    kind: 'silted', model: siltedModel, radius: 0.32, catchR: 1.1, height: 1.8,
    traits: ['stillnessHunter', 'hearing', 'sight'], ambush: 'still', ambushR: 6, stillT: 3.2, emergeT: 1.5, emergeAt: 'player', emergeDist: 2.4,
    senses: { sight: 10, fov: 2.2, hearing: 1.0 }, speeds: { patrol: 0.55, investigate: 1.3, chase: 3.2 }, lose: 8, searchTime: 10, gait: 1.3, leaveR: 20,
    allowCell: mudCell, emergeOn: mudCell, kill: 'mud', stepRate: 1.6, stepHear: 9, voice: 'silted', autoLairs: null,
  });

  // ============================================================ LONG ONES
  function longOneModel() {
    const grey = K.skin('longone:skin', { base: '#7a7a72', mottle: ['96,96,90', '70,72,68', '110,108,100', '60,66,70'], mottleA: 0.5, veins: '60,64,80', veinCount: 30, spots: 40, spotColor: '70,80,70' }, { rough: 0.3, bump: { wrinkles: 110 }, bumpScale: 2.0, rep: 2, physical: true, params: { clearcoat: 0.6, clearcoatRoughness: 0.4 } });
    const r = K.humanoid({
      key: 'longone', h: 2.75, build: 0.62, coat: 0, long: 1.55, hands: 'long', skinMat: grey, bodyMat: grey, skinVC: [1, 1, 1],
      head: { eyes: 'none', mouth: 0.9, swell: 0, hair: true, hairLong: 8 }, clothVC: () => [0.92, 0.94, 0.95],
    });
    return {
      group: r.group, rig: r, mats: r.mats,
      lift(cr) {
        const st = cr.state;
        if (st === 'buried' || st === 'dormant') return -3.0;
        if (st === 'emerge') return -3.0 + U.smoothstep(0, 1, cr.anim.emerge) * 3.0;
        // in the river it walks with the water to the chest
        return cr.g.world.floorAt(cr.pos.x, cr.pos.z) < -0.2 ? -0.9 : 0;
      },
      animate(cr, dt) {
        const an = cr.anim;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 2.4, 0, 1), cr.state === 'chase' ? 0.4 : 0);
        // the arms swing long and loose; in a chase they reach, too far
        const reach = cr.state === 'emerge' ? 1 : cr.state === 'chase' ? 0.8 : 0;
        r.reach(Math.max(reach, an.attack || 0));
        r.neck.rotation.x = 0.55 + Math.sin(an.t * 0.5) * 0.05; r.neck.rotation.y = Math.sin(an.t * 0.33) * 0.4;
        r.hips.rotation.x = 0.2;
      },
    };
  }
  Sp.add({
    kind: 'longone', model: longOneModel, radius: 0.3, catchR: 1.6, height: 2.8,
    traits: ['hearing', 'sight'], ambush: 'water', ambushR: 3.0, emergeT: 1.4, wakeOnSound: true,
    senses: { sight: 9, fov: 2.0, hearing: 1.2 }, speeds: { patrol: 0.8, investigate: 1.8, chase: 3.6 }, lose: 9, searchTime: 12, gait: 0.9,
    ambushCheck: (cr, g, dt, d) => d < (cr.sp.ambushR || 3) && !g.player.crouching,
    allowCell: wet, kill: 'coil', stepRate: 2.2, stepHear: 9, voice: 'longone', autoLairs: null,
  });

  // ============================================================ THE CHOIR
  let cIdx = 0;
  function choirModel() {
    const k = cIdx++;
    const robe = K.cloth('choir:robe', '#141214', { stains: 30, rough: 0.9, rep: 2 });
    const r = K.humanoid({
      key: 'choir', h: 1.72 + (k % 3) * 0.06, build: 0.9 + (k % 2) * 0.12, coat: 0.95, bodyMat: robe,
      skin: { base: '#c8c0b4', mottle: ['180,170,160', '210,200,190', '150,150,150'], veins: '120,110,130', veinCount: 8 },
      head: { eyes: 'none', mouth: 0.9, swell: 0.1, hair: k % 2 === 0 }, skinVC: [0.95, 0.94, 0.95],
      clothVC: p => (p[1] > 0.5 && Math.abs(p[0]) < 0.09 && p[2] > 0.05 ? [6, 6, 6] : [1, 1, 1]),   // the white collar
    });
    // a hymnal held open in both hands
    const book = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.02, 0.14), new THREE.MeshStandardMaterial({ color: 0x2a1a12, roughness: 0.6 }));
    const pages = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.024, 0.13), new THREE.MeshStandardMaterial({ color: 0xd8d0b8, roughness: 0.9 })); pages.position.y = 0.006; book.add(pages);
    book.position.set(0, 0.32, 0.3); book.rotation.x = -0.9; r.hips.add(book);
    return {
      group: r.group, rig: r, mats: r.mats, book,
      animate(cr, dt) {
        const an = cr.anim, singing = cr.singing;
        r.stand();
        r.walk(an.walk, U.clamp(an.speed / 2, 0, 1), 0);
        if (singing || cr.state === 'patrol' && an.speed < 0.2) {
          for (const a of r.arms) { a.sh.rotation.set(-0.5, 0, a.sx * -0.25); a.el.rotation.set(-1.0, 0, 0); }
          r.neck.rotation.x = -0.15 + Math.sin(an.t * 1.3 + k) * 0.04;      // heads up, singing
          book.visible = true;
        } else {
          book.visible = false;
          r.reach(cr.state === 'chase' ? 0.75 + (an.attack || 0) * 0.25 : 0.1);
          r.neck.rotation.x = 0.1; r.neck.rotation.y = Math.sin(an.t * 0.7 + k) * 0.3;
        }
      },
    };
  }
  Sp.add({
    kind: 'choir', model: choirModel, radius: 0.3, catchR: 1.1, height: 1.8,
    traits: ['hearing', 'sight'], senses: { sight: 10, fov: 2.2, hearing: 1.2 },
    speeds: { patrol: 0.6, investigate: 1.4, chase: 3.1 }, lose: 8, searchTime: 10, gait: 1.4,
    confined: ['churchZone'], kill: 'pews', stepRate: 1.6, stepHear: 10, voice: 'choir',
    // while they sing they face the altar and see nothing; noise or being in front of them stops the song,
    // a breath of silence, and then they turn
    init(cr) { cr.singing = true; cr.home = null; },
    preUpdate(cr, g, dt) {
      if (!cr.home) cr.home = { x: cr.pos.x, z: cr.pos.z, h: cr.heading };
      const C = g.choir || (g.choir = { phase: 'sing', t: 0 });
      cr.singing = C.phase === 'sing';
      if (C.phase === 'sing' || C.phase === 'silence') {
        cr.awareness = 0;
        if (cr.state !== 'patrol') cr.setState('patrol');
        cr.pos.x = U.damp(cr.pos.x, cr.home.x, 3, dt); cr.pos.z = U.damp(cr.pos.z, cr.home.z, 3, dt);
        // in the silence, before they turn, the heads come round first
        const pl = g.player.pos, toP = Math.atan2(pl.x - cr.pos.x, pl.z - cr.pos.z);
        cr.heading = C.phase === 'silence' ? cr.heading + U.angleWrap(toP - cr.heading) * Math.min(1, dt * 0.8) : cr.home.h;
        cr.pose(dt, 0);
        return false;
      }
      return true;
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
