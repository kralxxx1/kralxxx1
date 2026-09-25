/* English — Chapter 8: Starlite Motor Inn (Eddie's memory). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      motel: {
        name: 'LEVEL 8', title: 'Starlite Motor Inn', place: "Route 9, the night clerk's shift",
        intro: 'This one is not yours. A motel off Route 9, vacancy sign buzzing, a night clerk who laughed at a skinny repairman\'s jokes in 1990. Room 12 has been paid for a long time. Somebody keeps knocking on doors.',
      },
    },
    items: {
      room12Key: { name: 'Key to Room 12', desc: 'A brass key on a green plastic diamond: STARLITE MOTOR INN — 12. Still warm from the dryer.' },
    },
    docs: {
      motel_intro: { kind: 'note', title: 'A sticky note on the vacancy sign switch', from: 'June', date: '1991', body:
`Eddie —
If you're reading this you're late again.
Coffee's on. Pie's in the fridge. Don't eat all of it.
I love you. Fix the ice machine.
— J.` },
      motel_register: { kind: 'note', title: 'The registration book on the front desk', from: 'Starlite Motor Inn', date: '1990–1993', body:
`...
Rm 7 — traveling salesman — 1 night
Rm 3 — the Hendersons (again)
Rm 12 — E. — weekly — "workshop, do not disturb"
Rm 12 — E. — weekly
Rm 12 — E. — weekly — paid through June 12, 1993

(Clerk's note in June's handwriting: "He says it's for a project. He won't tell me what project. He comes home smelling like solder and he doesn't sleep.")

The key hook for Room 12 on the board is empty. Someone wrote on the wall next to it: LAUNDRY?` },
      motel_complaint: { kind: 'note', title: 'Guest comment card', from: 'Room 11', date: 'May 1993', body:
`Very nice clean room. Good pie.

BUT: somebody knocks on the door at 3:17 AM every night. When I open it nobody is there.

Also the man in Room 12 talks to his walkie-talkie all night. There is nobody on the other end. I checked.

— A guest` },
      motel_postcard: { kind: 'note', title: 'A postcard on a nightstand', from: 'Eddie', date: 'Postmarked Harlow, 1990', body:
`(Front: "GREETINGS FROM THE STARLITE — Route 9, Harlow". A drawing of a swimming pool that the motel does not have.)

June,
You laughed at the joke about the ice machine. Nobody laughs at that joke. I'm going to keep telling it until you marry me.
— the skinny repair guy (Eddie)` },
      motel_walt: { kind: 'diary', title: "Walt's journal, the page torn in half", from: 'W', date: '—', body:
`A motel. I don't know this place.

Someone who worked for me stayed here. He was good with his hands. He was angry with me. I think I deserved it.

He had a wife. He had a baby coming.

I told him not to come looking. I think I wrote it on a note. I think he didn't listen.

Nobody listens to the man who got four children lost.` },
      motel_notebook: { kind: 'note', title: "Eddie's notebook, open on the bed", from: 'Eddie', date: '1992–1993', body:
`KERNEL NOTES — rev C

The game needs 1 player + 4 ghosts.
Walt is the player now. He has been since March.
If someone else goes in, the game has two players. It can't.
So it swaps. ONE IN, ONE OUT.

That's the rule. That's the whole rule.

So: I go in. I find the real EXIT. I find somebody who still has a name.
They hold the door. I walk out. I go home to June. I meet the baby.

It's a terrible plan. I know it's a terrible plan.

I underlined it three times anyway: ONE IN, ONE OUT.

(Later entry, different pen, inside:)
There's a kid. Sam. The fifth one. The one who went home.
The kid might be the one.
I'm sorry, kid.` },
      motel_june: { kind: 'letter', title: 'Letters in a shoebox, the top one open', from: 'June', date: 'July 1993', body:
`Eddie,

The police stopped coming. Your mother still calls every Sunday.

I keep your side of the bed made. I don't know why. It's stupid.

The baby kicks when I play the radio. She likes the oldies station. She's going to be a DJ.

If you're somewhere you can read this, I'm not mad. I'm a little mad. Come home and I'll be mad at you in person.

We're naming her Hope. You don't get a vote.

— June` },
      motel_ultrasound: { kind: 'photo', photo: 'ultrasound', title: 'An ultrasound printout, creased from being carried', from: 'St. Agnes Maternity', date: 'May 1993', body:
`A grainy fan of gray. A tiny shape in the middle.

On the back, in Eddie's handwriting, over and over, as if practicing:
"Hi kid. Hi. I'm your dad. Hi kid. Hi. It's a girl, June thinks. Hi."` },
      motel_tape: { kind: 'tape', title: 'Tape: "For the baby"', from: 'Eddie', date: 'June 11, 1993', body:
`[Click. A motel room. The ice machine rattling through the wall.]

EDDIE: Hey, kid. It's your dad. You don't know me yet.

EDDIE: I'm going to go get some people who got lost. Four kids and an old man who was kind to me when he didn't have to be.

EDDIE: I'll be back before you're born. If I'm not... then your mom's going to tell you I was an idiot, and she's right, but I was an idiot for a good reason.

EDDIE: [a long breath] I'm scared, kid. I'm really scared.

EDDIE: Okay. Okay. Your dad loves you. Tell your mom the ice machine joke. She'll pretend she hates it.

[Click.]` },
    },
    obj: {
      motel_find12: 'Find out about Room 12 (the front desk)',
      motel_key: 'Find the key to Room 12',
      motel_room12: 'Open Room 12',
      motel_leave: 'Leave by the fire exit',
    },
    mono: {
      motel_start: 'A motel. The vacancy sign buzzes. This isn\'t my memory. Whose is it?',
      motel_register: 'Room 12. "E." Eddie.',
      motel_key: 'The key was in a dryer, still warm.',
      motel_room12: 'Room 12. Wires everywhere. A cot. It smells like solder.',
      motel_notebook: '"ONE IN, ONE OUT." ...Eddie.',
      motel_neighbor: 'A man in a bathrobe, far down the hall. His head is bowed. I think he\'s smiling.',
    },
    lines: {
      motel_unlock12: 'Unlock Room 12',
      motel_trust: '"Tell me the truth. I\'ll hear you out."',
      motel_doubt: 'Turn the radio down. Say nothing.',
    },
    radio: {
      motel_start: [
        ['eddie', '...Oh. Oh, this is the Starlite.'],
        ['sam', 'You know it?'],
        ['eddie', 'I met my wife here. She worked nights. Just... just keep moving, okay? Don\'t go in Room 12.'],
        ['sam', 'Why not?'],
        ['eddie', 'Because I asked you not to.'],
      ],
      motel_neighbor: [
        ['eddie', 'Don\'t open the door if he knocks. Don\'t turn your back on him either. Light makes him step away.'],
      ],
      motel_explain: [
        ['eddie', 'Sam. Sam, I know you read it. I can hear the paper.'],
        ['eddie', 'I wrote that before I knew you. Before I knew any of this.'],
        ['eddie', 'I have a daughter I\'ve never seen. That\'s the only thing I\'ve thought about for a year.'],
        ['eddie', 'I\'m not going to lie to you anymore. Just... let me explain. Please.'],
      ],
      motel_trusted: [
        ['eddie', 'The rule is real. One in, one out. Somebody has to stay as the player, or the game breaks everyone inside.'],
        ['eddie', 'I wanted it to be you. I\'m ashamed of that. I don\'t want it to be you anymore.'],
        ['eddie', 'Free the ghosts. All of them. If they all remember their names, maybe there\'s another way. Walt thought there was.'],
      ],
      motel_doubted: [
        ['eddie', '...Yeah. I\'d turn me off too.'],
        ['eddie', 'I\'ll still be here when you want to talk. Fire exit\'s open.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
