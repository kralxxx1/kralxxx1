/* Français — Chapitre 6 : Basses eaux (Gammel Ostra). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      village: {
        name: 'CHAPITRE 6', title: 'Basses eaux', place: 'Gammel Ostra, vallée de l’Ostra',
        intro: 'Vendredi 2 octobre 1964, après la tombée de la nuit, sous la pluie.\n\nLes vannes du barrage se sont fermées ce matin à six heures. Les affiches sur chaque poteau de portail disent le neuf. Le village est vide, et la rivière a déjà débordé dans les creux. Une maison a encore une lampe allumée à la fenêtre.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'Un avis sur un poteau de portail', from: 'Bureau du district', date: 'Septembre 1964', body:
`RÉGULATION DE LA RIVIÈRE OSTRA

Les vannes du barrage seront fermées et la vallée sera inondée le
VENDREDI 9 OCTOBRE 1964.

Tous les habitants devront avoir quitté Gammel Ostra à cette date. Les camions de déménagement partent chaque matin à 8 h de la cour de l’école.

(Sur cet exemplaire, le 9 a été barré au crayon rouge et VENDREDI 2 OCTOBRE écrit au-dessus. Toutes les affiches n’ont pas été corrigées.)` },
      village_torLetter: { kind: 'letter', title: 'Une lettre sur la table de la cuisine', from: 'Tor', date: '24 septembre 1964', body:
`Maman,

Arrête d’écrire au journal. Ça ne sert à rien et le conseil lit chaque mot.

Les vannes ferment le vendredi 9. Tu as tout le temps du monde. Je monterai avec la voiture le matin du 8, on chargera tes affaires, et tu descendras chez Ingrid à Halvard comme une femme raisonnable, et en route tu pourras m’en vouloir autant que tu veux.

Ne fais pas de bêtises.
Tor` },
      village_diary: { kind: 'report', title: 'Journal de chantier, cabane du gardien du barrage', from: 'T. Holm, ingénieur résident', date: 'Septembre–octobre 1964', body:
`28.9  Le conseil avance la fermeture d’une semaine : vannes fermées le 2.10 à 06.00. Annoncé à la radio ce soir. Affiches à corriger.
      Maman n’a pas la radio. Je le lui dirai moi-même en venant la chercher. Ce sera plus facile le jour même.
29.9  Coulage du déversoir retardé. Pluie.
1.10  Coulage toute la nuit. Impossible de partir. Appelé Ingrid à Halvard : Maman lui a dit que je viens le 8, qu’Ingrid ne s’inquiète pas.
2.10  06.00 Vannes fermées comme prévu. La vallée se remplit.
      Je ne suis pas monté à la maison.

(Il n’y a plus d’entrées de cette main.)` },
      village_ingrid: { kind: 'note', title: 'Une étiquette attachée à une caisse au grenier', from: 'I.', date: '30.9.64', body:
`AFFAIRES DE MAMAN — POUR HALVARD

Elle dit qu’elle ne quittera pas sa maison, un point c’est tout. Tor dit qu’il vient la chercher le 8.
J’ai pris sa boîte à musique, pour qu’elle ait une raison de venir la récupérer.
— I.` },
      village_removal: { kind: 'report', title: 'La liste des départs sur le bureau de l’instituteur', from: 'École de Gammel Ostra', date: 'Octobre 1964', body:
`Aas, Olav, 64 — chez son fils, Nordvik — parti le 21.9
Famille Berg (5) — Halvard — partie le 23.9
Dahl, Marit, 80 — à la maison de retraite d’Ostra — partie le 25.9
Holm, Signe, 71, Stuegata 4 — chez sa fille (I. Lind), Halvard — par son fils, le 8.10
Kvam, Per et Anna — partis le 26.9

(Toutes les lignes sauf une sont cochées.)` },
      village_parish: { kind: 'note', title: 'Un mot sur le bureau de la sacristie', from: 'Pasteur A. Rø', date: '27.9.64', body:
`Dernier office aujourd’hui. Les cloches descendent le 30.
Le chœur a demandé à chanter l’hymne du soir une dernière fois et je l’ai permis, bien que l’église fût presque vide.

Mme Holm a demandé qu’on ne ferme pas l’église tant qu’elle est encore au village. J’ai dit que le Seigneur ne ferme pas. Le conseil pense autrement.

Les clés des maisons des personnes âgées sont au tableau de la sacristie jusqu’au déménagement.` },
      village_shop: { kind: 'note', title: 'Le livre de comptes de l’épicerie, ouvert', from: 'Épicerie de Gammel Ostra', date: 'Octobre 1964', body:
`1.10  Mme Holm — pétrole, 2 litres. Allumettes. Café, ¼ kg. À crédit.
        (Elle dit qu’elle réglera le 8.)

(La boutique a fermé le soir même. Les étagères sont nues.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'Un dessin sous l’oreiller', from: 'Wren, 7 ans', body:
`Crayon de cire, ramolli par l’humidité. Une église blanche sous une eau verte, des poissons qui nagent près du clocher. À côté, une petite maison rouge, et à la fenêtre une dame aux cheveux blancs qui tient une lampe levée. Au-dessus de l’eau, le petit oiseau rouge.

En dessous :
ELLE A VEILLÉ` },
    },
    items: {
      signeKey: { name: 'Clé de maison', desc: 'Sur une boucle de ficelle rouge. Une étiquette en papier : S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Boîte à musique', desc: 'En palissandre, avec une petite danseuse sur le couvercle. Remontée, elle joue une valse que vous connaissez presque.' },
    },
    obj: {
      village_start: 'Trouve qui a allumé la lampe',
      village_key: 'Trouve une clé de la maison à la lampe',
      village_box: 'Trouve ce qui se trouvait autrefois sur la cheminée',
      village_mantel: 'Remets la boîte à musique sur la cheminée',
      village_run: 'L’eau arrive. Va à l’échelle du barrage',
      village_climb: 'Grimpe',
    },
    mono: {
      village_start: 'Un village. Vide. Les arbres ont tous été abattus. Il y a une lumière à une fenêtre.',
      village_locked: 'Fermé à clé. Une lampe brûle à l’intérieur et personne ne répond.',
      village_church: 'Ils chantent. Dans le noir, face à l’autel. Pas un bruit.',
      village_silence: 'Ils se sont arrêtés.',
      village_turn: 'Ils se retournent.',
      village_resume: 'Ils chantent de nouveau.',
      village_key: 'S. Holm, Stuegata 4. Holm. Ce nom me dit quelque chose.',
      village_school: 'L’école. C’est d’ici que partaient les camions.',
      village_list: 'Holm, Signe. Chez sa fille, I. Lind. Lind. I. Lind, c’est Mamie.',
      village_attic: 'Des caisses. Des étiquettes. Tout un village mis en cartons.',
      village_box: 'Une boîte à musique. « Affaires de Maman. » Maman. La mère de Mamie.',
      village_house: 'La lampe est allumée. Le poêle est chaud. Personne.',
      village_dust: 'Il y a un carré propre dans la poussière sur la cheminée. Quelque chose est resté là longtemps.',
      village_placed: 'Voilà. Là où tu la gardais.',
      village_claimed: 'Elle joue toute seule. L’horloge sonne. Il est six heures.',
      village_water: 'Ce grondement. L’eau. Elle arrive.',
      village_ladder: 'L’échelle. Monte. Vas-y, monte.',
      village_top: 'Le sommet. Toute la vallée est de l’eau.',
      village_gran: 'Mamie n’a jamais dit qu’elle avait une mère ici. Pas une seule fois.',
    },
    lines: {
      village_mantelLook: 'La cheminée',
      village_mantelPut: 'Poser la boîte à musique sur la cheminée',
      village_ladderPrompt: 'Monter à l’échelle (maintenir W)',
      village_wellLook: 'Un puits',
    },
    radio: {
      village_otto1: [
        ['radio', '[la pluie sur les parasites]'],
        ['otto', 'Neuf à Ada. De la pluie, un village vide, un barrage ? Gammel Ostra. J’en ai toute une étagère. Des poignées de porte, surtout. Les gens emportent leurs clés et laissent les poignées.'],
        ['ada', 'On chante. Dans l’église.'],
        ['otto', 'Alors laissez-les chanter. Tant qu’ils chantent, ils regardent l’autel. S’ils s’arrêtent, n’attendez pas de savoir pourquoi.'],
      ],
      village_otto2: [
        ['otto', 'Ada. Une boîte à musique sur mon étagère vient de se mettre à jouer toute seule. L’eau monte sur le sol, ici. À votre place, je partirais. Je partirais maintenant.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2 octobre 1964. Mon arrière-grand-mère, Signe Holm, ne voulait pas quitter sa maison. Son fils Tor, l’ingénieur du barrage, lui a dit que les vannes fermeraient le neuf ; elles ont fermé le deux, et il n’est pas monté à la maison. Mamie croyait que Tor allait la chercher. La lampe brûlait encore quand l’eau est arrivée. J’ai remis sa boîte à musique sur sa cheminée, puis j’ai escaladé le barrage pendant que la vallée se remplissait sous moi.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
