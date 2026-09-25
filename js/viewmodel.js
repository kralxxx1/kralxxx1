/* First-person hands: the right hand grips the flashlight, the left hand raises the
   walkie-talkie while Eddie talks. Bob, look sway with inertia, sprint and crouch poses,
   a reach when using something, and pulling back near walls so nothing clips. */
(function (root) {
  'use strict';
  const PB = root.PB;
  const THREE = root.THREE;
  const U = PB.U, P = PB.Props;
  const H = Math.PI / 2;

  function mats() {
    const skin = new THREE.MeshStandardMaterial({ color: 0xc08d72, roughness: 0.62, metalness: 0 });
    const sleeve = new THREE.MeshStandardMaterial({ color: 0x2a3140, roughness: 0.9, metalness: 0 });
    const cuff = new THREE.MeshStandardMaterial({ color: 0x1c212c, roughness: 0.95 });
    const black = new THREE.MeshStandardMaterial({ color: 0x0d0d0f, roughness: 0.4, metalness: 0.3 });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xcfd2d6, roughness: 0.15, metalness: 1 });
    const rubber = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.85 });
    const lens = new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.9, 2.6) });
    const red = new THREE.MeshStandardMaterial({ color: 0xa01010, roughness: 0.4 });
    const lcd = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 1.2, 0.5) });
    return { skin, sleeve, cuff, black, chrome, rubber, lens, red, lcd };
  }
  // Fingers curled around a cylinder along -z (radius rr, centered at cx, cy)
  function grip(side, cx, cy, z0, rr) {
    const s = [];
    for (let k = 0; k < 4; k++) {
      const z = z0 - k * 0.022, r = rr + 0.012;
      for (let j = 0; j < 3; j++) {
        const a = -H * side + (j + 0.5) * 0.75 * side;
        s.push(['cap', 'skin', 0.0105 - j * 0.0008, 0.018, cx + Math.sin(a) * r * side * -1, cy - Math.cos(a) * r, z, 0, 0, a]);
      }
    }
    return s;
  }
  class ViewModel {
    constructor(game, cam) {
      this.g = game; this.cam = cam;
      this.M = mats();
      this.root = new THREE.Group();
      cam.add(this.root);
      // Right hand + flashlight
      this.right = new THREE.Group();
      this.torch = new THREE.Group();
      const torchSpecs = [
        ['lathe', 'black', [[0.001, -0.13], [0.019, -0.13], [0.021, -0.11], [0.021, 0.05], [0.032, 0.085], [0.034, 0.11], [0.001, 0.11]], 20, 0, 0, 0, -H],
        ['rcyl', 'chrome', 0.035, 0.012, 0.004, 20, 0, 0, -0.115, H],
        ['rbox', 'rubber', 0.012, 0.008, 0.025, 0.003, 0, 0.021, -0.02],
        ...[0, 1, 2, 3, 4, 5].map(k => ['torus', 'rubber', 0.0215, 0.002, 12, 0, 0, 0, 0.04 - k * 0.018, 0, 0, 0]),
      ];
      this.addParts(this.torch, 'vm:torch', torchSpecs);
      const lensMesh = new THREE.Mesh(new THREE.CircleGeometry(0.029, 20), this.M.lens);
      lensMesh.position.z = -0.1215; lensMesh.rotation.y = Math.PI;
      this.torch.add(lensMesh);
      this.lens = lensMesh;
      this.tip = new THREE.Object3D(); this.tip.position.z = -0.14; this.torch.add(this.tip);
      this.torch.rotation.z = -0.25;
      this.right.add(this.torch);
      const hand = [
        ['rbox', 'skin', 0.05, 0.075, 0.09, 0.02, 0.028, -0.012, 0.012, 0, 0, -0.2],
        ...grip(1, 0, 0, -0.005, 0.021),
        ['cap', 'skin', 0.011, 0.045, -0.012, 0.028, -0.01, H - 0.2, 0, 0.3],
        ['cap', 'skin', 0.03, 0.2, 0.045, -0.02, 0.13, H + 0.15, 0.1, 0],
        ['lathe', 'sleeve', [[0.045, 0], [0.047, 0.08], [0.052, 0.3], [0.001, 0.3]], 14, 0.05, -0.025, 0.09, H + 0.15, 0.1, 0],
        ['torus', 'cuff', 0.046, 0.007, 14, 0, 0.05, -0.024, 0.088, 0.15, 0.1, 0],
      ];
      this.addParts(this.right, 'vm:rhand', hand);
      this.root.add(this.right);
      // Left hand + walkie-talkie
      this.left = new THREE.Group();
      const walkie = [
        ['rbox', 'black', 0.062, 0.15, 0.036, 0.008, 0, 0, 0],
        ['box', 'chrome', 0.05, 0.05, 0.002, 0, 0.025, 0.019],
        ['cyl', 'rubber', 0.006, 0.004, 0.14, 8, 0.02, 0.14, 0],
        ['rcyl', 'red', 0.008, 0.01, 0.003, 10, -0.018, 0.08, 0],
        ['box', 'lcd', 0.035, 0.018, 0.002, 0, -0.022, 0.0191],
        ['rbox', 'rubber', 0.012, 0.04, 0.02, 0.004, -0.035, 0.01, 0],
      ];
      this.walkie = new THREE.Group();
      this.addParts(this.walkie, 'vm:walkie', walkie);
      this.left.add(this.walkie);
      const lhand = [
        ['rbox', 'skin', 0.075, 0.07, 0.03, 0.014, 0, -0.03, -0.028],
        ...[0, 1, 2, 3].map(k => ['cap', 'skin', 0.009, 0.03, 0.03, -0.06 + k * 0.024, 0.0, 0, 0, H]),
        ['cap', 'skin', 0.01, 0.035, -0.036, -0.02, 0.012, 0.3, 0, 0.3],
        ['cap', 'skin', 0.028, 0.18, 0.0, -0.13, -0.05, 0.2, 0, 0],
        ['lathe', 'sleeve', [[0.043, 0], [0.047, 0.08], [0.05, 0.28], [0.001, 0.28]], 14, 0, -0.16, -0.06, Math.PI + 0.2, 0, 0],
      ];
      this.addParts(this.left, 'vm:lhand', lhand);
      this.root.add(this.left);
      this.root.traverse(o => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = true; o.frustumCulled = false; o.renderOrder = 5; } });
      // State
      this.sway = new THREE.Vector2(); this.swayV = new THREE.Vector2();
      this.lastYaw = 0; this.lastPitch = 0;
      this.reach = 0; this.walk = 0; this.pull = 0; this.talk = 0; this.show = 0;
      this.tipWorld = new THREE.Vector3(); this.dirWorld = new THREE.Vector3();
    }
    addParts(group, key, specs) {
      for (const part of P.build(key, specs)) {
        const m = new THREE.Mesh(part.geo, this.M[part.mat] || this.M.black);
        group.add(m);
      }
    }
    // Hands take the level's baked light like everything else
    onWorld(world) {
      for (const k of ['skin', 'sleeve', 'cuff', 'black', 'chrome', 'rubber', 'red']) { const m = this.M[k]; world.patch(m); m.needsUpdate = true; }
    }
    doReach() { this.reachT = 0.45; }
    update(dt, pl) {
      const g = this.g;
      const S = PB.Settings.data;
      const hasTorch = pl.hasFlashlight && !pl.hidden && g.state !== 'cabinet';
      this.show = U.damp(this.show, hasTorch ? 1 : 0, 8, dt);
      this.root.visible = this.show > 0.02 || this.talk > 0.02;
      // Look sway: hands lag behind the camera rotation and spring back
      const dy = U.angleWrap(pl.yaw - this.lastYaw), dp = pl.pitch - this.lastPitch;
      this.lastYaw = pl.yaw; this.lastPitch = pl.pitch;
      this.swayV.x += -dy * 2.2 - this.sway.x * 90 * dt;
      this.swayV.y += dp * 2.2 - this.sway.y * 90 * dt;
      this.swayV.multiplyScalar(Math.exp(-10 * dt));
      this.sway.x = U.clamp(this.sway.x + this.swayV.x * dt, -0.06, 0.06);
      this.sway.y = U.clamp(this.sway.y + this.swayV.y * dt, -0.05, 0.05);
      // Walk bob follows the player's step phase
      const speed = Math.hypot(pl.vel.x, pl.vel.z);
      this.walk = U.damp(this.walk, U.clamp(speed / 4, 0, 1), 6, dt);
      const bk = this.walk * (0.5 + 0.5 * S.headBob);
      const bx = Math.cos(pl.bob) * 0.012 * bk, by = -Math.abs(Math.sin(pl.bob)) * 0.016 * bk;
      // Pull back when a wall is right in front
      const cam = this.cam;
      cam.updateMatrixWorld();
      const fwd = this.dirWorld.set(0, 0, -1).applyQuaternion(cam.quaternion);
      let near = 1;
      if (g.level) for (const d of [0.35, 0.55, 0.75]) { if (!g.level.los(cam.position.x, cam.position.z, cam.position.x + fwd.x * d, cam.position.z + fwd.z * d)) { near = Math.min(near, (d - 0.3) / 0.5); break; } }
      this.pull = U.damp(this.pull, 1 - U.clamp(near, 0, 1), 10, dt);
      // Reach when using something
      if (this.reachT > 0) this.reachT -= dt;
      const rk = this.reachT > 0 ? Math.sin((0.45 - this.reachT) / 0.45 * Math.PI) : 0;
      const sprint = pl.sprinting ? 1 : 0;
      this.spr = U.damp(this.spr || 0, sprint, 6, dt);
      const breathe = Math.sin(performance.now() / 1000 * 1.6) * 0.003;
      const lower = (1 - this.show) * 0.35;
      this.right.position.set(0.19 + bx + this.sway.x + this.spr * 0.03, -0.2 + by + this.sway.y + breathe - this.pull * 0.08 - this.spr * 0.05 - lower, -0.4 + this.pull * 0.14 - rk * 0.08);
      this.right.rotation.set(-this.spr * 0.35 - this.pull * 0.3 + this.sway.y * 2, this.sway.x * 3 + this.spr * 0.4 + rk * 0.25, -this.spr * 0.3);
      // Walkie comes up while Eddie is talking
      const talking = !!(g.talkCur && g.talkCur.seq && g.talkCur.seq[Math.max(0, g.talkCur.i - 1)] && ['eddie', 'radio'].includes(g.talkCur.seq[Math.max(0, g.talkCur.i - 1)][0])) && g.save && g.save.world && g.save.world.radio;
      this.talk = U.damp(this.talk, talking && !pl.hidden ? 1 : 0, 5, dt);
      this.left.visible = this.talk > 0.02;
      this.left.position.set(-0.16 + bx * 0.5 + this.sway.x, -0.14 - (1 - this.talk) * 0.4 + by + this.sway.y, -0.3 + (1 - this.talk) * 0.05);
      this.left.rotation.set(0.25 * this.talk, 0.35, 0.1);
      // World-space flashlight tip and beam direction (the beam lags with the hand)
      this.root.updateMatrixWorld(true);
      this.tip.getWorldPosition(this.tipWorld);
      this.dirWorld.set(0, 0, -1).transformDirection(this.torch.matrixWorld);
      this.lens.material.color.setScalar(pl.flash.intensity > 1 ? 3 * pl.flash.intensity / 95 : 0.05);
    }
  }
  PB.ViewModel = ViewModel;
})(typeof window !== 'undefined' ? window : globalThis);
