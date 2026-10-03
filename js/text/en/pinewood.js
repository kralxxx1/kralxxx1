/* English — Chapter 3: Double Feature (Pinewood Drive-In). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      pinewood: {
        name: 'CHAPTER 3', title: 'Double Feature', place: 'Pinewood Drive-In, north of Nordvik',
        intro: 'Friday 22 August 1975, a little after eleven at night. The last night of the season.\n\nThe second feature is running on a screen in the trees. It has no sound, and it does not end. An eight-year-old boy went to the toilets during the reel change and did not come back.',
      },
    },
    docs: {
      pine_program: { kind: 'notice', title: 'A flyer on the snack bar counter', from: 'Pinewood Drive-In', body:
`LAST NIGHT OF THE SEASON — FRIDAY 22 AUGUST

 8:45   THE LONG SUMMER
10:40   NIGHT LAKE

LUCKY STUB DRAW!
Keep your ticket stub. At the intermission bring it to the booth window and drop it in the can. Mr Hardy draws the winner at the end of the second feature.
Prize: a SEASON PASS for 1976. Every film, the whole car.

Please hang speakers back on their posts. Drive slowly. Mind the children.` },
      pine_missing: { kind: 'notice', title: 'A poster on the toilets wall', from: 'Nordvik police', date: 'August 1975', body:
`MISSING
MIKKEL STRAND, aged 8

Last seen at the Pinewood Drive-In on Friday 22 August, at about 11 p.m., on his way to the toilets.
Fair hair. Blue anorak, red rubber boots. He had his father's torch with him.

If you saw him, or saw anything at all that night, please call the Nordvik police station.
His mother and father are asking you. Anything at all.` },
      pine_statement: { kind: 'report', title: 'Statement, copy', from: 'L. Hardy, projectionist', date: '23 August 1975, 9:10 a.m.', body:
`I was in the booth from seven in the evening until two in the morning, as on every show night. I ran both features with no break except the reel changes.

I did not see the boy. Children do not come up to the booth. The ports face the screen and I cannot see the toilets from the booth.

I did not leave the booth. I had not been drinking.

Read over and signed,
L. Hardy` },
      pine_letter: { kind: 'letter', title: 'A letter under the pillow on the cot', from: 'L. Hardy', date: 'March 1981, never posted', body:
`Mrs Strand,

I have written this nine times. This time I will post it.

Your boy came to the booth window at ten to eleven with his stub for the draw. I had a bottle open and a reel change coming, and I told him to come back after. He said, "Promise you'll put it in?" I said go on, scoot.

At five past eleven I went out behind the snack bar for air, and I saw a little torch going into the trees behind the toilets. There was another light ahead of it, deeper in. A red one, like a brake light. I thought it was the big kids larking about. I thought, it's not my business. I thought, if I go down there and somebody smells my breath, I lose my licence, and the booth is all I have.

I told the police I saw nothing. I told them children don't come to the booth.

I never drew the winner. The can is still on the bench.

L. Hardy` },
      pine_kiosk: { kind: 'note', title: 'The lost property book in the ticket kiosk', from: 'Pinewood, 1975 season', body:
`16/8   ladies' cardigan, green, row 2
16/8   thermos (no lid)
22/8   one sock, child's, row 4
22/8   11:40 p.m.   CAR KEYS on a red tag, "STRAND". Dropped by the father by the toilets while they were searching. Handed in by Jonna L. Told him they're here. He hasn't come back for them.` },
      pine_wiper: { kind: 'note', title: 'A note under the wagon\'s wiper', from: 'Dad', body:
`(Biro, on the back of a road map, pinned under the wiper so it faces out toward the trees.)

MIKKEL —
STAY WHERE YOU CAN SEE THE CAR LIGHTS.
WALK TOWARD THEM.
WE ARE LOOKING FOR YOU.
NOBODY IS CROSS.
— DAD` },
      pine_staff: { kind: 'note', title: 'Pinned up in the store room', from: 'Bo', body:
`STAFF —
The generator runs the snack bar and the yard lights.
For customers who run dry: the day tank has a drain tap on the side. Half a red can, no more, and write it in the book. Open the tap SLOWLY. It spits and it bangs and you'll have the whole field looking at you.

Lyle's battery is for HIS booth lamp. Not for jump-starting cars. Not again.
— Bo` },
      pine_search: { kind: 'report', title: 'A search notice nailed to the tree stand', from: 'Nordvik police', date: 'Saturday 23 August 1975', body:
`SEARCH — SECTOR C (north-west woods)
Lines of ten, arm's length apart.

The dogs lost the trail at the old hunting stand.
One child's boot found, left, red, about 40 m north of the stand.
Nothing else found.

Search called off at dark. Resume 06:00.` },
      wren4: { kind: 'drawing', drawing: 4, title: 'A drawing in the leaves', from: 'Wren, age 7', body:
`Crayon. A huge white screen standing in black trees. In front of it a little boy in a blue coat and red boots, holding a torch, looking back over his shoulder. On the top edge of the screen, the little red bird.

Underneath:
HE LOOKED BACK` },
    },
    items: {
      stub: { name: 'Ticket stub', desc: 'CHILD — PINEWOOD DRIVE-IN — 22 AUG 75 — No. 1147. It was never dropped in the can.' },
      carBattery: { name: 'Car battery', desc: 'Twelve volts and very heavy. It was running the booth lamp.' },
      carKeys: { name: 'Car keys', desc: 'Two keys on a red plastic tag. STRAND.' },
      jerrycan: { name: 'Red jerrycan', desc: 'Empty. It smells of petrol.' },
      fuel: { name: 'Jerrycan of petrol', desc: 'Half full. It sloshes when you walk.' },
    },
    obj: {
      pine_start: 'Find a way out of Pinewood',
      pine_parts: 'Get the wagon running: battery, petrol, keys ({n}/3)',
      pine_startCar: 'Start the wagon',
      pine_stubFind: 'Find the boy\'s ticket stub',
      pine_claim: 'Drop the stub in the can in the projection booth',
      pine_leave: 'Drive out through the gate',
    },
    mono: {
      pine_start: 'A cinema screen in the trees. The film is running, and there\'s no sound at all.',
      pine_gate: 'The gate\'s chained. Padlocked on this side, which makes no sense.',
      pine_wagon: 'This one was pulled out of its row and turned to face the trees. The headlights are switched on. The battery\'s dead.',
      pine_wagonNeeds: 'Dead battery, empty tank, no keys. Somebody ran this car all night with the lights on.',
      pine_battery: 'A car battery. It was running the booth lamp.',
      pine_batteryDark: 'And now the booth is dark.',
      pine_keys: 'STRAND. He dropped them looking for his son.',
      pine_can: 'A red jerrycan. Empty.',
      pine_fill: 'It spits. It bangs. Everything out there can hear this.',
      pine_filled: 'Half a can. That\'ll do.',
      pine_tankNoCan: 'The generator\'s day tank. There\'s a drain tap. I need something to fill.',
      pine_fitBattery: 'Battery in. The headlights came on by themselves. They were never switched off.',
      pine_inBeam: 'One of the trees in the light is standing wrong.',
      pine_fuel: 'Petrol in.',
      pine_startFail: 'It turns over. It turns over. It dies. Everything heard that.',
      pine_notYet: 'It turns and won\'t catch. As if the place isn\'t finished with me.',
      pine_stubHint: 'He came to the booth with his stub for the draw. Then he went to the toilets.',
      pine_stub: 'A child\'s ticket stub. Eleven forty-seven. He never got to drop it in.',
      pine_claimed: 'There. You were here. You were counted.',
      pine_draw: 'He\'d have won.',
      pine_start2: 'It caught. Oh, it caught.',
      pine_end: 'In the mirror the screen goes white, and then dark. Somebody switched the projector off.',
      pine_booth: 'The booth. Hot dust and whisky.',
      pine_toilets: 'The back door\'s open onto the trees.',
      pine_clearing: 'A hunting stand. The leaves are trodden flat in a ring round it.',
      pine_pines: 'Some of these trees have moved since I last looked.',
      pine_stag: 'Something big just crossed the field. Antlers wider than a car.',
      pine_usher: 'A red light between the cars. Someone showing people to their seats.',
      pine_swing: 'The swing\'s moving. There\'s no wind.',
      pine_gateOpen: 'Far off, a chain dropping on gravel.',
      pine_canLook: 'The draw can. A handful of stubs in the bottom, under the last reel.',
    },
    lines: {
      pine_stubPrompt: 'A ticket stub on the floor',
      pine_canPut: 'Drop the stub in the can',
      pine_canLook: 'An open film can on the rewind bench',
      pine_tankPrompt: 'Fill the jerrycan from the drain tap (hold)',
      pine_tankLook: 'The generator\'s day tank',
      pine_wagonLook: 'The Strands\' wagon',
      pine_wagonBattery: 'Fit the battery',
      pine_wagonFuel: 'Pour in the petrol',
      pine_wagonStart: 'Start the engine (hold)',
      pine_wagonGo: 'Get in and drive',
    },
    radio: {
      pine_otto1: [
        ['radio', '[static, and a projector\'s rattle under it]'],
        ['otto', 'Nine to Ada. Trees? A screen? Pinewood. A drive-in north of Nordvik, 1975. I have a box of it here: eleven car keys, a boy\'s red boot, and the last reel of a film nobody finished watching.'],
        ['ada', 'The film\'s still running. No sound.'],
        ['otto', 'There never is, down here. Two things. The trees there only move while you do. And if you see a red light between the cars, it is not there to help you find your seat.'],
      ],
      pine_ottoStag: [
        ['otto', 'That was the Stag. It listens. When it puts its head down, get something solid between you. A tree. A car. It doesn\'t stop for anything else.'],
      ],
      pine_draw: [
        ['lyle', '[every speaker on the field at once: a crackle, a breath, a man too close to the microphone]'],
        ['lyle', 'Ladies and gentlemen. The lucky stub. A season pass for nineteen seventy-six.'],
        ['lyle', 'Number eleven... forty-seven.'],
        ['lyle', 'Eleven forty-seven. Is eleven forty-seven here?'],
        ['lyle', 'Come up to the booth, son. I promised.'],
      ],
      pine_otto2: [
        ['otto', 'The box from Pinewood. The boot has gone out of it. There is a ticket stub in its place. Somebody has written on it in pencil. "Winner."'],
      ],
    },
    recap: {
      pinewood: 'Pinewood Drive-In, the last night of 1975. The projectionist, Lyle Hardy, told the police children never came to his booth and he saw nothing. Eight-year-old Mikkel Strand came to the booth with his stub for the draw, was sent away, and followed a red light into the trees while Lyle watched. I dropped the boy\'s stub in the can, and every speaker on the field read out his number. Then I drove his father\'s car out of the gate.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
