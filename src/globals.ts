/* The game's modules were written against two globals: THREE and (when physics is available) CANNON.
   This module is imported first, so both exist before any of them runs. */
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

declare global {
  interface Window {
    THREE: typeof THREE;
    CANNON: typeof CANNON;
  }
}

window.THREE = THREE;
window.CANNON = CANNON;
