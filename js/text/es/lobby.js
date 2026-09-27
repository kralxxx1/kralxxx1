/* Español — Nivel 0: modo demostración. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'Modo demostración', place: 'Dentro de la pantalla',
        intro: 'Un zumbido que se nota en los dientes. Moqueta mojada. Paredes amarillas que no se acaban nunca. A lo lejos, un sonido que has oído diez mil veces por el altavoz de una máquina: la sirena de los Espectros, subiendo y bajando.\n\nEl juego estaba esperando a un jugador. Ahora ya lo tiene.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Papel pegado a la pared', from: 'Eddie', body:
`SI ESTÁS LEYENDO ESTO:

1. No corras, salvo que ya te haya visto. Correr hace ruido.
2. Los carteles de EXIT mienten. Llevan más adentro, no afuera.
3. Cuando las luces parpadeen, sal del pasillo.
4. Los farolillos son de verdad. Coge uno y todo huirá de TI. Durante un rato.
5. El Star Pop (el refresco de cereza) quita los temblores. No me preguntes por qué.
6. Hay un walkie-talkie en mi campamento. Canal 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: 'El diario de campamento de Eddie', from: 'Eddie', date: '12 de junio de 1993 (?)', body:
`Campamento 1.

Crucé la pantalla a las 23:40. Caí de cara. La moqueta está empapada, pero no gotea nada. Aquí nunca gotea nada.

Ni rastro de Walt. Encontré su linterna y su letra en una pared.

Los walkie-talkies funcionan en el canal 7. No contesta nadie. Dejo uno aquí para el siguiente idiota que siga a un adulto dentro de un videojuego.

Si eres tú: hola. Lo siento. Canal 7.` },
      lobby_walt1: { kind: 'diary', title: 'Una página del diario de Walt', from: 'Walt', date: 'Dentro, día 1', body:
`Día 1.

Amarillo. Zumba como una reactancia estropeada. La moqueta está mojada.

Oigo la sirena a lo lejos, la que suena cuando los Espectros salen de su casa.

Están aquí. Tenía razón. Que Dios me ayude, tenía razón.

Danny. Rosie. Nell. Toby. Aguantad. Ya voy.` },
      lobby_walt2: { kind: 'diary', title: 'Otra página del diario de Walt', from: 'Walt', date: 'Dentro, día 9 (?)', body:
`Día 9. O 90.

Tengo hambre todo el tiempo. Hay latas de Star Pop por todas partes, lo que cabe en mi propia nevera portátil. Me las he bebido todas. No recuerdo haberlo decidido.

Los farolillos saben a monedas. Cuando me trago uno, veo más lejos.

Probé con el enchufe la primera noche. Solo. Algo dentro de mí hizo clic, como una moneda al caer.

Hoy he visto al rojo. Huyó de mí. Grité su nombre y se paró, un segundo.

Ahora lo entiendo. Yo soy el de la boca.` },
      lobby_flyer: { kind: 'flyer', title: 'Un folleto doblado', from: 'Rosie', date: 'Abril de 1987', body:
`★ ALTO SECRETO ★
OPERACIÓN 256

CUÁNDO: jueves 4/16, después del cierre
MISIÓN: ver qué hay más allá del kill screen

EQUIPO:
Danny — la llave (NO se lo digas a Walt)
Rosie — el plan + la merienda
Nell — el mapa de los recorridos de los Espectros
Toby — la linterna
Sam — la suerte

LOS CINCO O NADIE.
¡¡¡DESTRUIR DESPUÉS DE LEER!!!
(Toby, eso significa que no lo guardes en tu cómic).` },
      lobby_exitwall: { kind: 'wall', title: 'Rayado junto a la puerta de EXIT', body:
`LOS EXITS MIENTEN
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Escrito encima de las sillas', body:
`LAS SILLAS YA ESTABAN
MIRANDO A LA PARED
CUANDO LLEGUÉ
—W.` },
      lobby_puddle: { kind: 'note', title: 'Una nota húmeda junto al charco', from: 'Walt', body:
`El agua aquí está tibia y huele a cloro. Como la piscina municipal.

Nell no se acercaba a la piscina después del 85. ¿Esto es suyo?

Cada habitación de aquí dentro pertenece a alguien.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'Un dibujo metido detrás de una rejilla', from: 'Lily, 9 años', body:
`Cera. Un hombre grande con bigote y una niña pequeña con trenzas naranjas junto a una maquinita recreativa. En su pantalla: una criatura redonda y naranja y el número 3190. La niña tiene los dos brazos en alto.

YO Y PAPÁ Y LA MAQUINITA.
¡¡¡HE ECHO 3190 PUNTOS!!!
PAPÁ DICE QUE VA EN LA TABLA PARA SIEMPRE.` },
      lobby_tape: { kind: 'tape', title: 'Cinta: «Probando, probando»', from: 'Eddie', date: 'Dentro', body:
`[Clic. Respiración pesada. El zumbido].

EDDIE: Probando, probando. Diario grabado, día… no sé. Día algo.

EDDIE: Si eres June: estoy bien. De verdad. Encuentro a Walt, saco a los críos y estoy en casa antes que el bebé. Lo prometí, y yo cumplo mis promesas. Casi siempre.

[Pausa].

EDDIE: Si no eres June: canal siete. No corras. Y hagas lo que hagas, que no te oiga comer.

[Clic].` },
    },
    obj: {
      lobby_explore: 'Encuentra una salida',
      lobby_pellets: 'Encuentra los farolillos ({n}/4)',
      lobby_insert: 'Coloca los farolillos en el panel junto al EXIT',
      lobby_leave: 'Cruza la puerta',
    },
    mono: {
      lobby_start: 'Dónde… La moqueta está mojada. El zumbido está dentro de mi cabeza.',
      lobby_exitSeen: 'EXIT. Cuatro huecos redondos junto a la puerta. Del tamaño de un farolillo.',
      lobby_firstPellet: 'Un farolillo. Caliente en la mano. Por un segundo todo se volvió azul y echó a correr.',
      lobby_eaterHeard: 'Algo mastica. En algún lugar detrás de las paredes, algo está masticando.',
      lobby_eaterSeen: 'Algo pálido al fondo del pasillo. Redondo. Demasiado grande para el pasillo. Está masticando.',
      lobby_allPellets: 'Cuatro farolillos. Ahora, la puerta.',
      lobby_radio: 'Un walkie-talkie. Alguien ha pegado el dial en el canal 7.',
    },
    lines: {
      lobby_slots: 'Cuatro huecos ({n}/4 farolillos)',
      lobby_place: 'Colocar los farolillos en los huecos',
      lobby_radioTake: 'Coger el walkie-talkie',
    },
    radio: {
      lobby_meet: [
        ['radio', '[estática]'],
        ['eddie', '…¿hola? ¿HOLA? ¿Hay alguien en el siete? ¡Di algo!'],
        ['sam', '…¿Hola? ¿Quién es? ¿Dónde estoy?'],
        ['eddie', 'Ay, gracias a Dios. Una persona. Vale. Vale. Me llamo Eddie. Trabajaba en el Starlight. Has entrado por la siete, ¿verdad?'],
        ['sam', '¿Eddie? ¿El Eddie de Walt? Desapareciste hace año y medio. Tu mujer puso tu foto en todas las farolas de Harlow.'],
        ['eddie', 'Año y medio. Parece una noche. Entonces el bebé ya… [estática] No. Ahora no. ¿Cómo te llamas?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', '…¿Sam, el de Toby? ¿Siempre con la bici a cuestas? Vaya. Por eso.'],
        ['sam', '¿Por eso qué?'],
        ['eddie', 'Cuando entraste, todo el lugar lo dijo. PLAYER ONE. Lo oí aquí abajo como en un estadio. Para mí nunca lo dijo. Para mí dijo INSERT COIN.'],
        ['eddie', 'Reglas. No corras, salvo que algo te vea. Los carteles de EXIT mienten. Si las luces parpadean, sal del pasillo. La puerta para salir de aquí pide cuatro farolillos. Encuéntralos. ¿Y Sam? Quédate en el siete.'],
      ],
      lobby_pellet1: [
        ['eddie', '¿Acabas de coger un farolillo? Ay, no. Vale. Lo ha oído. Siempre se despierta algo cuando coges uno.'],
        ['eddie', 'Esquinas, Sam. Es rápido en línea recta y lento en las curvas.'],
      ],
      lobby_eater: [
        ['eddie', 'Lo has visto. No lo mires mucho rato. Yo lo llamo el Devorador.'],
        ['sam', '¿Qué es?'],
        ['eddie', 'Es el Jugador. Todo juego necesita uno. Este era… [estática] Tú toma las esquinas.'],
      ],
      lobby_panel: [
        ['eddie', 'Cuatro huecos. Todo aquí dentro es el juego, Sam. Limpia el tablero y la puerta se abre.'],
      ],
      lobby_open: [
        ['eddie', 'Esa puerta no es una salida. Los EXITS mienten. Pero es el camino hacia abajo, y abajo es donde están.'],
        ['sam', '¿Quiénes?'],
        ['eddie', 'Ya sabes quiénes. Cuatro críos de abril del 87. Venga. Estaré en el siete.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
