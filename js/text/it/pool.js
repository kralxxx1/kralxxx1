/* Italiano — Livello 3: la piscina (Nell). */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      pool: {
        name: 'LEVEL 3', title: 'La piscina', place: 'Il ricordo di Nell — piscina comunale di Harlow, 12 luglio 1985',
        intro: 'Piastrelle bianche, acqua ferma, il pizzicore del cloro. Dovrebbe sembrare un posto tranquillo. È troppo pulito. È troppo silenzioso.\n\nNell ha distolto lo sguardo dal fratellino per un secondo, qui, e da allora non ha mai smesso di fissare quest’acqua.',
      },
    },
    docs: {
      pool_intro: { kind: 'note', title: 'Incastrato nello sportello di un armadietto', from: 'Eddie', body:
`Quattro valvole di scarico. Aprile tutte e la vasca grande si svuota. Nella parte profonda c’è una botola.

La turchese ti sente nell’acqua. Resta sulle piastrelle asciutte quando puoi.

Non sarà dove l’hai vista l’ultima volta. Non lo è mai.

—E.` },
      pool_rules: { kind: 'notice', title: 'Cartello del regolamento', from: 'Piscina comunale di Harlow', body:
`PISCINA COMUNALE DI HARLOW
VIETATO CORRERE
VIETATO TUFFARSI NELLA VASCA BASSA
VIETATO MANGIARE E BERE A BORDO VASCA
I BAMBINI SOTTO GLI 8 ANNI VANNO SORVEGLIATI IN OGNI MOMENTO
BAGNINO IN SERVIZIO DALLE 10 ALLE 18

La riga sulla sorveglianza è sottolineata due volte a matita blu. Accanto, piccolissimo: LO SO` },
      pool_report: { kind: 'report', title: 'Rapporto d’incidente del bagnino', from: 'Piscina comunale di Harlow', date: '12 luglio 1985', body:
`INCIDENTE: quasi annegamento, vasca profonda
ORA: 15:40
VITTIMA: Theo Park, 6 anni
INTERVENTO: recuperato dal fondo dal bagnino di servizio. Praticata respirazione bocca a bocca. Reattivo dopo circa 40 secondi. Portato al St. Agnes in osservazione, dimesso la sera stessa.

TESTIMONE: la sorella (Nell Park, 13 anni), incaricata della sorveglianza.
DICHIARAZIONE: «Ho distolto lo sguardo per un secondo per finire un disegno. Un secondo.»

NOTA: la sorella si è rifiutata di lasciare il bordo vasca finché l’ambulanza non è partita. Quel giorno non ha più detto una parola.` },
      pool_theo1: { kind: 'letter', title: 'Una lettera con la calligrafia di un bambino', from: 'Theo, 7 anni', date: 'Natale 1986', body:
`Cara Nell,

buon Natale. Non ho più paura della piscina. Puoi smettere di disegnare fumetti tristi.

Ti voglio bene Theo

PS disegnami uno squalo
PS uno squalo buono` },
      pool_theo2: { kind: 'letter', title: 'Un’altra lettera di Theo', from: 'Theo, 9 anni', date: 'Aprile 1988', body:
`Nell,

a scuola dicono tutti che sei scappata. Io lo so che non è vero. Ti saresti portata le matite.

Le tengo in camera mia. Quella blu non la faccio usare a nessuno.

La mamma apparecchia ancora il tuo piatto. Papà le dice di smetterla, e poi lo mette lui quando lei non guarda.

Theo` },
      pool_theo3: { kind: 'letter', title: 'Una lettera su carta della squadra di nuoto', from: 'Theo, 11 anni', date: '12 luglio 1990', body:
`Nell,

oggi sono cinque anni. Adesso sono nella squadra di nuoto. A giugno ho vinto la mia prima gara. A farfalla.

Lo so che pensi che sia stata colpa tua. Non è così. Avevo sei anni e mi sono buttato dove il cartello diceva di no. Tu hai distolto lo sguardo per un secondo. Lo fanno tutti.

Non è mai stata colpa tua.

Torna a casa e vieni a vedermi nuotare. Ti tengo un posto sugli spalti, quello all’ombra.

Theo` },
      pool_comic: { kind: 'drawing', title: 'Una pagina di fumetto fradicia', from: 'Nell', date: '1986', body:
`Quattro vignette a inchiostro blu.

1. Una ragazza con gli occhiali grandi che disegna a bordo piscina.
2. L’acqua, perfettamente piatta.
3. La ragazza fissa l’acqua. Non distoglierà mai più lo sguardo.
4. La ragazza, ormai grande, sola in una stanza bianca. Le sue matite sono per terra.

Titolo, a lettere accurate: LA RAGAZZA CHE DISTOLSE LO SGUARDO` },
      pool_tiles: { kind: 'wall', title: 'Graffiato nelle piastrelle', body:
`HO DISTOLTO LO SGUARDO PER UN SECONDO
HO DISTOLTO LO SGUARDO PER UN SECONDO
HO DISTOLTO LO SGUARDO PER UN SECONDO` },
      pool_walt4: { kind: 'diary', title: 'Il diario di Walt', from: 'Walt', date: 'Dentro, giorno ?', body:
`La turchese non sta mai ferma. Salta da un’estremità all’altra della vasca, come se non riuscisse a decidere dove le è permesso stare.

In sala giochi Nell disegnava per gli altri i percorsi degli Spettri. Aveva sempre ragione, e non ci ha mai creduto nemmeno una volta.

Le ho lasciato la mia ultima lattina di Star Pop sul trampolino. Quando sono tornato era sparita, e la linguetta era allineata con cura al bordo. Grazie, Nell.` },
      pool_tape: { kind: 'tape', title: 'Nastro: «Rosie Radio intervista Nell»', from: 'Il registratore di Rosie', date: 'Marzo 1987', body:
`[Clic. Un corridoio di scuola, con l’eco.]

ROSIE: Qui Rosie Radio, centosette-punto-tre, con un’ospite davvero speciale. Nell, qual è il tuo superpotere?

NELL: Non ne ho.

ROSIE: Tutti ne hanno uno. Quello di Danny è fare casino.

NELL: [ride] …Ok. Disegnare. Forse.

ROSIE: Cosa avresti paura di disegnare?

NELL: [una lunga pausa] L’acqua. Non mi viene. Esce sempre troppo ferma.

ROSIE: …Theo sta bene, Nell. Ieri era in piscina coperta. Ha fatto un tuffo a bomba proprio addosso al bagnino.

NELL: Lo so. C’ero. Non gli ho tolto gli occhi di dosso un attimo.

[Clic.]` },
    },
    obj: {
      pool_valves: 'Apri le valvole di scarico ({n}/4)',
      pool_drain: 'Aspetta che la vasca grande si svuoti',
      pool_hatch: 'Apri la botola sul fondo della vasca',
    },
    mono: {
      pool_start: 'Acqua dappertutto. I miei passi rimbombano come se qualcuno camminasse dietro di me.',
      pool_nellSeen: 'Turchese. Un lenzuolo bagnato con due occhi tondi. Lì. No… qui.',
      pool_valve: 'La valvola stride. Il rumore arriva ovunque.',
      pool_drained: 'L’acqua non c’è più. Sul fondo c’è una botola.',
      pool_glasses: 'I suoi occhiali. Vicinissimo, qualcuno respira.',
    },
    lines: {
      pool_valve: 'Gira la valvola (tieni premuto)',
      pool_hatch: 'Apri la botola e scendi',
    },
    radio: {
      pool_start: [
        ['eddie', 'La piscina comunale. Qui ho imparato a nuotare. Come tutti a Harlow.'],
        ['eddie', 'Questa è di Nell, Sam. Ci scommetto la vita. Occhio all’acqua.'],
      ],
      pool_nell: [
        ['eddie', 'La turchese è quella che non puoi prevedere. Sarà altrove prima che tu sbatta le palpebre. E sente uno spruzzo dall’altra parte dell’edificio.'],
      ],
      pool_glasses: [
        ['eddie', 'Gli occhiali di Nell. Senza era cieca come una talpa. Se li tirava su con un dito quando pensava.'],
      ],
      pool_freed: [
        ['eddie', 'Ti… segue? Con cautela. Come se controllasse ogni passo prima di farlo.'],
        ['eddie', 'È lei. È proprio lei.'],
      ],
      pool_drain: [
        ['eddie', 'Quello scarico fa il rumore di un motore a reazione. Stai al coperto mentre si svuota.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
