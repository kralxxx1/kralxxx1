/* Español — Capítulo 2: Campana de niebla (MS Saint Brigid). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      ferry: {
        name: 'CAPÍTULO 2', title: 'Campana de niebla', place: 'MS Saint Brigid, estrecho de Halvard',
        intro: '9 de noviembre de 1987, las once menos cuarto de la noche. Una niebla tan espesa que desde el puente no se ve la proa.\n\nEl Saint Brigid se hunde por la popa, despacio, en un mar liso como una mesa. Su radar lleva una semana sin funcionar. En algún lugar a proa, una campana.',
      },
    },
    docs: {
      ferry_notice: { kind: 'notice', title: 'Puestos de bote salvavidas', from: 'MS Saint Brigid', body:
`EN CASO DE EMERGENCIA

1. Diríjase a su puesto de bote salvavidas (vea la tarjeta de su camarote).
2. Póngase el chaleco salvavidas. No lo infle dentro del barco.
3. Los botes los arría la tripulación.
   Llave del pescante: en el puente.
   Manivela: si falla el motor.

(Debajo, con rotulador: «El chigre n.º 2 se atasca. La manivela está en la taquilla de herramientas de la sala de máquinas, NO en cubierta. — 2.º maquinista»)` },
      ferry_testimony: { kind: 'report', title: 'Declaración ante la comisión de investigación (copia)', from: 'Cap. H. Aal', date: '30 de noviembre de 1987', body:
`Estuve en el puente desde las 21:30 hasta la orden de abandonar el barco.

La visibilidad era inferior a un cable. El radar estaba averiado desde el 2 de noviembre y las señales de niebla se daban a mano: la campana del barco, tocada por el marinero P. Rask.

Hacia las 22:35 la campana dejó de sonar. Mandé al segundo oficial a proa. El chico había abandonado su puesto. Sin señal no podíamos ni ser oídos ni oír.

Lamento decir que la pérdida del Saint Brigid empezó cuando un chico de dieciséis años se dejó llevar por el pánico.

H. Aal, Capitán` },
      ferry_logpage: { kind: 'report', title: 'Una página arrancada del cuaderno de bitácora', from: 'Saint Brigid, diario de puente', date: '9 de noviembre de 1987', body:
`21:40  Niebla espesa. Velocidad reducida a 6 nudos. Radar averiado.
22:05  Capitán a su camarote (indispuesto). Guardia a cargo del 2.º oficial.
22:10  Señales de niebla a mano. Mar. Rask en la campana.
22:31  Se llama al capitán. No acude.
22:44  Abordaje, babor popa. Entra agua.
22:47  Abandono del barco. Botes 1, 3 y 4 al agua.
22:52  Mar. Rask sigue tocando. Dice que los botes se guían por la campana. Capitán no está en el puente.
22:58  La campana sigue

(La escritura se interrumpe ahí. La página está arrancada limpiamente y luego doblada muy pequeña, como se dobla algo que se quiere guardar mucho tiempo en un cajón.)` },
      ferry_logbook: { kind: 'report', title: 'El diario de puente sobre la mesa de cartas', from: 'Saint Brigid', body:
`21:15  Muelle de Halvard. 41 pasajeros, 17 tripulantes. Bancos de niebla.
21:30  Fuera del puerto.

(Falta una página. Se ve el borde arrancado en la encuadernación. En la página siguiente:)

23:40  Todos los botes contados. Un tripulante desaparecido: el marinero P. Rask, que abandonó su puesto en la campana hacia las 22:35.
— H. Aal` },
      ferry_logbookFull: { kind: 'report', title: 'El diario de puente, con su página', from: 'Saint Brigid', body:
`21:40  Niebla espesa. Velocidad reducida a 6 nudos. Radar averiado.
22:05  Capitán a su camarote (indispuesto). Guardia a cargo del 2.º oficial.
22:10  Señales de niebla a mano. Mar. Rask en la campana.
22:31  Se llama al capitán. No acude.
22:44  Abordaje, babor popa. Entra agua.
22:47  Abandono del barco. Botes 1, 3 y 4 al agua.
22:52  Mar. Rask sigue tocando. Dice que los botes se guían por la campana. Capitán no está en el puente.
22:58  La campana sigue sonando.
23:05  La campana calla.

(La página está en la encuadernación como si nunca hubiera salido. La tinta de la última línea está húmeda.)` },
      ferry_radio: { kind: 'printout', title: 'Diario de la sala de radio', from: 'Oficial radiotelegrafista', date: '9.11.87', body:
`22:46  MAYDAY enviado. Posición por estima.
22:48  Halvard Radio acusa recibo. Lancha del práctico Ternen en camino.
22:55  Ternen: «No les vemos. Oímos su campana. Ponemos rumbo hacia ella».
23:02  Ternen: «Tenemos dos de sus botes. Seguimos oyendo la campana. Sigan tocando».
23:05  Ternen: «La campana ha parado. ¿Dónde están?».
23:06  (no hay más anotaciones)` },
      ferry_mother: { kind: 'letter', title: 'Una carta en un asiento del salón', from: 'Elin Rask', date: '4 de enero de 1988', body:
`A los señores de la comisión de investigación:

Han escrito en su informe que mi hijo abandonó su puesto.

Pim tenía dieciséis años. Le tuvo miedo a la oscuridad hasta los once y todavía dormía con la luz del rellano encendida. Cuando tenía miedo hacía lo que le mandaban, y lo hacía más fuerte.

Si alguien le dijo que tocara esa campana, la tocó hasta que no quedó barco en el que tocarla.

Quisiera que su nombre se retirara de su informe. Quisiera que volviera a escribirse del derecho.

Elin Rask` },
      ferry_cabin: { kind: 'card', title: 'Una postal sobre la litera', from: 'Margit', body:
`(Una foto del Saint Brigid en un día de verano, empavesado.)

Querida tía Ruth:
¡Cruzamos con niebla y no se ve nada! El chico de cubierta toca una campana cada minuto para que los otros barcos sepan que estamos aquí. Es bonito y da un poco de miedo. Dile a mamá que la llamo desde Halvard.
Margit

(Nunca enviada.)` },
      ferry_purser: { kind: 'note', title: 'Lista de tripulación, oficina del sobrecargo', from: 'Sobrecargo', body:
`MS SAINT BRIGID — TRIPULACIÓN, HORARIO DE INVIERNO 1987

Capitán ............... H. Aal
Primer oficial ........ (de permiso)
2.º oficial ........... T. Solberg
Jefe de máquinas ...... K. Moe
2.º maquinista ........ R. Dahl
Radiotelegrafista ..... B. Lund
Marinero .............. P. Rask (16) — primera temporada

(Alguien ha dibujado una campanita junto al último nombre.)` },
      ferry_mess: { kind: 'note', title: 'Cuadrante en el comedor de la tripulación', from: 'T. Solberg', body:
`SEMANA 45

Radar AVERIADO desde el 2/11 — piezas pedidas a Bergen.
HASTA QUE SE REPARE: campana de niebla a mano con visibilidad < 1 milla.
Campana: Rask (todas las travesías de tarde).
Rask: tocas hasta que yo te diga que pares. No hasta que te aburras. Hasta que yo te lo DIGA.
— T.S.` },
      wren3: { kind: 'drawing', drawing: 3, title: 'Un dibujo metido en una litera', from: 'Wren, 7 años', body:
`Ceras. Un barco entre garabatos grises de niebla. Delante, un chico vestido de amarillo con una campana, la boca abierta, tocándola. En lo alto del mástil, un pajarito rojo.

Debajo:
NO PARÓ` },
    },
    items: {
      bridgeKey: { name: 'Llave del puente', desc: 'Una llave de latón con un flotador de corcho. Del camarote del capitán.' },
      davitKey: { name: 'Llave del pescante', desc: 'Una llave en forma de T con la marca BOTES. Suelta el freno del chigre.' },
      crank: { name: 'Manivela del chigre', desc: 'Una pesada manivela de acero con empuñadura de madera. Para arriar un bote a mano.' },
      logPage: { name: 'Página arrancada del diario', desc: 'Doblada muy pequeña. 9 de noviembre de 1987, de 21:40 a 22:58.' },
    },
    obj: {
      ferry_start: 'Encuentra la manera de salir del barco',
      ferry_bridge: 'Consigue la llave del pescante en el puente',
      ferry_captain: 'Registra el camarote del capitán en busca de la llave del puente',
      ferry_logbook: 'Devuelve la página arrancada al diario del puente',
      ferry_key: 'Coge la llave del pescante del puente',
      ferry_crank: 'Encuentra la manivela del chigre en la sala de máquinas',
      ferry_lower: 'Arría el bote salvavidas 2',
    },
    mono: {
      ferry_start: 'Un barco. Una niebla tan espesa que no veo la borda. Y la cubierta está escorada.',
      ferry_winch: 'El bote 2. El chigre necesita una llave de pescante y una manivela. La llave estará en el puente.',
      ferry_winch2: 'Me siguen faltando la llave y la manivela.',
      ferry_winchNoCrank: 'La llave está puesta. La manivela no está en cubierta. El aviso decía la sala de máquinas.',
      ferry_winchNoKey: 'Tengo la manivela. El freno sigue bloqueado: la llave del pescante.',
      ferry_brake: 'El freno no suelta. Como si el barco no hubiera terminado conmigo.',
      ferry_pageAfter: 'No estaba en el puente. Estaba en su camarote con una botella, y el chico tocó esa campana durante una hora.',
      ferry_logbookGap: 'Falta una página. Arrancada a las 21:40.',
      ferry_claimed: 'Ya está. Ahí es donde va.',
      ferry_bell: 'La campana del barco. Suena como si esperara a alguien.',
      ferry_bellAfter: 'Está tibia. Había una mano en esta cuerda.',
      ferry_bridgeKey: 'La llave del puente. Debajo de su almohada. Cómo no.',
      ferry_davitKey: 'BOTES. La llave del pescante.',
      ferry_crank: 'La manivela. El agua acaba de moverse. Toda a la vez.',
      ferry_lower: 'Agárrate. Agárrate a algo.',
      ferry_end: 'Sigue tocando. Regular, como un reloj. Para que los botes encuentren el camino.',
      ferry_bridgeLocked: 'El puente está cerrado con llave. El capitán tendrá una.',
      ferry_passengers: 'Estaban dormidos. Todos y cada uno estaban dormidos, y ahora están de pie.',
      ferry_drowned: 'Algo ha salido del agua. Primero las manos.',
      ferry_lounge: 'El salón. Chalecos salvavidas en todos los asientos. Nadie se movió cuando entré.',
      ferry_engineRoom: 'La sala de máquinas está inundada hasta la rodilla. El agua está muy quieta.',
      ferry_fore: 'La campana está por aquí arriba. La oigo respirar en el viento.',
    },
    lines: {
      ferry_winchGo: 'Girar el chigre y arriar el bote 2 (mantener)',
      ferry_winchLook: 'El chigre del bote 2',
      ferry_logbookPut: 'Devolver la página',
      ferry_logbookRead: 'Leer el diario',
      ferry_bellPrompt: 'Tocar la campana',
      ferry_pagePrompt: 'Una página doblada en el cajón',
      ferry_bridgeUnlock: 'Abrir el puente',
    },
    radio: {
      ferry_otto1: [
        ['radio', '[estática, y debajo, muy débil, una campana]'],
        ['otto', 'Nueve a Ada. Ha pasado. ¿Dónde está?'],
        ['ada', 'En un barco. En la niebla. Se está hundiendo.'],
        ['otto', 'El Saint Brigid. Tengo toda una estantería suya: chalecos salvavidas, un ajedrez, cuarenta y un paraguas. Se hundió en 1987.'],
        ['ada', '¿Cómo me bajo?'],
        ['otto', 'En cada estantería hay una cosa fuera de su sitio. Una mentira con número de página. Póngala en su lugar y el sitio la suelta. Luego use los botes como una persona sensata.'],
      ],
      ferry_bellman: [
        ['otto', 'Ha conocido al hombre de la campana. No deje que se la ponga encima. La toca para que usted sepa dónde está. Agradézcaselo. La mayoría no lo hace.'],
      ],
      ferry_otto2: [
        ['otto', 'Algo se acaba de mover en mis estanterías. Un expediente. Rask, P. Estaba en «abandono del puesto». Ya no está ahí.'],
        ['ada', '¿Dónde está ahora?'],
        ['otto', 'En «encontrados». No lo he puesto yo.'],
      ],
    },
    recap: {
      ferry: 'El Saint Brigid, en la niebla. El capitán Aal dijo que el chico de la campana de niebla se dejó llevar por el pánico y huyó. La página que Aal arrancó de su propio diario decía que él estaba borracho en su camarote mientras Pim Rask, de dieciséis años, traía los botes a casa con la campana. Devolví la página. Cuando el bote 2 tocó el agua, la campana volvió a sonar.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
