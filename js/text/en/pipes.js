/* English — Level 2: Pipe Dreams (the storm tunnels, summer 1985). */
(function (root) {
  'use strict';
  root.PB.I18N.register('en', 'story', {
    chapters: {
      pipes: {
        name: 'LEVEL 2', title: 'Pipe Dreams', place: 'Storm tunnel C under Front Street — July 1985',
        intro: 'Brick tunnels under Harlow, warm and dripping. In July 1985 three kids came down here with one flashlight and a bag of licorice and built a fort. You were one of them.\n\nThe chalk arrows still look fresh. Something else lives down here now, and it hates the light.',
      },
    },
    docs: {
      pipes_intro: { kind: 'note', title: 'Taped to a pipe in a plastic sleeve', from: 'Eddie', body:
`Storm tunnels. I think this is the kids' place. Chalk arrows everywhere.

The pressure door at the end won't budge until the steam is bled off. Three big valves. Turn each one all the way.

There are things down here I call crawlers. They hate light. HATE it. Keep the flashlight on them and they back off.

Don't let the battery die down here.

—E.` },
      pipes_chalk: { kind: 'wall', title: 'Chalk on the bricks', body:
`D + T + S
WERE HERE
JULY 1985

→ FORT →

(NO GIRLS)
(EXCEPT NELL) (EXCEPT ROSIE) (OK EVERYBODY)` },
      pipes_map: { kind: 'note', title: 'A treasure map on the back of a cereal box', from: 'Toby, age 11', body:
`TUNNEL C — SECRET MAP
(DO NOT SHOW ANY GROWNUPS)

X = FORT
ZIGZAG = THE LOUD PIPE
SKULL = WHERE SAM DROPPED THE FLASHLIGHT AND WE HAD TO HOLD HANDS

The boiler room is the dragon. Don't touch the red wheel. Danny says it makes the whole town sneeze.

If you found this you are in the club now.` },
      pipes_rules: { kind: 'wall', title: 'Marker on a plank, big letters', body:
`FORT RULES
1. NO GROWNUPS
2. NO CRYING (TOBY THIS MEANS YOU) (JK)
3. WHOEVER HAS THE FLASHLIGHT WAITS FOR THE OTHERS
4. NOBODY GOES HOME ALONE
5. BEST FRIENDS FOREVER NO TAKEBACKS

— SAM (PRESIDENT)` },
      pipes_works: { kind: 'note', title: 'Harlow Public Works — inspection log', from: 'Harlow Public Works', date: 'August 2, 1985', body:
`TUNNEL C, SECTION 4

Boiler relief valves greased. Pressure normal.

Signs of children: candy wrappers, a sleeping bag, comic books, chalk writing, one flashlight (dead). Sign at the junction: "FORT — KEEP OUT GROWNUPS".

Recommend a lock on the storm grate on Front Street.

Did not remove the fort. It looked like it mattered to somebody.

—R.` },
      pipes_walt: { kind: 'diary', title: "Walt's journal, a damp page", from: 'Walt', date: 'Inside', body:
`Tunnels. Brick. I have never been down here in my life, and I know every turn.

These aren't my memories. I'm walking around in somebody else's summer.

Three kids. One flashlight. A rule about nobody going home alone.

I'd like to tell them it's a good rule. I can't remember how to talk to kids. I used to be good at it.` },
      pipes_photo: { kind: 'photo', photo: 'fort', title: 'An instant photo pinned to the fort wall', from: 'Unknown', date: 'July 1985', body:
`Three kids in a brick tunnel, lit from below by one flashlight, all trying to look scary and failing. The tall one (Danny) is making devil horns over the little one (Toby). The one in the middle, smiling, is you.

On the white strip, in pen: "THE FORT. OPENING DAY."` },
      pipes_crawlers: { kind: 'note', title: 'Torn out of a notebook', from: 'Eddie', body:
`About the crawlers.

I think they're the game's garbage collectors. When a memory gets too old to matter, they come and eat it. Nobody remembers these tunnels anymore except three kids, so the tunnels are crawling with them.

Fast in the dark. Stupid in the light. They lunge, then back off when they get burned, then circle.

A glow stick on the floor behind you buys you a minute. Learned that one the hard way.` },
      pipes_lily3: { kind: 'drawing', drawing: 3, title: 'A drawing rolled up inside a pipe', from: 'Lily, age 9', date: 'May 1983', body:
`Crayon. Three kids under a big curved brick ceiling, sharing one flashlight. Outside, a girl with orange braids is waving at them.

SAM AND TOBY AND BIG DANNY FOUND A CAVE UNDER THE STREET.
THEY SAY NO GIRLS.
I AM ALLOWED IN MY HEAD.` },
      pipes_tape: { kind: 'tape', title: 'Tape: "Fort log 1"', from: "Danny's boombox", date: 'July 19, 1985', body:
`[Click. Dripping water. Three kids whispering, echoing.]

DANNY: Fort log number one. Present: me, Toby, and Sam the president.

SAM: FORT president.

DANNY: Fort president. We have four comics, two flashlights, one of which works, and licorice.

TOBY: I brought the licorice.

DANNY: Toby brought the licorice. Rule four, Sam.

SAM: Nobody goes home alone.

TOBY: Even if they're mad?

SAM: ...Especially if they're mad.

[Far off, a pipe bangs. All three scream, then laugh until they can't breathe.]

[Click.]` },
    },
    obj: {
      pipes_valves: 'Bleed the steam valves ({n}/3)',
      pipes_leave: 'Go through the pressure door',
    },
    mono: {
      pipes_start: 'Tunnel C. I know this smell. I was eleven.',
      pipes_valve: 'The valve shrieks, then goes quiet. Steam hisses out somewhere far away.',
      pipes_fort: 'The fort. Our fort. The sleeping bag is still here. Toby\'s comics are still here.',
      pipes_crawler: 'Something white and fast on the ceiling. It flinched away from the light like it was burned.',
    },
    lines: {
      pipes_valve: 'Turn the steam valve (hold)',
    },
    radio: {
      pipes_start: [
        ['eddie', 'Tunnels. You okay? Your breathing\'s loud on the radio.'],
        ['sam', 'I used to come down here. With Danny and Toby.'],
        ['eddie', 'Then you know the way better than I do. Valves first. And keep the light up. I mean it.'],
      ],
      pipes_crawler: [
        ['eddie', 'Crawler. Light on it, Sam! Don\'t run from them in the dark, they\'re faster than you.'],
      ],
      pipes_fort: [
        ['sam', 'Rule four. Nobody goes home alone. I made that up. I was eleven.'],
        ['eddie', '...That\'s a good rule, Sam. I wish I\'d had a rule like that.'],
      ],
      pipes_done: [
        ['eddie', 'Pressure\'s dropping. The door should give now. Next one\'s water. A lot of water.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
