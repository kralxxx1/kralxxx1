/* Español — Prólogo: Turno de noche (Depósito 9). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      depot: {
        name: 'PRÓLOGO', title: 'Turno de noche', place: 'Depósito 9, estación central de Halvard',
        intro: 'Halvard, la noche del 13 de enero de 1998. Lluvia sobre la cubierta de cristal de la estación central.\n\nBajo el vestíbulo está el Depósito 9, donde todo lo que la ciudad pierde espera noventa días a que alguien vuelva a por ello. Ada Lind lleva ocho años en el mostrador de noche. Nadie baja después de medianoche.\n\nPor eso aceptó el trabajo.',
      },
    },
    docs: {
      depot_handover: { kind: 'note', title: 'Nota de relevo', from: 'Benny', date: 'Mar. 13 ene.', body:
`Ada —

Relevo:
• Han entrado 14 paraguas. Llueve, así que.
• Ha vuelto el hombre del trombón. Sigue sin ser su trombón.
• El conducto se atasca otra vez. Dale por el lado IZQUIERDO.
• Tu taquilla no cierra. La cinta sigue dentro. No la he tocado.
• Alguien de arriba preguntó si «todavía tenemos el ascensor». Le dije que nadie usa ese ascensor desde 1964. Dijo: «No te he preguntado eso».

No queda café. Lo siento.
— Benny` },
      depot_log: { kind: 'printout', title: 'Libro de noche, página 212', from: 'A. Lind', date: '13/14.01.98', body:
`DEPÓSITO 9 — LIBRO DE NOCHE — A. LIND

23:10  Resguardo 4471: guante, señora, gris. Reclamado.
00:40  Limpieza andén 2: maleta, marrón claro, sin etiqueta. Registrada con el n.º 241.
01:15  Teléfono. No hay nadie. (Tercera noche.)
02:30  Lluvia fuerte. Conducto tranquilo.
02:56  Nada más que informar.` },
      depot_tag: { kind: 'card', title: 'La etiqueta de reclamación del paquete', from: 'A.', body:
`ESTACIÓN CENTRAL DE HALVARD — DEPÓSITO 9 — OBJETOS PERDIDOS

RECLAMACIÓN 256
Una manopla, roja, infantil, mano izquierda.
Hallada: lago Ostra, 14 de enero de 1979.
RESERVADA PARA: ADA LIND.

— A.

(Escrita a máquina con una «e» caída, de las que el depósito tiró en 1964. La tinta aún está húmeda.)` },
      wren1: { kind: 'drawing', drawing: 1, title: 'Un dibujo doblado dentro del paquete', from: 'Wren, 7 años', body:
`Ceras. Un pajarito rojo sobre una valla. Una chica alta con bufanda verde se aleja por un camino, de espaldas. Encima de ella, en letras grandes: ADA.

Por detrás, con la misma cera:
PARA QUE SEPAS EL CAMINO` },
      depot_ledger: { kind: 'report', title: 'Libro de objetos perdidos, 1979, vol. 1', from: 'Depósito 9', body:
`N.º 253 — 14.01.79 — Guantes, caballero, piel marrón — Andén 3 — reclamados 16.01
N.º 254 — 14.01.79 — Paraguas, negro — Sala de espera — reclamado 15.01
N.º 255 — 14.01.79 — Libro, «La reina de las nieves», infantil — Andén 4 — sin reclamar
N.º 256 — 14.01.79 — Manopla, roja, infantil, mano izquierda — hallada: lago Ostra — Reclamante: su hermana, cuando se acuerde.

(La última anotación es de una mano temblorosa que casi conoces. La tinta está húmeda. Pegada con cinta dentro de la tapa: una llave de latón con la marca SUPT.)` },
      depot_ottoNotes: { kind: 'diary', title: 'Notas en el escritorio del superintendente', from: 'Otto Brandt', date: '14 de febrero de 1964', body:
`Cuarenta y un mil objetos desde 1906. Cada uno era de alguien.

Por las noches he empezado a oír el viejo tubo. Notas, firmadas «A.» Conoce nuestro libro mejor que yo.

Escribe que hay una planta bajo las plantas, adonde va todo lo que nadie vino a buscar. Una oficina de clasificación. Escribe que le falta un empleado.

He grabado el número sobre el botón para no perder el valor.

Si no he vuelto por la mañana: los paraguas van a la jaula, no a la basura.

— O.B.` },
      depot_memo: { kind: 'note', title: 'Una nota en la cápsula del tubo', from: 'A.', body:
`ÍNDICE — NIVEL 256 — INTERNO

A: Depósito 9, mostrador de noche.

Ada.
La llave del ascensor está en su escritorio. Trae la manopla y no la sueltes.
Otto estará en el canal nueve. Dile que los paraguas están en la jaula.

— A.` },
      depot_calendar: { kind: 'notice', title: 'Calendario de Transportes de Halvard, 1964', body:
`FEBRERO DE 1964

(Los días están tachados hasta el 13. En el 14, a lápiz: «Turno de noche. ¿El último?». Bajo la foto de la nueva presa de Ostra, el mismo lápiz: «Inundarán el valle en otoño. El periódico dice que una anciana de allí arriba no quiere irse». Nadie ha pasado la página desde entonces.)` },
      depot_poster: { kind: 'notice', title: 'Aviso en la sala pública', from: 'Transportes de Halvard', body:
`OBJETOS PERDIDOS — DEPÓSITO 9

Los objetos hallados en estaciones y trenes se guardan aquí NOVENTA DÍAS.
Traiga, por favor, una prueba de propiedad.
Los objetos no reclamados se venden o se destruyen.

(Clavado debajo, con rotulador: «ENCONTRADO: gato gris, responde a Almirante. Preguntad a Benny».)` },
      depot_kitchen: { kind: 'card', title: 'Una postal sobre el fregadero', from: 'La abuela', date: '1995', body:
`(Una vista invernal del lago Ostra. En el hielo, muy pequeña, la aguja de la iglesia sumergida.)

Ada —
El hielo está grueso este año. El 14 cae en sábado. Ven si puedes. Pondré la vela en la ventana como siempre.
La abuela` },
    },
    items: {
      mitten: { name: 'Manopla roja (izquierda)', desc: 'Una manopla infantil de lana roja, zurcida en el pulgar. La otra se encontró en el hielo hace diecinueve años.' },
      ottoKey: { name: 'Llave del superintendente', desc: 'De latón, con la marca SUPT. Estaba pegada dentro de la tapa de la caja del libro de 1979.' },
      elevatorKey: { name: 'Llave del montacargas', desc: 'Una llave larga con una etiqueta que dice MONTACARGAS. La de Otto Brandt.' },
      badge: { name: 'La placa de Otto', desc: 'Óvalo de latón: DEPÓSITO 9 — OTTO BRANDT. Desgastado donde un pulgar lo frotaba.' },
      parcel: { name: 'Paquete' },
    },
    obj: {
      depot_log: 'Termina el libro de noche en tu máquina de escribir',
      depot_parcel: 'Mira qué ha caído por el conducto',
      depot_torch: 'Coge la linterna de tu taquilla',
      depot_power: 'Rearma el interruptor general en la sala de clasificación',
      depot_ledger: 'Encuentra el libro de 1979 en el archivo',
      depot_otto: 'Registra el despacho de Otto Brandt',
      depot_elevator: 'Baja en el montacargas',
    },
    mono: {
      depot_start: '02:51. Lluvia arriba, en el cristal del vestíbulo. Una línea más y el libro de noche estará terminado.',
      depot_start2: 'Nadie baja aquí después de medianoche. De eso va el trabajo.',
      depot_logDone: '02:56. Nada más que informar.',
      depot_chute: 'El conducto. Nadie envía paquetes a las tres de la mañana.',
      depot_mitten: 'Mano izquierda. Roja. Las de Wren eran rojas. En 1979 las de todo el mundo eran rojas.',
      depot_dark: 'Y ahí se va la luz. Mi linterna está en la taquilla.',
      depot_torch: 'Las pilas aún están bien. Benny nunca se lleva nada útil.',
      depot_tape: 'La cinta de la abuela. Dos años en mi taquilla. Esta noche no.',
      depot_tape2: 'He dicho que esta noche no.',
      depot_powerBack: 'Ya está. La instalación vieja siempre se enfurruña un minuto primero.',
      depot_tube: 'Era el viejo tubo neumático del despacho del superintendente. No funciona desde 1964. La etiqueta dice 1979. El libro está en el archivo.',
      depot_archive: 'Cuarenta y un mil cosas que nadie vino a buscar.',
      depot_sorter: 'Había alguien al fondo del pasillo. Alto, con abrigo gris. Ordenando cajas a oscuras.',
      depot_ledgerAfter: 'Esa no es la letra de Benny. No es la letra de nadie. Y hay una llave pegada en la tapa: SUPT. El despacho de Otto Brandt.',
      depot_ottoLocked: 'SUPERINTENDENTE. Cerrado desde 1964. Benny dice que la llave se fue con él.',
      depot_ottoLocked2: 'Sigue cerrado.',
      depot_ottoIn: 'Su lámpara está encendida. Aún queda café en su taza. Treinta y cuatro años.',
      depot_badge: 'OTTO BRANDT. Nadie deja su placa a menos que piense volver a por ella.',
      depot_elevKey: 'MONTACARGAS. El ascensor que nadie ha usado desde él.',
      depot_noKey: 'El panel necesita una llave. Cómo no.',
      depot_noKey2: 'Sigue haciendo falta la llave.',
      depot_256: 'Alguien ha grabado un número sobre el botón más bajo. 256.',
      depot_wren: 'Había alguien en la cabina. Una niña con mono de nieve rojo. Un segundo.',
      depot_gate: 'La verja del vestíbulo. Se cierra desde arriba a medianoche. Normas de la estación.',
      depot_elevatorShut: 'El montacargas. Fuera de servicio desde 1964.',
    },
    lines: {
      depot_typePrompt: 'Escribir la última línea del libro de noche',
      depot_parcelPrompt: 'Abrir el paquete',
      depot_tapePrompt: 'La cinta de la abuela',
      depot_breakerPrompt: 'Subir el interruptor general (mantener)',
      depot_ledgerPrompt: 'Caja del libro: 1979',
      depot_badgePrompt: 'La placa de Otto',
      depot_callPrompt: 'Girar la llave, pulsar el botón más bajo',
      depot_ottoUnlock: 'Abrir con la llave del superintendente',
    },
    recap: {
      depot: 'Depósito 9, 02:56. Un paquete cayó por el conducto: una manopla roja, mano izquierda, y una etiqueta que decía «Reservada para Ada Lind». El libro de 1979 decía: reclamante, su hermana, cuando se acuerde. Bajé en el montacargas de Otto Brandt hasta el botón en el que alguien había grabado un número: 256.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
