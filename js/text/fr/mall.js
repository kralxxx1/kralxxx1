/* Français — Niveau 7 : Harlow Mall (13 décembre 1986, le plus beau jour). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      mall: {
        name: 'LEVEL 7', title: 'Harlow Mall', place: 'Le souvenir de tout le monde — samedi 13 décembre 1986',
        intro: 'Le plus beau samedi de 1986. Cinq gamins, vingt dollars à eux tous, un sapin de Noël haut de trois étages.\n\nLe centre commercial est fermé maintenant. Les mannequins se sont rapprochés des vitrines. Ils ne bougent que quand personne ne regarde.',
      },
    },
    items: {
      frame: { name: 'Vignette de photomaton', desc: 'Une case d’une bande de photomaton, découpée. La cabine les veut de nouveau ensemble.' },
      frame1: { name: 'Vignette de photomaton', doc: 'mall_frame1' },
      frame2: { name: 'Vignette de photomaton', doc: 'mall_frame2' },
      frame3: { name: 'Vignette de photomaton', doc: 'mall_frame3' },
      frame4: { name: 'Vignette de photomaton', doc: 'mall_frame4' },
    },
    docs: {
      mall_intro: { kind: 'note', title: 'Au dos d’un plan du centre commercial', from: 'Eddie', body:
`Le photomaton près de l’espace restauration est cassé. Il veut qu’on lui rende ses photos.

Quatre vignettes d’une bande photo sont éparpillées dans les boutiques. Trouve-les, glisse-les dans la cabine, et les portes s’ouvrent.

Les mannequins. Ne les quitte pas des yeux. Je le dis au sens propre. Ils ne bougent pas tant que tu les regardes.

C’est l’endroit le plus heureux de tout le jeu, et c’est celui que je déteste le plus.

—E.` },
      mall_directory: { kind: 'note', title: 'Plan du centre, « VOUS ÊTES ICI » effacé par les doigts', from: 'Harlow Mall', date: '1986', body:
`NIVEAU 1
Spins Records ......... Musique, cassettes, cassettes vierges
Comic Vault ........... BD, cartes, jeux
Toy Parade ............ Jouets pour tous les âges
Photomaton ............ 4 poses 1 $
Espace restauration ... Sunny Orange, Nonna’s Pizza, Pretzel Barn
Starlight Jr. ......... Mini-kiosque d’arcade (près de la fontaine)

Ouvert jusqu’à 21 h jusqu’au réveillon !` },
      mall_frame1: { kind: 'photo', photo: 'frame', title: 'Vignette de photomaton n° 1', from: 'Photomaton', date: '13 déc. 1986', body:
`Danny et Rosie. Danny fait semblant de s’ennuyer. Rosie fait semblant d’être DJ et parle dans un bretzel comme dans un micro.` },
      mall_frame2: { kind: 'photo', photo: 'frame', title: 'Vignette de photomaton n° 2', from: 'Photomaton', date: '13 déc. 1986', body:
`Nell et Toby. Nell sourit vraiment, un vrai sourire, et elle a l’air surprise elle-même. Toby lui a mis un bonnet de père Noël.` },
      mall_frame3: { kind: 'photo', photo: 'frame', title: 'Vignette de photomaton n° 3', from: 'Photomaton', date: '13 déc. 1986', body:
`Toi et Toby, joue contre joue, en train de faire exactement la même grimace. Tes yeux sont fermés à force de rire.` },
      mall_frame4: { kind: 'photo', photo: 'frame', title: 'Vignette de photomaton n° 4', from: 'Photomaton', date: '13 déc. 1986', body:
`Tous les cinq entassés sur un seul tabouret. Le coude de Danny est dans ton oreille. Personne ne regarde l’objectif. Tout le monde se regarde.` },
      mall_strip: { kind: 'photo', photo: 'strip', title: 'La bande photo, encore tiède', from: 'Photomaton', date: '13 déc. 1986', body:
`Quatre vignettes, une bande. Au dos, cinq signatures et une ligne de l’écriture ronde de Rosie :

« AMIS POUR TOUJOURS. MÊME SI ON DEVIENT VIEUX ET ENNUYEUX.
MÊME SI ON DÉMÉNAGE.
MÊME SI.
— les Starlight Five »

Tu te souviens de qui a gardé la bande. Toby. Dans sa boîte à briquet.` },
      mall_lists: { kind: 'note', title: 'Cinq listes de Noël sur une seule feuille de cahier', from: 'Les Starlight Five', date: 'Décembre 1986', body:
`DANNY : un travail pour mon père. (et aussi un skate)
ROSIE : un vrai micro. des cassettes vierges (100)
NELL : Star Rangers n° 12. que Theo n’ait plus jamais peur de l’eau
TOBY : une lampe qui s’use jamais. que Sam se fâche plus pour des bêtises
SAM : le niveau 256

(Quelqu’un a barré le vœu de SAM et a écrit en dessous, de la main de Toby : « on l’aura ensemble »)` },
      mall_receipt: { kind: 'note', title: 'Un ticket de caisse coincé dans un bac à disques', from: 'Spins Records', date: '13/12/86 15 h 41', body:
`CASSETTE VIERGE KEYTONE C-90 x10 ..... 14,90 $
BIG BAND CHRISTMAS (33 t. occasion) .. 1,00 $
TOTAL ................................ 15,90 $
ESPÈCES .............................. 16,00 $
RENDU ................................ 0,10 $

Au dos : « Face A : des chansons pour maintenant. Face B : pour après. — R. »` },
      mall_guard: { kind: 'note', title: 'Main courante de l’agent de sécurité', from: 'Sécurité du Harlow Mall', date: '13 décembre 1986', body:
`14 h 20 — Cinq gamins à la fontaine qui jettent des pièces. Leur ai dit d’arrêter. Ils ont arrêté. Puis recommencé. Laissé filer. C’est Noël.

16 h 05 — Les mêmes cinq dans le photomaton. Cabine bloquée. Les gamins l’ont réparée eux-mêmes (le grand avait un tournevis). N’ai pas posé de questions.

17 h 30 — Le plus petit perdu. Retrouvé en pleurs près de la fontaine. Les quatre autres sont arrivés en courant de quatre directions. Tout le monde s’est serré dans les bras. Je le note parce que c’était beau.` },
      mall_kiosk: { kind: 'note', title: 'Un prospectus sur le kiosque Starlight Jr.', from: 'Walt', date: '1986', body:
`STARLIGHT JR.
L’arcade Starlight s’installe au centre commercial !
3 bornes • 25 ¢ • Ouvert le week-end

« Chaque enfant mérite un record. » — Walt, propriétaire

(Dans le coin, un vieux dessin au crayon gras collé sur l’enseigne : une créature orange toute ronde avec des cornes et un grand sourire, sur de petites pattes. Signé : LIL.)` },
      mall_walt: { kind: 'diary', title: 'Le journal de Walt, une page tachée', from: 'Walt', date: 'À l’intérieur', body:
`Le centre commercial. J’avais un kiosque ici. J’avais collé le vieux dessin de Lily sur l’enseigne. Chompy, avec des pattes.

Ces cinq-là passaient tous les samedis cet hiver-là. Le bruyant, celle aux cassettes, la discrète à lunettes, le petit au briquet, et l’inséparable du petit.

L’inséparable. Je ne me souviens plus du prénom. Il commence par un S.

C’est important. Je ne sais pas pourquoi c’est important.` },
      mall_lily5: { kind: 'drawing', drawing: 5, title: 'Un dessin scotché dans le kiosque Starlight Jr.', from: 'Lily, 8 ans', date: 'Décembre 1982', body:
`Crayon gras. Le grand sapin de Noël de Front Street. À son pied, une créature orange toute ronde avec des cornes et des pattes tient la main d’une petite fille. La neige tombe en points bleus.

PAPA DIT QU’UN JOUR IL Y AURA UN STARLIGHT DANS CHAQUE VILLE.
MÊME UN PETIT DANS UN CENTRE COMERCIAL.
(J’AI DESSINÉ CHOMPY) (PAPA DIT QUE C’EST MOI QUI L’AI INVENTÉ)` },
      mall_tape: { kind: 'tape', title: 'Cassette : « Message de Noël »', from: 'Le magnétophone de Rosie', date: '13 décembre 1986', body:
`[Clic. Brouhaha de l’espace restauration, musique de Noël, une fontaine.]

ROSIE : Ici Rosie Radio, en direct de l’espace restauration, avec un message de Noël pour… nous, plus tard. À vous.

DANNY : Danny du futur, t’as intérêt à être riche.

NELL : Euh. Nell du futur. J’espère que tu es toujours amie avec ces idiots.

TOBY : Toby du futur, t’es sûrement plus grand. Enfin.

SAM : Sam du futur… n’oublie pas ça.

ROSIE : C’est gnangnan, Sam.

SAM : Chut, c’est Noël.

[Tout le monde rit. Quelqu’un fait tomber un plateau.]

ROSIE : Rosie Radio rend l’antenne. Joyeux Noël, Harlow.

[Clic.]` },
    },
    obj: {
      mall_frames: 'Trouver les vignettes de la bande photo ({n}/4)',
      mall_booth: 'Glisser les vignettes dans le photomaton',
      mall_leave: 'Sortir par les portes du centre commercial',
    },
    mono: {
      mall_start: 'Le centre commercial. Bretzels et sapin. Ici, j’étais bien. Je l’avais oublié.',
      mall_frame1: 'Danny et Rosie. Il faisait toujours semblant de ne pas s’amuser.',
      mall_frame2: 'Nell et Toby. Elle ne souriait jamais sur les photos. Sur celle-là, si.',
      mall_frame3: 'Toby et moi. La même grimace. On faisait toujours la même grimace.',
      mall_frame4: 'Tous les cinq sur un tabouret.',
      mall_strip: 'Il l’a gardée. Dans la boîte à briquet. Il l’a gardée.',
      mall_mannequin: 'Ce mannequin regardait la vitrine. Maintenant, il me regarde.',
    },
    lines: {
      mall_boothUse: 'Glisser les vignettes dans le photomaton',
      mall_boothLook: 'Photomaton (4 poses 1 $)',
      mall_boothNeed: 'La cabine ronronne. Il en manque encore {n}.',
    },
    radio: {
      mall_start: [
        ['eddie', 'Le centre commercial. Ils étaient tous si heureux ici, Sam. Chaque souvenir de cet endroit est chaud.'],
        ['eddie', 'C’est justement pour ça que le jeu peut s’y accrocher si facilement.'],
      ],
      mall_mannequin: [
        ['eddie', 'Ne cligne pas des yeux. Je suis sérieux. Recule s’il le faut.'],
      ],
      mall_frames: [
        ['eddie', 'Les quatre. Le photomaton est près de l’espace restauration.'],
      ],
      mall_booth: [
        ['eddie', '…Les Starlight Five. C’est comme ça que Walt vous appelait. Ça me revient.'],
        ['eddie', 'Ne t’attache pas trop à tout ça, Sam. Ce sont des échos. Le jeu les rejoue pour te garder ici.'],
        ['sam', 'C’est ce qui t’est arrivé ?'],
        ['eddie', '…Les portes sont ouvertes. Vas-y.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
