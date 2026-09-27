/* Italiano — Prologo: la sala giochi Starlight, 30 novembre 1994. */
(function (root) {
  'use strict';
  root.PB.I18N.register('it', 'story', {
    chapters: {
      prolog: {
        name: 'PROLOGO', title: 'La sala giochi Starlight', place: 'Harlow, Pennsylvania — 30 novembre 1994, 2:11',
        intro: 'Sette anni fa quattro ragazzini entrarono in questa sala giochi dopo la chiusura e non ne uscirono mai più. Avresti dovuto essere con loro. Alle 21:40 hai preso la strada di casa. È quello che hai detto a tua madre, alla polizia e a te.\n\nAlle sei la banca si porta via le macchine. Hai anticipato la squadra di quattro ore, senza nessuno, e senza dire a nessuno perché.',
      },
    },
    docs: {
      p_workorder: { kind: 'printout', title: 'Ordine di lavoro della Tri-County Movers', from: 'Tri-County Movers', date: 'Ordine n. 4471', body:
`RITIRO: sala giochi Starlight, 114 Front St., Harlow
DATA: mer. 30 novembre 1994, 6:00
CONTENUTO: 23 cabinati a gettoni, 1 banco premi, arredi vari
ACCESSO: chiavi sotto lo zerbino (First Harlow Savings)
SQUADRA: 3
NOTA: l’acquirente vuole il cabinato n. 7 imballato a parte. NON COLLEGARE.

A penna, in fondo, con la tua calligrafia:
Vado prima. Devo vedere il n. 7 prima che lo portino via. —S.` },
      p_notice: { kind: 'notice', title: 'Avviso attaccato alla vetrina', from: 'First Harlow Savings & Loan', date: '21 ottobre 1994', body:
`AVVISO DI PIGNORAMENTO

Questo immobile e tutto il suo contenuto sono stati pignorati per mancato pagamento, per ordine della First Harlow Savings & Loan.

Il contenuto sarà venduto all’ASTA PUBBLICA sabato 3 dicembre 1994 alle 10.

Il proprietario registrato non risponde ad alcuna comunicazione dal marzo 1992.

Sotto, qualcuno ha scritto col pennarello nero:
È ANCORA LÌ DENTRO` },
      p_sticky: { kind: 'note', title: 'Biglietto giallo attaccato al cabinato n. 7', from: 'W.', body:
`NON STACCARE LA SPINA.

Per nessun motivo. Nemmeno se li senti.
Soprattutto se li senti.

(Se è della banca: tanto non è attaccato alla presa. Guardi.)` },
      p_repair: { kind: 'card', title: 'Cartellino di servizio sullo sportello gettoni del n. 7', from: 'Eddie', date: 'Novembre 1986', body:
`CARTELLINO DI SERVIZIO — UNITÀ N. 7
Scheda: KERNEL rev. C (su misura, NON SOSTITUIRE)
Alimentatore: modificato, vedi il mio quaderno

NON accendere senza messa a terra.
NON lasciare che Walt «provi solo un’ultima cosa» dopo mezzanotte.

—Eddie` },
      p_ledger: { kind: 'diary', title: 'Il registro della luce di Walt', from: 'Walt', date: '1987–1992', body:
`Apr. 1987 — Luce: 212 $. Il doppio del solito. Il n. 7 consuma più di tutto il resto della sala messo insieme.

Ott. 1989 — Luce: 1.940 $. Detto al padrone di casa che il congelatore è rotto.

Gen. 1991 — Staccato il n. 7 per un’intera settimana, per vedere. Il contatore ha continuato a girare. Non è mai stato attaccato al muro. È attaccato a qualcos’altro.

2 mar. 1992 — Pagato tutto fino a giugno. Lasciato il resto nella busta per Nora.
Nora, mi dispiace.` },
      p_hiscore: { kind: 'note', title: 'Classifica incorniciata nel corridoio', from: 'Calligrafia di Walt', date: 'Ricopiata dal n. 7, 17 aprile 1987', body:
`HUNGRY HOUSE — CABINATO N. 7 — RECORD DI SEMPRE
1  DAN  921.450
2  ROS  887.300
3  NEL  640.120
4  TOB  512.890
5  SAM  498.770   (registrato all’1:52?)

      LIL    3.190   (stanza 207)

Sotto il vetro, più in piccolo:
L’orologio della macchina dice che il punteggio di Sam è salito all’1:52 di notte. Sam ha lasciato la sala alle 21:40. Lo dicono tutti. L’orologio sarà sballato.
Questi nomi non verranno mai cancellati. Promesso. —Walt` },
      p_photo: { kind: 'photo', photo: 'five', title: 'Foto appuntata sopra la scrivania dell’ufficio', from: 'A matita, sul retro', date: '11 aprile 1987', body:
`I frequentatori dello Starlight, davanti al n. 7.
Dietro: Danny (con un dito alzato, come sempre), Rosie, Nell.
Davanti: Toby (occhi chiusi, come sempre) e Sam.

Ridono tutti tranne Sam.

Sotto, a matita, più recente:
Cinque giorni prima. Avrei dovuto cambiare le serrature. —W.` },
      p_birthday: { kind: 'card', title: 'Biglietto di compleanno nel magazzino', from: 'D, R, N, T e S', date: '12 marzo 1987', body:
`BUON 56°, WALT!!!

Dai tuoi clienti numero uno.
Danny dice che gli devi 40 gettoni.
Rosie dice che è Danny che deve 40 gettoni a TE.
La torta l’ha disegnata Nell. (È una torta di Hungry House. Quattro lanterne come candeline.)
Toby vuole sapere se la TV era a colori quando eri piccolo.
Sam dice grazie per aver aggiustato la bici.

A domani. E a dopodomani. E al giorno dopo ancora.` },
      p_nora: { kind: 'letter', title: 'Una lettera mai aperta', from: 'Nora, la sorella di Walt', date: 'Timbro postale del 3 marzo 1992', body:
`Walt,

ti ho chiamato cento volte. Squilla e basta. La banca dice che la corrente c’è ancora, quindi so che sei lì.

Cinque anni, Walt. Le famiglie non ti danno più la colpa. La polizia nemmeno. Solo tu.

La tomba della mamma ha bisogno di fiori. Quest’anno non ci vado di nuovo da sola.

Vendi quella macchina. Rompila. Fanne quello che vuoi. Ma smettila di fissarla.

Lily non vorrebbe vederti seduto al buio.

—Nora

(È arrivata il giorno dopo la sua scomparsa. Nessuno l’ha aperta.)` },
      p_frank: { kind: 'card', title: 'Il biglietto da visita di un ispettore', from: 'Isp. Frank Dobbs, polizia di Harlow', date: '2 maggio 1987', body:
`Sul retro, a penna:

Walt —
Mi hai detto che i ragazzi se ne sono andati a mezzanotte.
La signora Pruitt, quella di fronte, alle tre ha visto accese le luci del retro.
Ha visto anche UNA piccola figura correre su per Front Street alle 3:25, sotto la pioggia. Lontano da qui.
Chiamami prima che torni con un mandato.
—F.D.` },
      p_mirror: { kind: 'wall', title: 'Rossetto sullo specchio del bagno', body:
`NON È UN GIOCO
È UN POSTO

—R. 4/16` },
      p_lily1: { kind: 'drawing', drawing: 1, title: 'Il disegno di Lily sul frigo dell’ufficio', from: 'Lily, 9 anni', body:
`Pastelli a cera su carta. Una creatura tonda e arancione con due cornetti e un gran sorriso pieno di denti, davanti a una fila di scatole colorate con gli schermi.

IL MIO PAPÀ LAVORA ALLO STARLAIT.
IL SABBATO È CHOMPY.
È IL CHOMPY PIÙ BRAVO DEL MONDO.
—LILY` },
      p_tape: { kind: 'tape', title: 'Nastro: «Se stai sentendo questo»', from: 'Walt', date: '3 marzo 1992, 23:48', body:
`[Clic. Pioggia sul vetro. Una sedia scricchiola.]

WALT: Se stai sentendo questo, sono dentro. Non chiamare Frank. Non chiamare Nora. Ascolta e basta.

WALT: Sono lì dentro. Danny, Rosie, Nell e Toby. Lascia il n. 7 abbastanza a lungo sulla schermata dimostrativa e ti presenta gli Spettri. Per sei anni li ha chiamati RED, VIOLET, TEAL e AMBER. Dalla mattina del diciassette aprile scrive DAN. ROS. NEL. TOB. E non si muovono più come sprite. Si muovono come ragazzini. Li guardo da cinque anni.

WALT: Il gettone d’oro nella mia scrivania, quello con impresso 0256. La macchina lo prende come un CONTINUE. È così che sono entrati loro. È così che entrerò io.

WALT: Non staccare la spina. Se si spegne da qui fuori, si spengono con lei. Non ne sono sicuro. Non ho intenzione di scoprirlo.

[Una lunga pausa.]

WALT: Li riporterò a casa. E se non ci riesco… almeno lì dentro non saranno soli.

WALT: Lily, se sei… [Si interrompe.] No. Lascia stare. Il nastro sta finendo.

[Clic.]` },
    },
    obj: {
      p_flash: 'Trova una torcia (dietro il banco premi)',
      p_power: 'Alza l’interruttore generale nel magazzino',
      p_key: 'Trova la chiave dell’ufficio di Walt',
      p_office: 'Entra nell’ufficio di Walt',
      p_token: 'Perquisisci l’ufficio di Walt',
      p_insert: 'Metti il gettone d’oro nel cabinato n. 7',
    },
    mono: {
      prolog_start: 'Niente corrente. La mia torcia è nel camion… Walt ne teneva una dietro il banco premi.',
      prolog_flash: 'Mezza pila. Non va sprecata.',
      prolog_power: 'Le luci… e le macchine. Tutte insieme.',
      prolog_register: 'Il registratore di cassa si apre ancora. Una chiave con un cartellino di carta: UFFICIO.',
      prolog_token: 'Un gettone d’oro, con impresso 0256. Pesante. Molto più pesante di un gettone vero.',
      prolog_cabinet: 'PLAYER 1: SAM — CONTINUE? …Il cavo è per terra. Non è attaccato alla presa.',
      prolog_seven: 'Il numero sette. Toby diceva che sapeva di pane tostato bruciato. È ancora così.',
      prolog_hiscore: 'L’1:52 di notte. Impossibile. Alle dieci ero a casa.',
      prolog_outside: '…C’era qualcuno fuori, dietro il vetro?',
      prolog_insert: 'Lo schermo si spacca a metà. La metà destra si riempie di lettere… e continua ad allargarsi.',
      prolog_office: 'L’ufficio di Walt. Caffè e stagno per saldature. Sa di 1987.',
    },
    lines: {
      prolog_registerDead: 'Il registratore di cassa non ha corrente. Il cassetto è chiuso.',
      prolog_flashHint: 'Premi F per accendere e spegnere la torcia.',
      prolog_breaker: 'Alza l’interruttore generale',
      prolog_register: 'Apri il registratore di cassa',
      prolog_registerIdle: 'Registratore di cassa',
      prolog_insertTok: 'Inserisci il gettone d’oro',
      prolog_inspect: 'Guarda il cabinato n. 7',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
