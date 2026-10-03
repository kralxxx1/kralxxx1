/* English — Chapter 7: Last Stop (the Nordlys Express). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      train: {
        name: 'CHAPTER 7', title: 'Last Stop', place: 'Brenna station, on the line north',
        intro: 'Wednesday 19 December 1990, 23.40.\n\nThe night sleeper to Nordvik is standing at the platform with every window lit. Nobody is getting on. Nobody is getting off. One door is open.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'The timetable by the platform door', from: 'Northern Lines', date: 'Winter timetable 1990–91', body:
`NORDLYS EXPRESS — night sleeper, daily
Halvard dep. 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (request stop)* 00.50
Nordvik arr. 06.15

* Trains stop at Kvitfjell only if a passenger tells the conductor before Brenna, or a passenger is waiting on the platform. The halt is unstaffed and unlit in winter.` },
      train_notice: { kind: 'notice', title: 'A notice in the waiting room', from: 'Northern Lines, District Traffic Office', date: '1 December 1990', body:
`TICKETS MUST BE BOUGHT BEFORE BOARDING.

There is no sale of tickets on night trains. A passenger who cannot show a valid ticket to the conductor will be required to leave the train at the next stop.

Thank you for travelling with Northern Lines.

(Someone has written underneath in biro: "even at Kvitfjell?" and someone else: "ESPECIALLY at Kvitfjell")` },
      train_menu: { kind: 'note', title: 'The dining car menu', from: 'Nordlys Express dining car', date: '19.12.90', body:
`Fish soup with bread — 48
Reindeer stew, lingonberries, potatoes — 95
Waffles with jam and sour cream — 32
Coffee — 12   Cocoa — 14

The dining car closes at 23.00. After 23.00, passengers from the sleeping cars are served on showing their berth ticket.

(A ring from a cup. Under the menu, in pencil: "Table by the galley: cocoa, berth 24, paid cash.")` },
      train_waiter: { kind: 'note', title: 'An order pad by the galley', from: 'R. Moe, steward', date: '19.12.90', body:
`23.55  Berth 24 (car 2) — young lady, on her own — cocoa, waffles.
       Dining car shut, but she showed me her berth ticket, so.
       Going home to Nordvik for Christmas. First time on the train by herself.
       Put the ticket back in her coat pocket. Told her mind she doesn't lose it.

00.30  Mr Saether through on his round. Snow on the line all the way
       from Ostra, and he's taking it out on everybody.` },
      train_paper: { kind: 'clipping', title: 'A newspaper left on a table', from: 'Nordvik Times', date: 'Saturday 22 December 1990', body:
`GIRL, 15, MISSING SINCE WEDNESDAY

Lina Berg, 15, of Nordvik, has not been seen since she boarded the Nordlys Express at Halvard on Wednesday evening to come home for Christmas.

She did not arrive. Northern Lines says that no passenger left the train between Brenna and Nordvik, and that her berth was found unoccupied when the train arrived.

Snow has fallen across the district every day since. Police ask anyone who travelled on the train to come forward.` },
      train_lina: { kind: 'letter', title: 'A letter on the little table in berth 24', from: 'Lina', date: '19.12.90, on the train', body:
`Dear Mamma,

I'm on the train!!! I bought the ticket myself with my Saturday money from the café, the whole way, with a bed. It is the size of a cupboard. I have the bottom bunk and nobody in the top one, so I have put my coat up there and it looks like a person.

We get in at quarter past six. Don't come to the station in the dark, I know the way. I'll be home for breakfast. Tell Jonas he can't have my room.

I'll give you this myself so I don't need a stamp.

Lina` },
      train_saether: { kind: 'report', title: 'A duty report, folded in the conductor\'s compartment', from: 'E. Saether, conductor', date: '19/20.12.90', body:
`Nordlys Express, Halvard–Nordvik. Conductor: E. Saether.

21.10 Dep. Halvard. 61 passengers.
23.40 Brenna. 4 off, 0 on.
00.40 Ticket check, car 2: berth 24, female passenger, approx. 17–18, unable to produce ticket. Claims to have bought one. Searched her coat and bag in her presence. No ticket.
00.50 Kvitfjell. Passenger without ticket set down in accordance with regulations.
06.15 Arr. Nordvik. Nothing further to report.

(The 00.40 and 00.50 lines have been gone over in different ink, very carefully, so that they are almost unreadable.)` },
      train_inquiry: { kind: 'report', title: 'A statement in the conductor\'s desk', from: 'Northern Lines inquiry: statement of E. Saether', date: '4 January 1991', body:
`I was the conductor of the Nordlys Express on the night of 19 December.

I have no recollection of a girl travelling alone. I checked every ticket on the train as usual. Nobody had to be put off.

The train did not stop at Kvitfjell. No passenger had asked for it, and the halt was closed by snow.

I have been with the railway twenty-six years.

E. Saether` },
      train_docket: { kind: 'note', title: 'A lost property docket tied to a mail sack', from: 'Depot 9, Halvard Central — Lost Property', date: 'January 1991', body:
`No. 97 / 1991
One rail ticket, single, Halvard–Nordvik, sleeper, car 2 berth 24, 19.12.90. Not punched.
Found: Nordlys Express, car 2, under the lower berth, by cleaners at Nordvik, 20.12.90.
Received at Depot 9: 7.1.91.
Clerk: A. Lind
Status: UNCLAIMED` },
      train_cabLog: { kind: 'report', title: 'The driver\'s log in the cab', from: 'Driver K. Aune', date: '19/20.12.90', body:
`00.47  Bell from the conductor: stop at Kvitfjell.
00.50  Stopped Kvitfjell. Halt unlit, platform under snow. Heavy snow.
00.51  One passenger off, rear of car 2. Right away from the conductor.
00.52  Away.

(The page has been torn out of the book and put back in, loose.)` },
      wren7: { kind: 'drawing', drawing: 7, title: 'A drawing on a pillow in car 3', from: 'Wren, age 7', body:
`Crayon on squared paper. A long blue train in the dark with every window lit yellow, going away to the right. Behind it, in the snow, one girl in a red hat standing by a lamp post with her arms down. Above her, the little red bird.

Underneath:
SHE HAD ONE` },
    },
    items: {
      ticket: { name: 'Rail ticket', desc: 'Single, Halvard–Nordvik, 19.12.90, punched once already. Somebody else\'s. It was left on a table under a saucer.' },
      linaTicket: { name: 'Lina\'s ticket', desc: 'Single, Halvard–Nordvik, sleeper, car 2 berth 24, 19.12.90. Not punched. She had bought it herself.' },
    },
    obj: {
      train_start: 'Get on the train',
      train_ticket: 'Find a ticket before the conductor finds you',
      train_who: 'Find out who was put off at Kvitfjell',
      train_lina: 'Find Lina\'s ticket in berth 24',
      train_punch: 'Get her ticket punched',
      train_brake: 'Stop the train at Kvitfjell: the emergency brake is in the cab',
    },
    mono: {
      train_start: 'A train. Every window lit and not a soul on the platform.',
      train_board: 'In. The door\'s shut behind me.',
      train_moving: 'We\'re moving.',
      train_conductor: 'Someone with a lamp, coming down the corridor.',
      train_sleeper: 'Someone asleep in there, facing the door. Quietly, Ada.',
      train_gangway: 'Something under the plates. Don\'t stand here.',
      train_ticket: 'A ticket. It isn\'t mine. It\'ll have to do.',
      train_check: 'He wants my ticket.',
      train_punched: 'Click. He\'s walking on. He didn\'t look at my face.',
      train_letter: 'Lina. Fifteen. Home for breakfast.',
      train_report: 'Berth 24. "Claims to have bought one." Kvitfjell, ten to one in the morning, in the snow.',
      train_found: 'Under the bunk. Where she said it was.',
      train_turn: 'The lamp\'s stopped. He\'s turned round.',
      train_docket: 'A. Lind. That\'s my writing. My second week. I filed it and I never asked whose it was.',
      train_punchIt: 'His punch. Her ticket.',
      train_claimed: 'Punched. Valid. She was allowed to be on this train.',
      train_sat: 'He\'s sat down. He\'s taken his cap off.',
      train_kvitfjell: '"Kvitfjell." We\'re not slowing down.',
      train_passed: 'There it goes. One lamp in the snow. We didn\'t stop.',
      train_again: 'Kvitfjell, next stop. Again. It goes round.',
      train_brake: 'Hold on to something.',
      train_brakeWait: 'The emergency brake. Not yet. Not until she has her ticket.',
      train_punchWait: 'The conductor\'s punch. It isn\'t my ticket that needs it.',
      train_stopped: 'Kvitfjell.',
      train_out: 'One lamp and the snow. This is where he put her down. She would have stood right here and watched the windows go.',
    },
    lines: {
      train_boardPrompt: 'Get on the train',
      train_punchPrompt: 'Punch Lina\'s ticket',
      train_punchLook: 'The conductor\'s punch',
      train_brakePrompt: 'Pull the emergency brake (hold)',
      train_brakeLook: 'The emergency brake',
      pa_kvitfjell: '"Kvitfjell. Kvitfjell. Request stop."',
    },
    radio: {
      train_otto1: [
        ['radio', '[the wheels, under the static]'],
        ['otto', 'Nine to Ada. That sound. You are on a train. I would like you to tell me you have a ticket.'],
        ['ada', 'I don\'t.'],
        ['otto', 'Then find one before the conductor finds you. On my shelf the conductors are the worst. They are very polite and they do not stop.'],
      ],
      train_otto2: [
        ['otto', 'Ada. A docket has just come up the tube by itself. One rail ticket, unclaimed. In your handwriting. So you were filing my shelves long before you came down to them.'],
      ],
      train_otto3: [
        ['otto', 'It has gone quiet down your end. That is either very good or very bad. If the train is still moving, stop it. Trains like that do not arrive. They only go round.'],
      ],
    },
    recap: {
      train: 'Nordlys Express, 19 December 1990. Conductor Edvin Saether put fifteen-year-old Lina Berg off the night train at Kvitfjell halt, in the snow, because she could not find her ticket. She had bought it herself; it was under her bunk. He told the inquiry nobody was put off. The cleaners found the ticket at Nordvik and sent it to Depot 9, and I filed it, and never asked whose it was. I had it punched, and I stopped the train where she got off.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
