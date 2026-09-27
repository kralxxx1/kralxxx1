/* Español — Nivel 6: Apagón (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Apagón', place: 'El recuerdo de Toby — la oscuridad',
        intro: 'Las mismas habitaciones amarillas con todas las luces muertas. Aquí la oscuridad es tan espesa que podrías apoyarte en ella.\n\nToby tuvo miedo a la oscuridad toda su vida. Aquí dentro, la oscuridad no le tiene miedo a nada. En algún lugar de ella, algo se esfuerza muchísimo por no reírse.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'Encima de un generador', from: 'Eddie', body:
`Tres generadores. Hay bidones de gasóleo tirados por todas partes.

Aquí la oscuridad tiene dientes. Yo los llamo Sonrientes. La luz los hace desaparecer. Linterna, barra luminosa, lo que sea.

El ámbar… mantén la luz sobre él. No le des la espalda mucho rato.

—E.` },
      dark_diary1: { kind: 'diary', title: 'Una hoja de un cuaderno del colegio', from: 'Toby', date: '15 de abril de 1987', body:
`¡¡¡Mañana es la Operación 256!!!

Danny dice que yo soy el encargado de la linterna. Rosie ha hecho una cinta. Nell ha hecho un mapa de los recorridos de los Espectros y de verdad está superbién.

Hoy me he sentado encima del reproductor de Sam. Ha hecho crac. Sam todavía no lo sabe. Le voy a dar a Sam mi paga de marzo Y de abril.

Danny dice que el Espectro ámbar de la n.º 7 soy yo porque es el miedica. Walt dice que es el listo. Da igual, es MI Espectro.` },
      dark_diary2: { kind: 'diary', title: 'La última página', from: 'Toby', date: '17 de abril de 1987, 0:50 — en el salón', body:
`Escrito a la luz del mechero. Danny ha apagado las luces del fondo para dar miedo. Ha funcionado.

Sam se fue a casa a las 21:40. Sam dijo: «Vale. Pues desaparece». Yo no contesté nada. Lloré en el cuarto de atrás, donde nadie podía verme.

Y luego a las 0:40 alguien llamó a la puerta de atrás y era SAM. Chorreando agua.

¡¡¡SAM HA VUELTO!!! Sam siempre vuelve.

Yo pedí perdón primero. O sea, que gano yo.

Nivel 212. Danny dice que 256 antes de las tres. Las cinco manos. Nadie se suelta.` },
      dark_grandpa: { kind: 'card', title: 'Una tarjetita en la caja de un mechero', from: 'El abuelo de Toby', date: '1985', body:
`Toby:

Tu abuela me lo regaló en 1951 para que encontrara el camino a casa después del turno de noche.

Ahora es tuyo. Nunca tendrás que quedarte a oscuras.

—El abuelo` },
      dark_grinners: { kind: 'note', title: 'Letra temblorosa', from: 'Eddie', body:
`Los Sonrientes no son personas. Ni siquiera son Espectros.

Creo que son la idea que tiene el juego de lo que hay en la oscuridad. La idea de Toby. Lo que un crío de trece años cree que vive debajo de la cama.

Parte una barra luminosa, cuenta hasta tres y se van.

En este nivel duermo poco.` },
      dark_walt6: { kind: 'diary', title: 'El diario de Walt, letra apretada', from: 'Walt', date: 'Dentro', body:
`No recuerdo mi nombre. Empieza por W.

Recuerdo la letra de una niña. Letras redondas. Dibujó una cosa naranja con cuernos y debajo escribió PAPÁ.

Recuerdo el sabor de las monedas.

El ámbar tampoco me mira. Ya nadie me mira.

COME, dice el tablero. COME.` },
      dark_wall: { kind: 'wall', title: 'Escrito en la pared con hollín de mechero', body:
`NO ME MIRES

LO SIENTO SAM` },
      dark_porch: { kind: 'note', title: 'Una nota pegada en una puerta mosquitera', from: 'Maggie, la madre de Toby', date: 'Abril de 1987', body:
`Toby:

La luz del porche se queda encendida hasta que llegues a casa.

Te quiere, mamá` },
      dark_tape: { kind: 'tape', title: 'Cinta: «El chiste de Toby»', from: 'La grabadora de Rosie', date: '16 de abril de 1987, 23:58', body:
`[Clic. El cuarto de atrás del salón. Las luces están apagadas. Un mechero chasquea].

TOBY: Vale, vale. ¿Por qué cruzó el Muncher la carretera?

DANNY: Porque los Espectros estaban en este lado.

TOBY: ¡No! ¡Porque la carretera tenía ESTRELLAS!

[Silencio. Luego a Nell se le escapa un resoplido, luego a Rosie, y luego todos se ríen mucho más de lo que el chiste merece].

TOBY: [todavía riéndose] Sam debería estar aquí. Sam siempre se ríe con este.

[Las risas se apagan].

ROSIE: …Sam vendrá, Toby.

[Clic].` },
    },
    obj: {
      dark_generators: 'Arranca los generadores ({n}/3)',
      dark_leave: 'Llega al montacargas',
    },
    mono: {
      dark_start: 'No veo nada. La linterna… no sé si basta.',
      dark_tobySeen: 'Algo ámbar en el rincón. Una sábana con el dobladillo quemado. No se mueve. No mientras lo miro.',
      dark_grinner: 'Una sonrisa en la oscuridad. Solo dientes.',
      dark_gen: 'El generador despierta tosiendo. Luz.',
      dark_lighter: 'Su mechero. Una vez, en 1986, me dejó sostenerlo. A los diez segundos me lo pidió de vuelta.',
      dark_diary2: 'Sam ha vuelto. …No. No. Me fui a casa. A las 21:40 me fui a casa.',
    },
    lines: {
      dark_gen: 'Echa el gasóleo y arráncalo (mantener)',
      dark_genEmpty: 'Generador (sin gasóleo)',
      dark_needFuel: 'Primero hay que encontrar un bidón de gasóleo.',
      dark_tankEmpty: 'El depósito del generador está vacío.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Odio este. Lo odio muchísimo. Quédate en la luz, Sam. Lo digo en serio.'],
      ],
      dark_toby: [
        ['eddie', 'Ámbar… ese es Toby. No irá a por ti mientras lo mires. Cuando tenía miedo, nunca era capaz de mirar a nadie a los ojos.'],
        ['sam', 'A mí sí me miraba a los ojos. Todo el rato.'],
        ['eddie', '…Ya. Supongo que sí.'],
      ],
      dark_lighter: [
        ['eddie', 'El mechero de su abuelo. No dejaba que nadie lo tocara. Ni siquiera Danny.'],
      ],
      dark_freed: [
        ['eddie', '…Solo es un crío, Sam. Todos son solo críos.'],
        ['eddie', '¿Qué clase de juego les hace esto a unos críos?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
