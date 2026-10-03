/* English — Chapter 9: The Ice (Lake Ostra), and the three endings. Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      lake: {
        name: 'CHAPTER 9', title: 'The Ice', place: 'Lake Ostra',
        intro: 'Sunday 14 January 1979, 15:40.\n\nGran\'s house on the shore. The stove is lit and the radio is on. Out on the lake the older kids are at the fishing huts, and the snow is coming in from the north.\n\nWren is out there somewhere.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'The radio, low, on the table', from: 'Weather for the lake district', date: 'Sunday 14 January 1979, 15.30', body:
`...snow showers this afternoon turning to heavy snow from about four o'clock, with strong northerly winds and drifting. Visibility near nil on open ground and on the lakes after dark.

The ice on Lake Ostra is reported unsafe over the old river channel on the north-west side. People are asked to keep off the ice there altogether.

And now the news, at half past three...` },
      lake_granNote: { kind: 'note', title: 'A note on the kitchen table', from: 'Gran', date: 'Sunday', body:
`Ada —

Gone up to the farm for the milk. Back by half past four.
Wren is NOT to go on the ice. You keep her in with you.
There are buns in the tin, one each.

Gran` },
      lake_wrenNote: { kind: 'note', title: 'A page stuck to the girls\' door', from: 'Wren', date: '(no date)', body:
`ADA
I AM COMING TOO

(A red bird drawn underneath, flying after a taller bird with a green stripe round its neck.)` },
      lake_diary: { kind: 'note', title: 'A diary under the top pillow', from: 'Ada, 12', date: '14 Jan 1979', body:
`Sunna and Per and all of them are going to be at the huts after dinner. SUNNA ASKED ME.

Sunna said bring your little bird, we'll put her down the hole. Ha ha.

I am NOT bringing her. She follows me everywhere like a dog and then she cries and everybody looks at me. Just once I want to go somewhere without her.` },
      lake_search: { kind: 'report', title: 'A folded report in the boathouse', from: 'Ostra district police', date: 'January 1979', body:
`Missing child: Wren LIND, 7, of the Lind house, south shore, Lake Ostra.

14.1, 16.50. Reported missing by her grandmother, Mrs Ingrid Lind, on returning home.
The child's sister, Ada Lind, 12, states that Wren did not come out onto the ice with her, and that she believed Wren to be at home.
Search: the house, the outbuildings, the woods to the south and the road, through the night. Heavy snow.
16.1, 11.20. A child's red mitten (right hand) found on the ice about 300 metres north-west of the fishing huts, over the old river channel. Ice unsafe. Diving not possible until the thaw.` },
      lake_hutNote: { kind: 'note', title: 'A cigarette packet, written on', from: '(the older kids)', date: '14.1.79', body:
`PER + SUNNA

ADA'S LITTLE BIRD FOLLOWED HER AGAIN
TWEET TWEET

(a drawing of a bird with a sad face, and an arrow pointing out of the hut)` },
      lake_tape: { kind: 'transcript', title: 'A cassette in the recorder: "FOR ADA"', from: 'Ingrid Lind', date: 'December 1995', body:
`[a click; a kitchen clock ticking; someone settling in a chair]

Ada. It's Gran. They say I'm not well, so I'm going to say it on the tape, because I never could say it to your face.

I always knew you saw her on the ice. I knew from your face that night. I never asked you, because I was frightened of what it would do to you to say it. I told myself that was kindness.

It wasn't. The women in this family keep quiet and call it kindness. My mother waited for my brother to fetch her and he never came, and nobody ever said so out loud, not once.

Say it, my girl. Say it out loud, to someone. And then go and find her.

[the clock; a long breath; the tape runs on to the end]` },
    },
    items: {
      mitten: { name: 'Red mitten', desc: 'A child\'s mitten, red, left hand. It came in the parcel. The other one was found on the ice.' },
    },
    obj: {
      lake_start: 'Find Wren',
      lake_trail: 'Follow her footprints out onto the ice',
      lake_huts: 'Go to the huts, where the older kids were',
      lake_remember: 'Remember',
      lake_thin: 'Go out to the thin ice over the old river',
      lake_say: 'Tell her',
    },
    mono: {
      lake_start: 'Gran\'s house. The stove\'s lit. The radio\'s on. It\'s nineteen seventy-nine.',
      lake_empty: 'Nobody in. Gran\'s gone for the milk. Wren\'s boots aren\'t by the door.',
      lake_note: '"You keep her in with you." I didn\'t.',
      lake_wrenNote: 'She always wrote my name first.',
      lake_out: 'Small footprints in the snow. Down to the shore. Out onto the ice.',
      lake_ice: 'The ice is singing. It does that when it\'s cold.',
      lake_wren: 'Red. Out there. Walking away.',
      lake_huts: 'The huts. Somebody laughing in there.',
      lake_laughers: 'They\'re laughing at me. They were laughing at me then.',
      lake_hole: 'The hole in the ice. I was standing here when I heard it.',
      lake_remember1: 'She came in after me. Her face all pink with the cold. "Ada, I came too."',
      lake_remember2: 'And they all looked at me. And I pushed her hand off my sleeve and I said, get lost, Wren. Go home. Get lost.',
      lake_remember3: 'She went. She went the wrong way. In the snow you couldn\'t see the shore.',
      lake_remember4: 'And then the ice made a sound. A long one. Out there, on the left. And I didn\'t turn round, because they were watching me.',
      lake_storm: 'The snow\'s coming in. I can\'t see the house.',
      lake_thin: 'The ice is dark here. Thin. Walk. Don\'t run.',
      lake_hush: 'Something in the snow behind me. A green scarf.',
      lake_quiet: 'It\'s gone so quiet. I can\'t hear my own feet.',
      lake_found: 'There she is.',
      lake_tape: 'Gran\'s voice. I\'ve had this tape in my locker for two years and never played it.',
      lake_gone: 'The trail goes on, out to the left. Toward the river.',
    },
    lines: {
      lake_radioPrompt: 'Listen to the radio',
      lake_tapePrompt: 'Play the tape',
      lake_holePrompt: 'Look down into the hole',
      lake_choiceTitle: 'Wren is standing on the thin ice with her back to you.',
      lake_sayIt: 'Say it. All of it.',
      lake_vanished: '"She just vanished. Nobody saw anything."',
      lake_say1: '"I told you to get lost."',
      lake_say2: '"You went the wrong way and I heard the ice and I didn\'t turn round."',
      lake_say3: '"I told Gran you never came out. I let them look for you in the woods."',
      lake_give: 'Give her the mitten',
    },
    radio: {
      lake_otto1: [
        ['radio', '[snow on the static, very soft]'],
        ['otto', 'Nine to Ada. I can hardly hear you. This one is not my shelf. I cannot see it at all. It is yours, I think.'],
        ['otto', 'Whatever you find out there, say it to her. Not to me.'],
      ],
      lake_otto2: [
        ['otto', 'Ada. Something on this shelf is taking the sound out of everything. Do not let it get close enough to take yours.'],
      ],
    },
    recap: {
      lake: 'Lake Ostra, 14 January 1979. I was twelve. Wren followed me onto the ice and into the hut where the older kids were, and I told her to get lost. She went the wrong way in the snow, over the old river where the ice is thin, and I heard it, and I didn\'t turn round. Then I went home and told Gran she had never come out.',
    },
    endings: {
      thaw: {
        title: 'THAW', subtitle: 'The truth, said out loud',
        lines: [
          'I say it. All of it. The words come out of me like something I have been holding in my mouth for nineteen years.',
          'Wren turns round. Her face is pink with the cold. She looks at me the way she always did, as if I were taller than I am.',
          'I give her the mitten. She puts it on. She holds up both hands to show me: two red mittens, a pair again.',
          'Then she turns and walks home across the ice, toward the lights of the house, and she does not look back. That is all right. She knows the way now.',
          'At ten past six in the morning I wake at the counter in Depot 9 with the parcel open in front of me. The rain has stopped.',
          'I write CLAIMED on Claim 256. I phone the police in Halvard about a case that is nineteen years old. Then I take Gran\'s tape out of my locker and I play it, all the way to the end.',
          'In April, when the ice goes out, the divers search the old river channel.',
          'Wren is buried beside our grandmother, on the hill above the lake, where you can see the whole of it.',
          'In the Depot 9 tray that first morning there was a second tag, in an old, shaking hand I did not know yet: CLAIMED. AT LAST. — A.',
        ],
      },
      snowfall: {
        title: 'SNOWFALL', subtitle: 'The one who stayed',
        lines: [
          '"She just vanished," I say. "Nobody saw anything."',
          'Wren does not turn round. Behind me the thing in the green scarf stands very close. It starts to unwind the scarf, round and round, until there is nothing left to unwind.',
          'Under it is my own face, at twelve, with the cold in its cheeks.',
          'The snow comes down over the lake and covers the dark ice and the red figure on it and the footprints, mine and hers, until there is nothing to see at all.',
          'Somewhere a long way down, a memo goes up a pneumatic tube in a new hand. NIGHT CLERK, LEVEL 256. FIRST SHIFT.',
          'On channel nine, very quietly: "Welcome to the night shift, Ada."',
        ],
      },
      morning: {
        title: 'MORNING', subtitle: 'Everyone who was lost',
        lines: [
          'I say it. All of it. Wren turns round. I give her the mitten and she holds up both hands to show me, a pair again, and walks home across the ice toward the lights of the house.',
          'At ten past six in the morning I wake at the counter in Depot 9 with the parcel open in front of me. I write CLAIMED on Claim 256.',
          'At a quarter past, the freight elevator at the end of the archive opens by itself.',
          'An old man steps out in a coat thirty-four years out of fashion, holding a brass badge in his hand as if he had just been given it.',
          '"Brandt," he says. "Otto. I remember now." He looks round the archive, at the shelves, at me. "What year is it?"',
          'I tell him. He thinks about it for a long time. And then he laughs, a real laugh, the first one I have ever heard from him without static on it.',
          'In April, when the ice goes out, the divers search the old river channel. Wren is buried beside our grandmother, on the hill above the lake.',
          'In the Depot 9 tray that morning there is a second tag, in an old, shaking hand that I know very well: CLAIMED. AT LAST. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
