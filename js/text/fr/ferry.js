/* Français — Chapitre 2 : Cloche de brume (MS Saint Brigid). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      ferry: {
        name: 'CHAPITRE 2', title: 'Cloche de brume', place: 'MS Saint Brigid, détroit de Halvard',
        intro: '9 novembre 1987, onze heures moins le quart du soir. Un brouillard si épais qu’on ne voit pas la proue depuis la passerelle.\n\nLe Saint Brigid sombre par l’arrière, lentement, sur une mer plate comme une table. Son radar ne fonctionne plus depuis une semaine. Quelque part à l’avant, une cloche.',
      },
    },
    docs: {
      ferry_notice: { kind: 'notice', title: 'Postes d’embarcation', from: 'MS Saint Brigid', body:
`EN CAS D’URGENCE

1. Rendez-vous à votre poste d’embarcation (voir la carte dans votre cabine).
2. Mettez votre gilet de sauvetage. Ne le gonflez pas à l’intérieur du navire.
3. Les canots sont mis à l’eau par l’équipage.
   Clé de bossoir : à la passerelle.
   Manivelle : si le moteur tombe en panne.

(Dessous, au marqueur : « Le treuil no 2 coince. La manivelle est dans le casier à outils de la salle des machines, PAS sur le pont. — 2e mécanicien »)` },
      ferry_testimony: { kind: 'report', title: 'Déposition devant la commission d’enquête (copie)', from: 'Cdt H. Aal', date: '30 novembre 1987', body:
`J’étais à la passerelle de 21 h 30 jusqu’à l’ordre d’abandonner le navire.

La visibilité était inférieure à une encablure. Le radar était hors service depuis le 2 novembre, et les signaux de brume étaient donnés à la main : la cloche du bord, sonnée par le matelot P. Rask.

Vers 22 h 35, la cloche s’est tue. J’ai envoyé le second lieutenant à l’avant. Le garçon avait quitté son poste. Sans signal, nous ne pouvions ni être entendus ni entendre.

J’ai le regret de dire que la perte du Saint Brigid a commencé quand un garçon de seize ans a paniqué.

H. Aal, Commandant` },
      ferry_logpage: { kind: 'report', title: 'Une page arrachée au journal de bord', from: 'Saint Brigid, journal de pont', date: '9 novembre 1987', body:
`21:40  Brouillard épais. Vitesse réduite à 6 nds. Radar H.S.
22:05  Commandant dans sa cabine (souffrant). 2e lieutenant de quart.
22:10  Signaux de brume à la main. Mat. Rask à la cloche.
22:31  Commandant appelé. N’est pas venu.
22:44  Abordage, bâbord arrière. Voie d’eau.
22:47  Abandon du navire. Canots 1, 3, 4 à l’eau.
22:52  Mat. Rask sonne toujours. Il dit que les canots se guident sur la cloche. Commandant pas à la passerelle.
22:58  La cloche sonne encore

(L’écriture s’arrête là. La page a été arrachée proprement, puis pliée tout petit, comme on plie une chose qu’on veut garder longtemps dans un tiroir.)` },
      ferry_logbook: { kind: 'report', title: 'Le journal de pont sur la table à cartes', from: 'Saint Brigid', body:
`21:15  Quai de Halvard. 41 passagers, 17 membres d’équipage. Bancs de brume.
21:30  Sortie du port.

(Une page manque. On voit le bord déchiré dans la reliure. Sur la page suivante :)

23:40  Tous les canots comptés. Un membre d’équipage manquant : le matelot P. Rask, qui a quitté son poste à la cloche vers 22:35.
— H. Aal` },
      ferry_logbookFull: { kind: 'report', title: 'Le journal de pont, avec sa page', from: 'Saint Brigid', body:
`21:40  Brouillard épais. Vitesse réduite à 6 nds. Radar H.S.
22:05  Commandant dans sa cabine (souffrant). 2e lieutenant de quart.
22:10  Signaux de brume à la main. Mat. Rask à la cloche.
22:31  Commandant appelé. N’est pas venu.
22:44  Abordage, bâbord arrière. Voie d’eau.
22:47  Abandon du navire. Canots 1, 3, 4 à l’eau.
22:52  Mat. Rask sonne toujours. Il dit que les canots se guident sur la cloche. Commandant pas à la passerelle.
22:58  La cloche sonne encore.
23:05  La cloche s’est tue.

(La page tient dans la reliure comme si elle n’en était jamais sortie. L’encre de la dernière ligne est humide.)` },
      ferry_radio: { kind: 'printout', title: 'Journal de la radio', from: 'Officier radio', date: '9.11.87', body:
`22:46  MAYDAY envoyé. Position à l’estime.
22:48  Halvard Radio accuse réception. Bateau-pilote Ternen en route.
22:55  Ternen : « Ne vous voyons pas. Entendons votre cloche. Faisons route dessus. »
23:02  Ternen : « Avons deux de vos canots. Entendons toujours la cloche. Continuez de sonner. »
23:05  Ternen : « La cloche s’est arrêtée. Où êtes-vous ? »
23:06  (plus aucune entrée)` },
      ferry_mother: { kind: 'letter', title: 'Une lettre sur un siège du salon', from: 'Elin Rask', date: '4 janvier 1988', body:
`Messieurs de la commission d’enquête,

Vous avez écrit dans votre rapport que mon fils a quitté son poste.

Pim avait seize ans. Il a eu peur du noir jusqu’à onze ans, et il dormait encore avec la lumière du palier allumée. Quand il avait peur, il faisait ce qu’on lui disait, et il le faisait plus fort.

Si quelqu’un lui a dit de sonner cette cloche, il l’a sonnée jusqu’à ce qu’il n’y ait plus de navire sur lequel la sonner.

Je voudrais que son nom soit retiré de votre rapport. Je voudrais qu’il y soit remis dans le bon sens.

Elin Rask` },
      ferry_cabin: { kind: 'card', title: 'Une carte postale sur la couchette', from: 'Margit', body:
`(Une photo du Saint Brigid par une journée d’été, grand pavois.)

Chère tante Ruth,
On traverse dans le brouillard, on ne voit rien ! Le garçon sur le pont sonne une cloche toutes les minutes pour que les autres bateaux sachent qu’on est là. C’est joli et un peu effrayant. Dis à Maman que j’appelle de Halvard.
Margit

(Jamais postée.)` },
      ferry_purser: { kind: 'note', title: 'Liste d’équipage, bureau du commissaire', from: 'Commissaire de bord', body:
`MS SAINT BRIGID — ÉQUIPAGE, HORAIRES D’HIVER 1987

Commandant ............ H. Aal
Second capitaine ...... (en congé)
2e lieutenant ......... T. Solberg
Chef mécanicien ....... K. Moe
2e mécanicien ......... R. Dahl
Officier radio ........ B. Lund
Matelot ............... P. Rask (16) — première saison

(Quelqu’un a dessiné une petite cloche à côté du dernier nom.)` },
      ferry_mess: { kind: 'note', title: 'Tableau de service dans le carré de l’équipage', from: 'T. Solberg', body:
`SEMAINE 45

Radar H.S. depuis le 2/11 — pièces commandées à Bergen.
JUSQU’À RÉPARATION : cloche de brume à la main si visibilité < 1 mille.
Cloche : Rask (toutes les traversées du soir).
Rask : tu sonnes jusqu’à ce que je te dise d’arrêter. Pas jusqu’à ce que tu t’ennuies. Jusqu’à ce que je te le DISE.
— T.S.` },
      wren3: { kind: 'drawing', drawing: 3, title: 'Un dessin glissé dans une couchette', from: 'Wren, 7 ans', body:
`Crayon de cire. Un bateau dans des gribouillis gris de brouillard. À l’avant, un garçon en jaune avec une cloche, la bouche ouverte, qui sonne. En haut du mât, un petit oiseau rouge.

En dessous :
IL N’A PAS ARRÊTÉ` },
    },
    items: {
      bridgeKey: { name: 'Clé de la passerelle', desc: 'Une clé en laiton sur un flotteur en liège. De la cabine du commandant.' },
      davitKey: { name: 'Clé de bossoir', desc: 'Une clé en T marquée CANOTS. Elle libère le frein du treuil.' },
      crank: { name: 'Manivelle du treuil', desc: 'Une lourde manivelle en acier à poignée de bois. Pour descendre un canot à la main.' },
      logPage: { name: 'Page de journal arrachée', desc: 'Pliée tout petit. 9 novembre 1987, de 21:40 à 22:58.' },
    },
    obj: {
      ferry_start: 'Trouve un moyen de quitter le navire',
      ferry_bridge: 'Récupère la clé de bossoir à la passerelle',
      ferry_captain: 'Fouille la cabine du commandant pour trouver la clé de la passerelle',
      ferry_logbook: 'Remets la page arrachée dans le journal de bord, à la passerelle',
      ferry_key: 'Prends la clé de bossoir à la passerelle',
      ferry_crank: 'Trouve la manivelle du treuil dans la salle des machines',
      ferry_lower: 'Mets le canot 2 à l’eau',
    },
    mono: {
      ferry_start: 'Un bateau. Un brouillard si épais que je ne vois pas le bastingage. Et le pont penche.',
      ferry_winch: 'Le canot 2. Le treuil demande une clé de bossoir et une manivelle. La clé sera à la passerelle.',
      ferry_winch2: 'Il me faut toujours la clé et la manivelle.',
      ferry_winchNoCrank: 'La clé est mise. La manivelle n’est pas sur le pont. L’avis disait salle des machines.',
      ferry_winchNoKey: 'J’ai la manivelle. Le frein est toujours bloqué : la clé de bossoir.',
      ferry_brake: 'Le frein ne lâche pas. Comme si le navire n’en avait pas fini avec moi.',
      ferry_pageAfter: 'Il n’était pas à la passerelle. Il était dans sa cabine avec une bouteille, et le garçon a sonné cette cloche pendant une heure.',
      ferry_logbookGap: 'Il manque une page. Arrachée à 21:40.',
      ferry_claimed: 'Voilà. C’est là qu’elle va.',
      ferry_bell: 'La cloche du bord. Elle sonne comme si elle attendait quelqu’un.',
      ferry_bellAfter: 'Elle est tiède. Il y avait la main de quelqu’un sur cette corde.',
      ferry_bridgeKey: 'La clé de la passerelle. Sous son oreiller. Évidemment.',
      ferry_davitKey: 'CANOTS. La clé de bossoir.',
      ferry_crank: 'La manivelle. L’eau vient de bouger. Toute l’eau, d’un coup.',
      ferry_lower: 'Accroche-toi. Accroche-toi à quelque chose.',
      ferry_end: 'Il sonne toujours. Régulier, comme une horloge. Pour que les canots trouvent leur chemin.',
      ferry_bridgeLocked: 'La passerelle est fermée à clé. Le commandant doit avoir une clé.',
      ferry_passengers: 'Ils dormaient. Tous, ils dormaient, et maintenant ils sont debout.',
      ferry_drowned: 'Quelque chose est sorti de l’eau. Les mains d’abord.',
      ferry_lounge: 'Le salon. Des gilets de sauvetage sur chaque siège. Personne n’a bougé quand je suis entrée.',
      ferry_engineRoom: 'La salle des machines est inondée jusqu’aux genoux. L’eau est parfaitement calme.',
      ferry_fore: 'La cloche est par ici, quelque part. Je l’entends respirer dans le vent.',
    },
    lines: {
      ferry_winchGo: 'Tourner le treuil et descendre le canot 2 (maintenir)',
      ferry_winchLook: 'Treuil du canot 2',
      ferry_logbookPut: 'Remettre la page',
      ferry_logbookRead: 'Lire le journal de bord',
      ferry_bellPrompt: 'Sonner la cloche',
      ferry_pagePrompt: 'Une page pliée dans le tiroir',
      ferry_bridgeUnlock: 'Ouvrir la passerelle',
    },
    radio: {
      ferry_otto1: [
        ['radio', '[parasites, et dessous, très faible, une cloche]'],
        ['otto', 'Neuf à Ada. Vous êtes passée. Où êtes-vous ?'],
        ['ada', 'Sur un bateau. Dans le brouillard. Il coule.'],
        ['otto', 'Le Saint Brigid. J’en ai toute une étagère : des gilets de sauvetage, un jeu d’échecs, quarante et un parapluies. Il a coulé en 1987.'],
        ['ada', 'Comment je descends ?'],
        ['otto', 'Sur chaque étagère, une chose n’est pas à sa place. Un mensonge avec un numéro de page. Remettez-le, et l’endroit vous lâche. Ensuite, prenez les canots comme une personne raisonnable.'],
      ],
      ferry_bellman: [
        ['otto', 'Vous avez rencontré l’homme à la cloche. Ne le laissez pas vous la mettre dessus. Il la sonne pour que vous sachiez où il est. Soyez-en reconnaissante. La plupart ne le font pas.'],
      ],
      ferry_otto2: [
        ['otto', 'Quelque chose vient de bouger sur mes étagères. Un dossier. Rask, P. Il était classé sous « poste abandonné ». Il n’y est plus.'],
        ['ada', 'Où est-il maintenant ?'],
        ['otto', 'Sous « retrouvé ». Ce n’est pas moi qui l’y ai mis.'],
      ],
    },
    recap: {
      ferry: 'Le Saint Brigid, dans le brouillard. Le commandant Aal a dit que le garçon à la cloche de brume avait paniqué et fui. La page qu’Aal avait arrachée à son propre journal disait qu’il était ivre dans sa cabine pendant que Pim Rask, seize ans, ramenait les canots à la cloche. J’ai remis la page. Quand le canot 2 a touché l’eau, la cloche s’est remise à sonner.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
