/* Français — Niveau 255 (La Maison) et niveau 256 (Écran de la mort). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'La Maison', place: 'Le jeu lui-même',
        intro: 'Hungry House, vu de l’intérieur. Des murs dont les joints brillent comme un écran, des étoiles qui flottent à hauteur de hanche et, au milieu, la maison des Spectres, dont la porte est tenue fermée par quatre lanternes.\n\nTu connais ce plateau mieux que ta propre chambre. Tu y as joué dix mille fois. Il attendait que tu y joues une fois de plus.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Écran de la mort', place: 'La moitié que personne n’était censé voir',
        intro: 'La moitié gauche du plateau, c’est la maison que tu connais. La moitié droite, ce sont des lettres, des chiffres et des couleurs qui se sont détachés et flottent dans l’air.\n\nQuelque part au cœur, quelque chose est encore branché.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Des lettres lumineuses sur le mur du labyrinthe', from: 'W.', body:
`SI TU PEUX LIRE CECI,
TU ES DANS MON JEU.
PARDON.
MANGE LES ÉTOILES.
NE FAIS PAS DE MAL AUX SPECTRES.
—W.` },
      maze_rules: { kind: 'wall', title: 'Une plaque, froide comme la pierre', body:
`RÈGLES DE LA MAISON

1. Le Joueur mange.
2. Les Spectres poursuivent.
3. Le plateau est vidé.
4. Le plateau suivant commence.
5. Il n’y a pas de règle cinq.` },
      maze_house: { kind: 'note', title: 'Sur la porte de la maison des Spectres', from: 'Eddie', body:
`Quatre lanternes tiennent le rideau fermé. Une dans chaque coin.

La maison, c’est le chemin vers le bas. Le dernier chemin vers le bas.

On se retrouve de l’autre côté. —E.` },
      maze_fruit: { kind: 'memory', title: 'Le bonbon — un souvenir', body:
`La première fois que Lily a eu le bonus bonbon, elle a crié si fort que Walt a lâché son café.

« Papa ! Le BONBON ! J’ai eu le BONBON ! »

Après ça, il mettait une pièce pour elle tous les samedis et restait derrière elle pendant toute la partie, sans jamais lui dire une seule fois par où aller.` },
      ks_glitch1: { kind: 'wall', title: 'Des caractères cassés suspendus dans l’air', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'Un fichier de sauvegarde corrompu', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: 'La dernière lettre de Walt', from: 'W. (je crois que c’est mon nom)', date: 'Un jour qu’on ne pouvait pas compter', body:
`À qui atteindra le cœur.

La prise est ici. Débranchée de l’intérieur, ce n’est pas un meurtre, c’est une fin. GAME OVER. Tous ceux qui sont encore eux-mêmes rentrent chez eux.

Mais elle ne bouge pas pour une seule paire de mains. Le jeu a commencé avec cinq mains sur le joystick. Il finit avec cinq. Et les quatre doivent se souvenir de qui ils sont, sinon leurs mains ne sont que de la lumière.

J’ai essayé seul, ma première nuit ici. Le jeu l’a pris pour un coup et a fait de moi son Joueur. C’est ce que je suis maintenant.

Une main a lâché à 3 h 16. Depuis, le jeu attend cette main-là.

Dis à Nora que je suis désolé. Dis à Ruth qu’elle avait raison. Dis au tableau de garder le score de Lily.

—W.` },
      ks_eddie: { kind: 'note', title: 'Un mot épinglé à côté de l’EXIT', from: 'Eddie', body:
`Un qui entre, un qui sort.

J’ai trouvé cette porte ma première semaine. Dehors, ça fait un an et demi. Ici, on dirait une seule nuit, très longue.

Pardon, Sam.` },
    },
    obj: {
      maze_pellets: 'Prendre les lanternes dans les quatre coins ({n}/4)',
      maze_house: 'Entrer dans la maison des Spectres',
      ks_core: 'Atteindre le cœur du côté cassé',
      ks_choice: 'Choisir : la porte EXIT ou la prise',
    },
    mono: {
      maze_start: 'C’est… le jeu lui-même. Je suis dedans.',
      maze_rules: 'Qui mange les étoiles ? Moi.',
      maze_house: 'Le rideau est tombé. Il y a une porte dans la maison.',
      ks_start: 'Le côté droit est… cassé. Des lettres suspendues dans l’air.',
      ks_core: 'Le cœur. Il y a une énorme prise ici. La prise de la borne. Vue de l’intérieur.',
      ks_exit: 'EXIT. Une vraie, cette fois. Je sens du vent.',
      ks_plugTry: 'Elle ne bouge pas. Pas pour deux mains. Il en faut cinq.',
      ks_plugReady: 'Quatre lumières colorées viennent à mes côtés. Rouge, violette, turquoise, ambrée.',
    },
    lines: {
      maze_portal: 'Descendre au niveau qu’on ne peut pas compter',
      maze_fruitTake: 'Prendre le bonbon',
      ks_plug: 'DÉBRANCHER LA PRISE',
      ks_plugTry: 'Essayer de débrancher la prise',
      ks_exitGo: 'Passer l’EXIT',
      ks_exitHold: 'Tenir la porte pour Eddie',
      ks_missing: '(Il manque : {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'Ça y est. Niveau deux cent cinquante-cinq. Le dernier plateau avant le cassé.'],
        ['eddie', 'Prends les coins. Je t’attendrai en bas.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Je suis là. Pas à la radio. Là. Près de la porte, à droite.'],
        ['eddie', 'Viens me trouver. S’il te plaît.'],
      ],
      ks_plea: [
        ['eddie', 'C’est la vraie. Le vent, la pluie, Front Street. La maison.'],
        ['eddie', 'Elle en laisse sortir un et en garde un. Je l’ai trouvée ma première semaine. Depuis, je me tiens à côté.'],
        ['sam', 'Tu allais me laisser l’ouvrir et passer toi-même.'],
        ['eddie', 'Hope a quinze mois, Sam. Je ne l’ai jamais prise dans mes bras. [Sa voix se brise.] Je ne te demande pas de me pardonner. Je te demande de tenir la porte.'],
      ],
      ks_pleaTrust: [
        ['eddie', 'C’est la vraie. Le vent, la pluie, Front Street. La maison.'],
        ['eddie', 'Je t’ai dit au motel que je ne demanderais pas. Alors je ne demande pas.'],
        ['sam', 'Mais tu en as envie.'],
        ['eddie', 'À chaque seconde. [Une longue respiration.] Va d’abord au cœur, Sam. S’il y a un autre moyen, c’est là-bas. S’il n’y en a pas… je serai toujours là.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
