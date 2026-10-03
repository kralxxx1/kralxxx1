# LEVEL 256 — Lost Property

A first-person story horror game. It runs in the browser with no install, and can be packaged as a
desktop game. It is fully translated into 13 languages (Settings → Language).

> Halvard, the night of 13 January 1998, rain on the glass roof of the central station. Under the
> concourse is Depot 9, the lost property office, where everything the city loses waits ninety days for
> somebody to come back for it. Ada Lind has worked the night counter for eight years, because nobody
> comes down after midnight.
>
> At 02:56 a parcel comes down the chute: a child's red mitten, left hand, found on Lake Ostra on
> 14 January 1979, the day Ada's little sister Wren vanished on the ice. The tag says **HOLD FOR: ADA
> LIND**. The 1979 ledger says the claimant is *her sister, when she remembers*.

Ada takes the freight elevator that nobody has used since 1964 down to a button someone has scratched
256, into the Underneath: shelf after shelf of everything nobody came back for. Each shelf is a place
and a night where something was lost and somebody lied about it. Find the lie, put the lost thing back
where it belongs, and the place lets you go.

## How to run

- **Local server (recommended):** run `python3 -m http.server` in the repository folder and open
  `http://localhost:8000`.
- **Directly:** open `index.html` in a browser. three.js and the fonts come from a CDN, so an
  internet connection is needed.
- **Single file:** `python3 tools/build_single.py` bundles everything into `dist/level256.html`.
- **Desktop (Windows, Linux, macOS):** `cd desktop && npm ci && npm start`. The Electron build carries
  local copies of three.js, the physics engine and every font, so it runs fully offline. `npm run dist:win`
  and `npm run dist:linux` make the folders for Steam. See `docs/STEAM.md` for building, uploading and the
  store page.

## Controls

| Key | Action |
| --- | --- |
| `W` `A` `S` `D` | Walk |
| Mouse | Look (click the game to lock the pointer) |
| `Shift` | Sprint (loud, uses breath). While hidden: **hold your breath** |
| `C` | Crouch (almost silent; opens doors slowly and quietly) |
| `E` | Interact: read, take, open, hide; hold for long actions |
| `F` | Torch |
| `R` | Change the torch batteries |
| `Z` / `X` | Lean left / right to peek around corners |
| `V` | Look back over your shoulder |
| `I` | Items, with a 3D inspect view |
| `J` | Journal: objective, the story so far, papers found, people |
| `Q` | Eat a barley sugar (steadies your hands and your breath) |
| `G` | Throw a glow stick |
| `M` / `Tab` | Map |
| `Esc` / `P` | Pause |

With a controller (Xbox layout; Steam Input maps PlayStation, Switch and Steam Deck controls to it): left stick
walk, right stick look, A interact, B crouch, X batteries, Y torch, LB/RB lean, RT or L3 run, LT glow
stick, R3 look back, D-pad journal / barley sugar / items, View map, Menu pause. The menus work with the
D-pad, A and B, and scares rumble.

On touch screens: a move stick bottom left, drag on the right to look, and action buttons.

## Chapters

Every chapter is a different place, built by hand, with its own creatures, its own lie and its own way
out. The story bible, with the full timeline, is in `docs/STORY.md`.

| # | Chapter | Place and night | Creatures | The lie, and the way out |
| --- | --- | --- | --- | --- |
| P | Night Shift | Depot 9, Halvard, 13 January 1998 | the Sorter | The parcel, the 1979 ledger, Otto Brandt's office and his freight elevator |
| 1 | Unclaimed | Level 256, the Underneath | the Eater, the flat men in the wallpaper, the Hummer | Four lost lights for the Index Door, with the Eater awake behind you |
| 2 | Fog Bell | MS Saint Brigid, 9 November 1987 | the Drowned, the Passengers, the Bellman | The captain's torn logbook page; lifeboat 2 by hand |
| 3 | Double Feature | Pinewood Drive-In, 22 August 1975 | the Pines, the Stag, the Usher | A boy's ticket stub for the draw; a dead wagon brought back to life |
| 4 | Seven Below | Hollow Creek Mine, 3 March 1956 | the Burrowers, the Lamplighters, the Timber Crawler | Seven brass tags back on the tally board; the cage up the shaft |
| 5 | Whiteout | Berghotel Weisshorn, 28 February 1983 | the Frozen Guests, the Cook, the Whiteout | The telegram that never burned; the cable car down out of the storm |
| 6 | Low Water | Gammel Ostra, 2 October 1964 | the Silted, the Long Ones, the Choir | A music box back on the mantel; the dam ladder as the valley floods |
| 7 | Last Stop | The Nordlys Express, 19 December 1990 | the Conductor, the Sleepers, the Underhand | A girl's ticket, punched; the emergency brake at Kvitfjell |
| 8 | Bright Lights | Falk's Carnival, 30 September 1984 | the Masks, the Carousel Horses, Laughing Lotte | A clown's nose back on his mirror; the ghost train out through the fence |
| 9 | The Ice | Lake Ostra, 14 January 1979 | the Hush, the thing under the ice, the laughing kids | Ada's own lie, and what she says to Wren |

There are three endings, decided on the ice: **Thaw**, **Snowfall** and **Morning**. Morning needs all
eight of Wren's drawings and Otto's badge brought down from his desk to the Index Door.

## What's in it

- **Story:** 94 documents (notes, letters, diaries, telegrams, transcripts, newspapers, ledgers, wall
  writing and Wren's crayon drawings), channel nine conversations with Otto, and an ending told in your
  own words. Each shelf is a small, complete story of its own and a piece of the one underneath them all.
  The journal (`J`) keeps the story so far.
- **Creatures:** 28 species, three of their own on every shelf, each with one rule to learn: some only
  hear, some only see light, some only move while you move, some only while nobody is watching them, some
  come up out of the ground or the water where you stand. Every one has its own model, its own sounds
  and its own way of killing you.
- **Survival:** sprinting and breath, crouching, leaning, hiding under beds, bunks and desks and in
  lockers (and holding your breath when something comes close), quiet doors, the torch and its
  batteries, fear, glow sticks, barley sugar, the cold outside the Weisshorn, rising water.
- **Graphics:** no image files; every texture is generated in code. GPU light baking with bounce
  light, screen-space ambient occlusion and reflections, volumetric light, motion blur, bloom with
  lens dirt, ACES tone mapping, fog, rain and snow, sculpted creature and vehicle models, first-person
  hands.
- **Sound:** every sound is synthesized at load time (footsteps per surface, doors, weather, room
  tones, breathing, creatures, the radio), with 3D positioning, occlusion, per-room reverb and a score
  for each chapter. A creature close behind you is heard at your neck before it is seen.
- **Settings:** graphics, display, audio (separate channels, HRTF), controls, gameplay (three
  difficulties, jump-scare intensity, hints), subtitles, optional sound captions, language.

## Languages

English (the original), Turkish, German, French, Spanish, Italian, Portuguese (Brazil), Polish,
Russian, Simplified Chinese, Japanese, Korean and Arabic. Every menu, document, objective and radio
line is translated, and the game asks for a language on first launch. Arabic is laid out right to
left. Each language has its own typefaces for the terminal, printed and handwritten documents; every
writer in the story has their own hand. Without an internet connection, the system fonts take over.

## Development

```
index.html           the shell (menus, HUD, overlays)
css/game.css         interface
js/i18n.js           language packs; js/text/<lang> holds every string (one file per chapter)
js/fonts.js          per-language typefaces
js/levels.js         chapter definitions; js/maps/*.js the hand-built maps
js/authored.js       builds a level from an authored map; js/levelgen*.js the Underneath
js/story.js          localized access to the story
js/textures*.js      procedural textures; js/art.js drawings; js/decor.js things on walls
js/models*.js        prop and vehicle models and materials
js/creatures.js      the creature framework; js/species*.js the 28 species; js/kills.js deaths
js/world*.js         geometry, baked light, fixtures, doors; js/exterior.js and weather.js outside
js/post.js           post-processing
js/sfx*.js, audio*.js  sound synthesis and the audio engine
js/bag.js            items and journal
js/chapters5.js      the chapter scripts
js/game.js           game loop, saving
tests/               level and text tests
desktop/             Electron wrapper for the desktop and Steam builds (docs/STEAM.md)
```

Tests: `node tests/levelgen.test.js` and `node tests/text.test.js`. The desktop build has an automated
check: `cd desktop && npm run smoke`.
