/* Français — Chapitre 3 : Double programme (ciné-parc Pinewood). Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      pinewood: {
        name: 'CHAPITRE 3', title: 'Double programme', place: 'Ciné-parc Pinewood, au nord de Nordvik',
        intro: 'Vendredi 22 août 1975, un peu après onze heures du soir. La dernière nuit de la saison.\n\nLe second film passe sur un écran planté dans les arbres. Il n’a pas de son, et il ne finit pas. Un garçon de huit ans est allé aux toilettes pendant le changement de bobine et n’est pas revenu.',
      },
    },
    docs: {
      pine_program: { kind: 'notice', title: 'Un prospectus sur le comptoir du snack', from: 'Ciné-parc Pinewood', body:
`DERNIÈRE NUIT DE LA SAISON — VENDREDI 22 AOÛT

20 h 45   LE LONG ÉTÉ
22 h 40   LE LAC DE NUIT

TIRAGE DU TICKET CHANCEUX !
Gardez votre talon. À l’entracte, apportez-le à la fenêtre de la cabine et glissez-le dans la boîte. M. Hardy tirera le gagnant à la fin du second film.
À gagner : un ABONNEMENT pour la saison 1976. Tous les films, toute la voiture.

Merci de raccrocher les haut-parleurs à leurs poteaux. Roulez doucement. Attention aux enfants.` },
      pine_missing: { kind: 'notice', title: 'Une affiche sur le mur des toilettes', from: 'Police de Nordvik', date: 'Août 1975', body:
`DISPARU
MIKKEL STRAND, 8 ans

Vu pour la dernière fois au ciné-parc Pinewood le vendredi 22 août, vers 23 h, alors qu’il allait aux toilettes.
Cheveux blonds. Anorak bleu, bottes en caoutchouc rouges. Il avait la lampe de poche de son père.

Si vous l’avez vu, ou si vous avez vu quoi que ce soit cette nuit-là, appelez le commissariat de Nordvik.
Sa mère et son père vous le demandent. N’importe quoi.` },
      pine_statement: { kind: 'report', title: 'Déposition, copie', from: 'L. Hardy, projectionniste', date: '23 août 1975, 9 h 10', body:
`J’étais dans la cabine de sept heures du soir à deux heures du matin, comme tous les soirs de projection. J’ai passé les deux films sans interruption, à part les changements de bobine.

Je n’ai pas vu le garçon. Les enfants ne montent pas à la cabine. Les fenêtres de projection donnent sur l’écran et on ne voit pas les toilettes depuis la cabine.

Je n’ai pas quitté la cabine. Je n’avais pas bu.

Lu et signé,
L. Hardy` },
      pine_letter: { kind: 'letter', title: 'Une lettre sous l’oreiller du lit de camp', from: 'L. Hardy', date: 'Mars 1981, jamais envoyée', body:
`Madame Strand,

J’ai écrit ceci neuf fois. Cette fois, je l’envoie.

Votre garçon est venu à la fenêtre de la cabine à onze heures moins dix avec son talon pour le tirage. J’avais une bouteille ouverte et un changement de bobine qui arrivait, et je lui ai dit de revenir après. Il a dit : « Tu promets que tu le mettras dedans ? » J’ai dit allez, file.

À onze heures cinq, je suis sorti derrière le snack prendre l’air, et j’ai vu une petite lampe de poche entrer dans les arbres derrière les toilettes. Il y avait une autre lumière devant, plus loin. Une rouge, comme un feu stop. J’ai cru que c’étaient les grands qui faisaient les idiots. Je me suis dit, ce ne sont pas mes affaires. Je me suis dit, si je descends là-bas et que quelqu’un sent mon haleine, je perds ma licence, et la cabine, c’est tout ce que j’ai.

J’ai dit à la police que je n’avais rien vu. Je leur ai dit que les enfants ne viennent pas à la cabine.

Je n’ai jamais tiré le gagnant. La boîte est toujours sur l’établi.

L. Hardy` },
      pine_kiosk: { kind: 'note', title: 'Le cahier des objets trouvés de la guérite', from: 'Pinewood, saison 1975', body:
`16/8   gilet de dame, vert, rangée 2
16/8   thermos (sans bouchon)
22/8   une chaussette, enfant, rangée 4
22/8   23 h 40   CLÉS DE VOITURE sur une étiquette rouge, « STRAND ». Perdues par le père près des toilettes pendant les recherches. Rapportées par Jonna L. Je lui ai dit qu’elles étaient ici. Il n’est pas revenu les chercher.` },
      pine_wiper: { kind: 'note', title: 'Un mot sous l’essuie-glace du break', from: 'Papa', body:
`(Au stylo bille, au dos d’une carte routière, coincé sous l’essuie-glace de façon à faire face aux arbres.)

MIKKEL —
RESTE LÀ OÙ TU VOIS LES PHARES.
MARCHE VERS EUX.
ON TE CHERCHE.
PERSONNE N’EST FÂCHÉ.
— PAPA` },
      pine_staff: { kind: 'note', title: 'Punaisé dans la réserve', from: 'Bo', body:
`PERSONNEL —
Le groupe électrogène alimente le snack et l’éclairage du terrain.
Pour les clients en panne sèche : la cuve journalière a un robinet de vidange sur le côté. Un demi-bidon rouge, pas plus, et notez-le dans le cahier. Ouvrez le robinet DOUCEMENT. Il crache, il claque, et tout le terrain vous regarde.

La batterie de Lyle, c’est pour la lampe de SA cabine. Pas pour démarrer des voitures. Pas encore.
— Bo` },
      pine_search: { kind: 'report', title: 'Un avis de recherche cloué au mirador de chasse', from: 'Police de Nordvik', date: 'Samedi 23 août 1975', body:
`RECHERCHES — SECTEUR C (bois du nord-ouest)
Lignes de dix, à une longueur de bras.

Les chiens ont perdu la piste au vieux mirador de chasse.
Une botte d’enfant trouvée, gauche, rouge, à environ 40 m au nord du mirador.
Rien d’autre trouvé.

Recherches interrompues à la nuit. Reprise à 6 h.` },
      wren4: { kind: 'drawing', drawing: 4, title: 'Un dessin dans les feuilles', from: 'Wren, 7 ans', body:
`Crayon de cire. Un immense écran blanc dressé parmi des arbres noirs. Devant, un petit garçon en manteau bleu et bottes rouges, une lampe à la main, qui regarde par-dessus son épaule. Sur le bord supérieur de l’écran, le petit oiseau rouge.

En dessous :
IL S’EST RETOURNÉ` },
    },
    items: {
      stub: { name: 'Talon de ticket', desc: 'ENFANT — CINÉ-PARC PINEWOOD — 22 AOÛT 75 — No 1147. Il n’a jamais été glissé dans la boîte.' },
      carBattery: { name: 'Batterie de voiture', desc: 'Douze volts et très lourde. Elle alimentait la lampe de la cabine.' },
      carKeys: { name: 'Clés de voiture', desc: 'Deux clés sur une étiquette en plastique rouge. STRAND.' },
      jerrycan: { name: 'Jerrican rouge', desc: 'Vide. Il sent l’essence.' },
      fuel: { name: 'Jerrican d’essence', desc: 'À moitié plein. Il clapote quand on marche.' },
    },
    obj: {
      pine_start: 'Trouve un moyen de sortir de Pinewood',
      pine_parts: 'Fais démarrer le break : batterie, essence, clés ({n}/3)',
      pine_startCar: 'Démarre le break',
      pine_stubFind: 'Trouve le talon de ticket du garçon',
      pine_claim: 'Glisse le talon dans la boîte de la cabine de projection',
      pine_leave: 'Sors par le portail en voiture',
    },
    mono: {
      pine_start: 'Un écran de cinéma dans les arbres. Le film passe, et il n’y a aucun son.',
      pine_gate: 'Le portail est enchaîné. Cadenassé de ce côté, ce qui n’a aucun sens.',
      pine_wagon: 'Celle-ci a été sortie de sa rangée et tournée vers les arbres. Les phares sont allumés. La batterie est à plat.',
      pine_wagonNeeds: 'Batterie à plat, réservoir vide, pas de clés. Quelqu’un a laissé cette voiture phares allumés toute la nuit.',
      pine_battery: 'Une batterie de voiture. Elle alimentait la lampe de la cabine.',
      pine_batteryDark: 'Et maintenant la cabine est dans le noir.',
      pine_keys: 'STRAND. Il les a perdues en cherchant son fils.',
      pine_can: 'Un jerrican rouge. Vide.',
      pine_fill: 'Il crache. Il claque. Tout ce qui est dehors peut l’entendre.',
      pine_filled: 'Un demi-bidon. Ça suffira.',
      pine_tankNoCan: 'La cuve journalière du groupe électrogène. Il y a un robinet de vidange. Il me faut quelque chose à remplir.',
      pine_fitBattery: 'Batterie en place. Les phares se sont allumés tout seuls. Ils n’avaient jamais été éteints.',
      pine_inBeam: 'Un des arbres dans la lumière n’est pas planté comme il faut.',
      pine_fuel: 'Essence versée.',
      pine_startFail: 'Il tourne. Il tourne. Il cale. Tout a entendu ça.',
      pine_notYet: 'Il tourne et ne prend pas. Comme si l’endroit n’en avait pas fini avec moi.',
      pine_stubHint: 'Il est venu à la cabine avec son talon pour le tirage. Puis il est allé aux toilettes.',
      pine_stub: 'Un talon de ticket d’enfant. Numéro onze cent quarante-sept. Il n’a jamais pu le glisser dans la boîte.',
      pine_claimed: 'Voilà. Tu étais là. Tu as été compté.',
      pine_draw: 'Il aurait gagné.',
      pine_start2: 'Il a pris. Oh, il a pris.',
      pine_end: 'Dans le rétroviseur, l’écran devient blanc, puis noir. Quelqu’un a éteint le projecteur.',
      pine_booth: 'La cabine. Poussière chaude et whisky.',
      pine_toilets: 'La porte de derrière est ouverte sur les arbres.',
      pine_clearing: 'Un mirador de chasse. Les feuilles sont piétinées en cercle tout autour.',
      pine_pines: 'Certains de ces arbres ont bougé depuis la dernière fois que j’ai regardé.',
      pine_stag: 'Quelque chose de grand vient de traverser le terrain. Des bois plus larges qu’une voiture.',
      pine_usher: 'Une lumière rouge entre les voitures. Quelqu’un qui conduit les gens à leur place.',
      pine_swing: 'La balançoire bouge. Il n’y a pas de vent.',
      pine_gateOpen: 'Au loin, une chaîne qui tombe sur le gravier.',
      pine_canLook: 'La boîte du tirage. Une poignée de talons au fond, sous la dernière bobine.',
    },
    lines: {
      pine_stubPrompt: 'Un talon de ticket par terre',
      pine_canPut: 'Glisser le talon dans la boîte',
      pine_canLook: 'Une boîte à film ouverte sur l’établi de rembobinage',
      pine_tankPrompt: 'Remplir le jerrican au robinet de vidange (maintenir)',
      pine_tankLook: 'La cuve journalière du groupe électrogène',
      pine_wagonLook: 'Le break des Strand',
      pine_wagonBattery: 'Installer la batterie',
      pine_wagonFuel: 'Verser l’essence',
      pine_wagonStart: 'Démarrer le moteur (maintenir)',
      pine_wagonGo: 'Monter et partir',
    },
    radio: {
      pine_otto1: [
        ['radio', '[parasites, et le cliquetis d’un projecteur en dessous]'],
        ['otto', 'Neuf à Ada. Des arbres ? Un écran ? Pinewood. Un ciné-parc au nord de Nordvik, 1975. J’en ai une boîte ici : onze clés de voiture, une botte rouge de garçon et la dernière bobine d’un film que personne n’a vu jusqu’au bout.'],
        ['ada', 'Le film passe encore. Sans son.'],
        ['otto', 'Il n’y en a jamais, ici. Deux choses. Les arbres, là-bas, ne bougent que lorsque vous bougez. Et si vous voyez une lumière rouge entre les voitures, elle n’est pas là pour vous aider à trouver votre place.'],
      ],
      pine_ottoStag: [
        ['otto', 'C’était le Cerf. Il écoute. Quand il baisse la tête, mettez quelque chose de solide entre vous. Un arbre. Une voiture. Il ne s’arrête pour rien d’autre.'],
      ],
      pine_draw: [
        ['lyle', '[tous les haut-parleurs du terrain à la fois : un grésillement, un souffle, un homme trop près du micro]'],
        ['lyle', 'Mesdames et messieurs. Le ticket chanceux. Un abonnement pour mille neuf cent soixante-seize.'],
        ['lyle', 'Numéro onze cent... quarante-sept.'],
        ['lyle', 'Onze cent quarante-sept. Est-ce que le onze cent quarante-sept est là ?'],
        ['lyle', 'Monte à la cabine, fiston. J’ai promis.'],
      ],
      pine_otto2: [
        ['otto', 'La boîte de Pinewood. La botte en est partie. Il y a un talon de ticket à sa place. Quelqu’un a écrit dessus au crayon : « Gagnant. »'],
      ],
    },
    recap: {
      pinewood: 'Le ciné-parc Pinewood, dernière nuit de 1975. Le projectionniste, Lyle Hardy, a dit à la police que les enfants ne venaient jamais à sa cabine et qu’il n’avait rien vu. Mikkel Strand, huit ans, est venu à la cabine avec son talon pour le tirage, a été renvoyé, et a suivi une lumière rouge dans les arbres sous les yeux de Lyle. J’ai glissé le talon du garçon dans la boîte, et tous les haut-parleurs du terrain ont annoncé son numéro. Puis je suis sortie par le portail au volant de la voiture de son père.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
