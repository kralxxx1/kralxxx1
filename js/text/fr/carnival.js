/* Français — Chapitre 8 : Grandes lumières (la fête foraine Falk). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      carnival: {
        name: 'CHAPITRE 8', title: 'Grandes lumières', place: 'Fête foraine Falk, port de Halvard',
        intro: 'Dimanche 30 septembre 1984, un peu avant minuit. La dernière nuit de la saison.\n\nLa foule est rentrée chez elle. On a laissé les lumières allumées. Le train fantôme a brûlé la nuit d’avant, et on a dit au vieux clown de faire ses bagages.',
      },
    },
    docs: {
      carnival_poster: { kind: 'notice', title: 'Une affiche sur la guérite', from: 'Fête foraine Falk', date: 'Septembre 1984', body:
`FÊTE FORAINE FALK
Port de Halvard — du 14 au 30 septembre
DERNIERS SOIRS !

Le Grand Carrousel · La Grande Roue
Le Palais du rire — venez voir LOTTE LA RIEUSE !
Le TRAIN FANTÔME (si vous l’osez)
Pêche aux canards · Stand de tir · Testez votre force

et tous les après-midi à 16 h et 19 h :
PIPO LE CLOWN
« Le clown de Halvard, depuis vingt et une saisons »` },
      carnival_closing: { kind: 'notice', title: 'Un avis attaché au portail avec du fil de fer', from: 'E. Falk, propriétaire', date: '30.9.84', body:
`LE TRAIN FANTÔME EST FERMÉ.

À la suite de l’incendie de samedi soir, le train fantôme ne rouvrira pas cette saison. Il n’y a eu aucun blessé.

La direction remercie le public et les pompiers de Halvard, et s’excuse pour la déception.

La fête foraine Falk quitte Halvard mardi matin. À l’année prochaine !` },
      carnival_fire: { kind: 'report', title: 'Une copie du rapport d’incendie dans la cabine de commande', from: 'Pompiers de Halvard', date: '30 septembre 1984', body:
`Intervention 84/211. Fête foraine Falk, port. Appel 01.40, 30.9.84.
Incendie dans le parcours obscur (« Train fantôme »). Éteint à 02.15. Aucun blessé.

Foyer : la cabine de l’opérateur à l’arrière de l’attraction, dans une poubelle.
Cause probable : une cigarette mal éteinte.

Le propriétaire, M. E. Falk, déclare que son employé H. Brecht (clown) dormait et fumait dans la cabine. M. Brecht a été congédié et n’a pas pu être entendu. Le fils du propriétaire, K. Falk, 19 ans, n’était pas présent.

Note de l’agent : deux sortes de mégots dans la poubelle. Du rouge à lèvres sur l’un d’eux.` },
      carnival_kasper: { kind: 'letter', title: 'Une enveloppe sur le bureau brûlé, jamais envoyée', from: 'K.', date: '1er octobre 1984', body:
`Hugo,

C’était moi. Moi et Mette, dans la cabine après la fermeture, et j’ai vidé la boîte dans la poubelle sans regarder parce qu’on a entendu Papa arriver.

Papa sait. Papa dit que c’est réglé maintenant, que de toute façon tu allais bientôt arrêter, et il t’a donné deux semaines de paie. Quand il a dit que c’était toi, tu m’as regardé. Tu n’as rien dit. Je ne sais pas pourquoi tu n’as rien dit.

Pardon. Pardon.
K.

(Sur l’enveloppe : « Pipo ». Pas d’adresse. Au dos, de la même main : « où est-ce que je l’envoie »)` },
      carnival_ledger: { kind: 'report', title: 'Le livre de comptes du propriétaire dans la cabine de la grande roue', from: 'E. Falk', date: 'Septembre 1984', body:
`29.9 Recettes, toutes attractions — 14 220. Train fantôme : incendie après la fermeture (01.40). Hors service.
30.9 Brecht, H. (« Pipo »). 21 saisons. Solde de tout compte : deux semaines de paie, en liquide. Ne pas réembaucher.
     Déclaration d’assurance, train fantôme : incendie causé par un employé fumant dans la cabine arrière (Brecht). Déclaration signée E.F.
     K. — conduira le camion à Ostra mardi. L’occuper.` },
      carnival_rosa: { kind: 'note', title: 'Un mot épinglé sous le comptoir du stand de masques', from: 'Rosa, masques et farces', date: 'Nuit du 30.9.84', body:
`Pipo est passé devant mon stand à minuit avec sa valise. Il avait déjà enlevé son visage, et il avait l’air d’avoir cent ans.

Il a sorti son nez de sa poche, l’a posé sur mon comptoir et a dit : « Garde-le-moi, Rosa. »

Je lui ai demandé où il allait. Il a dit : « À la maison. » Il n’a pas de maison. Ça fait vingt ans qu’il vit dans cette caravane.

J’ai mis le nez sous le comptoir, là où personne ne le prendra. — R.` },
      carnival_hugo: { kind: 'note', title: 'Une carte glissée dans le cadre du miroir', from: 'Hugo Brecht', date: '(très ancienne, réécrite bien des fois)', body:
`Ce que le vieux Bruno m’a appris, 1931 :

Le visage se met dans cet ordre. Le blanc. Puis le rouge. Puis le noir. Puis le nez.
Le nez se met en dernier et s’enlève en premier.
Avec le nez, tu es Pipo, et rien ne peut te faire de mal.
Sans lui, tu n’es que Hugo. Alors fais attention à l’endroit où tu l’enlèves.

Le nez vit sur le miroir. Jamais dans une poche.` },
      carnival_fan: { kind: 'letter', title: 'Une lettre d’enfant sur le lit', from: 'Tomas, 7 ans', date: 'Septembre 1984', body:
`Cher Pipo

Merci pour le chien en ballon que tu m’as fait. Je l’ai toujours. Il dégonfle un peu.

Quand je serai grand je veux être clown et faire les chutes.

bisous de Tomas

(Un dessin au crayon de cire : un clown avec un nez rouge aussi gros que sa tête, qui tombe, et tout le monde qui rit.)` },
      carnival_paper: { kind: 'clipping', title: 'Une page de journal sur un banc', from: 'L’Écho du port de Halvard', date: 'Jeudi 4 octobre 1984', body:
`LA VALISE DU CLOWN RETROUVÉE SUR LES MARCHES DU PORT

Une vieille valise marron appartenant à Hugo Brecht, 71 ans, connu de trois générations d’enfants de Halvard sous le nom de Pipo le clown, a été retrouvée lundi matin sur les marches sous le quai aux poissons.

M. Brecht avait été renvoyé par la fête foraine Falk après un incendie sur son train fantôme samedi soir, dont le propriétaire l’avait rendu responsable. Il n’a pas été revu depuis. Toute personne l’ayant vu dimanche soir est priée de contacter la police du port.

La fête a quitté Halvard mardi.` },
      wren8: { kind: 'drawing', drawing: 8, title: 'Un dessin sur le sol de la pièce penchée', from: 'Wren, 7 ans', body:
`Crayon de cire, la feuille pliée en quatre. Un clown au nez rouge avec une grosse valise marron s’éloigne sur une route qui descend vers la mer, en faisant au revoir de la main, le bras tout en haut. Derrière lui, une grande roue pleine de lumières. Le petit oiseau rouge est assis sur son chapeau.

En dessous :
AU REVOIR PIPO` },
    },
    items: {
      fuse: { name: 'Fusible', desc: 'Une cartouche fusible en porcelaine et laiton. 60 A. De l’atelier du palais du rire.' },
      nose: { name: 'Le nez de Pipo', desc: 'Un nez de clown, rouge, lustré par l’usage. Il est allé sur bien des visages, et toujours sur un seul.' },
    },
    obj: {
      carnival_start: 'Trouve un moyen de sortir de la fête',
      carnival_power: 'Le train fantôme sort par la clôture. Remets-le en marche',
      carnival_fuse: 'Trouve un fusible : essaie l’atelier du palais du rire',
      carnival_fit: 'Installe le fusible dans la cabine de commande du train fantôme',
      carnival_why: 'Découvre ce qui est arrivé à Pipo',
      carnival_nose: 'Trouve ce que Pipo a laissé derrière lui',
      carnival_mirror: 'Remets le nez de Pipo sur son miroir',
      carnival_ride: 'Sors à bord du train fantôme',
    },
    mono: {
      carnival_start: 'Une fête foraine. Fermée pour la nuit, et toutes les lumières allumées.',
      carnival_gate: 'Enchaîné. Et la clôture, c’est trois mètres de grillage avec du fil en haut.',
      carnival_booth: 'La guérite est vide. La vitre est cassée. De l’intérieur.',
      carnival_lotte: 'Quelqu’un rit. Très loin. Sans jamais s’arrêter pour respirer.',
      carnival_ghost: 'Le train fantôme. Carbonisé. Le rail le traverse et ressort par l’arrière, à travers la clôture.',
      carnival_noPower: 'Mort. Le porte-fusible est vide et le vieux fusible est noir dans le bac.',
      carnival_fuse: 'Un fusible. Soixante ampères. Ça m’a l’air bon.',
      carnival_power: 'De la lumière à l’intérieur. Les wagonnets ne bougent toujours pas. Quelque chose les retient.',
      carnival_maze: 'Des miroirs. Moi, et moi, et quelqu’un derrière moi dans chacun d’eux. Il n’y a personne derrière moi.',
      carnival_masks: 'Des gens masqués plantés là. Ils n’y étaient pas il y a une minute.',
      carnival_nose: 'Son nez. « Garde-le-moi, Rosa. »',
      carnival_music: 'L’orgue s’est mis en route. Tout seul.',
      carnival_horses: 'Les chevaux. Ils descendent du carrousel.',
      carnival_stopped: 'La musique s’est arrêtée. Eux aussi. Exactement là où ils sont.',
      carnival_trailer: 'Sa caravane. Le miroir est allumé.',
      carnival_mirrorLook: 'Son miroir. Une marque ronde et propre sur la tablette de verre, là où quelque chose était toujours posé.',
      carnival_placed: 'Voilà. Là où il vit, quand il n’est que Hugo.',
      carnival_claimed: 'Les ampoules autour du miroir s’éteignent une à une.',
      carnival_running: 'Quelque chose a démarré de l’autre côté de la fête. Le train fantôme.',
      carnival_notYet: 'Le rail sort par l’arrière. Mais il ne roulera pas sans courant.',
      carnival_board: 'Tiens-toi à la barre.',
      carnival_out: 'Les marches du port. Une valise marron sur la dernière, et la marée qui monte par-dessus.',
      carnival_kasper: 'Il l’a écrite et ne l’a jamais envoyée. « Où est-ce que je l’envoie. »',
      carnival_fence: 'À travers le mur du fond, à travers la clôture.',
    },
    lines: {
      carnival_boothPrompt: 'Installer le fusible',
      carnival_boothLook: 'Les commandes de l’attraction',
      carnival_mirrorPut: 'Poser le nez sur le miroir',
      carnival_mirrorLook: 'Le miroir de Pipo',
      carnival_ridePrompt: 'Monter dans le wagonnet',
      carnival_rideLook: 'Un wagonnet du train fantôme',
    },
    radio: {
      carnival_otto1: [
        ['radio', '[un orgue de foire, au loin, désaccordé]'],
        ['otto', 'Neuf à Ada. J’entends une fête foraine. J’ai une étagère de petits tickets en papier pour les manèges, et un nez rouge. Je ne sais absolument pas pourquoi j’ai dit ça.'],
        ['ada', 'Le portail est enchaîné.'],
        ['otto', 'Les fêtes foraines sont clôturées pour que les gens paient, pas pour qu’ils restent dedans. Il y a toujours une sortie qu’utilise le personnel. Suivez les rails.'],
      ],
      carnival_otto2: [
        ['otto', 'Ada. Ne restez pas immobile près de quoi que ce soit qui porte un visage. Et si la musique commence, bougez tant qu’elle joue. Quand elle s’arrête, tout ce qui danse dessus s’arrête aussi.'],
      ],
      carnival_otto3: [
        ['otto', 'Le nez a quitté mon étagère. Tant mieux. Ce n’était pas à moi de le garder. Encore une étagère, Ada, et c’est celle vers laquelle vous marchez depuis le début de la nuit.'],
      ],
    },
    recap: {
      carnival: 'La fête foraine Falk, 30 septembre 1984. Kasper Falk, dix-neuf ans, a mis le feu au train fantôme avec une cigarette ; son père a dit aux pompiers que c’était le vieux clown, Hugo Brecht, et l’a congédié. Hugo n’a rien dit. Il a laissé son nez à Rosa au stand de masques et il est sorti par le portail avec sa valise, et la valise a été retrouvée sur les marches du port. J’ai remis son nez sur son miroir, là où il vivait, et je suis sortie à travers la clôture à bord du train fantôme.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
