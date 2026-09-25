/* Yaratıklar ve yapay zekâ: Yutucu (Pacman), dört hayalet, Sırıtkanlar ve Sayaç.
   Izgara üzerinde akış alanıyla yol bulma, görme/duyma algısı, durum makineleri. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U;
  const { DX, DY } = PB.LevelGen;

  const GHOST = {
    blinky: { name: 'billy', color: 0xff2a2a, pitch: 300, speed: 3.9, patrol: 2.2, lose: 7, sight: 26, hear: 1.2 },
    pinky: { name: 'penny', color: 0xff8fd8, pitch: 390, speed: 3.75, patrol: 2.1, lose: 5, sight: 24, hear: 1.0 },
    inky: { name: 'ivy', color: 0x39e6ff, pitch: 350, speed: 3.4, patrol: 2.0, lose: 4, sight: 22, hear: 1.3 },
    clyde: { name: 'clyde', color: 0xffae3b, pitch: 250, speed: 5.3, patrol: 0, lose: 99, sight: 40, hear: 0.6 },
  };

  // ------------------------------------------------------------ görseller
  // The Eater: breathing, lumpy skin; wet gums, tongue, uneven yellowed teeth and saliva strands
  function pacmanMesh(game) {
    const g = new THREE.Group();
    const R = 1.15;
    const skin = PB.Tex.canvas('pacSkin', 1024, 512, (c, w, h) => {
      c.fillStyle = '#f2c21a'; c.fillRect(0, 0, w, h);
      const r = U.rng(5);
      for (let k = 0; k < 5000; k++) { c.fillStyle = `rgba(${150 + r() * 80},${70 + r() * 60},0,${r() * 0.14})`; c.beginPath(); c.arc(r() * w, r() * h, r.range(1, 8), 0, 6.28); c.fill(); }
      for (let k = 0; k < 60; k++) { const grd = c.createRadialGradient(0, 0, 0, 0, 0, 40); c.save(); c.translate(r() * w, r() * h); grd.addColorStop(0, 'rgba(200,90,20,0.25)'); grd.addColorStop(1, 'rgba(200,90,20,0)'); c.fillStyle = grd; c.fillRect(-40, -40, 80, 80); c.restore(); }
      c.strokeStyle = 'rgba(150,40,20,0.45)';
      for (let v = 0; v < 40; v++) {
        let x = r() * w, y = r() * h; c.lineWidth = r.range(1, 3); c.beginPath(); c.moveTo(x, y);
        for (let s2 = 0; s2 < 24; s2++) { x += r.range(-16, 16); y += r.range(-9, 9); c.lineTo(x, y); if (r() < 0.1) { c.stroke(); c.lineWidth *= 0.6; c.beginPath(); c.moveTo(x, y); } }
        c.stroke();
      }
    });
    const bump = PB.Tex.canvas('pacBump', 512, 256, (c, w, h) => {
      c.fillStyle = '#808080'; c.fillRect(0, 0, w, h);
      const r = U.rng(9);
      for (let k = 0; k < 900; k++) { const v = 110 + r() * 60 | 0; c.fillStyle = `rgba(${v},${v},${v},0.35)`; c.beginPath(); c.arc(r() * w, r() * h, r.range(1, 6), 0, 6.28); c.fill(); }
    });
    const uT = { value: 0 }, uBreath = { value: 0 };
    const mat = new THREE.MeshStandardMaterial({ map: skin, bumpMap: bump, bumpScale: 2.5, color: 0xffffff, roughness: 0.28, metalness: 0, emissive: 0xffa800, emissiveIntensity: 0.4, side: THREE.DoubleSide });
    mat.onBeforeCompile = sh => {
      sh.uniforms.uT = uT; sh.uniforms.uBreath = uBreath;
      sh.vertexShader = 'uniform float uT; uniform float uBreath;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        float lump = sin(position.x * 7.0 + uT * 1.3) * sin(position.y * 6.0 - uT * 0.9) * sin(position.z * 8.0 + uT * 1.1);
        transformed += normal * (lump * 0.035 + uBreath * 0.045);`);
    };
    mat.customProgramCacheKey = () => 'pac-skin';
    const upper = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2), mat);
    const lower = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), mat);
    upper.castShadow = lower.castShadow = true;
    // Mouth interior: wet gums, a dark throat and a tongue
    const gum = new THREE.MeshStandardMaterial({ color: 0x6a0c14, roughness: 0.18, metalness: 0, emissive: 0x250004, emissiveIntensity: 0.6 });
    gum.userData.refl = 0.3;
    const innerU = new THREE.Mesh(new THREE.SphereGeometry(R * 0.955, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), gum);
    const innerL = new THREE.Mesh(new THREE.SphereGeometry(R * 0.955, 40, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), gum);
    innerU.material.side = THREE.BackSide;
    const throat = new THREE.Mesh(new THREE.CircleGeometry(R * 0.55, 24), new THREE.MeshBasicMaterial({ color: 0x020000 }));
    throat.position.set(0, 0, -R * 0.2);
    const tongueMat = new THREE.MeshStandardMaterial({ color: 0x9a2030, roughness: 0.2, emissive: 0x300008, emissiveIntensity: 0.5 });
    const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 12), tongueMat);
    tongue.scale.set(1.1, 0.28, 1.5); tongue.position.set(0, -0.12, 0.25);
    const teethMat = new THREE.MeshStandardMaterial({ color: 0xe6d8a8, roughness: 0.35, emissive: 0x2a2010, emissiveIntensity: 0.35 });
    const tr = U.rng(17);
    const addTeeth = (jaw, down) => {
      for (const row of [0, 1]) for (let k = -7; k <= 7; k++) {
        if (tr() < 0.08) continue;
        const a = (k + (row ? 0.5 : 0)) / 7 * 1.35, rr = R * (0.93 - row * 0.1);
        const len = tr.range(0.12, 0.34) * (row ? 0.7 : 1), wdt = tr.range(0.04, 0.085);
        const tooth = new THREE.Mesh(new THREE.ConeGeometry(wdt, len, 5), teethMat);
        tooth.position.set(Math.sin(a) * rr, (down ? 1 : -1) * (len / 2 - 0.02), Math.cos(a) * rr);
        tooth.rotation.set(down ? 0 : Math.PI, 0, (tr() - 0.5) * 0.35);
        tooth.rotation.x += (down ? -1 : 1) * (tr() - 0.5) * 0.3;
        jaw.add(tooth);
      }
    };
    const up = new THREE.Group(), lo = new THREE.Group();
    up.add(upper, innerU); lo.add(lower, innerL, tongue);
    addTeeth(up, false); addTeeth(lo, true);
    // Saliva strands stretched between the jaws
    const spit = new THREE.MeshStandardMaterial({ color: 0xd8e0d0, roughness: 0.05, transparent: true, opacity: 0.55, depthWrite: false });
    const strands = [];
    for (let k = 0; k < 5; k++) {
      const a = (k - 2) * 0.32 + tr.range(-0.1, 0.1);
      const sgeo = new THREE.CylinderGeometry(0.008 + tr() * 0.01, 0.006, 1, 5, 4);
      const pa = sgeo.attributes.position; for (let i = 0; i < pa.count; i++) { const y = pa.getY(i); pa.setX(i, pa.getX(i) * (1 - Math.abs(y) * 0.7)); pa.setZ(i, pa.getZ(i) + (0.25 - y * y) * 0.2); }
      sgeo.computeVertexNormals();
      const m = new THREE.Mesh(sgeo, spit);
      m.position.set(Math.sin(a) * R * 0.78, 0, Math.cos(a) * R * 0.78);
      m.userData.a = a;
      g.add(m); strands.push(m);
    }
    g.add(up, lo, throat);
    const light = new THREE.PointLight(0xffc830, 30, 20, 1.6);
    light.position.set(0, 0.2, 0.6);
    g.add(light);
    return { group: g, up, lo, light, mat, R, uT, uBreath, strands, tongue };
  }

  const GHOST_VERT = `
    uniform float uTime; varying vec3 vN; varying vec3 vV; varying float vY; varying vec3 vP;
    void main(){
      vec3 p = position;
      vP = position;
      float skirt = smoothstep(0.35, -0.95, p.y);
      float a = atan(p.z, p.x);
      p.y += sin(a * 6.0 + uTime * 5.0) * 0.12 * skirt;
      p.xz *= 1.0 + sin(a * 3.0 - uTime * 2.0) * 0.05 * skirt;
      vY = p.y;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      vN = normalize(normalMatrix * normal); vV = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }`;
  const GHOST_FRAG = `
    uniform vec3 uColor; uniform float uAlpha; uniform float uTime; uniform float uFlee; uniform float uFriendly;
    varying vec3 vN; varying vec3 vV; varying float vY; varying vec3 vP;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
    float h3(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
    float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
                 mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z); }
    void main(){
      float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
      float wisp = n3(vP * 3.0 + vec3(0.0, -uTime * 0.9, uTime * 0.3)) * 0.6 + n3(vP * 7.0 + vec3(uTime * 0.5, -uTime * 1.6, 0.0)) * 0.4;
      vec3 flee = mix(vec3(0.08, 0.12, 1.3), vec3(1.4), step(0.5, fract(uTime * 3.5)) * step(1.5, uFlee));
      vec3 base = mix(uColor, flee, step(0.5, uFlee));
      vec3 col = base * (0.55 + fres * 2.4);
      col = mix(col, base * 0.8 + vec3(0.3), uFriendly * 0.3);
      float n = hash(floor(gl_FragCoord.xy * 0.5) + floor(uTime * 20.0));
      col *= 0.75 + wisp * 0.5;
      float a = uAlpha * (0.45 + fres * 0.55) * smoothstep(-1.1, -0.45 - wisp * 0.4, vY) * (0.6 + wisp * 0.55) * (0.88 + n * 0.12);
      gl_FragColor = vec4(col, a);
    }`;
  function ghostMesh(color) {
    const g = new THREE.Group();
    const pts = [];
    for (let k = 0; k <= 12; k++) { const a = k / 12 * Math.PI / 2; pts.push(new THREE.Vector2(Math.cos(a) * 0.72 + 0.001, 0.35 + Math.sin(a) * 0.72)); }
    pts.reverse();
    pts.push(new THREE.Vector2(0.74, -0.2), new THREE.Vector2(0.76, -0.9), new THREE.Vector2(0.7, -1.0));
    const geo = new THREE.LatheGeometry(pts, 40);
    const uniforms = { uColor: { value: new THREE.Color(color).multiplyScalar(1.2) }, uAlpha: { value: 0.85 }, uTime: { value: 0 }, uFlee: { value: 0 }, uFriendly: { value: 0 } };
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: GHOST_VERT, fragmentShader: GHOST_FRAG, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    const body = new THREE.Mesh(geo, mat);
    g.add(body);
    const eyeW = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.01, 0.01, 0.015), transparent: true, opacity: 0.92 });
    const eyeP = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2.6).add(new THREE.Color(0.6, 0.6, 0.6)) });
    const eyes = [];
    for (const sx of [-0.26, 0.26]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), eyeW);
      e.scale.set(0.8, 1.3, 0.45);
      e.position.set(sx, 0.6, 0.6);
      e.rotation.z = sx * 0.5;
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), eyeP);
      p.position.set(0, -0.02, 0.1);
      e.add(p);
      g.add(e);
      eyes.push({ e, p });
    }
    const light = new THREE.PointLight(color, 6, 9, 2);
    light.position.set(0, 0.4, 0);
    g.add(light);
    return { group: g, body, mat, uniforms, eyes, light };
  }
  function grinnerMesh() {
    const g = new THREE.Group();
    const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 2.5, 2.2), transparent: true, opacity: 1, depthWrite: false });
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.45, 0.1, 0), new THREE.Vector3(0, -0.28, 0.08), new THREE.Vector3(0.45, 0.1, 0));
    const smile = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.035, 6, false), m);
    g.add(smile);
    for (let k = 0; k < 11; k++) {
      const p = curve.getPoint(0.05 + k * 0.09);
      const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.1, 0.02), m);
      tooth.position.set(p.x, p.y + 0.05, p.z);
      g.add(tooth);
    }
    const eyeM = new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 3, 2.6), transparent: true, depthWrite: false });
    for (const sx of [-0.22, 0.22]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), eyeM); e.position.set(sx, 0.42, 0); g.add(e); }
    return { group: g, mats: [m, eyeM] };
  }
  // The Counter: too tall, too thin, long hanging fingers, head tilted; skin like wet tar
  function watcherMesh() {
    const g = new THREE.Group();
    const m = new THREE.MeshStandardMaterial({ color: 0x040404, roughness: 0.38, metalness: 0.1 });
    m.userData.refl = 0.1;
    const part = (geo, x, y, z, rx = 0, rz = 0, ry = 0) => { const p = new THREE.Mesh(geo, m); p.position.set(x, y, z); p.rotation.set(rx, ry, rz); p.castShadow = true; g.add(p); return p; };
    part(new THREE.CapsuleGeometry(0.17, 1.2, 6, 12), 0, 2.15, 0).scale.set(1, 1, 0.7);
    const ribs = new THREE.CapsuleGeometry(0.2, 0.35, 4, 12); part(ribs, 0, 2.45, 0.02).scale.set(1.05, 1, 0.75);
    part(new THREE.CapsuleGeometry(0.05, 0.12, 4, 8), 0, 2.98, 0.02);
    const head = part(new THREE.SphereGeometry(0.17, 20, 14), 0.06, 3.18, 0.04, 0.1, 0.35);
    head.scale.set(0.85, 1.35, 0.95);
    const jaw = part(new THREE.SphereGeometry(0.1, 12, 8), 0.1, 3.02, 0.1, 0.4, 0.35); jaw.scale.set(0.9, 0.7, 1);
    const arms = [];
    for (const sx of [-1, 1]) {
      const sh = sx * 0.27;
      part(new THREE.SphereGeometry(0.07, 10, 8), sh, 2.72, 0);
      const up = part(new THREE.CapsuleGeometry(0.045, 0.8, 4, 8), sh + sx * 0.03, 2.25, 0.02, 0, -sx * 0.05);
      const lo = part(new THREE.CapsuleGeometry(0.038, 0.85, 4, 8), sh + sx * 0.07, 1.4, 0.06, 0.08, -sx * 0.04);
      const hand = new THREE.Group(); hand.position.set(sh + sx * 0.09, 0.9, 0.09); g.add(hand);
      for (let f = 0; f < 4; f++) { const fg = new THREE.Mesh(new THREE.CapsuleGeometry(0.011, 0.28 + f % 2 * 0.06, 3, 6), m); fg.position.set((f - 1.5) * 0.022, -0.18, (f % 2) * 0.01); fg.rotation.z = (f - 1.5) * 0.06; hand.add(fg); }
      arms.push({ up, lo, hand });
    }
    for (const sx of [-1, 1]) {
      part(new THREE.CapsuleGeometry(0.065, 0.9, 4, 8), sx * 0.11, 1.05, 0);
      part(new THREE.CapsuleGeometry(0.05, 0.9, 4, 8), sx * 0.12, 0.45, -0.02);
      part(new THREE.SphereGeometry(0.06, 8, 6), sx * 0.12, 0.03, 0.06).scale.set(0.8, 0.4, 1.8);
    }
    return { group: g, mat: m, head, arms };
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
      this.cell = { x, y }; this.next = null;
      this.pos.set(this.L.cx(x), 0, this.L.cz(y));
      this.mesh.position.copy(this.pos);
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
      for (const o of U.rng(L.shuffleSeed + i).shuffle(opts)) {
        if (flee ? o.v > bestV : o.v < bestV) { bestV = o.v; best = o; }
      }
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
      const tx = L.cx(this.next.x), tz = L.cz(this.next.y);
      const dx = tx - this.pos.x, dz = tz - this.pos.z, d = Math.hypot(dx, dz);
      const stepLen = speed * dt;
      if (d <= stepLen || d < 0.02) {
        this.pos.x = tx; this.pos.z = tz;
        this.cell = { x: this.next.x, y: this.next.y };
        this.next = null;
        return field[L.i(this.cell.x, this.cell.y)] === 0 && !flee;
      }
      this.pos.x += dx / d * stepLen; this.pos.z += dz / d * stepLen;
      this.heading = U.angleDamp(this.heading, Math.atan2(dx, dz), 8, dt);
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
        if (!L.passable(x, y) || L.floorType[L.i(x, y)] === 1 && this.kind === 'pacman') continue;
        const f = this.g.nav.playerField;
        if (f && f[L.i(x, y)] < 0) continue;
        if (avoidPlayerLos && L.los(L.cx(x), L.cz(y), this.g.player.pos.x, this.g.player.pos.z)) continue;
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
            const bias = sp.hunt ? this.randomCellNear(pc.x, pc.y, 6, 16, true) : null;
            const c = bias || this.randomCellNear(this.cell.x, this.cell.y, 5, 18) || { x: this.cell.x, y: this.cell.y };
            this.setGoal(c.x, c.y); this.arrived = false; this.stateT = 0;
          }
          this.arrived = this.advance(dt, sp.patrol, this.goalField);
          break;
        }
        case 'investigate': {
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
          if (d < 2.6 && los) { const p = g.player.pos; const k = Math.min(1, (sp.speed * dt) / Math.max(d, 0.01)); this.pos.x += (p.x - this.pos.x) * k * 0.5; this.pos.z += (p.z - this.pos.z) * k * 0.5; this.cell = L.cellOf(this.pos.x, this.pos.z); this.next = null; }
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
  class Pacman extends Entity {
    constructor(game, o) {
      super(game, 'pacman', o);
      const m = pacmanMesh(game);
      this.vis = m; this.mesh.add(m.group);
      this.catchR = 1.55;
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
      this.vis.up.rotation.x = -open; this.vis.lo.rotation.x = open * 0.35;
      // Breathing skin, drooling strands that stretch with the jaw, tongue working
      this.vis.uT.value = g.time; this.vis.uBreath.value = Math.sin(g.time * (this.state === 'chase' ? 5 : 1.6)) * (this.state === 'chase' ? 1.2 : 0.6);
      const gap = Math.sin(open) * this.vis.R * 0.95 + 0.02;
      for (const st of this.vis.strands) { const vis = open > 0.08 && open < 0.62; st.visible = vis; if (vis) { st.scale.y = gap; st.position.y = gap * 0.5 - Math.sin(open * 0.35) * 0.2; } }
      this.vis.tongue.position.y = -0.12 + Math.sin(g.time * 3.1) * 0.03; this.vis.tongue.rotation.y = Math.sin(g.time * 1.7) * 0.2;
      // Lean into the chase, weave while sniffing
      this.lean = U.damp(this.lean || 0, this.state === 'chase' ? 0.22 : 0, 3, dt);
      this.vis.group.rotation.x = this.lean;
      this.vis.group.rotation.y = sniff ? Math.sin(g.time * 1.3) * 0.5 : U.damp(this.vis.group.rotation.y, 0, 3, dt);
      const side = Math.floor(this.chomp * 2);
      if (side !== this.lastChompSide && moving) {
        this.lastChompSide = side;
        if (g.audio && side % 2 === 0) { const d = this.distToPlayer(); if (d < 45) g.audio.waka({ x: this.pos.x, y: 1.2, z: this.pos.z }, !this.losToPlayer(), U.clamp(1.4 - d / 40, 0.2, 1.4)); }
      }
      const fleeing = this.state === 'flee';
      this.vis.mat.emissive.setHex(fleeing ? 0x2040ff : 0xffa800);
      this.vis.mat.color.setHex(fleeing ? 0x8fb0ff : 0xffffff);
      this.vis.light.color.setHex(fleeing ? 0x4060ff : 0xffc830);
      this.vis.light.intensity = (this.state === 'chase' ? 45 : 28) * (0.85 + Math.sin(this.chomp * 3) * 0.15);
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
      const m = ghostMesh(this.cfg.color);
      this.vis = m; this.mesh.add(m.group);
      this.ghostly = true;
      this.catchR = 1.1;
      this.friendly = !!o.friendly;
      this.hostile = !this.friendly;
      this.selfLit = true;
      this.state = this.friendly ? 'friendly' : (this.type === 'clyde' ? 'lurk' : 'patrol');
      this.hearMul = this.cfg.hear;
      this.teleT = 8;
      this.loopKeys = ['ghost:' + this.type];
      this.beamT = 0;
      this.maze = !!o.maze;
      this.eatenT = 0;
    }
    onHear(x, z) {
      if (this.type === 'clyde') return;
      this.setState('investigate');
    }
    chaseField() {
      // Pembe: oyuncunun baktığı yönde 4 hücre ilerisini hedefler
      if (this.type === 'pinky' && this.distToPlayer() > 6) {
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
      if (this.type === 'blinky') s += (this.g.objectivesDone || 0) * 0.12;
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
        const pac = g.pacman && g.pacman.info();
        const warn = pac ? U.clamp(1 - Math.hypot(pac.x - this.pos.x, pac.z - this.pos.z) / 18, 0, 1) : 0;
        // Its glow must never flood the camera when it drifts right next to you
        this.vis.light.intensity = (4 + warn * 14 * (0.5 + 0.5 * Math.sin(g.time * 12))) * U.smoothstep(0.6, 2.8, d);
        // Labirentte dost hayaletler Yutucu’yu kısa süre iter
        if (pac && g.pacman.state !== 'stunned' && Math.hypot(pac.x - this.pos.x, pac.z - this.pos.z) < 2.5 && (this.pushT || 0) <= 0) {
          g.pacman.frozenT = 2.5; g.pacman.setState('stunned'); this.pushT = 20;
          g.ui.subtitle(PB.Story.ghostHelp('billy').replace('BILLY', PB.Story.speaker(this.cfg.name)), 3);
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
        if (this.eatenT <= 0) { this.setState('patrol'); u.uAlpha.value = 0.85; }
        this.pose(dt);
        return;
      }
      u.uAlpha.value = 0.85;
      if (this.type === 'clyde') this.clydeAI(dt, dm);
      else {
        const sp = { sight: this.cfg.sight, fov: 2.6, speed: this.cfg.speed * dm, patrol: this.cfg.patrol * dm, lose: this.cfg.lose, hunt: this.maze || this.type === 'blinky', notice: 2.4 };
        if (this.state === 'lurk') this.setState('patrol');
        this.baseAI(dt, sp);
        if (this.type === 'inky') this.inkyTeleport(dt);
      }
      // Oyuncu kaçan hayaleti "yer"
      if (this.state === 'flee' && this.distToPlayer() < 1.3) { this.setState('eaten'); this.eatenT = 12; g.onGhostEaten(this); }
      else if (this.state !== 'flee') this.tryCatch();
      this.pose(dt);
      if (g.audio) {
        const k = 'ghost:' + this.type;
        const d = this.distToPlayer();
        if (!g.audio.loops.has(k)) g.audio.loop(k, this.type === 'clyde' ? 'shuffle' : 'wail', { x: this.pos.x, y: 1.2, z: this.pos.z }, { gain: 0, pitch: this.cfg.pitch, ref: 3 });
        let gain = U.clamp(1 - d / 32, 0, 1) * (this.state === 'chase' ? 0.55 : 0.28);
        if (this.type === 'clyde') gain = this.moving ? U.clamp(1 - d / 20, 0, 1) * 0.8 : 0;
        g.audio.setLoop(k, gain, { x: this.pos.x, y: 1.2, z: this.pos.z }, !this.losToPlayer());
        if (gain > 0.2 && this.type === 'clyde') g.audio.caption('clyde', PB.t('cap.drag'), { x: this.pos.x, y: 1, z: this.pos.z }, 8);
        else if (gain > 0.15) g.audio.caption('ghost' + this.type, PB.t('cap.moan'), { x: this.pos.x, y: 1, z: this.pos.z }, 12);
      }
    }
    pose(dt) {
      const g = this.g;
      this.mesh.position.set(this.pos.x, 1.05 + Math.sin(g.time * 2 + this.pos.x) * 0.08, this.pos.z);
      this.mesh.rotation.y = this.heading;
      // Gözler oyuncuya bakar
      const p = g.player.pos;
      const local = new THREE.Vector3(p.x, 1.6, p.z);
      this.mesh.worldToLocal(local);
      local.normalize();
      for (const e of this.vis.eyes) e.p.position.set(local.x * 0.1, local.y * 0.08 + 0.01, 0.1);
    }
    inkyTeleport(dt) {
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
    clydeAI(dt, dm) {
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
        if (!this.wasObserved) { g.onClydeSeen(this); }
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
      this.g.ui.subtitle(PB.Story.ghostHelp('clydeWatch'), 3);
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
      this.vis = m; this.mesh.add(m.group);
      this.catchR = 1.0;
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
      this.vis = m; this.mesh.add(m.group);
      this.catchR = 2.2;
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

  PB.Entities = { Pacman, Ghost, Grinner, Watcher, Nav, GHOST };
})(typeof window !== 'undefined' ? window : globalThis);
