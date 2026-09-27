/* Español — Nivel 3: la piscina (Nell). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      pool: {
        name: 'LEVEL 3', title: 'La piscina', place: 'El recuerdo de Nell — piscina municipal de Harlow, 12 de julio de 1985',
        intro: 'Azulejos blancos, agua quieta, el picor del cloro. Debería transmitir calma. Está demasiado limpio. Está demasiado en silencio.\n\nNell apartó la vista de su hermano pequeño un segundo, aquí, y desde entonces no ha dejado de mirar esta agua.',
      },
    },
    docs: {
      pool_intro: { kind: 'note', title: 'Encajado en la puerta de una taquilla', from: 'Eddie', body:
`Cuatro válvulas de desagüe. Ábrelas todas y la piscina grande se vacía. En la parte honda hay una trampilla.

La turquesa te oye en el agua. Pisa azulejo seco siempre que puedas.

No va a estar donde la viste por última vez. Nunca lo está.

—E.` },
      pool_rules: { kind: 'notice', title: 'Cartel de normas de la piscina', from: 'Piscina municipal de Harlow', body:
`PISCINA MUNICIPAL DE HARLOW
PROHIBIDO CORRER
PROHIBIDO TIRARSE DE CABEZA EN LA ZONA POCO PROFUNDA
PROHIBIDO COMER Y BEBER EN EL BORDE
LOS MENORES DE 8 AÑOS DEBEN ESTAR VIGILADOS EN TODO MOMENTO
SOCORRISTA DE SERVICIO DE 10:00 A 18:00

La línea sobre la vigilancia está subrayada dos veces con lápiz azul. Al lado, muy pequeño: YA LO SÉ` },
      pool_report: { kind: 'report', title: 'Informe de incidente del socorrista', from: 'Piscina municipal de Harlow', date: '12 de julio de 1985', body:
`INCIDENTE: casi ahogamiento, zona honda
HORA: 15:40
VÍCTIMA: Theo Park, 6 años
ACTUACIÓN: sacado del fondo por el socorrista de servicio. Se le practicó respiración boca a boca. Respondió tras unos 40 segundos. Trasladado a St. Agnes en observación; alta esa misma tarde.

TESTIGO: la hermana (Nell Park, 13 años), encargada de vigilarlo.
DECLARACIÓN: «Aparté la vista un segundo para terminar un dibujo. Un segundo».

NOTA: la hermana se negó a moverse del borde hasta que se marchó la ambulancia. No volvió a hablar en todo el día.` },
      pool_theo1: { kind: 'letter', title: 'Una carta con letra de niño', from: 'Theo, 7 años', date: 'Navidad de 1986', body:
`Querida Nell:

Feliz Navidad. Ya no me da miedo la piscina. Puedes dejar de dibujar cómics tristes.

Te quiere Theo

PD dibújame un tiburón
PD un tiburón bueno` },
      pool_theo2: { kind: 'letter', title: 'Otra carta de Theo', from: 'Theo, 9 años', date: 'Abril de 1988', body:
`Nell:

En el cole todos dicen que te escapaste. Yo sé que no. Te habrías llevado tus lápices.

Los tengo en mi cuarto. No dejo que nadie use el azul.

Mamá sigue poniendo tu plato. Papá le dice que no lo haga, y luego lo pone él cuando ella no mira.

Theo` },
      pool_theo3: { kind: 'letter', title: 'Una carta en papel del equipo de natación', from: 'Theo, 11 años', date: '12 de julio de 1990', body:
`Nell:

Hoy hace cinco años. Ahora estoy en el equipo de natación. En junio gané mi primera carrera. Mariposa.

Sé que crees que fue culpa tuya. No lo fue. Yo tenía seis años y me tiré donde el cartel decía que no. Tú apartaste la vista un segundo. Todo el mundo lo hace.

Nunca fue culpa tuya.

Vuelve a casa y ven a verme nadar. Te guardo un sitio en las gradas, el de la sombra.

Theo` },
      pool_comic: { kind: 'drawing', title: 'Una página de cómic empapada', from: 'Nell', date: '1986', body:
`Cuatro viñetas en tinta azul.

1. Una chica con gafas grandes, dibujando al borde de una piscina.
2. El agua, perfectamente lisa.
3. La chica mira fijamente el agua. Nunca volverá a apartar la vista.
4. La chica, ya mayor, sola en una habitación blanca. Sus lápices están en el suelo.

Título, con letra cuidadosa: LA CHICA QUE APARTÓ LA VISTA` },
      pool_tiles: { kind: 'wall', title: 'Rayado en los azulejos', body:
`APARTÉ LA VISTA UN SEGUNDO
APARTÉ LA VISTA UN SEGUNDO
APARTÉ LA VISTA UN SEGUNDO` },
      pool_walt4: { kind: 'diary', title: 'El diario de Walt', from: 'Walt', date: 'Dentro, día ?', body:
`La turquesa nunca se queda quieta. Salta de un extremo de la piscina al otro, como si no pudiera decidir dónde le está permitido estar.

En el salón, Nell dibujaba los recorridos de los Espectros para los demás. Siempre acertaba, y nunca se lo creyó ni una vez.

Le dejé mi última lata de Star Pop en el trampolín. Cuando volví, había desaparecido, y la anilla estaba bien alineada con el borde. Gracias, Nell.` },
      pool_tape: { kind: 'tape', title: 'Cinta: «Rosie Radio entrevista a Nell»', from: 'La grabadora de Rosie', date: 'Marzo de 1987', body:
`[Clic. Un pasillo de colegio con eco].

ROSIE: Aquí Rosie Radio, ciento siete punto tres, con una invitada muy especial. Nell, ¿cuál es tu superpoder?

NELL: No tengo.

ROSIE: Todo el mundo tiene uno. El de Danny es hacer ruido.

NELL: [se ríe] …Vale. Dibujar. A lo mejor.

ROSIE: ¿Qué te daría miedo dibujar?

NELL: [una larga pausa] El agua. No me sale el agua. Siempre me queda demasiado quieta.

ROSIE: …Theo está bien, Nell. Ayer estuvo en el polideportivo. Se tiró en bomba justo al lado del socorrista.

NELL: Ya lo sé. Estaba allí. No le quité la vista de encima en todo el rato.

[Clic].` },
    },
    obj: {
      pool_valves: 'Abre las válvulas de desagüe ({n}/4)',
      pool_drain: 'Espera a que se vacíe la piscina grande',
      pool_hatch: 'Abre la trampilla del fondo de la piscina',
    },
    mono: {
      pool_start: 'Agua por todas partes. Mis pasos resuenan como si alguien caminara detrás de mí.',
      pool_nellSeen: 'Turquesa. Una sábana mojada con dos ojos redondos. Ahí. No… aquí.',
      pool_valve: 'La válvula chirría. El ruido llega a todas partes.',
      pool_drained: 'El agua ya no está. Hay una trampilla en el fondo.',
      pool_glasses: 'Sus gafas. Muy cerca, alguien respira.',
    },
    lines: {
      pool_valve: 'Girar la válvula (mantener)',
      pool_hatch: 'Abrir la trampilla y bajar',
    },
    radio: {
      pool_start: [
        ['eddie', 'La piscina municipal. Aquí aprendí a nadar. Como todo Harlow.'],
        ['eddie', 'Esta es de Nell, Sam. Me juego la vida. Vigila el agua.'],
      ],
      pool_nell: [
        ['eddie', 'La turquesa es la que no puedes prever. Estará en otro sitio antes de que parpadees. Y oye un chapoteo desde la otra punta del edificio.'],
      ],
      pool_glasses: [
        ['eddie', 'Las gafas de Nell. Sin ellas no veía tres en un burro. Se las subía con un dedo cuando pensaba.'],
      ],
      pool_freed: [
        ['eddie', '¿Te está… siguiendo? Con cuidado. Como si comprobara cada paso antes de darlo.'],
        ['eddie', 'Esa es ella. Es exactamente ella.'],
      ],
      pool_drain: [
        ['eddie', 'Ese desagüe suena como un motor a reacción. No te quedes a la vista mientras se vacía.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
