/* Español — Capítulo 1: Sin reclamar (Nivel 256, el Debajo). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      under: {
        name: 'CAPÍTULO 1', title: 'Sin reclamar', place: 'Nivel 256',
        intro: 'El ascensor bajó durante mucho tiempo. Más de lo que es profunda la estación. Más de lo que es vieja la ciudad.\n\nLas puertas se abrieron a unas salas amarillas que huelen a moqueta mojada y a paraguas ajenos. En algún lugar de ellas, un zumbido. En algún lugar de ellas, todo lo que nadie volvió a buscar.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'Una etiqueta de equipaje sobre la moqueta', body:
`SI LO ENCUENTRA, DEVUÉLVALO A:
M. STRAND, 8 AÑOS
AUTOCINE PINEWOOD, FILA 5

(Letra de niño. El cordel está roído.)` },
      under_umbrella: { kind: 'card', title: 'Una etiqueta atada a un paraguas', from: 'O.B.', body:
`Objeto 41.207.
Un paraguas, negro, de caballero.
Dejado con pesar.

Objeto 41.208.
Un guante, izquierdo. Todavía no es de nadie.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'Una carta en la maleta de una chica', from: 'Mamá', date: '12 de diciembre de 1990', body:
`Lina —

Cuando hayas comprado el billete, guárdalo en el bolsillo INTERIOR del abrigo. No en el de fuera. No lo saques para mirarlo en el tren, que ya sabes cómo eres.

Nordvik es la última parada, a las seis y cuarto. Papá estará en el andén con el coche, digas lo que digas de la oscuridad. No te bajes en ningún sitio antes.

No dejes que nadie te diga que no te corresponde ir en ese tren.

Te quiere, Mamá` },
      under_chalk: { kind: 'wall', title: 'Tiza en la pared', body:
`LOS PLANOS SALEN DE LA PARED
CUANDO TE DAS LA VUELTA
ASÍ QUE NO TE LA DES
— O.` },
      under_otto1: { kind: 'diary', title: 'El cuaderno de campamento de Otto', from: 'Otto Brandt', body:
`He dejado de contar los días. En su lugar cuento objetos. Hoy 41.212: un sombrero, un audífono, una correa de perro sin perro.

El walkie-talkie funciona en el canal nueve. Nadie contesta. Hablo igualmente. Así la voz se mantiene en buen estado.

Esta mañana llegó una nota a través del suelo. Firmada A. «Viene alguien. Sé amable con ella; no te creerá».

Yo siempre soy amable. Lo que a la gente le cuesta es creer.` },
      under_list: { kind: 'note', title: 'Normas de la planta de clasificación (provisionales)', from: 'O.B.', body:
`1. Las luces perdidas son para guardarlas, no para comérselas. Algo aquí abajo no está de acuerdo.
2. Cuando el zumbido se vuelva más grave y las lámparas tartamudeen, deja de andar. Oye. No ve.
3. No hay que fiarse del papel pintado.
4. La puerta del Índice admite cuatro luces. Yo nunca he encontrado más de tres a la vez.
5. No te archives a ti mismo.
— O.B.` },
      under_puddle: { kind: 'note', title: 'Una página húmeda junto al agua', from: 'O.B.', body:
`El agua de esta sala está fría y sabe a lago. Cada sala de aquí abajo pertenece a la peor tarde de alguien.

Esta pertenece a alguien a quien aún no conozco.` },
      under_index: { kind: 'wall', title: 'Estarcido junto a la puerta', body:
`EL ÍNDICE
TENGA PREPARADA SU RECLAMACIÓN, POR FAVOR` },
      wren2: { kind: 'drawing', drawing: 2, title: 'Un dibujo bajo un radiador', from: 'Wren, 7 años', body:
`Ceras. Una sala amarilla. Una cosa grande y redonda con la boca llena de dientes. Volando por encima: un pajarito rojo.

Debajo:
SE COME LAS LUCES
EL PÁJARO ES MÁS RÁPIDO` },
    },
    items: {},
    obj: {
      under_walkie: 'Encuentra un camino a través de las salas amarillas',
      under_lights: 'Encuentra las luces perdidas ({n}/4)',
      under_index: 'Lleva cuatro luces a la puerta del Índice',
      under_leave: 'Cruza la puerta del Índice',
    },
    mono: {
      under_start: 'Esto no es el sótano. El ascensor ha bajado durante cuatro minutos. La estación no es tan profunda.',
      under_walkie: 'Un walkie-talkie, sujeto con cinta en el canal nueve. Alguien lo dejó encendido.',
      under_light1: 'Una lamparita. Caliente. Por un momento todo lo que había en la oscuridad se calló, como si contuviera la respiración.',
      under_light4: 'Cuatro. En algún sitio al otro extremo de la planta, algo ha dejado de masticar.',
      under_indexSeen: 'EL ÍNDICE. Cuatro casquillos vacíos junto a la puerta.',
      under_wpSeen: 'Estaba en la pared. Era la pared. Y se movió cuando me di la vuelta.',
      under_eaterSeen: 'Demasiado grande para el pasillo. Pálido. Masticando.',
      under_humNear: 'El zumbido se ha vuelto más grave. Las luces tartamudean.',
    },
    lines: {
      under_slots: 'Cuatro casquillos ({n}/4 luces)',
      under_place: 'Colocar las luces en los casquillos',
      under_walkiePrompt: 'Coger el walkie-talkie',
      under_lightPrompt: 'Coger la luz perdida',
    },
    radio: {
      under_otto1: [
        ['radio', '[estática]'],
        ['otto', '...nueve. Aquí nueve. ¿Hay alguien en la línea? La oigo respirar. No es una crítica.'],
        ['ada', '¿Quién es?'],
        ['otto', 'Brandt. Depósito 9, mostrador de noche. Y usted está en mi planta de clasificación sin resguardo.'],
        ['ada', '¿Otto Brandt? Usted desapareció en 1964.'],
        ['otto', '1964. ¿Ya es...? No. Dígamelo luego. ¿Cómo se llama, compañera?'],
        ['ada', 'Ada. Ada Lind. Tengo su puesto.'],
        ['otto', 'Entonces tiene usted mi compasión. Escuche, Ada Lind. Aquí viene todo lo que nadie volvió a buscar. Es muy grande y no está vacío.'],
        ['otto', 'Hay una puerta. La puerta del Índice. Quiere cuatro de las luces perdidas, unas lamparitas, ya las reconocerá. Traiga cuatro y se abre.'],
        ['ada', '¿Y al otro lado de la puerta?'],
        ['otto', 'Más plantas. Yo las llamo estanterías. Una nota decía que usted vendría. Firmada A. ¿Conoce a alguna A.?'],
        ['ada', '...No.'],
        ['otto', 'Yo tampoco. Mantenga el canal abierto.'],
      ],
      under_lights: [
        ['otto', 'Ha encontrado una. Llévela cerca. Algo aquí abajo se las come, y mientras usted tenga una recién cogida en la mano, le tiene miedo.'],
        ['ada', '¿Cuánto tiempo?'],
        ['otto', 'No mucho. Aquí abajo nada tiene miedo mucho tiempo.'],
      ],
      under_wallpaper: [
        ['otto', '¿Ha visto ya a los hombres planos? En el papel pintado. Se despegan cuando usted les da la espalda.'],
        ['ada', '¿Y cuando los miro?'],
        ['otto', 'Entonces son papel pintado. Papel pintado muy paciente.'],
      ],
      under_hum: [
        ['otto', 'Si el zumbido se vuelve más grave y las lámparas tartamudean, párese. Hay algo de pie ahí. No la ve. Oye sus zapatos.'],
        ['ada', '¿Qué es?'],
        ['otto', 'Lo he archivado en «varios». Es una categoría muy amplia.'],
      ],
      under_eater: [
        ['otto', 'Ada. Ese ruido. Está despierto.'],
        ['otto', 'El Devorador. Lo más viejo que hay aquí abajo. Se come lo que nadie quiere. No deje que decida que es usted. Corra hacia la puerta del Índice. Tome las esquinas; en las esquinas es lento.'],
      ],
      under_index: [
        ['otto', 'La puerta del Índice. Cuatro casquillos. Yo nunca he encontrado más de tres luces a la vez. Quizá usted tenga más suerte.'],
      ],
      under_open: [
        ['otto', 'Está abierta. Nunca la había visto abierta.'],
        ['ada', 'Venga conmigo.'],
        ['otto', 'No puedo. No sé por qué. Creo que estoy archivado en esta planta. Vaya. Estaré en el nueve.'],
        ['otto', 'En el fondo de cada estantería de abajo hay una mentira, Ada. Busque la mentira.'],
      ],
      under_badge: [
        ['ada', 'Otto. Le he traído algo suyo. De su escritorio. Lo dejo en la puerta.'],
        ['otto', '[un largo silencio]'],
        ['otto', 'O. Brandt. Otto. Ese era el nombre. Lo había dejado en algún sitio y había olvidado dónde.'],
        ['otto', 'Gracias, Ada. Déjela ahí. Ahora sabré dónde está.'],
      ],
    },
    recap: {
      under: 'Nivel 256: salas amarillas llenas de cosas que nadie volvió a buscar. Otto Brandt está vivo ahí abajo, en el canal nueve; cree que ha pasado más o menos un año. Le di cuatro luces perdidas a la puerta del Índice mientras algo redondo y muy viejo despertaba detrás de mí.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
