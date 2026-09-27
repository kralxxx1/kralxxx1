/* Français — Niveau 5 : Harlow Junior High (collège, 16 avril 1987). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      school: {
        name: 'LEVEL 5', title: 'Harlow Junior High', place: 'Le souvenir de tout le monde — jeudi 16 avril 1987, 15 h 05',
        intro: 'Le dernier après-midi où quelqu’un vous a vus tous les cinq ensemble. La sonnerie vient de retentir, et elle ne s’arrêtera pas.\n\nQuelqu’un arpente les couloirs avec une lampe torche et vérifie les laissez-passer. Tu n’en as pas.',
      },
    },
    items: {
      janitorKeys: { name: 'Le trousseau du concierge', desc: 'Le trousseau de M. Gus : vingt clés, un décapsuleur et un petit frelon en plastique. La clé du cadenas porte une touche de vernis à ongles rouge.' },
    },
    docs: {
      school_intro: { kind: 'note', title: 'Pincé sur un tableau de laissez-passer', from: 'Eddie', body:
`L’école. Leur école. Ici, c’est jeudi après-midi, et c’est jeudi après-midi chaque fois que je passe.

La sortie de secours, au bout du couloir est, est fermée par une chaîne. C’est le concierge qui a les clés. Son placard a un cadenas à code.

Quelque chose arpente ces couloirs avec une lampe torche. Ça ne voit que ce que sa lumière touche. Les casiers s’ouvrent. Tu tiens dedans.

—E.` },
      school_clue1: { kind: 'wall', title: 'De la craie dans le coin d’un tableau noir', body:
`RAPPEL (M. Gus, concierge) :
Code du placard changé.
Enseignants, demandez au secrétariat.

(et dessous, plus petit, d’une écriture d’enfant :)
premier chiffre = 3
comme les 3 vies dans Hungry House
—R.` },
      school_clue2: { kind: 'note', title: 'Avis de retenue, double carbone rose', from: 'Harlow Junior High', date: '14 avril 1987', body:
`ÉLÈVE : Kowalski, Danny — 3e (redoublant)
MOTIF : Trouvé dans le placard du concierge pendant la 4e heure. Affirme qu’il « faisait l’inventaire ».
RETENUE : mercredi 15/4, 15 h 15 – 16 h 00

Commentaire de l’élève (obligatoire) :
« J’ai retenu le code. Le chiffre du milieu, c’est 1. Comme moi. Numéro 1. »

Commentaire du professeur : Ce n’est pas un commentaire sur les faits, Danny.` },
      school_clue3: { kind: 'note', title: 'Album de l’année 1985–86, une page de dédicaces', from: 'L’album des Harlow Hornets', date: 'Juin 1986', body:
`La page est couverte de signatures en cinq couleurs.

« BONNES VACANCES !! — Rosie ♪ »
« reste bizarre — Danny #1 »
« Je garde cette page pour toujours. — Nell »
« sam personne joue mieux que toi à hungry house à part moi — Toby »
« on se voit à l’arcade — Sam »

Dans la marge, au crayon plus récent et de l’écriture de Toby, une flèche vers la porte du concierge :
« dernier chiffre = 7. le 7 porte-bonheur. LE DITES PAS À M. GUS »` },
      school_passnote: { kind: 'note', title: 'Un mot plié en tout petit triangle', from: 'Rosie', date: '16 avril 1987, 2e heure', body:
`OPÉRATION 256 — CE SOIR

D a la clé (NE DEMANDEZ PAS).
Walt ferme à 22 h. On revient à 23 h 15. Porte de derrière.
Nell apporte les cartes des trajets des Spectres.
Toby apporte la lampe + à grignoter.
Sam apporte la pièce porte-bonheur.

On va être les premiers au MONDE à voir le niveau 256.

(fais passer à Nell, PAS à Toby, il va le perdre)

P.-S. Sam. Parle à Toby. Il s’en veut à mort pour le baladeur.` },
      school_pact: { kind: 'note', title: 'Une feuille de cahier pliée en huit', from: 'L’écriture de Rosie', date: '16 avril 1987, 15 h 30', body:
`OPÉRATION 256 — LE PACTE

Nous, les meilleurs joueurs de Hungry House de Harlow, Pennsylvanie, jurons :

1. On y va tous les cinq. TOUS LES CINQ OU PERSONNE.
2. Quand on arrive au 256, les cinq mains sur le joystick.
3. PERSONNE NE LÂCHE. Peu importe ce qu’il y a à l’écran.
4. Quoi qu’il y ait de l’autre côté, on le voit ensemble.
5. Personne ne rentre seul. (Règle 4 du fort, empruntée avec la permission du chef du fort.)

DANNY K.   ROSIE A. ♪   NELL P.   TOBY M. ★

Et tout en bas, d’une écriture que tu connais mieux que toute autre :
SAM K.` },
      school_plaque: { kind: 'wall', title: 'Une plaque de laiton près des portes de la bibliothèque', body:
`EN MÉMOIRE DE
LILY BRENNER
1974 – 1983

Elle dessinait sur tout.
Elle riait de tout.
C’était notre amie.

— Sa classe de CM1, salle 104, école primaire de Harlow.
Nous l’avons emportée avec nous en entrant au collège. (1986)` },
      school_paper: { kind: 'note', title: 'The Harlow Hornet, le journal du collège', from: 'Harlow Junior High', date: 'Avril 1987', body:
`LE CLUB RADIO A BESOIN DE TOI !
Tu aimes la musique ? Tu aimes parler ? Tu veux passer À L’ANTENNE ?
Rosie Alvarez (3e) lance un club radio. Première réunion mardi.
« Harlow mérite un vrai DJ. » — Rosie

MEILLEURS SCORES DU STARLIGHT (Hungry House, n° 7)
1. DAN 921 450  2. ROS 887 300  3. NEL 640 120  4. TOB 512 890  5. SAM 498 770

TROUVÉ : un baladeur, bleu, un « S » gravé au dos. Un peu cassé. À son propriétaire : pardonne à celui qui s’est assis dessus, s’il te plaît. —T.` },
      school_samlocker: { kind: 'note', title: 'Scotché dans le casier 217 (le tien)', from: 'Sam', date: '16 avril 1987', body:
`Toby,

C’est juste un baladeur. Je m’en fiche même, du baladeur. Ce qui m’énervait, c’est que toi, t’as toujours le droit de tout faire en premier, et moi il faut toujours que je rattrape.

Pardon d’avoir crié à la cantine.

Je viendrai ce soir. J’apporterai la pièce porte-bonheur.

On est une équipe.

— Sam

(Tu l’as écrit à midi et scotché dans ton casier pour le lui donner après les cours. Ce soir-là, à l’arcade, il y a eu la deuxième dispute à la place. Tu ne le lui as jamais donné. Il est resté là jusqu’à ce qu’on vide les casiers en juin.)` },
      school_attendance: { kind: 'note', title: 'Liste des absences du jour, vie scolaire', from: 'Harlow Junior High', date: 'Vendredi 17 avril 1987', body:
`ABSENTS, SANS APPEL DES PARENTS :
Kowalski, Danny (3e)
Alvarez, Rosie (3e)
Park, Nell (3e)
Marsh, Toby (5e)

Secrétariat prévenu à 8 h 20.
Parents prévenus à 8 h 35.
Police dans l’établissement à 9 h 10.

Keller, Sam (5e) — EN CLASSE. Là dès l’ouverture. A pris la place de Toby, salle 112, sans vouloir en bouger. Cheveux encore mouillés. Envoi à l’infirmerie à 9 h 30.` },
      school_walt: { kind: 'diary', title: 'Le journal de Walt, au crayon', from: 'Walt', date: 'À l’intérieur', body:
`Un gymnase. Des guirlandes pour une fête qui n’a jamais eu lieu.

Ce n’est pas l’école de Lily, mais ça sent pareil. Je suis allé dans sa classe une fois, au printemps 83, pour parler de mon métier. Ils m’ont demandé à quoi sert un radar. J’ai répondu : à retrouver les choses perdues.

C’est l’enfant des Keller qui a posé le plus de questions. Sam. Lily a ri à chacune. C’est la dernière fois que je l’ai entendue rire comme ça.

J’ai tellement faim, Lily.` },
      school_tape: { kind: 'tape', title: 'Cassette : « Annonces du matin »', from: 'Le bureau du principal', date: '17 avril 1987, 8 h 45', body:
`[Clic. Larsen dans les haut-parleurs. On tapote deux fois le micro.]

LE PRINCIPAL : Bonjour, les Harlow Hornets. J’ai… besoin que tout le monde écoute.

LE PRINCIPAL : Quatre de nos élèves ne sont pas rentrés chez eux cette nuit. Danny Kowalski, Rosie Alvarez, Nell Park et Toby Marsh.

LE PRINCIPAL : Si vous les avez vus hier soir, n’importe où, venez au secrétariat. Vous n’aurez pas d’ennuis. Personne n’aura d’ennuis.

[Un long silence. Quelqu’un pleure dans le bureau.]

LE PRINCIPAL : …La fête du printemps est reportée.

[Clic.]` },
    },
    obj: {
      school_code: 'Trouver le code du placard ({n}/3)',
      school_closet: 'Ouvrir le placard du concierge',
      school_keys: 'Prendre les clés du concierge',
      school_leave: 'Défaire la chaîne de la sortie de secours du couloir est',
    },
    mono: {
      school_start: 'Harlow Junior High. L’horloge au-dessus de la porte indique 15 h 05. Elle a indiqué 15 h 05 toute l’année.',
      school_code: '3… 1… 7. Évidemment.',
      school_keys: 'Les clés de M. Gus. Parfois, il nous laissait les porter jusqu’au gymnase. On se sentait importants.',
      school_gym: 'Le gymnase. FÊTE DU PRINTEMPS 87. Toby voulait inviter Nell. Il s’est entraîné sur moi.',
      school_monitor: 'Quelqu’un au bout du couloir, avec une lampe torche. Là où devrait être son visage, il n’y a que la lumière.',
      school_pact: 'Personne ne lâche. Je me souviens de ma signature. Je me souviens de la dispute à 21 h 40. Après… rien que la pluie.',
      hideLocker: 'À travers les fentes. Ne pas respirer.',
    },
    lines: {
      school_keypad: 'Cadenas du placard du concierge (3 chiffres)',
      school_unlockExit: 'Ouvrir la chaîne avec les clés du concierge',
    },
    radio: {
      school_start: [
        ['eddie', 'Oh non. L’école. Je détestais l’école.'],
        ['sam', 'C’est le jour. Le seize avril.'],
        ['eddie', '…Ouais. Je m’en doutais. Écoute : le Surveillant ne voit que ce que voit sa lampe. Reste hors du faisceau. Les casiers sont tes amis.'],
      ],
      school_monitor: [
        ['eddie', 'Le Surveillant. Dans un casier. Tout de suite, Sam. Discute pas. CASIER.'],
      ],
      school_keys: [
        ['eddie', 'Les clés. Bien. Couloir est, la chaîne de la sortie de secours.'],
        ['eddie', 'Et Sam… ce casier. Le 217. C’était le tien ?'],
        ['sam', 'Arrête.'],
        ['eddie', 'D’accord. D’accord.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
