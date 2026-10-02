# LEVEL 256 — Game Design (V5)

Gameplay companion to `STORY.md`. Every chapter is a hand-authored map (`js/maps/*.js`, ASCII grid
compiled by `js/authored.js`), with its own creatures (`js/species/*.js`), its own way out, and one
chase that starts when the thing you need is taken.

## Global rules

- **Dark by default.** Most light comes from the player's flashlight and a few practical lights per
  map. Ambient is near black; fog colour matches the place.
- **Quiet by default.** Room tone is low. No stingers, no sudden loud one-shots. Creatures announce
  themselves by small sounds (a rustle, a drip, a bell far off), then by being there.
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
- **Map:** forest ring, drive-in field with car rows, the screen, projection booth, snack bar, ticket
  kiosk, toilets block, forest paths, the exit road (gate).
- **Objectives:** ticket stub (toilets) → reel can (booth) → battery (booth) → keys (kiosk) → fuel
  (snack bar) → start the sedan in row 5.
- **Chase:** turning the key the first time (the engine fails) brings everything.
- **Creatures:** the Pines ×6 (`moveWhenMoving`); the Stag ×1 (`hearing`, `charger`); Ushers ×2
  (`sight` by their red torch, `alarm`).
- **Kills:** Pines lift you into the branches; the Stag pins and drags; the Usher leads you to a seat in
  a car and the doors lock.

### 4 Hollow Creek — mine
- **Map:** surface headframe yard (snow), cage station, 400-foot level: main haulage way with rails,
  side drifts, the sealed fire door, the underground lake, the tally board, generator room.
- **Objectives:** canary → seven tally tags → tally board → generator fuel → hoist switch → ride the cage.
- **Chase:** the cage ride: things climb the shaft; the cage stops once and must be restarted.
- **Creatures:** Burrowers ×8 (`vibration`, `ambush:floor`); Lamplighters ×4 (`lightSeeker`);
  Timber Crawlers ×3 (`ambush:ceiling`).
- **Kills:** dragged into the earth; lamp in the eyes, hand over the mouth; dropped on from above and
  pulled up into the dark.

### 5 Weisshorn — ski lodge in a blizzard
- **Map:** lodge (fireplace hall, reception, dining room, kitchen + cold room, guest corridor, Greta's
  office), outside in the storm: terrace, the cable car station.
- **Objectives:** telegram (Greta's office) → reception board → master key → cable car power → board.
- **Chase:** the Whiteout comes across the terrace while the car is boarding.
- **Creatures:** the Frozen ×6 (`warmthWake`); the Whiteout ×1 (outdoors, invisible, footprints,
  `hearing`); the Cook ×1 (`confined:kitchen+service`, `hearing`).
- **Kills:** frost closes over the eyes; the snow swallows; the hook drags you to the cold room.

### 6 Gammel Ostra — drained village
- **Map:** mud streets, a bridge over the old river channel, the church, Signe's house, the school,
  houses with waterlines, the dam wall with its service ladder.
- **Objectives:** Signe's house key → music box (school attic) → mantel → climb the dam ladder.
- **Chase:** the water comes back: a rising-water run to the ladder.
- **Creatures:** the Silted ×8 (`stillnessHunter`, `ambush:floor` in mud); Long Ones ×4 (`ambush:water`
  in ditches and wells); the Choir (`confined:church`, stops singing before it turns).
- **Kills:** pulled into the mud; coiled and dragged into the channel; taken into the pews.

### 7 Nordlys Express — night train
- **Map:** platform (start), sleeping cars ×3, dining car, baggage car, locomotive; gangways between.
- **Objectives:** a valid ticket (dining car) → Lina's ticket (sleeping car 2, under the seat) →
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
  Laughing Sal ×1 (`hearing`, huge, slow, unstoppable).
- **Kills:** the masks press in from all sides; trampled; Sal lifts you to her laughing mouth.

### 9 Lake Ostra — finale
- **Map:** grandmother's house (warm, safe), the shore, the pier, the boathouse, the huts, open ice,
  the thin ice over the river channel, the church spire in the ice.
- **Objectives:** follow Wren's mitten trail → the huts (remember) → the thin ice → choose.
- **Creatures:** the Hush ×1 (`hearing`; sound fades near it); Under-ice ×4 (`ambush:ice` when running
  on thin ice); the Laughers ×3 (`alarm`).
- **Kills:** the scarf; through the ice.
