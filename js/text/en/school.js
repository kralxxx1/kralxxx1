/* English — Chapter 5: Harlow Middle School (April 16, 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      school: {
        name: 'LEVEL 5', title: 'Harlow Middle School', place: 'Thursday, April 16, 1987, 3:05 PM',
        intro: 'The last day anyone saw all five of them together. The bell has just rung, and it will keep ringing. Somebody is walking the halls with a flashlight, checking for hall passes. You do not have one.',
      },
    },
    items: {
      janitorKeys: { name: "Janitor's key ring", desc: 'Mr. Gus\'s ring: twenty keys, a bottle opener and a tiny plastic hornet. The padlock key is the one with red nail polish on it.' },
    },
    docs: {
      school_intro: { kind: 'note', title: 'On a hall pass clipboard', from: 'Eddie', body:
`School. Their school. It's a Thursday afternoon here and it's been a Thursday afternoon for as long as I've been passing through.

The fire exit at the end of the east hall is chained. The janitor has the keys. The janitor's closet has a combination lock.

Somebody walks these halls with a flashlight. It doesn't see in the dark, only where its light touches. The lockers open. You fit.

—E` },
      school_clue1: { kind: 'wall', title: 'Chalk, in the corner of a classroom board', body:
`REMINDER (Mr. Gus, custodian):
Closet combo changed.
Teachers ask the office.

(and underneath, smaller, in a kid's hand:)
first digit = 3
like 3 lives in pacman
—P.` },
      school_clue2: { kind: 'note', title: 'Detention slip, pink carbon copy', from: 'Harlow Middle School', date: 'April 14, 1987', body:
`STUDENT: Billy — grade 9
OFFENSE: Found inside the custodian's closet during 4th period. Claims he was "doing inventory."
DETENTION: Thursday 4/16, 3:15–4:00 PM

Student comment (required):
"I memorized the code. The middle number is 1. Like me. Number 1."

Teacher comment: This is not a comment about the offense, Billy.` },
      school_clue3: { kind: 'note', title: 'Yearbook, 1986–87, a signature page', from: 'Harlow Hornets Yearbook', date: 'June 1987 (never handed out)', body:
`The page is covered in signatures in five colors.

"HAGS!! — Penny ♪"
"stay weird — Billy #1"
"I'm keeping this page forever. — Ivy"
"sam your the best at pacman after me — Clyde"
"see you at the arcade — Sam"

In the margin, in Clyde's writing, an arrow toward the custodian's door:
"last number = 7. lucky 7. DON'T TELL MR GUS"` },
      school_passnote: { kind: 'note', title: 'A note folded into a tiny triangle', from: 'Penny', date: 'April 16, 1987, 2nd period', body:
`OPERATION 256 — TONIGHT

B has the key (DON'T ask where he got it).
Everyone meet at the arcade 7:00.
Ivy brings the ghost pattern maps.
Clyde brings snacks.
Sam brings the lucky quarter.

We are going to be the first people in the WORLD to see level 256.

(pass this to Ivy, not to Clyde, he will lose it)

P.S. Sam, talk to Clyde. He feels bad about the walkman.` },
      school_plaque: { kind: 'wall', title: 'A brass plaque by the library doors', body:
`IN LOVING MEMORY OF
LILY
1974 – 1983

She drew on everything.
She laughed at everything.
She was our friend.

— The 4th grade, Room 104` },
      school_paper: { kind: 'note', title: 'The Harlow Hornet, school paper', from: 'Harlow Middle School', date: 'April 1987', body:
`RADIO CLUB WANTS YOU!
Do you like music? Do you like talking? Do you want to be on the air?
Penny (grade 9) is starting a radio club. First meeting Tuesday.
"Harlow deserves a real DJ." — Penny

ARCADE HIGH SCORES (from the Starlight)
1. BLY 921,450 2. PNY 887,300 3. IVY 640,120 4. CLY 512,890 5. SAM 498,770

LOST: one walkman, blue, "S" scratched on the back. Kind of broken. Reward: forgiveness.` },
      school_samlocker: { kind: 'note', title: 'Taped to the door of locker 217', from: 'Sam', date: 'April 16, 1987', body:
`Clyde,

It's just a walkman. I don't even care about the walkman. I was mad because you always do stuff first and I always have to catch up.

Sorry I yelled in the cafeteria.

I'll come tonight. I'll bring the lucky quarter.

We're a team.

— Sam

(You wrote this. You never gave it to him. You forgot it here on the last day of school, and you never came back for it.)` },
      school_attendance: { kind: 'note', title: 'Attendance sheet, Room 112', from: 'Homeroom', date: 'Friday, April 17, 1987', body:
`ABSENT:
Billy
Penny
Ivy
Clyde

Office notified 8:20 AM.
Parents notified 8:35 AM.
Police in the building 9:10 AM.

Sam — PRESENT. Came in early. Sat at Clyde's desk. Would not move. Sent to the nurse at 9:30.` },
      school_walt: { kind: 'diary', title: "Walt's journal, in pencil", from: 'W', date: '—', body:
`A school gym. Streamers for a dance that never happened.

I came to this school once, in 1983, to talk to Lily's class. They asked me what a radar does. I said: it finds things that are lost.

They laughed. She didn't. She was already too tired to laugh.

I am so hungry, Lily.` },
      school_tape: { kind: 'tape', title: 'Tape: "Morning announcements"', from: 'Principal\'s office', date: 'April 17, 1987, 8:45 AM', body:
`[Click. PA feedback, a microphone tapped twice.]

PRINCIPAL: Good morning, Harlow Hornets. I... need everyone to listen.

PRINCIPAL: Four of our students did not come home last night. Billy, Penny, Ivy and Clyde.

PRINCIPAL: If you saw them yesterday evening, anywhere, please come to the office. You are not in trouble. Nobody is in trouble.

[A long pause. Somebody in the office is crying.]

PRINCIPAL: ...The spring dance is postponed.

[Click.]` },
    },
    obj: {
      school_code: 'Find the closet combination ({n}/3)',
      school_closet: "Open the custodian's closet",
      school_keys: "Take the janitor's keys",
      school_leave: 'Unchain the fire exit in the east hall',
    },
    mono: {
      school_start: 'Harlow Middle School. The clock above the door says 3:05. It said 3:05 the whole year.',
      school_code: '3... 1... 7. Of course it is.',
      school_keys: "Mr. Gus's keys. He used to let us carry them to the gym. It made us feel important.",
      school_gym: 'The gym. SPRING DANCE \'87. Clyde was going to ask Penny. He practiced on me.',
      school_monitor: 'Someone at the end of the hall with a flashlight. It has no face.',
      hideLocker: 'The vents. Don\'t breathe.',
    },
    lines: {
      school_keypad: 'Custodian closet lock (3 digits)',
      school_unlockExit: 'Unlock the chain with the janitor\'s keys',
    },
    radio: {
      school_start: [
        ['eddie', 'Oh no. School. I hated school.'],
        ['sam', 'It\'s the day. April sixteenth.'],
        ['eddie', '...Yeah. I figured. Listen, the hall monitor only sees what its flashlight sees. Stay out of the beam. Lockers are your friend.'],
      ],
      school_monitor: [
        ['eddie', 'Hall monitor. Get in a locker. Now, Sam, don\'t argue with me, locker!'],
      ],
      school_keys: [
        ['eddie', 'Keys. Good. East hall, the chain on the fire exit.'],
        ['eddie', 'And Sam... that locker. 217. Was that yours?'],
        ['sam', 'Don\'t.'],
        ['eddie', 'Okay. Okay.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
