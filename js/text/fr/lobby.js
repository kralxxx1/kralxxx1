/* Français — Niveau 0 : mode démonstration. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'Mode démonstration', place: 'À l’intérieur de l’écran',
        intro: 'Un bourdonnement qu’on sent dans les dents. De la moquette mouillée. Des murs jaunes qui ne finissent jamais. Au loin, un son entendu dix mille fois dans le haut-parleur d’une borne : la sirène des Spectres, qui monte et qui descend.\n\nLe jeu attendait un joueur. Maintenant, il en a un.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Feuille scotchée au mur', from: 'Eddie', body:
`SI TU LIS ÇA :

1. Ne cours pas, sauf s’il a déjà repéré ta présence. Courir, ça fait du bruit.
2. Les panneaux EXIT mentent. Ils mènent plus loin, pas dehors.
3. Quand les lumières clignotent, sors du couloir.
4. Les lanternes sont réelles. Prends-en une et tout fuit devant TOI. Pendant un petit moment.
5. Le Star Pop (le soda à la cerise) calme les tremblements. Me demande pas pourquoi.
6. Il y a un talkie-walkie à mon campement. Canal 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: 'Le journal de campement d’Eddie', from: 'Eddie', date: '12 juin 1993 (?)', body:
`Campement 1.

Passé à travers l’écran à 23 h 40. Tombé à plat ventre. La moquette est trempée mais rien ne fuit. Rien ne fuit jamais, ici.

Pas de Walt. Trouvé sa lampe torche, et son écriture sur un mur.

Les talkies-walkies marchent sur le canal 7. Personne ne répond. J’en laisse un ici pour le prochain abruti qui suivra un adulte dans un jeu vidéo.

Si c’est toi : salut. Désolé. Canal 7.` },
      lobby_walt1: { kind: 'diary', title: 'Une page du journal de Walt', from: 'Walt', date: 'À l’intérieur, jour 1', body:
`Jour 1.

Du jaune. Ça bourdonne comme un ballast fatigué. La moquette est mouillée.

J’entends la sirène au loin, celle qui joue quand les Spectres sortent de leur maison.

Ils sont là. J’avais raison. Dieu me pardonne, j’avais raison.

Danny. Rosie. Nell. Toby. Tenez bon. J’arrive.` },
      lobby_walt2: { kind: 'diary', title: 'Une autre page du journal de Walt', from: 'Walt', date: 'À l’intérieur, jour 9 (?)', body:
`Jour 9. Ou 90.

J’ai faim tout le temps. Il y a des canettes de Star Pop partout, l’équivalent de ma propre glacière. Je les ai toutes bues. Je ne me souviens pas de l’avoir décidé.

Les lanternes ont un goût de pièces de monnaie. Après en avoir avalé une, je vois plus loin.

J’ai essayé la prise la première nuit. Seul. Quelque chose en moi a fait clic, comme une pièce qui tombe.

J’ai vu le rouge aujourd’hui. Il s’est enfui devant moi. J’ai crié son nom et il s’est arrêté, une seconde.

Je comprends maintenant. C’est moi, celui qui a la bouche.` },
      lobby_flyer: { kind: 'flyer', title: 'Un prospectus plié', from: 'Rosie', date: 'Avril 1987', body:
`★ TOP SECRET ★
OPÉRATION 256

QUAND : jeudi 4/16, après la fermeture
MISSION : voir ce qu’il y a après le kill screen

ÉQUIPE :
Danny — la clé (NE PAS le dire à Walt)
Rosie — le plan + les goûters
Nell — la carte des trajets des Spectres
Toby — la lampe torche
Sam — la chance

TOUS LES CINQ OU PERSONNE.
À DÉTRUIRE APRÈS LECTURE !!!
(Toby, ça veut dire : ne le garde pas dans ta BD.)` },
      lobby_exitwall: { kind: 'wall', title: 'Gravé à côté de la porte EXIT', body:
`LES EXITS MENTENT
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Écrit au-dessus des chaises', body:
`LES CHAISES ÉTAIENT DÉJÀ
TOURNÉES VERS LE MUR
QUAND JE SUIS ARRIVÉ
—W.` },
      lobby_puddle: { kind: 'note', title: 'Une note humide près de la flaque', from: 'Walt', body:
`L’eau ici est tiède et sent le chlore. Comme la piscine municipale.

Nell ne s’approchait plus de la piscine après 85. Est-ce que c’est à elle ?

Chaque pièce ici appartient à quelqu’un.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'Un dessin coincé derrière une grille d’aération', from: 'Lily, 9 ans', body:
`Crayon gras. Un grand monsieur à moustache et une petite fille aux nattes orange à côté d’une petite borne d’arcade. Sur l’écran : une créature ronde et orange et le nombre 3190. La fille lève les deux bras.

MOI ET PAPA ET LA PETITE MACHINE.
J’AI FAIT 3190 POINS !!!
PAPA DIT QUE ÇA RESTE SUR LE TABLEAU POUR TOUJOUR.` },
      lobby_tape: { kind: 'tape', title: 'Cassette : « Test, test »', from: 'Eddie', date: 'À l’intérieur', body:
`[Clic. Une respiration lourde. Le bourdonnement.]

EDDIE : Test, test. Journal audio, jour… je sais pas. Jour quelque chose.

EDDIE : Si c’est June : je vais bien. Tout va bien. Je trouve Walt, je ramène les gamins, je suis rentré avant le bébé. J’ai promis, et je tiens mes promesses. En général.

[Silence.]

EDDIE : Si ce n’est pas June : canal sept. Ne cours pas. Et quoi que tu fasses, ne le laisse pas t’entendre manger.

[Clic.]` },
    },
    obj: {
      lobby_explore: 'Trouver une sortie',
      lobby_pellets: 'Trouver les lanternes ({n}/4)',
      lobby_insert: 'Placer les lanternes dans le panneau à côté de l’EXIT',
      lobby_leave: 'Passer la porte',
    },
    mono: {
      lobby_start: 'Où… La moquette est mouillée. Le bourdonnement est dans ma tête.',
      lobby_exitSeen: 'EXIT. Quatre alvéoles rondes à côté de la porte. De la taille d’une lanterne.',
      lobby_firstPellet: 'Une lanterne. Chaude dans ma main. Pendant une seconde, tout est devenu bleu et s’est enfui.',
      lobby_eaterHeard: 'Ça mâche. Quelque part derrière les murs, quelque chose mâche.',
      lobby_eaterSeen: 'Quelque chose de pâle au bout du couloir. Rond. Trop gros pour le couloir. Ça mâche.',
      lobby_allPellets: 'Quatre lanternes. Maintenant, la porte.',
      lobby_radio: 'Un talkie-walkie. Quelqu’un a scotché le bouton sur le canal 7.',
    },
    lines: {
      lobby_slots: 'Quatre alvéoles ({n}/4 lanternes)',
      lobby_place: 'Placer les lanternes dans les alvéoles',
      lobby_radioTake: 'Prendre le talkie-walkie',
    },
    radio: {
      lobby_meet: [
        ['radio', '[grésillements]'],
        ['eddie', '…allô ? ALLÔ ? Il y a quelqu’un sur le sept ? Dis quelque chose !'],
        ['sam', '…Allô ? Qui est là ? Où je suis ?'],
        ['eddie', 'Oh, Dieu merci. Quelqu’un. D’accord. D’accord. Je m’appelle Eddie. Je travaillais au Starlight. Tu viens de la sept, c’est ça ?'],
        ['sam', 'Eddie ? L’Eddie de Walt ? T’as disparu il y a un an et demi. Ta femme a collé ta photo sur tous les poteaux de Harlow.'],
        ['eddie', 'Un an et demi. On dirait une nuit. Alors le bébé est déjà… [grésillements] Non. Pas maintenant. C’est quoi, ton nom ?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', '…Le Sam de Toby ? L’enfant au vélo ? Tiens. Voilà pourquoi.'],
        ['sam', 'Pourquoi quoi ?'],
        ['eddie', 'À ton entrée, tout l’endroit l’a dit. PLAYER ONE. Je l’ai entendu d’ici comme dans un stade. Pour moi, jamais. Pour moi, ça disait INSERT COIN.'],
        ['eddie', 'Les règles. Ne cours pas, sauf si quelque chose te voit. Les panneaux EXIT mentent. Si les lumières clignotent, sors du couloir. La porte pour sortir d’ici veut quatre lanternes. Trouve-les. Et Sam ? Reste sur le sept.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Tu viens de prendre une lanterne ? Oh non. Bon. Il a entendu. Il y a toujours quelque chose qui se réveille quand on en prend une.'],
        ['eddie', 'Les coins, Sam. Il est rapide en ligne droite et lent dans les virages.'],
      ],
      lobby_eater: [
        ['eddie', 'Tu l’as vu. Ne le regarde pas trop longtemps. Moi, je l’appelle le Dévoreur.'],
        ['sam', 'C’est quoi ?'],
        ['eddie', 'C’est le Joueur. Chaque jeu en a besoin d’un. Celui-là, c’était… [grésillements] Prends les coins, c’est tout.'],
      ],
      lobby_panel: [
        ['eddie', 'Quatre alvéoles. Tout ici, c’est le jeu, Sam. Vide le plateau et la porte s’ouvre.'],
      ],
      lobby_open: [
        ['eddie', 'Cette porte n’est pas une sortie. Les EXITS mentent. Mais c’est le chemin vers le bas, et c’est en bas qu’ils sont.'],
        ['sam', 'Qui ?'],
        ['eddie', 'Tu sais qui. Quatre gamins d’avril 87. Vas-y. Je reste sur le sept.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
