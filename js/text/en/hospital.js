/* English — Chapter 9: St. Agnes Hospital (Walt, October 1983). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      hospital: {
        name: 'LEVEL 9', title: 'St. Agnes Hospital', place: 'Pediatric ward, October 1983',
        intro: 'Walt\'s worst month, kept perfectly. Green walls, soft shoes, the smell of floor wax and oranges. Somewhere on this floor is Room 207. Somewhere on this floor something tall is counting the seconds you look away.',
      },
    },
    items: {
      page: { name: "Walt's diary page", desc: 'Torn out along the stitching. His handwriting gets smaller every page.' },
      page1: { name: "Walt's diary page" }, page2: { name: "Walt's diary page" }, page3: { name: "Walt's diary page" }, page4: { name: "Walt's diary page" }, page5: { name: "Walt's diary page" },
      room207Key: { name: 'Key to Room 207', desc: 'A ward key on a cardboard tag, written in a nurse\'s neat hand: 207 — LILY. A sticker of a sun on the back.' },
    },
    docs: {
      hospital_intro: { kind: 'note', title: 'Clipped to a wheelchair', from: 'Eddie', body:
`This is Walt's. I can tell. Everything is too clean.

Five pages of his diary are scattered around the ward. I think he tore them out himself so he wouldn't have to read them.

Room 207 is locked. The nurses' station has keys. Don't go in until you've read the pages. I don't know why. It feels like that's the rule.

The Counter is here. Don't turn your back on it.

—E` },
      hospital_diary1: { kind: 'diary', title: "Walt's diary — page 1", from: 'Walt', date: 'October 2, 1983', body:
`They moved her to 207. It has a window. She wanted a window so she can see if it's raining.

Dr. said weeks. I said months. He didn't argue with me, which is how I know.

She asked if the arcade misses her. I said the machines ask about her every morning. She said "Daddy, machines can't talk." I said: these ones can.` },
      hospital_diary2: { kind: 'diary', title: "Walt's diary — page 2", from: 'Walt', date: 'October 9, 1983', body:
`Ruth doesn't come in anymore. She sits in the car. I don't blame her. Some people can only love in a straight line and this isn't a straight line.

Lily drew me today. A big man with a mustache and a very small arcade on his head like a hat.

I brought a little cabinet up in the elevator. She got 3,190 points. I tried to let her win the second game. She knew. She said "don't let me win, it doesn't count." So I didn't. She still won.` },
      hospital_diary3: { kind: 'diary', title: "Walt's diary — page 3", from: 'Walt', date: 'October 14, 1983', body:
`Her birthday. Nine.

I wore the Chompy suit up the stairs because it wouldn't fit in the elevator. The nurses laughed so hard one of them had to sit down. The whole ward came out in their gowns.

Lily laughed until she coughed, and then she laughed again.

She made me promise: her score stays on the high score table forever. LIL, 3,190.

The names on the table will never be erased. I promised.` },
      hospital_diary4: { kind: 'diary', title: "Walt's diary — page 4", from: 'Walt', date: 'October 21, 1983', body:
`She sleeps most of the day.

When she's awake she draws. Eight drawings on the wall now. The arcade. Chompy. The mall. A cave with boys in it (she says the boys in her class have a secret cave and she isn't allowed). Me.

She asked: "When I'm gone, who will play my game?"

I didn't have an answer. I work with machines. I should have had an answer.` },
      hospital_diary5: { kind: 'diary', title: "Walt's diary — page 5", from: 'Walt', date: 'October 29, 1983', body:
`5:40 AM. It was raining. She would have liked that.

...

I am going to build a machine that remembers everything. I am going to build a game where nobody is ever gone.

I know how that sounds.

I'm writing it down anyway, so that someday, when I've done something terrible, someone can read this and know I did it for love. It won't be enough. I know it won't be enough.` },
      hospital_nurse: { kind: 'note', title: "Nurse's notes, the night shift clipboard", from: 'Nurse Carol', date: 'October 1983', body:
`207 — Lily, 9. Comfortable. Asked for more crayons (yellow). Father present, as always. Father slept in the chair, as always.

Please somebody talk to him about going home to shower. He says "she'll wake up and I'll be gone." We have stopped arguing.

Birthday party on the 14th — father will be in costume. God help us. (It was the best day this ward has had all year.)` },
      hospital_ruth: { kind: 'letter', title: 'A letter left in the chapel', from: 'Ruth', date: 'November 1983', body:
`Walt,

I couldn't go in. You could. That's the difference between us, and it's why I have to leave.

I can't live in a house where you're building her again out of wires. I heard you in the garage at night talking to the machines.

Please don't let this eat you.

I'm sorry. I'll always be sorry.
— Ruth` },
      hospital_visitors: { kind: 'note', title: 'Visitor log, pediatric ward', from: 'St. Agnes', date: 'October 1983', body:
`207 — Walt (father) ........ 10/1, 10/2, 10/3, 10/4, 10/5, 10/6, 10/7, 10/8, 10/9, 10/10, 10/11, 10/12, 10/13 ...
207 — Ruth (mother) ........ 10/1, 10/3
207 — Nora (aunt) ........... 10/8, 10/14, 10/22
207 — Room 104 class ....... 10/14 (card delivered)
207 — Eddie?? ................. (crossed out — "not family, sorry")` },
      hospital_card: { kind: 'note', title: 'A giant get-well card made of construction paper', from: '4th grade, Room 104', date: 'October 1983', body:
`GET WELL SOON LILY!!!

We miss you in art class. Mrs. K says the crayons are lonely.

— Sam (I saved you the good swing)
— Clyde (I drew you a dragon on the back) (it's a dog)
— and 22 other names in careful capital letters

(You remember writing this. You remember not knowing that it wouldn't work.)` },
      hospital_chompy: { kind: 'photo', photo: 'chompy', title: 'A Polaroid taped above the bed', from: 'Nurse Carol', date: 'October 14, 1983', body:
`A man in a huge yellow round costume, the face a big painted smile, kneeling beside a hospital bed. A very small girl in a party hat is hugging the costume's head with both arms.

On the white strip: "LIL & CHOMPY — 9 TODAY!"` },
      hospital_chart: { kind: 'note', title: 'The chart at the foot of the bed', from: 'St. Agnes', date: 'October 29, 1983', body:
`PATIENT: Lily, 9
DX: Acute lymphoblastic leukemia

10/29 05:40 — Time of death.
Father present.
Raining.

(Someone has added, very small, in pencil: "3,190")` },
      hospital_lily6: { kind: 'drawing', drawing: 6, title: 'A drawing still taped up beside the window of 207', from: 'Lily, age 9', body:
`Crayon. A window with rain drawn as blue lines. Outside the window, a yellow circle with legs is waving. Inside, a girl in a bed waves back.

CHOMPY CAME TO MY BIRTHDAY.
IT WAS DADDY.
I KNEW BUT I DIDN'T SAY.` },
      hospital_tape: { kind: 'tape', title: 'Tape: "Story time"', from: "Walt's tape recorder", date: 'October 1983', body:
`[Click. A hospital room. A monitor beeping softly. Rain on a window.]

WALT: ...and the little yellow guy said: I'm not eating the ghosts. They're my friends. I'm just eating the dots.

LILY: [sleepy] That's not how the game goes, Daddy.

WALT: It's how my version goes.

LILY: Do the ghosts get to go home at the end?

WALT: Everybody goes home at the end.

LILY: Promise?

WALT: [a pause too long] ...I promise, bug.

[Click.]` },
    },
    obj: {
      hospital_pages: "Find the pages of Walt's diary ({n}/5)",
      hospital_207: 'Get the key and go into Room 207',
      hospital_leave: 'Take the elevator down',
    },
    mono: {
      hospital_start: 'A hospital. Green walls. I came here once with a card. I was nine.',
      hospital_key: 'Room 207. The tag is written in a nurse\'s neat hand.',
      hospital_207: 'Eight nails on the wall where drawings used to hang. One is still here. It\'s raining outside the window. It\'s always raining here.',
    },
    lines: {
      hospital_unlock207: 'Unlock Room 207',
      hospital_notYet: 'Your hand stops on the key. Not yet. Read what he wrote first.',
    },
    radio: {
      hospital_start: [
        ['eddie', 'Walt used to talk about her. Just once, in \'86. We were soldering at two in the morning and he said her name and then he didn\'t say anything for an hour.'],
        ['eddie', 'Be gentle in here, Sam. I don\'t know what else to say.'],
      ],
      hospital_pages: [
        ['eddie', '...He built all of this for her. The Kernel. The game. All of it.'],
        ['sam', 'He built a place where nobody\'s ever gone.'],
        ['eddie', 'And then it took four kids. Go to 207. I think he needs you to.'],
      ],
      hospital_207: [
        ['eddie', 'Sam? Something changed. The hum... it sounds different. Like somebody remembered something.'],
        ['eddie', 'Wherever the Eater is right now, I think it just stopped chewing.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
