/* English — Chapter 10: Maple Street (Sam, the night of April 16, 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      maple: {
        name: 'LEVEL 10', title: 'Maple Street', place: 'Thursday night, April 16, 1987, 9:40 PM',
        intro: 'Your street. Your house, Clyde\'s house two doors down, the streetlight on the corner where you said the worst thing you ever said. It is raining the way it rained that night. Someone keeps calling your name in a voice that is almost his.',
      },
    },
    docs: {
      maple_intro: { kind: 'note', title: 'Under a wet rock on the curb', from: 'Eddie', body:
`This one's yours, isn't it. I can tell because it's the first place in here that isn't falling apart. You remembered every shingle.

Clyde's house first. Then yours. Then the corner. I think the game wants you to stand under that light again.

There's a man on this street who knocks. He talks like somebody you know. It isn't him.

—E` },
      maple_missing: { kind: 'note', title: 'A flyer stapled to a telephone pole, rain-soaked', from: 'Harlow Police Dept.', date: 'April 1987', body:
`MISSING
BILLY, 16 — PENNY, 15 — IVY, 15 — CLYDE, 13

Last seen Thursday, April 16, near the Starlight Arcade, Front Street.

If you have any information call Det. Frank, Harlow P.D.

(Someone has written in marker across the bottom: COME HOME CLYDE)` },
      maple_paper: { kind: 'note', title: 'The Harlow Herald, still in its plastic sleeve on a porch', from: 'The Harlow Herald', date: 'Saturday, April 18, 1987', body:
`FOUR LOCAL CHILDREN MISSING
Search of river, storm tunnels continues

...Arcade owner Walt, 56, told police the four left his establishment "around midnight." Detectives describe him as "cooperative, but not forthcoming."

A fifth child, a close friend of the missing, told reporters he "should have been there."

"He went home," his mother said. "Thank God he went home."` },
      maple_samroom: { kind: 'note', title: 'A spiral notebook on your old bed', from: 'Sam, age 13', date: 'April 16, 1987, 10:15 PM', body:
`I told Clyde to disappear.

I didn't mean it. You don't mean stuff like that.

I'm going to go back. I'll sneak out the window and go back to the arcade and say sorry and play 256 with them.

I'll go in five minutes.

(The next page is blank. You fell asleep. You were thirteen and you fell asleep.)` },
      maple_clyderoom: { kind: 'note', title: 'A note on Clyde\'s pillow, never read', from: 'Clyde, age 13', date: 'April 16, 1987, 6:50 PM', body:
`MOM — I'm sleeping at Sam's. (I'm not, I'm at the arcade, but Sam will cover for me.) (Don't read this part.)

SAM — if you read this first:
I'm sorry about your walkman. I'll buy you a new one with my paper route money. It's already in the jar.
Tonight's gonna be the best night ever.
You're my best friend. Even when you're a jerk. Especially then.
— C.

(A jar on the shelf. Inside: $31.40 in coins and a folded receipt for a blue walkman, layaway, paid in full.)` },
      maple_porch: { kind: 'note', title: 'Taped to Clyde\'s screen door', from: 'Maggie', date: '1987 — 1994', body:
`Clyde —

Porch light stays on until you're home.

Love, Mom

(The tape has been replaced many times. The newest piece is from 1994.)` },
      maple_machine: { kind: 'tape', title: 'Answering machine, the red light blinking', from: "Your family's answering machine", date: 'Friday, April 17, 1987', body:
`[BEEP] 12:52 AM
MAGGIE: Hi, it's Maggie, Clyde's mom. Sorry to call so late. Is Clyde there with Sam? He left a note. Could you... could you have him call me? Thanks.

[BEEP] 1:30 AM
MAGGIE: It's Maggie again. I'm sorry. He's not answering at the... I'm sure he's fine. Please call.

[BEEP] 6:05 AM
MAGGIE: [crying] Please. Please, is he there? Please just tell me he's there.

[BEEP] 9:40 AM
DET. FRANK: This is Detective Frank, Harlow P.D., calling for Sam. We'd like to ask your son a few questions. He's not in any trouble.

[END OF MESSAGES]` },
      maple_walt: { kind: 'diary', title: "Walt's journal, the writing very large and shaky", from: 'W', date: '—', body:
`A street with a porch light.

The boy. The friend. The one who went home. SAM. His name is SAM.

I told the police the children left at midnight. I lied to protect a key I gave to a boy who wanted to help me open on Saturdays.

I let this whole town look at me like a monster rather than say: I trusted them.

I remember his name now. Sam. I remember.` },
      maple_lily7: { kind: 'drawing', drawing: 7, title: 'A drawing tucked in your old desk drawer', from: 'Lily, age 9', body:
`Crayon. Two boys on a curb under a streetlight, sharing a comic book. A girl with pigtails is drawn on the other side of the street, waving.

FOR SAM.
THANK YOU FOR THE GOOD SWING.
YOU AND CLYDE ARE THE BEST FRIENDS I EVER SAW.` },
    },
    obj: {
      maple_clyde: "Go into Clyde's house",
      maple_home: 'Go home',
      maple_corner: 'Stand under the streetlight on the corner',
      maple_leave: 'Go down the alley behind the arcade',
    },
    mono: {
      maple_start: 'Maple Street. It\'s raining. It was raining that night too. I had forgotten that.',
      maple_porch: 'His porch light is on. It\'s been on for seven years.',
      maple_clyderoom: 'A jar of coins and a receipt. He paid for it. He already paid for it.',
      maple_machine: 'Mom never played me those. I never asked.',
      maple_neighbor: 'A tall man at the end of a driveway. He\'s standing the way Clyde used to stand when he was scared.',
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
        ['clyde', 'Sam, wait! Just wait, okay? I said I\'m sorry about the walkman!'],
        ['sam', 'It\'s not about the stupid walkman!'],
        ['clyde', 'Then what? You\'re gonna miss 256! We\'ve been planning it for a month!'],
        ['sam', 'You always get to do everything first. You don\'t even need me there.'],
        ['clyde', 'That\'s not true! Sam! Stay. Please. I don\'t want to go without you.'],
        ['sam', 'Fine. Disappear then.'],
        ['clyde', '...'],
      ],
      maple_reconcile: [
        ['clyde', '(The orange light settles on the curb beside you, very small.) ...I thought you hated me.'],
        ['sam', 'I didn\'t. I never did. I fell asleep, Clyde. I was coming back and I fell asleep.'],
        ['clyde', 'You went home. That\'s what you were supposed to do. That\'s rule four, dummy.'],
        ['clyde', 'Nobody goes home alone. So you went home. And I didn\'t have to be alone, because I had you to go home to.'],
        ['sam', 'That doesn\'t make sense.'],
        ['clyde', 'It makes sense to me. (He bumps your shoulder, the way he used to.) Come on. We\'re not done.'],
      ],
      maple_alone: [
        ['sam', 'I\'m sorry. I\'m sorry. I\'m sorry.'],
        ['eddie', '...Sam. He\'s still in here somewhere. Orange light, in the dark. You can still tell him.'],
      ],
      maple_neighbor: [
        ['eddie', 'Whatever it says, it isn\'t Clyde. Clyde\'s voice doesn\'t come from a man that tall.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
