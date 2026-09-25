/* English — Chapter 5: Insurance Office (Penny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      office: {
        name: 'LEVEL 4', title: 'Harlow Mutual', place: "Penny's break room",
        intro: 'Cubicles, tube monitors, cold coffee. A phone rings. Then another. Then all of them stop at once.',
      },
    },
    docs: {
      office_lily4: { kind: 'drawing', drawing: 4, title: 'A drawing in a file folder marked "LIL — KEEP"', from: 'Lily, age 9', body:
`Crayon. A tall building with many windows. In one window, a girl with a headset is talking into a microphone. Music notes fly out of the window over the whole town.

PENNY IS GOING TO BE ON THE RADIO.
(PENNY IS MY BABYSITTER SOMETIMES.)
SHE LETS ME PICK THE SONGS.` },
      office_intro: { kind: 'notice', title: 'Sign on the security room door', from: 'Facilities', body:
`SECURITY ROOM
Code changed April 1987 per company policy.
Each department head has been given ONE digit.
Do not write your digit down.

(Four different people have written their digit down somewhere on this floor.)` },
      office_clue1: { kind: 'printout', title: 'A memo from the printer', from: 'Facilities', date: 'April 2, 1987', clue: 1, body:
`TO: Claims Department
FROM: Facilities

Your digit of the new security code is: 1
It is the FIRST digit.

Please memorize and destroy this memo.

(Nobody destroyed this memo.)` },
      office_clue2: { kind: 'screen', title: 'Terminal: CODE.TXT', from: 'IBM PC/XT', clue: 2, body:
`C:\\> TYPE CODE.TXT

SECURITY ROOM CODE
POSITION 2 = 0
POSITIONS 3 AND 4: ask Carol in Claims.
She knows everything anyway.

C:\\> _` },
      office_clue3: { kind: 'wall', title: 'Break room whiteboard', from: 'Penny', clue: 3, body:
`PENNY RADIO
10_.3 FM
THE ONLY STATION THAT PLAYS
WHAT YOU NEED TO HEAR

missing number = my lucky number = 7
(Mom says I can't put the station in the code. Too late!)` },
      office_clue4: { kind: 'phone', title: 'Voicemail, extension 1073', from: 'Carol (Claims)', clue: 4, body:
`[Beep.]

CAROL: Penny, honey, it's Mom. I'm stuck in the Q2 claims meeting, it's going late again.

CAROL: If Facilities calls about the code, tell them the last digit is three. Three like the three of us, you, me and the microwave.

CAROL: Don't eat all the crackers from the vending machine. I love you. Homework before radio.

[Beep.]` },
      office_carol: { kind: 'note', title: 'Note on the break room fridge', from: "Carol (Penny's mom)", date: 'April 1987', body:
`P —

Meeting runs late again. Dinner is in the freezer, the one with the blue lid. Seven minutes, not ten.

Homework BEFORE radio.

I'm proud of you. I know I don't say it. I'm saying it on the fridge.

—Mom` },
      office_tracklist: { kind: 'card', title: 'A cassette J-card', from: 'Penny', date: 'April 1987', body:
`OPERATION 256 — OFFICIAL MIXTAPE

SIDE A: FOR TONIGHT
1. Neon Hearts — The Arcadians
2. Kill Screen Boogie — DJ Pellet
3. Midnight at the Starlight — Penny (live, from the break room)
4. Don't Look Back — Harbor Lights

SIDE B: FOR AFTER
(blank — we'll record it after we win)` },
      office_penny_tape: { kind: 'tape', title: 'Tape: "Penny Radio, live"', from: 'Penny', date: 'April 14, 1987', body:
`[Click. A fluorescent hum. A microwave counting down.]

PENNY: Good evening, Harlow! You're listening to Penny Radio, one-oh-seven-point-three, broadcasting live from the break room of Harlow Mutual Insurance, where the coffee is burnt and the future is bright.

PENNY: Tonight's weather: dark. Tomorrow's weather: also dark, because Mom's meeting is running late again.

[The microwave beeps.]

PENNY: [quieter] Sometimes I talk into this thing for an hour and nobody hears it. That's okay. It's nice to pretend somebody's out there.

PENNY: If you are out there... Thursday we're going to beat the kill screen. Stay tuned.

[Click.]` },
      office_walt5: { kind: 'diary', title: "Walt's journal", from: 'Walt', date: 'Inside, day ?', body:
`The pink one is always where I'm going to be. She reads me like a map.

Penny did that at the cabinet too. She'd stand behind Billy and whisper: "left, left, now wait, now GO." He never admitted he listened.

I went left today. She was already there. She didn't touch me. She just looked at me like she was sorry.` },
      office_eddie_page: { kind: 'note', title: 'A torn page, crumpled', from: 'Eddie', body:
`...if Walt is the player now, then when he's gone the game needs another one. Could be anybody who comes through the screen. Could be the kid.

No. Stop it.

You're not that guy, Eddie.` },
      office_board: { kind: 'wall', title: 'Meeting room whiteboard', from: 'Meeting Room B', body:
`Q2 CLAIMS REVIEW
- backlog: 212 files
- overtime: approved (again)
- Friday: potluck

Across all of it, in a different marker:
WHERE DID EVERYONE GO` },
      office_phone2: { kind: 'phone', title: 'Phone line 0256', from: 'Unknown line', body:
`[Static. Then a flat, childlike voice, counting slowly.]

...two hundred fifty-three...
...two hundred fifty-four...
...two hundred fifty-five...

[The counting stops. Breathing. It is right next to the receiver.]

...two hundred fifty-

[The line goes dead.]` },
      office_phone3: { kind: 'phone', title: 'A call from 1987', from: 'Maggie', date: 'April 17, 1987, 7:12 AM', body:
`[Ringing, then a woman's voice, trying very hard to be calm.]

MAGGIE: Hello? This is Maggie, Clyde's mother. I'm sorry to call so early. Is Penny there? Clyde said he was sleeping over at Sam's, but Sam's mother says...

MAGGIE: Is anyone there?

MAGGIE: ...I left the porch light on for him. I'm just going to leave it on.

[Click.]` },
      office_personnel: { kind: 'screen', title: 'Terminal: PERSONNEL.TXT', from: 'IBM PC/XT', body:
`HARLOW MUTUAL — CLAIMS DEPT.
CAROL ........ ADJUSTER ....... OT Q1: 212 HRS
DENNIS ....... SUPERVISOR ..... OT Q1:  12 HRS
MARGE ........ CLERK .......... OT Q1:   0 HRS

VISITOR LOG (AFTER 6 PM):
PENNY (DAUGHTER, CAROL) ....... 61 VISITS

C:\\> _` },
    },
    obj: {
      office_code: 'Find the digits of the security code ({n}/4)',
      office_keypad: 'Enter the code on the security room keypad',
      office_card: 'Take the security card',
      office_stairs: 'Use the card on the fire stairs door',
    },
    mono: {
      office_start: 'An office. Tube monitors. Nobody here, but it feels like everyone just stood up.',
      office_pinkSeen: 'Pink... in front of me. She was there before I got there.',
      office_code: "That's all four. One, zero, seven, three. Penny's station.",
      office_cameras: 'The monitors show the floor cameras. I can see them on my map now.',
      office_tape: 'Side B is blank.',
    },
    lines: {
      office_keypad: 'Enter the code',
      office_card: 'Swipe the card',
      office_cardIdle: 'Card reader (red)',
      office_cardRed: 'The card reader light is red.',
    },
    radio: {
      office_start: [
        ['eddie', 'An office? ...Harlow Mutual. Penny\'s mom worked here. Penny did her homework in the break room every night until nine.'],
        ['eddie', 'She used to call the arcade from their phone and do the weather for us. Every single night.'],
      ],
      office_pink: [
        ['eddie', 'Pink is ahead of you! She reads where you\'re going. Walk backwards if you have to, I know how it sounds.'],
      ],
      office_tape: [
        ['eddie', 'The mixtape. She made one for that night. Side B was going to be "for after."'],
        ['sam', 'After what?'],
        ['eddie', 'After they won. After they came home.'],
      ],
      office_freed: [
        ['eddie', 'She\'s walking next to you. Not in front. Next to you.'],
        ['eddie', 'That\'s how she stood behind Billy at the cabinet. Right there, whispering the moves.'],
      ],
      office_page: [
        ['sam', 'Eddie. I found a page. Your handwriting. "Could be the kid."'],
        ['eddie', '...That\'s old. I wrote a lot of dumb things my first week. Forget it.'],
        ['eddie', 'Stairs, Sam. Get to the stairs.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
