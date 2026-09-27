/* Español — Nivel 255 (La casa) y nivel 256 (Pantalla de la muerte). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'La casa', place: 'El propio juego',
        intro: 'Hungry House, desde dentro. Paredes cuyas juntas brillan como una pantalla, estrellas que flotan a la altura de la cadera y, en el centro, la casa de los Espectros, con la puerta cerrada por cuatro farolillos.\n\nConoces este tablero mejor que tu propio cuarto. Lo has jugado diez mil veces. Te estaba esperando para que lo jugaras una vez más.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Pantalla de la muerte', place: 'La mitad que nadie debía ver',
        intro: 'La mitad izquierda del tablero es la casa que conoces. La mitad derecha son letras, números y colores que se han soltado y cuelgan en el aire.\n\nEn algún lugar del núcleo, algo sigue enchufado.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Letras luminosas en la pared del laberinto', from: 'W.', body:
`SI PUEDES LEER ESTO,
ESTÁS EN MI JUEGO.
LO SIENTO.
CÓMETE LAS ESTRELLAS.
NO LES HAGAS DAÑO A LOS ESPECTROS.
—W.` },
      maze_rules: { kind: 'wall', title: 'Una placa, fría como la piedra', body:
`REGLAS DE LA CASA

1. El Jugador come.
2. Los Espectros persiguen.
3. El tablero se vacía.
4. Empieza el tablero siguiente.
5. No hay regla cinco.` },
      maze_house: { kind: 'note', title: 'En la puerta de la casa de los Espectros', from: 'Eddie', body:
`Cuatro farolillos mantienen la cortina cerrada. Uno en cada esquina.

La casa es el camino hacia abajo. El último camino hacia abajo.

Nos vemos al otro lado. —E.` },
      maze_fruit: { kind: 'memory', title: 'El caramelo — un recuerdo', body:
`La primera vez que Lily consiguió el premio del caramelo, gritó tan fuerte que a Walt se le cayó el café.

«¡Papá! ¡El CARAMELO! ¡Tengo el CARAMELO!».

Después de eso, él le echaba una moneda cada sábado y se quedaba detrás de ella toda la partida, y ni una sola vez le dijo por dónde ir.` },
      ks_glitch1: { kind: 'wall', title: 'Caracteres rotos colgando en el aire', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'Un archivo de guardado corrupto', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: 'La última carta de Walt', from: 'W. (creo que ese es mi nombre)', date: 'Un día que no se podía contar', body:
`Para quien llegue al núcleo.

El enchufe está aquí. Desenchufado desde dentro no es un asesinato, es un final. GAME OVER. Todos los que sigan siendo ellos mismos vuelven a casa.

Pero no se mueve con un solo par de manos. El juego empezó con cinco manos en el mando. Termina con cinco. Y los cuatro tienen que recordar quiénes son, o sus manos no serán más que luz.

Lo intenté solo, mi primera noche aquí dentro. El juego lo tomó como una jugada y me convirtió en su Jugador. Eso es lo que soy ahora.

Una mano se soltó a las 3:16. El juego lleva esperando esa mano desde entonces.

Dile a Nora que lo siento. Dile a Ruth que tenía razón. Dile a la tabla que guarde la puntuación de Lily.

—W.` },
      ks_eddie: { kind: 'note', title: 'Una nota clavada junto al EXIT', from: 'Eddie', body:
`Uno entra, uno sale.

Encontré esta puerta la primera semana. Ahí fuera ha pasado un año y medio. Aquí dentro ha parecido una sola noche, muy larga.

Lo siento, Sam.` },
    },
    obj: {
      maze_pellets: 'Coge los farolillos de las cuatro esquinas ({n}/4)',
      maze_house: 'Entra en la casa de los Espectros',
      ks_core: 'Llega al núcleo en el lado roto',
      ks_choice: 'Elige: la puerta EXIT o el enchufe',
    },
    mono: {
      maze_start: 'Esto es… el propio juego. Estoy dentro.',
      maze_rules: '¿Quién se come las estrellas? Yo.',
      maze_house: 'La cortina ha caído. Dentro de la casa hay una puerta.',
      ks_start: 'El lado derecho está… roto. Letras colgando en el aire.',
      ks_core: 'El núcleo. Aquí hay un enchufe enorme. El enchufe de la máquina. Desde dentro.',
      ks_exit: 'EXIT. Uno de verdad, esta vez. Noto el viento.',
      ks_plugTry: 'No se mueve. No con dos manos. Necesita cinco.',
      ks_plugReady: 'Cuatro luces de colores vienen a mi lado. Roja, violeta, turquesa, ámbar.',
    },
    lines: {
      maze_portal: 'Baja al nivel que no se puede contar',
      maze_fruitTake: 'Coger el caramelo',
      ks_plug: 'DESENCHUFAR',
      ks_plugTry: 'Intentar desenchufar',
      ks_exitGo: 'Cruzar el EXIT',
      ks_exitHold: 'Sujetarle la puerta a Eddie',
      ks_missing: '(Faltan: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'Ya está. Nivel doscientos cincuenta y cinco. El último tablero antes del roto.'],
        ['eddie', 'Coge las esquinas. Te espero abajo.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Estoy aquí. No en la radio. Aquí. Junto a la puerta de la derecha.'],
        ['eddie', 'Ven a buscarme. Por favor.'],
      ],
      ks_plea: [
        ['eddie', 'Esa es la de verdad. Viento, lluvia, Front Street. Casa.'],
        ['eddie', 'Deja salir a uno y se queda con otro. La encontré la primera semana. Desde entonces estoy aquí, a su lado.'],
        ['sam', 'Ibas a dejar que yo la abriera y cruzarla tú.'],
        ['eddie', 'Hope tiene quince meses, Sam. Nunca la he tenido en brazos. [Se le quiebra la voz]. No te pido que me perdones. Te pido que sujetes la puerta.'],
      ],
      ks_pleaTrust: [
        ['eddie', 'Esa es la de verdad. Viento, lluvia, Front Street. Casa.'],
        ['eddie', 'Te dije en el motel que no te lo pediría. Así que no te lo pido.'],
        ['sam', 'Pero quieres.'],
        ['eddie', 'Cada segundo. [Una respiración larga]. Ve primero al núcleo, Sam. Si hay otra manera, está allí. Si no la hay… yo seguiré aquí.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
