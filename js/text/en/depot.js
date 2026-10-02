/* English — Prologue: Night Shift (Depot 9). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      depot: {
        name: 'PROLOGUE', title: 'Night Shift', place: 'Depot 9, Halvard Central Station',
        intro: 'Halvard, the night of 13 January 1998. Rain on the glass roof of the central station.\n\nUnder the concourse is Depot 9, where everything the city loses waits ninety days for somebody to come back for it. Ada Lind has worked the night counter for eight years. Nobody comes down after midnight.\n\nThat is why she took the job.',
      },
    },
    docs: {
      depot_handover: { kind: 'note', title: 'Handover note', from: 'Benny', date: 'Tue 13 Jan', body:
`Ada —

Handover:
• 14 umbrellas in. It's raining, so.
• The man with the trombone came back. Still not his trombone.
• Chute's jamming again. Hit it on the LEFT side.
• Your locker won't shut. The tape is still in there. I didn't touch it.
• Somebody from upstairs asked if we "still have the elevator". I said nobody has used that elevator since 1964. He said, "That's not what I asked."

Coffee's off. Sorry.
— Benny` },
      depot_log: { kind: 'printout', title: 'Night log, page 212', from: 'A. Lind', date: '13/14.01.98', body:
`DEPOT 9 — NIGHT LOG — A. LIND

23:10  Ticket 4471: glove, ladies', grey. Claimed.
00:40  Platform 2 cleaners: suitcase, tan, no tag. Logged as 41,883.
01:15  Telephone. Nobody there. (Third night.)
02:30  Rain heavy. Chute quiet.
02:56  Nothing further to report.` },
      depot_tag: { kind: 'card', title: 'The claim tag on the parcel', from: 'A.', body:
`HALVARD CENTRAL — DEPOT 9 — LOST PROPERTY

CLAIM 256
One mitten, red, child's, left hand.
Found: Lake Ostra, 14 January 1979.
HOLD FOR: ADA LIND.

— A.

(Typed on a machine with a dropped "e", the kind the depot threw out in 1964. The ink is still wet.)` },
      wren1: { kind: 'drawing', drawing: 1, title: 'A drawing folded inside the parcel', from: 'Wren, age 7', body:
`Crayon. A little red bird on a fence. A tall girl in a green scarf walking away down a road, her back turned. Above her, in big letters: ADA.

On the back, in the same crayon:
SO YOU KNOW THE WAY` },
      depot_ledger: { kind: 'report', title: 'Lost property ledger, 1979, vol. 1', from: 'Depot 9', body:
`No. 253 — 14.01.79 — Gloves, men's, brown leather — Platform 3 — claimed 16.01
No. 254 — 14.01.79 — Umbrella, black — Waiting room — claimed 15.01
No. 255 — 14.01.79 — Book, "The Snow Queen", child's — Platform 4 — unclaimed
No. 256 — 14.01.79 — Mitten, red, child's, left hand — found: Lake Ostra — Claimant: her sister, when she remembers.

(The last entry is in a shaking hand you almost know. The ink is wet. Taped inside the lid: a brass key stamped SUPT.)` },
      depot_ottoNotes: { kind: 'diary', title: 'Notes in the superintendent\'s desk', from: 'Otto Brandt', date: '12 February 1964', body:
`Forty-one thousand items since 1906. Every one of them was somebody's.

I have started to hear the old tube at night. Memos, signed "A." She knows our ledger better than I do.

She writes that there is a floor under the floors, where everything goes that nobody came back for. A sorting office. She writes that it is short of a clerk.

I scratched the number over the button so that I would not lose my nerve.

If I am not back by morning: the umbrellas go in the cage, not the bin.

— O.B.` },
      depot_memo: { kind: 'note', title: 'A memo in the tube carrier', from: 'A.', body:
`INDEX — LEVEL 256 — INTERNAL

To: Depot 9, night counter.

Ada.
The elevator key is on his desk. Bring the mitten, and do not put it down.
Otto will be on channel nine. Tell him the umbrellas are in the cage.

— A.` },
      depot_calendar: { kind: 'notice', title: 'Halvard Transit calendar, 1964', body:
`FEBRUARY 1964

(Days crossed off up to the 13th. On the 14th, in pencil: "Night shift. Last one?" Under the picture of the new dam at Ostra, the same pencil: "They flood the valley in the autumn. Signe H. will not leave." Nobody has turned the page since.)` },
      depot_poster: { kind: 'notice', title: 'Notice in the public hall', from: 'Halvard Transit', body:
`LOST PROPERTY — DEPOT 9

Items found in stations and on trains are held here for NINETY DAYS.
Please bring proof of ownership.
Unclaimed items are sold or destroyed.

(Pinned under it, in felt pen: "FOUND: grey cat, answers to Admiral. Ask Benny.")` },
      depot_kitchen: { kind: 'card', title: 'A postcard over the sink', from: 'Gran', date: '1995', body:
`(A winter view of Lake Ostra. Out on the ice, very small, the spire of the drowned church.)

Ada —
The ice is thick this year. The 14th is a Saturday. Come if you can. I'll put the candle in the window like always.
Gran` },
    },
    items: {
      mitten: { name: 'Red mitten (left)', desc: 'A child\'s mitten, red wool, darned at the thumb. The other one was found on the ice nineteen years ago.' },
      ottoKey: { name: 'Superintendent\'s key', desc: 'Brass, stamped SUPT. It was taped inside the 1979 ledger box.' },
      elevatorKey: { name: 'Freight elevator key', desc: 'A long key on a tag that says FREIGHT. Otto Brandt\'s.' },
      badge: { name: 'Otto\'s badge', desc: 'Brass oval: DEPOT 9 — OTTO BRANDT. Worn smooth where a thumb rubbed it.' },
      parcel: { name: 'Parcel' },
    },
    obj: {
      depot_log: 'Finish the night log at your typewriter',
      depot_parcel: 'See what came down the chute',
      depot_torch: 'Get your torch from your locker',
      depot_power: 'Reset the main breaker in the sorting room',
      depot_ledger: 'Find the 1979 ledger in the archive',
      depot_otto: 'Search Otto Brandt\'s office',
      depot_elevator: 'Take the freight elevator down',
    },
    mono: {
      depot_start: '02:51. Rain on the glass up in the concourse. One more line and the night log is done.',
      depot_start2: 'Nobody comes down here after midnight. That\'s the whole point of the job.',
      depot_logDone: '02:56. Nothing further to report.',
      depot_chute: 'The chute. Nobody posts parcels at three in the morning.',
      depot_mitten: 'Left hand. Red. Wren\'s were red. Everybody\'s were red in 1979.',
      depot_dark: 'And there goes the power. My torch is in my locker.',
      depot_torch: 'Batteries still good. Benny never borrows anything useful.',
      depot_tape: 'Gran\'s tape. Two years in my locker. Not tonight.',
      depot_tape2: 'Not tonight, I said.',
      depot_powerBack: 'There. The old wiring always sulks for a minute first.',
      depot_tube: 'That was the old message tube in the super\'s office. It hasn\'t worked since 1964. The tag says 1979. The ledger is in the archive.',
      depot_archive: 'Forty-one thousand things nobody came back for.',
      depot_sorter: 'There was someone at the end of the aisle. Tall, in a grey coat. Sorting boxes in the dark.',
      depot_ledgerAfter: 'That isn\'t Benny\'s writing. That isn\'t anybody\'s writing. And there\'s a key taped in the lid: SUPT. Otto Brandt\'s office.',
      depot_ottoLocked: 'SUPERINTENDENT. Locked since 1964. Benny says the key went with him.',
      depot_ottoLocked2: 'Still locked.',
      depot_ottoIn: 'His lamp is on. There is still coffee in his cup. Thirty-four years.',
      depot_badge: 'OTTO BRANDT. You don\'t leave your badge unless you mean to come back for it.',
      depot_elevKey: 'FREIGHT. The elevator nobody has used since he did.',
      depot_noKey: 'The panel needs a key. Of course it does.',
      depot_noKey2: 'Still needs the key.',
      depot_256: 'Someone scratched a number over the lowest button. 256.',
      depot_wren: 'There was someone in the car. A child in a red snowsuit. For one second.',
      depot_gate: 'The concourse gate. Locked from upstairs at midnight. Station rules.',
      depot_elevatorShut: 'The freight elevator. Out of service since 1964.',
    },
    lines: {
      depot_typePrompt: 'Type the last line of the night log',
      depot_parcelPrompt: 'Open the parcel',
      depot_tapePrompt: 'Gran\'s tape',
      depot_breakerPrompt: 'Throw the main breaker (hold)',
      depot_ledgerPrompt: 'Ledger box: 1979',
      depot_badgePrompt: 'Otto\'s badge',
      depot_callPrompt: 'Turn the key, press the lowest button',
      depot_ottoUnlock: 'Unlock with the superintendent\'s key',
    },
    recap: {
      depot: 'Depot 9, 02:56. A parcel came down the chute: a red mitten, left hand, and a tag that said "Hold for Ada Lind." The 1979 ledger said: claimant, her sister, when she remembers. I took Otto Brandt\'s freight elevator down to the button somebody had scratched: 256.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
