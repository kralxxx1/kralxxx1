/* English — Prologue: Starlight Arcade, November 30, 1994. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      prolog: {
        name: 'PROLOGUE', title: 'Starlight Arcade', place: 'Harlow — November 30, 1994, 2:11 AM',
        intro: 'The bank wants the machines out by six. The movers left the key under the mat. You came four hours early and alone, and you did not tell anyone why.',
      },
    },
    docs: {
      p_workorder: { kind: 'printout', title: 'Tri-County Movers work order', from: 'Tri-County Movers', date: 'Work order #4471', body:
`PICKUP: Starlight Arcade, 114 Front St., Harlow
DATE: Thu, December 1, 1994 — 06:00
CONTENTS: 23 coin-op cabinets, 1 prize counter, misc. fixtures
ACCESS: keys under the mat (First Harlow Savings)
CREW: 3
NOTE: Buyer wants cabinet #7 handled separately. Do not plug in.

Handwritten at the bottom, in your own writing:
Going in early. Need to see #7 before they take it. —S` },
      p_notice: { kind: 'notice', title: 'Notice taped to the front glass', from: 'First Harlow Savings', date: 'October 21, 1994', body:
`NOTICE OF SEIZURE

By order of First Harlow Savings & Loan, this property and all of its contents have been seized for non-payment.

The contents will be sold at PUBLIC AUCTION on Saturday, December 3, 1994 at 10 AM.

The owner of record has not responded to any correspondence since March 1992.

Someone has written underneath in marker: HE'S STILL IN THERE` },
      p_sticky: { kind: 'note', title: 'Yellow note on cabinet #7', from: 'W.', body:
`DON'T PULL THE PLUG.

Not for any reason. Not even if you hear them. Especially if you hear them.

(If you're from the bank: it isn't plugged in anyway. Look.)` },
      p_repair: { kind: 'card', title: 'Service tag on the coin door of #7', from: 'Eddie', date: 'November 1986', body:
`SERVICE TAG — UNIT #7
Board: KERNEL rev C (custom, do not replace)
Power supply: modified, see notebook

DO NOT power without ground.
DO NOT let Walt "just try one more thing" after midnight.

—Eddie` },
      p_ledger: { kind: 'diary', title: "Walt's electricity ledger", from: 'Walt', date: '1987–1992', body:
`Apr 1987 — Electric: $212. Double the usual. #7 draws more than the rest of the floor together.

Oct 1989 — Electric: $1,940. Told the landlord the freezer is broken.

Jan 1991 — Unplugged #7 for a whole week to see. The meter kept turning. It was never plugged into the wall. It's plugged into something else.

Mar 2, 1992 — Paid everything through June. Left the rest in the envelope for Nora.
Nora, I'm sorry.` },
      p_hiscore: { kind: 'wall', title: 'High score table', from: 'Starlight Arcade', body:
`HIGH SCORES — CABINET #7
1  BLY  921,450
2  PNY  887,300
3  IVY  640,120
4  CLY  512,890
5  SAM  498,770
6  LIL    3,190

A brass plate under the glass:
The names on this table will never be erased. Promise. —Walt` },
      p_photo: { kind: 'photo', photo: 'five', title: 'Photo pinned over the office desk', from: 'Written on the back in pencil', date: 'April 11, 1987', body:
`Starlight regulars, in front of #7.
Back: Billy (holding up one finger), Penny, Ivy.
Front: Clyde (eyes closed, as always) and Sam.

Everyone is laughing except Sam.

Underneath, in newer pencil:
Five days before. I should have locked the door. —W` },
      p_birthday: { kind: 'card', title: 'Birthday card in the desk drawer', from: 'B, P, I, C and S', date: 'August 1986', body:
`HAPPY 55TH, WALT!!!

From your number one customers.
Billy says you owe him 40 tokens.
Penny says Billy owes YOU 40 tokens.
Ivy drew the cake. (It's a Pacman cake. Obviously.)
Clyde wants to know if old people can still play Galaxian.
Sam says thanks for fixing the bike.

See you tomorrow. And the day after. And the day after that.` },
      p_nora: { kind: 'letter', title: 'An unopened letter', from: "Nora (Walt's sister)", date: 'Postmarked March 3, 1992', body:
`Walt,

I've called a hundred times. The phone just rings. The bank says the power is still on, so I know you're there.

Five years, Walt. The families don't blame you anymore. The police don't. Only you do.

Mom's grave needs flowers. I'm not doing it alone again this year.

Come home. Sell the machine, break it, do whatever you want with it. But stop staring at that screen.

Lily wouldn't want you in the dark.

—Nora

(The letter arrived the day after he disappeared. Nobody ever opened it.)` },
      p_frank: { kind: 'card', title: "A detective's business card", from: 'Frank, Harlow Police Department', date: 'May 2, 1987', body:
`On the back, in ballpoint:

Walt —
You told me the kids left at midnight.
The lady across the street saw your back lights on at three.
Call me before I have to come back with a warrant.
—Frank` },
      p_mirror: { kind: 'wall', title: 'Written on the restroom mirror in lipstick', body:
`IT'S NOT A GAME
IT'S A PLACE

—P. 4/16` },
      p_lily1: { kind: 'drawing', drawing: 1, title: "Lily's drawing on the office fridge", from: 'Lily, age 8', body:
`Crayon on paper. A yellow circle with legs, standing in front of a lot of colored boxes.

MY DADDY WORKS AT THE STARLITE.
ON SATERDAYS HE IS CHOMPY.
HE IS THE BEST CHOMPY IN THE WORLD.
—LILY` },
      p_tape: { kind: 'tape', title: 'Tape: "If you\'re hearing this"', from: 'Walt', date: 'March 3, 1992, 11:48 PM', body:
`[Click. Rain against glass. A chair creaks.]

WALT: If you're hearing this, I'm inside. Don't call Frank. Don't call Nora. Just listen.

WALT: They're in there. Billy, Penny, Ivy and Clyde. I've watched them for five years. Four ghosts that were never on that board before April sixteenth.

WALT: The gold token in my desk. The one stamped 0256. The machine takes it as a CONTINUE. That's how they got in. That's how I'm going in.

WALT: Don't unplug it. If it goes dark from out here, they go dark with it. I don't know that for sure. I'm not going to find out.

[Long pause.]

WALT: I'm going to bring them home. And if I can't... at least they won't be alone in there.

WALT: Lily, if you're... [He stops.] No. Never mind. Tape's running out.

[Click.]` },
    },
    obj: {
      p_flash: 'Find a flashlight (behind the prize counter)',
      p_power: 'Throw the main breaker in the storage room',
      p_key: "Find a key to Walt's office",
      p_office: "Get into Walt's office",
      p_token: "Search Walt's office",
      p_insert: 'Put the token into cabinet #7',
    },
    mono: {
      prolog_start: 'No power. And my flashlight is in the truck... There should be one behind the prize counter.',
      prolog_flash: 'Half a battery. Better not waste it.',
      prolog_power: 'The lights... and the machines. All of them at once.',
      prolog_register: 'The register still works. There is a key in the drawer. OFFICE.',
      prolog_token: 'A gold token. 0256 stamped on it. Heavy. Way heavier than a normal token.',
      prolog_cabinet: 'PLAYER 1 READY. Level counter: 255. It is not plugged in. The cord is lying on the floor.',
      prolog_seven: 'Number seven. Clyde always said it smelled like burnt toast. It still does.',
      prolog_hiscore: 'Fifth place. SAM. I forgot I was ever that good.',
      prolog_outside: '...Was someone standing outside the glass?',
      prolog_insert: 'The right half of the screen fills with letters. The screen... is getting bigger.',
      prolog_office: "Walt's office. It smells like coffee and solder. Like 1987.",
    },
    lines: {
      prolog_registerDead: 'The register has no power. The drawer is locked.',
      prolog_flashHint: 'Press F to switch the flashlight on and off.',
      prolog_breaker: 'Throw the main breaker',
      prolog_register: 'Open the register',
      prolog_registerIdle: 'Cash register',
      prolog_insertTok: 'Insert the gold token',
      prolog_inspect: 'Look at cabinet #7',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
