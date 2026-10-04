/* English — Chapter 8: Bright Lights (Falk's Carnival). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      carnival: {
        name: 'CHAPTER 8', title: 'Bright Lights', place: 'Falk\'s Carnival, Halvard harbour',
        intro: 'Sunday 30 September 1984, a little before midnight. The last night of the season.\n\nThe crowds have gone home. The lights have been left on. The ghost train burned the night before, and the old clown has been told to pack his things.',
      },
    },
    docs: {
      carnival_poster: { kind: 'notice', title: 'A poster on the ticket kiosk', from: 'Falk\'s Carnival', date: 'September 1984', body:
`FALK'S CARNIVAL
Halvard Harbour — 14 to 30 September
LAST NIGHTS!

The Grand Carousel · The Big Wheel
The Funhouse — meet LAUGHING LOTTE!
The GHOST TRAIN (if you dare)
Hook-a-Duck · Shooting Gallery · Test Your Strength

and every afternoon at 4 and 7:
PIPO THE CLOWN
"Halvard's own, for twenty-one seasons"` },
      carnival_closing: { kind: 'notice', title: 'A notice wired to the gate', from: 'E. Falk, proprietor', date: '30.9.84', body:
`THE GHOST TRAIN IS CLOSED.

Following the fire on Saturday night the ghost train will not run again this season. Nobody was hurt.

The management thanks the public and the Halvard Fire Brigade, and apologises for any disappointment.

Falk's Carnival leaves Halvard on Tuesday morning. See you next year!` },
      carnival_fire: { kind: 'report', title: 'A copy of the fire report in the control booth', from: 'Halvard Fire Brigade', date: '30 September 1984', body:
`Incident 84/211. Falk's Carnival, harbour. Called 01.40, 30.9.84.
Fire in the dark ride ("Ghost Train"). Extinguished 02.15. No injuries.

Seat of fire: the operator's cabin at the rear of the ride, in a waste bin.
Probable cause: a cigarette, not put out.

The proprietor, Mr E. Falk, states that his employee H. Brecht (a clown) slept in the cabin and smoked there. Mr Brecht has been dismissed and could not be questioned. The proprietor's son, K. Falk, 19, was not present.

Officer's note: two kinds of cigarette end in the bin. Lipstick on one.` },
      carnival_kasper: { kind: 'letter', title: 'An envelope on the burned desk, never posted', from: 'K.', date: '1 October 1984', body:
`Hugo,

It was me. Me and Mette, in the cabin after closing, and I put the tin in the bin without looking because we heard Dad coming.

Dad knows. Dad says it's done now, and you were going to stop soon anyway, and he's given you two weeks' money. When he said it was you, you looked at me. You didn't say anything. I don't know why you didn't say anything.

I'm sorry. I'm sorry.
K.

(On the envelope: "Pipo". No address. On the back, in the same hand: "where do I send it")` },
      carnival_ledger: { kind: 'report', title: 'The proprietor\'s ledger in the wheel booth', from: 'E. Falk', date: 'September 1984', body:
`29.9 Takings, all rides — 14,220. Ghost train: fire after closing (01.40). Out of service.
30.9 Brecht, H. ("Pipo"). 21 seasons. Paid off: two weeks' money, cash. Not to be rehired.
     Insurance claim, ghost train: fire caused by employee smoking in rear cabin (Brecht). Statement signed E.F.
     K. — to drive the lorry to Ostra Tuesday. Keep him busy.` },
      carnival_rosa: { kind: 'note', title: 'A note pinned under the mask stall counter', from: 'Rosa, masks & novelties', date: 'Night of 30.9.84', body:
`Pipo came past my stall at midnight with his suitcase. He'd taken his face off already, and he looked about a hundred.

He took his nose out of his pocket and put it on my counter and said, "Mind that for me, Rosa."

I asked him where he was going. He said, "Home." He hasn't got a home. He's lived in that trailer for twenty years.

I've put the nose under the counter where nobody will take it. — R.` },
      carnival_hugo: { kind: 'note', title: 'A card tucked in the mirror frame', from: 'Hugo Brecht', date: '(very old, written over many times)', body:
`What Old Bruno taught me, 1931:

The face goes on in this order. White. Then the red. Then the black. Then the nose.
The nose goes on last and comes off first.
With the nose on you are Pipo, and nothing can hurt you.
With it off you are only Hugo. So be careful where you take it off.

The nose lives on the mirror. Never in a pocket.` },
      carnival_fan: { kind: 'letter', title: 'A child\'s letter on the bed', from: 'Tomas, age 7', date: 'September 1984', body:
`Dear Pipo

Thank you for the dog you made me out of a balloon. I have still got it. It is going down a bit.

When I am big I want to be a clown and do the falling over.

love from Tomas

(A crayon drawing: a clown with a red nose as big as his head, falling over, and everybody laughing.)` },
      carnival_paper: { kind: 'clipping', title: 'A page of newspaper on a bench', from: 'Halvard Harbour News', date: 'Thursday 4 October 1984', body:
`CLOWN'S SUITCASE FOUND ON HARBOUR STEPS

A battered brown suitcase belonging to Hugo Brecht, 71, known to three generations of Halvard children as Pipo the clown, was found on Monday morning on the steps below the fish quay.

Mr Brecht was dismissed by Falk's Carnival after a fire on its ghost train ride on Saturday night, which the proprietor blamed on him. He has not been seen since. Anyone who saw him on Sunday night is asked to contact the harbour police.

The fair left Halvard on Tuesday.` },
      wren8: { kind: 'drawing', drawing: 8, title: 'A drawing on the floor of the tilted room', from: 'Wren, age 7', body:
`Crayon, the paper folded in four. A clown with a red nose and a big brown suitcase, walking away down a road toward the sea, waving goodbye with his arm right up. Behind him a big wheel full of lights. The little red bird is sitting on his hat.

Underneath:
BYE PIPO` },
    },
    items: {
      fuse: { name: 'Fuse', desc: 'A cartridge fuse, porcelain and brass. 60 A. From the funhouse workroom.' },
      nose: { name: 'Pipo\'s nose', desc: 'A clown\'s nose, red, worn shiny. It has been on a lot of faces, and only ever on one.' },
    },
    obj: {
      carnival_start: 'Find a way out of the fair',
      carnival_power: 'The ghost train runs out through the fence. Get it running',
      carnival_fuse: 'Find a fuse: try the funhouse workroom',
      carnival_fit: 'Fit the fuse in the ghost train\'s control booth',
      carnival_why: 'Find out what happened to Pipo',
      carnival_nose: 'Find what Pipo left behind',
      carnival_mirror: 'Put Pipo\'s nose back on his mirror',
      carnival_ride: 'Ride the ghost train out',
    },
    mono: {
      carnival_start: 'A fair. Shut for the night, with every light left on.',
      carnival_gate: 'Chained. And the fence is three metres of mesh with wire along the top.',
      carnival_booth: 'The booth\'s empty. The glass is broken. From the inside.',
      carnival_lotte: 'Someone laughing. A long way off. It doesn\'t stop to breathe.',
      carnival_ghost: 'The ghost train. Burnt out. The track goes right through and out the back, through the fence.',
      carnival_noPower: 'Dead. The fuse holder\'s empty and the old fuse is black in the tray.',
      carnival_fuse: 'A fuse. Sixty amps. That looks right.',
      carnival_power: 'Lights inside. The cars still won\'t move. Something\'s holding it.',
      carnival_maze: 'Mirrors. Me, and me, and someone standing behind me in every one of them. There\'s nobody behind me.',
      carnival_masks: 'People standing about in masks. They weren\'t there a minute ago.',
      carnival_nose: 'His nose. "Mind that for me, Rosa."',
      carnival_music: 'The organ\'s started. On its own.',
      carnival_horses: 'The horses. They\'re coming off the carousel.',
      carnival_stopped: 'The music\'s stopped. They\'ve stopped. Exactly where they are.',
      carnival_trailer: 'His trailer. The mirror\'s lit.',
      carnival_mirrorLook: 'His mirror. A clean round mark on the glass shelf where something always sat.',
      carnival_placed: 'There. Where it lives, when he\'s only Hugo.',
      carnival_claimed: 'The bulbs round the mirror are going out one at a time.',
      carnival_running: 'Something\'s started up across the fair. The ghost train.',
      carnival_notYet: 'The track runs out through the back. But it won\'t run without power.',
      carnival_board: 'Hold on to the bar.',
      carnival_out: 'The harbour steps. A brown suitcase on the bottom one, and the tide coming up over it.',
      carnival_kasper: 'He wrote it and never sent it. "Where do I send it."',
      carnival_fence: 'Through the back wall, through the fence.',
    },
    lines: {
      carnival_boothPrompt: 'Fit the fuse',
      carnival_boothLook: 'The ride\'s controls',
      carnival_mirrorPut: 'Put the nose on the mirror',
      carnival_mirrorLook: 'Pipo\'s mirror',
      carnival_ridePrompt: 'Get in the car',
      carnival_rideLook: 'A ghost train car',
    },
    radio: {
      carnival_otto1: [
        ['radio', '[a band organ, far away, out of tune]'],
        ['otto', 'Nine to Ada. I hear a fair. I have a shelf of little paper tickets for rides, and one red nose. I have no idea why I said that.'],
        ['ada', 'The gate\'s chained.'],
        ['otto', 'Fairs are fenced to keep people paying, not to keep them in. There is always a way out that the staff use. Follow the rails.'],
      ],
      carnival_otto2: [
        ['otto', 'Ada. Do not stand still near anything that is wearing a face. And if the music starts, keep moving while it plays. When it stops, so does everything that dances to it.'],
      ],
      carnival_otto3: [
        ['otto', 'The nose has gone from my shelf. Good. That was never mine to keep. One more shelf, Ada, and it is the one you have been walking toward all night.'],
      ],
    },
    recap: {
      carnival: 'Falk\'s Carnival, 30 September 1984. Kasper Falk, nineteen, set the ghost train alight with a cigarette; his father told the fire brigade it was the old clown, Hugo Brecht, and paid him off. Hugo said nothing. He left his nose with Rosa at the mask stall and walked out of the gate with his suitcase, and the suitcase was found on the harbour steps. I put his nose back on his mirror, where it lived, and rode the ghost train out through the fence.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
