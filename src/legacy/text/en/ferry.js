/* English — Chapter 2: Fog Bell (MS Saint Brigid). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      ferry: {
        name: 'CHAPTER 2', title: 'Fog Bell', place: 'MS Saint Brigid, Halvard Sound',
        intro: '9 November 1987, a quarter to eleven at night. Fog so thick the bow cannot be seen from the bridge.\n\nThe Saint Brigid is going down by the stern, slowly, on a sea as flat as a table. Her radar has not worked for a week. Somewhere forward, a bell.',
      },
    },
    docs: {
      ferry_notice: { kind: 'notice', title: 'Lifeboat stations', from: 'MS Saint Brigid', body:
`IN AN EMERGENCY

1. Go to your lifeboat station (see the card in your cabin).
2. Put on your life jacket. Do not inflate it inside the ship.
3. Boats are lowered by the crew.
   Davit key: on the bridge.
   Hand crank: if the motor fails.

(Under it, in marker pen: "No. 2 winch sticks. Crank lives in the engine room tool locker, NOT on deck. — 2nd Eng.")` },
      ferry_testimony: { kind: 'report', title: 'Statement to the inquiry (copy)', from: 'Capt. H. Aal', date: '30 November 1987', body:
`I was on the bridge from 21:30 until the order to abandon ship.

Visibility was under one cable. The radar had been unserviceable since 2 November, and fog signals were given by hand: the ship's bell, rung by deckhand P. Rask.

At approximately 22:35 the bell stopped. I sent the second mate forward. The boy had left his post. Without the signal we could neither be heard nor hear.

I regret to say that the loss of the Saint Brigid began when a sixteen-year-old panicked.

H. Aal, Master` },
      ferry_logpage: { kind: 'report', title: 'A page torn from the logbook', from: 'Saint Brigid, deck log', date: '9 November 1987', body:
`21:40  Fog thick. Speed reduced to 6 kn. Radar u/s.
22:05  Master to his cabin (unwell). 2nd Mate has the watch.
22:10  Fog signals by hand. D/H Rask at the bell.
22:31  Master sent for. Did not come.
22:44  Struck, port side aft. Making water.
22:47  Abandon ship. Boats 1, 3, 4 away.
22:52  D/H Rask still ringing. He says the boats are steering on the bell. Master not on bridge.
22:58  Bell still

(The writing stops there. The page has been torn out cleanly, then folded small, the way you fold something to keep it in a drawer for a long time.)` },
      ferry_logbook: { kind: 'report', title: 'The deck log on the chart table', from: 'Saint Brigid', body:
`21:15  Halvard pier. 41 passengers, 17 crew. Fog patches.
21:30  Clear of the harbour.

(A page is missing. You can see the torn edge in the binding. On the next page:)

23:40  All boats accounted for. One crew missing: D/H P. Rask, who left his post at the bell at about 22:35.
— H. Aal` },
      ferry_logbookFull: { kind: 'report', title: 'The deck log, with its page back', from: 'Saint Brigid', body:
`21:40  Fog thick. Speed reduced to 6 kn. Radar u/s.
22:05  Master to his cabin (unwell). 2nd Mate has the watch.
22:10  Fog signals by hand. D/H Rask at the bell.
22:31  Master sent for. Did not come.
22:44  Struck, port side aft. Making water.
22:47  Abandon ship. Boats 1, 3, 4 away.
22:52  D/H Rask still ringing. He says the boats are steering on the bell. Master not on bridge.
22:58  Bell still ringing.
23:05  Bell silent.

(The page sits in the binding as if it had never been out. The ink on the last line is wet.)` },
      ferry_radio: { kind: 'printout', title: 'Radio room log', from: 'R/O', date: '9.11.87', body:
`22:46  MAYDAY sent. Position by dead reckoning.
22:48  Halvard Radio acknowledges. Pilot boat Ternen proceeding.
22:55  Ternen: "Cannot see you. Can hear your bell. Steering for it."
23:02  Ternen: "Have two of your boats. Still hear the bell. Keep ringing."
23:05  Ternen: "Bell has stopped. Where are you?"
23:06  (no further entries)` },
      ferry_mother: { kind: 'letter', title: 'A letter on a seat in the lounge', from: 'Elin Rask', date: '4 January 1988', body:
`To the gentlemen of the inquiry,

You have written in your report that my son left his post.

Pim was sixteen. He was afraid of the dark until he was eleven and he still slept with the landing light on. When he was afraid he did what he was told, and he did it louder.

If someone told him to ring that bell, he rang it until there was no more ship to ring it on.

I would like his name taken out of your report. I would like it put back the right way round.

Elin Rask` },
      ferry_cabin: { kind: 'card', title: 'A postcard on the bunk', from: 'Margit', body:
`(A picture of the Saint Brigid on a summer day, flags out.)

Dear Aunt Ruth,
Crossing in fog, can't see a thing! The boy on deck rings a bell every minute so other boats know we're here. It's lovely and spooky. Tell Mum I'll ring from Halvard.
Margit

(Never posted.)` },
      ferry_purser: { kind: 'note', title: 'Crew list, purser\'s office', from: 'Purser', body:
`MS SAINT BRIGID — CREW, WINTER TIMETABLE 1987

Master ............ H. Aal
Chief Officer ..... (on leave)
2nd Mate .......... T. Solberg
Chief Engineer .... K. Moe
2nd Engineer ...... R. Dahl
Radio Officer ..... B. Lund
Deckhand .......... P. Rask (16) — first season

(Someone has drawn a small bell beside the last name.)` },
      ferry_mess: { kind: 'note', title: 'Duty roster in the crew mess', from: 'T. Solberg', body:
`WEEK 45

Radar U/S since 2/11 — parts ordered from Bergen.
UNTIL FIXED: fog bell by hand when visibility < 1 nm.
Bell: Rask (all evening crossings).
Rask: you ring until I tell you to stop. Not until it gets boring. Until I TELL you.
— T.S.` },
      wren3: { kind: 'drawing', drawing: 3, title: 'A drawing tucked into a bunk', from: 'Wren, age 7', body:
`Crayon. A boat in grey scribbles of fog. On the front, a boy in yellow with a bell, his mouth open, ringing. On the top of the mast, a little red bird.

Underneath:
HE DID NOT STOP` },
    },
    items: {
      bridgeKey: { name: 'Bridge key', desc: 'A brass key on a cork float. From the captain\'s cabin.' },
      davitKey: { name: 'Davit key', desc: 'A T-shaped key stamped LIFEBOATS. It releases the winch brake.' },
      crank: { name: 'Winch crank', desc: 'A heavy steel crank with a wooden grip. For lowering a boat by hand.' },
      logPage: { name: 'Torn log page', desc: 'Folded small. 9 November 1987, 21:40 to 22:58.' },
    },
    obj: {
      ferry_start: 'Find a way off the ship',
      ferry_bridge: 'Get the davit key from the bridge',
      ferry_captain: 'Search the captain\'s cabin for the bridge key',
      ferry_logbook: 'Put the torn page back in the logbook on the bridge',
      ferry_key: 'Take the davit key from the bridge',
      ferry_crank: 'Find the winch crank in the engine room',
      ferry_lower: 'Lower lifeboat 2',
    },
    mono: {
      ferry_start: 'A ship. Fog so thick I can\'t see the rail. And the deck is leaning.',
      ferry_winch: 'Lifeboat 2. The winch needs a davit key and a crank. The key will be on the bridge.',
      ferry_winch2: 'Still need the key and the crank.',
      ferry_winchNoCrank: 'Key\'s in. The crank isn\'t on deck. The notice said engine room.',
      ferry_winchNoKey: 'I have the crank. The brake is still locked: the davit key.',
      ferry_brake: 'The brake won\'t let go. As if the ship isn\'t finished with me.',
      ferry_pageAfter: 'He wasn\'t on the bridge. He was in his cabin with a bottle, and the boy rang that bell for an hour.',
      ferry_logbookGap: 'A page is missing. Torn out at 21:40.',
      ferry_claimed: 'There. That\'s where it goes.',
      ferry_bell: 'The ship\'s bell. It rings like it\'s waiting for someone.',
      ferry_bellAfter: 'It\'s warm. Somebody\'s hand was on this rope.',
      ferry_bridgeKey: 'The bridge key. Under his pillow. Of course.',
      ferry_davitKey: 'LIFEBOATS. The davit key.',
      ferry_crank: 'The crank. The water just moved. All of it, at once.',
      ferry_lower: 'Hold on. Hold on to something.',
      ferry_end: 'He\'s still ringing. Steady, like a clock. So the boats can find their way.',
      ferry_bridgeLocked: 'The bridge is locked. The captain will have a key.',
      ferry_passengers: 'They were asleep. Every one of them was asleep, and now they\'re standing.',
      ferry_drowned: 'Something came up out of the water. It came up hands first.',
      ferry_lounge: 'The lounge. Life jackets on every seat. Nobody moved when I came in.',
      ferry_engineRoom: 'The engine room is flooded to the knee. The water is very still.',
      ferry_fore: 'The bell is up here somewhere. I can hear it breathing in the wind.',
    },
    lines: {
      ferry_winchGo: 'Wind the winch and lower lifeboat 2 (hold)',
      ferry_winchLook: 'Lifeboat 2 winch',
      ferry_logbookPut: 'Put the page back',
      ferry_logbookRead: 'Read the logbook',
      ferry_bellPrompt: 'Ring the bell',
      ferry_pagePrompt: 'A folded page in the drawer',
      ferry_bridgeUnlock: 'Unlock the bridge',
    },
    radio: {
      ferry_otto1: [
        ['radio', '[static, and under it, very faint, a bell]'],
        ['otto', 'Nine to Ada. You went through. Where are you?'],
        ['ada', 'On a ship. In fog. It\'s sinking.'],
        ['otto', 'The Saint Brigid. I have a whole shelf of her: life jackets, a chess set, forty-one umbrellas. She went down in 1987.'],
        ['ada', 'How do I get off?'],
        ['otto', 'Every shelf has one thing that is in the wrong place. A lie with a page number. Put it back and the place lets go of you. Then use the lifeboats like a sensible person.'],
      ],
      ferry_bellman: [
        ['otto', 'You have met the man with the bell. Do not let him put it on you. He rings it so you know where he is. Be grateful. Most of them do not.'],
      ],
      ferry_otto2: [
        ['otto', 'Something on my shelves just moved. A file. Rask, P. It was under "abandoned post". It is not there any more.'],
        ['ada', 'Where is it now?'],
        ['otto', 'Under "found". I did not put it there.'],
      ],
    },
    recap: {
      ferry: 'The Saint Brigid, in fog. Captain Aal said the boy at the fog bell panicked and ran. The page Aal tore out of his own logbook said he was drunk in his cabin while sixteen-year-old Pim Rask rang the boats home. I put the page back. When lifeboat 2 touched the water, the bell started ringing again.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
