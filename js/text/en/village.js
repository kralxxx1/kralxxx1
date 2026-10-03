/* English — Chapter 6: Low Water (Gammel Ostra). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      village: {
        name: 'CHAPTER 6', title: 'Low Water', place: 'Gammel Ostra, Ostra valley',
        intro: 'Friday 2 October 1964, after dark, in the rain.\n\nThe dam gates closed at six this morning. The posters on every gatepost say the ninth. The village is empty, and the river is already over its banks in the low places. One house still has a lamp lit in the window.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'A notice on a gatepost', from: 'District Office', date: 'September 1964', body:
`OSTRA RIVER REGULATION

The dam gates will close and the valley will be flooded on
FRIDAY 9 OCTOBER 1964.

All residents must have left Gammel Ostra by that date. Removal lorries leave from the school yard each morning at 8.

(On this copy the 9 has been struck through in red pencil and FRIDAY 2 OCTOBER written above it. Not every post has been corrected.)` },
      village_torLetter: { kind: 'letter', title: 'A letter on the kitchen table', from: 'Tor', date: '24 September 1964', body:
`Mor,

Stop writing to the newspaper. It does no good and the board reads every word.

The gates close on Friday the 9th. You have all the time in the world. I will come up with the car on the morning of the 8th and we will put your things in it, and you will come down to Ingrid's in Halvard like a sensible woman, and you can be as cross with me as you like on the way.

Don't do anything silly.
Tor` },
      village_diary: { kind: 'report', title: 'Site diary, dam keeper\'s hut', from: 'T. Holm, resident engineer', date: 'September–October 1964', body:
`28.9  Board brings the closure forward a week: gates to close 2.10, 06.00. Announced on the wireless tonight. Posters to be corrected.
      Mor has no wireless. Will tell her myself when I fetch her. Easier on the day.
29.9  Spillway pour delayed. Rain.
1.10  Pour ran all night. Could not get away. Rang Ingrid in Halvard: Mor told her I am coming on the 8th, so Ingrid is not to worry.
2.10  06.00 Gates closed on schedule. Valley filling.
      I have not been up to the house.

(There are no more entries in this hand.)` },
      village_ingrid: { kind: 'note', title: 'A label tied to a crate in the attic', from: 'I.', date: '30.9.64', body:
`MOR'S THINGS — FOR HALVARD

She says she will not leave her house and that is the end of it. Tor says he is fetching her on the 8th.
I have taken her music box, so she will have a reason to come and get it.
— I.` },
      village_removal: { kind: 'report', title: 'The removal list on the teacher\'s desk', from: 'Gammel Ostra school', date: 'October 1964', body:
`Aas, Olav, 64 — to his son, Nordvik — gone 21.9
Berg family (5) — Halvard — gone 23.9
Dahl, Marit, 80 — to the home at Ostra — gone 25.9
Holm, Signe, 71, Stuegata 4 — to her daughter (I. Lind), Halvard — by her son, 8.10
Kvam, Per and Anna — gone 26.9

(Every line but one has been ticked.)` },
      village_parish: { kind: 'note', title: 'A note on the vestry desk', from: 'Pastor A. Rø', date: '27.9.64', body:
`Last service today. The bells come down on the 30th.
The choir asked to sing the evening hymn one more time and I let them, though the church was nearly empty.

Mrs Holm asked that the church not be closed while she is still in the village. I said the Lord does not close. The board says otherwise.

Keys to the houses of the elderly are on the vestry board until the move.` },
      village_shop: { kind: 'note', title: 'The shop\'s account book, open', from: 'Gammel Ostra Landhandel', date: 'October 1964', body:
`1.10  Mrs Holm — paraffin, 2 litres. Matches. Coffee, ¼ kg. On account.
        (She says she'll settle on the 8th.)

(The shop closed the same evening. The shelves are bare.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'A drawing under the pillow', from: 'Wren, age 7', body:
`Crayon, gone soft with damp. A white church under green water, with fish swimming past the tower. Beside it a little red house, and in the window a lady with white hair, holding up a lamp. Above the water, the little red bird.

Underneath:
SHE WAITED UP` },
    },
    items: {
      signeKey: { name: 'House key', desc: 'On a loop of red string. A paper label: S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Music box', desc: 'Rosewood, with a little dancer on the lid. Wound, it plays a waltz you almost know.' },
    },
    obj: {
      village_start: 'Find whoever lit the lamp',
      village_key: 'Find a key to the house with the lamp',
      village_box: 'Find what used to stand on the mantel',
      village_mantel: 'Put the music box back on the mantel',
      village_run: 'The water is coming. Get to the ladder on the dam',
      village_climb: 'Climb',
    },
    mono: {
      village_start: 'A village. Empty. The trees are all cut down. There\'s a light in one window.',
      village_locked: 'Locked. There\'s a lamp burning inside and nobody answering.',
      village_church: 'They\'re singing. In the dark, facing the altar. Don\'t make a sound.',
      village_silence: 'They stopped.',
      village_turn: 'They\'re turning round.',
      village_resume: 'They\'re singing again.',
      village_key: 'S. Holm, Stuegata 4. Holm.',
      village_school: 'The school. This is where the lorries left from.',
      village_list: 'Holm, Signe. To her daughter, I. Lind. Lind. I. Lind is Gran.',
      village_attic: 'Crates. Labels. A whole village packed into boxes.',
      village_box: 'A music box. "Mor\'s things." Mor. Gran\'s mother.',
      village_house: 'The lamp\'s lit. The stove\'s warm. Nobody.',
      village_dust: 'There\'s a clean square in the dust on the mantel. Something stood here for a long time.',
      village_placed: 'There. Where you kept it.',
      village_claimed: 'It\'s playing by itself. The clock\'s striking. It\'s six.',
      village_water: 'That roar. The water. It\'s coming.',
      village_ladder: 'The ladder. Up. Go up.',
      village_top: 'The top. The whole valley is water.',
      village_gran: 'Gran never said she had a mother here. Not once.',
    },
    lines: {
      village_mantelLook: 'The mantel',
      village_mantelPut: 'Put the music box on the mantel',
      village_ladderPrompt: 'Climb the ladder (hold W)',
      village_wellLook: 'A well',
    },
    radio: {
      village_otto1: [
        ['radio', '[rain on the static]'],
        ['otto', 'Nine to Ada. Rain, an empty village, a dam? Gammel Ostra. I have a whole shelf of it. Doorknobs, mostly. People take their keys and leave the doorknobs.'],
        ['ada', 'There\'s singing. In the church.'],
        ['otto', 'Then let them sing. While they sing they are looking at the altar. If they stop, do not wait to see why.'],
      ],
      village_otto2: [
        ['otto', 'Ada. I have a music box on my shelf that has just started to play by itself. The water on the floor here is rising. I would leave, if I were you. I would leave now.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2 October 1964. My great-grandmother Signe Holm would not leave her house. Her son Tor, the dam\'s engineer, told her the gates would close on the ninth; they closed on the second, and he did not go up to the house. Gran thought Tor was fetching her. The lamp was still lit when the water came. I put her music box back on her mantel, and then I climbed the dam with the valley filling under me.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
