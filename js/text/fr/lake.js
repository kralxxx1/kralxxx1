/* Français — Chapitre 9 : La glace (lac Ostra), et les trois fins. Bible : docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      lake: {
        name: 'CHAPITRE 9', title: 'La glace', place: 'Lac Ostra',
        intro: 'Dimanche 14 janvier 1979, 15 h 40.\n\nLa maison de Mamie, au bord du lac. Le poêle est allumé et la radio marche. Sur le lac, les grands sont aux cabanes de pêche, et la neige arrive du nord.\n\nWren est quelque part là-dehors.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'La radio, en sourdine, sur la table', from: 'Météo de la région des lacs', date: 'Dimanche 14 janvier 1979, 15 h 30', body:
`...averses de neige cet après-midi, se transformant en fortes chutes de neige à partir de seize heures environ, avec un vent du nord soutenu et des congères. Visibilité presque nulle en terrain découvert et sur les lacs après la tombée de la nuit.

La glace du lac Ostra est signalée dangereuse au-dessus de l’ancien lit de la rivière, du côté nord-ouest. Il est demandé à chacun de ne pas s’aventurer du tout sur la glace à cet endroit.

Et maintenant, le journal de quinze heures trente...` },
      lake_granNote: { kind: 'note', title: 'Un mot sur la table de la cuisine', from: 'Mamie', date: 'Dimanche', body:
`Ada —

Montée à la ferme chercher le lait. De retour à quatre heures et demie.
Wren ne va PAS sur la glace. Tu la gardes à l’intérieur avec toi.
Il y a des brioches dans la boîte, une chacune.

Mamie` },
      lake_wrenNote: { kind: 'note', title: 'Une feuille collée à la porte des filles', from: 'Wren', date: '(sans date)', body:
`ADA
JE VIENS AUSSI

(Un oiseau rouge dessiné en dessous, qui vole derrière un oiseau plus grand avec une bande verte autour du cou.)` },
      lake_diary: { kind: 'note', title: 'Un journal intime sous l’oreiller du haut', from: 'Ada, 12 ans', date: '14 janv. 1979', body:
`Sunna et Per et tous les autres seront aux cabanes après le déjeuner. SUNNA M’A INVITÉE.

Sunna a dit amène ton petit oiseau, on la mettra dans le trou. Ha ha.

Je ne l’amène PAS. Elle me suit partout comme un chien et après elle pleure et tout le monde me regarde. Une fois, juste une fois, je veux aller quelque part sans elle.` },
      lake_search: { kind: 'report', title: 'Un rapport plié dans le hangar à bateaux', from: 'Police du district d’Ostra', date: 'Janvier 1979', body:
`Enfant disparue : Wren LIND, 7 ans, de la maison Lind, rive sud, lac Ostra.

14.1, 16 h 50. Disparition signalée par sa grand-mère, Mme Ingrid Lind, à son retour.
La sœur de l’enfant, Ada Lind, 12 ans, déclare que Wren n’est pas venue avec elle sur la glace et qu’elle la croyait à la maison.
Recherches : la maison, les dépendances, les bois au sud et la route, toute la nuit. Forte neige.
16.1, 11 h 20. Une moufle rouge d’enfant (main droite) trouvée sur la glace à environ 300 mètres au nord-ouest des cabanes de pêche, au-dessus de l’ancien lit de la rivière. Glace dangereuse. Plongée impossible avant le dégel.` },
      lake_hutNote: { kind: 'note', title: 'Un paquet de cigarettes, griffonné', from: '(les grands)', date: '14.1.79', body:
`PER + SUNNA

LE PETIT OISEAU D’ADA L’A ENCORE SUIVIE
CUI CUI

(un dessin d’oiseau à la tête triste et une flèche qui montre la sortie de la cabane)` },
      lake_tape: { kind: 'transcript', title: 'Une cassette dans le magnétophone : « POUR ADA »', from: 'Ingrid Lind', date: 'Décembre 1995', body:
`[un déclic ; une horloge de cuisine qui fait tic-tac ; quelqu’un qui s’installe dans un fauteuil]

Ada. C’est Mamie. Ils disent que je ne vais pas bien, alors je vais le dire sur la cassette, parce que je n’ai jamais su te le dire en face.

J’ai toujours su que tu l’avais vue sur la glace. Je l’ai su à ton visage ce soir-là. Je ne t’ai jamais rien demandé, parce que j’avais peur de ce que ça te ferait de le dire. Je me suis dit que c’était de la bonté.

Ça n’en était pas. Les femmes de cette famille se taisent et appellent ça de la bonté. Ma mère a attendu que mon frère vienne la chercher, il n’est jamais venu, et personne ne l’a jamais dit à voix haute, pas une seule fois.

Dis-le, ma fille. Dis-le à voix haute, à quelqu’un. Et puis va la retrouver.

[l’horloge ; un long souffle ; la bande défile jusqu’au bout]` },
    },
    items: {
      mitten: { name: 'Moufle rouge', desc: 'Une moufle d’enfant, rouge, main gauche. Elle est arrivée dans le colis. L’autre a été trouvée sur la glace.' },
    },
    obj: {
      lake_start: 'Trouve Wren',
      lake_trail: 'Suis ses traces jusque sur la glace',
      lake_huts: 'Va aux cabanes, là où étaient les grands',
      lake_remember: 'Souviens-toi',
      lake_thin: 'Va sur la glace mince au-dessus de l’ancienne rivière',
      lake_say: 'Dis-le-lui',
    },
    mono: {
      lake_start: 'La maison de Mamie. Le poêle est allumé. La radio marche. On est en mille neuf cent soixante-dix-neuf.',
      lake_empty: 'Personne. Mamie est partie chercher le lait. Les bottes de Wren ne sont pas près de la porte.',
      lake_note: '« Tu la gardes à l’intérieur avec toi. » Je ne l’ai pas fait.',
      lake_wrenNote: 'Elle écrivait toujours mon nom en premier.',
      lake_out: 'De petites traces dans la neige. Jusqu’à la rive. Sur la glace.',
      lake_ice: 'La glace chante. Elle fait ça quand il fait froid.',
      lake_wren: 'Du rouge. Là-bas. Qui s’éloigne.',
      lake_huts: 'Les cabanes. Quelqu’un rit là-dedans.',
      lake_laughers: 'Ils se moquent de moi. Ils se moquaient de moi déjà à l’époque.',
      lake_hole: 'Le trou dans la glace. J’étais là quand je l’ai entendu.',
      lake_remember1: 'Elle est entrée derrière moi. Le visage tout rose de froid. « Ada, je suis venue aussi. »',
      lake_remember2: 'Et ils m’ont tous regardée. Et j’ai repoussé sa main de ma manche et j’ai dit, fiche le camp, Wren. Rentre à la maison. Fiche le camp.',
      lake_remember3: 'Elle est partie. Du mauvais côté. Dans la neige, on ne voyait pas la rive.',
      lake_remember4: 'Et puis la glace a fait un bruit. Un long bruit. Là-bas, sur la gauche. Et je ne me suis pas retournée, parce qu’ils me regardaient.',
      lake_storm: 'La neige arrive. Je ne vois plus la maison.',
      lake_thin: 'La glace est sombre ici. Mince. Marche. Ne cours pas.',
      lake_hush: 'Quelque chose dans la neige derrière moi. Une écharpe verte.',
      lake_quiet: 'Tout est devenu si silencieux. Je n’entends plus mes propres pas.',
      lake_found: 'La voilà.',
      lake_tape: 'La voix de Mamie. J’ai cette cassette dans mon casier depuis deux ans et je ne l’ai jamais écoutée.',
      lake_gone: 'La piste continue, vers la gauche. Vers la rivière.',
    },
    lines: {
      lake_radioPrompt: 'Écouter la radio',
      lake_tapePrompt: 'Écouter la cassette',
      lake_holePrompt: 'Regarder dans le trou',
      lake_choiceTitle: 'Wren se tient sur la glace mince, de dos.',
      lake_sayIt: 'Le dire. Tout.',
      lake_vanished: '« Elle a disparu, c’est tout. Personne n’a rien vu. »',
      lake_say1: '« Je t’ai dit de ficher le camp. »',
      lake_say2: '« Tu es partie du mauvais côté, j’ai entendu la glace et je ne me suis pas retournée. »',
      lake_say3: '« J’ai dit à Mamie que tu n’étais jamais sortie. Je les ai laissés te chercher dans les bois. »',
      lake_give: 'Lui donner la moufle',
    },
    radio: {
      lake_otto1: [
        ['radio', '[de la neige sur les parasites, très douce]'],
        ['otto', 'Neuf à Ada. Je vous entends à peine. Celle-ci n’est pas mon étagère. Je ne la vois pas du tout. Je crois qu’elle est à vous.'],
        ['otto', 'Quoi que vous trouviez là-bas, dites-le-lui à elle. Pas à moi.'],
      ],
      lake_otto2: [
        ['otto', 'Ada. Quelque chose sur cette étagère retire le son de toute chose. Ne le laissez pas s’approcher assez pour prendre le vôtre.'],
      ],
    },
    recap: {
      lake: 'Le lac Ostra, 14 janvier 1979. J’avais douze ans. Wren m’a suivie sur la glace jusque dans la cabane où étaient les grands, et je lui ai dit de ficher le camp. Elle est partie du mauvais côté dans la neige, au-dessus de l’ancienne rivière où la glace est mince, et je l’ai entendu, et je ne me suis pas retournée. Puis je suis rentrée et j’ai dit à Mamie qu’elle n’était jamais sortie.',
    },
    endings: {
      thaw: {
        title: 'DÉGEL', subtitle: 'La vérité, dite à voix haute',
        lines: [
          'Je le dis. Tout. Les mots sortent de moi comme quelque chose que j’aurais gardé dans ma bouche pendant dix-neuf ans.',
          'Wren se retourne. Son visage est rose de froid. Elle me regarde comme elle m’a toujours regardée, comme si j’étais plus grande que je ne le suis.',
          'Je lui donne la moufle. Elle l’enfile. Elle lève les deux mains pour me les montrer : deux moufles rouges, de nouveau une paire.',
          'Puis elle se retourne et rentre à la maison sur la glace, vers les lumières de la maison, et elle ne se retourne pas. Ce n’est pas grave. Elle connaît le chemin, maintenant.',
          'À six heures dix du matin, je me réveille au guichet du Dépôt 9, le colis ouvert devant moi. La pluie a cessé.',
          'J’écris RÉCLAMÉ sur la réclamation 256. J’appelle la police de Halvard au sujet d’une affaire vieille de dix-neuf ans. Puis je sors la cassette de Mamie de mon casier et je l’écoute, jusqu’au bout.',
          'En avril, quand la glace part, les plongeurs fouillent l’ancien lit de la rivière.',
          'Wren est enterrée à côté de notre grand-mère, sur la colline au-dessus du lac, d’où on le voit tout entier.',
          'Dans la corbeille du Dépôt 9, ce premier matin, il y avait une seconde étiquette, d’une vieille main tremblante que je ne connaissais pas encore : RÉCLAMÉ. ENFIN. — A.',
        ],
      },
      snowfall: {
        title: 'CHUTE DE NEIGE', subtitle: 'Celle qui est restée',
        lines: [
          '« Elle a disparu, c’est tout », je dis. « Personne n’a rien vu. »',
          'Wren ne se retourne pas. Derrière moi, la chose à l’écharpe verte se tient tout près. Elle commence à dérouler l’écharpe, tour après tour, jusqu’à ce qu’il n’y ait plus rien à dérouler.',
          'Dessous, il y a mon propre visage, à douze ans, le froid dans les joues.',
          'La neige tombe sur le lac et recouvre la glace sombre, et la silhouette rouge dessus, et les traces, les miennes et les siennes, jusqu’à ce qu’il n’y ait plus rien à voir.',
          'Quelque part très loin en bas, une note remonte un tube pneumatique d’une écriture nouvelle. EMPLOYÉE DE NUIT, NIVEAU 256. PREMIER SERVICE.',
          'Sur le canal neuf, tout bas : « Bienvenue au service de nuit, Ada. »',
        ],
      },
      morning: {
        title: 'MATIN', subtitle: 'Tous ceux qui étaient perdus',
        lines: [
          'Je le dis. Tout. Wren se retourne. Je lui donne la moufle et elle lève les deux mains pour me les montrer, de nouveau une paire, et rentre à la maison sur la glace, vers les lumières de la maison.',
          'À six heures dix du matin, je me réveille au guichet du Dépôt 9, le colis ouvert devant moi. J’écris RÉCLAMÉ sur la réclamation 256.',
          'À six heures et quart, le monte-charge au bout des archives s’ouvre tout seul.',
          'Un vieil homme en sort, dans un manteau passé de mode depuis trente-quatre ans, un insigne en laiton à la main, comme si on venait de le lui donner.',
          '« Brandt », dit-il. « Otto. Je m’en souviens, maintenant. » Il regarde les archives, les étagères, moi. « On est en quelle année ? »',
          'Je le lui dis. Il y réfléchit longtemps. Et puis il rit, un vrai rire, le premier que je l’entends faire sans parasites.',
          'En avril, quand la glace part, les plongeurs fouillent l’ancien lit de la rivière. Wren est enterrée à côté de notre grand-mère, sur la colline au-dessus du lac.',
          'Dans la corbeille du Dépôt 9, ce matin-là, il y a une seconde étiquette, d’une vieille main tremblante que je connais très bien : RÉCLAMÉ. ENFIN. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
