/* English — Level 6: Lights Out (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Lights Out', place: "Toby's memory — the dark",
        intro: 'The same yellow rooms with every light dead. The dark here is thick enough to lean on.\n\nToby was afraid of the dark his whole life. In here, the dark is afraid of nothing. Somewhere in it, something is trying very hard not to laugh.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'On top of a generator', from: 'Eddie', body:
`Three generators. Diesel cans are scattered around.

The dark has teeth in this one. I call them grinners. Light makes them go away. Flashlight, glow stick, anything.

The amber one... keep your light on him. Don't turn your back on him for long.

—E.` },
      dark_diary1: { kind: 'diary', title: 'A page from a school notebook', from: 'Toby', date: 'April 15, 1987', body:
`Tomorrow is Operation 256!!!

Danny says I'm in charge of the flashlight. Rosie made a tape. Nell made a map of the Haunt patterns and it's actually really good.

I sat on Sam's tape player today. It went crunch. Sam doesn't know yet. I'm giving Sam my allowance for March AND April.

Danny says the amber Haunt on #7 is me because it's the chicken one. Walt says it's the smart one. Either way it's MY Haunt.` },
      dark_diary2: { kind: 'diary', title: 'The last page', from: 'Toby', date: 'April 17, 1987, 12:50 AM — at the arcade', body:
`Written by lighter light. Danny turned off the lights in the back to be scary. It worked.

Sam went home at 9:40. Sam said "Fine. Disappear then." I didn't say anything back. I cried in the back room where nobody could see.

Then at 12:40 somebody knocked on the back door and it was SAM. Soaking wet.

SAM CAME BACK!!! Sam always comes back.

I said sorry first. That means I win.

Level 212. Danny says 256 by three o'clock. All five hands. Nobody lets go.` },
      dark_grandpa: { kind: 'card', title: 'A small card in a lighter box', from: "Toby's grandpa", date: '1985', body:
`Toby —

Your grandmother gave me this in 1951 so I could find my way home from the night shift.

Now it's yours. You never have to sit in the dark.

—Grandpa` },
      dark_grinners: { kind: 'note', title: 'Shaky handwriting', from: 'Eddie', body:
`The grinners aren't people. They aren't even Haunts.

I think they're the game's idea of what's in the dark. Toby's idea. A thirteen-year-old's idea of what lives under the bed.

Crack a stick, count to three, they're gone.

I don't sleep much on this level.` },
      dark_walt6: { kind: 'diary', title: "Walt's journal, cramped writing", from: 'Walt', date: 'Inside', body:
`I don't remember my name. It starts with a W.

I remember a little girl's handwriting. Round letters. She drew an orange thing with horns and wrote DADDY under it.

I remember the taste of pennies.

The amber one won't look at me either. Nobody looks at me anymore.

EAT, says the board. EAT.` },
      dark_wall: { kind: 'wall', title: 'Written on the wall in lighter soot', body:
`DON'T LOOK AT ME

I'M SORRY SAM` },
      dark_porch: { kind: 'note', title: 'A note taped to a screen door', from: "Maggie, Toby's mother", date: 'April 1987', body:
`Toby —

The porch light stays on until you're home.

Love, Mom` },
      dark_tape: { kind: 'tape', title: 'Tape: "Toby\'s joke"', from: "Rosie's tape recorder", date: 'April 16, 1987, 11:58 PM', body:
`[Click. The back room of the arcade. The lights are off. A lighter flicks.]

TOBY: Okay, okay. Why did the Muncher cross the road?

DANNY: Because the Haunts were on this side.

TOBY: No! Because the road had STARS on it!

[Silence. Then Nell snorts, then Rosie, then everyone is laughing much harder than the joke deserves.]

TOBY: [still laughing] Sam should be here. Sam always laughs at that one.

[The laughing fades.]

ROSIE: ...Sam'll come, Toby.

[Click.]` },
    },
    obj: {
      dark_generators: 'Start the generators ({n}/3)',
      dark_leave: 'Get to the service elevator',
    },
    mono: {
      dark_start: "I can't see anything. The flashlight... I don't know if it's enough.",
      dark_tobySeen: 'Something amber in the corner. A sheet with a burned hem. Not moving. Not while I look at it.',
      dark_grinner: 'A smile in the dark. Just teeth.',
      dark_gen: 'The generator coughs awake. Light.',
      dark_lighter: 'His lighter. He let me hold it once, in 1986. He made me give it back after ten seconds.',
      dark_diary2: 'Sam came back. ...No. No. I went home. I went home at 9:40.',
    },
    lines: {
      dark_gen: 'Pour in the diesel and start it (hold)',
      dark_genEmpty: 'Generator (no diesel)',
      dark_needFuel: 'Find a diesel can first.',
      dark_tankEmpty: "The generator's tank is empty.",
    },
    radio: {
      dark_start: [
        ['eddie', 'I hate this one. I hate this one so much. Stay in the light, Sam. I mean it.'],
      ],
      dark_toby: [
        ['eddie', 'Amber... that\'s Toby. He won\'t come at you while you look at him. He never could look anybody in the eye when he was scared.'],
        ['sam', 'He looked me in the eye. All the time.'],
        ['eddie', '...Yeah. I guess he did.'],
      ],
      dark_lighter: [
        ['eddie', 'His grandpa\'s lighter. He never let anybody touch it. Not even Danny.'],
      ],
      dark_freed: [
        ['eddie', '...He\'s just a kid, Sam. They\'re all just kids.'],
        ['eddie', 'What kind of game does this to kids?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
