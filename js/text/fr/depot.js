/* Français — Prologue : Service de nuit (Dépôt 9). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      depot: {
        name: 'PROLOGUE', title: 'Service de nuit', place: 'Dépôt 9, gare centrale de Halvard',
        intro: 'Halvard, la nuit du 13 janvier 1998. La pluie sur la verrière de la gare centrale.\n\nSous le hall se trouve le Dépôt 9, où tout ce que la ville perd attend quatre-vingt-dix jours que quelqu’un revienne le chercher. Ada Lind tient le guichet de nuit depuis huit ans. Personne ne descend après minuit.\n\nC’est pour ça qu’elle a pris le poste.',
      },
    },
    docs: {
      depot_handover: { kind: 'note', title: 'Note de relève', from: 'Benny', date: 'Mar. 13 janv.', body:
`Ada —

Relève :
• 14 parapluies entrés. Il pleut, alors.
• L’homme au trombone est revenu. Toujours pas son trombone.
• La goulotte se bloque encore. Tape à GAUCHE.
• Ton casier ne ferme pas. La cassette est toujours dedans. Je n’y ai pas touché.
• Quelqu’un d’en haut a demandé si on « avait encore l’ascenseur ». J’ai dit que personne ne s’en sert depuis 1964. Il a dit : « Ce n’est pas ce que j’ai demandé. »

Plus de café. Désolé.
— Benny` },
      depot_log: { kind: 'printout', title: 'Registre de nuit, page 212', from: 'A. Lind', date: '13/14.01.98', body:
`DÉPÔT 9 — REGISTRE DE NUIT — A. LIND

23:10  Ticket 4471 : gant, dame, gris. Réclamé.
00:40  Nettoyage quai 2 : valise, beige, sans étiquette. Enregistrée sous le no 241.
01:15  Téléphone. Personne. (Troisième nuit.)
02:30  Forte pluie. Goulotte calme.
02:56  Rien d’autre à signaler.` },
      depot_tag: { kind: 'card', title: 'L’étiquette de réclamation sur le colis', from: 'A.', body:
`GARE CENTRALE DE HALVARD — DÉPÔT 9 — OBJETS TROUVÉS

RÉCLAMATION 256
Une moufle, rouge, enfant, main gauche.
Trouvée : lac Ostra, 14 janvier 1979.
À GARDER POUR : ADA LIND.

— A.

(Tapée sur une machine au « e » décalé, de celles que le dépôt a jetées en 1964. L’encre est encore humide.)` },
      wren1: { kind: 'drawing', drawing: 1, title: 'Un dessin plié dans le colis', from: 'Wren, 7 ans', body:
`Crayon de cire. Un petit oiseau rouge sur une clôture. Une grande fille à l’écharpe verte s’éloigne sur une route, de dos. Au-dessus d’elle, en grosses lettres : ADA.

Au dos, avec le même crayon :
POUR QUE TU CONNAISSES LE CHEMIN` },
      depot_ledger: { kind: 'report', title: 'Registre des objets trouvés, 1979, vol. 1', from: 'Dépôt 9', body:
`No 253 — 14.01.79 — Gants, homme, cuir marron — Quai 3 — réclamés le 16.01
No 254 — 14.01.79 — Parapluie, noir — Salle d’attente — réclamé le 15.01
No 255 — 14.01.79 — Livre, « La Reine des neiges », enfant — Quai 4 — non réclamé
No 256 — 14.01.79 — Moufle, rouge, enfant, main gauche — trouvée : lac Ostra — Ayant droit : sa sœur, quand elle se souviendra.

(La dernière ligne est d’une main tremblante que tu connais presque. L’encre est humide. Scotchée à l’intérieur du couvercle : une clé en laiton marquée SURINT.)` },
      depot_ottoNotes: { kind: 'diary', title: 'Notes dans le bureau du surintendant', from: 'Otto Brandt', date: '14 février 1964', body:
`Quarante et un mille objets depuis 1906. Chacun appartenait à quelqu’un.

La nuit, je me suis mis à entendre le vieux tube. Des notes, signées « A. » Elle connaît notre registre mieux que moi.

Elle écrit qu’il existe un étage sous les étages, où va tout ce que personne n’est venu chercher. Un bureau de tri. Elle écrit qu’il y manque un employé.

J’ai gravé le numéro au-dessus du bouton pour ne pas perdre courage.

Si je ne suis pas revenu au matin : les parapluies vont dans la cage, pas à la poubelle.

— O.B.` },
      depot_memo: { kind: 'note', title: 'Une note dans la cartouche du tube', from: 'A.', body:
`INDEX — NIVEAU 256 — INTERNE

À : Dépôt 9, guichet de nuit.

Ada.
La clé de l’ascenseur est sur son bureau. Apporte la moufle, et ne la pose pas.
Otto sera sur le canal neuf. Dis-lui que les parapluies sont dans la cage.

— A.` },
      depot_calendar: { kind: 'notice', title: 'Calendrier des Transports de Halvard, 1964', body:
`FÉVRIER 1964

(Les jours sont barrés jusqu’au 13. Le 14, au crayon : « Service de nuit. Le dernier ? » Sous la photo du nouveau barrage d’Ostra, le même crayon : « Ils noient la vallée à l’automne. Le journal dit qu’une vieille femme là-haut refuse de partir. » Personne n’a tourné la page depuis.)` },
      depot_poster: { kind: 'notice', title: 'Avis dans le hall public', from: 'Transports de Halvard', body:
`OBJETS TROUVÉS — DÉPÔT 9

Les objets trouvés dans les gares et les trains sont conservés ici QUATRE-VINGT-DIX JOURS.
Merci de vous munir d’une preuve de propriété.
Les objets non réclamés sont vendus ou détruits.

(Épinglé dessous, au feutre : « TROUVÉ : chat gris, répond au nom d’Amiral. Demandez à Benny. »)` },
      depot_kitchen: { kind: 'card', title: 'Une carte postale au-dessus de l’évier', from: 'Mamie', date: '1995', body:
`(Une vue d’hiver du lac Ostra. Sur la glace, tout petit, le clocher de l’église engloutie.)

Ada —
La glace est épaisse cette année. Le 14 tombe un samedi. Viens si tu peux. Je mettrai la bougie à la fenêtre comme toujours.
Mamie` },
    },
    items: {
      mitten: { name: 'Moufle rouge (gauche)', desc: 'Une moufle d’enfant en laine rouge, reprisée au pouce. L’autre a été trouvée sur la glace il y a dix-neuf ans.' },
      ottoKey: { name: 'Clé du surintendant', desc: 'En laiton, marquée SURINT. Elle était scotchée dans le couvercle de la boîte du registre de 1979.' },
      elevatorKey: { name: 'Clé du monte-charge', desc: 'Une longue clé sur une étiquette marquée MONTE-CHARGE. Celle d’Otto Brandt.' },
      badge: { name: 'L’insigne d’Otto', desc: 'Ovale en laiton : DÉPÔT 9 — OTTO BRANDT. Usé là où un pouce l’a frotté.' },
      parcel: { name: 'Colis' },
    },
    obj: {
      depot_log: 'Termine le registre de nuit à ta machine à écrire',
      depot_parcel: 'Regarde ce qui est tombé dans la goulotte',
      depot_torch: 'Prends ta lampe dans ton casier',
      depot_power: 'Réarme le disjoncteur principal dans la salle de tri',
      depot_ledger: 'Trouve le registre de 1979 dans les archives',
      depot_otto: 'Fouille le bureau d’Otto Brandt',
      depot_elevator: 'Descends par le monte-charge',
    },
    mono: {
      depot_start: '02:51. La pluie sur la verrière, là-haut. Encore une ligne et le registre de nuit est fini.',
      depot_start2: 'Personne ne descend ici après minuit. C’est tout l’intérêt du boulot.',
      depot_logDone: '02:56. Rien d’autre à signaler.',
      depot_chute: 'La goulotte. Personne ne poste de colis à trois heures du matin.',
      depot_mitten: 'Main gauche. Rouge. Celles de Wren étaient rouges. Toutes étaient rouges en 1979.',
      depot_dark: 'Et voilà le courant qui saute. Ma lampe est dans mon casier.',
      depot_torch: 'Les piles sont encore bonnes. Benny n’emprunte jamais rien d’utile.',
      depot_tape: 'La cassette de Mamie. Deux ans dans mon casier. Pas ce soir.',
      depot_tape2: 'Pas ce soir, j’ai dit.',
      depot_powerBack: 'Voilà. Les vieux câbles boudent toujours une minute d’abord.',
      depot_tube: 'C’était le vieux tube pneumatique dans le bureau du surintendant. Il ne marche plus depuis 1964. L’étiquette dit 1979. Le registre est aux archives.',
      depot_archive: 'Quarante et un mille choses que personne n’est venu chercher.',
      depot_sorter: 'Il y avait quelqu’un au bout de l’allée. Grand, en manteau gris. Il triait des cartons dans le noir.',
      depot_ledgerAfter: 'Ce n’est pas l’écriture de Benny. Ce n’est l’écriture de personne. Et il y a une clé scotchée dans le couvercle : SURINT. Le bureau d’Otto Brandt.',
      depot_ottoLocked: 'SURINTENDANT. Fermé depuis 1964. Benny dit que la clé est partie avec lui.',
      depot_ottoLocked2: 'Toujours fermé.',
      depot_ottoIn: 'Sa lampe est allumée. Il reste du café dans sa tasse. Trente-quatre ans.',
      depot_badge: 'OTTO BRANDT. On ne laisse pas son insigne à moins de vouloir revenir le chercher.',
      depot_elevKey: 'MONTE-CHARGE. Celui que personne n’a pris depuis lui.',
      depot_noKey: 'Le panneau demande une clé. Évidemment.',
      depot_noKey2: 'Il faut toujours la clé.',
      depot_256: 'Quelqu’un a gravé un numéro au-dessus du bouton le plus bas. 256.',
      depot_wren: 'Il y avait quelqu’un dans la cabine. Un enfant en combinaison de neige rouge. Une seconde.',
      depot_gate: 'La grille du hall. Fermée d’en haut à minuit. Règlement de la gare.',
      depot_elevatorShut: 'Le monte-charge. Hors service depuis 1964.',
    },
    lines: {
      depot_typePrompt: 'Taper la dernière ligne du registre de nuit',
      depot_parcelPrompt: 'Ouvrir le colis',
      depot_tapePrompt: 'La cassette de Mamie',
      depot_breakerPrompt: 'Réarmer le disjoncteur principal (maintenir)',
      depot_ledgerPrompt: 'Boîte du registre : 1979',
      depot_badgePrompt: 'L’insigne d’Otto',
      depot_callPrompt: 'Tourner la clé, appuyer sur le bouton le plus bas',
      depot_ottoUnlock: 'Ouvrir avec la clé du surintendant',
    },
    recap: {
      depot: 'Dépôt 9, 02:56. Un colis est tombé dans la goulotte : une moufle rouge, main gauche, et une étiquette qui disait « À garder pour Ada Lind ». Le registre de 1979 disait : ayant droit, sa sœur, quand elle se souviendra. J’ai pris le monte-charge d’Otto Brandt jusqu’au bouton que quelqu’un avait gravé : 256.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
