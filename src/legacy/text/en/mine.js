/* English — Chapter 4: Seven Below (Hollow Creek mine). Story bible: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      mine: {
        name: 'CHAPTER 4', title: 'Seven Below', place: 'Hollow Creek Mine',
        intro: 'Saturday 3 March 1956, a little before midnight. Snow on the headframe.\n\nAt twenty to six that morning the roof came down on the 400-foot level. Seven men were on the far side of it. The foreman told their families they died at once.',
      },
    },
    docs: {
      mine_rules: { kind: 'notice', title: 'Lamp room rules', from: 'Hollow Creek Mine', body:
`1. Every man takes his own lamp and leaves his number on the hook.
2. Every man going into a section hangs his brass tag on that section's tally board, and takes it off when he comes out. A tag on the board means a man below.
3. A canary goes down with every party to the 400 level. If the bird goes quiet, you come up.

By order,
A. Lund, foreman` },
      mine_lampBook: { kind: 'note', title: 'The lamp book', from: 'Lamp room', date: 'Saturday 3 March 1956', body:
`LAMPS OUT, NIGHT SHIFT, 400 LEVEL EAST

No. 112   E. Nygaard        NOT RETURNED
No. 117   J. Vik            NOT RETURNED
No. 123   T. Holmberg       NOT RETURNED
No. 124   K. Holmberg       NOT RETURNED
No. 130   A. Skog           NOT RETURNED
No. 135   P. Moen           NOT RETURNED
No. 138   B. Ulstein        NOT RETURNED

(In pencil at the bottom:) seven lamps out. Seven lamps out. Nobody is writing them off until somebody tells me where they are.` },
      mine_statement: { kind: 'report', title: 'Statement to the inquiry (carbon copy)', from: 'A. Lund, foreman', date: '20 March 1956', body:
`The fall in the east section at 5.40 a.m. was total over a length of some forty feet.

I am certain the seven men in the east section were killed outright by the fall. No sound was heard from beyond it at any time.

At 6.10 a.m., smoke from the burning timber reaching the haulage, I closed the fire door as regulations require, to protect the shaft and the men still in the north workings.

The tally board at the station showed the east section clear. The rescue party was therefore sent to the north fall, where two men were brought out alive.

A. Lund` },
      mine_phoneLog: { kind: 'note', title: 'The station telephone book', from: '400 level station', date: '3 March 1956', body:
`05.40  Fall, east section. Power off below. — R.H.
05.52  Smoke in the east drift.
06.02  Foreman at the fire door. Knocking on the far side. Seven, then seven, then seven.
06.10  Foreman: fire door shut and wedged. Smoke.
06.14  Foreman took the seven tags off the board. Says the east section is clear. I said there is knocking. He said there isn't.

(Smaller, in the same hand:)
06.40  Still knocking.
09.15  Still.` },
      mine_rescue: { kind: 'report', title: 'Rescue party report', from: 'Captain, mine rescue', date: '3 March 1956', body:
`Party of eight down at 07.30.
Station tally board: east section showing CLEAR.
Party directed to the north fall. Two men trapped, both brought out alive 13.15.
East section not entered. Fire door sealed by order of the foreman, 4 March.

(Someone has underlined CLEAR twice.)` },
      mine_widow: { kind: 'letter', title: 'A letter pinned to a coat in the dry', from: 'Ruth Holmberg', date: 'April 1956', body:
`Mr Lund,

You came to my kitchen and told me my boys died at once and never knew a thing.

Tore and Karl hung their tags on that board when they went down. Karl showed me how, the first week, like a boy with a new knife. The lamp room says their lamps never came back up. The board says there was nobody there.

One of those is a lie, and lamps don't lie.

I would like their tags. They are all I will have to bury.

Ruth Holmberg` },
      mine_lunch: { kind: 'note', title: 'A note in a lunch tin', from: 'Mor', body:
`Karl —
The coffee is for both of you. Make Tore share it.
Home for supper. Fish.
— Mor` },
      mine_confession: { kind: 'letter', title: 'Folded in the lid of the tobacco tin', from: 'A. Lund', date: 'January 1976', body:
`I have kept these twenty years.

At two minutes past six I was at the fire door and I heard them. Seven knocks, then seven, then seven. They were counting off, so whoever came would know all seven were there. The smoke was coming round the door. If I opened it the smoke would go down the haulage and up the shaft, and the men at the north fall would have no air. That is what I said to myself.

I wedged the door. I went to the board and took their tags off, so the rescue would go north and nobody would ask me to open it again.

I went back once, to listen. They were still knocking. I dropped the tin in the dirt and I ran, and I only picked up four.

They knocked for two days.

Put them back.
A. Lund` },
      mine_genNote: { kind: 'notice', title: 'On the generator room door', from: 'Electrician', body:
`EMERGENCY GENERATOR — pumps and the emergency winding motor.
If the power fails below, this is the only way to bring the cage down to you.

Diesel: fuel store, bottom of the south drift.
The south drift holds gas. It lies up under the roof. TAKE THE BIRD. If you cough, you are already breathing it: get down low and keep moving.` },
      wren5: { kind: 'drawing', drawing: 5, title: 'A drawing pushed out under the fire door', from: 'Wren, age 7', body:
`Crayon, on paper gone soft with damp. A brown tunnel under green grass, and in it seven little yellow lamps in a row, each with a small round face under it. At the end of the tunnel, a grey door. On top of the grass, the little red bird.

Underneath, very carefully:
1 2 3 4 5 6 7` },
    },
    items: {
      canary: { name: 'Canary', desc: 'A yellow canary in a brass cage. It sings while the air is good.' },
      tin: { name: 'Tobacco tin', desc: 'A red tin, the paint worn through at the corners. Four brass tags rattle inside.' },
      tags: { name: 'Tally tags', desc: 'Brass discs stamped with a number. {n} of seven.' },
      diesel: { name: 'Diesel can', desc: 'Heavy and full.' },
    },
    obj: {
      mine_start: 'Find a way down the mine',
      mine_canary: 'Take a canary from the lamp room',
      mine_down: 'Ride the cage down',
      mine_tags: 'Find the seven tags missing from the tally board ({n}/7)',
      mine_board: 'Hang the tags back on the tally board ({n}/7)',
      mine_power: 'The hoist is dead. Bring diesel to the generator',
      mine_gen: 'Start the generator',
      mine_hoist: 'Call the cage with the hoist switch',
      mine_ride: 'Ride the cage up',
    },
    mono: {
      mine_start: 'A mine. Snow on everything, and nobody shovelling it.',
      mine_noCanary: 'Not without the canary. The sign says so, and I\'m not arguing with a sign at the top of a mine shaft.',
      mine_canary: 'Hello, you. Keep singing.',
      mine_down: 'Four hundred feet. Don\'t think about it.',
      mine_station: 'The bottom. A board full of hooks, and the hooks for the east section are empty.',
      mine_board: 'Seven empty hooks. Nygaard, Vik, Holmberg, Holmberg, Skog, Moen, Ulstein.',
      mine_boardNone: 'I don\'t have any of the tags.',
      mine_tin: 'Four tags. Holmberg, Holmberg, Skog, Moen. There should be seven.',
      mine_tag: 'A tag in the dirt.',
      mine_tagCount: 'That\'s {n}.',
      mine_hung: 'Back where they were.',
      mine_claimed: 'Seven. All seven. You were here.',
      mine_knockStop: 'The knocking stopped.',
      mine_knock: 'Somebody\'s knocking. Seven. Then seven again.',
      mine_fireDoor: 'The fire door. Wedged. The knocking\'s coming from right behind it.',
      mine_fireOpen: 'I can\'t open it. I don\'t think I\'m meant to.',
      mine_gas: 'The bird\'s gone quiet.',
      mine_gasNo: 'There\'s something in the air. It tastes of matches.',
      mine_gasLow: 'Keep low. It\'s up under the roof.',
      mine_notYet: 'Not yet. Not with them still knocking.',
      mine_hoistLit: 'The panel\'s lit. The cage motor has power.',
      mine_noCage: 'I need the cage to have power first.',
      mine_gasOut: 'It\'s singing again.',
      mine_hoistDead: 'Dead. There\'s no power down here.',
      mine_diesel: 'Diesel. Heavy.',
      mine_genFuel: 'Fuel in.',
      mine_genNoFuel: 'The tank\'s dry.',
      mine_genOn: 'It\'s running. That\'ll have woken everything down here.',
      mine_hoistOn: 'Something\'s coming down the shaft. The cage. Please be the cage.',
      mine_cageHere: 'The cage.',
      mine_stop: 'It stopped. Oh no. It stopped.',
      mine_lever: 'There\'s a lever. Pull. Pull it.',
      mine_moving: 'Moving. Moving.',
      mine_top: 'Snow. Air.',
      mine_lamps: 'Lights coming down the tunnel. A rescue party. No. Rescue parties talk.',
      mine_burrower: 'The floor moved.',
      mine_crawler: 'There\'s something up in the timbers.',
      mine_lake: 'The old workings are full of water. It\'s perfectly still.',
      mine_stope: 'It goes up and up. I can\'t see the roof.',
      mine_drawing: 'Something slid out from under the door.',
    },
    lines: {
      mine_cageGo: 'Ride the cage down',
      mine_cageLook: 'The cage',
      mine_cageUp: 'Ride the cage up',
      mine_boardPut: 'Hang the tags on their hooks',
      mine_boardLook: 'The tally board',
      mine_hoistPrompt: 'Hoist switch (hold)',
      mine_genPrompt: 'Start the generator (hold)',
      mine_genFuelPrompt: 'Fill the generator',
      mine_genLook: 'The emergency generator',
      mine_leverPrompt: 'Pull the emergency lever (hold)',
      mine_tinPrompt: 'A tobacco tin in the drawer',
      mine_tagPrompt: 'Pick up the tag',
      mine_fireLook: 'The fire door',
    },
    radio: {
      mine_otto1: [
        ['radio', '[static, and very faint under it, a hammer on steel]'],
        ['otto', 'Nine to Ada. Snow? Headframe? Hollow Creek, then. I have a shelf of it. Seven lamps, all still lit, which they should not be, after all this time.'],
        ['ada', 'Someone\'s knocking. Down there.'],
        ['otto', 'Yes. They have been knocking on my shelf since 1956. Take the bird. It will tell you what the air will not.'],
      ],
      mine_ottoLamps: [
        ['otto', 'The lights in the tunnel. They come to light, Ada, the way moths do. Put yours out and stand still. They will walk right past you. Most of the time.'],
      ],
      mine_ottoClaim: [
        ['otto', 'My shelf has gone quiet. Seven lamps. They have gone out, one after another, gently, like a house going to bed.'],
      ],
    },
    recap: {
      mine: 'Hollow Creek, the night of the fall in 1956. Foreman Arvid Lund heard seven men knocking behind the fire door, wedged it shut, and took their tags off the tally board so the rescue would go elsewhere. He told their families they died at once, and kept the tags in a tobacco tin for twenty years. I hung all seven back on their hooks, and the knocking stopped. Then the cage took me up through the dark.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
