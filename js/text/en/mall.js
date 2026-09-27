/* English — Level 7: Harlow Mall (December 13, 1986, the happiest day). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      mall: {
        name: 'LEVEL 7', title: 'Harlow Mall', place: 'Everyone\'s memory — Saturday, December 13, 1986',
        intro: 'The best Saturday of 1986. Five kids, twenty dollars between them, a Christmas tree three stories tall.\n\nThe mall is closed now. The mannequins have moved closer to the glass. They only move when nobody is looking.',
      },
    },
    items: {
      frame: { name: 'Photo strip frame', desc: 'One square of a photo booth strip, cut apart. The booth wants them back together.' },
      frame1: { name: 'Photo strip frame', doc: 'mall_frame1' },
      frame2: { name: 'Photo strip frame', doc: 'mall_frame2' },
      frame3: { name: 'Photo strip frame', doc: 'mall_frame3' },
      frame4: { name: 'Photo strip frame', doc: 'mall_frame4' },
    },
    docs: {
      mall_intro: { kind: 'note', title: 'On the back of a mall directory', from: 'Eddie', body:
`The photo booth by the food court is broken. It wants its pictures back.

Four frames from a photo strip are scattered around the stores. Find them, feed them to the booth, and the doors open.

The mannequins. Don't take your eyes off them. I mean that literally. They don't move while you're looking.

This is the happiest place in the whole game and I hate it the most.

—E.` },
      mall_directory: { kind: 'note', title: 'Mall directory, "YOU ARE HERE" rubbed off by fingers', from: 'Harlow Mall', date: '1986', body:
`LEVEL 1
Spins Records ......... Music, tapes, blank cassettes
Comic Vault ........... Comics, cards, games
Toy Parade ............ Toys for all ages
Photo Booth ........... 4 poses $1
Food Court ............ Sunny Orange, Nonna's Pizza, Pretzel Barn
Starlight Jr. ......... Mini arcade kiosk (by the fountain)

Open until 9 PM through Christmas Eve!` },
      mall_frame1: { kind: 'photo', photo: 'frame', title: 'Photo booth frame #1', from: 'Photo booth', date: 'Dec. 13, 1986', body:
`Danny and Rosie. Danny is pretending to be bored. Rosie is pretending to be a DJ, talking into a pretzel like a microphone.` },
      mall_frame2: { kind: 'photo', photo: 'frame', title: 'Photo booth frame #2', from: 'Photo booth', date: 'Dec. 13, 1986', body:
`Nell and Toby. Nell is actually smiling, a real one, and looks surprised by it. Toby has put a Santa hat on her.` },
      mall_frame3: { kind: 'photo', photo: 'frame', title: 'Photo booth frame #3', from: 'Photo booth', date: 'Dec. 13, 1986', body:
`You and Toby, cheek to cheek, making exactly the same face. Your eyes are shut from laughing.` },
      mall_frame4: { kind: 'photo', photo: 'frame', title: 'Photo booth frame #4', from: 'Photo booth', date: 'Dec. 13, 1986', body:
`All five of you crammed onto one stool. Danny's elbow is in your ear. Nobody is looking at the camera. Everyone is looking at each other.` },
      mall_strip: { kind: 'photo', photo: 'strip', title: 'The photo strip, still warm', from: 'Photo booth', date: 'Dec. 13, 1986', body:
`Four frames, one strip. On the back, five signatures and a line in Rosie's round handwriting:

"FRIENDS FOREVER. EVEN IF WE GET OLD AND BORING.
EVEN IF WE MOVE AWAY.
EVEN IF.
— the Starlight Five"

You remember who kept the strip. Toby did. In his lighter box.` },
      mall_lists: { kind: 'note', title: 'Five Christmas lists on one sheet of notebook paper', from: 'The Starlight Five', date: 'December 1986', body:
`DANNY: a job for my dad. (also a skateboard)
ROSIE: a real microphone. blank tapes (100)
NELL: Star Rangers #12. for Theo to never be scared of water
TOBY: a flashlight that never runs out. for Sam to not be mad about stuff
SAM: level 256

(Someone crossed out SAM's wish and wrote under it, in Toby's hand: "we'll get it together")` },
      mall_receipt: { kind: 'note', title: 'A receipt stuck in a record bin', from: 'Spins Records', date: '12/13/86 3:41 PM', body:
`KEYTONE C-90 BLANK CASSETTE x10 ...... $14.90
BIG BAND CHRISTMAS (used LP) ......... $1.00
TOTAL ................................ $15.90
CASH ................................. $16.00
CHANGE ............................... $0.10

On the back: "Side A: songs for now. Side B: for after. — R."` },
      mall_guard: { kind: 'note', title: 'Security guard logbook', from: 'Harlow Mall Security', date: 'December 13, 1986', body:
`2:20 PM — Five kids at the fountain throwing pennies. Told them to stop. They stopped. Then they started again. Let it go. It's Christmas.

4:05 PM — Same five in the photo booth. Booth jammed. Kids fixed it themselves (the big one had a screwdriver). Did not ask.

5:30 PM — Smallest one lost. Found crying by the fountain. The other four came running from four directions. Everybody hugging. Writing this down because it was nice.` },
      mall_kiosk: { kind: 'note', title: 'A flyer on the Starlight Jr. kiosk', from: 'Walt', date: '1986', body:
`STARLIGHT JR.
The Starlight Arcade comes to the mall!
3 cabinets • 25¢ • Open weekends

"Every kid deserves a high score." — Walt, owner

(In the corner, an old crayon drawing glued to the sign: a round orange creature with horns and a big grin, on little legs. Signed: LIL.)` },
      mall_walt: { kind: 'diary', title: "Walt's journal, a smudged page", from: 'Walt', date: 'Inside', body:
`The mall. I had a kiosk here. I glued Lily's old drawing to the sign. Chompy, with legs.

Those five came by every Saturday that winter. The loud one, the one with the tapes, the quiet one with glasses, the small one with the lighter, and his friend.

His friend. I can't remember the friend's name. It starts with an S.

It is important. I don't know why it is important.` },
      mall_lily5: { kind: 'drawing', drawing: 5, title: 'A drawing taped inside the Starlight Jr. kiosk', from: 'Lily, age 8', date: 'December 1982', body:
`Crayon. The big Christmas tree on Front Street. At its foot, a round orange creature with horns and legs holds the hand of a little girl. Snow falls in blue dots.

DADDY SAYS ONE DAY THERE WILL BE A STARLIGHT IN EVERY TOWN.
EVEN A LITTLE ONE IN A MALL.
(I DREW CHOMPY) (DADDY SAYS I INVENTED HIM)` },
      mall_tape: { kind: 'tape', title: 'Tape: "Christmas message"', from: "Rosie's tape recorder", date: 'December 13, 1986', body:
`[Click. Food court noise, Christmas music, a fountain.]

ROSIE: This is Rosie Radio, live from the food court, with a Christmas message for... future us. Go.

DANNY: Future me, you'd better be rich.

NELL: Um. Future Nell. I hope you're still friends with these idiots.

TOBY: Future Toby, you're probably taller. Finally.

SAM: Future Sam... don't forget this.

ROSIE: That's sappy, Sam.

SAM: Shut up, it's Christmas.

[Everyone laughs. Somebody drops a tray.]

ROSIE: Rosie Radio, signing off. Merry Christmas, Harlow.

[Click.]` },
    },
    obj: {
      mall_frames: 'Find the photo strip frames ({n}/4)',
      mall_booth: 'Feed the frames to the photo booth',
      mall_leave: 'Leave through the mall doors',
    },
    mono: {
      mall_start: 'The mall. Pretzels and pine. I was happy here. I\'d forgotten that.',
      mall_frame1: 'Danny and Rosie. He always pretended he wasn\'t having fun.',
      mall_frame2: 'Nell and Toby. She never smiled in pictures. She smiled in this one.',
      mall_frame3: 'Me and Toby. The same face. We always made the same face.',
      mall_frame4: 'All five of us on one stool.',
      mall_strip: 'He kept it. In the lighter box. He kept it.',
      mall_mannequin: 'That mannequin was facing the window. Now it\'s facing me.',
    },
    lines: {
      mall_boothUse: 'Feed the frames to the photo booth',
      mall_boothLook: 'Photo booth (4 poses $1)',
      mall_boothNeed: 'The booth hums. It\'s missing {n} more.',
    },
    radio: {
      mall_start: [
        ['eddie', 'The mall. They were all so happy here, Sam. Every memory in this place is warm.'],
        ['eddie', 'That\'s what makes it so easy for the game to hold on to.'],
      ],
      mall_mannequin: [
        ['eddie', 'Don\'t blink. I\'m serious. Walk backwards if you have to.'],
      ],
      mall_frames: [
        ['eddie', 'All four. The booth\'s by the food court.'],
      ],
      mall_booth: [
        ['eddie', '...The Starlight Five. Walt called you that. I remember now.'],
        ['eddie', 'Don\'t get too attached to these, Sam. They\'re echoes. The game plays them back to keep you here.'],
        ['sam', 'Is that what happened to you?'],
        ['eddie', '...The doors are open. Go.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
