/* What the game's modules put on window. PB is the game's own namespace: every module registers its piece
   on it (PB.U, PB.I18N, PB.Settings, PB.Props, ...). The typed core and graphics layer declare their pieces
   in ./pb.d.ts; the rest is still loosely typed. */
import type { PBNamespace } from './pb';

declare global {
  interface Window {
    PB: PBNamespace;
  }
  // eslint-disable-next-line no-var
  var PB: PBNamespace;
}
export {};
