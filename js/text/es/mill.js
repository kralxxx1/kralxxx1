/* Español — Nivel 1: el almacén de la fábrica (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'El almacén de la fábrica', place: 'El recuerdo de Danny — Harlow Mill, Front Street',
        intro: 'El techo está a seis metros. Las estanterías se pierden en la oscuridad. En algún lugar, un reloj hace tictac, siempre en el mismo segundo.\n\nEl padre de Danny empaquetó cajas en este edificio durante veinticinco años. Luego, un viernes, le dieron un reloj y lo mandaron a casa.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Pegado en la puerta del montacargas', from: 'Eddie', body:
`El montacargas necesita tres fusibles. El cuadro está junto a la oficina de carga.

El rojo patrulla los pasillos. Rápido, nunca para, pero hace MUCHO RUIDO. Escúchalo.

No intentes dejarlo atrás en campo abierto. Nadie deja atrás a Danny.

—E.` },
      mill_layoff: { kind: 'letter', title: 'Una carta con membrete de la empresa', from: 'Harlow Mill, Dpto. de Envíos', date: '30 de mayo de 1986', body:
`Estimado Ray:

Como parte de la reestructuración de la sección de envíos de Front Street, su puesto quedará suprimido a partir del 30 de junio de 1986.

Le agradecemos veinticinco años de leal servicio. Le rogamos que devuelva la llave de su taquilla y su tarjeta en la oficina principal.

Acepte el reloj adjunto como muestra de nuestro agradecimiento.

La dirección de Harlow Mill` },
      mill_punch: { kind: 'card', title: 'Una tarjeta de fichar', from: 'Harlow Mill', date: 'Verano de 1986', body:
`EMPLEADO: KOWALSKI, D. (VERANO — BARRENDERO)
SALARIO: 3,35 $/h

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

Cruzando la última línea, con bolígrafo azul:
TAMBIÉN EL ÚLTIMO DÍA DE PAPÁ` },
      mill_graffiti: { kind: 'wall', title: 'Pintura en espray en las estanterías', body:
`DAN #1
DANNY ESTUVO AQUÍ
DANNY SIEMPRE ESTÁ AQUÍ` },
      mill_danny1: { kind: 'note', title: 'Una nota doblada en el bolsillo de una chaqueta', from: 'Danny', date: 'Marzo de 1987', body:
`Todo el mundo cree que no me da miedo nada.

Me da miedo que papá se pase el día sentado en la cocina con la radio apagada.

Así que juego. El que va primero no se queda sentado en la cocina.

(Si Rosie lee esto, la mato de verdad).` },
      mill_ray: { kind: 'letter', title: 'Una carta que nunca se envió', from: 'Ray, el padre de Danny', date: 'Mayo de 1987', body:
`Danny:

La policía ha vuelto a preguntar por la llave. Les he dicho que me dan igual todas las llaves. Puedes quedarte con todas las llaves de este pueblo.

Ahora estoy en la ferretería. Está bien. Menos horas. Escucho el partido por la radio.

Te he arreglado la bici. Cadena nueva, frenos nuevos. Está en el garaje.

Vuelve a casa y móntate en ella. No diré ni una palabra.

Papá` },
      mill_manifest: { kind: 'printout', title: 'Un albarán de envío', from: 'Harlow Mill, muelle 3', date: '17 de abril de 1987', body:
`ENVÍO N.º 0256
CONTENIDO: 1 reloj de pulsera (parado a las 3:17)
PESO: nada
DESTINO: —
FIRMA DE RECEPCIÓN: —

El papel está tibio, como si acabara de salir de la impresora.` },
      mill_walt3: { kind: 'diary', title: 'El diario de Walt', from: 'Walt', date: 'Dentro, día ?', body:
`El rojo no se detiene nunca. Repite las mismas vueltas una y otra vez, igual que Danny jugaba el laberinto: siempre primero, siempre el más rápido, sin respirar.

Hoy ha venido hacia mí gritando. TE SOLTASTE. TE SOLTASTE.

Yo nunca he soltado nada. Los he sujetado a todos y cada uno durante cinco años. Entonces, ¿a quién le grita?

Después lo seguí y no recuerdo por qué. Creo que tenía hambre.` },
      mill_shrine: { kind: 'note', title: 'Debajo de la foto del altar', from: 'W.', body:
`Siempre tenía que ser el primero.
El primero en la máquina. El primero en pasar de 900.000.
El primero en cruzar la pantalla.

Dale algo que se detenga.` },
      mill_tape: { kind: 'tape', title: 'Cinta: «Primer puesto, para la historia»', from: 'La grabadora de Rosie', date: '16 de abril de 1987, 23:52', body:
`[Clic. Ruido de recreativa. Críos riéndose].

DANNY: Aquí Danny Kowalski, primer puesto, grabando para la historia. Esta noche nos pasamos el kill screen.

ROSIE: Esta noche INTENTAMOS pasarnos el kill screen.

DANNY: Walt dice que es imposible. Walt también decía que nadie pasaría de novecientos mil.

TOBY: ¿Nos vamos a meter en un lío? Mi madre cree que duermo en casa de Sam.

DANNY: Los líos son para los que se dejan pillar, Toby.

NELL: …Sam se ha ido a casa, Danny.

DANNY: Sam se ha rajado. Más kill screen para nosotros.

[Una pausa].

TOBY: Sam no se ha rajado. Sam vendrá.

[Clic].` },
    },
    obj: {
      mill_fuses: 'Encuentra los fusibles ({n}/3)',
      mill_panel: 'Coloca los fusibles en el cuadro del montacargas',
      mill_wait: 'El montacargas viene… Sobrevive ({n} s)',
      mill_leave: 'Sube al montacargas',
    },
    mono: {
      mill_start: 'Un reloj hace tictac. Siempre el mismo segundo.',
      mill_dannySeen: 'Rojo. Una sábana empapada, abombada como una cabeza, con el bajo rasgado en picos. Dos ojos enormes y ninguna cara. Debajo hay algo del tamaño de un chico.',
      mill_fuse: 'Otro fusible.',
      mill_elevator: 'El montacargas viene. Despacio. Muy despacio.',
      mill_watch: 'Las 3:17. Igual que el reloj.',
    },
    lines: {
      mill_panel: 'Colocar los fusibles',
      mill_panelIdle: 'Cuadro de fusibles ({n}/3)',
      mill_slots: 'El cuadro tiene tres huecos vacíos.',
    },
    radio: {
      mill_start: [
        ['eddie', '¿Sam? ¿Estás ahí? …Ah. Conozco este sitio. Harlow Mill, el almacén de Front Street. El padre de Danny trabajó aquí veinticinco años.'],
        ['eddie', 'Lo que significa que el rojo también va a estar aquí.'],
      ],
      mill_danny: [
        ['eddie', '¡Lo tienes encima! No le eches una carrera en campo abierto. Rompe la línea, toma una esquina, ¡pon algo entre vosotros!'],
        ['sam', '¡Está gritando algo!'],
        ['eddie', 'Siempre lo hace. «Te soltaste». Me lo gritó a mí, se lo gritó a Walt. No sé a quién se refiere. ¡CORRE!'],
      ],
      mill_watch: [
        ['eddie', '¿Eso es un reloj? …El reloj de Ray. Se lo dieron el día que lo echaron. Danny lo llevó puesto todos los días desde entonces.'],
        ['eddie', 'Hay un altar por aquí, en alguna parte. Llévalo allí. A lo mejor se acuerda.'],
      ],
      mill_freed: [
        ['eddie', '…¿Se ha parado? Sam, ¿qué has hecho? Está ahí… quieto.'],
        ['eddie', 'Dios mío. Es Danny. Es Danny de verdad.'],
      ],
      mill_elevator: [
        ['eddie', 'Ese montacargas hace un ruido tremendo. Todo lo que hay aquí lo ha oído. Aguanta hasta que llegue.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
