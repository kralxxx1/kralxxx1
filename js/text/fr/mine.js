/* Français — Chapitre 4 : Sept au fond (mine de Hollow Creek). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      mine: {
        name: 'CHAPITRE 4', title: 'Sept au fond', place: 'Mine de Hollow Creek',
        intro: 'Samedi 3 mars 1956, un peu avant minuit. De la neige sur le chevalement.\n\nÀ six heures moins vingt ce matin-là, le toit s’est effondré au niveau des 400 pieds. Sept hommes étaient de l’autre côté. Le contremaître a dit à leurs familles qu’ils étaient morts sur le coup.',
      },
    },
    docs: {
      mine_rules: { kind: 'notice', title: 'Règlement de la lampisterie', from: 'Mine de Hollow Creek', body:
`1. Chaque homme prend sa propre lampe et laisse son numéro au crochet.
2. Chaque homme qui entre dans un quartier accroche sa médaille de laiton au tableau de pointage de ce quartier, et la reprend en sortant. Une médaille au tableau, c’est un homme au fond.
3. Un canari descend avec chaque équipe au niveau 400. Si l’oiseau se tait, vous remontez.

Par ordre,
A. Lund, contremaître` },
      mine_lampBook: { kind: 'note', title: 'Le registre des lampes', from: 'Lampisterie', date: 'Samedi 3 mars 1956', body:
`LAMPES SORTIES, ÉQUIPE DE NUIT, NIVEAU 400 EST

No 112   E. Nygaard        NON RENDUE
No 117   J. Vik            NON RENDUE
No 123   T. Holmberg       NON RENDUE
No 124   K. Holmberg       NON RENDUE
No 130   A. Skog           NON RENDUE
No 135   P. Moen           NON RENDUE
No 138   B. Ulstein        NON RENDUE

(Au crayon, en bas :) sept lampes dehors. Sept lampes dehors. Personne ne les raye tant qu’on ne m’a pas dit où elles sont.` },
      mine_statement: { kind: 'report', title: 'Déposition devant l’enquête (copie carbone)', from: 'A. Lund, contremaître', date: '20 mars 1956', body:
`L’éboulement du quartier est, à 5 h 40, était total sur une longueur d’environ quarante pieds.

Je suis certain que les sept hommes du quartier est ont été tués sur le coup par l’éboulement. Aucun bruit n’a jamais été entendu au-delà.

À 6 h 10, la fumée du boisage en feu atteignant la galerie de roulage, j’ai fermé la porte coupe-feu comme le règlement l’exige, pour protéger le puits et les hommes des travaux nord.

Le tableau de pointage de la recette indiquait le quartier est vide. L’équipe de secours a donc été envoyée à l’éboulement nord, d’où deux hommes ont été remontés vivants.

A. Lund` },
      mine_phoneLog: { kind: 'note', title: 'Le cahier du téléphone de la recette', from: 'Recette du niveau 400', date: '3 mars 1956', body:
`05.40  Éboulement, quartier est. Plus de courant au fond. — R.H.
05.52  Fumée dans la galerie est.
06.02  Contremaître à la porte coupe-feu. On frappe de l’autre côté. Sept, puis sept, puis sept.
06.10  Contremaître : porte coupe-feu fermée et calée. Fumée.
06.14  Le contremaître a retiré les sept médailles du tableau. Dit que le quartier est est vide. J’ai dit qu’on frappe. Il a dit que non.

(Plus petit, de la même main :)
06.40  On frappe toujours.
09.15  Toujours.` },
      mine_rescue: { kind: 'report', title: 'Rapport de l’équipe de secours', from: 'Chef du sauvetage minier', date: '3 mars 1956', body:
`Équipe de huit descendue à 07.30.
Tableau de pointage de la recette : quartier est indiqué VIDE.
Équipe dirigée vers l’éboulement nord. Deux hommes coincés, tous deux remontés vivants à 13.15.
Quartier est non visité. Porte coupe-feu scellée sur ordre du contremaître, 4 mars.

(Quelqu’un a souligné VIDE deux fois.)` },
      mine_widow: { kind: 'letter', title: 'Une lettre épinglée à un manteau dans la salle des pendus', from: 'Ruth Holmberg', date: 'Avril 1956', body:
`Monsieur Lund,

Vous êtes venu dans ma cuisine me dire que mes garçons étaient morts sur le coup et n’avaient rien senti.

Tore et Karl ont accroché leurs médailles à ce tableau en descendant. Karl m’avait montré comment, la première semaine, comme un gamin avec un couteau neuf. La lampisterie dit que leurs lampes ne sont jamais remontées. Le tableau dit qu’il n’y avait personne.

L’un des deux ment, et les lampes ne mentent pas.

Je voudrais leurs médailles. C’est tout ce que j’aurai à enterrer.

Ruth Holmberg` },
      mine_lunch: { kind: 'note', title: 'Un mot dans une gamelle', from: 'Maman', body:
`Karl —
Le café est pour vous deux. Fais partager Tore.
Rentrez dîner. Du poisson.
— Maman` },
      mine_confession: { kind: 'letter', title: 'Plié dans le couvercle de la boîte à tabac', from: 'A. Lund', date: 'Janvier 1976', body:
`Je les ai gardées vingt ans.

À six heures deux, j’étais à la porte coupe-feu et je les ai entendus. Sept coups, puis sept, puis sept. Ils se comptaient, pour que celui qui viendrait sache qu’ils étaient là tous les sept. La fumée passait autour de la porte. Si je l’ouvrais, la fumée descendait la galerie de roulage et remontait le puits, et les hommes de l’éboulement nord n’auraient plus d’air. C’est ce que je me suis dit.

J’ai calé la porte. Je suis allé au tableau et j’ai retiré leurs médailles, pour que les secours partent au nord et que personne ne me demande de rouvrir.

Je suis revenu une fois, pour écouter. Ils frappaient encore. J’ai laissé tomber la boîte dans la terre et j’ai couru, et je n’en ai ramassé que quatre.

Ils ont frappé pendant deux jours.

Remets-les en place.
A. Lund` },
      mine_genNote: { kind: 'notice', title: 'Sur la porte de la salle du groupe électrogène', from: 'Électricien', body:
`GROUPE ÉLECTROGÈNE DE SECOURS — pompes et moteur d’extraction de secours.
Si le courant tombe au fond, c’est le seul moyen de faire descendre la cage jusqu’à vous.

Gazole : réserve de carburant, au bout de la galerie sud.
La galerie sud retient le gaz. Il s’accumule sous le toit. PRENEZ L’OISEAU. Si vous toussez, c’est que vous le respirez déjà : baissez-vous et continuez d’avancer.` },
      wren5: { kind: 'drawing', drawing: 5, title: 'Un dessin glissé sous la porte coupe-feu', from: 'Wren, 7 ans', body:
`Crayon de cire, sur un papier ramolli par l’humidité. Un tunnel marron sous de l’herbe verte, et dedans sept petites lampes jaunes en rang, chacune avec un petit visage rond en dessous. Au bout du tunnel, une porte grise. Sur l’herbe, le petit oiseau rouge.

En dessous, très soigneusement :
1 2 3 4 5 6 7` },
    },
    items: {
      canary: { name: 'Canari', desc: 'Un canari jaune dans une cage en laiton. Il chante tant que l’air est bon.' },
      tin: { name: 'Boîte à tabac', desc: 'Une boîte rouge, la peinture usée aux coins. Quatre médailles en laiton tintent dedans.' },
      tags: { name: 'Médailles de pointage', desc: 'Des disques de laiton frappés d’un numéro. {n} sur sept.' },
      diesel: { name: 'Bidon de gazole', desc: 'Lourd et plein.' },
    },
    obj: {
      mine_start: 'Trouve un moyen de descendre dans la mine',
      mine_canary: 'Prends un canari à la lampisterie',
      mine_down: 'Descends par la cage',
      mine_tags: 'Trouve les sept médailles qui manquent au tableau de pointage ({n}/7)',
      mine_board: 'Raccroche les médailles au tableau de pointage ({n}/7)',
      mine_power: 'Le treuil est mort. Apporte du gazole au groupe électrogène',
      mine_gen: 'Démarre le groupe électrogène',
      mine_hoist: 'Appelle la cage avec l’interrupteur du treuil',
      mine_ride: 'Remonte par la cage',
    },
    mono: {
      mine_start: 'Une mine. De la neige partout, et personne pour la déblayer.',
      mine_noCanary: 'Pas sans le canari. Le panneau le dit, et je ne vais pas discuter avec un panneau au bord d’un puits de mine.',
      mine_canary: 'Bonjour, toi. Continue de chanter.',
      mine_down: 'Quatre cents pieds. N’y pense pas.',
      mine_station: 'Le fond. Un tableau plein de crochets, et ceux du quartier est sont vides.',
      mine_board: 'Sept crochets vides. Nygaard, Vik, Holmberg, Holmberg, Skog, Moen, Ulstein.',
      mine_boardNone: 'Je n’ai aucune des médailles.',
      mine_tin: 'Quatre médailles. Holmberg, Holmberg, Skog, Moen. Il devrait y en avoir sept.',
      mine_tag: 'Une médaille dans la terre.',
      mine_tagCount: 'Ça fait {n}.',
      mine_hung: 'Remises là où elles étaient.',
      mine_claimed: 'Sept. Toutes les sept. Vous étiez là.',
      mine_knockStop: 'Les coups se sont arrêtés.',
      mine_knock: 'Quelqu’un frappe. Sept. Puis encore sept.',
      mine_fireDoor: 'La porte coupe-feu. Calée. Les coups viennent juste de derrière.',
      mine_fireOpen: 'Je n’arrive pas à l’ouvrir. Je ne crois pas que je sois censée le faire.',
      mine_gas: 'L’oiseau s’est tu.',
      mine_gasNo: 'Il y a quelque chose dans l’air. Ça a un goût d’allumettes.',
      mine_gasLow: 'Reste baissée. Ça stagne sous le toit.',
      mine_notYet: 'Pas encore. Pas tant qu’ils frappent.',
      mine_hoistLit: 'Le pupitre est allumé. Le moteur de la cage a du courant.',
      mine_noCage: 'Il faut d’abord que la cage ait du courant.',
      mine_gasOut: 'Il chante de nouveau.',
      mine_hoistDead: 'Mort. Il n’y a pas de courant ici.',
      mine_diesel: 'Du gazole. Lourd.',
      mine_genFuel: 'Le plein est fait.',
      mine_genNoFuel: 'Le réservoir est à sec.',
      mine_genOn: 'Il tourne. Ça a dû réveiller tout ce qui est en bas.',
      mine_hoistOn: 'Quelque chose descend le puits. La cage. Pourvu que ce soit la cage.',
      mine_cageHere: 'La cage.',
      mine_stop: 'Elle s’est arrêtée. Oh non. Elle s’est arrêtée.',
      mine_lever: 'Il y a un levier. Tire. Tire dessus.',
      mine_moving: 'Elle bouge. Elle bouge.',
      mine_top: 'La neige. L’air.',
      mine_lamps: 'Des lumières descendent le tunnel. Une équipe de secours. Non. Les équipes de secours parlent.',
      mine_burrower: 'Le sol a bougé.',
      mine_crawler: 'Il y a quelque chose là-haut dans les boisages.',
      mine_lake: 'Les vieux travaux sont pleins d’eau. Parfaitement immobile.',
      mine_stope: 'Ça monte et ça monte. Je ne vois pas le toit.',
      mine_drawing: 'Quelque chose a glissé sous la porte.',
    },
    lines: {
      mine_cageGo: 'Descendre par la cage',
      mine_cageLook: 'La cage',
      mine_cageUp: 'Remonter par la cage',
      mine_boardPut: 'Accrocher les médailles à leurs crochets',
      mine_boardLook: 'Le tableau de pointage',
      mine_hoistPrompt: 'Interrupteur du treuil (maintenir)',
      mine_genPrompt: 'Démarrer le groupe électrogène (maintenir)',
      mine_genFuelPrompt: 'Faire le plein du groupe électrogène',
      mine_genLook: 'Le groupe électrogène de secours',
      mine_leverPrompt: 'Tirer le levier d’urgence (maintenir)',
      mine_tinPrompt: 'Une boîte à tabac dans le tiroir',
      mine_tagPrompt: 'Ramasser la médaille',
      mine_fireLook: 'La porte coupe-feu',
    },
    radio: {
      mine_otto1: [
        ['radio', '[parasites, et très faible dessous, un marteau sur de l’acier]'],
        ['otto', 'Neuf à Ada. De la neige ? Un chevalement ? Hollow Creek, alors. J’en ai une étagère. Sept lampes, toutes encore allumées, ce qu’elles ne devraient pas être, après tout ce temps.'],
        ['ada', 'Quelqu’un frappe. Là en bas.'],
        ['otto', 'Oui. Ils frappent sur mon étagère depuis 1956. Prenez l’oiseau. Il vous dira ce que l’air ne dit pas.'],
      ],
      mine_ottoLamps: [
        ['otto', 'Les lumières dans le tunnel. Elles viennent à la lumière, Ada, comme des papillons de nuit. Éteignez la vôtre et ne bougez plus. Elles passeront juste à côté de vous. La plupart du temps.'],
      ],
      mine_ottoClaim: [
        ['otto', 'Mon étagère s’est tue. Sept lampes. Elles se sont éteintes l’une après l’autre, doucement, comme une maison qui va se coucher.'],
      ],
    },
    recap: {
      mine: 'Hollow Creek, la nuit de l’éboulement de 1956. Le contremaître Arvid Lund a entendu sept hommes frapper derrière la porte coupe-feu, l’a calée, et a retiré leurs médailles du tableau de pointage pour que les secours aillent ailleurs. Il a dit à leurs familles qu’ils étaient morts sur le coup, et il a gardé les médailles vingt ans dans une boîte à tabac. J’ai raccroché les sept à leurs crochets, et les coups se sont arrêtés. Puis la cage m’a remontée à travers le noir.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
