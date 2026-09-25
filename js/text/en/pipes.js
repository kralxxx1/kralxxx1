/* English — Chapter 2: Pipe Dreams (the storm tunnels, summer 1985). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      pipes: {
        name: 'LEVEL 2', title: 'Pipe Dreams', place: 'Storm tunnel C, summer 1985',
        intro: 'Brick tunnels under Harlow, warm and dripping. Three kids came down here in July 1985 with one flashlight and a bag of licorice. The chalk arrows are still fresh. Something else lives down here now, and it hates the light.',
      },
    },
    items: {},
    docs: {
      pipes_intro: { kind: 'note', title: 'Taped to a pipe, in a plastic sleeve', from: 'Eddie', body:
`Storm tunnels. I think this is the kids' place. Somebody drew arrows everywhere in chalk.

The pressure door at the end won't open until the steam is bled off. Three big valves. Turn them all the way.

There are things down here I call crawlers. They don't like light. At all. Keep the flashlight on them and they run.

Don't let the battery die down here.

—E` },
      pipes_chalk: { kind: 'wall', title: 'Chalk on the bricks', body:
`B + C + S
WERE HERE
JULY 1985

→ FORT →

(NO GIRLS)
(EXCEPT IVY) (EXCEPT PENNY) (OK EVERYONE)` },
      pipes_map: { kind: 'note', title: 'A treasure map on the back of a cereal box', from: 'Clyde, age 11', body:
`TUNNEL C — SECRET MAP
(DO NOT SHOW BILLY'S BROTHER)

X = FORT
ZIGZAG = THE LOUD PIPE
SKULL = WHERE SAM DROPPED THE FLASHLIGHT AND WE HAD TO HOLD HANDS

The boiler room is the dragon. Don't touch the red wheel. Billy says it makes the whole town sneeze.

If you find this you are now in the club.` },
      pipes_rules: { kind: 'wall', title: 'Written with a marker on a plank, big letters', body:
`SECRET BASE RULES
1. NO GROWNUPS
2. NO CRYING (CLYDE THIS MEANS YOU) (JK)
3. WHOEVER HAS THE FLASHLIGHT WAITS FOR THE OTHERS
4. NOBODY GOES HOME ALONE
5. BEST FRIENDS FOREVER NO TAKEBACKS

— SAM (PRESIDENT)` },
      pipes_works: { kind: 'note', title: 'Harlow Public Works — inspection log', from: 'Harlow Public Works', date: 'August 2, 1985', body:
`TUNNEL C, SECTION 4

Boiler relief valves re-greased. Pressure normal.

Evidence of children: candy wrappers, a sleeping bag, comic books, chalk writing. One flashlight (dead). Sign at the junction reads "SECRET BASE — KEEP OUT GROWNUPS".

Recommend a lock on the storm grate on Front Street.

Note: did not remove the fort. Looked like it mattered to somebody.

—R.` },
      pipes_walt: { kind: 'diary', title: "Walt's journal, a damp page", from: 'W', date: '—', body:
`Tunnels. Brick. I have never been in these tunnels in my life, but I know every turn.

These are not my memories. I think I am walking around in somebody else's summer.

Three kids. A flashlight. A rule about nobody going home alone.

I want to tell them the rule is a good one. I can't remember how to talk to kids. I used to be good at it.` },
      pipes_photo: { kind: 'photo', photo: 'fort', title: 'A Polaroid pinned to the fort wall', from: 'Unknown', date: 'July 1985', body:
`Three boys in a brick tunnel, faces lit by one flashlight from below, all of them trying to look scary and failing. The tall one (Billy) is doing devil horns over the little one (Clyde). The middle one is you.

On the white strip, in pen: "THE FORT. OPENING DAY."` },
      pipes_crawlers: { kind: 'note', title: 'Torn from a notebook', from: 'Eddie', body:
`About the crawlers.

I think they're the game's garbage collectors. When a memory gets too old to count, they come and eat it. Nobody remembers the tunnels anymore except three kids, so the tunnels are full of them.

They're fast in the dark and stupid in the light.

A glow stick on the floor behind you buys you a minute. I learned that the hard way.` },
      pipes_lily3: { kind: 'drawing', drawing: 3, title: 'A drawing rolled up inside a pipe', from: 'Lily, age 8', body:
`Crayon. Three boys and one girl with pigtails under a big curved ceiling. They are all holding one flashlight together. The girl is drawn slightly apart, waving.

SAM AND CLYDE AND BILLY'S CAVE.
I WASN'T ALLOWED.
I WAS ALLOWED IN MY HEAD.` },
      pipes_tape: { kind: 'tape', title: 'Tape: "Fort log 1"', from: "Billy's boombox", date: 'July 19, 1985', body:
`[Click. Dripping water. Three kids whispering, echoing.]

BILLY: Fort log number one. Present: me, Clyde, and Sam the president.

SAM: Fort president.

BILLY: Fort president. We have four comics, two flashlights, one of them works, and licorice.

CLYDE: I brought the licorice.

BILLY: Clyde brought the licorice. Rule four, Sam.

SAM: Nobody goes home alone.

CLYDE: Even if they're mad?

SAM: ...Especially if they're mad.

[Somewhere far off, a pipe bangs. All three scream, then laugh until they can't breathe.]

[Click.]` },
    },
    obj: {
      pipes_valves: 'Bleed the steam valves ({n}/3)',
      pipes_leave: 'Go through the pressure door',
    },
    mono: {
      pipes_start: 'Tunnel C. I know this smell. I was eleven.',
      pipes_valve: 'The valve screams, then goes quiet. Steam hisses out somewhere far away.',
      pipes_fort: 'The fort. Our fort. The sleeping bag is still here. Clyde\'s comics are still here.',
      pipes_crawler: 'Something white and fast on the ceiling. It pulled away from the light like it was burned.',
    },
    lines: {
      pipes_valve: 'Turn the steam valve (hold)',
    },
    radio: {
      pipes_start: [
        ['eddie', 'Tunnels. You okay? Your breathing\'s loud on the radio.'],
        ['sam', 'I used to come here. With Billy and Clyde.'],
        ['eddie', 'Then you know the way better than I do. Valves first. And keep the light up. I mean it this time.'],
      ],
      pipes_crawler: [
        ['eddie', 'Crawler. Light on it, Sam. Don\'t run from them in the dark, they\'re faster than you.'],
      ],
      pipes_fort: [
        ['eddie', '...Nobody goes home alone. Huh.'],
        ['eddie', 'That\'s a good rule. I wish I\'d had a rule like that.'],
      ],
      pipes_done: [
        ['eddie', 'Pressure\'s dropping. Door should give now. The next one\'s water. Lots of water.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
