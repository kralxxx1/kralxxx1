/* English — Chapter 4: The Pool (Ivy). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      pool: {
        name: 'LEVEL 3', title: 'The Pool', place: "Ivy's one second",
        intro: 'White tiles, still water, the smell of chlorine. This should feel peaceful. Everything is too clean. Everything is too quiet.',
      },
    },
    docs: {
      pool_intro: { kind: 'note', title: 'Wedged in a locker door', from: 'Eddie', body:
`Four drain valves. Turn them all and the big pool empties. There's a hatch in the deep end.

The blue one hears you in the water. Stay on the tiles when you can.

She won't be where you saw her last. She never is.

—E` },
      pool_rules: { kind: 'notice', title: 'Pool rules sign', from: 'Harlow Municipal Pool', body:
`HARLOW MUNICIPAL POOL
NO RUNNING
NO DIVING IN THE SHALLOW END
NO FOOD OR DRINK ON THE DECK
CHILDREN UNDER 8 MUST BE SUPERVISED AT ALL TIMES
LIFEGUARD ON DUTY 10 AM – 6 PM

The line about supervision is underlined twice in blue pencil. Next to it, small: I KNOW` },
      pool_report: { kind: 'report', title: 'Lifeguard incident report', from: 'Harlow Municipal Pool', date: 'July 12, 1985', body:
`INCIDENT: Near drowning, deep end
TIME: 3:40 PM
VICTIM: Theo, age 6
RESPONSE: Pulled from bottom by lifeguard on duty. Rescue breathing administered. Victim responsive after approx. 40 seconds. Transported to St. Agnes for observation. Released the same evening.

WITNESS: Sister (Ivy, age 13), responsible for supervision.
STATEMENT: "I looked away for one second to finish a drawing. One second."

NOTE: Sister would not leave the deck until the ambulance left. She did not speak again for the rest of the day.` },
      pool_theo1: { kind: 'letter', title: 'A letter in a child\'s handwriting', from: 'Theo, age 7', date: 'Christmas 1986', body:
`Dear Ivy,

Merry Christmas. I am not scared of the pool anymore. You can stop drawing sad comics.

Love Theo

PS draw me a shark
PS a nice shark` },
      pool_theo2: { kind: 'letter', title: 'Another letter from Theo', from: 'Theo, age 9', date: 'April 1988', body:
`Ivy,

Everybody at school says you ran away. I know you didn't. You would have taken your pencils.

I keep them in my room. I don't let anyone use the blue one.

Mom still sets your plate. Dad tells her not to, and then he sets it himself when she isn't looking.

Theo` },
      pool_theo3: { kind: 'letter', title: 'A letter on swim team paper', from: 'Theo, age 11', date: 'July 12, 1990', body:
`Ivy,

It's been five years today. I'm on the swim team now. I won my first race in June. Butterfly.

I know you think it was your fault. It wasn't. I was six and I jumped in where the sign said not to. You looked away for one second. Everybody does.

It was never your fault.

Come home and watch me swim. I'll save you a seat on the bleachers, the one in the shade.

Theo` },
      pool_comic: { kind: 'drawing', title: 'A soggy comic page', from: 'Ivy', date: '1986', body:
`Four panels, in blue ink.

1. A girl with big glasses, drawing at the edge of a pool.
2. The water, perfectly flat.
3. The girl, looking at the water. She will never look away again.
4. The girl, grown up, alone in a white room. Her pencils are on the floor.

Title, in careful letters: THE GIRL WHO LOOKED AWAY` },
      pool_tiles: { kind: 'wall', title: 'Scratched into the tiles', body:
`I LOOKED AWAY FOR ONE SECOND
I LOOKED AWAY FOR ONE SECOND
I LOOKED AWAY FOR ONE SECOND` },
      pool_walt4: { kind: 'diary', title: "Walt's journal", from: 'Walt', date: 'Inside, day ?', body:
`The blue one doesn't stay anywhere. She blinks from one end of the pool to the other, as if she can't decide where she's allowed to be.

At the arcade Ivy mapped the ghost patterns for the others. She was always right, and she never believed she was.

I left her the last of my almond water on the diving board. When I came back it was gone and the bottle was lined up neatly with the edge. Thank you, Ivy.` },
      pool_tape: { kind: 'tape', title: 'Tape: "Penny Radio interviews Ivy"', from: "Penny's tape recorder", date: 'March 1987', body:
`[Click. A school hallway, echoing.]

PENNY: This is Penny Radio with a special guest. Ivy, what's your superpower?

IVY: I don't have one.

PENNY: Everybody has one. Billy's is being loud.

IVY: [laughs] ...Okay. Maybe drawing.

PENNY: What would you be scared to draw?

IVY: [long pause] Water. I can't get water right. It always looks too still.

PENNY: ...Your brother's okay, Ivy. He was at the pool yesterday. He did a cannonball on the lifeguard.

IVY: I know. I was there. I watched him the whole time.

[Click.]` },
    },
    obj: {
      pool_valves: 'Open the drain valves ({n}/4)',
      pool_drain: 'Wait for the main pool to drain',
      pool_hatch: 'Open the hatch at the bottom of the pool',
    },
    mono: {
      pool_start: 'Water. Everywhere. My footsteps echo.',
      pool_blueSeen: 'Something blue. There. No... here.',
      pool_valve: 'The valve screams. The sound carries everywhere.',
      pool_drained: "The water is gone. There's a hatch at the bottom.",
      pool_glasses: 'Her glasses. I can hear someone breathing.',
    },
    lines: {
      pool_valve: 'Turn the valve (hold)',
      pool_hatch: 'Open the hatch and climb down',
    },
    radio: {
      pool_start: [
        ['eddie', 'The town pool. I learned to swim here. Everybody in Harlow did.'],
        ['eddie', 'Sam, this is Ivy\'s. I\'d bet my life on it. Watch the water.'],
      ],
      pool_blue: [
        ['eddie', 'Blue\'s the unpredictable one. She\'ll be somewhere else before you blink. And she hears splashing a mile away.'],
      ],
      pool_glasses: [
        ['eddie', 'Ivy\'s glasses. She was blind as a bat without them. She used to push them up with one finger when she was thinking.'],
      ],
      pool_freed: [
        ['eddie', 'She\'s... following you? Carefully. Like she\'s checking every step.'],
        ['eddie', 'That\'s her. That\'s exactly her.'],
      ],
      pool_drain: [
        ['eddie', 'That drain sounds like a jet engine. Stay out of the open while it empties.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
