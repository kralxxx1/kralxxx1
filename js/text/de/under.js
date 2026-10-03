/* Deutsch — Kapitel 1: Nicht abgeholt (Ebene 256, das Darunter). Story-Bibel: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('de', 'story', {
    chapters: {
      under: {
        name: 'KAPITEL 1', title: 'Nicht abgeholt', place: 'Ebene 256',
        intro: 'Der Aufzug fuhr lange hinunter. Länger, als der Bahnhof tief ist. Länger, als die Stadt alt ist.\n\nDie Türen öffneten sich auf gelbe Räume, die nach nassem Teppich und den Schirmen anderer Leute riechen. Irgendwo darin ein Summen. Irgendwo darin alles, was niemand abgeholt hat.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'Ein Kofferanhänger auf dem Teppich', body:
`FINDER BITTE ZURÜCKBRINGEN AN:
M. STRAND, 8 JAHRE
PINEWOOD-AUTOKINO, REIHE 5

(Eine Kinderschrift. Die Schnur ist durchgekaut.)` },
      under_umbrella: { kind: 'card', title: 'Ein Anhänger an einem Schirm', from: 'O.B.', body:
`Stück 41.207.
Ein Schirm, schwarz, Herren.
Mit Bedauern zurückgelassen.

Stück 41.208.
Ein Handschuh, links. Gehört noch niemandem.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'Ein Brief im Koffer eines Mädchens', from: 'Mama', date: '12. Dezember 1990', body:
`Lina —

Wenn du deine Fahrkarte gekauft hast, steck sie in die INNENTASCHE deines Mantels. Nicht in die äußere. Hol sie im Zug nicht raus, um sie anzusehen, du weißt, wie du bist.

Nordvik ist Endstation, Viertel nach sechs. Papa wartet mit dem Auto am Bahnsteig, egal was du über die Dunkelheit sagst. Steig vorher nirgends aus.

Lass dir von niemandem einreden, dass du nicht in diesen Zug gehörst.

Alles Liebe, Mama` },
      under_chalk: { kind: 'wall', title: 'Kreide an der Wand', body:
`DIE FLACHEN KOMMEN VON DER WAND
WENN DU DICH UMDREHST
ALSO TU ES NICHT
— O.` },
      under_otto1: { kind: 'diary', title: 'Ottos Lagerbuch', from: 'Otto Brandt', body:
`Ich habe aufgehört, Tage zu zählen. Ich zähle stattdessen Stücke. Heute 41.212: ein Hut, ein Hörgerät, eine Hundeleine ohne Hund.

Das Funkgerät funktioniert auf Kanal neun. Niemand antwortet. Ich rede trotzdem. Es hält die Stimme in Betrieb.

Heute Morgen kam eine Notiz durch den Boden. Unterschrieben mit A. „Jemand kommt. Sei freundlich zu ihr; sie wird dir nicht glauben.“

Ich bin immer freundlich. Das Glauben ist es, womit die Leute ihre Schwierigkeiten haben.` },
      under_list: { kind: 'note', title: 'Regeln der Sortierebene (vorläufig)', from: 'O.B.', body:
`1. Die verlorenen Lichter sind zum Behalten da, nicht zum Fressen. Etwas hier unten sieht das anders.
2. Wird das Summen tiefer und stottern die Lampen, bleib stehen. Es hört. Es sieht nicht.
3. Tapeten ist nicht zu trauen.
4. Die Indextür nimmt vier Lichter. Ich habe nie mehr als drei auf einmal gefunden.
5. Leg dich nicht selbst ab.
— O.B.` },
      under_puddle: { kind: 'note', title: 'Eine feuchte Seite am Wasser', from: 'O.B.', body:
`Das Wasser in diesem Raum ist kalt und schmeckt nach einem See. Jeder Raum hier unten gehört zu jemandes schlimmstem Nachmittag.

Dieser gehört jemandem, den ich noch nicht kenne.` },
      under_index: { kind: 'wall', title: 'Neben die Tür schabloniert', body:
`DER INDEX
BITTE HALTEN SIE IHREN ABHOLSCHEIN BEREIT` },
      wren2: { kind: 'drawing', drawing: 2, title: 'Eine Zeichnung unter einem Heizkörper', from: 'Wren, 7 Jahre', body:
`Wachsmalkreide. Ein gelber Raum. Ein großes rundes Ding mit einem Maul voller Zähne. Darüber fliegt ein kleiner roter Vogel.

Darunter:
ES FRISST DIE LICHTER
DER VOGEL IST SCHNELLER` },
    },
    items: {},
    obj: {
      under_walkie: 'Finde einen Weg durch die gelben Räume',
      under_lights: 'Finde die verlorenen Lichter ({n}/4)',
      under_index: 'Bring vier Lichter zur Indextür',
      under_leave: 'Geh durch die Indextür',
    },
    mono: {
      under_start: 'Das ist nicht der Keller. Der Aufzug ist vier Minuten gefahren. So tief ist der Bahnhof nicht.',
      under_walkie: 'Ein Funkgerät, mit Klebeband auf Kanal neun festgemacht. Jemand hat es angelassen.',
      under_light1: 'Eine kleine Lampe. Warm. Einen Moment lang wurde alles im Dunkeln still, als hielte es den Atem an.',
      under_light4: 'Vier. Irgendwo am anderen Ende der Ebene hat etwas aufgehört zu kauen.',
      under_indexSeen: 'DER INDEX. Vier leere Fassungen neben der Tür.',
      under_wpSeen: 'Es war in der Wand. Es war die Wand. Und es hat sich bewegt, als ich mich umgedreht habe.',
      under_eaterSeen: 'Zu groß für den Gang. Bleich. Kauend.',
      under_humNear: 'Das Summen ist tiefer geworden. Die Lichter stottern.',
    },
    lines: {
      under_slots: 'Vier Fassungen ({n}/4 Lichter)',
      under_place: 'Die Lichter in die Fassungen setzen',
      under_walkiePrompt: 'Das Funkgerät nehmen',
      under_lightPrompt: 'Das verlorene Licht nehmen',
    },
    radio: {
      under_otto1: [
        ['radio', '[Rauschen]'],
        ['otto', '...neun. Hier ist neun. Ist jemand in der Leitung? Ich höre Sie atmen. Das ist keine Kritik.'],
        ['ada', 'Wer ist da?'],
        ['otto', 'Brandt. Depot 9, Nachtschalter. Und Sie sind ohne Abholschein auf meiner Sortierebene.'],
        ['ada', 'Otto Brandt? Sie sind 1964 verschwunden.'],
        ['otto', '1964. Ist es... nein. Sagen Sie es mir später. Wie heißen Sie, Kollegin?'],
        ['ada', 'Ada. Ada Lind. Ich habe Ihre Stelle.'],
        ['otto', 'Dann haben Sie mein Mitgefühl. Hören Sie, Ada Lind. Hierher kommt alles, was niemand abgeholt hat. Es ist sehr groß, und es ist nicht leer.'],
        ['otto', 'Es gibt eine Tür. Die Indextür. Sie will vier von den verlorenen Lichtern, kleine Lampen, Sie werden sie erkennen. Bringen Sie vier, und sie öffnet sich.'],
        ['ada', 'Und hinter der Tür?'],
        ['otto', 'Weitere Ebenen. Regale nenne ich sie. Eine Notiz hat gesagt, dass Sie kommen. Unterschrieben mit A. Kennen Sie eine A.?'],
        ['ada', '...Nein.'],
        ['otto', 'Ich auch nicht. Lassen Sie den Kanal offen.'],
      ],
      under_lights: [
        ['otto', 'Sie haben eines gefunden. Behalten Sie es bei sich. Etwas hier unten frisst sie, und solange Sie ein frisches in der Hand haben, fürchtet es sich vor Ihnen.'],
        ['ada', 'Wie lange?'],
        ['otto', 'Nicht lange. Hier unten fürchtet sich nichts lange.'],
      ],
      under_wallpaper: [
        ['otto', 'Haben Sie die flachen Männer schon gesehen? In der Tapete. Sie lösen sich, wenn Sie ihnen den Rücken zukehren.'],
        ['ada', 'Und wenn ich sie ansehe?'],
        ['otto', 'Dann sind sie Tapete. Sehr geduldige Tapete.'],
      ],
      under_hum: [
        ['otto', 'Wenn das Summen tiefer wird und die Lampen stottern, bleiben Sie stehen. Da steht etwas. Es kann Sie nicht sehen. Es kann Ihre Schuhe hören.'],
        ['ada', 'Was ist das?'],
        ['otto', 'Ich habe es unter Verschiedenes abgelegt. Eine große Kategorie.'],
      ],
      under_eater: [
        ['otto', 'Ada. Dieses Geräusch. Es ist wach.'],
        ['otto', 'Der Fresser. Das Älteste hier unten. Er frisst, was niemand will. Lassen Sie ihn nicht beschließen, dass Sie das sind. Laufen Sie zur Indextür. Nehmen Sie die Ecken; in Ecken ist er langsam.'],
      ],
      under_index: [
        ['otto', 'Die Indextür. Vier Fassungen. Ich habe nie mehr als drei Lichter auf einmal gefunden. Vielleicht haben Sie mehr Glück.'],
      ],
      under_open: [
        ['otto', 'Sie ist offen. Ich habe sie nie offen gesehen.'],
        ['ada', 'Kommen Sie mit.'],
        ['otto', 'Ich kann nicht. Ich weiß nicht, warum. Ich glaube, ich bin auf dieser Ebene abgelegt. Gehen Sie. Ich bin auf neun.'],
        ['otto', 'Auf dem Grund jedes Regals da unten liegt eine Lüge, Ada. Suchen Sie die Lüge.'],
      ],
      under_badge: [
        ['ada', 'Otto. Ich habe etwas von Ihnen mitgebracht. Aus Ihrem Schreibtisch. Ich lasse es in der Tür.'],
        ['otto', '[eine lange Stille]'],
        ['otto', 'O. Brandt. Otto. So hieß ich. Ich hatte den Namen irgendwo abgelegt und vergessen, wo.'],
        ['otto', 'Danke, Ada. Lassen Sie sie dort. Jetzt weiß ich, wo sie ist.'],
      ],
    },
    recap: {
      under: 'Ebene 256: gelbe Räume voller Dinge, die niemand abgeholt hat. Otto Brandt lebt da unten, auf Kanal neun; er glaubt, es sei etwa ein Jahr vergangen. Ich habe der Indextür vier verlorene Lichter gegeben, während hinter mir etwas Rundes und sehr Altes erwachte.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
