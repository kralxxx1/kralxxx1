/* Français — Chapitre 7 : Dernier arrêt (le Nordlys Express). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      train: {
        name: 'CHAPITRE 7', title: 'Dernier arrêt', place: 'Gare de Brenna, sur la ligne du nord',
        intro: 'Mercredi 19 décembre 1990, 23 h 40.\n\nLe train de nuit pour Nordvik attend à quai, toutes fenêtres allumées. Personne ne monte. Personne ne descend. Une porte est ouverte.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'L’horaire près de la porte du quai', from: 'Lignes du Nord', date: 'Horaire d’hiver 1990–91', body:
`NORDLYS EXPRESS — train de nuit avec couchettes, quotidien
Halvard dép. 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (arrêt facultatif)* 00.50
Nordvik arr. 06.15

* Les trains ne s’arrêtent à Kvitfjell que si un voyageur le signale au contrôleur avant Brenna, ou si un voyageur attend sur le quai. La halte n’a ni personnel ni éclairage en hiver.` },
      train_notice: { kind: 'notice', title: 'Un avis dans la salle d’attente', from: 'Lignes du Nord, bureau régional du trafic', date: '1er décembre 1990', body:
`LES BILLETS DOIVENT ÊTRE ACHETÉS AVANT LA MONTÉE.

Aucun billet n’est vendu dans les trains de nuit. Un voyageur qui ne peut présenter un billet valable au contrôleur devra quitter le train à l’arrêt suivant.

Merci de voyager avec les Lignes du Nord.

(Quelqu’un a écrit dessous au stylo bille : « même à Kvitfjell ? » et quelqu’un d’autre : « SURTOUT à Kvitfjell »)` },
      train_menu: { kind: 'note', title: 'La carte de la voiture-restaurant', from: 'Voiture-restaurant du Nordlys Express', date: '19.12.90', body:
`Soupe de poisson et pain — 48
Ragoût de renne, airelles, pommes de terre — 95
Gaufres, confiture et crème aigre — 32
Café — 12   Chocolat — 14

La voiture-restaurant ferme à 23 h. Après 23 h, les voyageurs des voitures-lits sont servis sur présentation de leur billet de couchette.

(La trace d’une tasse. Sous la carte, au crayon : « Table près de l’office : chocolat, couchette 24, payé en liquide. »)` },
      train_waiter: { kind: 'note', title: 'Un carnet de commandes près de l’office', from: 'R. Moe, serveur', date: '19.12.90', body:
`23.55  Couchette 24 (voiture 2) — jeune demoiselle, seule — chocolat, gaufres.
       Voiture fermée, mais elle m’a montré son billet de couchette, alors.
       Rentre chez elle à Nordvik pour Noël. Première fois seule dans le train.
       A remis le billet dans la poche de son manteau. Lui ai dit de ne pas le perdre.

00.30  M. Saether passe pour sa tournée. De la neige sur la voie
       depuis Ostra, et il le fait payer à tout le monde.` },
      train_paper: { kind: 'clipping', title: 'Un journal oublié sur une table', from: 'Nordvik Tidende', date: 'Samedi 22 décembre 1990', body:
`UNE JEUNE FILLE DE 15 ANS DISPARUE DEPUIS MERCREDI

Lina Berg, 15 ans, de Nordvik, n’a pas été revue depuis qu’elle est montée à Halvard dans le Nordlys Express mercredi soir pour rentrer pour Noël.

Elle n’est pas arrivée. Les Lignes du Nord affirment qu’aucun voyageur n’a quitté le train entre Brenna et Nordvik, et que sa couchette a été trouvée inoccupée à l’arrivée du train.

Il neige chaque jour sur la région depuis. La police demande à toute personne ayant voyagé dans ce train de se faire connaître.` },
      train_lina: { kind: 'letter', title: 'Une lettre sur la petite tablette de la couchette 24', from: 'Lina', date: '19.12.90, dans le train', body:
`Chère Maman,

Je suis dans le train !!! J’ai acheté le billet moi-même avec l’argent de mes samedis au café, tout le trajet, avec un lit. C’est grand comme un placard. J’ai la couchette du bas et personne dans celle du haut, alors j’y ai mis mon manteau et on dirait quelqu’un.

On arrive à six heures et quart. Ne venez pas à la gare dans le noir, je connais le chemin. Je serai à la maison pour le petit-déjeuner. Dis à Jonas qu’il n’aura pas ma chambre.

Je te donnerai cette lettre moi-même, comme ça pas besoin de timbre.

Lina` },
      train_saether: { kind: 'report', title: 'Un rapport de service, plié dans le compartiment du contrôleur', from: 'E. Saether, contrôleur', date: '19/20.12.90', body:
`Nordlys Express, Halvard–Nordvik. Contrôleur : E. Saether.

21.10 Dép. Halvard. 61 voyageurs.
23.40 Brenna. 4 descendus, 0 montés.
00.40 Contrôle, voiture 2 : couchette 24, voyageuse, env. 17–18 ans, incapable de présenter un billet. Prétend en avoir acheté un. Manteau et sac fouillés en sa présence. Pas de billet.
00.50 Kvitfjell. Voyageuse sans billet descendue conformément au règlement.
06.15 Arr. Nordvik. Rien d’autre à signaler.

(Les lignes de 00.40 et 00.50 ont été repassées avec une autre encre, très soigneusement, au point d’être presque illisibles.)` },
      train_inquiry: { kind: 'report', title: 'Une déposition dans le bureau du contrôleur', from: 'Enquête des Lignes du Nord : déposition d’E. Saether', date: '4 janvier 1991', body:
`J’étais le contrôleur du Nordlys Express dans la nuit du 19 décembre.

Je n’ai aucun souvenir d’une jeune fille voyageant seule. J’ai contrôlé chaque billet du train comme d’habitude. Personne n’a dû être descendu.

Le train ne s’est pas arrêté à Kvitfjell. Aucun voyageur ne l’avait demandé, et la halte était fermée pour cause de neige.

Je travaille aux chemins de fer depuis vingt-six ans.

E. Saether` },
      train_docket: { kind: 'note', title: 'Une fiche d’objet trouvé attachée à un sac postal', from: 'Dépôt 9, gare centrale de Halvard — Objets trouvés', date: 'Janvier 1991', body:
`No 97 / 1991
Un billet de train, aller simple, Halvard–Nordvik, couchette, voiture 2 couchette 24, 19.12.90. Non composté.
Trouvé : Nordlys Express, voiture 2, sous la couchette du bas, par le nettoyage à Nordvik, 20.12.90.
Reçu au Dépôt 9 : 7.1.91.
Employée : A. Lind
Statut : NON RÉCLAMÉ` },
      train_cabLog: { kind: 'report', title: 'Le carnet du mécanicien dans la cabine', from: 'Mécanicien K. Aune', date: '19/20.12.90', body:
`00.47  Sonnerie du contrôleur : arrêt à Kvitfjell.
00.50  Arrêt à Kvitfjell. Halte non éclairée, quai sous la neige. Forte neige.
00.51  Un voyageur descendu, arrière de la voiture 2. Départ donné par le contrôleur.
00.52  Départ.

(La page a été arrachée du carnet puis remise en place, volante.)` },
      wren7: { kind: 'drawing', drawing: 7, title: 'Un dessin sur un oreiller de la voiture 3', from: 'Wren, 7 ans', body:
`Crayon de cire sur papier quadrillé. Un long train bleu dans le noir, toutes les fenêtres allumées en jaune, qui s’en va vers la droite. Derrière, dans la neige, une fille au bonnet rouge debout près d’un lampadaire, les bras ballants. Au-dessus d’elle, le petit oiseau rouge.

En dessous :
ELLE EN AVAIT UN` },
    },
    items: {
      ticket: { name: 'Billet de train', desc: 'Aller simple, Halvard–Nordvik, 19.12.90, déjà composté une fois. Celui de quelqu’un d’autre. Il avait été laissé sur une table, sous une soucoupe.' },
      linaTicket: { name: 'Le billet de Lina', desc: 'Aller simple, Halvard–Nordvik, couchette, voiture 2 couchette 24, 19.12.90. Non composté. Elle l’avait acheté elle-même.' },
    },
    obj: {
      train_start: 'Monte dans le train',
      train_ticket: 'Trouve un billet avant que le contrôleur ne te trouve',
      train_who: 'Découvre qui a été descendu à Kvitfjell',
      train_lina: 'Trouve le billet de Lina dans la couchette 24',
      train_punch: 'Fais composter son billet',
      train_brake: 'Arrête le train à Kvitfjell : le frein d’urgence est dans la cabine de conduite',
    },
    mono: {
      train_start: 'Un train. Toutes les fenêtres allumées et pas âme qui vive sur le quai.',
      train_board: 'Je suis dedans. La porte s’est refermée derrière moi.',
      train_moving: 'On roule.',
      train_conductor: 'Quelqu’un avec une lanterne qui arrive dans le couloir.',
      train_sleeper: 'Quelqu’un dort là-dedans, tourné vers la porte. Doucement, Ada.',
      train_gangway: 'Il y a quelque chose sous les plaques. Ne reste pas là.',
      train_ticket: 'Un billet. Ce n’est pas le mien. Il faudra qu’il fasse l’affaire.',
      train_check: 'Il veut mon billet.',
      train_punched: 'Clic. Il continue. Il ne m’a pas regardée en face.',
      train_letter: 'Lina. Quinze ans. À la maison pour le petit-déjeuner.',
      train_report: 'Couchette 24. « Prétend en avoir acheté un. » Kvitfjell, une heure moins dix du matin, dans la neige.',
      train_found: 'Sous la couchette. Là où elle disait.',
      train_turn: 'La lanterne s’est arrêtée. Il s’est retourné.',
      train_docket: 'A. Lind. C’est mon écriture. Ma deuxième semaine. Je l’ai classé et je n’ai jamais demandé à qui il était.',
      train_punchIt: 'Sa pince. Son billet à elle.',
      train_claimed: 'Composté. Valable. Elle avait le droit d’être dans ce train.',
      train_sat: 'Il s’est assis. Il a ôté sa casquette.',
      train_kvitfjell: '« Kvitfjell. » On ne ralentit pas.',
      train_passed: 'La voilà qui passe. Une lampe dans la neige. On ne s’est pas arrêtés.',
      train_again: 'Prochain arrêt, Kvitfjell. Encore. Ça tourne en rond.',
      train_brake: 'Accroche-toi à quelque chose.',
      train_brakeWait: 'Le frein d’urgence. Pas encore. Pas avant qu’elle ait son billet.',
      train_punchWait: 'La pince du contrôleur. Ce n’est pas mon billet qui en a besoin.',
      train_stopped: 'Kvitfjell.',
      train_out: 'Une lampe et la neige. C’est ici qu’il l’a fait descendre. Elle a dû rester juste là, à regarder les fenêtres s’en aller.',
    },
    lines: {
      train_boardPrompt: 'Monter dans le train',
      train_punchPrompt: 'Composter le billet de Lina',
      train_punchLook: 'La pince du contrôleur',
      train_brakePrompt: 'Tirer le frein d’urgence (maintenir)',
      train_brakeLook: 'Le frein d’urgence',
      pa_kvitfjell: '« Kvitfjell. Kvitfjell. Arrêt facultatif. »',
    },
    radio: {
      train_otto1: [
        ['radio', '[les roues, sous les parasites]'],
        ['otto', 'Neuf à Ada. Ce bruit. Vous êtes dans un train. J’aimerais que vous me disiez que vous avez un billet.'],
        ['ada', 'Je n’en ai pas.'],
        ['otto', 'Alors trouvez-en un avant que le contrôleur ne vous trouve. Sur mon étagère, ce sont les contrôleurs les pires. Ils sont très polis et ils ne s’arrêtent pas.'],
      ],
      train_otto2: [
        ['otto', 'Ada. Une fiche vient d’arriver toute seule par le tube. Un billet de train, non réclamé. De votre écriture. Vous rangiez donc mes étagères bien avant d’y descendre.'],
      ],
      train_otto3: [
        ['otto', 'C’est devenu calme de votre côté. C’est soit très bon, soit très mauvais. Si le train roule encore, arrêtez-le. Ces trains-là n’arrivent pas. Ils tournent en rond.'],
      ],
    },
    recap: {
      train: 'Nordlys Express, 19 décembre 1990. Le contrôleur Edvin Saether a fait descendre Lina Berg, quinze ans, du train de nuit à la halte de Kvitfjell, dans la neige, parce qu’elle ne trouvait pas son billet. Elle l’avait acheté elle-même ; il était sous sa couchette. Il a dit à l’enquête que personne n’avait été descendu. Le nettoyage a trouvé le billet à Nordvik et l’a envoyé au Dépôt 9, et je l’ai classé sans jamais demander à qui il était. Je l’ai fait composter, et j’ai arrêté le train là où elle était descendue.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
