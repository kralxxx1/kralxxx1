/* Français — Niveau 9 : St. Agnes (Walt, octobre 1983). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      hospital: {
        name: 'LEVEL 9', title: 'St. Agnes', place: 'Le souvenir de Walt — service de pédiatrie, octobre 1983',
        intro: 'Le pire mois de Walt, conservé à la perfection. Murs verts, semelles souples, cire à parquet et oranges.\n\nQuelque part à cet étage, il y a la chambre 207. Quelque part à cet étage, une chose immense compte les secondes pendant lesquelles tu détournes le regard.',
      },
    },
    items: {
      page: { name: 'Une page du journal de Walt', desc: 'Arrachée le long de la couture. Son écriture rapetisse à chaque page.' },
      page1: { name: 'Une page du journal de Walt' }, page2: { name: 'Une page du journal de Walt' }, page3: { name: 'Une page du journal de Walt' }, page4: { name: 'Une page du journal de Walt' }, page5: { name: 'Une page du journal de Walt' },
      room207Key: { name: 'Clé de la chambre 207', desc: 'Une clé de service sur une étiquette en carton, de la belle écriture d’une infirmière : 207 — LILY. Un autocollant soleil au dos.' },
    },
    docs: {
      hospital_intro: { kind: 'note', title: 'Pincé sur un fauteuil roulant', from: 'Eddie', body:
`Celui-ci est à Walt. Ça se voit. Tout est trop propre.

Cinq pages de son journal sont éparpillées dans le service. Je crois qu’il les a arrachées lui-même pour ne pas avoir à les lire.

La chambre 207 est fermée à clé. Il y a des clés au poste des infirmières. N’entre pas avant d’avoir lu les pages. Je ne sais pas pourquoi. On dirait que c’est la règle.

Le Compteur est ici. Ne lui tourne pas le dos.

—E.` },
      hospital_diary1: { kind: 'diary', title: 'Le journal de Walt — page 1', from: 'Walt', date: '2 octobre 1983', body:
`Ils l’ont installée au 207. Il y a une fenêtre. Elle voulait une fenêtre pour voir quand il pleut.

Le médecin a dit des semaines. J’ai dit des mois. Il n’a pas protesté, et c’est comme ça que je sais.

Elle m’a demandé si l’arcade s’ennuyait d’elle. J’ai dit que les bornes demandaient de ses nouvelles tous les matins. Elle a dit : « Papa, les machines, ça parle pas. » J’ai dit : celles-là, si.` },
      hospital_diary2: { kind: 'diary', title: 'Le journal de Walt — page 2', from: 'Walt', date: '9 octobre 1983', body:
`Ruth reste dans la voiture maintenant. Elle ne monte plus. Je ne lui en veux pas. Certaines personnes ne savent aimer qu’en ligne droite, et ceci n’est pas une ligne droite.

Lily m’a dessiné aujourd’hui. Un grand monsieur à moustache avec une toute petite arcade sur la tête, comme un chapeau.

J’ai monté une petite borne par l’ascenseur. Elle a fait 3 190 points. J’ai essayé de la laisser gagner à la deuxième partie. Elle l’a vu. Elle a dit : « Me laisse pas gagner, ça compte pas. » Alors je ne l’ai pas fait. Elle a quand même gagné.` },
      hospital_diary3: { kind: 'diary', title: 'Le journal de Walt — page 3', from: 'Walt', date: '21 octobre 1983', body:
`Elle dort presque toute la journée.

Quand elle est réveillée, elle dessine. Huit dessins au mur maintenant. L’arcade. Chompy. Le sapin de Front Street. Une grotte avec des enfants dedans (l’enfant des Keller et le petit Marsh ont trouvé une grotte sous Front Street et ne veulent pas la laisser entrer). Moi.

Elle a demandé : « Quand je serai partie, qui jouera à mon jeu ? »

Je n’ai pas su répondre. Je travaille avec des machines. J’aurais dû avoir une réponse.` },
      hospital_diary4: { kind: 'diary', title: 'Le journal de Walt — page 4', from: 'Walt', date: '27 octobre 1983', body:
`La fête d’Halloween du service, en avance, pour ceux qui ne peuvent pas attendre.

J’ai monté le costume de Chompy par l’escalier parce qu’il ne rentrait pas dans l’ascenseur. Les infirmières ont tellement ri que l’une d’elles a dû s’asseoir. Tout le service est sorti en blouse.

Lily a ri jusqu’à tousser, puis elle a ri encore.

Elle m’a fait promettre que son score resterait pour toujours au tableau des records. LIL, 3 190.

Ce soir, à moitié endormie, elle a dit : « Fais un jeu qui finit jamais, Papa. Comme ça, personne n’aura jamais à partir. »

J’ai dit que je le ferais.` },
      hospital_diary5: { kind: 'diary', title: 'Le journal de Walt — page 5', from: 'Walt', date: '29 octobre 1983', body:
`5 h 40. Il pleuvait. Ça lui aurait plu.

…

Je vais construire une machine qui se souvient de tout. Un jeu où personne n’est jamais parti.

Je sais comment ça sonne.

Je l’écris quand même, pour qu’un jour, quand j’aurai fait quelque chose de terrible, quelqu’un puisse lire ceci et savoir que je l’ai fait par amour. Ça ne suffira pas. Je sais que ça ne suffira pas.` },
      hospital_nurse: { kind: 'note', title: 'Planchette de l’équipe de nuit', from: 'Infirmière Donna', date: 'Octobre 1983', body:
`207 — Lily, 9 ans. Confortable. A demandé d’autres crayons (orange). Père présent, comme toujours. Père a dormi dans le fauteuil, comme toujours.

Quelqu’un peut-il lui parler d’aller se doucher chez lui ? Il dit : « Elle va se réveiller et je ne serai pas là. » On a arrêté de discuter.

Fête d’Halloween le 27 — le père sera déguisé. Que Dieu nous aide. (Meilleure journée du service de toute l’année.)` },
      hospital_ruth: { kind: 'letter', title: 'Une lettre pliée dans la chapelle', from: 'Ruth', date: 'Septembre 1985', body:
`Walt,

Je n’arrivais pas à entrer, à l’époque. Toi, si. C’est la différence entre nous, et c’est pour ça que je dois partir.

Je ne peux pas vivre dans une maison où tu la reconstruis avec des fils. Je t’entends la nuit dans le garage, parler aux machines.

Je t’en prie, ne laisse pas ça te dévorer.

Je suis désolée. Je le serai toujours.
— Ruth` },
      hospital_visitors: { kind: 'note', title: 'Registre des visites, pédiatrie', from: 'St. Agnes', date: 'Octobre 1983', body:
`207 — Walt (père) ........... 1/10, 2/10, 3/10, 4/10, 5/10, 6/10, 7/10, 8/10, 9/10, 10/10, 11/10, 12/10, 13/10 …
207 — Ruth (mère) ........... 1/10, 3/10
207 — Nora (tante) .......... 8/10, 14/10, 22/10
207 — CM1, salle 104 ........ 14/10 (carte déposée)
207 — Frank D. (ami du père) ... 20/10, 27/10 (a apporté des oranges)` },
      hospital_card: { kind: 'note', title: 'Une carte de prompt rétablissement géante en papier de couleur', from: 'CM1, salle 104', date: 'Octobre 1983', body:
`GUÉRIS VITE LILY !!!

Tu nous manques en arts plastiques. Mme K dit que les crayons se sentent seuls.

— Sam (je t’ai gardé la bonne balançoire)
— Toby (je t’ai dessiné un dragon au dos) (c’est un chien)
— et 22 autres noms en majuscules soignées

(Tu te souviens de l’avoir écrite. Tu te souviens de ne pas savoir que ça ne servirait à rien.)` },
      hospital_chompy: { kind: 'photo', photo: 'chompy', title: 'Un Polaroid scotché au-dessus du lit', from: 'Infirmière Donna', date: '27 octobre 1983', body:
`Un homme dans un énorme costume orange tout rond, avec des cornes en feutrine et un sourire plein de dents en mousse, agenouillé près d’un lit d’hôpital. Une toute petite fille avec un chapeau de fête serre la tête du costume dans ses deux bras.

Sur la bande blanche : « LIL & CHOMPY »` },
      hospital_chart: { kind: 'note', title: 'La fiche au pied du lit', from: 'St. Agnes', date: '29 octobre 1983', body:
`PATIENTE : Brenner, Lily, 9 ans
DIAG. : Leucémie aiguë lymphoblastique

29/10 05 h 40 — Heure du décès.
Père présent.
Pluie.

(Quelqu’un a ajouté, tout petit, au crayon : « 3 190 »)` },
      hospital_lily6: { kind: 'drawing', drawing: 6, title: 'Un dessin encore scotché près de la fenêtre du 207', from: 'Lily, 9 ans', body:
`Crayon gras. Une fenêtre, de la pluie en traits bleus. Dehors, une créature orange toute ronde avec des cornes fait coucou. Dedans, une fille avec un chapeau de fête lui répond depuis son lit.

CHOMPY EST VENU À MA FÊTE.
C’ÉTAIT PAPA.
JE LE SAVAIS MAIS J’AI RIEN DIT.` },
      hospital_tape: { kind: 'tape', title: 'Cassette : « L’heure de l’histoire »', from: 'Le magnétophone de Walt', date: 'Octobre 1983', body:
`[Clic. Une chambre d’hôpital. Un moniteur bipe doucement. De la pluie sur la vitre.]

WALT : …et le petit Muncher a dit : je ne mange pas les Spectres. Ce sont mes amis. Je mange seulement les étoiles.

LILY : [endormie] C’est pas comme ça que le jeu marche, Papa.

WALT : C’est comme ça que marche ma version.

LILY : Est-ce que les Spectres rentrent chez eux à la fin ?

WALT : À la fin, tout le monde rentre chez soi.

LILY : Promis ?

WALT : [un silence, trop long] …Promis, ma puce.

[Clic.]` },
    },
    obj: {
      hospital_pages: 'Trouver les pages du journal de Walt ({n}/5)',
      hospital_207: 'Prendre la clé et entrer dans la chambre 207',
      hospital_leave: 'Descendre par l’ascenseur',
    },
    mono: {
      hospital_start: 'Un hôpital. Des murs verts. J’ai déjà mis les pieds ici une fois, avec une carte. J’avais neuf ans.',
      hospital_key: 'Chambre 207. L’étiquette est écrite de la belle écriture d’une infirmière.',
      hospital_207: 'Huit clous au mur, là où pendaient les dessins. Il en reste un. Il pleut derrière la fenêtre. Ici, il pleut toujours.',
    },
    lines: {
      hospital_unlock207: 'Déverrouiller la chambre 207',
      hospital_notYet: 'Ta main s’arrête sur la clé. Pas encore. Lis d’abord ce qu’il a écrit.',
    },
    radio: {
      hospital_start: [
        ['eddie', 'Walt m’a parlé d’elle une fois. En 86. On soudait à deux heures du matin, il a dit son prénom, et puis il n’a plus rien dit pendant une heure.'],
        ['eddie', 'Vas-y doucement ici, Sam. Je ne sais pas quoi te dire d’autre.'],
      ],
      hospital_pages: [
        ['eddie', '…Il a tout construit pour elle. Le Kernel. Le jeu. Tout.'],
        ['sam', 'Un jeu qui ne finit jamais. Pour que personne n’ait jamais à partir.'],
        ['eddie', 'Et puis ça a pris quatre gamins. Va au 207. Je crois qu’il a besoin que tu y ailles.'],
      ],
      hospital_207: [
        ['eddie', 'Sam ? Quelque chose a changé. Le bourdonnement… il sonne différemment. Comme si quelqu’un s’était souvenu de quelque chose.'],
        ['eddie', 'Où que soit le Dévoreur en ce moment, je crois qu’il vient d’arrêter de mâcher.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
