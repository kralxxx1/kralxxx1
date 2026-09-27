/* Français — Niveau 6 : Extinction des feux (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Extinction des feux', place: 'Le souvenir de Toby — le noir',
        intro: 'Les mêmes pièces jaunes, toutes lumières mortes. Ici, le noir est si épais qu’on pourrait s’y adosser.\n\nToby a eu peur du noir toute sa vie. Ici, le noir n’a peur de rien. Quelque part dedans, quelque chose se retient très fort de rire.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'Posé sur un groupe électrogène', from: 'Eddie', body:
`Trois groupes électrogènes. Des bidons de gazole traînent un peu partout.

Ici, le noir a des dents. Je les appelle les Ricaneurs. La lumière les fait disparaître. Lampe torche, bâton lumineux, n’importe quoi.

L’ambré… garde ta lumière sur lui. Ne lui tourne jamais le dos longtemps.

—E.` },
      dark_diary1: { kind: 'diary', title: 'Une page de cahier d’école', from: 'Toby', date: '15 avril 1987', body:
`Demain c’est l’Opération 256 !!!

Danny dit que c’est moi le chef de la lampe torche. Rosie a fait une cassette. Nell a fait une carte des trajets des Spectres et elle est vraiment super bien.

Je me suis assis sur le baladeur de Sam aujourd’hui. Ça a fait crac. Sam ne sait pas encore. Je vais donner à Sam mon argent de poche de mars ET d’avril.

Danny dit que le Spectre ambré de la n° 7 c’est moi parce que c’est le trouillard. Walt dit que c’est le plus malin. De toute façon c’est MON Spectre.` },
      dark_diary2: { kind: 'diary', title: 'La dernière page', from: 'Toby', date: '17 avril 1987, 0 h 50 — à l’arcade', body:
`Écrit à la lumière du briquet. Danny a éteint les lumières au fond pour faire peur. Ça a marché.

Sam a quitté l’arcade à 21 h 40. Sam a dit : « C’est ça. Disparais, alors. » J’ai rien répondu. J’ai pleuré dans l’arrière-salle, là où personne pouvait voir.

Et puis à 0 h 40 quelqu’un a frappé à la porte de derrière et c’était SAM. De l’eau plein les cheveux, plein les baskets.

SAM A FAIT DEMI-TOUR !!! Sam revient toujours.

C’est moi qui me suis excusé en premier. Ça veut dire que j’ai gagné.

Niveau 212. Danny dit 256 avant trois heures. Les cinq mains. Personne ne lâche.` },
      dark_grandpa: { kind: 'card', title: 'Une petite carte dans une boîte à briquet', from: 'Le grand-père de Toby', date: '1985', body:
`Toby —

Ta grand-mère me l’a offert en 1951 pour que je retrouve le chemin de la maison après l’équipe de nuit.

Maintenant il est à toi. Tu n’auras jamais à rester dans le noir.

—Papi` },
      dark_grinners: { kind: 'note', title: 'Écriture tremblante', from: 'Eddie', body:
`Les Ricaneurs ne sont pas des gens. Ce ne sont même pas des Spectres.

Je crois que c’est l’idée que le jeu se fait de ce qu’il y a dans le noir. L’idée de Toby. Ce qu’un gamin de treize ans imagine sous son lit.

Casse un bâton lumineux, compte jusqu’à trois, ils sont partis.

Je ne dors pas beaucoup à ce niveau.` },
      dark_walt6: { kind: 'diary', title: 'Le journal de Walt, écriture serrée', from: 'Walt', date: 'À l’intérieur', body:
`Je ne me souviens plus de mon nom. Il commence par un W.

Je me souviens de l’écriture d’une petite fille. Des lettres rondes. Elle a dessiné un truc orange avec des cornes et elle a écrit PAPA en dessous.

Je me souviens du goût des pièces de monnaie.

L’ambré ne me regarde pas non plus. Plus personne ne me regarde.

MANGE, dit le plateau. MANGE.` },
      dark_wall: { kind: 'wall', title: 'Écrit sur le mur à la suie de briquet', body:
`ME REGARDE PAS

PARDON SAM` },
      dark_porch: { kind: 'note', title: 'Un mot scotché sur une porte moustiquaire', from: 'Maggie, la mère de Toby', date: 'Avril 1987', body:
`Toby —

La lumière du porche reste allumée jusqu’à ce que tu rentres.

Bisous, Maman` },
      dark_tape: { kind: 'tape', title: 'Cassette : « La blague de Toby »', from: 'Le magnétophone de Rosie', date: '16 avril 1987, 23 h 58', body:
`[Clic. L’arrière-salle de l’arcade. Les lumières sont éteintes. Un briquet s’allume.]

TOBY : OK, OK. Pourquoi le Muncher a traversé la route ?

DANNY : Parce que les Spectres étaient de ce côté-ci.

TOBY : Non ! Parce qu’il y avait des ÉTOILES sur la route !

[Silence. Puis Nell pouffe, puis Rosie, puis tout le monde rit beaucoup plus fort que la blague ne le mérite.]

TOBY : [riant encore] Sam devrait être là. Sam rit toujours à celle-là.

[Les rires s’éteignent.]

ROSIE : …Sam va venir, Toby.

[Clic.]` },
    },
    obj: {
      dark_generators: 'Démarrer les groupes électrogènes ({n}/3)',
      dark_leave: 'Rejoindre le monte-charge',
    },
    mono: {
      dark_start: 'Je ne vois rien. La lampe… je ne sais pas si ça suffira.',
      dark_tobySeen: 'Quelque chose d’ambré dans le coin. Un drap à l’ourlet brûlé. Ça ne bouge pas. Pas tant que je regarde.',
      dark_grinner: 'Un sourire dans le noir. Rien que des dents.',
      dark_gen: 'Le groupe électrogène se réveille en toussant. De la lumière.',
      dark_lighter: 'Son briquet. Il me l’a laissé tenir une fois, en 1986. Au bout de dix secondes, il l’a repris.',
      dark_diary2: 'Sam a fait demi-tour. …Non. Non. J’ai pris le chemin de la maison. À 21 h 40, j’ai pris le chemin de la maison.',
    },
    lines: {
      dark_gen: 'Verser le gazole et démarrer (maintenir)',
      dark_genEmpty: 'Groupe électrogène (sans gazole)',
      dark_needFuel: 'Il faut d’abord trouver un bidon de gazole.',
      dark_tankEmpty: 'Le réservoir du groupe électrogène est vide.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Je déteste celui-là. Je le déteste tellement. Reste dans la lumière, Sam. Je suis sérieux.'],
      ],
      dark_toby: [
        ['eddie', 'L’ambré… c’est Toby. Il n’avance pas vers toi tant que tu le regardes. Quand il avait peur, il n’arrivait jamais à regarder quelqu’un dans les yeux.'],
        ['sam', 'Moi, il me regardait dans les yeux. Tout le temps.'],
        ['eddie', '…Ouais. J’imagine que oui.'],
      ],
      dark_lighter: [
        ['eddie', 'Le briquet de son grand-père. Il ne laissait personne y toucher. Même pas Danny.'],
      ],
      dark_freed: [
        ['eddie', '…C’est juste un gamin, Sam. Ce sont tous juste des gamins.'],
        ['eddie', 'Quel genre de jeu fait ça à des gamins ?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
