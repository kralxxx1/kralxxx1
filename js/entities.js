/* Yaratıklar ve yapay zekâ: Yutucu (Pacman), dört hayalet, Sırıtkanlar ve Sayaç.
   Izgara üzerinde akış alanıyla yol bulma, görme/duyma algısı, durum makineleri. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;
  const { DX, DY } = PB.LevelGen;

  const GHOST = {
    red: { name: 'danny', color: 0xff2a2a, pitch: 300, speed: 3.9, patrol: 2.2, lose: 7, sight: 26, hear: 1.2 },
    violet: { name: 'rosie', color: 0xb46cff, pitch: 390, speed: 3.75, patrol: 2.1, lose: 5, sight: 24, hear: 1.0 },
    teal: { name: 'nell', color: 0x2fe0b8, pitch: 350, speed: 3.4, patrol: 2.0, lose: 4, sight: 22, hear: 1.3 },
    amber: { name: 'toby', color: 0xffb020, pitch: 250, speed: 5.3, patrol: 0, lose: 99, sight: 40, hear: 0.6 },
  };

  // ------------------------------------------------------------ görseller
  // The Eater (sculpted in monsters.js): swollen raw hide, horns, gums and human teeth, a tongue, two eyes, Walt's arms
  function pacmanMesh() { return PB.Monsters.eater(); }

  // The four Haunts (monsters.js): hooded, dyed, soaked cloth over a child. The cloth hangs and sways from
  // the hood, the pointed hem drags, the eye holes are black with a glowing pinpoint deep inside that follows you.
  // Uniform names are the old glowing ghost's, so the AI code drives it the same way.
  function ghostMesh(color, key) {
    const g = new THREE.Group();
    const geo = PB.Monsters.sheetGeo();
    const uniforms = { uColor: { value: new THREE.Color(color) }, uAlpha: { value: 1 }, uTime: { value: 0 }, uFlee: { value: 0 }, uFriendly: { value: 0 }, uSeed: { value: Math.random() * 10 } };
    const mat = new THREE.MeshStandardMaterial({ map: PB.Monsters.sheetTex(key || 'g', color), roughness: 0.88, metalness: 0, alphaHash: true, vertexColors: true });
    mat.onBeforeCompile = sh => {
      Object.assign(sh.uniforms, uniforms);
      sh.vertexShader = 'uniform float uTime; uniform float uSeed; varying float vLy;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        // Heavy wet cloth: slow sway growing toward the hem, a ripple running round it, the chest rising
        float hang = pow(clamp((1.3 - position.y) / 1.3, 0.0, 1.0), 1.6);
        float ang = atan(position.z, position.x);
        vec2 sway = vec2(sin(uTime * 0.9 + uSeed), cos(uTime * 0.7 + uSeed * 1.3)) * 0.05;
        transformed.xz += sway * hang;
        transformed.y += sin(ang * 5.0 + uTime * 2.2 + uSeed) * 0.02 * hang;
        transformed.xz += normalize(position.xz + 1e-4) * sin(ang * 3.0 - uTime * 1.4) * 0.025 * hang;
        transformed += normal * sin(uTime * 1.6 + uSeed) * 0.008 * smoothstep(0.9, 1.3, position.y) * (1.0 - smoothstep(1.3, 1.5, position.y));
        vLy = position.y;`);
      // (the fragment side calls its clock uGhostT: the baked-light patch already declares a uTime there)
      sh.uniforms.uGhostT = uniforms.uTime;
      sh.fragmentShader = 'uniform vec3 uColor; uniform float uAlpha; uniform float uGhostT; uniform float uFlee; uniform float uFriendly; varying float vLy;\n' + sh.fragmentShader
        .replace('#include <color_fragment>', `#include <color_fragment>
          // A lantern: the dye bleaches out to a pale, drowned grey, flashing red when it is about to wear off
          float flash = step(1.5, uFlee) * step(0.5, fract(uGhostT * 3.5));
          diffuseColor.rgb = mix(diffuseColor.rgb, mix(vec3(0.72, 0.72, 0.76), vec3(0.85, 0.12, 0.1), flash), step(0.5, uFlee) * 0.85);
          diffuseColor.a *= uAlpha;`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
          // A faint glow of their color soaked into the hem, so they are never quite invisible in the dark
          totalEmissiveRadiance += mix(uColor, vec3(0.6, 0.6, 0.65), step(0.5, uFlee)) * ((0.035 + uFriendly * 0.05) + 0.07 * (1.0 - smoothstep(0.0, 0.9, vLy)));`);
    };
    mat.customProgramCacheKey = () => 'haunt-v2';
    const body = new THREE.Mesh(geo, mat);
    body.castShadow = true; body.receiveShadow = true;
    g.add(body);
    // Pupils: glowing pinpoints deep in the black eye holes, following you
    const eyeP = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2.2).add(new THREE.Color(1.2, 1.15, 1.1)) });
    const eyes = [];
    for (const sx of [-0.085, 0.085]) {
      const e = new THREE.Group(); e.position.set(sx, sx < 0 ? 1.302 : 1.31, 0.15); g.add(e);
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.014, 10, 8), eyeP);
      e.add(p);
      eyes.push({ e, p });
    }
    const light = new THREE.PointLight(color, 1.5, 6, 2);
    light.position.set(0, 0.5, 0.25);
    g.add(light);
    return { group: g, body, mat, uniforms, eyes, light };
  }
  // Grinners and the Counter are sculpted in monsters2.js
  function grinnerMesh() { return PB.Monsters.grinner(); }
  function watcherMesh() { return PB.Monsters.counter(); }
  // Creatures take the level's baked light like everything else in it
  function lit(game, group) {
    if (!game.world) return;
    const seen = new Set();
    group.traverse(o => { if (!o.isMesh) return; for (const m of Array.isArray(o.material) ? o.material : [o.material]) if (m && !seen.has(m) && !m.isMeshBasicMaterial && !m.isShaderMaterial) { seen.add(m); game.world.patch(m); } });
  }

  // ------------------------------------------------------------ temel sınıf
  class Entity {
    constructor(game, kind, o = {}) {
      this.g = game; this.L = game.level; this.kind = kind; this.o = o;
      this.pos = new THREE.Vector3();
      this.cell = { x: 0, y: 0 }; this.next = null; this.lastDir = -1;
      this.heading = 0;
      this.state = 'patrol'; this.stateT = 0;
      this.awareness = 0; this.lastKnown = null; this.lostT = 0;
      this.goal = null; this.goalField = null;
      this.dif = PB.Settings.difficulty();
      this.active = true; this.hostile = true;
      this.catchR = 1.0;
      this.mesh = new THREE.Group();
      game.scene.add(this.mesh);
      this.id = kind + (o.ghost || '') + Math.floor(Math.random() * 1e6);
    }
    placeCell(x, y) {
      this.cell = { x, y }; this.next = null; this.stuckT = 0;
      const f = this.standPoint(x, y);
      this.pos.set(f.x, 0, f.z);
      this.mesh.position.copy(this.pos);
    }
    // Body radius for walls and furniture; 0 = floats through everything (smiles, the Counter)
    get bodyR() { return this.radius != null ? this.radius : 0.3; }
    standPoint(x, y) { const w = this.g.world; return w && w.freePoint && this.bodyR > 0 ? w.freePoint(x, y, this.bodyR) : { x: this.L.cx(x), z: this.L.cz(y) }; }
    // Keep the body out of walls and furniture (ghosts drift through doors, not through desks)
    settle(p = this.pos) {
      const w = this.g.world;
      if (!w || !(this.bodyR > 0)) return p;
      return w.collide(p, this.bodyR, this.ghostly || this.noDoors ? { noDoors: true } : undefined);
    }
    // Move up to len toward (tx, tz). Blocked head-on by furniture, it steps round it, keeping to the
    // side it picked until it gets where it was going.
    steer(tx, tz, len) {
      const ox = this.pos.x, oz = this.pos.z, dx = tx - ox, dz = tz - oz, d = Math.hypot(dx, dz);
      if (d < 1e-4) return;
      const ux = dx / d, uz = dz / d;
      this.pos.x += ux * Math.min(len, d); this.pos.z += uz * Math.min(len, d);
      this.settle();
      if (!(this.bodyR > 0) || Math.hypot(this.pos.x - ox, this.pos.z - oz) > len * 0.35) return;
      const q = this._q || (this._q = new THREE.Vector3());
      let best = null, bs = Infinity;
      for (const sgn of this.side ? [this.side, -this.side] : [1, -1]) {
        q.set(ox - uz * sgn * len + ux * len * 0.25, 0, oz + ux * sgn * len + uz * len * 0.25);
        this.settle(q);
        if (Math.hypot(q.x - ox, q.z - oz) < len * 0.3) continue;
        const sc = Math.hypot(tx - q.x, tz - q.z) - (sgn === this.side ? 0.6 : 0);
        if (sc < bs) { bs = sc; best = [q.x, q.z, sgn]; }
      }
      if (best) { this.pos.x = best[0]; this.pos.z = best[1]; this.side = best[2]; }
    }
    cellOf() { return this.L.cellOf(this.pos.x, this.pos.z); }
    setState(s) { if (this.state !== s) { this.prevState = this.state; this.state = s; this.stateT = 0; this.next = null; if (this.onState) this.onState(s); } }
    setGoal(x, y) {
      if (this.goal && this.goal.x === x && this.goal.y === y && this.goalField) return;
      this.goal = { x, y };
      this.goalField = this.L.bfs(x, y, 'nav');
      this.next = null;
    }
    // Akış alanı üzerinde bir adım
    pickNext(field, flee) {
      const L = this.L, { x, y } = this.cell, i = L.i(x, y);
      let best = null, bestV = flee ? -1 : (field[i] >= 0 ? field[i] : 1e9);
      const opts = [];
      for (let d = 0; d < 4; d++) {
        if (!L.step(x, y, d, 'nav')) continue;
        const nx = x + DX[d], ny = y + DY[d], v = field[L.i(nx, ny)];
        if (v < 0) continue;
        opts.push({ x: nx, y: ny, v, d });
      }
      const pi = L.portalMap.get(i);
      if (pi !== undefined && field[pi] >= 0) opts.push({ x: pi % L.w, y: (pi / L.w) | 0, v: field[pi], d: -2, portal: true });
      L.shuffleSeed = (L.shuffleSeed || 1) + 1;
      const sh = U.rng(L.shuffleSeed + i).shuffle(opts);
      for (const o of sh) {
        if (flee ? o.v > bestV : o.v < bestV) { bestV = o.v; best = o; }
      }
      // Fleeing into a dead end: cornered. Keep moving (never jitter on the spot) and let the creature know.
      this.cornered = !!(flee && field[i] >= 0 && best && best.v <= field[i]);
      if (this.cornered) { const alt = sh.filter(o => o.d !== (this.lastDir + 2) % 4); if (alt.length) best = alt[0]; }
      return best;
    }
    // Hedefe doğru ilerle; varınca true
    advance(dt, speed, field, flee) {
      const L = this.L;
      if (!field) return true;
      if (!this.next) {
        this.next = this.pickNext(field, flee);
        if (!this.next) return true;
        if (this.next.d !== this.lastDir && this.lastDir >= 0 && this.next.d >= 0) this.onTurn && this.onTurn();
        if (this.next.d >= 0) this.lastDir = this.next.d;
        // Kapıdan geçiyorsa aç
        if (this.next.d >= 0) {
          const door = L.doorAt(this.cell.x, this.cell.y, this.next.d);
          if (door && !door.open && !door.locked && !this.ghostly) this.g.openDoorBy(door, this);
        }
      }
      if (this.next.portal) {
        this.placeCell(this.next.x, this.next.y);
        this.next = null;
        return false;
      }
      const fp = this.standPoint(this.next.x, this.next.y), tx = fp.x, tz = fp.z;
      const dx = tx - this.pos.x, dz = tz - this.pos.z, d = Math.hypot(dx, dz);
      const stepLen = speed * dt;
      if (d <= Math.max(stepLen, 0.12)) {
        this.pos.x = tx; this.pos.z = tz;
        this.cell = { x: this.next.x, y: this.next.y };
        this.next = null; this.stuckT = 0; this.bestD = null; this.side = 0;
        return field[L.i(this.cell.x, this.cell.y)] === 0 && !flee;
      }
      this.steer(tx, tz, stepLen);
      this.heading = U.angleDamp(this.heading, Math.atan2(dx, dz), 8, dt);
      // Watchdog: no progress toward the next point for a while means something is in the way.
      // First re-plan from where it stands (keeping the clock), then, out of sight, slip into the next cell.
      const nd = Math.hypot(tx - this.pos.x, tz - this.pos.z);
      if (this.bestD == null) this.bestD = nd;
      else if (nd < this.bestD - 0.05) { this.bestD = nd; this.stuckT = 0; }
      else {
        this.stuckT = (this.stuckT || 0) + dt;
        if (this.stuckT > 1.2 && this.stuckT - dt <= 1.2) { this.cell = L.cellOf(this.pos.x, this.pos.z); this.next = null; this.bestD = null; this.side = -(this.side || 1); }
        else if (this.stuckT > 2.6) {
          const seen = this.g.camera && this.observed && this.observed();
          if (!seen || this.stuckT > 6) { this.pos.x = tx; this.pos.z = tz; this.cell = { x: this.next.x, y: this.next.y }; this.next = null; this.stuckT = 0; this.bestD = null; }
        }
      }
      return false;
    }
    faceToward(x, z, dt, k = 6) { this.heading = U.angleDamp(this.heading, Math.atan2(x - this.pos.x, z - this.pos.z), k, dt); }
    distToPlayer() { const p = this.g.player.pos; return Math.hypot(p.x - this.pos.x, p.z - this.pos.z); }
    losToPlayer() { const p = this.g.player.pos; return this.L.los(this.pos.x, this.pos.z, p.x, p.z); }
    // Görme: mesafe, görüş açısı, ışık, fener
    canSeePlayer(range, fov = 2.4) {
      const pl = this.g.player;
      if (pl.hidden) return 0;
      const d = this.distToPlayer();
      if (d > range) return 0;
      const a = Math.atan2(pl.pos.x - this.pos.x, pl.pos.z - this.pos.z);
      if (d > 4 && Math.abs(U.angleWrap(a - this.heading)) > fov / 2) return 0;
      if (!this.losToPlayer()) return 0;
      const light = this.g.world.lightAt(pl.pos.x, pl.pos.z);
      let vis = U.clamp(light * 0.35, 0, 0.8) + (pl.flashOn ? 0.7 : 0) + (pl.sprinting ? 0.25 : 0) - (pl.crouching ? 0.3 : 0);
      vis = U.clamp(vis, 0.12, 1);
      return vis * (1 - d / range) * this.dif.sight;
    }
    // Oyuncu bu varlığa bakıyor mu? (ekranda, görüş hattında ve görülebilir ışıkta)
    observed() {
      const g = this.g, cam = g.camera, pl = g.player;
      if (pl.hidden) return false;
      const v = new THREE.Vector3(this.pos.x - cam.position.x, 1.2 - cam.position.y, this.pos.z - cam.position.z);
      const d = v.length();
      v.normalize();
      const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
      const cosA = v.dot(fwd);
      const halfFov = THREE.MathUtils.degToRad(cam.fov) * 0.5 * Math.max(1, cam.aspect) * 0.95;
      if (cosA < Math.cos(Math.min(1.4, halfFov))) return false;
      if (!this.L.los(cam.position.x, cam.position.z, this.pos.x, this.pos.z)) return false;
      if (this.selfLit) return true;
      const lit = g.world.lightAt(this.pos.x, this.pos.z) > 0.35;
      const inBeam = pl.flashOn && pl.flash.intensity > 20 && d < 26 && v.dot(pl.flashDir) > Math.cos(0.5);
      return lit || inBeam || d < 2.2;
    }
    inFlashBeam(maxD = 12) {
      const pl = this.g.player;
      if (!pl.flashOn || pl.flash.intensity < 20) return false;
      const cam = this.g.camera;
      const v = new THREE.Vector3(this.pos.x - cam.position.x, 1.2 - cam.position.y, this.pos.z - cam.position.z);
      const d = v.length();
      if (d > maxD) return false;
      v.normalize();
      return v.dot(pl.flashDir) > Math.cos(0.4) && this.L.los(cam.position.x, cam.position.z, this.pos.x, this.pos.z);
    }
    hear(x, z, radius) {
      if (!this.active || !this.hostile) return;
      const d = Math.hypot(x - this.pos.x, z - this.pos.z);
      let r = radius * this.dif.hearing * (this.hearMul || 1);
      if (!this.L.los(this.pos.x, this.pos.z, x, z)) r *= 0.55;
      if (d > r) return;
      if (this.state === 'chase') { this.lastKnown = { x, z }; return; }
      if (this.state === 'flee' || this.state === 'eaten' || this.state === 'friendly' || this.state === 'dormant') return;
      this.lastKnown = { x, z };
      this.awareness = Math.max(this.awareness, 0.45);
      if (this.onHear) this.onHear(x, z); else this.setState('investigate');
    }
    randomCellNear(cx, cy, rMin, rMax, avoidPlayerLos) {
      const L = this.L, r = Math.random;
      for (let t = 0; t < 60; t++) {
        const a = r() * Math.PI * 2, d = rMin + r() * (rMax - rMin);
        const x = Math.round(cx + Math.cos(a) * d), y = Math.round(cy + Math.sin(a) * d);
        if (!L.passable(x, y) || L.floorType[L.i(x, y)] === 1 && this.kind === 'eater') continue;
        const f = this.g.nav.playerField;
        if (f && f[L.i(x, y)] < 0) continue;
        if (avoidPlayerLos && L.los(L.cx(x), L.cz(y), this.g.player.pos.x, this.g.player.pos.z)) continue;
        if (this.cellOk && !this.cellOk(x, y)) continue;
        return { x, y };
      }
      return null;
    }
    // Genel devriye / araştırma / arama / kovalama akışı
    baseAI(dt, sp) {
      const g = this.g, L = this.L;
      const see = this.canSeePlayer(sp.sight, sp.fov || 2.3);
      if (see > 0) { this.awareness = Math.min(1.2, this.awareness + see * dt * (sp.notice || 2.2)); this.lastKnown = { x: g.player.pos.x, z: g.player.pos.z }; }
      else this.awareness = Math.max(0, this.awareness - dt * 0.12);
      if (this.state !== 'chase' && this.awareness >= 1) { this.setState('chase'); g.onSpotted(this); }
      switch (this.state) {
        case 'patrol': {
          if (!this.goal || this.stateT > 40 || this.arrived) {
            const pc = g.nav.playerCell;
            // The longer nothing has found the player, the more patrols drift their way (g.menace)
            const bias = sp.hunt || Math.random() < (g.menace || 0) * 0.85 ? this.randomCellNear(pc.x, pc.y, 5, 14, true) : null;
            const c = bias || this.randomCellNear(this.cell.x, this.cell.y, 5, 18) || { x: this.cell.x, y: this.cell.y };
            this.setGoal(c.x, c.y); this.arrived = false; this.stateT = 0;
          }
          this.arrived = this.advance(dt, sp.patrol, this.goalField);
          break;
        }
        case 'investigate': {
          if (!this.lastKnown) { this.setState('patrol'); break; }
          const c = L.cellOf(this.lastKnown.x, this.lastKnown.z);
          if (!L.passable(c.x, c.y)) { this.setState('patrol'); break; }
          this.setGoal(c.x, c.y);
          if (this.advance(dt, sp.investigate || sp.patrol * 1.3, this.goalField)) this.setState('search');
          if (this.stateT > 25) this.setState('patrol');
          break;
        }
        case 'search': {
          if (!this.goal || this.arrived) {
            const lk = this.lastKnown ? L.cellOf(this.lastKnown.x, this.lastKnown.z) : this.cell;
            const c = this.randomCellNear(lk.x, lk.y, 1, 6) || this.cell;
            this.setGoal(c.x, c.y); this.arrived = false;
          }
          this.arrived = this.advance(dt, sp.patrol, this.goalField);
          if (this.stateT > (sp.searchTime || 14)) this.setState('patrol');
          break;
        }
        case 'chase': {
          if (!this.lastKnown) this.lastKnown = { x: g.player.pos.x, z: g.player.pos.z };
          const los = see > 0 || (this.distToPlayer() < 3 && this.losToPlayer() && !g.player.hidden);
          if (los) { this.lostT = 0; this.lastKnown = { x: g.player.pos.x, z: g.player.pos.z }; }
          else this.lostT += dt;
          if (g.player.hidden && this.lostT > 0.5) { if (this.sawHide) { this.setGoal(g.nav.playerCell.x, g.nav.playerCell.y); } else { this.setState('search'); break; } }
          if (this.lostT > sp.lose) { this.setState('search'); this.awareness = 0.5; break; }
          const field = this.lostT > 1.5 ? (this.setGoal(L.cellOf(this.lastKnown.x, this.lastKnown.z).x, L.cellOf(this.lastKnown.x, this.lastKnown.z).y), this.goalField) : (this.chaseField ? this.chaseField() : g.nav.playerField);
          const arrived = this.advance(dt, this.chaseSpeed ? this.chaseSpeed(sp) : sp.speed, field);
          if (arrived && this.lostT > 1.5) this.setState('search');
          // Son metrelerde oyuncuya doğrudan yönel
          const d = this.distToPlayer();
          if (d < 2.6 && los) { const p = g.player.pos; this.steer(p.x, p.z, sp.speed * dt * 0.5); this.cell = L.cellOf(this.pos.x, this.pos.z); this.next = null; }
          break;
        }
        case 'flee': {
          this.advance(dt, sp.patrol * 1.2, g.nav.playerField, true);
          break;
        }
      }
    }
    tryCatch() {
      const g = this.g;
      if (!this.hostile || g.player.hidden && !this.sawHide) return false;
      const d = this.distToPlayer();
      if (d < this.catchR && this.losToPlayer()) { g.killPlayer(this); return true; }
      return false;
    }
    remove() { this.g.scene.remove(this.mesh); this.mesh.traverse(o => { if (o.geometry) o.geometry.dispose(); }); if (this.g.audio) for (const k of this.loopKeys || []) this.g.audio.stopLoop(k); }
  }

  // ------------------------------------------------------------ Yutucu
  class Eater extends Entity {
    constructor(game, o) {
      super(game, 'eater', o);
      const m = pacmanMesh(game);
      this.vis = m; this.mesh.add(m.group); lit(game, m.group);
      this.catchR = 1.55; this.radius = 0.55;
      this.turnSlow = 0; this.chomp = 0; this.chompRate = 2; this.lastChompSide = 0;
      this.state = o.dormant ? 'dormant' : 'patrol';
      this.mesh.visible = !o.dormant;
      this.arcade = !!o.arcade;
      this.hearMul = 1.2;
      this.loopKeys = ['pac:rumble'];
      this.power = 0;
      this.frozenT = 0;
      this.baseSpeed = o.final ? 4.6 : this.arcade ? 4.3 : 4.6;
    }
    onTurn() { this.turnSlow = 1; }
    wake(near) {
      if (this.state !== 'dormant') return;
      const pc = this.g.nav.playerCell;
      const c = this.randomCellNear(pc.x, pc.y, near ? 14 : 22, near ? 22 : 34, true) || this.randomCellNear(pc.x, pc.y, 10, 40);
      if (c) this.placeCell(c.x, c.y);
      this.mesh.visible = true;
      this.setState('patrol');
    }
    update(dt) {
      if (this.state === 'dormant') return;
      const g = this.g;
      this.stateT += dt;
      const dm = this.dif.speed;
      this.turnSlow = Math.max(0, this.turnSlow - dt * 0.85);
      const turnK = 1 - this.turnSlow * 0.48;
      const sp = { sight: 30, fov: 2.6, speed: this.baseSpeed * dm * turnK, patrol: (this.arcade ? 2.6 : 2.1) * dm, investigate: 3.0 * dm, lose: this.arcade ? 6 : 5, hunt: this.huntBias !== false, notice: 1.8, searchTime: 12 };
      if (g.powerT > 0 && this.state !== 'stunned') { if (this.state !== 'flee') this.setState('flee'); }
      else if (this.state === 'flee') this.setState('search');
      if (this.state === 'stunned') {
        this.frozenT -= dt;
        if (this.frozenT <= 0) this.setState('search');
      } else this.baseAI(dt, sp);
      // Suda yavaş (havuz)
      // Görsel: çiğneme
      const moving = this.state !== 'stunned';
      this.chompRate = this.state === 'chase' ? 4.2 : 2.3;
      if (moving) this.chomp += dt * this.chompRate;
      const sniff = this.state === 'investigate' || this.state === 'search';
      let open = Math.abs(Math.sin(this.chomp * Math.PI)) * (this.state === 'chase' ? 0.68 : 0.4);
      if (sniff) open = 0.12 + Math.abs(Math.sin(g.time * 7)) * 0.05;
      const V = this.vis;
      V.up.rotation.x = -open; V.lo.rotation.x = open * 0.35;
      // Breathing, crawling hide that twitches when it hunts; drool stretched between the jaws; the tongue working
      const chasing = this.state === 'chase';
      this.rage = U.damp(this.rage || 0, chasing ? 1 : 0, 2, dt);
      V.uT.value = g.time; V.uRage.value = this.rage;
      V.uBreath.value = Math.sin(g.time * (chasing ? 5 : 1.6)) * (chasing ? 1.2 : 0.6);
      const gap = Math.sin(open) * V.R * 0.95 + 0.02;
      for (const st of V.strands) { const vis = open > 0.08 && open < 0.62; st.visible = vis; if (vis) { st.scale.y = gap; st.position.y = gap * 0.5 - Math.sin(open * 0.35) * 0.2; } }
      V.tongue.position.y = Math.sin(g.time * 3.1) * 0.03 - open * 0.08; V.tongue.rotation.y = Math.sin(g.time * 1.7) * 0.2; V.tongue.rotation.x = open * 0.4;
      // The eye: rolls and searches when it has lost you, fixes on you when it can see you
      if (V.eyeHolder) {
        const pl = g.player.pos;
        const sees = this.losToPlayer() && this.distToPlayer() < 30;
        for (const [k, h] of [V.eyeHolder, V.eyeHolder2].entries()) {
          if (!h) continue;
          if (sees) h.lookAt(pl.x, pl.y + 1.55, pl.z);
          else h.rotation.set(Math.sin(g.time * 0.9 + k * 0.7) * 0.4, Math.sin(g.time * 0.6 + 1 + k * 1.9) * 0.8, 0);   // they roll separately
        }
        V.eye.rotation.z = Math.sin(g.time * 23) * 0.02 * this.rage;
      }
      // The arms pull it along, hand over hand, and twitch when it stops
      if (V.arms) for (const a of V.arms) {
        const ph = this.chomp * Math.PI + (a.side > 0 ? 0 : Math.PI);
        const reach = moving ? (chasing ? 0.55 : 0.32) : 0.06;
        a.pivot.rotation.x = -0.15 + Math.sin(ph) * reach;
        a.pivot.rotation.z = a.side * (0.12 + Math.max(0, Math.cos(ph)) * 0.1 + Math.sin(g.time * 17 + a.side) * 0.015 * this.rage);
      }
      // Lean into the chase, weave while sniffing
      this.lean = U.damp(this.lean || 0, this.state === 'chase' ? 0.22 : 0, 3, dt);
      this.vis.group.rotation.x = this.lean;
      this.vis.group.rotation.y = sniff ? Math.sin(g.time * 1.3) * 0.5 : U.damp(this.vis.group.rotation.y, 0, 3, dt);
      const side = Math.floor(this.chomp * 2);
      if (side !== this.lastChompSide && moving) {
        this.lastChompSide = side;
        if (g.audio && side % 2 === 0) { const d = this.distToPlayer(); if (d < 45) g.audio.bite({ x: this.pos.x, y: 1.2, z: this.pos.z }, !this.losToPlayer(), U.clamp(1.4 - d / 40, 0.2, 1.4)); }
      }
      const fleeing = this.state === 'flee';
      // Power pellet: the hide goes a sick, bruised blue and its glow dies down
      V.mat.emissive.setHex(fleeing ? 0x0a1840 : 0x3a2400);
      V.mat.color.setHex(fleeing ? 0x7a90c0 : 0xffffff);
      V.light.color.setHex(fleeing ? 0x4060ff : 0xd8a040);
      V.light.intensity = (chasing ? 16 : 10) * (0.85 + Math.sin(this.chomp * 3) * 0.15) * (fleeing ? 0.5 : 1);
      this.mesh.position.set(this.pos.x, 1.2 + Math.sin(this.chomp * 2 * Math.PI) * 0.04, this.pos.z);
      this.mesh.rotation.y = this.heading;
      // Pelletleri ye (labirent)
      if (g.world.pellets) {
        const c = this.cell;
        for (const p of g.world.pellets) if (p.alive && p.cx === c.x && p.cy === c.y) g.world.hidePellet(p.k);
      }
      if (g.audio) {
        const d = this.distToPlayer();
        const k = 'pac:rumble';
        if (!g.audio.loops.has(k)) g.audio.loop(k, 'rumble', { x: this.pos.x, y: 1, z: this.pos.z }, { gain: 0, ref: 4 });
        g.audio.setLoop(k, U.clamp(1 - d / 30, 0, 1) * 0.9, { x: this.pos.x, y: 1, z: this.pos.z }, !this.losToPlayer());
      }
      if (!fleeing && this.state !== 'stunned') this.tryCatch();
    }
    info() { return this.state === 'dormant' ? null : { x: this.pos.x, z: this.pos.z, w: this.state === 'chase' ? 1 : 0.75 }; }
  }

  // ------------------------------------------------------------ Hayalet
  class Ghost extends Entity {
    constructor(game, o) {
      super(game, 'ghost', o);
      this.type = o.ghost;
      this.cfg = GHOST[o.ghost];
      const m = ghostMesh(this.cfg.color, this.type);
      this.vis = m; this.mesh.add(m.group); lit(game, m.group);
      this.ghostly = true;
      this.catchR = 1.1; this.radius = 0.35;
      this.friendly = !!o.friendly;
      this.hostile = !this.friendly;
      this.selfLit = true;
      this.state = this.friendly ? 'friendly' : (this.type === 'amber' ? 'lurk' : 'patrol');
      this.hearMul = this.cfg.hear;
      this.teleT = 8;
      this.loopKeys = ['ghost:' + this.type];
      this.beamT = 0;
      this.maze = !!o.maze;
      this.eatenT = 0;
    }
    onHear(x, z) {
      if (this.type === 'amber') return;
      this.setState('investigate');
    }
    chaseField() {
      // Pembe: oyuncunun baktığı yönde 4 hücre ilerisini hedefler
      if (this.type === 'violet' && this.distToPlayer() > 6) {
        const g = this.g, L = this.L, pl = g.player;
        const fx = -Math.sin(pl.yaw), fz = -Math.cos(pl.yaw);
        let tx = pl.pos.x, tz = pl.pos.z;
        for (let k = 0; k < 12; k++) {
          const nx = tx + fx * 1.5, nz = tz + fz * 1.5;
          if (!L.los(tx, tz, nx, nz)) break;
          tx = nx; tz = nz;
        }
        const c = L.cellOf(tx, tz);
        if (L.passable(c.x, c.y)) { this.setGoal(c.x, c.y); if (this.goalField[L.i(this.cell.x, this.cell.y)] > 0) return this.goalField; }
      }
      // Mavi: kırmızının konumuna göre oyuncunun öbür yanını hedefle (labirentte)
      return this.g.nav.playerField;
    }
    chaseSpeed(sp) {
      let s = sp.speed;
      if (this.type === 'red') s += (this.g.objectivesDone || 0) * 0.12;
      return s;
    }
    update(dt) {
      const g = this.g;
      this.stateT += dt;
      const u = this.vis.uniforms;
      u.uTime.value = g.time;
      const dm = this.dif.speed;
      // Dost hayalet: oyuncuyu uzaktan izler, Yutucu yakınsa titreşir
      if (this.friendly) {
        this.hostile = false;
        const pc = g.nav.playerCell;
        const d = this.distToPlayer();
        u.uFriendly.value = 1; u.uAlpha.value = 0.55 * U.smoothstep(0.9, 2.2, d);
        this.mesh.visible = d > 0.9;
        // Keeps its distance: close enough to be company, never in your face
        const tooClose = d < 1.8 && g.time - (this.awayT || -9) > 2;
        if (tooClose) this.awayT = g.time;
        if (d > 9 || this.stateT > 12 || tooClose) {
          const c = this.randomCellNear(pc.x, pc.y, 2, 5) || pc;
          this.setGoal(c.x, c.y); this.stateT = 0;
        }
        if (this.goalField) this.advance(dt, d > 14 ? 5 : 2.6, this.goalField);
        const pac = g.eater && g.eater.info();
        const warn = pac ? U.clamp(1 - Math.hypot(pac.x - this.pos.x, pac.z - this.pos.z) / 18, 0, 1) : 0;
        // Its glow must never flood the camera when it drifts right next to you
        this.vis.light.intensity = (4 + warn * 14 * (0.5 + 0.5 * Math.sin(g.time * 12))) * U.smoothstep(0.6, 2.8, d);
        // Labirentte dost hayaletler Yutucu’yu kısa süre iter
        if (pac && g.eater.state !== 'stunned' && Math.hypot(pac.x - this.pos.x, pac.z - this.pos.z) < 2.5 && (this.pushT || 0) <= 0) {
          g.eater.frozenT = 2.5; g.eater.setState('stunned'); this.pushT = 20;
          g.ui.subtitle(PB.Story.ghostHelp('danny').replace('DANNY', PB.Story.speaker(this.cfg.name)), 3);
        }
        this.pushT = (this.pushT || 0) - dt;
        this.faceToward(g.player.pos.x, g.player.pos.z, dt, 3);
        this.pose(dt);
        return;
      }
      // Güç hapı: kaç, maviye dön
      if (g.powerT > 0 && this.state !== 'eaten') { if (this.state !== 'flee') this.setState('flee'); u.uFlee.value = g.powerT < 2.5 ? 2 : 1; }
      else if (this.state === 'flee') { this.setState('search'); u.uFlee.value = 0; }
      else u.uFlee.value = 0;
      if (this.state === 'eaten') {
        u.uAlpha.value = 0.12;
        this.eatenT -= dt;
        if (this.eatenT <= 0) { this.setState('patrol'); u.uAlpha.value = 1; }
        this.pose(dt);
        return;
      }
      u.uAlpha.value = 1;
      if (this.type === 'amber') this.amberAI(dt, dm);
      else {
        const sp = { sight: this.cfg.sight, fov: 2.6, speed: this.cfg.speed * dm, patrol: this.cfg.patrol * dm, lose: this.cfg.lose, hunt: this.maze || this.type === 'red', notice: 2.4 };
        if (this.state === 'lurk') this.setState('patrol');
        this.baseAI(dt, sp);
        if (this.type === 'teal') this.tealTeleport(dt);
      }
      // Oyuncu kaçan hayaleti "yer"
      if (this.state === 'flee' && this.distToPlayer() < 1.3) { this.setState('eaten'); this.eatenT = 12; g.onGhostEaten(this); }
      else if (this.state !== 'flee') this.tryCatch();
      this.pose(dt);
      if (g.audio) {
        const k = 'ghost:' + this.type;
        const d = this.distToPlayer();
        if (!g.audio.loops.has(k)) g.audio.loop(k, this.type === 'amber' ? 'shuffle' : 'wail', { x: this.pos.x, y: 1.2, z: this.pos.z }, { gain: 0, pitch: this.cfg.pitch, ref: 3 });
        let gain = U.clamp(1 - d / 32, 0, 1) * (this.state === 'chase' ? 0.55 : 0.28);
        if (this.type === 'amber') gain = this.moving ? U.clamp(1 - d / 20, 0, 1) * 0.8 : 0;
        g.audio.setLoop(k, gain, { x: this.pos.x, y: 1.2, z: this.pos.z }, !this.losToPlayer());
        if (gain > 0.2 && this.type === 'amber') g.audio.caption('amber', PB.t('cap.drag'), { x: this.pos.x, y: 1, z: this.pos.z }, 8);
        else if (gain > 0.15) g.audio.caption('ghost' + this.type, PB.t('cap.moan'), { x: this.pos.x, y: 1, z: this.pos.z }, 12);
      }
    }
    pose(dt) {
      const g = this.g;
      // The hem drags on the floor; the body rises and settles a little as it moves
      this.mesh.position.set(this.pos.x, 0.015 + Math.abs(Math.sin(g.time * 1.3 + this.pos.x)) * 0.03, this.pos.z);
      this.mesh.rotation.y = this.heading;
      // The glint in the eye holes turns to follow you
      const p = g.player.pos;
      const local = new THREE.Vector3(p.x, 1.6, p.z);
      this.mesh.worldToLocal(local);
      local.sub(new THREE.Vector3(0, 1.305, 0)).normalize();
      for (const e of this.vis.eyes) e.p.position.set(local.x * 0.018, local.y * 0.014, Math.max(0, local.z) * 0.01);
    }
    tealTeleport(dt) {
      this.teleT -= dt;
      if (this.teleT > 0 || this.state === 'chase' && this.losToPlayer()) return;
      this.teleT = 9 + Math.random() * 7;
      const pc = this.g.nav.playerCell;
      const c = this.randomCellNear(pc.x, pc.y, 7, 13, true);
      if (!c) return;
      this.placeCell(c.x, c.y);
      if (this.state === 'patrol') this.setState('investigate'), this.lastKnown = { x: this.g.player.pos.x, z: this.g.player.pos.z };
      if (this.g.audio) { this.g.audio.loop('inkyWhisper', 'whisper', { x: this.pos.x, y: 1.5, z: this.pos.z }, { gain: 0.5 }); setTimeout(() => this.g.audio && this.g.audio.stopLoop('inkyWhisper', 1), 2200); this.g.audio.caption('whisper', PB.t('cap.whisper'), { x: this.pos.x, y: 1, z: this.pos.z }, 6); }
    }
    // Turuncu: bakıldığında donar, bakılmadığında hızla yaklaşır, fenere uzun süre tutulursa kaçar
    amberAI(dt, dm) {
      const g = this.g;
      const obs = this.observed();
      this.moving = false;
      if (this.state === 'lurk' || this.state === 'patrol') {
        const d = this.distToPlayer();
        if (d < 30 || this.stateT > 20) this.setState('stalk');
        return;
      }
      if (this.state === 'retreat') {
        if (this.stateT > 12) this.setState('stalk');
        return;
      }
      if (obs) {
        if (!this.wasObserved) { g.onAmberSeen(this); }
        this.wasObserved = true;
        if (this.inFlashBeam(8)) { this.beamT += dt; if (this.beamT > 1.6) { this.retreat(); } }
        else this.beamT = Math.max(0, this.beamT - dt);
        return;
      }
      this.wasObserved = false;
      this.beamT = Math.max(0, this.beamT - dt * 0.5);
      this.moving = true;
      this.advance(dt, this.cfg.speed * dm, g.nav.playerField);
      this.faceToward(g.player.pos.x, g.player.pos.z, dt, 10);
      this.tryCatch();
    }
    retreat() {
      const pc = this.g.nav.playerCell;
      const c = this.randomCellNear(pc.x, pc.y, 16, 26, true);
      if (c) this.placeCell(c.x, c.y);
      this.setState('retreat');
      this.beamT = 0;
      if (this.g.audio) this.g.audio.stinger('spot');
      this.g.ui.subtitle(PB.Story.ghostHelp('amberWatch'), 3);
    }
    makeFriendly() {
      this.friendly = true; this.hostile = false;
      this.setState('friendly');
      if (this.g.audio) this.g.audio.stopLoop('ghost:' + this.type, 1);
    }
  }

  // ------------------------------------------------------------ Sırıtkan
  class Grinner extends Entity {
    constructor(game, o) {
      super(game, 'grinner', o);
      const m = grinnerMesh();
      this.vis = m; this.mesh.add(m.group); lit(game, m.group);
      this.catchR = 1.0; this.radius = 0;
      this.state = 'lurk';
      this.fade = 1;
      this.respawnT = 0;
      this.loopKeys = ['grin:' + this.id];
      this.selfLit = true;
    }
    update(dt) {
      const g = this.g;
      this.stateT += dt;
      if (this.state === 'gone') {
        this.respawnT -= dt; this.mesh.visible = false;
        if (this.respawnT <= 0) { this.spawnAway(); this.setState('lurk'); }
        if (g.audio) g.audio.setLoop(this.loopKeys[0], 0);
        return;
      }
      this.mesh.visible = true;
      const lit = g.world.lightAt(this.pos.x, this.pos.z);
      if (lit > 0.6) { this.dissolve(); return; }
      const d = this.distToPlayer();
      const beam = this.inFlashBeam(11);
      if (beam) { this.fade -= dt * 1.4; if (this.fade <= 0) { this.dissolve(); return; } }
      else this.fade = Math.min(1, this.fade + dt * 0.5);
      if (g.powerT > 0) this.advance(dt, 3, g.nav.playerField, true);
      else if (d < 16 && !beam) { this.advance(dt, 3.1 * this.dif.speed, g.nav.playerField); this.tryCatch(); }
      else if (!beam) {
        if (!this.goal || this.arrived || this.stateT > 20) { const c = this.randomCellNear(this.cell.x, this.cell.y, 3, 10) || this.cell; this.setGoal(c.x, c.y); this.arrived = false; this.stateT = 0; }
        this.arrived = this.advance(dt, 1.6, this.goalField);
      }
      this.faceToward(g.player.pos.x, g.player.pos.z, dt, 5);
      this.mesh.position.set(this.pos.x, 1.55 + Math.sin(g.time * 1.3 + this.pos.z) * 0.1, this.pos.z);
      this.mesh.rotation.y = this.heading;
      const vis = U.clamp(1 - lit * 2, 0, 1) * this.fade;
      for (const m of this.vis.mats) m.opacity = vis;
      if (g.audio) {
        const k = this.loopKeys[0];
        if (!g.audio.loops.has(k)) g.audio.loop(k, 'giggle', { x: this.pos.x, y: 1.5, z: this.pos.z }, { gain: 0, ref: 2 });
        g.audio.setLoop(k, U.clamp(1 - d / 18, 0, 1) * 0.25 * vis, { x: this.pos.x, y: 1.5, z: this.pos.z }, !this.losToPlayer());
        if (d < 12 && vis > 0.3) g.audio.caption('grin', PB.t('cap.giggle'), { x: this.pos.x, y: 1.5, z: this.pos.z }, 10);
      }
    }
    dissolve() { this.setState('gone'); this.respawnT = 18 + Math.random() * 12; this.fade = 1; }
    spawnAway() {
      const pc = this.g.nav.playerCell;
      const c = this.randomCellNear(pc.x, pc.y, 14, 26, true);
      if (c) this.placeCell(c.x, c.y);
    }
  }

  // ------------------------------------------------------------ Sayaç
  class Watcher extends Entity {
    constructor(game, o) {
      super(game, 'watcher', o);
      const m = watcherMesh();
      this.vis = m; this.mesh.add(m.group); lit(game, m.group);
      this.catchR = 2.2; this.radius = 0;
      this.state = 'wait';
      this.unseenT = 0; this.jumps = 0;
      this.loopKeys = ['watch:' + this.id];
      this.mesh.visible = false;
      this.nextAppear = 30 + Math.random() * 30;
      this.selfLit = false;
    }
    update(dt) {
      const g = this.g;
      this.stateT += dt;
      if (this.state === 'wait') {
        this.mesh.visible = false;
        if (g.audio) g.audio.setLoop(this.loopKeys[0], 0);
        if (this.stateT > this.nextAppear) this.appear();
        return;
      }
      this.mesh.visible = true;
      const d = this.distToPlayer();
      const obs = this.observed();
      if (obs) {
        this.unseenT = 0;
        g.fearAdd(d < 14 ? 16 * dt : 6 * dt);
        g.flashInterference = Math.max(g.flashInterference, U.clamp(1 - d / 20, 0, 1));
        if (!this.announced) { this.announced = true; g.onWatcherSeen(this); }
        if (this.stateT > 18 && d > 10) this.vanish();
      } else {
        this.unseenT += dt;
        if (this.unseenT > 2.2) { this.unseenT = 0; this.stepCloser(); }
      }
      if (g.powerT > 0) this.vanish();
      this.faceToward(g.player.pos.x, g.player.pos.z, dt, 20);
      this.mesh.position.set(this.pos.x, 0, this.pos.z);
      this.mesh.rotation.y = this.heading;
      // While watched it twitches: sudden head jerks and finger flexes
      if (this.vis.head) {
        this.twT = (this.twT || 0) - dt;
        if (obs && this.twT <= 0) { this.twT = 0.4 + Math.random() * 1.6; this.twHead = (Math.random() - 0.5) * 0.9; this.twF = Math.random(); }
        this.vis.head.rotation.z = U.damp(this.vis.head.rotation.z, 0.35 + (this.twHead || 0), 30, dt);
        for (const a of this.vis.arms) a.hand.rotation.x = U.damp(a.hand.rotation.x, (this.twF || 0) * 0.5, 20, dt);
      }
      if (d < this.catchR && this.losToPlayer() && !g.player.hidden) g.killPlayer(this);
      if (g.audio) {
        const k = this.loopKeys[0];
        if (!g.audio.loops.has(k)) g.audio.loop(k, 'tinnitus', null, { gain: 0, bus: 'sfx', rev: 0 });
        g.audio.setLoop(k, obs ? U.clamp(1 - d / 25, 0, 1) * 0.35 : 0);
      }
    }
    appear() {
      const pc = this.g.nav.playerCell;
      const L = this.L;
      // Oyuncunun görebileceği uzak bir koridor sonu
      let best = null;
      for (let t = 0; t < 80; t++) {
        const c = this.randomCellNear(pc.x, pc.y, 6, 11);
        if (!c) continue;
        if (L.los(L.cx(c.x), L.cz(c.y), this.g.player.pos.x, this.g.player.pos.z)) { best = c; break; }
      }
      if (!best) { this.stateT = 0; this.nextAppear = 10; return; }
      this.placeCell(best.x, best.y);
      this.setState('stand');
      this.jumps = 0; this.announced = false;
    }
    stepCloser() {
      const g = this.g, L = this.L;
      const f = g.nav.playerField;
      const cur = f[L.i(this.cell.x, this.cell.y)];
      if (cur < 0) { this.vanish(); return; }
      // Mesafeyi yarıya indiren, oyuncunun şu an görmediği bir hücre
      const target = Math.max(1, Math.floor(cur / 2));
      let best = null;
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
        const v = f[L.i(x, y)];
        if (v !== target && v !== target + 1) continue;
        best = { x, y };
        if (!this.g.camera || Math.random() < 0.3) break;
      }
      if (best) this.placeCell(best.x, best.y);
      this.jumps++;
      if (this.jumps > 6) this.vanish();
    }
    vanish() { this.setState('wait'); this.nextAppear = 40 + Math.random() * 40; this.mesh.visible = false; }
  }

  // ------------------------------------------------------------ Gezinme yardımcısı
  class Nav {
    constructor(game) { this.g = game; this.L = game.level; this.playerCell = { x: -1, y: -1 }; this.playerField = null; }
    update() {
      const p = this.g.player.pos, c = this.L.cellOf(p.x, p.z);
      if (!this.L.inb(c.x, c.y)) return;
      if (c.x !== this.playerCell.x || c.y !== this.playerCell.y || this.dirty) {
        this.playerCell = c;
        this.playerField = this.L.bfs(c.x, c.y, 'nav', this.playerField);
        this.dirty = false;
      }
    }
  }

  PB.Entities = { Eater, Ghost, Grinner, Watcher, Nav, GHOST, lit };
})(typeof window !== 'undefined' ? window : globalThis);
