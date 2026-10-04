/* LEVEL 256: entry point. Order matters: the globals first (three.js, the physics engine), then the
   styles, then the game's modules, which register themselves on window.PB and start the game when the
   last of them (game.js) has loaded. */
import './globals';
import './styles/game.css';
import './legacy/index';
