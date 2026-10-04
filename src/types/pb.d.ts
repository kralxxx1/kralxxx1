/* Types of the game's namespace (window.PB). The typed modules (util, i18n, fonts, the graphics layer)
   are described here; every other module registers loosely typed members through the index signature. */

export interface Rng {
  (): number;
  range(a: number, b: number): number;
  int(a: number, b: number): number;
  pick<T>(arr: readonly T[]): T;
  chance(p: number): boolean;
  shuffle<T>(arr: T[]): T[];
  sign(): 1 | -1;
}

export interface Store {
  get<T>(key: string, fallback: T): T;
  set(key: string, value: unknown): void;
  remove(key: string): void;
}

export interface EmitterInstance {
  handlers: Record<string, Array<(...args: any[]) => void>>;
  on(name: string, fn: (...args: any[]) => void): () => void;
  off(name: string, fn: (...args: any[]) => void): void;
  emit(name: string, ...args: any[]): void;
}

export interface Util {
  clamp(v: number, a: number, b: number): number;
  lerp(a: number, b: number, t: number): number;
  invLerp(a: number, b: number, v: number): number;
  smoothstep(a: number, b: number, v: number): number;
  damp(a: number, b: number, lambda: number, dt: number): number;
  fract(v: number): number;
  dist2(ax: number, az: number, bx: number, bz: number): number;
  dist(ax: number, az: number, bx: number, bz: number): number;
  angleWrap(a: number): number;
  angleDamp(a: number, b: number, lambda: number, dt: number): number;
  easeInOut(t: number): number;
  easeOut(t: number): number;
  rng(seed: number): Rng;
  hashStr(str: string): number;
  hash2(x: number, y: number, seed: number): number;
  perlin(x: number, y: number, period: number, seed: number): number;
  fbmField(size: number, basePeriod: number, octaves: number, seed: number, gain?: number): Float32Array;
  upsample(src: Float32Array, sSize: number, dSize: number): Float32Array;
  store: Store;
  Emitter: new () => EmitterInstance;
  fmtTime(sec: number): string;
  nextFrame(): Promise<void>;
  sleep(ms: number): Promise<void>;
}

export type Vars = Record<string, string | number | null | undefined>;

export interface I18nApi {
  LANGS: Array<[string, string]>;
  lang: string;
  available(): Array<[string, string]>;
  detect(): string;
  register(lang: string, section: string, obj: Record<string, unknown>): void;
  section(section: string, lang?: string): Record<string, any>;
  raw(section: string, path: string, lang?: string): unknown;
  get(section: string, path: string): unknown;
  t(key: string, vars?: Vars): string;
  fill(s: string, vars: Vars): string;
  has(lang: string): boolean;
  stored(): string | null;
  set(lang: string, persist?: boolean): void;
  onChange(fn: (lang: string) => void): void;
  apply(scope: ParentNode | null | undefined): void;
}

export interface FontsApi {
  BASE: Record<'term' | 'pix' | 'hand' | 'type', string>;
  lang: string;
  stack(role: 'term' | 'pix' | 'hand' | 'type'): string;
  canvas(font: string): string;
  use(lang: string): void;
  ready(): Promise<void>;
  lines(para: string, maxW: number, measure: (s: string) => number): string[];
}

export type SettingValue = string | number | boolean;
export interface SettingDefinition {
  key: string;
  tab: string;
  type: 'select' | 'range' | 'toggle';
  def: SettingValue;
  options?: Array<[string | number, string]>;
  min?: number; max?: number; step?: number;
  fmt?: (v: number) => string;
  transient?: boolean;
  reload?: boolean;
}
export interface DifficultyTuning { speed: number; hearing: number; sight: number; battery: number; catchGrace: number; fear: number; menace: number }
export interface SettingsApi {
  SCHEMA: SettingDefinition[];
  PRESETS: Record<string, Record<string, SettingValue>>;
  PRESET_KEYS: string[];
  TABS: string[];
  data: Record<string, any>;
  events: EmitterInstance;
  fresh: boolean;
  def(key: string): SettingValue | undefined;
  get(key: string): any;
  set(key: string, value: unknown, silent?: boolean): void;
  reset(): void;
  load(): Record<string, any>;
  save(): void;
  valid(s: SettingDefinition, v: unknown): SettingValue | unknown;
  autoDetect(): void;
  difficulty(): DifficultyTuning;
}

export interface PBNamespace {
  Settings: SettingsApi;
  U: Util;
  I18N: I18nApi;
  Fonts: FontsApi;
  t(key: string, vars?: Vars): string;
  [member: string]: any;
}
