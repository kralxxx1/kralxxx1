/* Français — Niveau 8 : Blue Moon Motor Inn (le souvenir d’Eddie). */
(function (root) {
  'use strict';
  root.PB.I18N.register('fr', 'story', {
    chapters: {
      motel: {
        name: 'LEVEL 8', title: 'Blue Moon Motor Inn', place: 'Le souvenir d’Eddie — Route 9, l’équipe de nuit',
        intro: 'Celui-ci n’est pas le tien. Un motel au bord de la Route 9, l’enseigne CHAMBRES LIBRES qui grésille, une réceptionniste de nuit qui riait aux blagues d’un réparateur tout maigre, en 1990.\n\nLa chambre 12 a longtemps été payée à la semaine. Quelqu’un n’arrête pas de frapper aux portes.',
      },
    },
    items: {
      room12Key: { name: 'Clé de la chambre 12', desc: 'Une clé en laiton sur un losange en plastique vert : BLUE MOON MOTOR INN — 12. Encore tiède du sèche-linge.' },
    },
    docs: {
      motel_intro: { kind: 'note', title: 'Un post-it sur l’interrupteur de l’enseigne CHAMBRES LIBRES', from: 'June', date: '1991', body:
`Eddie —
Si tu lis ça, c’est que tu es encore en retard.
Le café est prêt. La tarte est au frigo. Ne la mange pas en entier.
Je t’aime. Répare la machine à glaçons.
— J.` },
      motel_register: { kind: 'note', title: 'Le registre des clients sur le comptoir', from: 'Blue Moon Motor Inn', date: '1992–1993', body:
`…
Ch. 7 — représentant de commerce — 1 nuit
Ch. 3 — les Henderson (encore)
Ch. 12 — E. — à la semaine — « atelier, ne pas déranger »
Ch. 12 — E. — à la semaine
Ch. 12 — E. — à la semaine — payé jusqu’au 12 juin 1993

(De l’écriture de June : « Il dit que c’est pour un projet. Il ne veut pas me dire quel projet. Il rentre en sentant la soudure et il ne dort pas. »)

Le crochet de la clé de la chambre 12 est vide. Quelqu’un a écrit sur le mur à côté : LAVERIE ?` },
      motel_complaint: { kind: 'note', title: 'Carte de commentaire d’un client', from: 'Chambre 11', date: 'Mai 1993', body:
`Chambre très propre. Bonne tarte.

MAIS : quelqu’un frappe à ma porte à 3 h 17 toutes les nuits. Quand j’ouvre, il n’y a personne.

Et l’homme de la chambre 12 parle dans son talkie-walkie toute la nuit. Il n’y a personne à l’autre bout. J’ai vérifié.

— Un client` },
      motel_postcard: { kind: 'note', title: 'Une carte postale sur la table de nuit', from: 'Eddie', date: 'Cachet de Harlow, 1990', body:
`(Au recto : « BONJOUR DU BLUE MOON — Route 9, Harlow », et la peinture d’une piscine que le motel n’a pas.)

June,
Tu as ri à la blague de la machine à glaçons. Personne ne rit à la blague de la machine à glaçons. Je vais continuer à la raconter jusqu’à ce que tu m’épouses.
— le réparateur tout maigre (Eddie)` },
      motel_walt: { kind: 'diary', title: 'Le journal de Walt, déchiré en deux', from: 'Walt', date: 'À l’intérieur', body:
`Un motel. Je ne connais pas cet endroit.

Quelqu’un qui travaillait pour moi a logé ici. Doué de ses mains. En colère contre moi. Je crois que je l’avais mérité.

Il avait une femme. Il avait un bébé en route.

Je lui ai dit de ne pas venir me chercher. Je l’ai écrit sur un mot, je crois. Je crois qu’il n’a pas écouté.

Personne n’écoute l’homme qui a perdu quatre enfants.` },
      motel_notebook: { kind: 'note', title: 'Le carnet d’Eddie, ouvert sur le lit', from: 'Eddie', date: '1992–1993', body:
`NOTES SUR LE KERNEL — rév. C

Un jeu a besoin d’1 Joueur + 4 Spectres. Le Kernel les GARDE.
Walt est le Joueur maintenant. Depuis mars 92.
Il y a une vraie SORTIE, au 256, du côté cassé. Elle laisse sortir UNE personne quand UNE personne reste à sa place.

UN QUI ENTRE, UN QUI SORT. C’est toute la règle.

Plan : j’entre. Je trouve la SORTIE. Je trouve quelqu’un qui a encore un nom. Cette personne tient la porte. Je sors. Je rentre chez June. Je rencontre le bébé.

Plan épouvantable. Je sais.
Je l’ai quand même souligné trois fois.

(Plus tard, d’un autre stylo, écrit à l’intérieur :)
Trouvé la porte ma première semaine. Personne pour la tenir. Les Spectres n’ont plus de nom et Walt n’a plus de visage. Alors j’attends.

(Plus tard encore :)
Il y a Sam. Numéro cinq. La personne qui est rentrée à la maison. La machine a appelé Sam PLAYER ONE.
C’est peut-être la bonne personne.
Pardon, Sam.` },
      motel_june: { kind: 'letter', title: 'Des lettres dans une boîte à chaussures, celle du dessus ouverte', from: 'June', date: 'Juillet 1993', body:
`Eddie,

La police ne vient plus. Ta mère appelle toujours tous les dimanches.

Je fais toujours ton côté du lit. Je ne sais pas pourquoi. C’est bête.

Le bébé donne des coups quand je mets la radio. Elle aime la station des vieux tubes. Elle sera DJ.

Si tu es quelque part où tu peux lire ça, je ne suis pas fâchée. Un peu fâchée. Rentre, et je serai fâchée contre toi en personne.

On l’appellera Hope. Tu n’as pas voix au chapitre.

— June` },
      motel_ultrasound: { kind: 'photo', photo: 'ultrasound', title: 'Une échographie, froissée à force d’être transportée', from: 'Maternité St. Agnes', date: 'Mai 1993', body:
`Un éventail gris et granuleux. Une forme minuscule au milieu.

Au dos, de l’écriture d’Eddie, encore et encore, comme s’il s’entraînait :
« Salut, toi. Salut. Je suis ton papa. Salut, toi. Salut. June pense que tu es une fille. Salut. »` },
      motel_tape: { kind: 'tape', title: 'Cassette : « Pour le bébé »', from: 'Eddie', date: '11 juin 1993', body:
`[Clic. Une chambre de motel. La machine à glaçons cliquette à travers le mur.]

EDDIE : Salut, toi. C’est ton papa. Tu ne me connais pas encore.

EDDIE : Je vais aller chercher des gens qui se sont perdus. Quatre enfants, et un vieil homme qui a été gentil avec moi alors qu’il n’était pas obligé.

EDDIE : Je serai rentré avant ta naissance. Sinon… ta maman te dira que j’étais un idiot, et elle aura raison, mais j’étais un idiot pour une bonne raison.

EDDIE : [une longue respiration] J’ai peur. J’ai vraiment peur.

EDDIE : Bon. Bon. Ton papa t’aime. Demande à ta maman la blague de la machine à glaçons. Elle fera semblant de la détester.

[Clic.]` },
    },
    obj: {
      motel_find12: 'Se renseigner sur la chambre 12 (la réception)',
      motel_key: 'Trouver la clé de la chambre 12',
      motel_room12: 'Ouvrir la chambre 12',
      motel_leave: 'Sortir par l’issue de secours',
    },
    mono: {
      motel_start: 'Un motel. L’enseigne CHAMBRES LIBRES grésille. Ce n’est pas mon souvenir. À qui est-il ?',
      motel_register: 'Chambre 12. « E. » Eddie.',
      motel_key: 'La clé était dans un sèche-linge. Encore tiède.',
      motel_room12: 'La chambre 12. Des fils partout. Un lit de camp. Ça sent la soudure.',
      motel_notebook: '« UN QUI ENTRE, UN QUI SORT. » …Eddie.',
      motel_neighbor: 'Un homme en peignoir, tout au bout du couloir. Il a la tête baissée. Je crois qu’il sourit.',
    },
    lines: {
      motel_unlock12: 'Déverrouiller la chambre 12',
      motel_trust: '« Dis-moi la vérité. Je t’écoute. »',
      motel_doubt: 'Baisser la radio. Ne rien dire.',
    },
    radio: {
      motel_start: [
        ['eddie', '…Oh. Oh, c’est le Blue Moon.'],
        ['sam', 'Tu connais ?'],
        ['eddie', 'C’est là que j’ai rencontré ma femme. Elle travaillait de nuit. Continue… d’avancer, d’accord ? N’entre pas dans la chambre 12.'],
        ['sam', 'Pourquoi ?'],
        ['eddie', 'Parce que je te le demande.'],
      ],
      motel_neighbor: [
        ['eddie', 'N’ouvre pas la porte s’il frappe. Ne lui tourne pas le dos non plus. La lumière le fait reculer.'],
      ],
      motel_explain: [
        ['eddie', 'Sam. Je sais que tu l’as lu. J’entends les pages.'],
        ['eddie', 'J’ai écrit ça avant de te connaître. Avant de savoir quoi que ce soit.'],
        ['eddie', 'J’ai une fille que je n’ai jamais vue. Depuis un an et demi, je ne pense qu’à elle.'],
        ['eddie', 'J’arrête de te mentir. Laisse-moi… juste t’expliquer. S’il te plaît.'],
      ],
      motel_trusted: [
        ['eddie', 'La règle est vraie. Un qui entre, un qui sort. La porte du 256 s’ouvre pour une personne quand quelqu’un d’autre reste.'],
        ['eddie', 'Je voulais que ce soit toi. J’en ai honte. Je ne veux plus que ce soit toi.'],
        ['eddie', 'Libère les Spectres. Tous les quatre. S’ils se souviennent tous de leur nom, il y a peut-être un autre moyen. Walt le pensait. Cinq mains, il a écrit. Je n’ai jamais compris.'],
      ],
      motel_doubted: [
        ['eddie', '…Ouais. Moi aussi, je me couperais.'],
        ['eddie', 'Je serai là quand tu voudras parler. L’issue de secours est ouverte.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
