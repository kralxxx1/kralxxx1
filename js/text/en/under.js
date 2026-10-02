/* English — Chapter 1: Unclaimed (Level 256, the Underneath). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      under: {
        name: 'CHAPTER 1', title: 'Unclaimed', place: 'Level 256',
        intro: 'The elevator went down for a long time. Longer than the station is deep. Longer than the city is old.\n\nThe doors opened on yellow rooms that smell of wet carpet and other people\'s umbrellas. Somewhere in them, a hum. Somewhere in them, everything nobody came back for.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'A luggage tag on the carpet', body:
`IF FOUND PLEASE RETURN TO:
M. STRAND, AGE 8
PINEWOOD DRIVE-IN, ROW 5

(A child's writing. The string has been chewed through.)` },
      under_umbrella: { kind: 'card', title: 'A tag tied to an umbrella', from: 'O.B.', body:
`Item 41,207.
One umbrella, black, gentleman's.
Left with regrets.

Item 41,208.
One glove, left. Belonging to nobody yet.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'A letter in a girl\'s suitcase', from: 'Mamma', date: '19 December 1990', body:
`Lina —

Your ticket is in the INSIDE pocket of your coat. Not the outside one. Don't take it out to look at it on the train, you know what you're like.

Kvitfjell is the stop after the long tunnel. Aunt Sigrid will be on the platform with the sledge.

Don't let anybody tell you that you don't belong on that train.

Love, Mamma` },
      under_chalk: { kind: 'wall', title: 'Chalk on the wall', body:
`THE FLAT ONES COME OFF THE WALL
WHEN YOU TURN YOUR BACK
SO DON'T
— O.` },
      under_otto1: { kind: 'diary', title: 'Otto\'s camp book', from: 'Otto Brandt', body:
`I have stopped counting days. I count items instead. 41,212 today: a hat, a hearing aid, a dog's lead with no dog.

The walkie-talkie works on channel nine. Nobody answers. I talk anyway. It keeps the voice in working order.

A memo came through the floor this morning. Signed A. "Someone is coming. Be kind to her; she will not believe you."

I am always kind. It is the believing that people find difficult.` },
      under_list: { kind: 'note', title: 'Rules of the sorting floor (provisional)', from: 'O.B.', body:
`1. The lost lights are for keeping, not for eating. Something down here disagrees.
2. When the hum gets deeper and the lamps stutter, stop walking. It hears. It does not see.
3. Wallpaper is not to be trusted.
4. The Index Door takes four lights. I have only ever found three at once.
5. Do not file yourself.
— O.B.` },
      under_puddle: { kind: 'note', title: 'A damp page by the water', from: 'O.B.', body:
`The water in this room is cold and tastes of a lake. Every room down here belongs to somebody's worst afternoon.

This one belongs to someone I have not met yet.` },
      under_index: { kind: 'wall', title: 'Stencilled beside the door', body:
`THE INDEX
PLEASE HAVE YOUR CLAIM READY` },
      wren2: { kind: 'drawing', drawing: 2, title: 'A drawing under a radiator', from: 'Wren, age 7', body:
`Crayon. A yellow room. A big round thing with a mouth full of teeth. Flying over it: a little red bird.

Underneath:
IT EATS THE LIGHTS
THE BIRD IS FASTER` },
    },
    items: {},
    obj: {
      under_walkie: 'Find a way through the yellow rooms',
      under_lights: 'Find the lost lights ({n}/4)',
      under_index: 'Bring four lights to the Index Door',
      under_leave: 'Go through the Index Door',
    },
    mono: {
      under_start: 'This isn\'t the basement. The elevator went down for four minutes. The station isn\'t that deep.',
      under_walkie: 'A walkie-talkie, taped to channel nine. Somebody left it switched on.',
      under_light1: 'A little lamp. Warm. For a moment everything in the dark went quiet, like it was holding its breath.',
      under_light4: 'Four. Somewhere at the other end of the floor, something just stopped chewing.',
      under_indexSeen: 'THE INDEX. Four empty sockets beside the door.',
      under_wpSeen: 'It was in the wall. It was the wall. And it moved when I turned round.',
      under_eaterSeen: 'Too big for the corridor. Pale. Chewing.',
      under_humNear: 'The hum just got deeper. The lights are stuttering.',
    },
    lines: {
      under_slots: 'Four sockets ({n}/4 lights)',
      under_place: 'Set the lights into the sockets',
      under_walkiePrompt: 'Take the walkie-talkie',
      under_lightPrompt: 'Take the lost light',
    },
    radio: {
      under_otto1: [
        ['radio', '[static]'],
        ['otto', '...nine. This is nine. Is somebody on the line? I can hear you breathing. That is not a criticism.'],
        ['ada', 'Who is this?'],
        ['otto', 'Brandt. Depot 9, night counter. And you are on my sorting floor without a ticket.'],
        ['ada', 'Otto Brandt? You went missing in 1964.'],
        ['otto', '1964. Is it... no. Tell me later. What is your name, clerk?'],
        ['ada', 'Ada. Ada Lind. I have your job.'],
        ['otto', 'Then you have my sympathy. Listen, Ada Lind. This is where everything goes that nobody came back for. It is very large and it is not empty.'],
        ['otto', 'There is a door. The Index Door. It wants four of the lost lights, little lamps, you will know them. Bring four and it opens.'],
        ['ada', 'And past the door?'],
        ['otto', 'More floors. Shelves, I call them. A memo said you were coming. Signed A. Do you know an A?'],
        ['ada', '...No.'],
        ['otto', 'Nor do I. Keep the channel open.'],
      ],
      under_lights: [
        ['otto', 'You found one. Keep it close. Something down here eats them, and while you hold a fresh one it is afraid of you.'],
        ['ada', 'For how long?'],
        ['otto', 'Not long. Nothing down here is afraid for long.'],
      ],
      under_wallpaper: [
        ['otto', 'Have you seen the flat men yet? In the wallpaper. They come off when your back is turned.'],
        ['ada', 'And when I look at them?'],
        ['otto', 'Then they are wallpaper. Very patient wallpaper.'],
      ],
      under_hum: [
        ['otto', 'If the hum gets deeper and the lamps stutter, stop. Something is standing there. It cannot see you. It can hear your shoes.'],
        ['ada', 'What is it?'],
        ['otto', 'I have filed it under miscellaneous. It is a large category.'],
      ],
      under_eater: [
        ['otto', 'Ada. That sound. It is awake.'],
        ['otto', 'The Eater. The oldest thing down here. It eats what nobody wants. Do not let it decide that is you. Run for the Index Door. Take corners; it is slow in corners.'],
      ],
      under_index: [
        ['otto', 'The Index Door. Four sockets. I have only ever found three lights at once. Perhaps you are luckier.'],
      ],
      under_open: [
        ['otto', 'It is open. I have never seen it open.'],
        ['ada', 'Come with me.'],
        ['otto', 'I cannot. I do not know why. I think I am filed on this floor. Go on. I will be on nine.'],
        ['otto', 'Every shelf below has a lie at the bottom of it, Ada. Look for the lie.'],
      ],
    },
    recap: {
      under: 'Level 256: yellow rooms full of things nobody came back for. Otto Brandt is alive down there, on channel nine; he thinks it has been about a year. I fed four lost lights to the Index Door while something round and very old woke up behind me.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
