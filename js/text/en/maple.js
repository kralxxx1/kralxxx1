/* English — Level 10: Maple Street (Sam, the night of April 16–17, 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      maple: {
        name: 'LEVEL 10', title: 'Maple Street', place: 'Your memory — the night of April 16, 1987',
        intro: 'Your street. Your house, Toby\'s house two doors down, and the streetlight on the corner where you said the worst thing you ever said.\n\nIt is raining the way it rained that night. Somebody keeps calling your name in a voice that is almost his.',
      },
    },
    docs: {
      maple_intro: { kind: 'note', title: 'Under a wet rock on the curb', from: 'Eddie', body:
`This one's yours, isn't it. I can tell because it's the first place in here that isn't falling apart. You remembered every shingle.

Toby's house first. Then yours. Then the corner. I think the game wants you to stand under that light again.

There's a man on this street who knocks. He talks like somebody you know. It isn't him.

—E.` },
      maple_missing: { kind: 'note', title: 'A flyer stapled to a telephone pole, soaked', from: 'Harlow Police Department', date: 'April 1987', body:
`MISSING
DANNY KOWALSKI, 16 — ROSIE ALVAREZ, 15 — NELL PARK, 15 — TOBY MARSH, 13

Last seen Thursday, April 16, near the Starlight Arcade, Front Street.

Anyone with information please call Det. Frank Dobbs, Harlow P.D.

(Across the bottom, in marker: COME HOME TOBY)` },
      maple_paper: { kind: 'note', title: 'The Harlow Herald, still in its plastic sleeve on a porch', from: 'The Harlow Herald', date: 'Saturday, April 18, 1987', body:
`FOUR LOCAL CHILDREN MISSING
Search of river and storm tunnels continues

...Arcade owner Walter Brenner, 56, told police the four left his business "around midnight." Detectives describe him as "cooperative, but not forthcoming."

A fifth child, a close friend of the missing, told reporters: "I should have been there."

"Sam went home," the child's mother said. "Thank God Sam went home."` },
      maple_samroom: { kind: 'memory', title: 'Your room', from: 'Sam', date: 'April 17, 1987, 3:40 AM', body:
`The window is open a few inches. Rain has soaked the carpet under it.

Under the sill: your sneakers, soaked through, mud up to the laces.

On the bed, your pajamas, still folded. The bed was never slept in.

The clock radio says 3:40.

On the desk, a notebook. Your handwriting from that night, pressed so hard it tore the paper:

I WENT HOME AT 9:40
I WENT HOME AT 9:40
I WENT HOME AT 9:40` },
      maple_tobyroom: { kind: 'note', title: "A note on Toby's pillow, never read", from: 'Toby, age 13', date: 'April 16, 1987, 6:50 PM', body:
`MOM — I'm sleeping at Sam's. (I'm not, I'm at the arcade, but Sam will cover for me.) (Don't read this part.)

SAM — if you read this first:
I'm sorry about your walkman. I'm buying you a new one with my paper route money. It's already in the jar.
Tonight's gonna be the best night ever.
You're my best friend. Even when you're a jerk. Especially then.
— T.

(A jar on the shelf. Inside: $31.40 in coins and a folded layaway receipt for a blue walkman, paid in full.)` },
      maple_porch: { kind: 'note', title: "Taped to Toby's screen door", from: 'Maggie', date: '1987 — 1994', body:
`Toby —

The porch light stays on until you're home.

Love, Mom

(The tape has been replaced many times. The newest piece is from 1994.)` },
      maple_machine: { kind: 'tape', title: 'The answering machine, red light blinking', from: "Your family's answering machine", date: 'April 17, 1987', body:
`[BEEP] 12:10 AM
ANN: Sam, it's Mom, on my break. Pick up, sweetie. ...Sam? You're probably asleep. Okay. Love you. Lock the door.

[BEEP] 12:52 AM
MAGGIE: Hi, it's Maggie, Toby's mom. Sorry to call so late. Is Toby there with Sam? He left a note. Could you... could somebody call me? Thanks.

[BEEP] 2:50 AM
ANN: Sam? Pick up. Maggie called the exchange looking for me. Toby isn't with you? Sam, pick up the phone. ...Sam?

[BEEP] 6:05 AM
MAGGIE: [crying] Please. Please, is he there? Just tell me he's there.

[BEEP] 9:40 AM
DET. DOBBS: This is Detective Frank Dobbs, Harlow P.D. We'd like to ask Sam a few questions. Nobody is in any trouble.

[END OF MESSAGES]` },
      maple_walt: { kind: 'diary', title: "Walt's journal, the writing huge and shaky", from: 'Walt', date: 'Inside', body:
`A street with a porch light.

The friend. The one who went home. SAM. The name is SAM.

I told the police the children left at midnight. I lied to protect a key I gave a boy who wanted to help me open on Saturdays.

I let this whole town look at me like a monster rather than say: I trusted them.

I remember the name now. Sam. I remember.

The score. 1:52 in the morning. The clock was never wrong.` },
      maple_lily7: { kind: 'drawing', drawing: 7, title: 'A drawing tucked in your old desk drawer', from: 'Lily, age 9', body:
`Crayon. Two kids on a curb under a streetlight, sharing a comic book. A girl with braids on the other side of the street, waving.

FOR SAM.
THANK YOU FOR THE GOOD SWING.
YOU AND TOBY ARE THE BEST FRIENDS I EVER SAW.` },
    },
    obj: {
      maple_toby: "Go into Toby's house",
      maple_home: 'Go home',
      maple_corner: 'Stand under the streetlight on the corner',
      maple_leave: 'Go down the alley behind the arcade',
    },
    mono: {
      maple_start: 'Maple Street. It\'s raining. It was raining that night too. I\'d forgotten that.',
      maple_porch: 'His porch light is on. It\'s been on for seven years.',
      maple_tobyroom: 'A jar of coins and a receipt. He paid for it. He\'d already paid for it.',
      maple_machine: '2:50 in the morning. "Sam, pick up." I didn\'t pick up. I was asleep. ...Wasn\'t I?',
      maple_neighbor: 'A tall man at the end of a driveway. He\'s standing the way Toby stood when he was scared.',
    },
    lines: {
      maple_machine: 'Play the messages',
    },
    radio: {
      maple_start: [
        ['eddie', 'Sam? Your breathing\'s different. Where are you?'],
        ['sam', 'Home.'],
        ['eddie', '...Take your time. I\'m not going anywhere. Obviously.'],
      ],
      maple_echo: [
        ['toby', 'Sam, wait! Just wait, okay? I said I\'m sorry about the walkman!'],
        ['sam', 'It\'s not about the stupid walkman!'],
        ['toby', 'Then what? You\'re gonna miss 256! We planned it for a month!'],
        ['sam', 'You always get to do everything first. You don\'t even need me there.'],
        ['toby', 'That\'s not true! Sam! Stay. Please. I don\'t want to go without you.'],
        ['sam', 'Fine. Disappear then.'],
        ['toby', '...'],
        ['radio', '[The streetlight stutters. The rain gets louder. The same corner, later. Much later.]'],
        ['sam', '(Thirteen. Running. Sobbing for breath.) I let go... I let go I let go I let go...'],
        ['sam', '...That\'s me. 3:20 in the morning. That\'s me, running home.'],
        ['sam', 'I didn\'t go home. I didn\'t go home at 9:40.'],
      ],
      maple_reconcile: [
        ['toby', '(The amber light settles on the curb beside you, very small.) ...You remember now.'],
        ['sam', 'I came back. You opened the door. You were so happy.'],
        ['toby', 'Sam always comes back. I wrote it down.'],
        ['sam', 'And then I ran.'],
        ['toby', '...Yeah. You did. (He bumps your shoulder, the way he used to.) I\'m not mad. I was scared too. If I could have let go, maybe I would have.'],
        ['toby', 'The rest is in Walt\'s basement. On a tape. You have to hear all of it, Sam. Come on. We\'re not done.'],
      ],
      maple_alone: [
        ['sam', 'I\'m sorry. I\'m sorry. I\'m sorry.'],
        ['eddie', '...Sam. He\'s still in here somewhere. Amber light, in the dark. You can still tell him.'],
      ],
      maple_neighbor: [
        ['eddie', 'Whatever it says, it isn\'t Toby. Toby\'s voice doesn\'t come out of a man that tall.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
