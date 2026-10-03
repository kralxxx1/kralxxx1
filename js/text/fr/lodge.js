/* Français — Chapitre 5 : Jour blanc (Berghotel Weisshorn). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      lodge: {
        name: 'CHAPITRE 5', title: 'Jour blanc', place: 'Berghotel Weisshorn, à 2 914 mètres',
        intro: 'Lundi 28 février 1983, après la tombée de la nuit. Tempête sur la montagne.\n\nCe matin-là, la vallée a envoyé un télégramme à l’hôtel tout en haut du téléphérique. Dans l’après-midi, cinq clients et leur moniteur de ski étaient sous la neige à la gare d’arrivée. L’hôtel dit qu’aucun télégramme n’est arrivé.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'Le livre d’or', from: 'Berghotel Weisshorn', date: 'Février 1983', body:
`26.2.  Fam. Aebi (3)          chambre 4
26.2.  M. et Mme Coulter      chambre 2
27.2.  R. Fankhauser          chambre 1
27.2.  L. Brunner (école de ski, personnel)

Départs :
Mme Coulter — 2.3., par le traîneau de la vallée.
(Tous les autres noms ci-dessus ont été rayés le 28.2., d’un seul trait net, avec un autre stylo.)` },
      lodge_weather: { kind: 'report', title: 'Le cahier météo sur le bureau', from: 'G. Imhof', date: '28 février 1983', body:
`06.30  Forte neige depuis 3 h. Vent NO 60.
07.10  Ligne téléphonique coupée (comme d’habitude).
08.15  Le traîneau postal monté de la gare. Courrier, lait et pain.
09.20  Téléphérique en marche. École de ski en haut à 9 h 30 comme chaque jour. Semaine complète, toutes les chambres prises, la première semaine complète depuis 1979.

(La ligne de 08.15 a été repassée deux fois au crayon, comme si quelqu’un s’y était arrêté.)` },
      lodge_telegram: { kind: 'telegram', title: 'Un télégramme, brûlé sur les bords', from: 'Gare de la vallée, service des avalanches', date: '28.2.83 07.55', body:
`À BERGHOTEL WEISSHORN STOP
DANGER D’AVALANCHE 5 STOP PENTES SUPÉRIEURES CHARGÉES STOP
FERMEZ PISTES SUPÉRIEURES ET GARE D’ARRIVÉE AUJOURD’HUI STOP
PAS DE SKI AU-DESSUS DE L’HÔTEL STOP
CONFIRMEZ PAR RETOUR STOP
SERVICE DES AVALANCHES

(Au dos, d’une main soignée : « Reçu 8 h 15. — G.I. » Le reste est de la suie. Il aurait dû brûler. Il n’a pas brûlé.)` },
      lodge_menu: { kind: 'notice', title: 'La carte du petit-déjeuner sur une table', from: 'Berghotel Weisshorn', body:
`LUNDI 28 FÉVRIER
Café — Thé — Chocolat chaud
Birchermüesli
Rösti à l’œuf au plat
Pain de la vallée, beurre, miel des abeilles de l’hôtel

Ce soir : fondue sur la terrasse si le temps le permet !
L’école de ski se retrouve à 9 h 30 à la gare d’arrivée. Leo dit : apportez vos lunettes.` },
      lodge_postcard: { kind: 'card', title: 'Une carte postale sur la table de nuit, chambre 1', from: 'Ruth Fankhauser', body:
`(Une photo de l’hôtel au soleil, une cabine du téléphérique qui monte en flottant à côté.)

Chère Hanni,
Il neige comme à la fin du monde. On dit que la descente depuis le sommet est la plus belle de la vallée, et on monte demain matin, tempête ou pas. Leo, le moniteur, rit de tout. Je suis heureuse. J’appelle dimanche.
R.

(Timbrée, jamais postée.)` },
      lodge_roomNote: { kind: 'note', title: 'Un mot d’enfant dans la chambre 4', from: 'Lisa Aebi, 10 ans', body:
`Maman dit que s’il y a trop de vent, on peut rester dedans et jouer aux cartes avec Mme Imhof.
Mme Imhof dit qu’ici le vent, ce n’est rien.
J’ai demandé si la neige pouvait tomber de la montagne. Elle a dit pas cette semaine.` },
      lodge_school: { kind: 'notice', title: 'Feuille d’inscription de l’école de ski', from: 'L. Brunner', date: '28.2.83', body:
`ÉCOLE DE SKI — GARE D’ARRIVÉE 9 H 30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Moniteur : Leo Brunner
(Dessous, au crayon :) Greta dit que tout va bien d’après la vallée. Parfait. C’est parti.` },
      lodge_kitchenNote: { kind: 'note', title: 'Punaisé près de la chambre froide', from: 'Greta Imhof', date: '28.2.83', body:
`Anton —
Si la vallée appelle ou si le traîneau monte quoi que ce soit du service des avalanches, ça vient à MOI, pas aux clients et pas à Leo. Je m’en occupe.
Une semaine complète. On a besoin de cette semaine.
Le passe du téléphérique est au crochet près de la chambre froide. Personne ne le prend à part moi ou toi.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'De l’enquête, une coupure de presse', from: 'Journal de la vallée', date: 'Avril 1983', body:
`WEISSHORN : L’HÔTELIÈRE AFFIRME N’AVOIR REÇU AUCUNE ALERTE

La propriétaire du Berghotel Weisshorn, Mme Greta Imhof (52 ans), a déclaré hier devant la commission d’enquête qu’aucune alerte d’avalanche n’était parvenue à l’hôtel le 28 février. La ligne téléphonique était coupée depuis 7 h et « le traîneau postal n’a monté que le courrier », a-t-elle dit.

Le service des avalanches maintient qu’un télégramme a été envoyé avec le traîneau de 8 h 15. Aucune copie n’a été retrouvée à l’hôtel.

Cinq clients et le moniteur de ski Leo Brunner (29 ans) ont péri quand les pentes supérieures sont parties à 14 h 40.` },
    },
    items: {
      telegram: { name: 'Télégramme', desc: 'Brûlé sur les bords, et encore lisible. Reçu 8 h 15.' },
      masterKey: { name: 'Passe', desc: 'Une lourde clé sur une plaque en bois : SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Mets-toi à l’abri de la tempête',
      lodge_find: 'Découvre ce qui s’est passé au Weisshorn',
      lodge_telegram: 'Trouve le télégramme qui n’est jamais arrivé',
      lodge_pin: 'Épingle le télégramme sur le tableau de la réception',
      lodge_key: 'Prends le passe dans la cuisine',
      lodge_power: 'Démarre le téléphérique dans la salle des machines',
      lodge_board: 'Monte dans la cabine',
    },
    mono: {
      lodge_start: 'Je ne vois pas ma propre main. Il y a une lumière. Un bâtiment.',
      lodge_inside: 'Il fait chaud. Un feu brûle, et personne pour l’entretenir.',
      lodge_cold: 'J’ai tellement froid. Il faut que je rentre.',
      lodge_colder: 'Je ne sens plus mes doigts.',
      lodge_warm: 'Il fait chaud. Oh, c’est mieux.',
      lodge_frozen: 'Ils sont à leurs tables. Tout blancs. Personne n’a bougé depuis longtemps.',
      lodge_frozenMove: 'Celui près de la fenêtre a bougé. Quand je suis venue au feu, il a bougé.',
      lodge_board: 'Une punaise, et le coin déchiré de quelque chose qui était affiché ici.',
      lodge_book: 'Six d’entre eux rayés le vingt-huit. Tous avec le même stylo, tous d’un seul coup.',
      lodge_stove: 'Des cendres froides. Et dedans, quelque chose qui n’a pas brûlé.',
      lodge_telegram: '« Fermez pistes supérieures. » Elle l’avait à huit heures et quart. Ils sont montés à neuf heures et demie.',
      lodge_pinned: 'Voilà. Là où tout le monde aurait pu le lire.',
      lodge_claimed: 'Le vent est tombé. Le temps d’un souffle. Comme si la montagne écoutait.',
      lodge_stationLit: 'Des lumières, au loin sur la neige. La gare du téléphérique.',
      lodge_key: 'Le passe.',
      lodge_cook: 'Il y a quelqu’un dans la cuisine. Un grand homme. Quelque chose à la main.',
      lodge_prints: 'Des empreintes. Qui se forment. Là, maintenant, devant moi.',
      lodge_power: 'Il tourne. La cabine est éclairée.',
      lodge_noKey: 'Il faut une clé.',
      lodge_notYet: 'Le moteur ne démarre pas. Pas tant que l’endroit me tient encore.',
      lodge_boarding: 'Les portes. Fermez-vous. Fermez-vous, s’il vous plaît.',
      lodge_away: 'On bouge. On descend dans le néant.',
      lodge_office: 'Son bureau. La porte du poêle pend, ouverte.',
      lodge_station: 'La gare. Le câble part dans le blanc et cesse simplement d’être là.',
    },
    lines: {
      lodge_bookPrompt: 'Le livre d’or',
      lodge_boardPrompt: 'Le tableau des télégrammes',
      lodge_boardPin: 'Épingler le télégramme',
      lodge_stovePrompt: 'Le sortir des cendres (maintenir)',
      lodge_controlPrompt: 'Démarrer le téléphérique (maintenir)',
      lodge_controlLook: 'Pupitre de commande',
      lodge_gondolaPrompt: 'Monter dans la cabine',
      lodge_gondolaLook: 'La cabine',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[du vent par-dessus les parasites]'],
        ['otto', 'Neuf à Ada. Vous faites beaucoup de bruit. C’est une tempête ? Le Weisshorn, alors. J’ai six paires de skis sur mon étagère et un service à fondue qui n’a jamais servi.'],
        ['ada', 'Il y a des gens ici. Gelés à leurs tables.'],
        ['otto', 'Alors ne restez pas près du feu. Ils viennent à la chaleur. Et dehors, écoutez les pas qui ne sont pas les vôtres.'],
      ],
      lodge_otto2: [
        ['otto', 'Quelque chose a quitté mon étagère. Un télégramme. Il est à sa place maintenant. Je suis presque sûr d’avoir entendu des skis.'],
      ],
    },
    recap: {
      lodge: 'Le Weisshorn, 28 février 1983. Greta Imhof avait l’alerte d’avalanche en main à huit heures et quart, l’a mise dans son poêle pour que la semaine complète ne soit pas annulée, et a envoyé l’école de ski en haut à neuf heures et demie. Cinq clients et leur moniteur sont morts à la gare d’arrivée ; elle a dit à l’enquête qu’aucune alerte n’était venue. Le télégramme n’a jamais brûlé. Je l’ai épinglé là où tout le monde pouvait le lire, et le téléphérique m’a descendue hors de la tempête.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
