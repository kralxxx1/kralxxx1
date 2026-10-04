/* Shared helpers: maths, seeded randomness, noise, storage, events. (TypeScript; its types are in
   src/types/pb.d.ts.) Registered on window.PB.U for the game's other modules. */
import type { EmitterInstance, PBNamespace, Rng, Util } from '../types/pb';

const root = (typeof window !== 'undefined' ? window : globalThis) as unknown as { PB?: PBNamespace; localStorage?: Storage; requestAnimationFrame?: (cb: () => void) => number };
const PB: PBNamespace = root.PB || (root.PB = {} as PBNamespace);

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

// mulberry32-based seeded generator
function rng(seed: number): Rng {
  let s = (seed >>> 0) || 1;
  const next = (): number => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = next as Rng;
  r.range = (a, b) => a + (b - a) * next();
  r.int = (a, b) => a + Math.floor(next() * (b - a + 1));
  r.pick = arr => arr[Math.floor(next() * arr.length)];
  r.chance = p => next() < p;
  r.shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  };
  r.sign = () => (next() < 0.5 ? -1 : 1);
  return r;
}

const hashStr = (str: string): number => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

// A fixed 0..1 value from integer coordinates
const hash2 = (x: number, y: number, seed: number): number => {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

// Tileable (periodic) Perlin noise, about -1..1
const perlin = (x: number, y: number, period: number, seed: number): number => {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const p = period | 0;
  const g = (ix: number, iy: number): [number, number] => {
    const a = hash2(((ix % p) + p) % p, ((iy % p) + p) % p, seed) * Math.PI * 2;
    return [Math.cos(a), Math.sin(a)];
  };
  const fade = (t: number): number => t * t * t * (t * (t * 6 - 15) + 10);
  const g00 = g(xi, yi), g10 = g(xi + 1, yi), g01 = g(xi, yi + 1), g11 = g(xi + 1, yi + 1);
  const n00 = g00[0] * xf + g00[1] * yf;
  const n10 = g10[0] * (xf - 1) + g10[1] * yf;
  const n01 = g01[0] * xf + g01[1] * (yf - 1);
  const n11 = g11[0] * (xf - 1) + g11[1] * (yf - 1);
  const u = fade(xf), v = fade(yf);
  return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v) * 1.414;
};

class Emitter implements EmitterInstance {
  handlers: Record<string, Array<(...args: any[]) => void>> = {};
  on(name: string, fn: (...args: any[]) => void): () => void { (this.handlers[name] || (this.handlers[name] = [])).push(fn); return () => this.off(name, fn); }
  off(name: string, fn: (...args: any[]) => void): void { const h = this.handlers[name]; if (h) { const i = h.indexOf(fn); if (i >= 0) h.splice(i, 1); } }
  emit(name: string, ...args: any[]): void { const h = this.handlers[name]; if (h) h.slice().forEach(fn => fn(...args)); }
}

const U: Util = {
  clamp,
  lerp,
  invLerp: (a, b, v) => (b === a ? 0 : (v - a) / (b - a)),
  smoothstep: (a, b, v) => {
    const t = clamp((v - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  },
  // Frame-rate independent easing toward a target
  damp: (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt)),
  fract: v => v - Math.floor(v),
  dist2: (ax, az, bx, bz) => { const dx = ax - bx, dz = az - bz; return dx * dx + dz * dz; },
  dist: (ax, az, bx, bz) => Math.sqrt((ax - bx) * (ax - bx) + (az - bz) * (az - bz)),
  angleWrap: a => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; },
  angleDamp: (a, b, lambda, dt) => {
    let d = b - a;
    while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2;
    return a + d * (1 - Math.exp(-lambda * dt));
  },
  easeInOut: t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeOut: t => 1 - Math.pow(1 - t, 3),
  rng,
  hashStr,
  hash2,
  perlin,
  // Periodic fBm field: a size x size Float32Array, values about 0..1
  fbmField(size, basePeriod, octaves, seed, gain = 0.5) {
    const out = new Float32Array(size * size);
    let amp = 1, total = 0, period = basePeriod;
    for (let o = 0; o < octaves; o++) {
      const scale = period / size;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          out[y * size + x] += perlin(x * scale, y * scale, period, seed + o * 101) * amp;
        }
      }
      total += amp; amp *= gain; period *= 2;
    }
    for (let i = 0; i < out.length; i++) out[i] = clamp(out[i] / total * 0.5 + 0.5, 0, 1);
    return out;
  },
  // Bilinear upscale of a periodic field, wrapping at the edges
  upsample(src, sSize, dSize) {
    if (sSize === dSize) return src;
    const out = new Float32Array(dSize * dSize);
    const k = sSize / dSize;
    for (let y = 0; y < dSize; y++) {
      const fy = y * k - 0.5 + k * 0.5;
      const y0 = Math.floor(fy), ty = fy - y0;
      const ya = ((y0 % sSize) + sSize) % sSize, yb = (ya + 1) % sSize;
      for (let x = 0; x < dSize; x++) {
        const fx = x * k - 0.5 + k * 0.5;
        const x0 = Math.floor(fx), tx = fx - x0;
        const xa = ((x0 % sSize) + sSize) % sSize, xb = (xa + 1) % sSize;
        const a = src[ya * sSize + xa], b = src[ya * sSize + xb];
        const c = src[yb * sSize + xa], d = src[yb * sSize + xb];
        out[y * dSize + x] = (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
      }
    }
    return out;
  },
  store: {
    get<T>(key: string, fallback: T): T {
      try {
        const v = root.localStorage && root.localStorage.getItem(key);
        return v == null ? fallback : (JSON.parse(v) as T);
      } catch { return fallback; }
    },
    set(key, value) {
      try { if (root.localStorage) root.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage closed */ }
    },
    remove(key) {
      try { if (root.localStorage) root.localStorage.removeItem(key); } catch { /* ignore */ }
    },
  },
  Emitter,
  fmtTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    const mm = String(m).padStart(2, '0'), ss = String(s).padStart(2, '0');
    return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  },
  nextFrame: () => new Promise<void>(r => (root.requestAnimationFrame ? root.requestAnimationFrame(() => r()) : setTimeout(r, 0))),
  sleep: ms => new Promise<void>(r => setTimeout(r, ms)),
};

PB.U = U;
