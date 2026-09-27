/* Español — Nivel 2: Sueños de tubería (los túneles de desagüe, verano de 1985). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      pipes: {
        name: 'LEVEL 2', title: 'Sueños de tubería', place: 'Túnel de desagüe C bajo Front Street — julio de 1985',
        intro: 'Túneles de ladrillo bajo Harlow, templados y goteando. En julio de 1985 tres críos bajaron aquí con una linterna y una bolsa de regaliz y construyeron un fuerte. Tú formabas parte del grupo.\n\nLas flechas de tiza todavía parecen recientes. Ahora aquí abajo vive otra cosa, y odia la luz.',
      },
    },
    docs: {
      pipes_intro: { kind: 'note', title: 'Pegado a una tubería dentro de una funda de plástico', from: 'Eddie', body:
`Túneles de desagüe. Creo que este es el sitio de los críos. Flechas de tiza por todas partes.

La puerta de presión del final no se moverá hasta que se purgue el vapor. Tres válvulas grandes. Gira cada una hasta el tope.

Aquí abajo hay cosas que yo llamo Reptantes. Odian la luz. La ODIAN. Mantén la linterna sobre ellos y retroceden.

Que no se te acabe la pila aquí abajo.

—E.` },
      pipes_chalk: { kind: 'wall', title: 'Tiza en los ladrillos', body:
`D + T + S
ESTUVIERON AQUÍ
JULIO 1985

→ FUERTE →

(NADA DE CHICAS)
(MENOS NELL) (MENOS ROSIE) (VALE, TODO EL MUNDO)` },
      pipes_map: { kind: 'note', title: 'Un mapa del tesoro en el dorso de una caja de cereales', from: 'Toby, 11 años', body:
`TÚNEL C — MAPA SECRETO
(NO SE LO ENSEÑES A NINGÚN MAYOR)

X = FUERTE
ZIGZAG = LA TUBERÍA RUIDOSA
CALAVERA = DONDE A SAM SE LE CAYÓ LA LINTERNA Y TUVIMOS QUE IR DE LA MANO

La sala de calderas es el dragón. No toquéis la rueda roja. Danny dice que hace estornudar a todo el pueblo.

Si has encontrado esto, ya eres del club.` },
      pipes_rules: { kind: 'wall', title: 'Rotulador en una tabla, letras grandes', body:
`NORMAS DEL FUERTE
1. NADA DE MAYORES
2. PROHIBIDO LLORAR (TOBY VA POR TI) (ES BROMA)
3. QUIEN TENGA LA LINTERNA ESPERA A LOS DEMÁS
4. NADIE VUELVE A CASA SIN COMPAÑÍA
5. MEJORES AMIGOS PARA SIEMPRE SIN MARCHA ATRÁS

— SAM (PRESIDENTE)` },
      pipes_works: { kind: 'note', title: 'Obras Públicas de Harlow — registro de inspección', from: 'Obras Públicas de Harlow', date: '2 de agosto de 1985', body:
`TÚNEL C, SECCIÓN 4

Válvulas de alivio de la caldera engrasadas. Presión normal.

Rastros de niños: envoltorios de caramelos, un saco de dormir, tebeos, pintadas de tiza, una linterna (sin pilas). Cartel en el cruce: «FUERTE — PROHIBIDO MAYORES».

Se recomienda un candado en la rejilla de Front Street.

No se retiró el fuerte. Parecía importarle a alguien.

—R.` },
      pipes_walt: { kind: 'diary', title: 'El diario de Walt, una página húmeda', from: 'Walt', date: 'Dentro', body:
`Túneles. Ladrillo. No he bajado aquí en mi vida y me conozco cada recodo.

Estos no son mis recuerdos. Estoy paseando por el verano de otra persona.

Tres críos. Una linterna. Una norma sobre que nadie vuelve a casa sin compañía.

Me gustaría decirles que es una buena norma. No recuerdo cómo se habla con los niños. Antes se me daba bien.` },
      pipes_photo: { kind: 'photo', photo: 'fort', title: 'Una foto instantánea clavada en la pared del fuerte', from: 'Desconocido', date: 'Julio de 1985', body:
`Tres críos en un túnel de ladrillo, iluminados desde abajo por una sola linterna, intentando parecer terroríficos sin conseguirlo. El alto (Danny) le hace cuernos al pequeño (Toby). En el medio, sonriendo, estás tú.

En la franja blanca, a boli: «EL FUERTE. DÍA DE LA INAUGURACIÓN».` },
      pipes_crawlers: { kind: 'note', title: 'Arrancado de una libreta', from: 'Eddie', body:
`Sobre los Reptantes.

Creo que son los basureros del juego. Cuando un recuerdo se hace demasiado viejo para importar, vienen y se lo comen. Ya nadie se acuerda de estos túneles salvo tres críos, así que están plagados de ellos.

Rápidos en la oscuridad. Torpes en la luz. Se lanzan, retroceden cuando se queman y luego dan vueltas.

Una barra luminosa en el suelo detrás de ti te da un minuto. Lo aprendí por las malas.` },
      pipes_lily3: { kind: 'drawing', drawing: 3, title: 'Un dibujo enrollado dentro de una tubería', from: 'Lily, 9 años', date: 'Mayo de 1983', body:
`Cera. Tres niños bajo un gran techo de ladrillo curvo, compartiendo una linterna. Fuera, una niña con trenzas naranjas les saluda con la mano.

SAM Y TOBY Y EL GRANDE DE DANNY ENCONTRARON UNA CUEBA DEBAJO DE LA CALLE.
DICEN QUE NADA DE CHICAS.
EN MI CABEZA SÍ PUEDO ENTRAR.` },
      pipes_tape: { kind: 'tape', title: 'Cinta: «Diario del fuerte 1»', from: 'El radiocasete de Danny', date: '19 de julio de 1985', body:
`[Clic. Agua goteando. Tres críos susurrando, con eco].

DANNY: Diario del fuerte número uno. Presentes: yo, Toby y Sam, presidente.

SAM: Presidente del FUERTE.

DANNY: Presidente del fuerte. Tenemos cuatro tebeos, dos linternas, de las que funciona una, y regaliz.

TOBY: El regaliz lo he traído yo.

DANNY: Toby ha traído el regaliz. Norma cuatro, Sam.

SAM: Nadie vuelve a casa sin compañía.

TOBY: ¿Aunque haya enfado?

SAM: …Sobre todo si hay enfado.

[A lo lejos, una tubería da un golpe. Los tres gritan y luego se ríen hasta quedarse sin aire].

[Clic].` },
    },
    obj: {
      pipes_valves: 'Purga las válvulas de vapor ({n}/3)',
      pipes_leave: 'Cruza la puerta de presión',
    },
    mono: {
      pipes_start: 'El túnel C. Conozco este olor. Tenía once años.',
      pipes_valve: 'La válvula chirría y luego se calla. En algún sitio lejano sale vapor silbando.',
      pipes_fort: 'El fuerte. Nuestro fuerte. El saco de dormir sigue aquí. Los tebeos de Toby siguen aquí.',
      pipes_crawler: 'Algo blanco y rápido en el techo. Se ha apartado de la luz como si le quemara.',
    },
    lines: {
      pipes_valve: 'Girar la válvula de vapor (mantener)',
    },
    radio: {
      pipes_start: [
        ['eddie', 'Túneles. ¿Todo bien? Tu respiración se oye muy fuerte por la radio.'],
        ['sam', 'Yo bajaba aquí. Con Danny y Toby.'],
        ['eddie', 'Entonces conoces el camino mejor que yo. Primero las válvulas. Y mantén la luz en alto. Lo digo en serio.'],
      ],
      pipes_crawler: [
        ['eddie', '¡Un Reptante! ¡Luz encima, Sam! No huyas de ellos a oscuras, son más rápidos que tú.'],
      ],
      pipes_fort: [
        ['sam', 'Norma cuatro. Nadie vuelve a casa sin compañía. Me la inventé yo. Tenía once años.'],
        ['eddie', '…Es una buena norma, Sam. Ojalá yo hubiera tenido una norma así.'],
      ],
      pipes_done: [
        ['eddie', 'La presión está bajando. La puerta debería ceder ya. La siguiente es agua. Mucha agua.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
