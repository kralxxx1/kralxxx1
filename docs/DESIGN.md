# LEVEL 256 — Game Design (V6)

Gameplay companion to `STORY.md`. Every chapter is a hand-authored map (`js/maps/*.js`, ASCII grid
compiled by `js/authored.js`), with its own creatures (`js/species/*.js`), its own way out, and one
chase that starts when the thing you need is taken.

## Global rules

- **Dark by default.** Most light comes from the player's flashlight and a few practical lights per
  map. Ambient is near black; fog colour matches the place.
- **Quiet by default.** Room tone is near silence (a low air presence, a faint mains hum). No phantom
  footsteps, no static, no stingers, no random "scare" events. Creatures announce themselves by small
  sounds (a rustle, a drip, a bell far off), then by being there.
- **No faces.** No creature ever shows a face: wet hair hangs over it, a shroud or a veil covers it, a
  sack is tied over it, or a hood has nothing inside but dark.
- **Giants.** The creatures that were people stand 2.2–2.9 m. They stoop under low ceilings and duck
  through doorways; their footfalls jolt the view when they are close; they cannot follow into a
  crawlway.
- **Headroom.** Under a roof lower than 1.85 m you stoop, under 1.45 m you crawl (eye height from the
  roof, slower, narrower view, louder breath).
- **Dark places.** A region can swallow light: the torch gutters and dies inside it and comes back
  outside. Only phosphorescent paint glows there.
- **Doors** are joinery and sound like what they are made of: handle spring and follower, latch tongue,
  the leaf's own modes (panelled, hollow, boarded, steel, cold-room, iron gate), the frame taking the
  slam, a dry hinge on some, timed to the leaf's eased swing.
- **Appearances.** Creatures are placed out of sight and move silently until they are close, so they
  are *found* rather than heard coming. Each species has an ambush (floor, wall, water, ceiling, seat,
  snow) that makes it appear right there.
- **Chases.** A chase is close breathing behind the player's head (positional, low-passed), the
  creature's footsteps, the player's own breath and heartbeat. Music during a chase is a low pulse, not
  a fanfare. Camera shake grows with proximity.
- **Stamina.** Breathing at low stamina is short, soft and quiet. No vocal catch.
- **Footsteps.** Surface by surface: carpet, wet carpet, concrete, tile, linoleum, wood, steel deck,
  grating, gravel, grass, mud, snow, ice, water, rock, leaves, rail ballast.
- **Death.** Every species kills differently, as a short choreographed sequence (camera + body + sound),
  never gore.
- **Supplies.** Batteries (R to reload), a lost thermos of tea (Q: calms, restores stamina), glowsticks
  (G: thrown light, also a noise lure), and anything light enough to throw.
- **Hiding.** Lockers, wardrobes, under beds and desks, car back seats, behind counters.
- **The Eater appears only in Chapter 1.**

## Creature traits (composable)

| Trait | Meaning |
| --- | --- |
| `sight` | sees the player in its view cone, scaled by light on the player |
| `hearing` | reacts to footsteps, doors, throws, running |
| `vibration` | senses footsteps through the ground only (radius by gait; crouch = 0) |
| `lightSeeker` | comes toward the player's flashlight and other lights |
| `lightWake` | dormant until light rests on it |
| `moveWhenMoving` | only moves while the player moves |
| `freezeWhenSeen` | only moves while not observed |
| `stillnessHunter` | rises when the player stands still too long |
| `warmthWake` | only moves while the player is near a heat source |
| `ticketRule` | ignores a player holding a valid ticket |
| `musicRule` | moves only while the carousel music plays |
| `ambush:floor/wall/water/ceiling/seat/snow/ice/gap` | appears from there when triggered |
| `confined` | cannot leave its zone (water, church, kitchen, gangway) |
| `charger` | runs at the player in a straight line, stunned on impact |
| `alarm` | does not kill; calls the others when it sees the player |

## Chapters

### 0 Depot 9 — prologue
- **Map:** station concourse (glass roof, rain), lost property counter, sorting room with parcel chute
  and breaker, the archive (tall shelf aisles in a grid of long straight aisles, not a maze), Otto's
  office, the freight elevator.
- **Objectives:** open the parcel → restore power → find the 1979 ledger → open Otto's office → take the
  elevator key → ride down.
- **Creatures:** the Sorter (non-hostile, vanishes in light), Wren glimpse.
- **Collectibles:** drawing 1, Otto's badge.

### 1 The Underneath — backrooms
- **Map:** the only procedural map left: yellow rooms, wet carpet, piles of lost things.
- **Objectives:** find the walkie (Otto) → four lost lights → Index Door → leave.
- **Chase:** taking the fourth light wakes the Eater.
- **Creatures:** the Eater ×1 (sight + hearing; lost lights scare it); Wallpaper Men ×6 (`ambush:wall`,
  `freezeWhenSeen`); Hummers ×4 (invisible, `hearing` only; lights flicker and the hum swells near them).
- **Kills:** Eater swallows; Wallpaper Man wraps the face like wet paper; Hummer: lights burst, the hum
  becomes a pressure, collapse.

### 2 Saint Brigid — ferry in fog
- **Map:** open boat deck (fog, sea, lifeboats), passenger lounge, cabin corridor, captain's cabin,
  bridge, car deck (cars, a truck, a bus; half flooded), engine room (flooded).
- **Objectives:** log page (captain's cabin) → logbook (bridge) → davit key (bridge) → winch crank
  (engine room) → lower lifeboat 2.
- **Chase:** taking the crank wakes the Drowned in the engine room.
- **Creatures:** the Drowned ×6 (`ambush:water`, `hearing`, `confined:water+6m`); the Bellman ×1
  (open deck, `hearing`, rings when hunting); Passengers ×8 (`ambush:seat`, `lightWake`).
- **Kills:** Drowned pull under; Bellman's bell comes down over the head; Passengers drag you under the
  seats.

### 3 Pinewood — drive-in and forest
- **Map:** forest ring, drive-in field with five rows of cars and speaker posts, the screen with a
  playground under it, the concession building (snack bar, projection booth, store room with the
  generator, office), the toilets block at the trees, the entrance road with the ticket kiosk, the
  marquee and the chained gate, a forest path to the hunters' tree stand.
- **Objectives:** the wagon (battery from the booth, petrol from the generator's drain tap, keys from the
  kiosk's lost box) → first start fails → stub (toilets) → the draw can (booth) → start → drive out.
- **Chase:** the first turn of the key (the engine dies) wakes everything; filling the can is loud too.
- **Creatures:** the Pines ×6 (`moveWhenMoving`); the Stag ×1 (`hearing`, `charger`, stunned by trees and
  cars); Ushers ×2 (see only down their red torch beam; call the others, then come for you).
- **Kills:** Pines lift you into the branches; the Stag pins and drags; the Usher leads you to a seat in
  a car and the doors lock.

### 4 Hollow Creek — mine
- **Map:** surface yard in snow (headframe, winding house, lamp room, the dry, foreman's office), the
  cage, the 400-foot level: cage station with the tally board, shift boss's cabin, lunch room, generator
  room, main haulage with rails and tubs, timbered dirt drifts, the gas drift, the old stope, a flooded
  working, fuel store, powder magazine, the fire door at the bottom of the east drift.
- **Objectives:** canary → cage down → the tin (4 tags) + 3 tags by the fire door → tally board → diesel
  → generator (loud) → cage up.
- **Set pieces:** gas (keep low or cough, and coughing is heard); the knocking; the cage stops halfway up
  and must be restarted with the lever while a Timber Crawler comes down the wall.
- **Phobias:** the squeeze (the fallen cross-cut between the gas drift and the east drift: a metre of
  headroom, a channel a metre wide between cribs and fallen rock, a crawler in the roof, burrowers under
  the mud; the short way to the diesel); the old stope, where no lamp works and the escape-route arrows
  glow.
- **Creatures:** Burrowers ×7 (`vibration`, `ambush:floor`, dirt only); Lamplighters ×3 (`lightSeeker`, their
  own cap lamps); Timber Crawlers ×3 (`ambush:ceiling`, visible in the timbers if you look up).
- **Kills:** dragged into the earth; lamp in the eyes, hand over the mouth; dropped on from above.

### 5 Weisshorn — mountain hotel in a blizzard
- **Map:** the hotel (fireplace hall, bar, reception, Greta's office, dining room, kitchen + cold room,
  service corridor, guest corridor and rooms, ski room), outside in the storm the terrace, the snowfield
  and the cable car station (platform, gondola, machine room).
- **Objectives:** guest book / telegram board → the telegram in the office stove → pin it → master key
  (kitchen, the Cook) → start the cable car → board.
- **Set pieces:** cold (outside it builds fast; a fire takes it away but wakes the Frozen); boarding the
  gondola while footprints come across the snow and something hits the glass as the doors close.
- **Creatures:** the Frozen ×6 (`warmthWake`); the Whiteout ×1 (outdoors, seen only as footprints and,
  close, a shape in the snow; `hearing`); the Cook ×1 (`confined:kitchen`, `hearing`).
- **Kills:** frost closes over the eyes (the Frozen, and the cold itself); the snow swallows; the hook.

### 6 Gammel Ostra — the village on the night it drowned (1964)
- **Map:** muddy lanes and felled trees in the rain, a bridge over the river already over its banks, the
  church, Signe's house with the lamp lit, the school and its attic, the shop, the dam wall with its
  service ladder.
- **Objectives:** Signe's house key → music box (school attic) → mantel → climb the dam ladder.
- **Chase:** the water comes back: a rising-water run to the ladder.
- **Creatures:** the Silted ×8 (`stillnessHunter`, `ambush:floor` in mud); Long Ones ×4 (`ambush:water`
  in ditches and wells); the Choir (`confined:church`, stops singing before it turns).
- **Kills:** pulled into the mud; coiled and dragged into the channel; taken into the pews.

### 7 Nordlys Express — night train
- **Map:** platform (start), sleeping cars ×3, dining car, baggage car, locomotive; gangways between.
- **Objectives:** a valid ticket (dining car) → Lina's ticket (sleeping car 2, under the bunk) →
  conductor's punch (baggage car) → emergency brake (locomotive).
- **Chase:** taking Lina's ticket turns the Conductor.
- **Creatures:** the Conductor ×1 (`ticketRule`); Sleepers ×6 (`hearing`, blind); Underhands
  (`ambush:gap` in gangways).
- **Kills:** put off the train into the snow; pulled into a bunk under a blanket; dragged down between
  the cars.

### 8 Falk's Carnival — fairground at night
- **Map:** harbour fairground: entrance (locked fence), carousel, mask stall, funhouse, ferris wheel,
  food stalls, ghost train, Pipo's trailer.
- **Objectives:** fuse (funhouse) → ghost train power → Pipo's nose (mask stall) → trailer mirror →
  ride the ghost train out.
- **Chase:** the carousel music starts when the nose is taken; the horses come off their poles.
- **Creatures:** Masks ×6 (`freezeWhenSeen`); Carousel Horses ×4 (`musicRule`, `sight`);
  Laughing Lotte ×1 (the funhouse's laughing automaton come down off her stand; `hearing`, huge, slow, unstoppable).
- **Kills:** the masks press in from all sides; trampled; Lotte lifts you to her laughing mouth.

### 9 Lake Ostra — finale
- **Map:** grandmother's house (warm, safe), the shore, the pier, the boathouse, the huts, open ice,
  the thin ice over the river channel, the church spire in the ice.
- **Objectives:** follow Wren's footprints out onto the ice → the huts (remember) → the thin ice → choose.
- **Creatures:** the Hush ×1 (`hearing`; sound fades near it); Under-ice ×4 (`ambush:ice` when running
  on thin ice); the Laughers ×3 (`alarm`).
- **Kills:** the scarf; through the ice.
