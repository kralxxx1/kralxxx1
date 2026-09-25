/* English — Chapter 7: Lights Out (Clyde). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Lights Out', place: "Clyde's dark",
        intro: 'The same yellow rooms, with every light dead. The dark here is thick enough to lean on. Somewhere in it, something is trying very hard not to laugh.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'On top of a generator', from: 'Eddie', body:
`Three generators. The diesel cans are scattered around.

The dark has teeth here. I call them grinners. Light makes them go away. Flashlight, glow stick, anything.

The orange one... just keep your light on him. Don't turn your back on him for long.

—E` },
      dark_diary1: { kind: 'diary', title: 'A page from a school notebook', from: 'Clyde', date: 'April 15, 1987', body:
`Tomorrow is Operation 256!!!

Billy says I can be in charge of the flashlight. Penny made a tape. Ivy made a map of the ghost patterns and it's actually really good.

Sam is mad at me because I broke his walkman. I didn't mean to. I sat on it. I'm going to give him my allowance for March AND April.

He'll come. He always comes.` },
      dark_diary2: { kind: 'diary', title: 'The last page', from: 'Clyde', date: 'April 16, 1987 — 10 PM, at the arcade', body:
`Sam went home.

He said "fine, disappear then." I didn't say anything back. I should have said something back.

Billy turned off the lights in the back to be scary. It worked.

I have Grandpa's lighter. I'm not scared.

I'm a little scared.

When Sam comes tomorrow I'm going to say sorry first. Before he does. That way I win.` },
      dark_grandpa: { kind: 'card', title: 'A small card in a lighter box', from: "Clyde's grandpa", date: '1985', body:
`Clyde —

Your grandmother gave me this in 1951 so I could find my way home from the night shift.

Now it's yours. You never have to sit in the dark.

—Grandpa` },
      dark_grinners: { kind: 'note', title: 'Shaky handwriting', from: 'Eddie', body:
`The grinners aren't people. They're not even ghosts.

I think they're the game's idea of what's in the dark. Clyde's idea. A thirteen-year-old's idea of what's under the bed.

Light a stick, count to three, they're gone.

I don't sleep much in this level.` },
      dark_walt6: { kind: 'diary', title: "Walt's journal, cramped writing", from: 'W', date: '—', body:
`I don't remember my name. It starts with a W.

I remember a girl's handwriting. Round letters. She drew a yellow circle with legs.

I remember the taste of pennies.

The orange one won't look at me either. Nobody looks at me anymore.

Eat, the board says. Eat.` },
      dark_wall: { kind: 'wall', title: 'Written on the wall in lighter soot', body:
`DON'T LOOK AT ME

I'M SORRY SAM` },
      dark_porch: { kind: 'note', title: 'A note taped to a screen door', from: "Maggie (Clyde's mom)", date: 'April 1987', body:
`Clyde —

Porch light stays on until you're home.

Love, Mom` },
      dark_tape: { kind: 'tape', title: 'Tape: "Clyde\'s joke"', from: "Penny's tape recorder", date: 'April 16, 1987, 12:40 AM', body:
`[Click. The back room of the arcade. The lights are off. Someone flicks a lighter.]

CLYDE: Okay, okay. Why did Pacman cross the road?

BILLY: Because the ghosts were on the other side.

CLYDE: No! Because the road had DOTS on it!

[Silence. Then Ivy snorts, then Penny, then everyone is laughing way harder than the joke deserves.]

CLYDE: [still laughing] Sam should be here. He always laughs at that one.

[The laughing fades.]

PENNY: ...He'll be here tomorrow, Clyde.

[Click.]` },
    },
    obj: {
      dark_generators: 'Start the generators ({n}/3)',
      dark_leave: 'Get to the service elevator',
    },
    mono: {
      dark_start: "I can't see anything. The flashlight... I don't know if it's enough.",
      dark_orangeSeen: 'Something orange standing in the corner. Not moving. Not while I look.',
      dark_grinner: 'A smile in the dark. Only teeth.',
      dark_gen: 'The generator coughs awake. Lights.',
      dark_lighter: 'His lighter. I held it once, in 1986. He made me give it back in ten seconds.',
    },
    lines: {
      dark_gen: 'Pour diesel and start it (hold)',
      dark_genEmpty: 'Generator (no diesel)',
      dark_needFuel: 'Find a diesel can first.',
      dark_tankEmpty: "The generator's tank is empty.",
    },
    radio: {
      dark_start: [
        ['eddie', 'I hate this one. I hate this one so much. Stay in the light, Sam. I mean it.'],
      ],
      dark_orange: [
        ['eddie', 'Orange... that\'s Clyde. He won\'t come at you while you\'re looking at him. He could never look anybody in the eye.'],
        ['sam', 'He looked me in the eye. All the time.'],
        ['eddie', '...Yeah. I guess he did.'],
      ],
      dark_lighter: [
        ['eddie', 'His grandpa\'s lighter. He never let anyone touch it. Not even Billy.'],
      ],
      dark_freed: [
        ['eddie', '...He\'s just a kid, Sam. They\'re all just kids.'],
        ['eddie', 'What kind of game does this to kids?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
