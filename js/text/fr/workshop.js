/* Français — Niveau 11 : L’Atelier (Walt, le sous-sol sous l’arcade, avril 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      workshop: {
        name: 'LEVEL 11', title: 'L’Atelier', place: 'Le souvenir de Walt — sous l’arcade Starlight, 17 avril 1987, 3 h 20',
        intro: 'Le sous-sol de Walt : des entrailles de télés, de la fumée de soudure et, derrière une porte en acier, une machine grande comme un frigo, qui bourdonne. C’est ici qu’est né le Kernel.\n\nQuelque chose de grand, d’orange et de souriant marche entre les établis, lentement, comme marche un costume quand il n’y a personne dedans.',
      },
    },
    items: {
      waltKey: { name: 'La clé de Walt', desc: 'Une clé en acier gravée KERNEL — W. SEULEMENT. L’anneau est usé à la forme de son pouce.' },
    },
    docs: {
      workshop_intro: { kind: 'note', title: 'Sur l’escalier de la cave', from: 'Eddie', body:
`Je ne suis pas redescendu ici depuis 1988. Rien n’a changé. C’est ça le pire.

Le Kernel est derrière la porte en acier. Walt gardait la clé à son établi. Les trois molettes de calibrage sont sur la façade du Kernel. Les réglages sont sur le schéma, quelque part sur les établis.

Règle-les correctement et je crois que le jeu nous laissera passer jusqu’à la maison.

La chose qui se promène, c’est Chompy. Le costume. Il est lent. Ne le laisse pas te serrer dans ses bras.

—E.` },
      workshop_schematic: { kind: 'note', title: 'Schéma, crayon bleu sur papier millimétré', from: 'Walt & Eddie', date: 'Rév. C, mars 1987', body:
`KERNEL — FORÇAGE DU COMPTEUR DE NIVEAU

Molette A (ligne) ..... 2
Molette B (colonne) ... 5
Molette C (décalage) .. 6

= 256

!! Le compteur à 256 laisse le plateau se dessiner au-delà de l’écran de la mort.
!! Personne ne sait ce qui s’y dessine. — E.
!! C’est tout l’intérêt. — W.` },
      workshop_eddiebench: { kind: 'note', title: 'Scotché sur l’ancien établi d’Eddie', from: 'Eddie', date: '17 avril 1987', body:
`C’était mon tour de fermer la porte de derrière.

Je ne l’ai pas fait. J’étais pressé. Séance de minuit au Rialto, et je ne voulais pas rater le début.

Walt est monté à 23 h. La porte de derrière est restée ouverte toute la nuit.

Je ne l’ai jamais dit à personne. J’ai laissé Walt porter ça pour nous deux.

C’est pour ça que je suis entré, Sam. Ce n’est pas du courage. C’est la note qui arrive.` },
      workshop_keytag: { kind: 'note', title: 'Une étiquette de clé sur l’établi', from: 'Walt', date: '1986', body:
`(Une étiquette en papier sur un anneau d’acier. Il manque une clé.)

DOUBLE — ENTRÉE
Confié à DANNY K. — le samedi, 8 h, pour préparer les bornes.
« Jeune homme responsable. » — W.

(En dessous, d’une encre plus récente : « J’ai dit à la police qu’ils étaient partis à minuit. Je ne leur dirai pas que j’ai donné ma clé à un enfant. Ils enlèveraient à son père la dernière bonne chose qui lui reste : qu’on faisait confiance à son fils. »)` },
      workshop_receipt: { kind: 'note', title: 'Un reçu épinglé sur le portant du costume', from: 'Harlow Party Supply', date: 'Mars 1983', body:
`1 × COSTUME DE MASCOTTE, sur mesure — « CHOMPY »
Rond, orange, cornes en feutrine, dents en mousse (d’après le dessin joint)
Commande spéciale ..................... 180,00 $
Retouches : pour un homme d’1,88 m .... 25,00 $
Mot de la boutique : « On espère que ça plaira à votre fille ! »

(Agrafé dessus, plus tard : un ticket de parking de St. Agnes, 27 octobre 1983. Le jour où il l’a porté dans l’escalier.)` },
      workshop_nora: { kind: 'letter', title: 'Une lettre jamais envoyée, adressée et timbrée', from: 'Walt', date: 'Février 1992', body:
`Nora,

J’ai lu toutes tes lettres. Je n’ai pas répondu parce que chaque réponse que j’écrivais était soit un mensonge, soit un adieu.

Le mois prochain, j’entre les chercher. Ne laisse personne débrancher. Ni la banque, ni la police, ni toi.

Si je ne suis pas revenu quand la banque viendra, la feuille des scores est dans le couloir. Garde-la. Les noms qui sont dessus comptent plus que tout ce que j’ai jamais construit.

Ton frère,
Walt

(Elle n’a jamais été postée.)` },
      workshop_ticket: { kind: 'note', title: 'Un bon de réparation de télé sur l’établi', from: 'Starlight Réparation (au fond)', date: 'Mars 1986', body:
`CLIENTE : Ann Keller (Maple St.)
APPAREIL : téléviseur couleur 19 pouces, pas d’image
RÉPARATION : transformateur THT remplacé.
MONTANT : 0 $ — « payé en cookies aux pépites de chocolat »

(Épinglé dessus, un mot de ta propre écriture de tes douze ans : « MERCI WALT DAVOIR RÉPARÉ NOTRE TÉLÉ ON PEUT DE NOUVEAU REGARDER LE MATCH — SAM »)` },
      workshop_317: { kind: 'tape', title: 'Cassette : « 3:17 »', from: 'Le magnétophone de Rosie (retrouvé dans la borne n° 7, qui enregistrait encore)', date: '17 avril 1987, 3 h 14 – 3 h 42', body:
`[Clic. L’arcade après la fermeture. La musique de Hungry House, accélérée et faussée.]

ROSIE : …trois heures quatorze, et on est au NIVEAU 255. Rosie Radio, en direct, l’histoire est en marche—
DANNY : Chut ! Le trajet ! Nell, par où ?
NELL : À gauche. À gauche, puis on attend. On attend… maintenant.
TOBY : Sam, à toi le bouton. Sam ? Tu trembles.
SAM : C’est chaud. Toute la borne est brûlante. Les gars, c’est trop chaud.

[3 h 16. La musique s’arrête. Une longue note.]

DANNY : Ça y est. C’est le 256. Regardez le côté droit…
NELL : Il est coupé en deux. Rien que des lettres. Et… nos noms. D-A-N. R-O-S. N-E-L. T-O-B. S-A-M.
ROSIE : Le pacte. Tout le monde. Les cinq mains sur le joystick. MAINTENANT.
TOBY : Je te tiens, Sam. Je tiens ta main.
NELL : Les Spectres se sont retournés. Ils nous regardent. Depuis l’écran. Ils nous REGARDENT.
SAM : Ça brûle— je peux pas— je peux pas—
DANNY : PERSONNE NE LÂCHE !

[Une main s’arrache du métal brûlant. Des baskets sur la moquette. La porte de derrière claque, ouverte sur la pluie.]

TOBY : SAM ! SAM, REVIENS ! [un sanglot] …C’est pas grave. C’est pas grave. À quatre, ça va.
ROSIE : [tremblante] CONTINUE. Appuyez. Ensemble.

[3 h 17. Un bruit comme une énorme inspiration. Quatre petits halètements. Puis seulement le bourdonnement.]

[3 h 20. Une porte. Des pas dans l’escalier. Walt, essoufflé.]

WALT : Les enfants ? Danny ? …Non. Non, non, non. L’écran. Les noms sous les Spectres. DAN. ROS. NEL. TOB. Mon Dieu. Mon Dieu, ce sont leurs noms.
WALT : [un homme qui se laisse tomber lourdement par terre] Pardon. Je vais vous sortir de là. Je vous promets que je vais vous sortir de là.

[La bande continue en silence pendant vingt-deux minutes. Puis : clic.]` },
      workshop_lily8: { kind: 'drawing', drawing: 8, title: 'Un dessin plié dans la caisse à outils de Walt', from: 'Lily, 9 ans', body:
`Crayon gras, le dernier. Un grand monsieur est assis par terre à côté d’une haute machine lumineuse, et il pleure. Une petite fille se tient derrière lui, la main posée sur son épaule. On l’a dessinée en train de sourire.

SOIS PAS TRISTE PAPA.
À LA FIN TOUT LE MONDE RENTRE À LA MAISON.
TU AS PROMIS.` },
    },
    obj: {
      workshop_key: 'Trouver la clé de Walt',
      workshop_kernel: 'Ouvrir la salle du Kernel',
      workshop_dials: 'Régler les molettes de calibrage ({n}/3 correctes)',
      workshop_leave: 'Passer par l’EXIT',
    },
    mono: {
      workshop_start: 'L’atelier de Walt. Avant, je le regardais réparer les télés par la petite fenêtre.',
      workshop_key: 'Sa clé. Tiède, comme si quelqu’un venait de la poser.',
      workshop_kernel: 'Le Kernel. Il respire. Je jure qu’il respire.',
      workshop_calibrated: 'Deux. Cinq. Six. Le bourdonnement descend d’une octave. Au loin, un loquet se libère.',
      workshop_chompy: 'Chompy. Le costume de la photo de l’hôpital. Il n’y a personne dedans. Il marche quand même.',
      workshop_317: 'J’ai lâché.',
    },
    lines: {
      workshop_unlock: 'Ouvrir avec la clé de Walt',
      workshop_dial: 'Tourner la molette (actuellement : {n})',
    },
    radio: {
      workshop_start: [
        ['eddie', 'Sam… avant de descendre cet escalier. Il y a quelque chose sur mon établi. Je préfère que tu le lises plutôt que de l’entendre de ma bouche.'],
      ],
      workshop_kernel: [
        ['eddie', 'C’est elle. C’est le Kernel. On l’a construite en huit mois. J’étais tellement fier.'],
      ],
      workshop_chompy: [
        ['eddie', 'La lumière dans les yeux. Il se cache le visage. Walt faisait ce numéro pour les gosses. Coucou, caché.'],
      ],
      workshop_truth: [
        ['eddie', '…Sam ? Je l’ai entendu. C’est passé sur la sept. Tout.'],
        ['sam', 'J’ai lâché. J’ai lâché, j’ai pris la fuite, et j’ai raconté à tout le monde qu’à 21 h 40 j’étais à la maison. Pendant sept ans.'],
        ['eddie', 'Tu avais treize ans.'],
        ['sam', 'Walt a passé cinq ans à être le monstre de cette ville. À cause de moi. Et puis il est entré, et maintenant il EN EST un.'],
        ['eddie', '…Et moi, j’ai laissé la porte ouverte. Walt a menti pour une clé. Dans cette histoire, tout le monde a lâché quelque chose.'],
        ['eddie', 'Ce qui compte, c’est ce à quoi tu te tiens maintenant.'],
      ],
      workshop_calibrated: [
        ['eddie', '256. C’est ça. C’est le chemin vers la maison.'],
        ['eddie', 'Tu as lu mon établi. J’avais laissé la porte de derrière ouverte. C’est par là que tu as pu rentrer, cette nuit-là.'],
        ['sam', 'Tu allais au cinéma.'],
        ['eddie', '…Ouais. Au cinéma. Je ne me souviens même plus du film.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
