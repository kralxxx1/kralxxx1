/* English — Level 4: Harlow Mutual (Rosie). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      office: {
        name: 'LEVEL 4', title: 'Harlow Mutual', place: "Rosie's memory — Keystone Building, 3rd floor",
        intro: 'Cubicles, green screens, cold coffee. A phone rings. Then another. Then all of them stop at once.\n\nRosie did her homework here every night while her mother worked late, and talked into a tape recorder so the office would feel less empty.',
      },
    },
    docs: {
      office_lily4: { kind: 'drawing', drawing: 4, title: 'A drawing in a folder marked "LIL — KEEP"', from: 'Lily, age 9', body:
`Crayon. A tall building with lots of windows. In one window a girl with headphones talks into a microphone. Music notes fly out over the whole town.

ROSIE IS GOING TO BE ON THE RADIO.
(ROSIE WALKS ME HOME FROM THE ARCADE SOMETIMES.)
SHE LETS ME PICK THE SONGS.` },
      office_intro: { kind: 'notice', title: 'Sign on the security room door', from: 'Facilities', body:
`SECURITY ROOM
Code changed April 1987 per company policy.
Each department head has been given ONE digit.
Do not write your digit down.

(Four different people have written their digit down somewhere on this floor.)` },
      office_clue1: { kind: 'printout', title: 'A memo left in the printer', from: 'Facilities', date: 'April 2, 1987', clue: 1, body:
`TO: Claims Department
FROM: Facilities

Your digit of the new security code is: 1
It is the FIRST digit.

Please memorize and destroy this memo.

(Nobody destroyed this memo.)` },
      office_clue2: { kind: 'screen', title: 'Terminal: CODE.TXT', from: 'Office terminal', clue: 2, body:
`C:\\> TYPE CODE.TXT

SECURITY ROOM CODE
POSITION 2 = 0
POSITIONS 3 AND 4: ask Carol in Claims.
She knows everything anyway.

C:\\> _` },
      office_clue3: { kind: 'wall', title: 'Break room whiteboard', from: 'Rosie', clue: 3, body:
`ROSIE RADIO
10_.3 FM
THE ONLY STATION THAT PLAYS
WHAT YOU NEED TO HEAR

missing number = my lucky number = 7
(Mom says I can't put my station in the code. Too late!)` },
      office_clue4: { kind: 'phone', title: 'Voicemail, extension 1073', from: 'Carol, Claims', clue: 4, body:
`[Beep.]

CAROL: Rosie, honey, it's Mom. I'm stuck in the claims meeting, it's running late again.

CAROL: If Facilities calls about the code, tell them the last digit is three. Three, like the three of us: you, me and the microwave.

CAROL: Don't eat all the crackers from the machine. I love you. Homework before radio.

[Beep.]` },
      office_carol: { kind: 'note', title: 'Note on the break room fridge', from: "Carol, Rosie's mother", date: 'April 1987', body:
`R —

Meeting runs late again. Dinner is in the freezer, the one with the blue lid. Seven minutes, not ten.

Homework BEFORE radio.

I'm proud of you. I know I don't say it. I'm saying it on the fridge.

—Mom` },
      office_tracklist: { kind: 'card', title: 'A cassette sleeve', from: 'Rosie', date: 'April 1987', body:
`OPERATION 256 — OFFICIAL MIXTAPE

SIDE A: FOR TONIGHT
1. Neon Hearts — The Arcadians
2. Kill Screen Boogie — DJ Lantern
3. Midnight at the Starlight — Rosie (live from the break room)
4. Don't Look Back — Harbor Lights

SIDE B: FOR AFTER
(blank — we record it after we win)` },
      office_rosie_tape: { kind: 'tape', title: 'Tape: "Rosie Radio, live"', from: "Rosie's tape recorder", date: 'April 14 and April 17, 1987', body:
`[Click. Fluorescent hum. A microwave counting down.]

ROSIE: Good evening, Harlow! This is Rosie Radio, one-oh-seven-three, live from the break room of Harlow Mutual, where the coffee is burnt and the future is bright.

ROSIE: [quieter] Sometimes I talk into this thing for an hour and nobody hears it. That's okay. It's nice to pretend somebody's out there.

[The tape hisses and jumps. Now: rain on glass, cabinet music, a fan. The counter reads 12:40.]

ROSIE: [whispering] Rosie Radio, live from the Starlight after hours. Level two-twelve. Danny's on the stick and he's sweating.

[Three knocks on a metal door.]

NELL: Somebody's at the back.

TOBY: [already running] I knew it! I KNEW it!

[A bolt slides. The rain gets loud.]

ROSIE: Well, well, well. Look who came crawling back.

TOBY: [laughing, nearly crying] You came back!

ROSIE: Say hi to Harlow, you big—

[Click. The tape ends there.]` },
      office_walt5: { kind: 'diary', title: "Walt's journal", from: 'Walt', date: 'Inside, day ?', body:
`The violet one is always where I'm about to be. She reads me like a map.

Rosie did that at the cabinet too. She'd stand behind Danny and whisper, "left, left, now wait, now GO." He never admitted he listened.

I went left today. She was already there. She didn't touch me. She just looked at me like she was sorry.` },
      office_eddie_page: { kind: 'note', title: 'A torn page, crumpled', from: 'Eddie', body:
`...one in, one out. So the door wants somebody to stay behind. Somebody who comes through the screen after me. Could be anybody. Could be a kid.

No. Stop it.

You're not that guy, Eddie.` },
      office_board: { kind: 'wall', title: 'Meeting room whiteboard', from: 'Meeting Room B', body:
`CLAIMS REVIEW
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

[The counting stops. Breathing, right up against the receiver.]

...two hundred fifty-

[The line goes dead.]` },
      office_phone3: { kind: 'phone', title: 'A call from 1987', from: 'Maggie Marsh', date: 'April 17, 1987, 7:12 AM', body:
`[Ringing, then a woman trying very hard to sound calm.]

MAGGIE: Hello? Carol? It's Maggie, Toby's mother. I'm sorry to call you at work this early. Is Rosie with you? Toby said he was sleeping over at Sam's, but Sam says Toby never came over...

MAGGIE: Is anyone there?

MAGGIE: ...I left the porch light on for him. I'm just going to leave it on.

[Click.]` },
      office_personnel: { kind: 'screen', title: 'Terminal: PERSONNEL.TXT', from: 'Office terminal', body:
`HARLOW MUTUAL — CLAIMS DEPT.
CAROL A. ..... ADJUSTER ....... OVERTIME Q1: 212 HRS
DENNIS R. .... SUPERVISOR ..... OVERTIME Q1:  12 HRS
MARGE T. ..... CLERK .......... OVERTIME Q1:   0 HRS

VISITOR LOG (AFTER 6 PM):
ROSIE A. (DAUGHTER OF CAROL A.) ... 61 VISITS

C:\\> _` },
    },
    obj: {
      office_code: 'Find the digits of the security code ({n}/4)',
      office_keypad: 'Enter the code on the security room keypad',
      office_card: 'Take the security card',
      office_stairs: 'Use the card on the fire stairs door',
    },
    mono: {
      office_start: 'An office. Green screens. Nobody here, but it feels like everyone just stood up.',
      office_rosieSeen: 'Violet... in front of me. She got there before I did. Her eyes are on where I\'m going.',
      office_code: "That's all four. One, zero, seven, three. Rosie's station.",
      office_cameras: 'The monitors show the floor cameras. I can see them on my map now.',
      office_tape: 'Side B is blank. "For after."',
    },
    lines: {
      office_keypad: 'Enter the code',
      office_card: 'Swipe the card',
      office_cardIdle: 'Card reader (red)',
      office_cardRed: 'The card reader light is red.',
    },
    radio: {
      office_start: [
        ['eddie', 'An office? ...Harlow Mutual. Rosie\'s mom worked here. Rosie did her homework in the break room every night till nine.'],
        ['eddie', 'She used to call the arcade from their phone and do the weather for us. Every single night.'],
      ],
      office_rosie: [
        ['eddie', 'Violet\'s ahead of you! She reads where you\'re going. Double back. Turn around for no reason. I know how it sounds.'],
      ],
      office_tape: [
        ['eddie', 'The mixtape. She made one for that night. Side B was "for after."'],
        ['sam', 'After what?'],
        ['eddie', 'After they won. After they went home.'],
      ],
      office_freed: [
        ['eddie', 'She\'s walking next to you. Not ahead. Next to you.'],
        ['eddie', 'That\'s how she stood behind Danny at the cabinet. Right there, whispering the moves.'],
      ],
      office_page: [
        ['sam', 'Eddie. I found a page. Your handwriting. "One in, one out. Could be a kid."'],
        ['eddie', '...That\'s old. I wrote a lot of dumb things my first week. Forget it.'],
        ['eddie', 'Stairs, Sam. Get to the stairs.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
