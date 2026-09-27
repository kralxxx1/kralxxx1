/* English — Level 3: The Pool (Nell). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      pool: {
        name: 'LEVEL 3', title: 'The Pool', place: "Nell's memory — Harlow Municipal Pool, July 12, 1985",
        intro: 'White tiles, still water, the sting of chlorine. It should feel peaceful. It is too clean. It is too quiet.\n\nNell looked away from her little brother for one second, here, and has been looking at this water ever since.',
      },
    },
    docs: {
      pool_intro: { kind: 'note', title: 'Wedged in a locker door', from: 'Eddie', body:
`Four drain valves. Open them all and the big pool empties. There's a hatch in the deep end.

The teal one hears you in the water. Stay on dry tiles when you can.

She won't be where you saw her last. She never is.

—E.` },
      pool_rules: { kind: 'notice', title: 'Pool rules sign', from: 'Harlow Municipal Pool', body:
`HARLOW MUNICIPAL POOL
NO RUNNING
NO DIVING IN THE SHALLOW END
NO FOOD OR DRINK ON THE DECK
CHILDREN UNDER 8 MUST BE SUPERVISED AT ALL TIMES
LIFEGUARD ON DUTY 10 AM – 6 PM

The line about supervision is underlined twice in blue pencil. Next to it, very small: I KNOW` },
      pool_report: { kind: 'report', title: 'Lifeguard incident report', from: 'Harlow Municipal Pool', date: 'July 12, 1985', body:
`INCIDENT: Near drowning, deep end
TIME: 3:40 PM
VICTIM: Theo Park, age 6
RESPONSE: Pulled from the bottom by the lifeguard on duty. Rescue breathing given. Responsive after approx. 40 seconds. Taken to St. Agnes for observation, released the same evening.

WITNESS: Sister (Nell Park, age 13), responsible for supervision.
STATEMENT: "I looked away for one second to finish a drawing. One second."

NOTE: The sister would not leave the deck until the ambulance left. She did not speak again that day.` },
      pool_theo1: { kind: 'letter', title: "A letter in a child's handwriting", from: 'Theo, age 7', date: 'Christmas 1986', body:
`Dear Nell,

Merry Christmas. I am not scared of the pool anymore. You can stop drawing sad comics.

Love Theo

PS draw me a shark
PS a nice shark` },
      pool_theo2: { kind: 'letter', title: 'Another letter from Theo', from: 'Theo, age 9', date: 'April 1988', body:
`Nell,

Everybody at school says you ran away. I know you didn't. You would have taken your pencils.

I keep them in my room. I don't let anyone use the blue one.

Mom still sets your plate. Dad tells her not to, and then he sets it himself when she isn't looking.

Theo` },
      pool_theo3: { kind: 'letter', title: 'A letter on swim team paper', from: 'Theo, age 11', date: 'July 12, 1990', body:
`Nell,

Five years today. I'm on the swim team now. I won my first race in June. Butterfly.

I know you think it was your fault. It wasn't. I was six and I jumped in where the sign said not to. You looked away for one second. Everybody does.

It was never your fault.

Come home and watch me swim. I'll save you a seat on the bleachers, the one in the shade.

Theo` },
      pool_comic: { kind: 'drawing', title: 'A soggy comic page', from: 'Nell', date: '1986', body:
`Four panels in blue ink.

1. A girl with big glasses, drawing at the edge of a pool.
2. The water, perfectly flat.
3. The girl staring at the water. She will never look away again.
4. The girl, grown up, alone in a white room. Her pencils are on the floor.

Title, in careful letters: THE GIRL WHO LOOKED AWAY` },
      pool_tiles: { kind: 'wall', title: 'Scratched into the tiles', body:
`I LOOKED AWAY FOR ONE SECOND
I LOOKED AWAY FOR ONE SECOND
I LOOKED AWAY FOR ONE SECOND` },
      pool_walt4: { kind: 'diary', title: "Walt's journal", from: 'Walt', date: 'Inside, day ?', body:
`The teal one never stays put. She blinks from one end of the pool to the other, as if she can't decide where she's allowed to be.

At the arcade Nell mapped the Haunt patterns for the others. She was always right, and she never once believed it.

I left her my last can of Star Pop on the diving board. When I came back it was gone, and the tab was lined up neatly with the edge. Thank you, Nell.` },
      pool_tape: { kind: 'tape', title: 'Tape: "Rosie Radio interviews Nell"', from: "Rosie's tape recorder", date: 'March 1987', body:
`[Click. A school hallway, echoing.]

ROSIE: This is Rosie Radio, one-oh-seven-three, with a very special guest. Nell, what's your superpower?

NELL: I don't have one.

ROSIE: Everybody has one. Danny's is being loud.

NELL: [laughs] ...Okay. Drawing. Maybe.

ROSIE: What would you be scared to draw?

NELL: [a long pause] Water. I can't get water right. It always comes out too still.

ROSIE: ...Theo's okay, Nell. He was at the Y yesterday. He did a cannonball right on the lifeguard.

NELL: I know. I was there. I watched him the whole time.

[Click.]` },
    },
    obj: {
      pool_valves: 'Open the drain valves ({n}/4)',
      pool_drain: 'Wait for the big pool to drain',
      pool_hatch: 'Open the hatch at the bottom of the pool',
    },
    mono: {
      pool_start: 'Water everywhere. My footsteps echo like someone is walking behind me.',
      pool_nellSeen: 'Teal. A wet sheet with two round eyes. There. No... here.',
      pool_valve: 'The valve shrieks. The sound carries everywhere.',
      pool_drained: 'The water is gone. There is a hatch at the bottom.',
      pool_glasses: 'Her glasses. Somewhere close, someone is breathing.',
    },
    lines: {
      pool_valve: 'Turn the valve (hold)',
      pool_hatch: 'Open the hatch and climb down',
    },
    radio: {
      pool_start: [
        ['eddie', 'The town pool. I learned to swim here. Everybody in Harlow did.'],
        ['eddie', 'This one\'s Nell\'s, Sam. I\'d bet my life on it. Watch the water.'],
      ],
      pool_nell: [
        ['eddie', 'Teal\'s the one you can\'t predict. She\'ll be somewhere else before you blink. And she hears a splash from across the building.'],
      ],
      pool_glasses: [
        ['eddie', 'Nell\'s glasses. She was blind as a bat without them. Pushed them up with one finger when she was thinking.'],
      ],
      pool_freed: [
        ['eddie', 'She\'s... following you? Carefully. Like she\'s checking every step before she takes it.'],
        ['eddie', 'That\'s her. That\'s exactly her.'],
      ],
      pool_drain: [
        ['eddie', 'That drain sounds like a jet engine. Stay out of the open while it empties.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
