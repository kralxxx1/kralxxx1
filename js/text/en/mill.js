/* English — Chapter 2: Mill Warehouse (Billy). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'Mill Warehouse', place: "Billy's footsteps",
        intro: 'The ceiling is seven meters up. The racks run into the dark. Somewhere a clock is ticking, always stuck on the same second.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Taped to the elevator door', from: 'Eddie', body:
`Elevator needs three fuses. The panel is by the loading office.

The red one patrols the aisles. He's fast and he never stops, but he's loud. Listen for him.

Don't try to outrun him in the open. Nobody outruns Billy.

—E` },
      mill_layoff: { kind: 'letter', title: 'A letter on company paper', from: 'Harlow Mill, Shipping Dept.', date: 'May 30, 1986', body:
`Dear Ray,

As part of the restructuring of the Front Street shipping operation, your position will be eliminated effective June 30, 1986.

We thank you for twenty-five years of loyal service. Please return your locker key and badge to the front office.

Enclosed you will find a commemorative wristwatch.

Harlow Mill Management` },
      mill_punch: { kind: 'card', title: 'A punch card', from: 'Harlow Mill', date: 'Summer 1986', body:
`EMPLOYEE: BILLY (SUMMER — SWEEPER)
RATE: $3.35/hr

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

Written across the last line in blue pen:
DAD'S LAST DAY TOO` },
      mill_graffiti: { kind: 'wall', title: 'Spray paint on the racks', body:
`BLY #1
BILLY WAS HERE
BILLY IS ALWAYS HERE` },
      mill_billy1: { kind: 'note', title: 'A folded note in a jacket pocket', from: 'Billy', date: 'March 1987', body:
`Everybody thinks I'm not scared of anything.

I'm scared of Dad sitting in the kitchen all day with the radio off.

So I play. The guy in first place doesn't sit in the kitchen.

(If Penny reads this I will actually kill her.)` },
      mill_ray: { kind: 'letter', title: 'A letter that was never sent', from: "Ray (Billy's dad)", date: 'May 1987', body:
`Billy,

The police asked about the key again. I told them I don't care about any key. You can have every key in this town.

I'm at the hardware store now. It's all right. Fewer hours. I listen to the ball game.

I fixed your bike. New chain, new brakes. It's in the garage.

Come home and ride it. I won't say a word.

Dad` },
      mill_manifest: { kind: 'printout', title: 'A shipping manifest', from: 'Harlow Mill, Dock 3', date: 'April 17, 1987', body:
`SHIPMENT #0256
CONTENTS: 1 wristwatch (stopped)
WEIGHT: nothing
DESTINATION: —
SIGNED FOR BY: —

The printout is warm, as if it just came out of the machine.` },
      mill_walt3: { kind: 'diary', title: "Walt's journal", from: 'Walt', date: 'Inside, day ?', body:
`The red one never stops. He runs the same loops again and again, the way Billy played the maze: always first, always fastest, never a breath.

I called his name once. He stopped for one second. Just one.

Then he screamed and ran, and I followed him, and I don't remember why.

I think I was hungry.` },
      mill_shrine: { kind: 'note', title: 'Under the photo on the shrine', from: 'W.', body:
`He always had to be first.
First to the cabinet. First to 900,000.
First through the screen.

Give him something that makes him stop.` },
      mill_tape: { kind: 'tape', title: 'Tape: "First place, for history"', from: "Penny's tape recorder", date: 'April 16, 1987, 11:52 PM', body:
`[Click. Arcade sounds. Kids laughing.]

BILLY: This is Billy, first place, recording for history. Tonight we beat the kill screen.

PENNY: Tonight we TRY to beat the kill screen.

BILLY: Walt says it's impossible. Walt also said I couldn't break nine hundred thousand.

CLYDE: Are we gonna get in trouble? My mom thinks I'm at Sam's.

BILLY: Trouble is for people who get caught, Clyde.

IVY: ...Sam went home, Billy.

BILLY: Sam's a chicken. More level 256 for us.

[Silence for a moment.]

CLYDE: He's not a chicken.

[Click.]` },
    },
    obj: {
      mill_fuses: 'Find the fuses ({n}/3)',
      mill_panel: 'Plug the fuses into the elevator panel',
      mill_wait: 'The elevator is coming… Stay alive ({n}s)',
      mill_leave: 'Get in the elevator',
      ghost: 'Bring {pos} belonging to the shrine (optional)',
    },
    mono: {
      mill_start: 'A clock ticking. Always stuck on the same second.',
      mill_redSeen: 'Red... like a bedsheet. Two white eyes. Looking at me.',
      mill_fuse: 'Another fuse.',
      mill_elevator: 'The elevator is coming. Slowly. Very slowly.',
      mill_watch: '3:17. Same as the clock.',
    },
    lines: {
      mill_panel: 'Plug in the fuses',
      mill_panelIdle: 'Fuse panel ({n}/3)',
      mill_slots: 'The panel has three empty slots.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? You there? ...Oh. I know this place. Harlow Mill, the Front Street warehouse. Billy\'s dad worked here for twenty-five years.'],
        ['eddie', 'Which means the red one is going to be here too.'],
      ],
      mill_red: [
        ['eddie', 'He\'s on you! Don\'t try to outrun him in the open. Break the line, take a corner, get something between you!'],
      ],
      mill_watch: [
        ['eddie', 'Is that a watch? ...Ray\'s watch. They gave it to him the day they fired him. Billy wore it every day after that.'],
        ['eddie', 'There\'s a shrine somewhere around here. Take it there. Maybe he remembers.'],
      ],
      mill_freed: [
        ['eddie', '...Did he stop? Sam, what did you do? He\'s just... standing there.'],
        ['eddie', 'Oh my God. That\'s Billy. That\'s actually Billy.'],
      ],
      mill_elevator: [
        ['eddie', 'That elevator is loud. Everything heard that. Stay alive until it gets there.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
