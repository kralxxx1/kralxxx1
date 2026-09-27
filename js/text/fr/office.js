/* Français — Niveau 4 : Harlow Mutual (Rosie). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      office: {
        name: 'LEVEL 4', title: 'Harlow Mutual', place: 'Le souvenir de Rosie — Keystone Building, 3e étage',
        intro: 'Des open spaces, des écrans verts, du café froid. Un téléphone sonne. Puis un autre. Puis tous s’arrêtent d’un coup.\n\nRosie faisait ses devoirs ici tous les soirs pendant que sa mère finissait tard, et elle parlait dans un magnétophone pour que le bureau paraisse moins vide.',
      },
    },
    docs: {
      office_lily4: { kind: 'drawing', drawing: 4, title: 'Un dessin dans une chemise marquée « LIL — À GARDER »', from: 'Lily, 9 ans', body:
`Crayon gras. Un grand immeuble avec plein de fenêtres. À l’une d’elles, une fille avec un casque parle dans un micro. Des notes de musique s’envolent au-dessus de toute la ville.

ROSIE VA PASSER À LA RADIO.
(ROSIE ME RACOMPAGNE DE L’ARCADE DES FOIS.)
ELLE ME LAISSE CHOISIR LES CHANSONS.` },
      office_intro: { kind: 'notice', title: 'Panneau sur la porte du poste de sécurité', from: 'Services généraux', body:
`POSTE DE SÉCURITÉ
Code modifié en avril 1987 conformément au règlement de l’entreprise.
Chaque chef de service a reçu UN chiffre.
N’écrivez pas votre chiffre.

(Quatre personnes différentes ont écrit leur chiffre quelque part à cet étage.)` },
      office_clue1: { kind: 'printout', title: 'Une note de service oubliée dans l’imprimante', from: 'Services généraux', date: '2 avril 1987', clue: 1, body:
`À : Service sinistres
DE : Services généraux

Votre chiffre du nouveau code de sécurité est : 1
C’est le PREMIER chiffre.

Veuillez le mémoriser et détruire cette note.

(Personne n’a détruit cette note.)` },
      office_clue2: { kind: 'screen', title: 'Terminal : CODE.TXT', from: 'Terminal de bureau', clue: 2, body:
`C:\\> TYPE CODE.TXT

CODE DU POSTE DE SÉCURITÉ
POSITION 2 = 0
POSITIONS 3 ET 4 : demander à Carol, aux sinistres.
De toute façon, elle sait tout.

C:\\> _` },
      office_clue3: { kind: 'wall', title: 'Tableau blanc de la salle de pause', from: 'Rosie', clue: 3, body:
`ROSIE RADIO
10_.3 FM
LA SEULE STATION QUI PASSE
CE QUE TU AS BESOIN D’ENTENDRE

chiffre manquant = mon chiffre porte-bonheur = 7
(Maman dit que j’ai pas le droit de mettre ma station dans le code. Trop tard !)` },
      office_clue4: { kind: 'phone', title: 'Messagerie, poste 1073', from: 'Carol, service sinistres', clue: 4, body:
`[Bip.]

CAROL : Rosie, ma chérie, c’est maman. Je suis coincée en réunion sinistres, ça déborde encore.

CAROL : Si les services généraux appellent pour le code, dis-leur que le dernier chiffre est trois. Trois, comme nous trois : toi, moi et le micro-ondes.

CAROL : Ne mange pas tous les crackers du distributeur. Je t’aime. Les devoirs avant la radio.

[Bip.]` },
      office_carol: { kind: 'note', title: 'Mot sur le frigo de la salle de pause', from: 'Carol, la mère de Rosie', date: 'Avril 1987', body:
`R —

La réunion déborde encore. Le dîner est au congélateur, la boîte au couvercle bleu. Sept minutes, pas dix.

Les devoirs AVANT la radio.

Je suis fière de toi. Je sais que je ne le dis pas. Je le dis sur le frigo.

—Maman` },
      office_tracklist: { kind: 'card', title: 'Une jaquette de cassette', from: 'Rosie', date: 'Avril 1987', body:
`OPÉRATION 256 — COMPILATION OFFICIELLE

FACE A : POUR CETTE NUIT
1. Neon Hearts — The Arcadians
2. Kill Screen Boogie — DJ Lantern
3. Midnight at the Starlight — Rosie (en direct de la salle de pause)
4. Don’t Look Back — Harbor Lights

FACE B : POUR APRÈS
(vierge — on l’enregistre quand on aura gagné)` },
      office_rosie_tape: { kind: 'tape', title: 'Cassette : « Rosie Radio, en direct »', from: 'Le magnétophone de Rosie', date: '14 et 17 avril 1987', body:
`[Clic. Bourdonnement des néons. Un micro-ondes qui décompte.]

ROSIE : Bonsoir, Harlow ! Ici Rosie Radio, cent-sept-trois, en direct de la salle de pause de Harlow Mutual, là où le café est brûlé et l’avenir radieux.

ROSIE : [plus bas] Des fois je parle dans ce truc pendant une heure et personne n’entend. C’est pas grave. C’est agréable de faire comme si quelqu’un écoutait.

[La bande grésille et saute. Maintenant : la pluie sur la vitre, la musique des bornes, un ventilateur. Le compteur indique 12:40.]

ROSIE : [chuchotant] Rosie Radio, en direct du Starlight après la fermeture. Niveau deux cent douze. Danny tient le joystick et il transpire.

[Trois coups contre une porte en métal.]

NELL : Il y a quelqu’un derrière.

TOBY : [en train de courir] Je le savais ! Je le SAVAIS !

[Un verrou coulisse. La pluie devient forte.]

ROSIE : Tiens, tiens, tiens. Regardez qui revient en rampant.

TOBY : [riant, presque en larmes] Te voilà !

ROSIE : Dis bonjour à Harlow, espèce d’andouille—

[Clic. La bande s’arrête là.]` },
      office_walt5: { kind: 'diary', title: 'Le journal de Walt', from: 'Walt', date: 'À l’intérieur, jour ?', body:
`La violette est toujours là où je m’apprête à aller. Elle me lit comme une carte.

Rosie faisait pareil à la borne. Elle se mettait derrière Danny et chuchotait : « gauche, gauche, maintenant attends, maintenant VAS-Y. » Il n’a jamais admis qu’il l’écoutait.

Aujourd’hui je suis allé à gauche. Elle y était déjà. Elle ne m’a pas touché. Elle m’a juste regardé, comme si elle était désolée.` },
      office_eddie_page: { kind: 'note', title: 'Une page arrachée, froissée', from: 'Eddie', body:
`…un qui entre, un qui sort. Donc la porte veut que quelqu’un reste derrière. Quelqu’un qui passe l’écran après moi. Ça pourrait être n’importe qui. Ça pourrait être un gosse.

Non. Arrête.

T’es pas ce genre de type, Eddie.` },
      office_board: { kind: 'wall', title: 'Tableau blanc de la salle de réunion', from: 'Salle de réunion B', body:
`REVUE DES SINISTRES
- retard : 212 dossiers
- heures sup : validées (encore)
- vendredi : repas partagé

En travers de tout, d’un autre feutre :
OÙ SONT PASSÉS LES AUTRES` },
      office_phone2: { kind: 'phone', title: 'Ligne 0256', from: 'Ligne inconnue', body:
`[Grésillements. Puis une voix plate, enfantine, qui compte lentement.]

…deux cent cinquante-trois…
…deux cent cinquante-quatre…
…deux cent cinquante-cinq…

[Le décompte s’arrête. Une respiration, collée au combiné.]

…deux cent cinquante-

[La ligne est coupée.]` },
      office_phone3: { kind: 'phone', title: 'Un appel de 1987', from: 'Maggie Marsh', date: '17 avril 1987, 7 h 12', body:
`[Sonnerie, puis une femme qui s’efforce de paraître calme.]

MAGGIE : Allô ? Carol ? C’est Maggie, la mère de Toby. Pardon de t’appeler au travail si tôt. Rosie est avec toi ? Toby a dit qu’il dormait chez Sam, mais Sam dit que Toby n’est jamais venu…

MAGGIE : Il y a quelqu’un ?

MAGGIE : …J’ai laissé la lumière du porche allumée pour lui. Je vais juste la laisser allumée.

[Clic.]` },
      office_personnel: { kind: 'screen', title: 'Terminal : PERSONNEL.TXT', from: 'Terminal de bureau', body:
`HARLOW MUTUAL — SERVICE SINISTRES
CAROL A. ..... GESTIONNAIRE .... HEURES SUP T1 : 212 H
DENNIS R. .... SUPERVISEUR ..... HEURES SUP T1 :  12 H
MARGE T. ..... EMPLOYÉE ........ HEURES SUP T1 :   0 H

REGISTRE DES VISITEURS (APRÈS 18 H) :
ROSIE A. (FILLE DE CAROL A.) ... 61 VISITES

C:\\> _` },
    },
    obj: {
      office_code: 'Trouver les chiffres du code de sécurité ({n}/4)',
      office_keypad: 'Entrer le code sur le clavier du poste de sécurité',
      office_card: 'Prendre la carte de sécurité',
      office_stairs: 'Passer la carte sur la porte de l’escalier de secours',
    },
    mono: {
      office_start: 'Un bureau. Des écrans verts. Personne, mais on dirait que tout le monde vient de se lever.',
      office_rosieSeen: 'Violet… devant moi. Elle est arrivée la première. Ses yeux sont là où je veux aller.',
      office_code: 'Les quatre y sont. Un, zéro, sept, trois. La station de Rosie.',
      office_cameras: 'Les moniteurs montrent les caméras de l’étage. Je les vois maintenant sur ma carte.',
      office_tape: 'La face B est vierge. « Pour après. »',
    },
    lines: {
      office_keypad: 'Entrer le code',
      office_card: 'Passer la carte',
      office_cardIdle: 'Lecteur de carte (rouge)',
      office_cardRed: 'Le voyant du lecteur est rouge.',
    },
    radio: {
      office_start: [
        ['eddie', 'Un bureau ? …Harlow Mutual. La mère de Rosie travaillait ici. Rosie faisait ses devoirs dans la salle de pause tous les soirs jusqu’à neuf heures.'],
        ['eddie', 'Elle appelait l’arcade de leur téléphone pour nous faire la météo. Tous les soirs sans exception.'],
      ],
      office_rosie: [
        ['eddie', 'La violette est devant toi ! Elle lit où tu vas. Reviens sur tes pas. Fais demi-tour sans raison. Je sais comment ça sonne.'],
      ],
      office_tape: [
        ['eddie', 'La compilation. Elle en avait fait une pour cette nuit-là. La face B, c’était « pour après ».'],
        ['sam', 'Après quoi ?'],
        ['eddie', 'Après avoir gagné. Après être rentrés chez eux.'],
      ],
      office_freed: [
        ['eddie', 'Elle marche à côté de toi. Pas devant. À côté.'],
        ['eddie', 'C’est comme ça qu’elle se tenait derrière Danny à la borne. Juste là, à lui chuchoter les coups.'],
      ],
      office_page: [
        ['sam', 'Eddie. Il y a une page ici. Ton écriture. « Un qui entre, un qui sort. Ça pourrait être un gosse. »'],
        ['eddie', '…C’est vieux. J’ai écrit plein de bêtises ma première semaine. Oublie ça.'],
        ['eddie', 'L’escalier, Sam. Va à l’escalier.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
