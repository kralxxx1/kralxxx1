/* English — Chapter 5: Whiteout (Berghotel Weisshorn). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      lodge: {
        name: 'CHAPTER 5', title: 'Whiteout', place: 'Berghotel Weisshorn, 2 914 m',
        intro: 'Monday 28 February 1983, after dark. A storm on the mountain.\n\nThat morning the valley sent a telegram to the hotel at the top of the cable car. By the afternoon five guests and their ski instructor were under the snow at the upper station. The hotel says no telegram came.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'The guest book', from: 'Berghotel Weisshorn', date: 'February 1983', body:
`26.2.  Fam. Aebi (3)          room 4
26.2.  Mr & Mrs Coulter       room 2
27.2.  R. Fankhauser          room 1
27.2.  L. Brunner (ski school, staff)

Departures:
Mrs Coulter — 2.3., by the valley sledge.
(Every other name above has been ticked out on 28.2. in one neat stroke, in a different pen.)` },
      lodge_weather: { kind: 'report', title: 'Weather book on the office desk', from: 'G. Imhof', date: '28 February 1983', body:
`06.30  Snowing hard since 3. Wind NW 60.
07.10  Telephone line down (the usual).
08.15  The post sledge up from the station. Mail, milk, and the bread.
09.20  Lift running. Ski school up at 9.30 as every day. Full week, every room taken, the first full week since 1979.

(The 08.15 line has been gone over twice in pencil, as if someone stopped there.)` },
      lodge_telegram: { kind: 'telegram', title: 'A telegram, burnt at the edges', from: 'Valley station, avalanche service', date: '28.2.83 07.55', body:
`TO BERGHOTEL WEISSHORN STOP
AVALANCHE DANGER 5 STOP UPPER SLOPES LOADED STOP
CLOSE UPPER RUNS AND UPPER STATION TODAY STOP
NO SKIING ABOVE THE HOTEL STOP
CONFIRM BY RETURN STOP
AVALANCHE SERVICE

(Across the back, in a careful hand: "Received 8.15. — G.I." The rest is soot. It should have burned. It did not.)` },
      lodge_menu: { kind: 'notice', title: 'The breakfast card on a table', from: 'Berghotel Weisshorn', body:
`MONDAY 28 FEBRUARY
Coffee — Tea — Hot chocolate
Birchermüesli
Rösti with fried egg
Bread from the valley, butter, honey from the hotel's own bees

Tonight: fondue on the terrace if the weather allows!
Ski school meets 9.30 at the upper station. Leo says: bring your goggles.` },
      lodge_postcard: { kind: 'card', title: 'A postcard on the bedside table, room 1', from: 'Ruth Fankhauser', body:
`(A picture of the hotel in sunshine, a cable car floating up past it.)

Dear Hanni,
Snowing like the end of the world. They say the run from the top is the best in the valley and we go up in the morning, storm or no storm. Leo, the instructor, laughs at everything. I am happy. I'll ring Sunday.
R.

(Stamped, never posted.)` },
      lodge_roomNote: { kind: 'note', title: 'A child\'s note in room 4', from: 'Lisa Aebi, 10', body:
`Mama says if it is too windy we can stay in and play cards with Mrs Imhof.
Mrs Imhof says the wind is nothing up here.
I asked if the snow can fall off the mountain. She said not this week.` },
      lodge_school: { kind: 'notice', title: 'Ski school sign-up sheet', from: 'L. Brunner', date: '28.2.83', body:
`SKI SCHOOL — UPPER STATION 9.30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Instructor: Leo Brunner
(Under it, pencilled:) Greta says all clear from the valley. Good. Off we go.` },
      lodge_kitchenNote: { kind: 'note', title: 'Pinned by the cold room door', from: 'Greta Imhof', date: '28.2.83', body:
`Anton —
If the valley rings or the sledge comes up with anything from the avalanche people, it comes to ME, not to the guests and not to Leo. I'll deal with it.
A full week. We need this week.
The master key for the cable car is on the hook by the cold room. Nobody takes it but me or you.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'From the inquiry, a clipping', from: 'Valley newspaper', date: 'April 1983', body:
`WEISSHORN: HOTELIER SAYS NO WARNING RECEIVED

The owner of the Berghotel Weisshorn, Mrs Greta Imhof (52), told the inquiry yesterday that no avalanche warning reached the hotel on 28 February. The telephone line was down from 7 a.m. and "nothing came up with the post sledge but the post", she said.

The avalanche service maintains that a telegram was sent with the 8.15 sledge. No copy has been found at the hotel.

Five guests and the ski instructor Leo Brunner (29) died when the upper slopes released at 2.40 p.m.` },
    },
    items: {
      telegram: { name: 'Telegram', desc: 'Burnt round the edges, and still readable. Received 8.15.' },
      masterKey: { name: 'Master key', desc: 'A heavy key on a wooden fob: SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Get out of the storm',
      lodge_find: 'Find out what happened at the Weisshorn',
      lodge_telegram: 'Find the telegram that never came',
      lodge_pin: 'Pin the telegram back on the board at reception',
      lodge_key: 'Take the master key from the kitchen',
      lodge_power: 'Start the cable car in the machine room',
      lodge_board: 'Board the gondola',
    },
    mono: {
      lodge_start: 'I can\'t see my own hand. There\'s a light. A building.',
      lodge_inside: 'Warm. There\'s a fire going and nobody to keep it.',
      lodge_cold: 'I\'m so cold. I need to get inside.',
      lodge_colder: 'I can\'t feel my fingers.',
      lodge_warm: 'Warm. Oh, that\'s better.',
      lodge_frozen: 'They\'re at their tables. White all over. Nobody\'s moved for a long time.',
      lodge_frozenMove: 'The one by the window moved. When I came to the fire, it moved.',
      lodge_board: 'A pin, and the torn corner of something that used to hang here.',
      lodge_book: 'Six of them ticked out on the twenty-eighth. All in the same pen, all in one go.',
      lodge_stove: 'Cold ash. And something in it that didn\'t burn.',
      lodge_telegram: '"Close upper runs." She had it at a quarter past eight. They went up at half past nine.',
      lodge_pinned: 'There. Where everyone could have read it.',
      lodge_claimed: 'The wind dropped. Just for a breath. Like the mountain was listening.',
      lodge_stationLit: 'Lights, out across the snow. The cable car station.',
      lodge_key: 'The master key.',
      lodge_cook: 'Someone\'s in the kitchen. A big man. Something in his hand.',
      lodge_prints: 'Footprints. Being made. Right now, in front of me.',
      lodge_power: 'It\'s running. The gondola\'s lit.',
      lodge_noKey: 'It needs a key.',
      lodge_notYet: 'The motor won\'t turn over. Not while the place still has hold of me.',
      lodge_boarding: 'Doors. Close. Close, please close.',
      lodge_away: 'We\'re moving. Down into nothing.',
      lodge_office: 'Her office. The stove door\'s hanging open.',
      lodge_station: 'The station. The cable goes out into the white and just stops being there.',
    },
    lines: {
      lodge_bookPrompt: 'The guest book',
      lodge_boardPrompt: 'The telegram board',
      lodge_boardPin: 'Pin up the telegram',
      lodge_stovePrompt: 'Lift it out of the ash (hold)',
      lodge_controlPrompt: 'Start the cable car (hold)',
      lodge_controlLook: 'Control desk',
      lodge_gondolaPrompt: 'Board the gondola',
      lodge_gondolaLook: 'The gondola',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[wind over the static]'],
        ['otto', 'Nine to Ada. You are very loud. Is that a storm? The Weisshorn, then. I have six pairs of skis on my shelf and a fondue set that has never been used.'],
        ['ada', 'There are people here. Frozen at the tables.'],
        ['otto', 'Then do not stand by the fire. They come to warmth. And outside, listen for footsteps you are not making.'],
      ],
      lodge_otto2: [
        ['otto', 'Something has come off my shelf. A telegram. It is in the right place now. I am almost sure I heard skis.'],
      ],
    },
    recap: {
      lodge: 'The Weisshorn, 28 February 1983. Greta Imhof had the avalanche warning in her hand at a quarter past eight, put it in her stove so the full week would not be cancelled, and sent the ski school up at half past nine. Five guests and their instructor died at the upper station; she told the inquiry no warning came. The telegram never burned. I pinned it where everyone could read it, and the cable car took me down out of the storm.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
