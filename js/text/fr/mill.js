/* Français — Niveau 1 : l’entrepôt de l’usine (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'L’entrepôt de l’usine', place: 'Le souvenir de Danny — Harlow Mill, Front Street',
        intro: 'Le plafond est à six mètres. Les rayonnages s’enfoncent dans le noir. Quelque part, une horloge fait tic-tac, toujours sur la même seconde.\n\nLe père de Danny a emballé des cartons dans ce bâtiment pendant vingt-cinq ans. Puis, un vendredi, on lui a offert une montre et on l’a renvoyé chez lui.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Scotché sur la porte du monte-charge', from: 'Eddie', body:
`Le monte-charge a besoin de trois fusibles. Le tableau est près du bureau de chargement.

Le rouge patrouille dans les allées. Rapide, il ne s’arrête jamais, mais il fait du BRUIT. Écoute-le venir.

N’essaie pas de le distancer à découvert. Personne ne distance Danny.

—E.` },
      mill_layoff: { kind: 'letter', title: 'Une lettre sur papier à en-tête', from: 'Harlow Mill, service expéditions', date: '30 mai 1986', body:
`Cher Ray,

Dans le cadre de la restructuration du service expéditions de Front Street, votre poste sera supprimé à compter du 30 juin 1986.

Nous vous remercions pour vingt-cinq années de loyaux services. Merci de rapporter la clé de votre casier et votre badge au bureau d’accueil.

Veuillez accepter la montre ci-jointe en témoignage de notre reconnaissance.

La direction de Harlow Mill` },
      mill_punch: { kind: 'card', title: 'Une carte de pointage', from: 'Harlow Mill', date: 'Été 1986', body:
`EMPLOYÉ : KOWALSKI, D. (ÉTÉ — BALAYEUR)
TAUX : 3,35 $/h

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

En travers de la dernière ligne, au stylo bleu :
LE DERNIER JOUR DE PAPA AUSSI` },
      mill_graffiti: { kind: 'wall', title: 'De la peinture en bombe sur les rayonnages', body:
`DAN #1
DANNY ÉTAIT LÀ
DANNY EST TOUJOURS LÀ` },
      mill_danny1: { kind: 'note', title: 'Un mot plié dans une poche de blouson', from: 'Danny', date: 'Mars 1987', body:
`Tout le monde croit que j’ai peur de rien.

J’ai peur de voir papa assis toute la journée dans la cuisine, la radio éteinte.

Alors je joue. Celui qui est premier ne reste pas assis dans la cuisine.

(Si Rosie lit ça, je la tue pour de vrai.)` },
      mill_ray: { kind: 'letter', title: 'Une lettre jamais envoyée', from: 'Ray, le père de Danny', date: 'Mai 1987', body:
`Danny,

La police m’a encore posé des questions sur la clé. Je leur ai dit que je me fiche de toutes les clés. Tu peux avoir toutes les clés de cette ville.

Je travaille à la quincaillerie maintenant. Ça va. Moins d’heures. J’écoute le match à la radio.

J’ai réparé ton vélo. Chaîne neuve, freins neufs. Il est dans le garage.

Rentre à la maison et monte dessus. Je ne dirai pas un mot.

Papa` },
      mill_manifest: { kind: 'printout', title: 'Un bordereau d’expédition', from: 'Harlow Mill, quai 3', date: '17 avril 1987', body:
`EXPÉDITION N° 0256
CONTENU : 1 montre-bracelet (arrêtée à 3 h 17)
POIDS : rien
DESTINATION : —
RÉCEPTIONNÉ PAR : —

Le papier est tiède, comme s’il sortait à l’instant de l’imprimante.` },
      mill_walt3: { kind: 'diary', title: 'Le journal de Walt', from: 'Walt', date: 'À l’intérieur, jour ?', body:
`Le rouge ne s’arrête jamais. Il refait sans cesse les mêmes boucles, comme Danny jouait au labyrinthe : toujours premier, toujours le plus rapide, jamais une respiration.

Aujourd’hui, il a foncé sur moi en hurlant. TU AS LÂCHÉ. TU AS LÂCHÉ.

Je n’ai jamais rien lâché. Je les ai tenus, chacun d’eux, pendant cinq ans. Alors sur qui est-ce qu’il hurle ?

Je l’ai suivi ensuite et je ne sais plus pourquoi. Je crois que j’avais faim.` },
      mill_shrine: { kind: 'note', title: 'Sous la photo, sur l’autel', from: 'W.', body:
`Il fallait toujours qu’il soit le premier.
Premier à la borne. Premier à 900 000.
Premier à passer l’écran.

Donne-lui quelque chose qui s’arrête.` },
      mill_tape: { kind: 'tape', title: 'Cassette : « Premier, pour l’histoire »', from: 'Le magnétophone de Rosie', date: '16 avril 1987, 23 h 52', body:
`[Clic. Bruit d’arcade. Des enfants rient.]

DANNY : Ici Danny Kowalski, première place, enregistrement pour l’histoire. Cette nuit, on bat le kill screen.

ROSIE : Cette nuit, on ESSAIE de battre le kill screen.

DANNY : Walt dit que c’est impossible. Walt disait aussi que personne ne dépasserait neuf cent mille.

TOBY : On va avoir des ennuis ? Ma mère croit que je dors chez Sam.

DANNY : Les ennuis, c’est pour ceux qui se font prendre, Toby.

NELL : …Sam a filé à la maison, Danny.

DANNY : Sam, c’est une poule mouillée. Plus de kill screen pour nous.

[Un silence.]

TOBY : Sam, c’est pas une poule mouillée. Sam va venir.

[Clic.]` },
    },
    obj: {
      mill_fuses: 'Trouver les fusibles ({n}/3)',
      mill_panel: 'Mettre les fusibles dans le tableau du monte-charge',
      mill_wait: 'Le monte-charge arrive… Rester en vie ({n} s)',
      mill_leave: 'Monter dans le monte-charge',
    },
    mono: {
      mill_start: 'Une horloge qui fait tic-tac. Toujours la même seconde.',
      mill_dannySeen: 'Rouge. Un drap trempé, bombé comme une tête, l’ourlet déchiré en pointes. Deux yeux énormes et pas de visage. Il y a quelque chose de la taille d’un garçon dessous.',
      mill_fuse: 'Encore un fusible.',
      mill_elevator: 'Le monte-charge arrive. Lentement. Tellement lentement.',
      mill_watch: '3 h 17. Comme l’horloge.',
    },
    lines: {
      mill_panel: 'Mettre les fusibles',
      mill_panelIdle: 'Tableau des fusibles ({n}/3)',
      mill_slots: 'Le tableau a trois logements vides.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam ? Tu es là ? …Oh. Je connais cet endroit. Harlow Mill, l’entrepôt de Front Street. Le père de Danny a travaillé ici vingt-cinq ans.'],
        ['eddie', 'Ce qui veut dire que le rouge va être là aussi.'],
      ],
      mill_danny: [
        ['eddie', 'Il est sur toi ! Ne fais pas la course avec lui à découvert. Casse la ligne, prends un coin, mets quelque chose entre vous !'],
        ['sam', 'Il hurle quelque chose !'],
        ['eddie', 'Il fait toujours ça. « Tu as lâché. » Il me l’a hurlé, il l’a hurlé à Walt. Je sais pas à qui il pense. COURS.'],
      ],
      mill_watch: [
        ['eddie', 'C’est une montre ? …La montre de Ray. Ils la lui ont donnée le jour où ils l’ont viré. Danny l’a portée tous les jours après ça.'],
        ['eddie', 'Il y a un autel quelque part par ici. Emporte-la là-bas. Peut-être qu’il se souviendra.'],
      ],
      mill_freed: [
        ['eddie', '…Il s’est arrêté ? Sam, qu’est-ce que t’as fait ? Il est juste… planté là.'],
        ['eddie', 'Mon Dieu. C’est Danny. C’est vraiment Danny.'],
      ],
      mill_elevator: [
        ['eddie', 'Ce monte-charge fait un boucan. Tout ce qui est ici l’a entendu. Reste en vie jusqu’à ce qu’il arrive.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
