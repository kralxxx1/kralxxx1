# LEVEL 256 — The Starlight Arcade

A first-person story horror game. It runs in the browser with no install, and can be packaged as a
desktop game. English is the main language; Turkish is included (Settings → Language).

> Harlow, Pennsylvania. November 30, 1994, 2:11 AM, rain. You are Sam, twenty, a night driver for a
> moving company, and you let yourself into the foreclosed Starlight Arcade four hours before the
> auction crew. Seven years ago four kids went into this arcade after closing and never came out. You
> were supposed to be with them. You went home at 9:40. That is what you have told everyone.
>
> Cabinet #7 is still running with no plug in the wall. On its screen, a prompt that has been waiting
> since 1987: **PLAYER 1: SAM — CONTINUE?**

Everything in the game is original. **Hungry House** (Brightline Amusements, 1981), the arcade game
inside the story, is fictional: a horned little Muncher eats the stars of a haunted house while four
hooded Haunts chase it, and four lanterns turn the tables. It is playable on the free cabinet inside
the arcade.

## How to run

- **Local server (recommended):** run `python3 -m http.server` in the repository folder and open
  `http://localhost:8000`.
- **Directly:** open `index.html` in a browser. three.js and the fonts come from a CDN, so an
  internet connection is needed.
- **Single file:** `python3 tools/build_single.py` bundles everything into `dist/level256.html`.

## Controls

| Key | Action |
| --- | --- |
| `W` `A` `S` `D` | Walk |
| Mouse | Look (click the game to lock the pointer) |
| `Shift` | Sprint (loud, uses breath). While hidden: **hold your breath** |
| `C` | Crouch (almost silent; opens doors slowly and quietly) |
| `E` | Interact: read, take, open, hide |
| `F` | Flashlight |
| `R` | Change the flashlight batteries |
| `Z` / `X` | Lean left / right to peek around corners |
| `V` | Look back over your shoulder |
| `I` | Items, with a 3D inspect view |
| `J` | Journal: objective, the story so far, papers found, people |
| `Q` | Drink a Star Pop (calms fear, gives your breath back) |
| `G` | Throw a glow stick |
| `M` / `Tab` | Map |
| `Esc` / `P` | Pause |

On touch screens: a move stick bottom left, drag on the right to look, and action buttons.

## Chapters

Every chapter is somebody's memory, swallowed by the game and rebuilt wrong. The story bible, with
the full timeline and the rules of the House, is in `docs/STORY.md`.

| # | Chapter | Whose memory | Threat | Goal |
| --- | --- | --- | --- | --- |
| P | Starlight Arcade | Sam, 1994 | the storm | Flashlight, power, Walt's office, the gold token |
| 0 | Attract Mode | the game, waiting | the Eater | Four lanterns for the EXIT panel; Eddie on the walkie-talkie |
| 1 | Mill Warehouse | Danny | Danny (red), the Eater | Three fuses for the freight elevator; Danny's watch |
| 2 | Pipe Dreams | Danny, Toby, Sam, 1985 | Crawlers | Bleed three steam valves; the fort |
| 3 | The Pool | Nell | Nell (teal) | Drain the pool; Nell's glasses; Theo's letters |
| 4 | Harlow Mutual | Rosie | Rosie (violet) | Security code, keycard, fire stairs; Rosie's mixtape |
| 5 | Harlow Junior High | all five, April 16, 1987 | the Hall Monitor | Closet code, custodian's keys, the chained fire exit; the pact |
| 6 | Lights Out | Toby | Toby (amber), Grinners | Three generators; Toby's lighter |
| 7 | Harlow Mall | all five, December 1986 | Mannequins | Four photo-booth frames |
| 8 | Blue Moon Motor Inn | Eddie | the Neighbor | Room 12 and Eddie's notebook; trust him or not |
| 9 | St. Agnes | Walt, October 1983 | the Counter | Five diary pages, Room 207 |
| 10 | Maple Street | Sam, April 16–17, 1987 | the Neighbor | Toby's house, your house, the corner |
| 11 | The Workshop | Walt, April 1987 | Chompy | Walt's key, the Kernel's dials, the 3:17 tape |
| 12 | LEVEL 255: The House | the game | the Eater, the Haunts | Four corner lanterns, the Haunts' house |
| 13 | LEVEL 256: Kill Screen | everyone | the Eater, the Counter | The choice |

The four Haunts can be freed by returning what they loved to their shrines. There are four endings:
take the EXIT, hold the door for Eddie, pull the plug with five hands, or the true ending, which
needs all four Haunts, all eight of Lily's drawings and Walt's memory of Room 207.

## What's in it

- **Story:** about 150 documents (notes, letters, diaries, tapes, phone messages, screens, photos,
  wall writing and Lily's crayon drawings), walkie-talkie conversations and echoes of the past. The
  truth about the night of April 16, 1987 is prepared from the first room and told in full near the
  end. The journal (`J`) keeps the story so far.
- **Creatures:** the Eater (fast in straight corridors, slow in turns; the lights dim when it is
  near), four Haunts that move like the kids they were, Crawlers and Grinners that hate light, the
  Counter that comes closer while you look away, the Hall Monitor that only sees what its flashlight
  touches, Mannequins, the Neighbor who uses voices you know, and Chompy.
- **Survival:** sprinting and breath, crouching, leaning, hiding under desks and in lockers (and
  holding your breath when something comes close), quiet doors, lanterns, flashlight battery, fear,
  glow sticks, Star Pop, tape-player saves.
- **Graphics:** no image files; every texture is generated in code. GPU light baking with bounce
  light, screen-space ambient occlusion and reflections, volumetric light, motion blur, bloom with
  lens dirt, ACES tone mapping, a rainy street outside, detailed models, first-person hands.
- **Sound:** every sound is synthesized at load time (footsteps per surface, doors, rain, room
  tones, breathing, creatures, radio and tape voices), with 3D positioning, occlusion, per-room
  reverb and a score that changes with each chapter.
- **Settings:** graphics, display, audio (separate channels, HRTF), controls, gameplay (three
  difficulties, jump-scare intensity, hints), subtitles, optional sound captions, language.

## Development

```
index.html           the shell (menus, HUD, overlays)
css/game.css         interface
js/i18n.js           language packs; js/text/<lang> holds every string
js/levels.js         chapter definitions
js/levelgen*.js      level generators (DOM-free, tested in Node)
js/story.js          localized access to the story
js/textures.js       procedural textures; js/art.js drawings and photos
js/models*.js        prop models and materials; js/monsters*.js creatures
js/world.js          geometry, baked light, fixtures, doors; js/exterior.js outside
js/post.js           post-processing
js/sfx.js, audio.js  sound synthesis and the audio engine
js/entities*.js      creatures and AI
js/arcade2d.js       Hungry House, the playable arcade game
js/bag.js            items and journal
js/chapters*.js      chapter scripts
js/game.js           game loop, saving
tests/               level and text tests
```

Tests: `node tests/levelgen.test.js` and `node tests/text.test.js`.
