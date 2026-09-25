# Pacman: The Back Rooms

A first-person horror escape game set behind the infamous level 256 of Pacman. It runs in the
browser with no install. English is the main language; Turkish is included (Settings → Language).

> Harlow, November 30, 1994, 2:11 AM, rain. You are Sam, twenty years old, sent to clear out the
> foreclosed Starlight Arcade. Seven years ago four kids vanished here. You were supposed to be
> with them. Cabinet #7 is still running with no plug in the wall, and there is a note taped to it:
> **DON'T PULL THE PLUG.**

## How to run

- **Easiest:** open `index.html` in a browser. three.js and the fonts come from a CDN, so an
  internet connection is needed.
- **Local server:** run `python3 -m http.server` in the repository folder and open
  `http://localhost:8000`.
- **Single file:** `python3 tools/build_single.py` bundles everything into
  `dist/pacman-arka-odalar.html`.
- The original 2D Pacman lives in `classic/index.html`, and is also playable on the free cabinet
  inside the arcade.

## Controls

| Key | Action |
| --- | --- |
| `W` `A` `S` `D` | Walk |
| Mouse | Look (click the game to lock the pointer) |
| `Shift` | Sprint (loud, uses breath). While hidden: **hold your breath** |
| `C` | Crouch (almost silent; opens doors slowly and quietly) |
| `E` | Interact: read, take, open, hide |
| `F` | Flashlight |
| `Z` / `X` | Lean left / right to peek around corners |
| `I` | Items, with a 3D inspect view |
| `J` | Journal: objective, the story so far, papers found, people |
| `Q` | Drink almond water (calms fear) |
| `G` | Throw a glow stick |
| `M` / `Tab` | Map |
| `Esc` / `P` | Pause |

On touch screens: a move stick bottom left, drag on the right to look, and action buttons.

## Chapters

Every chapter is somebody's memory, rebuilt wrong.

| # | Chapter | Whose memory | Threat | Goal |
| --- | --- | --- | --- | --- |
| P | Starlight Arcade, 1994 | Sam, now | the storm | Flashlight, power, Walt's office, the special token |
| 0 | The Lobby | the game | the Eater | Four power pellets for the EXIT panel; meet Eddie on the radio |
| 1 | Mill Warehouse | Billy | Billy (red), the Eater | Three fuses for the freight elevator; Billy's watch |
| 2 | Pipe Dreams | Billy, Clyde, Sam | Crawlers | Bleed three steam valves; the kids' fort |
| 3 | The Pool | Ivy | Ivy (blue) | Drain the pool; Ivy's glasses; Theo's letters |
| 4 | Harlow Mutual | Penny | Penny (pink) | Security code, keycard, fire stairs; Penny's mixtape |
| 5 | Harlow Middle School | all five, April 16, 1987 | the Hall Monitor | Closet code, janitor's keys, the chained fire exit; hide in lockers |
| 6 | Lights Out | Clyde | Clyde (orange), Grinners | Three generators; Clyde's lighter |
| 7 | Harlow Mall | all five, December 1986 | Mannequins | Four photo-booth frames |
| 8 | Starlite Motor Inn | Eddie | the Neighbor | Room 12 and Eddie's notebook; trust him or not |
| 9 | St. Agnes Hospital | Walt | the Counter | Five diary pages, Room 207 |
| 10 | Maple Street | Sam | the Neighbor | Clyde's house, your house, the corner |
| 11 | The Workshop | Walt, April 1987 | Chompy | Walt's key, the Kernel's dials |
| 12 | The Maze | level 255 | the Eater, the ghosts | Four corner pellets, the ghost house |
| 13 | Kill Screen | level 256 | the Eater, the Counter | The choice |

Four ghosts can be freed by returning their mementos to their shrines. There are four endings:
walk out alone, hold the door for Eddie, pull the plug with all four ghosts, or the true ending,
which needs all four ghosts, all eight of Lily's drawings and Walt's memory of Room 207.

## What's in it

- **Story:** about 150 documents: notes, letters, diaries, tapes, phone messages, screens, photos,
  wall writing and Lily's crayon drawings, plus radio conversations and echoes of the past. The
  journal (`J`) keeps the story so far. See `docs/STORY.md` for the story bible.
- **Creatures:** the Eater (fast in straight corridors, slow in turns, the lights flicker when it
  is near), four ghosts that move like the kids they were, Crawlers and Grinners that hate light,
  the Counter that comes closer while you look away, the Hall Monitor that only sees what its
  flashlight touches, Mannequins, the Neighbor who uses voices you know, and Chompy.
- **Survival:** sprinting and breath, crouching, leaning, hiding under desks and in lockers (and
  holding your breath when something comes close), quiet doors, power pellets, flashlight battery,
  fear, glow sticks, almond water, tape-player saves.
- **Graphics:** no image files; every texture is generated in code. GPU light baking with bounce
  light, screen-space ambient occlusion and reflections, volumetric light, motion blur, bloom with
  lens dirt, ACES tone mapping, a rainy street outside, detailed models, first-person hands.
  Presets up to Ultra, which is meant to push a strong PC.
- **Sound:** every sound is synthesized at load time (footsteps per surface, doors, rain, room
  tones, breathing, creatures, radio and tape voices), with 3D positioning, occlusion, per-room
  reverb and a score that changes with each chapter.
- **Settings:** graphics, display, audio (separate channels, HRTF), controls, gameplay (three
  difficulties, jump-scare intensity, hints), subtitles and sound captions, language.

## Development

```
index.html           the shell (menus, HUD, overlays)
css/game.css         interface
js/i18n.js           language packs; js/text/en and js/text/tr hold every string
js/levels.js         chapter definitions
js/levelgen*.js      level generators (DOM-free, tested in Node)
js/story.js          localized access to the story
js/textures.js       procedural textures; js/art.js drawings and photos
js/models*.js        prop models and materials
js/world.js          geometry, baked light, fixtures, doors; js/exterior.js outside
js/post.js           post-processing
js/sfx.js, audio.js  sound synthesis and the audio engine
js/entities*.js      creatures and AI
js/bag.js            items and journal
js/chapters*.js      chapter scripts
js/game.js           game loop, saving
tests/               level and text tests
```

Tests: `node tests/levelgen.test.js` and `node tests/text.test.js`.
