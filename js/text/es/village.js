/* Español — Capítulo 6: Aguas bajas (Gammel Ostra). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      village: {
        name: 'CAPÍTULO 6', title: 'Aguas bajas', place: 'Gammel Ostra, valle del Ostra',
        intro: 'Viernes 2 de octubre de 1964, ya de noche, bajo la lluvia.\n\nLas compuertas de la presa se cerraron esta mañana a las seis. Los carteles de todos los postes dicen el nueve. El pueblo está vacío, y el río ya se ha desbordado en las zonas bajas. En una casa todavía hay una lámpara encendida en la ventana.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'Un aviso en el poste de una cancela', from: 'Oficina del distrito', date: 'Septiembre de 1964', body:
`REGULACIÓN DEL RÍO OSTRA

Las compuertas de la presa se cerrarán y el valle se inundará el
VIERNES 9 DE OCTUBRE DE 1964.

Todos los vecinos deberán haber abandonado Gammel Ostra antes de esa fecha. Los camiones de mudanza salen cada mañana a las 8 del patio de la escuela.

(En este ejemplar el 9 está tachado con lápiz rojo y encima pone VIERNES 2 DE OCTUBRE. No se han corregido todos los postes.)` },
      village_torLetter: { kind: 'letter', title: 'Una carta en la mesa de la cocina', from: 'Tor', date: '24 de septiembre de 1964', body:
`Madre:

Deja de escribir al periódico. No sirve de nada y la junta lee cada palabra.

Las compuertas se cierran el viernes 9. Tienes todo el tiempo del mundo. Subiré con el coche la mañana del 8, cargaremos tus cosas y bajarás a casa de Ingrid en Halvard como una mujer sensata, y por el camino puedes enfadarte conmigo todo lo que quieras.

No hagas ninguna tontería.
Tor` },
      village_diary: { kind: 'report', title: 'Diario de obra, caseta del guarda de la presa', from: 'T. Holm, ingeniero residente', date: 'Septiembre–octubre de 1964', body:
`28.9  La junta adelanta el cierre una semana: compuertas el 2.10 a las 06.00. Anunciado esta noche por la radio. Hay que corregir los carteles.
      Madre no tiene radio. Se lo diré yo mismo cuando vaya a buscarla. Será más fácil ese mismo día.
29.9  Hormigonado del aliviadero retrasado. Lluvia.
1.10  Hormigonado toda la noche. No he podido irme. Llamado a Ingrid a Halvard: madre le ha dicho que voy el 8, así que Ingrid no tiene que preocuparse.
2.10  06.00 Compuertas cerradas según lo previsto. El valle se llena.
      No he subido a la casa.

(No hay más anotaciones con esta letra.)` },
      village_ingrid: { kind: 'note', title: 'Una etiqueta atada a una caja del desván', from: 'I.', date: '30.9.64', body:
`COSAS DE MADRE — PARA HALVARD

Dice que no se va de su casa y que no hay más que hablar. Tor dice que irá a buscarla el 8.
Me he llevado su caja de música, para que tenga un motivo para venir a recogerla.
— I.` },
      village_removal: { kind: 'report', title: 'La lista de traslados en la mesa del maestro', from: 'Escuela de Gammel Ostra', date: 'Octubre de 1964', body:
`Aas, Olav, 64 — con su hijo, Nordvik — se fue el 21.9
Familia Berg (5) — Halvard — se fue el 23.9
Dahl, Marit, 80 — a la residencia de Ostra — se fue el 25.9
Holm, Signe, 71, Stuegata 4 — con su hija (I. Lind), Halvard — la lleva su hijo, 8.10
Kvam, Per y Anna — se fueron el 26.9

(Todas las líneas menos una están marcadas.)` },
      village_parish: { kind: 'note', title: 'Una nota en la mesa de la sacristía', from: 'Pastor A. Rø', date: '27.9.64', body:
`Hoy, el último oficio. Las campanas se bajan el 30.
El coro pidió cantar el himno de la tarde una vez más y lo permití, aunque la iglesia estaba casi vacía.

La señora Holm pidió que no se cerrara la iglesia mientras ella siga en el pueblo. Le dije que el Señor no cierra. La junta opina otra cosa.

Las llaves de las casas de los mayores están en el tablero de la sacristía hasta el traslado.` },
      village_shop: { kind: 'note', title: 'El libro de cuentas de la tienda, abierto', from: 'Ultramarinos de Gammel Ostra', date: 'Octubre de 1964', body:
`1.10  Sra. Holm — queroseno, 2 litros. Cerillas. Café, ¼ kg. Fiado.
        (Dice que pagará el 8.)

(La tienda cerró esa misma tarde. Las estanterías están vacías.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'Un dibujo debajo de la almohada', from: 'Wren, 7 años', body:
`Ceras, reblandecidas por la humedad. Una iglesia blanca bajo agua verde, con peces nadando junto a la torre. Al lado, una casita roja, y en la ventana una señora de pelo blanco que sostiene en alto una lámpara. Sobre el agua, el pajarito rojo.

Debajo:
SE QUEDÓ ESPERANDO` },
    },
    items: {
      signeKey: { name: 'Llave de la casa', desc: 'En un lazo de cordel rojo. Una etiqueta de papel: S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Caja de música', desc: 'De palisandro, con una bailarina en la tapa. Con cuerda, toca un vals que casi conoces.' },
    },
    obj: {
      village_start: 'Encuentra a quien encendió la lámpara',
      village_key: 'Encuentra una llave de la casa de la lámpara',
      village_box: 'Encuentra lo que antes estaba sobre la repisa',
      village_mantel: 'Vuelve a poner la caja de música sobre la repisa',
      village_run: 'Llega el agua. Ve a la escalerilla de la presa',
      village_climb: 'Trepa',
    },
    mono: {
      village_start: 'Un pueblo. Vacío. Han talado todos los árboles. Hay luz en una ventana.',
      village_locked: 'Cerrado con llave. Dentro arde una lámpara y nadie contesta.',
      village_church: 'Están cantando. A oscuras, mirando al altar. Ni un ruido.',
      village_silence: 'Han parado.',
      village_turn: 'Se están dando la vuelta.',
      village_resume: 'Vuelven a cantar.',
      village_key: 'S. Holm, Stuegata 4. Holm. Ese apellido me suena.',
      village_school: 'La escuela. De aquí salían los camiones.',
      village_list: 'Holm, Signe. Con su hija, I. Lind. Lind. I. Lind es la abuela.',
      village_attic: 'Cajas. Etiquetas. Un pueblo entero metido en cajas.',
      village_box: 'Una caja de música. «Cosas de madre». Madre. La madre de la abuela.',
      village_house: 'La lámpara está encendida. La estufa, caliente. Nadie.',
      village_dust: 'Hay un cuadrado limpio en el polvo de la repisa. Aquí hubo algo durante mucho tiempo.',
      village_placed: 'Ya está. Donde la tenías.',
      village_claimed: 'Suena sola. El reloj da la hora. Son las seis.',
      village_water: 'Ese rugido. El agua. Viene.',
      village_ladder: 'La escalerilla. Arriba. Sube.',
      village_top: 'Arriba. Todo el valle es agua.',
      village_gran: 'La abuela nunca dijo que tuviera una madre aquí. Ni una vez.',
    },
    lines: {
      village_mantelLook: 'La repisa',
      village_mantelPut: 'Poner la caja de música en la repisa',
      village_ladderPrompt: 'Subir la escalerilla (mantener W)',
      village_wellLook: 'Un pozo',
    },
    radio: {
      village_otto1: [
        ['radio', '[lluvia sobre la estática]'],
        ['otto', 'Nueve a Ada. ¿Lluvia, un pueblo vacío, una presa? Gammel Ostra. Tengo toda una estantería suya. Pomos de puerta, sobre todo. La gente se lleva las llaves y deja los pomos.'],
        ['ada', 'Alguien canta. En la iglesia.'],
        ['otto', 'Entonces déjelos cantar. Mientras cantan miran al altar. Si paran, no espere a ver por qué.'],
      ],
      village_otto2: [
        ['otto', 'Ada. Una caja de música de mi estantería acaba de empezar a sonar sola. El agua del suelo está subiendo aquí. Yo, en su lugar, me iría. Me iría ahora.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2 de octubre de 1964. Mi bisabuela Signe Holm no quería dejar su casa. Su hijo Tor, el ingeniero de la presa, le dijo que las compuertas se cerrarían el nueve; se cerraron el dos, y él no subió a la casa. La abuela creyó que Tor iba a buscarla. La lámpara seguía encendida cuando llegó el agua. Volví a poner su caja de música sobre su repisa y luego trepé por la presa mientras el valle se llenaba debajo de mí.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
