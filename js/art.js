/* Paper art drawn at load time: Lily's eight crayon drawings and the photographs
   (Polaroids, photo-booth frames, an ultrasound). Everything is procedural canvas work. */
(function (root) {
  'use strict';
  const PB = root.PB, U = PB.U, T = PB.Tex;
  const { FONT_HAND } = T.FONTS;

  // ------------------------------------------------------------------ CRAYON
  // Strokes go on a separate layer; wax gaps are punched out of it before it is
  // multiplied onto the paper, which gives the grainy, pressed-too-hard look.
  function crayonKit(L, r) {
    const P = (x, y, j) => [x + r.range(-j, j), y + r.range(-j, j)];
    const K = {
      line(pts, col, w = 6, passes = 3) {
        L.lineCap = 'round'; L.lineJoin = 'round';
        for (let p = 0; p < passes; p++) {
          L.strokeStyle = col; L.globalAlpha = 0.5 + r() * 0.25; L.lineWidth = w * r.range(0.6, 1.05);
          L.beginPath();
          pts.forEach(([x, y], k) => { const [a, b] = P(x, y, w * 0.35); if (k) L.lineTo(a, b); else L.moveTo(a, b); });
          L.stroke();
        }
        L.globalAlpha = 1;
      },
      // Back-and-forth scribble inside a clip path, like a kid colouring in
      fill(path, col, w = 7, ang = -0.5, gap = 0.75) {
        L.save(); L.beginPath(); path(L); L.clip();
        const [x0, y0, x1, y1] = K._bounds || [0, 0, L.canvas.width, L.canvas.height];
        const c = Math.cos(ang), s = Math.sin(ang), d = Math.hypot(x1 - x0, y1 - y0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
        L.strokeStyle = col; L.lineCap = 'round'; L.lineJoin = 'round';
        L.globalAlpha = 0.62; L.lineWidth = w;
        L.beginPath();
        let flip = false;
        for (let t = -d / 2; t < d / 2; t += w * gap) {
          const ax = cx + c * t - s * d / 2, ay = cy + s * t + c * d / 2, bx = cx + c * t + s * d / 2, by = cy + s * t - c * d / 2;
          if (flip) { L.lineTo(ax + r.range(-3, 3), ay + r.range(-3, 3)); L.lineTo(bx, by); } else { L.lineTo(bx + r.range(-3, 3), by + r.range(-3, 3)); L.lineTo(ax, ay); }
          flip = !flip;
        }
        L.stroke();
        L.restore(); L.globalAlpha = 1;
        K._bounds = null;
      },
      bounds(x0, y0, x1, y1) { K._bounds = [x0 - 10, y0 - 10, x1 + 10, y1 + 10]; return K; },
      circle(x, y, rad, col, fillCol, w = 6) {
        if (fillCol) K.bounds(x - rad, y - rad, x + rad, y + rad).fill(g => g.arc(x, y, rad, 0, 6.283), fillCol, w * 1.2);
        const pts = []; const n = 28, st = r() * 6.28;
        for (let k = 0; k <= n + 2; k++) { const a = st + k / n * 6.283; const rr = rad * r.range(0.96, 1.04); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
        K.line(pts, col, w, 2);
      },
      rect(x, y, w, h, col, fillCol, lw = 6) {
        if (fillCol) K.bounds(x, y, x + w, y + h).fill(g => g.rect(x, y, w, h), fillCol, lw * 1.2, r.range(-0.8, -0.3));
        K.line([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y + 2]], col, lw, 2);
      },
      poly(pts, col, fillCol, lw = 6) {
        if (fillCol) {
          const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
          K.bounds(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)).fill(g => { g.moveTo(pts[0][0], pts[0][1]); for (const p of pts) g.lineTo(p[0], p[1]); g.closePath(); }, fillCol, lw * 1.2);
        }
        if (col) K.line(pts.concat([pts[0]]), col, lw, 2);
      },
      arc(x, y, rad, a0, a1, col, w = 6) {
        const pts = []; for (let k = 0; k <= 16; k++) { const a = a0 + (a1 - a0) * k / 16; pts.push([x + Math.cos(a) * rad, y + Math.sin(a) * rad]); }
        K.line(pts, col, w, 2);
      },
      // paint paper colour over what is already drawn (things in front hide things behind)
      erase(path) { L.save(); L.globalAlpha = 1; L.fillStyle = '#f5efdf'; L.beginPath(); path(L); L.fill(); L.restore(); },
      dot(x, y, rad, col) { L.fillStyle = col; L.globalAlpha = 0.85; L.beginPath(); L.arc(x + r.range(-1, 1), y + r.range(-1, 1), rad, 0, 6.283); L.fill(); L.globalAlpha = 1; },
      // Wobbly capital letters, each one tilted a little differently
      text(str, x, y, size, col, maxW) {
        L.font = `700 ${size}px ${FONT_HAND}`; L.textBaseline = 'alphabetic'; L.fillStyle = col;
        const words = String(str).split(' '); const lines = []; let line = '';
        for (const wd of words) { const t = line ? line + ' ' + wd : wd; if (maxW && L.measureText(t).width * 1.04 > maxW && line) { lines.push(line); line = wd; } else line = t; }
        lines.push(line);
        lines.forEach((ln, li) => {
          let cx = x;
          for (const ch of ln) {
            const cw = L.measureText(ch).width;
            L.save(); L.translate(cx + cw / 2, y + li * size * 1.08 + r.range(-2, 2)); L.rotate(r.range(-0.12, 0.12));
            for (let p = 0; p < 2; p++) { L.globalAlpha = 0.55 + r() * 0.3; L.fillText(ch, -cw / 2 + r.range(-0.8, 0.8), r.range(-0.8, 0.8)); }
            L.restore(); cx += cw * r.range(0.99, 1.06);
          }
        });
        L.globalAlpha = 1;
        return lines.length;
      },
    };
    return K;
  }

  const C = {
    yellow: '#f3c41a', orange: '#f08a1c', red: '#d8322a', pink: '#f07aa8', purple: '#7a4bb0', blue: '#2f6fd0', sky: '#6fb5ea',
    green: '#3aa048', dkgreen: '#1f6b30', brown: '#7a4a24', black: '#262320', skin: '#f2b88c', gray: '#8a8a88', white: '#fafafa',
  };

  // Kid-style figures -------------------------------------------------------
  function person(K, x, y, h, o = {}) {
    const hr = h * 0.14, hy = y - h + hr;          // head
    const by = hy + hr, bh = h * 0.42;             // body
    const shirt = o.shirt || C.blue;
    if (o.dress) K.poly([[x, by], [x + h * 0.2, by + bh], [x - h * 0.2, by + bh]], shirt, shirt, 5);
    else K.rect(x - h * 0.11, by, h * 0.22, bh, shirt, shirt, 5);
    // legs
    const ly = by + bh;
    if (o.sitting) {
      K.line([[x - h * 0.06, ly], [x + h * 0.22, ly], [x + h * 0.24, y]], C.black, 5);
      K.line([[x + h * 0.04, ly], [x + h * 0.3, ly + 2], [x + h * 0.32, y]], C.black, 5);
    } else {
      K.line([[x - h * 0.05, ly], [x - h * 0.09, y]], C.black, 5); K.line([[x + h * 0.05, ly], [x + h * 0.09, y]], C.black, 5);
      K.line([[x - h * 0.09, y], [x - h * 0.16, y]], C.black, 7); K.line([[x + h * 0.09, y], [x + h * 0.16, y]], C.black, 7);
    }
    // arms
    const ay = by + bh * 0.2, al = h * 0.3;
    const arm = (side, mode) => {
      const sx = x + side * h * 0.1;
      if (mode === 'up') K.line([[sx, ay], [sx + side * al * 0.5, ay - al * 0.85]], C.black, 5);
      else if (mode === 'wave') { K.line([[sx, ay], [sx + side * al * 0.55, ay - al * 0.3], [sx + side * al * 0.7, ay - al * 0.85]], C.black, 5); K.arc(sx + side * al * 0.72, ay - al * 0.95, 10, -2.4, -0.7, C.gray, 3); }
      else if (mode === 'out') K.line([[sx, ay], [sx + side * al, ay + al * 0.05]], C.black, 5);
      else if (mode === 'hold') K.line([[sx, ay], [sx + side * al * 0.6, ay + al * 0.25], [sx + side * al * 0.95, ay + al * 0.2]], C.black, 5);
      else K.line([[sx, ay], [sx + side * al * 0.35, ay + al * 0.8]], C.black, 5);
    };
    arm(-1, o.armL || o.arms || 'down'); arm(1, o.armR || o.arms || 'down');
    // head
    K.circle(x, hy, hr, C.black, o.skin || C.skin, 4);
    const hair = o.hair || C.brown;
    if (o.hairStyle === 'braids') { K.arc(x, hy, hr * 1.05, 3.4, 6.0, hair, 8); K.line([[x - hr, hy], [x - hr * 1.3, hy + hr * 1.5]], hair, 7); K.line([[x + hr, hy], [x + hr * 1.3, hy + hr * 1.5]], hair, 7); K.dot(x - hr * 1.32, hy + hr * 1.55, 5, C.red); K.dot(x + hr * 1.32, hy + hr * 1.55, 5, C.red); }
    else if (o.hairStyle === 'long') { K.arc(x, hy, hr * 1.05, 3.2, 6.2, hair, 9); K.line([[x - hr, hy - 2], [x - hr * 1.1, hy + hr * 1.3]], hair, 8); K.line([[x + hr, hy - 2], [x + hr * 1.1, hy + hr * 1.3]], hair, 8); }
    else if (o.hairStyle === 'bald') K.arc(x, hy, hr * 1.02, 3.6, 5.8, hair, 3);
    else { for (let k = 0; k < 6; k++) { const a = 3.5 + k * 0.42; K.line([[x + Math.cos(a) * hr, hy + Math.sin(a) * hr], [x + Math.cos(a) * hr * 1.35, hy + Math.sin(a) * hr * 1.35]], hair, 5, 1); } }
    // face
    K.dot(x - hr * 0.38, hy - hr * 0.1, 3, C.black); K.dot(x + hr * 0.38, hy - hr * 0.1, 3, C.black);
    if (o.cry) { K.line([[x - hr * 0.4, hy + hr * 0.1], [x - hr * 0.45, hy + hr * 0.8]], C.blue, 4, 2); K.line([[x + hr * 0.4, hy + hr * 0.1], [x + hr * 0.45, hy + hr * 0.7]], C.blue, 4, 2); K.arc(x, hy + hr * 0.75, hr * 0.35, 3.6, 5.8, C.red, 3); }
    else K.arc(x, hy + hr * 0.05, hr * 0.5, 0.4, 2.7, C.red, 3);
    if (o.mustache) K.line([[x - hr * 0.45, hy + hr * 0.3], [x, hy + hr * 0.2], [x + hr * 0.45, hy + hr * 0.3]], C.brown, 6);
    if (o.headset) { K.arc(x, hy, hr * 1.2, 3.3, 6.1, C.black, 4); K.dot(x - hr * 1.15, hy, 7, C.black); K.dot(x + hr * 1.15, hy, 7, C.black); }
    if (o.hat === 'party') K.poly([[x - hr * 0.6, hy - hr * 0.8], [x + hr * 0.6, hy - hr * 0.8], [x + hr * 0.1, hy - hr * 2.2]], C.pink, C.pink, 4);
    return { hx: x, hy, hr, ay, al };
  }
  function chompy(K, x, y, rad, o = {}) {
    // yellow circle with a wedge mouth, an eye, and little legs with shoes
    const m = o.mouth == null ? 0.5 : o.mouth, face = o.face || 1;
    const path = g => { g.moveTo(x, y); g.arc(x, y, rad, face > 0 ? m : Math.PI + m, face > 0 ? 6.283 - m : Math.PI + 6.283 - m); g.closePath(); };
    K.bounds(x - rad, y - rad, x + rad, y + rad).fill(path, C.yellow, 9, -0.7);
    const pts = []; for (let k = 0; k <= 24; k++) { const a = (face > 0 ? m : Math.PI + m) + (6.283 - 2 * m) * k / 24; pts.push([x + Math.cos(a) * rad, y + Math.sin(a) * rad]); }
    K.line([[x, y]].concat(pts, [[x, y]]), C.orange, 5, 2);
    K.dot(x + face * rad * 0.1, y - rad * 0.5, rad * 0.09, C.black);
    if (o.legs !== false) {
      K.line([[x - rad * 0.3, y + rad * 0.95], [x - rad * 0.35, y + rad * 1.5]], C.black, 6); K.line([[x + rad * 0.3, y + rad * 0.95], [x + rad * 0.35, y + rad * 1.5]], C.black, 6);
      K.line([[x - rad * 0.35, y + rad * 1.5], [x - rad * 0.55, y + rad * 1.5]], C.red, 10); K.line([[x + rad * 0.35, y + rad * 1.5], [x + rad * 0.55, y + rad * 1.5]], C.red, 10);
    }
    if (o.wave) { K.line([[x - face * rad * 0.9, y + rad * 0.1], [x - face * rad * 1.35, y - rad * 0.5]], C.black, 5); K.arc(x - face * rad * 1.4, y - rad * 0.6, 12, -2.6, -0.5, C.gray, 3); }
    if (o.hand) K.line([[x - face * rad * 0.95, y + rad * 0.25], [o.hand[0], o.hand[1]]], C.black, 5);
  }
  function sun(K, x, y, rad) {
    K.circle(x, y, rad, C.orange, C.yellow, 6);
    for (let k = 0; k < 10; k++) { const a = k / 10 * 6.283 + 0.2; K.line([[x + Math.cos(a) * rad * 1.25, y + Math.sin(a) * rad * 1.25], [x + Math.cos(a) * rad * 1.75, y + Math.sin(a) * rad * 1.75]], C.orange, 6, 2); }
  }
  function ground(K, w, y, col) { K.line([[0, y], [w * 0.3, y - 6], [w * 0.6, y + 4], [w, y - 3]], col || C.green, 10); }
  function note(K, x, y, col) { K.dot(x, y, 9, col); K.line([[x + 8, y], [x + 8, y - 34], [x + 22, y - 26]], col, 5); }

  // Scenes, keyed by drawing number. Caption lines are drawn by the caller.
  const SCENES = {
    1(K, w, h, r) { // Chompy in front of the arcade's coloured boxes
      sun(K, w - 90, 80, 44);
      const cols = [C.red, C.blue, C.purple, C.green, C.pink, C.orange];
      for (let k = 0; k < 6; k++) {
        const x = 40 + k * 118, bh = 230 + r.range(-20, 20);
        K.rect(x, 430 - bh, 92, bh, C.black, cols[k], 5);
        K.rect(x + 16, 430 - bh + 30, 60, 50, C.black, '#222', 4);
        K.dot(x + 30, 430 - bh + 118, 7, C.red); K.dot(x + 60, 430 - bh + 118, 7, C.yellow);
      }
      ground(K, w, 432, C.brown);
      chompy(K, w * 0.5, 350, 70, { mouth: 0.55 });
    },
    2(K, w, h, r) { // Walt and Lily at a machine, a yellow circle on the screen
      K.rect(w * 0.56, 110, 200, 330, C.black, C.blue, 6);
      K.rect(w * 0.56 + 30, 150, 140, 110, C.black, '#161616', 5);
      chompy(K, w * 0.56 + 100, 205, 30, { legs: false });
      K.text('3190', w * 0.56 + 58, 250, 26, C.white);
      K.dot(w * 0.56 + 60, 300, 9, C.red); K.dot(w * 0.56 + 120, 300, 9, C.yellow);
      ground(K, w, 442, C.brown);
      person(K, 190, 440, 300, { shirt: C.green, mustache: true, hair: C.black, armR: 'out' });
      person(K, 330, 440, 150, { shirt: C.pink, dress: true, hairStyle: 'braids', hair: C.orange, arms: 'up' });
      for (let k = 0; k < 5; k++) K.line([[340 + r.range(-60, 60), 170 + r.range(-30, 30)], [340 + r.range(-80, 80), 150 + r.range(-40, 40)]], C.yellow, 5, 1);
    },
    3(K, w, h, r) { // three boys and one flashlight under a curved tunnel roof; Lily outside, waving
      K.bounds(40, 90, 560, 440).fill(g => { g.moveTo(40, 440); g.lineTo(40, 250); g.quadraticCurveTo(300, 20, 560, 250); g.lineTo(560, 440); g.closePath(); }, C.brown, 9, -0.4);
      K.bounds(80, 150, 520, 440).fill(g => { g.moveTo(80, 440); g.lineTo(80, 270); g.quadraticCurveTo(300, 90, 520, 270); g.lineTo(520, 440); g.closePath(); }, '#3a3530', 10, 0.6);
      K.poly([[300, 300], [200, 150], [400, 150]], null, '#ffe070', 4);
      person(K, 200, 430, 190, { shirt: C.red, armR: 'hold' });
      person(K, 300, 430, 150, { shirt: C.yellow, hair: C.black, arms: 'up' });
      person(K, 400, 430, 170, { shirt: C.orange, hair: C.orange, armL: 'hold' });
      K.rect(282, 290, 36, 18, C.black, C.gray, 4);
      ground(K, w, 442, C.green);
      person(K, 660, 440, 150, { shirt: C.pink, dress: true, hairStyle: 'braids', hair: C.orange, armR: 'wave' });
      sun(K, 700, 80, 36);
    },
    4(K, w, h, r) { // radio building, Penny in a window, music over the town
      K.rect(250, 70, 230, 370, C.black, C.gray, 6);
      for (let y = 100; y < 400; y += 70) for (let x = 275; x < 460; x += 60) if (!(x < 340 && y === 170)) K.rect(x, y, 34, 40, C.black, C.yellow, 3);
      K.rect(270, 160, 90, 80, C.black, C.white, 4);
      person(K, 315, 238, 80, { shirt: C.purple, hairStyle: 'long', hair: C.brown, headset: true });
      K.line([[340, 205], [352, 196]], C.black, 5);
      K.line([[365, 70], [365, 20]], C.black, 5); K.dot(365, 18, 8, C.red);
      for (let k = 0; k < 9; k++) note(K, 400 + k * 42 + r.range(-10, 10), 120 + Math.sin(k) * 40 + k * 8, [C.purple, C.red, C.blue, C.green][k % 4]);
      for (let k = 0; k < 4; k++) { const x = 40 + k * 55; K.rect(x, 380, 44, 60, C.black, [C.red, C.blue, C.green, C.orange][k], 4); K.poly([[x - 6, 380], [x + 22, 350], [x + 50, 380]], C.black, C.brown, 4); }
      for (let k = 0; k < 3; k++) { const x = 540 + k * 70; K.rect(x, 380, 54, 60, C.black, [C.pink, C.sky, C.yellow][k], 4); K.poly([[x - 6, 380], [x + 27, 345], [x + 60, 380]], C.black, C.red, 4); }
      ground(K, w, 442, C.green);
    },
    5(K, w, h, r) { // the big tree, Chompy holding a little girl's hand, snow
      K.poly([[330, 40], [170, 230], [240, 230], [120, 400], [540, 400], [420, 230], [490, 230]], C.dkgreen, C.green, 6);
      K.rect(300, 400, 60, 40, C.black, C.brown, 5);
      K.poly([[330, 20], [340, 45], [365, 45], [345, 60], [352, 85], [330, 70], [308, 85], [315, 60], [295, 45], [320, 45]], C.orange, C.yellow, 3);
      for (let k = 0; k < 14; k++) K.dot(180 + r() * 300, 120 + r() * 270, 9, [C.red, C.blue, C.yellow, C.pink][k % 4]);
      chompy(K, 560, 360, 55, { mouth: 0.45, face: -1, hand: [632, 350] });
      person(K, 660, 440, 140, { shirt: C.red, dress: true, hairStyle: 'braids', hair: C.orange, armL: 'out' });
      for (let k = 0; k < 70; k++) K.dot(r() * w, r() * 430, 4, C.sky);
      ground(K, w, 444, C.sky);
    },
    6(K, w, h, r) { // a window with rain; outside Chompy waves, inside Lily in bed waves back
      K.rect(380, 60, 360, 300, C.black, '#b8d8f0', 7);
      K.line([[560, 60], [560, 360]], C.black, 7); K.line([[380, 210], [740, 210]], C.black, 7);
      for (let k = 0; k < 40; k++) { const x = 390 + r() * 340, y = 70 + r() * 270; K.line([[x, y], [x - 6, y + 26]], C.blue, 3, 1); }
      chompy(K, 560, 250, 55, { mouth: 0.4, face: -1, wave: true });
      K.rect(40, 250, 26, 190, C.black, C.brown, 5);
      K.rect(66, 300, 90, 40, C.black, C.white, 4);
      person(K, 150, 410, 150, { shirt: C.pink, hairStyle: 'braids', hair: C.orange, armR: 'wave', hat: 'party' });
      // the blanket covers her from the waist down
      K.erase(g => g.rect(66, 345, 310, 95));
      K.rect(66, 345, 310, 95, C.black, null, 6);
      K.bounds(66, 345, 376, 440).fill(g => g.rect(70, 348, 302, 88), C.sky, 8);
      K.line([[66, 440], [66, 470]], C.brown, 8); K.line([[376, 440], [376, 470]], C.brown, 8);
      ground(K, w, 444, C.brown);
    },
    7(K, w, h, r) { // two boys on the curb under the streetlight sharing a comic; a girl across the street
      K.bounds(0, 0, w, 300).fill(g => g.rect(0, 0, w, 300), '#27306a', 10, -0.3);
      for (let k = 0; k < 12; k++) K.dot(r() * w, r() * 200, 4, C.yellow);
      K.line([[160, 440], [160, 90], [240, 90]], C.black, 9); K.poly([[225, 90], [255, 90], [250, 105], [230, 105]], C.black, C.yellow, 4);
      K.poly([[240, 105], [120, 400], [380, 400]], null, '#fff0a0', 4);
      K.line([[0, 400], [w, 400]], C.gray, 10);
      person(K, 190, 400, 150, { shirt: C.yellow, hair: C.black, sitting: true, armR: 'hold' });
      person(K, 290, 400, 150, { shirt: C.orange, hair: C.orange, sitting: true, armL: 'hold' });
      K.rect(222, 330, 50, 34, C.black, C.red, 3);
      person(K, 640, 330, 120, { shirt: C.pink, dress: true, hairStyle: 'braids', hair: C.orange, armR: 'wave' });
      ground(K, w, 446, C.gray);
    },
    8(K, w, h, r) { // Walt on the floor by the glowing machine, Lily's hand on his shoulder
      K.rect(470, 90, 200, 340, C.black, C.gray, 7);
      K.rect(500, 130, 140, 100, C.black, '#fff4a0', 5);
      for (let k = 0; k < 12; k++) { const a = k / 12 * 6.283; K.line([[570 + Math.cos(a) * 130, 180 + Math.sin(a) * 130], [570 + Math.cos(a) * 170, 180 + Math.sin(a) * 170]], C.yellow, 6, 2); }
      for (let k = 0; k < 6; k++) K.dot(505 + k * 26, 290, 7, [C.red, C.green, C.yellow][k % 3]);
      person(K, 280, 430, 220, { shirt: C.green, mustache: true, hair: C.black, sitting: true, cry: true, armR: 'down' });
      const p = person(K, 210, 430, 140, { shirt: C.pink, dress: true, hairStyle: 'braids', hair: C.orange, armR: 'out' });
      ground(K, w, 440, C.brown);
      sun(K, 80, 70, 34);
    },
  };

  function paperBase(g, w, h, r) {
    g.fillStyle = '#f5efdf'; g.fillRect(0, 0, w, h);
    for (let k = 0; k < 2600; k++) { g.fillStyle = `rgba(120,100,70,${r() * 0.06})`; g.fillRect(r() * w, r() * h, 1 + r() * 2, 1); }
    for (let k = 0; k < 60; k++) { g.strokeStyle = `rgba(140,120,90,${0.04 + r() * 0.05})`; g.lineWidth = 0.6; g.beginPath(); const x = r() * w, y = r() * h; g.moveTo(x, y); g.lineTo(x + r.range(-30, 30), y + r.range(-8, 8)); g.stroke(); }
    const vg = g.createRadialGradient(w / 2, h / 2, h * 0.4, w / 2, h / 2, w * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(150,110,40,0.22)');
    g.fillStyle = vg; g.fillRect(0, 0, w, h);
  }
  function foldAndTape(g, w, h, r) {
    // a fold across the middle and two bits of yellowed tape
    const fx = w * r.range(0.45, 0.55);
    const fg = g.createLinearGradient(fx - 14, 0, fx + 14, 0);
    fg.addColorStop(0, 'rgba(0,0,0,0)'); fg.addColorStop(0.45, 'rgba(90,70,40,0.12)'); fg.addColorStop(0.55, 'rgba(255,255,255,0.18)'); fg.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = fg; g.fillRect(fx - 14, 0, 28, h);
    for (const [x, y, a] of [[40, 20, -0.5], [w - 40, 20, 0.5]]) {
      g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = 'rgba(230,215,160,0.55)'; g.fillRect(-46, -14, 92, 28);
      g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(-46, -14, 92, 5); g.restore();
    }
  }

  // Drawing n (1–8). `caption` is the localized crayon writing under the picture.
  T.drawing = function (n, caption) {
    const num = Math.max(1, Math.min(8, parseInt(n, 10) || 1));
    const cap = caption || '';
    return T.canvas('drawing:' + num + ':' + U.hashStr(cap), 800, 600, (g, w, h) => {
      const r = U.rng(1000 + num * 17);
      paperBase(g, w, h, r);
      const L = document.createElement('canvas'); L.width = w; L.height = h;
      const lg = L.getContext('2d');
      const K = crayonKit(lg, r);
      (SCENES[num] || SCENES[1])(K, w, h, r);
      // caption: first lines in big letters, colour changes per line like a kid swapping crayons
      const lines = cap.split('\n').map(s => s.trim()).filter(Boolean).slice(0, 5);
      const cols = [C.purple, C.red, C.blue, C.green];
      // shrink the writing until every wrapped line fits under the picture
      let size = 38;
      const rows = sz => { lg.font = `700 ${sz}px ${FONT_HAND}`; let n = 0; for (const ln of lines) { let cur = '', c = 1; for (const wd of ln.split(' ')) { const t = cur ? cur + ' ' + wd : wd; if (lg.measureText(t).width * 1.04 > w - 80 && cur) { c++; cur = wd; } else cur = t; } n += c; } return n; };
      while (size > 20 && rows(size) * size * 1.08 > h - 470) size -= 2;
      let y = 470 + size;
      lines.forEach((ln, k) => { const n = K.text(ln, 34 + r.range(-4, 8), y, size, cols[(k + num) % 4], w - 80); y += size * 1.08 * n; });
      // wax gaps
      lg.globalCompositeOperation = 'destination-out';
      for (let k = 0; k < 9000; k++) { lg.fillStyle = `rgba(0,0,0,${0.25 + r() * 0.5})`; lg.fillRect(r() * w, r() * h, 1 + r() * 2.2, 1 + r()); }
      lg.globalCompositeOperation = 'source-over';
      g.globalCompositeOperation = 'multiply'; g.globalAlpha = 0.95; g.drawImage(L, 0, 0);
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
      foldAndTape(g, w, h, r);
    });
  };
  // The writing on a drawing: everything after the description paragraph
  T.drawingCaption = body => String(body || '').split(/\n\s*\n/).slice(1).join('\n');

  // ------------------------------------------------------------------ PHOTOS
  // Soft, slightly out-of-focus people; the grain, colour cast and vignette sell the rest.
  function softPerson(g, x, y, s, o = {}) {
    const skin = o.skin || '#e6b08e', hair = o.hair || '#4a3020', shirt = o.shirt || '#3050a0';
    // shoulders
    const sg = g.createLinearGradient(x, y + 18 * s, x, y + 90 * s); sg.addColorStop(0, shirt); sg.addColorStop(1, shade(shirt, -0.5));
    g.fillStyle = sg; g.beginPath(); g.ellipse(x, y + 70 * s, 34 * s, 46 * s, 0, Math.PI, 0); g.lineTo(x + 34 * s, y + 120 * s); g.lineTo(x - 34 * s, y + 120 * s); g.fill();
    // neck + head
    g.fillStyle = shade(skin, -0.2); g.fillRect(x - 7 * s, y + 8 * s, 14 * s, 18 * s);
    const hg = g.createRadialGradient(x - 5 * s + (o.lightX || 0) * s, y - 8 * s + (o.lightY || 0) * s, 2 * s, x, y, 26 * s);
    hg.addColorStop(0, shade(skin, 0.15)); hg.addColorStop(0.7, skin); hg.addColorStop(1, shade(skin, -0.35));
    g.fillStyle = hg; g.beginPath(); g.ellipse(x, y, 17 * s, 21 * s, o.tilt || 0, 0, 6.283); g.fill();
    // hair
    g.fillStyle = hair;
    if (o.hairStyle === 'long' || o.hairStyle === 'pigtails') {
      g.beginPath(); g.ellipse(x, y - 6 * s, 20 * s, 20 * s, 0, Math.PI, 0); g.fill();
      if (o.hairStyle === 'long') { g.fillRect(x - 20 * s, y - 6 * s, 7 * s, 40 * s); g.fillRect(x + 13 * s, y - 6 * s, 7 * s, 40 * s); }
      else { g.beginPath(); g.ellipse(x - 22 * s, y + 6 * s, 6 * s, 12 * s, 0.3, 0, 6.283); g.ellipse(x + 22 * s, y + 6 * s, 6 * s, 12 * s, -0.3, 0, 6.283); g.fill(); }
    } else { g.beginPath(); g.ellipse(x, y - 9 * s, 18 * s, 14 * s, 0, Math.PI * 0.95, Math.PI * 2.05); g.fill(); }
    // eyes / mouth
    g.fillStyle = 'rgba(30,20,20,0.85)';
    if (o.eyesClosed) { g.strokeStyle = 'rgba(30,20,20,0.8)'; g.lineWidth = 1.6 * s; for (const d of [-1, 1]) { g.beginPath(); g.arc(x + d * 6 * s, y - 2 * s, 3 * s, 0.2, 2.9); g.stroke(); } }
    else for (const d of [-1, 1]) { g.beginPath(); g.ellipse(x + d * 6 * s, y - 2 * s, 1.8 * s, 2.2 * s, 0, 0, 6.283); g.fill(); }
    if (o.glasses) { g.strokeStyle = 'rgba(20,20,20,0.9)'; g.lineWidth = 1.5 * s; for (const d of [-1, 1]) { g.beginPath(); g.ellipse(x + d * 6.5 * s, y - 2 * s, 5 * s, 4.5 * s, 0, 0, 6.283); g.stroke(); } }
    if (o.mouth === 'laugh') { g.fillStyle = 'rgba(90,20,20,0.9)'; g.beginPath(); g.ellipse(x, y + 9 * s, 5.5 * s, 4 * s, 0, 0, Math.PI); g.fill(); g.fillStyle = 'rgba(250,250,240,0.9)'; g.fillRect(x - 4 * s, y + 9 * s, 8 * s, 1.4 * s); }
    else if (o.mouth === 'flat') { g.fillStyle = 'rgba(120,50,50,0.8)'; g.fillRect(x - 4 * s, y + 9 * s, 8 * s, 1.5 * s); }
    else { g.strokeStyle = 'rgba(120,40,40,0.85)'; g.lineWidth = 1.6 * s; g.beginPath(); g.arc(x, y + 5 * s, 5 * s, 0.4, 2.7); g.stroke(); }
    if (o.hat === 'santa') { g.fillStyle = '#c02020'; g.beginPath(); g.moveTo(x - 18 * s, y - 12 * s); g.lineTo(x + 20 * s, y - 14 * s); g.lineTo(x + 28 * s, y - 40 * s); g.fill(); g.fillStyle = '#f4f0ea'; g.fillRect(x - 19 * s, y - 16 * s, 40 * s, 6 * s); g.beginPath(); g.arc(x + 28 * s, y - 40 * s, 4 * s, 0, 6.283); g.fill(); }
    if (o.hat === 'party') { g.fillStyle = '#e060a0'; g.beginPath(); g.moveTo(x - 10 * s, y - 16 * s); g.lineTo(x + 10 * s, y - 16 * s); g.lineTo(x + 2 * s, y - 42 * s); g.fill(); }
    if (o.finger) { g.fillStyle = skin; g.fillRect(x + 26 * s, y - 10 * s, 5 * s, 22 * s); g.beginPath(); g.ellipse(x + 28 * s, y + 16 * s, 7 * s, 7 * s, 0, 0, 6.283); g.fill(); }
    if (o.horns) { g.fillStyle = shade(skin, -0.1); for (const d of [-1, 1]) { g.fillRect(x + d * 9 * s - 2 * s, y - 40 * s, 4 * s, 18 * s); } }
  }
  function shade(hex, k) {
    const c = parseInt(hex.slice(1), 16); let r = c >> 16, g = (c >> 8) & 255, b = c & 255;
    const f = v => Math.max(0, Math.min(255, Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k)));
    return `rgb(${f(r)},${f(g)},${f(b)})`;
  }
  function filmFinish(g, x, y, w, h, r, o = {}) {
    // colour cast, vignette, grain, soft focus
    const img = g.getImageData(x, y, w, h), d = img.data;
    const cast = o.cast || [1.06, 1.0, 0.86], mono = !!o.mono, lift = o.lift == null ? 18 : o.lift;
    for (let i = 0; i < d.length; i += 4) {
      const px = (i / 4) % w, py = Math.floor(i / 4 / w);
      const vx = px / w - 0.5, vy = py / h - 0.5, v = 1 - (vx * vx + vy * vy) * (o.vig || 1.3);
      const n = (r() - 0.5) * (o.grain || 26);
      let R = d[i], G = d[i + 1], B = d[i + 2];
      if (mono) { const l = R * 0.3 + G * 0.59 + B * 0.11; R = G = B = (l - 128) * 1.2 + 128; }
      d[i] = Math.max(0, Math.min(255, (R * cast[0] * v + lift) * 0.93 + n));
      d[i + 1] = Math.max(0, Math.min(255, (G * cast[1] * v + lift) * 0.93 + n));
      d[i + 2] = Math.max(0, Math.min(255, (B * cast[2] * v + lift * 0.8) * 0.93 + n));
    }
    g.putImageData(img, x, y);
  }
  function polaroid(g, w, h, r, draw, label, opts) {
    g.fillStyle = '#1a1714'; g.fillRect(0, 0, w, h);
    // the print, slightly rotated on a dark surface
    g.save(); g.translate(w / 2, h / 2); g.rotate(r.range(-0.03, 0.03));
    const pw = w - 30, ph = h - 16;
    g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 10; g.shadowOffsetY = 3;
    g.fillStyle = '#f2efe6'; g.fillRect(-pw / 2, -ph / 2, pw, ph); g.shadowColor = 'transparent';
    g.restore();
    const ix = 26, iy = 16, iw = w - 52, ih = h - 62;
    g.save(); g.beginPath(); g.rect(ix, iy, iw, ih); g.clip();
    draw(g, ix, iy, iw, ih);
    g.restore();
    if (g.filter !== undefined) { const tmp = g.getImageData(ix, iy, iw, ih); const c2 = document.createElement('canvas'); c2.width = iw; c2.height = ih; c2.getContext('2d').putImageData(tmp, 0, 0); g.save(); g.filter = 'blur(0.7px)'; g.drawImage(c2, ix, iy); g.restore(); }
    filmFinish(g, ix, iy, iw, ih, r, opts);
    if (label) { g.fillStyle = '#23305a'; g.font = `20px ${FONT_HAND}`; g.fillText(label, ix + 4, h - 22); }
    // fingerprints and wear
    g.fillStyle = 'rgba(255,255,255,0.05)'; g.beginPath(); g.ellipse(w * 0.72, h * 0.3, 18, 24, 0.5, 0, 6.283); g.fill();
  }

  const PHOTOS = {
    five(g, x, y, w, h, r) {
      // five kids in front of cabinet #7, the screen glow behind them
      const bg = g.createLinearGradient(0, y, 0, y + h); bg.addColorStop(0, '#1d1630'); bg.addColorStop(1, '#402a30'); g.fillStyle = bg; g.fillRect(x, y, w, h);
      g.fillStyle = '#2a2a60'; g.fillRect(x + w * 0.38, y, w * 0.24, h); g.fillStyle = '#80d0ff'; g.globalAlpha = 0.6; g.fillRect(x + w * 0.42, y + 8, w * 0.16, h * 0.22); g.globalAlpha = 1;
      g.fillStyle = '#ffd040'; g.font = `bold 18px sans-serif`; g.fillText('7', x + w * 0.49, y + h * 0.35);
      softPerson(g, x + w * 0.24, y + h * 0.36, 1.0, { shirt: '#2c3e7a', hair: '#2a1a10', finger: true, mouth: 'laugh' });
      softPerson(g, x + w * 0.5, y + h * 0.32, 0.95, { shirt: '#b04a8a', hair: '#7a3a1a', hairStyle: 'long', mouth: 'laugh' });
      softPerson(g, x + w * 0.76, y + h * 0.35, 0.95, { shirt: '#2a8a8a', hair: '#1a1210', hairStyle: 'long', glasses: true, mouth: 'laugh' });
      softPerson(g, x + w * 0.36, y + h * 0.62, 0.9, { shirt: '#c86a20', hair: '#b04a18', eyesClosed: true, mouth: 'laugh' });
      softPerson(g, x + w * 0.64, y + h * 0.62, 0.9, { shirt: '#c8b030', hair: '#3a2410', mouth: 'flat' });
      flash(g, x, y, w, h);
    },
    fort(g, x, y, w, h, r) {
      g.fillStyle = '#0c0a08'; g.fillRect(x, y, w, h);
      for (let yy = 0; yy < h; yy += 12) for (let xx = (yy / 12) % 2 ? -12 : 0; xx < w; xx += 26) { g.fillStyle = `rgba(${90 + r() * 30},${40 + r() * 15},${25},${0.25 + r() * 0.15})`; g.fillRect(x + xx, y + yy, 24, 10); }
      const lg = g.createRadialGradient(x + w / 2, y + h, 10, x + w / 2, y + h * 0.7, h * 0.9); lg.addColorStop(0, 'rgba(255,200,120,0.5)'); lg.addColorStop(1, 'rgba(0,0,0,0.85)'); g.fillStyle = lg; g.fillRect(x, y, w, h);
      softPerson(g, x + w * 0.28, y + h * 0.42, 1.05, { shirt: '#3a3a70', hair: '#2a1a10', lightY: 18, mouth: 'laugh' });
      softPerson(g, x + w * 0.52, y + h * 0.5, 0.95, { shirt: '#b0a030', hair: '#3a2410', lightY: 18, mouth: 'smile' });
      softPerson(g, x + w * 0.74, y + h * 0.52, 0.85, { shirt: '#c86a20', hair: '#b04a18', lightY: 18, mouth: 'laugh', horns: true });
      g.fillStyle = 'rgba(255,240,200,0.9)'; g.beginPath(); g.ellipse(x + w * 0.5, y + h * 0.96, 16, 8, 0, 0, 6.283); g.fill();
    },
    booth(g, x, y, w, h, r, id) {
      // photo booth: plain curtain, harsh flash, black and white
      const bg = g.createLinearGradient(x, 0, x + w, 0); bg.addColorStop(0, '#8a8a8a'); bg.addColorStop(0.5, '#b0b0b0'); bg.addColorStop(1, '#7a7a7a'); g.fillStyle = bg; g.fillRect(x, y, w, h);
      for (let k = 0; k < 9; k++) { g.fillStyle = 'rgba(0,0,0,0.08)'; g.fillRect(x + k * w / 9 + 6, y, 8, h); }
      const n = parseInt(String(id).replace(/\D/g, ''), 10) || 1;
      if (n === 1) { softPerson(g, x + w * 0.33, y + h * 0.42, 1.25, { shirt: '#333', hair: '#222', mouth: 'flat', tilt: 0.1 }); softPerson(g, x + w * 0.68, y + h * 0.45, 1.2, { shirt: '#666', hair: '#443', hairStyle: 'long', mouth: 'laugh' }); g.fillStyle = '#c8a070'; g.beginPath(); g.ellipse(x + w * 0.82, y + h * 0.62, 12, 10, 0, 0, 6.283); g.fill(); }
      if (n === 2) { softPerson(g, x + w * 0.35, y + h * 0.45, 1.2, { shirt: '#2a5a5a', hair: '#111', hairStyle: 'long', glasses: true, mouth: 'laugh', hat: 'santa' }); softPerson(g, x + w * 0.68, y + h * 0.47, 1.15, { shirt: '#a0601a', hair: '#8a3a10', mouth: 'laugh' }); }
      if (n === 3) { softPerson(g, x + w * 0.42, y + h * 0.45, 1.3, { shirt: '#b0a030', hair: '#3a2410', eyesClosed: true, mouth: 'laugh', tilt: 0.12 }); softPerson(g, x + w * 0.6, y + h * 0.46, 1.3, { shirt: '#a0601a', hair: '#8a3a10', eyesClosed: true, mouth: 'laugh', tilt: -0.12 }); }
      if (n >= 4) { [[0.2, 0.36, 0.85, '#333', 'short'], [0.42, 0.3, 0.8, '#666', 'long'], [0.62, 0.32, 0.8, '#2a5a5a', 'long'], [0.33, 0.62, 0.8, '#a0601a', 'short'], [0.58, 0.64, 0.8, '#b0a030', 'short']].forEach(([px, py, s, sh, hs], k) => softPerson(g, x + w * px, y + h * py, s, { shirt: sh, hairStyle: hs, glasses: k === 2, tilt: r.range(-0.3, 0.3), mouth: 'laugh' })); }
      flash(g, x, y, w, h);
    },
    strip(g, x, y, w, h, r) {
      g.fillStyle = '#2a2420'; g.fillRect(x, y, w, h);
      for (let k = 0; k < 4; k++) {
        const fx = x + 10 + k * (w - 20) / 4, fw = (w - 20) / 4 - 8;
        g.fillStyle = '#f4f2ec'; g.fillRect(fx - 3, y + 12, fw + 6, h - 24);
        g.save(); g.beginPath(); g.rect(fx, y + 16, fw, h - 32); g.clip();
        g.translate(fx, y + 16); g.scale(fw / 280, (h - 32) / 180);
        PHOTOS.booth(g, 0, 0, 280, 180, r, 'f' + (k + 1));
        g.restore();
      }
    },
    chompy(g, x, y, w, h, r) {
      const bg = g.createLinearGradient(0, y, 0, y + h); bg.addColorStop(0, '#a8c8a8'); bg.addColorStop(1, '#7a987a'); g.fillStyle = bg; g.fillRect(x, y, w, h);
      g.fillStyle = '#e8e8e0'; g.fillRect(x, y + h * 0.62, w, h * 0.4);
      g.fillStyle = '#d8d8d0'; g.fillRect(x + w * 0.45, y + h * 0.55, w * 0.55, h * 0.1);
      // costume head
      const cx = x + w * 0.36, cy = y + h * 0.48, R = h * 0.34;
      const hg = g.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R); hg.addColorStop(0, '#fff080'); hg.addColorStop(0.7, '#f0c020'); hg.addColorStop(1, '#a07010');
      g.fillStyle = hg; g.beginPath(); g.arc(cx, cy, R, 0, 6.283); g.fill();
      g.fillStyle = '#301010'; g.beginPath(); g.moveTo(cx, cy + R * 0.1); g.arc(cx, cy + R * 0.1, R * 0.62, 0.3, Math.PI - 0.3); g.fill();
      g.fillStyle = '#fff'; for (const d of [-1, 1]) { g.beginPath(); g.ellipse(cx + d * R * 0.3, cy - R * 0.3, R * 0.12, R * 0.16, 0, 0, 6.283); g.fill(); }
      g.fillStyle = '#111'; for (const d of [-1, 1]) { g.beginPath(); g.arc(cx + d * R * 0.3, cy - R * 0.26, R * 0.06, 0, 6.283); g.fill(); }
      softPerson(g, x + w * 0.64, y + h * 0.42, 0.9, { shirt: '#c0c8e0', hair: '#c05020', hairStyle: 'pigtails', hat: 'party', mouth: 'laugh', eyesClosed: true, tilt: -0.3 });
      g.strokeStyle = '#e6b08e'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(x + w * 0.6, y + h * 0.6); g.quadraticCurveTo(x + w * 0.52, y + h * 0.66, x + w * 0.5, y + h * 0.56); g.stroke();
      flash(g, x, y, w, h);
    },
    ultrasound(g, x, y, w, h, r) {
      g.fillStyle = '#050505'; g.fillRect(x, y, w, h);
      const ox = x + w / 2, oy = y + 6;
      g.save(); g.beginPath(); g.moveTo(ox, oy); g.arc(ox, oy, h * 0.95, Math.PI * 0.28, Math.PI * 0.72); g.closePath(); g.clip();
      for (let k = 0; k < 5000; k++) { const a = r.range(Math.PI * 0.28, Math.PI * 0.72), d = r() * h * 0.95; const v = Math.floor(40 + r() * 90 * (1 - d / h)); g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(ox + Math.cos(a) * d, oy + Math.sin(a) * d, 2, 1.5); }
      g.fillStyle = 'rgba(0,0,0,0.85)'; g.beginPath(); g.ellipse(ox, oy + h * 0.55, w * 0.18, h * 0.2, 0.2, 0, 6.283); g.fill();
      g.fillStyle = 'rgba(210,210,210,0.75)'; g.beginPath(); g.ellipse(ox - 10, oy + h * 0.53, 22, 14, 0.4, 0, 6.283); g.fill(); g.beginPath(); g.arc(ox + 16, oy + h * 0.5, 11, 0, 6.283); g.fill();
      g.restore();
      g.fillStyle = '#ddd'; g.font = '10px monospace'; g.fillText('ST AGNES  05/12/93', x + 6, y + 14); g.fillText('GA 14w2d', x + w - 64, y + 14);
    },
    arch(g, x, y, w, h, r) { PHOTOS.five(g, x, y, w, h, r); },
  };
  function flash(g, x, y, w, h) {
    const fg = g.createRadialGradient(x + w / 2, y + h * 0.4, 10, x + w / 2, y + h * 0.4, w * 0.7);
    fg.addColorStop(0, 'rgba(255,255,255,0.18)'); fg.addColorStop(1, 'rgba(0,0,0,0.25)'); g.fillStyle = fg; g.fillRect(x, y, w, h);
  }
  const LABELS = { five: '4/11/87', fort: 'THE FORT. OPENING DAY.', chompy: 'LIL & CHOMPY', frame: '', strip: '', ultrasound: '' };
  T.photo = (key, id) => T.canvas('photo:' + key + ':' + (id || ''), 320, 240, (g, w, h) => {
    const r = U.rng(U.hashStr(key + (id || '')));
    const k = PHOTOS[key] ? key : key === 'frame' ? 'booth' : 'five';
    polaroid(g, w, h, r, (g2, x, y, iw, ih) => PHOTOS[k](g2, x, y, iw, ih, r, id), LABELS[key] || '',
      k === 'booth' || k === 'strip' ? { mono: true, cast: [1, 1, 1], grain: 34, vig: 1.0 } : k === 'ultrasound' ? { mono: true, cast: [1, 1, 1.02], lift: 0, grain: 18, vig: 0.4 } : {});
  }, { readback: true });
})(typeof window !== 'undefined' ? window : globalThis);
