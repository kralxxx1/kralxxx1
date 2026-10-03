/* Español — Capítulo 8: Luces brillantes (la feria de Falk). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      carnival: {
        name: 'CAPÍTULO 8', title: 'Luces brillantes', place: 'Feria de Falk, puerto de Halvard',
        intro: 'Domingo 30 de septiembre de 1984, poco antes de medianoche. La última noche de la temporada.\n\nLa gente se ha ido a casa. Han dejado las luces encendidas. El tren fantasma ardió la noche anterior, y al viejo payaso le han dicho que recoja sus cosas.',
      },
    },
    docs: {
      carnival_poster: { kind: 'notice', title: 'Un cartel en la taquilla', from: 'Feria de Falk', date: 'Septiembre de 1984', body:
`FERIA DE FALK
Puerto de Halvard — del 14 al 30 de septiembre
¡ÚLTIMAS NOCHES!

El Gran Tiovivo · La Noria
La Casa de la Risa — ¡conoce a LOTTE LA RISUEÑA!
El TREN FANTASMA (si te atreves)
Pesca el Pato · Caseta de Tiro · Pon a Prueba tu Fuerza

y todas las tardes a las 4 y a las 7:
PIPO EL PAYASO
«El de Halvard, desde hace veintiuna temporadas»` },
      carnival_closing: { kind: 'notice', title: 'Un aviso atado con alambre a la verja', from: 'E. Falk, propietario', date: '30.9.84', body:
`EL TREN FANTASMA ESTÁ CERRADO.

Tras el incendio del sábado por la noche, el tren fantasma no volverá a funcionar esta temporada. No hubo heridos.

La dirección da las gracias al público y a los bomberos de Halvard, y pide disculpas por la decepción.

La Feria de Falk deja Halvard el martes por la mañana. ¡Hasta el año que viene!` },
      carnival_fire: { kind: 'report', title: 'Una copia del informe del incendio en la caseta de control', from: 'Bomberos de Halvard', date: '30 de septiembre de 1984', body:
`Intervención 84/211. Feria de Falk, puerto. Aviso 01.40, 30.9.84.
Incendio en la atracción oscura («Tren fantasma»). Extinguido a las 02.15. Sin heridos.

Origen del fuego: la cabina del operador al fondo de la atracción, en una papelera.
Causa probable: un cigarrillo mal apagado.

El propietario, el Sr. E. Falk, declara que su empleado H. Brecht (payaso) dormía y fumaba en la cabina. El Sr. Brecht ha sido despedido y no se le ha podido tomar declaración. El hijo del propietario, K. Falk, de 19 años, no estaba presente.

Nota del agente: dos clases de colillas en la papelera. Carmín en una de ellas.` },
      carnival_kasper: { kind: 'letter', title: 'Un sobre en el escritorio quemado, nunca enviado', from: 'K.', date: '1 de octubre de 1984', body:
`Hugo:

Fui yo. Mette y yo, en la cabina después de cerrar, y vacié la lata en la papelera sin mirar porque oímos venir a papá.

Papá lo sabe. Papá dice que ya está, que de todas formas ibas a dejarlo pronto, y te ha dado dos semanas de sueldo. Cuando dijo que habías sido tú, me miraste. No dijiste nada. No sé por qué no dijiste nada.

Lo siento. Lo siento.
K.

(En el sobre: «Pipo». Sin dirección. Por detrás, con la misma letra: «adónde la mando»)` },
      carnival_ledger: { kind: 'report', title: 'El libro de cuentas del propietario en la caseta de la noria', from: 'E. Falk', date: 'Septiembre de 1984', body:
`29.9 Recaudación, todas las atracciones — 14.220. Tren fantasma: incendio después del cierre (01.40). Fuera de servicio.
30.9 Brecht, H. («Pipo»). 21 temporadas. Liquidado: dos semanas de sueldo, en efectivo. No volver a contratar.
     Parte al seguro, tren fantasma: incendio causado por empleado fumando en la cabina trasera (Brecht). Declaración firmada E.F.
     K. — conducirá el camión a Ostra el martes. Tenerlo ocupado.` },
      carnival_rosa: { kind: 'note', title: 'Una nota prendida bajo el mostrador del puesto de máscaras', from: 'Rosa, máscaras y artículos de broma', date: 'Noche del 30.9.84', body:
`Pipo pasó por delante de mi puesto a medianoche con su maleta. Ya se había quitado la cara, y parecía tener cien años.

Se sacó la nariz del bolsillo, la dejó en mi mostrador y dijo: «Guárdamela, Rosa».

Le pregunté adónde iba. Dijo: «A casa». No tiene casa. Lleva veinte años viviendo en esa caravana.

He puesto la nariz debajo del mostrador, donde nadie la cogerá. — R.` },
      carnival_hugo: { kind: 'note', title: 'Una tarjeta metida en el marco del espejo', from: 'Hugo Brecht', date: '(muy antigua, reescrita muchas veces)', body:
`Lo que me enseñó el viejo Bruno, 1931:

La cara se pone en este orden. El blanco. Luego el rojo. Luego el negro. Luego la nariz.
La nariz es lo último que se pone y lo primero que se quita.
Con la nariz puesta eres Pipo, y nada puede hacerte daño.
Sin ella eres solo Hugo. Así que ten cuidado de dónde te la quitas.

La nariz vive en el espejo. Nunca en un bolsillo.` },
      carnival_fan: { kind: 'letter', title: 'Una carta de niño sobre la cama', from: 'Tomas, 7 años', date: 'Septiembre de 1984', body:
`Querido Pipo

Gracias por el perro de globo que me hiciste. Todavía lo tengo. Se está deshinchando un poco.

De mayor quiero ser payaso y hacer lo de caerme.

besos de Tomas

(Un dibujo con ceras: un payaso con una nariz roja tan grande como su cabeza, cayéndose, y todo el mundo riéndose.)` },
      carnival_paper: { kind: 'clipping', title: 'Una página de periódico en un banco', from: 'Noticias del Puerto de Halvard', date: 'Jueves 4 de octubre de 1984', body:
`HALLADA LA MALETA DEL PAYASO EN LAS ESCALERAS DEL PUERTO

Una maltrecha maleta marrón que pertenece a Hugo Brecht, de 71 años, conocido por tres generaciones de niños de Halvard como Pipo el payaso, apareció el lunes por la mañana en las escaleras bajo el muelle del pescado.

El Sr. Brecht había sido despedido por la Feria de Falk tras un incendio en su tren fantasma el sábado por la noche, del que el propietario lo culpó. No se le ha vuelto a ver. Se ruega a quien lo viera el domingo por la noche que se ponga en contacto con la policía del puerto.

La feria dejó Halvard el martes.` },
      wren8: { kind: 'drawing', drawing: 8, title: 'Un dibujo en el suelo de la habitación inclinada', from: 'Wren, 7 años', body:
`Ceras, el papel doblado en cuatro. Un payaso con la nariz roja y una gran maleta marrón se aleja por un camino que baja hacia el mar, diciendo adiós con el brazo bien levantado. Detrás de él, una noria llena de luces. El pajarito rojo está sentado en su sombrero.

Debajo:
ADIÓS PIPO` },
    },
    items: {
      fuse: { name: 'Fusible', desc: 'Un fusible de cartucho de porcelana y latón. 60 A. Del taller de la casa de la risa.' },
      nose: { name: 'La nariz de Pipo', desc: 'Una nariz de payaso, roja, brillante de tanto uso. Ha estado en muchas caras, y siempre en una sola.' },
    },
    obj: {
      carnival_start: 'Encuentra la manera de salir de la feria',
      carnival_power: 'El tren fantasma sale atravesando la valla. Ponlo en marcha',
      carnival_fuse: 'Encuentra un fusible: prueba en el taller de la casa de la risa',
      carnival_fit: 'Coloca el fusible en la caseta de control del tren fantasma',
      carnival_why: 'Averigua qué le pasó a Pipo',
      carnival_nose: 'Encuentra lo que Pipo dejó atrás',
      carnival_mirror: 'Vuelve a poner la nariz de Pipo en su espejo',
      carnival_ride: 'Sal montada en el tren fantasma',
    },
    mono: {
      carnival_start: 'Una feria. Cerrada por esta noche, con todas las luces encendidas.',
      carnival_gate: 'Con cadena. Y la valla son tres metros de malla con alambre arriba.',
      carnival_booth: 'La caseta está vacía. El cristal está roto. Desde dentro.',
      carnival_lotte: 'Alguien se ríe. Muy lejos. No para ni para respirar.',
      carnival_ghost: 'El tren fantasma. Calcinado. La vía lo atraviesa y sale por detrás, a través de la valla.',
      carnival_noPower: 'Muerto. El portafusibles está vacío y el fusible viejo está negro en la bandeja.',
      carnival_fuse: 'Un fusible. Sesenta amperios. Parece el bueno.',
      carnival_power: 'Luces dentro. Las vagonetas siguen sin moverse. Algo las retiene.',
      carnival_maze: 'Espejos. Yo, y yo, y alguien detrás de mí en todos ellos. No hay nadie detrás de mí.',
      carnival_masks: 'Gente con máscaras, de pie por ahí. Hace un minuto no estaban.',
      carnival_nose: 'Su nariz. «Guárdamela, Rosa».',
      carnival_music: 'El órgano ha empezado. Solo.',
      carnival_horses: 'Los caballos. Se están bajando del tiovivo.',
      carnival_stopped: 'La música ha parado. Ellos también. Exactamente donde están.',
      carnival_trailer: 'Su caravana. El espejo está encendido.',
      carnival_mirrorLook: 'Su espejo. Una marca redonda y limpia en la repisa de cristal, donde siempre había algo.',
      carnival_placed: 'Ya está. Donde vive cuando él es solo Hugo.',
      carnival_claimed: 'Las bombillas alrededor del espejo se apagan una a una.',
      carnival_running: 'Algo ha arrancado al otro lado de la feria. El tren fantasma.',
      carnival_notYet: 'La vía sale por detrás. Pero sin corriente no funciona.',
      carnival_board: 'Agárrate a la barra.',
      carnival_out: 'Las escaleras del puerto. Una maleta marrón en el último escalón, y la marea subiendo por encima.',
      carnival_kasper: 'La escribió y nunca la mandó. «Adónde la mando».',
      carnival_fence: 'A través de la pared del fondo, a través de la valla.',
    },
    lines: {
      carnival_boothPrompt: 'Colocar el fusible',
      carnival_boothLook: 'Los mandos de la atracción',
      carnival_mirrorPut: 'Poner la nariz en el espejo',
      carnival_mirrorLook: 'El espejo de Pipo',
      carnival_ridePrompt: 'Subir a la vagoneta',
      carnival_rideLook: 'Una vagoneta del tren fantasma',
    },
    radio: {
      carnival_otto1: [
        ['radio', '[un órgano de feria, lejos, desafinado]'],
        ['otto', 'Nueve a Ada. Oigo una feria. Tengo una estantería de tiques de papel para las atracciones y una nariz roja. No tengo ni idea de por qué he dicho eso.'],
        ['ada', 'La verja tiene cadena.'],
        ['otto', 'Las ferias se vallan para que la gente pague, no para que se quede dentro. Siempre hay una salida que usa el personal. Siga los raíles.'],
      ],
      carnival_otto2: [
        ['otto', 'Ada. No se quede quieta cerca de nada que lleve una cara. Y si empieza la música, muévase mientras suene. Cuando pare, todo lo que baila con ella para también.'],
      ],
      carnival_otto3: [
        ['otto', 'La nariz ha desaparecido de mi estantería. Bien. Nunca me correspondió guardarla. Una estantería más, Ada, y es aquella hacia la que lleva caminando toda la noche.'],
      ],
    },
    recap: {
      carnival: 'La Feria de Falk, 30 de septiembre de 1984. Kasper Falk, de diecinueve años, prendió fuego al tren fantasma con un cigarrillo; su padre dijo a los bomberos que había sido el viejo payaso, Hugo Brecht, y lo liquidó. Hugo no dijo nada. Dejó su nariz a Rosa en el puesto de máscaras y salió por la verja con su maleta, y la maleta apareció en las escaleras del puerto. Volví a poner su nariz en su espejo, donde vivía, y salí atravesando la valla en el tren fantasma.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
