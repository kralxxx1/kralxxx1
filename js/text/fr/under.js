/* Français — Chapitre 1 : Non réclamé (Niveau 256, le Dessous). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      under: {
        name: 'CHAPITRE 1', title: 'Non réclamé', place: 'Niveau 256',
        intro: 'L’ascenseur est descendu longtemps. Plus longtemps que la gare n’est profonde. Plus longtemps que la ville n’est vieille.\n\nLes portes se sont ouvertes sur des pièces jaunes qui sentent la moquette mouillée et les parapluies des autres. Quelque part là-dedans, un bourdonnement. Quelque part là-dedans, tout ce que personne n’est revenu chercher.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'Une étiquette de bagage sur la moquette', body:
`SI TROUVÉ, MERCI DE RENDRE À :
M. STRAND, 8 ANS
CINÉ-PARC PINEWOOD, RANGÉE 5

(Une écriture d’enfant. La ficelle a été rongée.)` },
      under_umbrella: { kind: 'card', title: 'Une étiquette attachée à un parapluie', from: 'O.B.', body:
`Objet 41 207.
Un parapluie, noir, homme.
Laissé avec regret.

Objet 41 208.
Un gant, gauche. N’appartenant encore à personne.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'Une lettre dans la valise d’une jeune fille', from: 'Maman', date: '12 décembre 1990', body:
`Lina —

Quand tu auras acheté ton billet, garde-le dans la poche INTÉRIEURE de ton manteau. Pas celle de l’extérieur. Ne le sors pas pour le regarder dans le train, tu sais comment tu es.

Nordvik est le terminus, six heures et quart. Papa t’attendra sur le quai avec la voiture, quoi que tu dises du noir. Ne descends nulle part avant.

Ne laisse personne te dire que tu n’as pas ta place dans ce train.

Je t’embrasse, Maman` },
      under_chalk: { kind: 'wall', title: 'De la craie sur le mur', body:
`LES PLATS SORTENT DU MUR
QUAND TU TOURNES LE DOS
ALORS NE LE FAIS PAS
— O.` },
      under_otto1: { kind: 'diary', title: 'Le carnet de camp d’Otto', from: 'Otto Brandt', body:
`J’ai arrêté de compter les jours. Je compte les objets à la place. 41 212 aujourd’hui : un chapeau, un appareil auditif, une laisse sans chien.

Le talkie-walkie marche sur le canal neuf. Personne ne répond. Je parle quand même. Ça garde la voix en état.

Ce matin, une note est arrivée par le sol. Signée A. « Quelqu’un vient. Sois gentil avec elle ; elle ne te croira pas. »

Je suis toujours gentil. C’est croire qui donne du mal aux gens.` },
      under_list: { kind: 'note', title: 'Règles de l’étage de tri (provisoires)', from: 'O.B.', body:
`1. Les lumières perdues sont faites pour être gardées, pas mangées. Quelque chose ici n’est pas d’accord.
2. Quand le bourdonnement devient plus grave et que les lampes bégaient, arrête de marcher. Ça entend. Ça ne voit pas.
3. Il ne faut pas se fier au papier peint.
4. La porte de l’Index prend quatre lumières. Je n’en ai jamais trouvé plus de trois à la fois.
5. Ne te classe pas toi-même.
— O.B.` },
      under_puddle: { kind: 'note', title: 'Une page humide près de l’eau', from: 'O.B.', body:
`L’eau de cette pièce est froide et a un goût de lac. Chaque pièce ici appartient au pire après-midi de quelqu’un.

Celle-ci appartient à quelqu’un que je n’ai pas encore rencontré.` },
      under_index: { kind: 'wall', title: 'Peint au pochoir à côté de la porte', body:
`L’INDEX
MERCI DE PRÉPARER VOTRE RÉCLAMATION` },
      wren2: { kind: 'drawing', drawing: 2, title: 'Un dessin sous un radiateur', from: 'Wren, 7 ans', body:
`Crayon de cire. Une pièce jaune. Une grosse chose ronde avec une bouche pleine de dents. Au-dessus, qui vole : un petit oiseau rouge.

En dessous :
IL MANGE LES LUMIÈRES
L’OISEAU EST PLUS RAPIDE` },
    },
    items: {},
    obj: {
      under_walkie: 'Trouve un chemin à travers les pièces jaunes',
      under_lights: 'Trouve les lumières perdues ({n}/4)',
      under_index: 'Apporte quatre lumières à la porte de l’Index',
      under_leave: 'Franchis la porte de l’Index',
    },
    mono: {
      under_start: 'Ce n’est pas le sous-sol. L’ascenseur est descendu pendant quatre minutes. La gare n’est pas si profonde.',
      under_walkie: 'Un talkie-walkie, scotché sur le canal neuf. Quelqu’un l’a laissé allumé.',
      under_light1: 'Une petite lampe. Chaude. Un instant, tout ce qui était dans le noir s’est tu, comme s’il retenait son souffle.',
      under_light4: 'Quatre. Quelque part à l’autre bout de l’étage, quelque chose a cessé de mâcher.',
      under_indexSeen: 'L’INDEX. Quatre douilles vides à côté de la porte.',
      under_wpSeen: 'C’était dans le mur. C’était le mur. Et ça a bougé quand je me suis retournée.',
      under_eaterSeen: 'Trop gros pour le couloir. Pâle. Il mâche.',
      under_humNear: 'Le bourdonnement vient de baisser d’un ton. Les lumières bégaient.',
    },
    lines: {
      under_slots: 'Quatre douilles ({n}/4 lumières)',
      under_place: 'Placer les lumières dans les douilles',
      under_walkiePrompt: 'Prendre le talkie-walkie',
      under_lightPrompt: 'Prendre la lumière perdue',
    },
    radio: {
      under_otto1: [
        ['radio', '[parasites]'],
        ['otto', '...neuf. Ici neuf. Il y a quelqu’un sur la ligne ? Je vous entends respirer. Ce n’est pas un reproche.'],
        ['ada', 'Qui est là ?'],
        ['otto', 'Brandt. Dépôt 9, guichet de nuit. Et vous êtes sur mon étage de tri sans ticket.'],
        ['ada', 'Otto Brandt ? Vous avez disparu en 1964.'],
        ['otto', '1964. Est-ce que... non. Vous me direz plus tard. Comment vous appelez-vous, collègue ?'],
        ['ada', 'Ada. Ada Lind. J’ai votre poste.'],
        ['otto', 'Alors vous avez ma sympathie. Écoutez, Ada Lind. C’est ici que va tout ce que personne n’est revenu chercher. C’est très grand, et ce n’est pas vide.'],
        ['otto', 'Il y a une porte. La porte de l’Index. Elle veut quatre des lumières perdues, des petites lampes, vous les reconnaîtrez. Apportez-en quatre et elle s’ouvre.'],
        ['ada', 'Et derrière la porte ?'],
        ['otto', 'D’autres étages. Des étagères, je les appelle. Une note disait que vous alliez venir. Signée A. Vous connaissez une A. ?'],
        ['ada', '...Non.'],
        ['otto', 'Moi non plus. Gardez le canal ouvert.'],
      ],
      under_lights: [
        ['otto', 'Vous en avez trouvé une. Gardez-la près de vous. Quelque chose ici les mange, et tant que vous en tenez une fraîche, il a peur de vous.'],
        ['ada', 'Combien de temps ?'],
        ['otto', 'Pas longtemps. Rien ici n’a peur longtemps.'],
      ],
      under_wallpaper: [
        ['otto', 'Vous avez déjà vu les hommes plats ? Dans le papier peint. Ils s’en détachent quand vous avez le dos tourné.'],
        ['ada', 'Et quand je les regarde ?'],
        ['otto', 'Alors ce sont du papier peint. Du papier peint très patient.'],
      ],
      under_hum: [
        ['otto', 'Si le bourdonnement devient plus grave et que les lampes bégaient, arrêtez-vous. Quelque chose se tient là. Il ne vous voit pas. Il entend vos chaussures.'],
        ['ada', 'Qu’est-ce que c’est ?'],
        ['otto', 'Je l’ai classé dans « divers ». C’est une grande catégorie.'],
      ],
      under_eater: [
        ['otto', 'Ada. Ce bruit. Il est réveillé.'],
        ['otto', 'Le Dévoreur. La plus vieille chose ici. Il mange ce dont personne ne veut. Ne le laissez pas décider que c’est vous. Courez vers la porte de l’Index. Prenez les angles ; dans les angles, il est lent.'],
      ],
      under_index: [
        ['otto', 'La porte de l’Index. Quatre douilles. Je n’ai jamais trouvé plus de trois lumières à la fois. Vous aurez peut-être plus de chance.'],
      ],
      under_open: [
        ['otto', 'Elle est ouverte. Je ne l’avais jamais vue ouverte.'],
        ['ada', 'Venez avec moi.'],
        ['otto', 'Je ne peux pas. Je ne sais pas pourquoi. Je crois que je suis classé à cet étage. Allez-y. Je serai sur le neuf.'],
        ['otto', 'Au fond de chaque étagère, en dessous, il y a un mensonge, Ada. Cherchez le mensonge.'],
      ],
      under_badge: [
        ['ada', 'Otto. Je vous ai apporté quelque chose à vous. De votre bureau. Je le laisse dans la porte.'],
        ['otto', '[un long silence]'],
        ['otto', 'O. Brandt. Otto. C’était ça, le nom. Je l’avais posé quelque part et j’avais oublié où.'],
        ['otto', 'Merci, Ada. Laissez-le là. Maintenant, je saurai où il est.'],
      ],
    },
    recap: {
      under: 'Niveau 256 : des pièces jaunes pleines de choses que personne n’est revenu chercher. Otto Brandt est vivant, là en bas, sur le canal neuf ; il croit que ça fait à peu près un an. J’ai donné quatre lumières perdues à la porte de l’Index pendant que quelque chose de rond et de très vieux se réveillait derrière moi.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
