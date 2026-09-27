/* English — Level 8: Blue Moon Motor Inn (Eddie's memory). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      motel: {
        name: 'LEVEL 8', title: 'Blue Moon Motor Inn', place: "Eddie's memory — Route 9, the night shift",
        intro: 'This one is not yours. A motel off Route 9, the VACANCY sign buzzing, a night clerk who laughed at a skinny repairman\'s jokes in 1990.\n\nRoom 12 was paid for by the week for a long time. Somebody keeps knocking on doors.',
      },
    },
    items: {
      room12Key: { name: 'Key to Room 12', desc: 'A brass key on a green plastic diamond: BLUE MOON MOTOR INN — 12. Still warm from the dryer.' },
    },
    docs: {
      motel_intro: { kind: 'note', title: 'A sticky note on the VACANCY sign switch', from: 'June', date: '1991', body:
`Eddie —
If you're reading this you're late again.
Coffee's on. Pie's in the fridge. Don't eat all of it.
I love you. Fix the ice machine.
— J.` },
      motel_register: { kind: 'note', title: 'The guest register on the front desk', from: 'Blue Moon Motor Inn', date: '1992–1993', body:
`...
Rm 7 — traveling salesman — 1 night
Rm 3 — the Hendersons (again)
Rm 12 — E. — weekly — "workshop, do not disturb"
Rm 12 — E. — weekly
Rm 12 — E. — weekly — paid through June 12, 1993

(In June's handwriting: "He says it's for a project. He won't tell me what project. He comes home smelling of solder and he doesn't sleep.")

The hook for the Room 12 key is empty. Someone has written on the wall beside it: LAUNDRY?` },
      motel_complaint: { kind: 'note', title: 'Guest comment card', from: 'Room 11', date: 'May 1993', body:
`Very clean room. Good pie.

BUT: somebody knocks on my door at 3:17 AM every night. When I open it nobody is there.

Also the man in Room 12 talks to his walkie-talkie all night. There is nobody on the other end. I checked.

— A guest` },
      motel_postcard: { kind: 'note', title: 'A postcard on the nightstand', from: 'Eddie', date: 'Postmarked Harlow, 1990', body:
`(On the front: "GREETINGS FROM THE BLUE MOON — Route 9, Harlow", and a painting of a swimming pool the motel does not have.)

June,
You laughed at the ice machine joke. Nobody laughs at the ice machine joke. I'm going to keep telling it until you marry me.
— the skinny repair guy (Eddie)` },
      motel_walt: { kind: 'diary', title: "Walt's journal, torn in half", from: 'Walt', date: 'Inside', body:
`A motel. I don't know this place.

Somebody who worked for me stayed here. Good with his hands. Angry with me. I think I deserved it.

He had a wife. He had a baby coming.

I told him not to come looking. I wrote it on a note, I think. I think he didn't listen.

Nobody listens to the man who lost four children.` },
      motel_notebook: { kind: 'note', title: "Eddie's notebook, open on the bed", from: 'Eddie', date: '1992–1993', body:
`KERNEL NOTES — rev. C

A game needs 1 Player + 4 Haunts. The Kernel KEEPS them.
Walt is the Player now. Since March '92.
There's one real EXIT, on 256, on the broken side. It lets ONE person out when ONE person stays in their place.

ONE IN, ONE OUT. That's the whole rule.

Plan: I go in. I find the EXIT. I find somebody who still has a name. They hold the door. I walk out. I go home to June. I meet the baby.

Terrible plan. I know.
I underlined it three times anyway.

(Later, a different pen, written inside:)
Found the door my first week. Nobody to hold it. The Haunts don't have names anymore and Walt doesn't have a face. So I wait.

(Later still:)
There's a kid. Sam. The fifth one. The one who went home. The machine called Sam PLAYER ONE.
It might be the one.
I'm sorry, kid.` },
      motel_june: { kind: 'letter', title: 'Letters in a shoebox, the top one open', from: 'June', date: 'July 1993', body:
`Eddie,

The police stopped coming. Your mother still calls every Sunday.

I keep your side of the bed made. I don't know why. It's stupid.

The baby kicks when I play the radio. She likes the oldies station. She's going to be a DJ.

If you're somewhere you can read this, I'm not mad. I'm a little mad. Come home and I'll be mad at you in person.

We're naming her Hope. You don't get a vote.

— June` },
      motel_ultrasound: { kind: 'photo', photo: 'ultrasound', title: 'An ultrasound print, creased from being carried', from: 'St. Agnes Maternity', date: 'May 1993', body:
`A grainy gray fan. A tiny shape in the middle.

On the back, in Eddie's handwriting, again and again, as if he were practicing:
"Hi kid. Hi. I'm your dad. Hi kid. Hi. June thinks you're a girl. Hi."` },
      motel_tape: { kind: 'tape', title: 'Tape: "For the baby"', from: 'Eddie', date: 'June 11, 1993', body:
`[Click. A motel room. The ice machine rattling through the wall.]

EDDIE: Hey, kid. It's your dad. You don't know me yet.

EDDIE: I'm going to go get some people who got lost. Four kids, and an old man who was kind to me when he didn't have to be.

EDDIE: I'll be back before you're born. If I'm not... your mom's going to tell you I was an idiot, and she'll be right, but I was an idiot for a good reason.

EDDIE: [a long breath] I'm scared, kid. I'm really scared.

EDDIE: Okay. Okay. Your dad loves you. Ask your mom for the ice machine joke. She'll pretend she hates it.

[Click.]` },
    },
    obj: {
      motel_find12: 'Find out about Room 12 (the front desk)',
      motel_key: 'Find the key to Room 12',
      motel_room12: 'Open Room 12',
      motel_leave: 'Leave by the fire exit',
    },
    mono: {
      motel_start: 'A motel. The VACANCY sign buzzes. This isn\'t my memory. Whose is it?',
      motel_register: 'Room 12. "E." Eddie.',
      motel_key: 'The key was in a dryer. Still warm.',
      motel_room12: 'Room 12. Wires everywhere. A cot. It smells like solder.',
      motel_notebook: '"ONE IN, ONE OUT." ...Eddie.',
      motel_neighbor: 'A man in a bathrobe, far down the hall. His head is bowed. I think he\'s smiling.',
    },
    lines: {
      motel_unlock12: 'Unlock Room 12',
      motel_trust: '"Tell me the truth. I\'ll listen."',
      motel_doubt: 'Turn the radio down. Say nothing.',
    },
    radio: {
      motel_start: [
        ['eddie', '...Oh. Oh, this is the Blue Moon.'],
        ['sam', 'You know it?'],
        ['eddie', 'I met my wife here. She worked nights. Just... keep moving, okay? Don\'t go into Room 12.'],
        ['sam', 'Why not?'],
        ['eddie', 'Because I\'m asking you not to.'],
      ],
      motel_neighbor: [
        ['eddie', 'Don\'t open the door if he knocks. Don\'t turn your back on him either. Light makes him step away.'],
      ],
      motel_explain: [
        ['eddie', 'Sam. I know you read it. I can hear the pages.'],
        ['eddie', 'I wrote that before I knew you. Before I knew any of this.'],
        ['eddie', 'I have a daughter I\'ve never seen. For a year and a half she\'s the only thing I\'ve thought about.'],
        ['eddie', 'I\'m done lying to you. Just... let me explain. Please.'],
      ],
      motel_trusted: [
        ['eddie', 'The rule is real. One in, one out. The door on 256 opens for one person when somebody else stays.'],
        ['eddie', 'I wanted it to be you. I\'m ashamed of that. I don\'t want it to be you anymore.'],
        ['eddie', 'Free the Haunts. All four. If they all remember their names, there might be another way. Walt thought there was. Five hands, he wrote. I never understood it.'],
      ],
      motel_doubted: [
        ['eddie', '...Yeah. I\'d turn me off too.'],
        ['eddie', 'I\'ll be here when you want to talk. The fire exit\'s open.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
