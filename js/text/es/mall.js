/* Español — Nivel 7: Harlow Mall (13 de diciembre de 1986, el día más feliz). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      mall: {
        name: 'LEVEL 7', title: 'Harlow Mall', place: 'El recuerdo de todos — sábado 13 de diciembre de 1986',
        intro: 'El mejor sábado de 1986. Cinco críos, veinte dólares entre todos, un árbol de Navidad de tres pisos de alto.\n\nEl centro comercial está cerrado. Los maniquíes se han acercado al cristal. Solo se mueven cuando nadie mira.',
      },
    },
    items: {
      frame: { name: 'Foto de fotomatón', desc: 'Un recuadro de una tira de fotomatón, recortado. La cabina quiere volver a tenerlos juntos.' },
      frame1: { name: 'Foto de fotomatón', doc: 'mall_frame1' },
      frame2: { name: 'Foto de fotomatón', doc: 'mall_frame2' },
      frame3: { name: 'Foto de fotomatón', doc: 'mall_frame3' },
      frame4: { name: 'Foto de fotomatón', doc: 'mall_frame4' },
    },
    docs: {
      mall_intro: { kind: 'note', title: 'En el reverso de un plano del centro comercial', from: 'Eddie', body:
`El fotomatón de la zona de restaurantes está roto. Quiere que le devuelvan sus fotos.

Hay cuatro fotos de una tira repartidas por las tiendas. Encuéntralas, mételas en la cabina y las puertas se abrirán.

Los maniquíes. No les quites el ojo de encima. Lo digo literalmente. No se mueven mientras los miras.

Este es el sitio más feliz de todo el juego y es el que más odio.

—E.` },
      mall_directory: { kind: 'note', title: 'Plano del centro, con el «USTED ESTÁ AQUÍ» borrado de tanto dedo', from: 'Harlow Mall', date: '1986', body:
`PLANTA 1
Spins Records ......... Música, cintas, cintas vírgenes
Comic Vault ........... Cómics, cromos, juegos
Toy Parade ............ Juguetes para todas las edades
Fotomatón ............. 4 poses 1 $
Zona de restaurantes .. Sunny Orange, Nonna’s Pizza, Pretzel Barn
Starlight Jr. ......... Quiosco de minirecreativas (junto a la fuente)

¡Abierto hasta las 21:00 hasta Nochebuena!` },
      mall_frame1: { kind: 'photo', photo: 'frame', title: 'Foto de fotomatón n.º 1', from: 'Fotomatón', date: '13 dic. 1986', body:
`Danny y Rosie. Danny finge que se aburre. Rosie finge que es DJ y habla por un pretzel como si fuera un micrófono.` },
      mall_frame2: { kind: 'photo', photo: 'frame', title: 'Foto de fotomatón n.º 2', from: 'Fotomatón', date: '13 dic. 1986', body:
`Nell y Toby. Nell sonríe de verdad, una sonrisa auténtica, y parece sorprendida. Toby le ha puesto un gorro de Papá Noel.` },
      mall_frame3: { kind: 'photo', photo: 'frame', title: 'Foto de fotomatón n.º 3', from: 'Fotomatón', date: '13 dic. 1986', body:
`Tú y Toby, mejilla con mejilla, poniendo exactamente la misma cara. Tienes los ojos cerrados de tanto reír.` },
      mall_frame4: { kind: 'photo', photo: 'frame', title: 'Foto de fotomatón n.º 4', from: 'Fotomatón', date: '13 dic. 1986', body:
`Los cinco apretujados en un solo taburete. El codo de Danny está en tu oreja. Nadie mira a la cámara. Todos se miran entre sí.` },
      mall_strip: { kind: 'photo', photo: 'strip', title: 'La tira de fotos, todavía caliente', from: 'Fotomatón', date: '13 dic. 1986', body:
`Cuatro fotos, una tira. Por detrás, cinco firmas y una línea con la letra redonda de Rosie:

«AMIGOS PARA SIEMPRE. AUNQUE NOS HAGAMOS VIEJOS Y ABURRIDOS.
AUNQUE NOS MUDEMOS.
AUNQUE.
— los Starlight Five»

Recuerdas quién se quedó la tira. Toby. En su caja del mechero.` },
      mall_lists: { kind: 'note', title: 'Cinco cartas a Papá Noel en una sola hoja de cuaderno', from: 'Los Starlight Five', date: 'Diciembre de 1986', body:
`DANNY: un trabajo para mi padre. (y un monopatín)
ROSIE: un micrófono de verdad. cintas vírgenes (100)
NELL: Star Rangers n.º 12. que Theo no vuelva a tener miedo al agua
TOBY: una linterna que no se gaste nunca. que Sam no se enfade por tonterías
SAM: el nivel 256

(Alguien tachó el deseo de SAM y escribió debajo, con la letra de Toby: «lo conseguiremos juntos»)` },
      mall_receipt: { kind: 'note', title: 'Un tique atascado en un cajón de discos', from: 'Spins Records', date: '13/12/86 15:41', body:
`CINTA VIRGEN KEYTONE C-90 x10 ........ $14.90
BIG BAND CHRISTMAS (LP usado) ........ $1.00
TOTAL ................................ $15.90
EFECTIVO ............................. $16.00
CAMBIO ............................... $0.10

Por detrás: «Cara A: canciones para ahora. Cara B: para después. — R.»` },
      mall_guard: { kind: 'note', title: 'Libro de registro del vigilante', from: 'Seguridad del Harlow Mall', date: '13 de diciembre de 1986', body:
`14:20 — Cinco críos en la fuente tirando monedas. Les digo que paren. Paran. Luego vuelven a empezar. Lo dejo estar. Es Navidad.

16:05 — Los mismos cinco en el fotomatón. La cabina se atasca. Los críos la arreglan solos (el grande tenía un destornillador). No pregunto.

17:30 — El más pequeño se pierde. Lo encuentro llorando junto a la fuente. Los otros cuatro llegan corriendo desde cuatro direcciones. Todos abrazados. Lo apunto porque fue bonito.` },
      mall_kiosk: { kind: 'note', title: 'Un folleto en el quiosco Starlight Jr.', from: 'Walt', date: '1986', body:
`STARLIGHT JR.
¡El salón Starlight llega al centro comercial!
3 máquinas • 25 ¢ • Abierto los fines de semana

«Todo crío se merece un récord». — Walt, propietario

(En la esquina, un viejo dibujo a cera pegado al cartel: una criatura naranja y redonda con cuernos y una gran sonrisa, sobre unas patitas. Firmado: LIL).` },
      mall_walt: { kind: 'diary', title: 'El diario de Walt, una página emborronada', from: 'Walt', date: 'Dentro', body:
`El centro comercial. Aquí tenía un quiosco. Pegué el viejo dibujo de Lily en el cartel. Chompy, con patas.

Esos cinco venían todos los sábados aquel invierno. El ruidoso, la de las cintas, la callada de las gafas, el pequeño del mechero y quien iba siempre con él.

Quien iba siempre con él. No recuerdo su nombre. Empieza por S.

Es importante. No sé por qué es importante.` },
      mall_lily5: { kind: 'drawing', drawing: 5, title: 'Un dibujo pegado dentro del quiosco Starlight Jr.', from: 'Lily, 8 años', date: 'Diciembre de 1982', body:
`Cera. El gran árbol de Navidad de Front Street. A sus pies, una criatura naranja y redonda con cuernos y patas le da la mano a una niña pequeña. La nieve cae en puntitos azules.

PAPÁ DICE QUE UN DÍA HABRÁ UN STARLIGHT EN CADA PUEBLO.
AUNQUE SEA UNO PEQUEÑITO EN UN CENTRO COMERCIAL.
(HE DIBUJADO A CHOMPY) (PAPÁ DICE QUE ME LO INVENTÉ YO)` },
      mall_tape: { kind: 'tape', title: 'Cinta: «Mensaje de Navidad»', from: 'La grabadora de Rosie', date: '13 de diciembre de 1986', body:
`[Clic. Ruido de la zona de restaurantes, música navideña, una fuente].

ROSIE: Aquí Rosie Radio, en directo desde la zona de restaurantes, con un mensaje de Navidad para… nuestro yo del futuro. Adelante.

DANNY: Danny del futuro, más te vale ser rico.

NELL: Eh. Nell del futuro. Espero que sigas siendo amiga de estos idiotas.

TOBY: Toby del futuro, seguro que ya eres más alto. Por fin.

SAM: Sam del futuro… no olvides esto.

ROSIE: Qué cursi, Sam.

SAM: Calla, que es Navidad.

[Todos se ríen. A alguien se le cae una bandeja].

ROSIE: Rosie Radio se despide. Feliz Navidad, Harlow.

[Clic].` },
    },
    obj: {
      mall_frames: 'Encuentra las fotos de la tira ({n}/4)',
      mall_booth: 'Mete las fotos en el fotomatón',
      mall_leave: 'Sal por las puertas del centro comercial',
    },
    mono: {
      mall_start: 'El centro comercial. Pretzels y pino. Aquí fui feliz. Lo había olvidado.',
      mall_frame1: 'Danny y Rosie. Él siempre fingía que no se lo estaba pasando bien.',
      mall_frame2: 'Nell y Toby. Nunca sonreía en las fotos. En esta, sí.',
      mall_frame3: 'Toby y yo. La misma cara. Siempre poníamos la misma cara.',
      mall_frame4: 'Los cinco en un taburete.',
      mall_strip: 'La guardó. En la caja del mechero. La guardó.',
      mall_mannequin: 'Ese maniquí miraba al escaparate. Ahora me mira a mí.',
    },
    lines: {
      mall_boothUse: 'Meter las fotos en el fotomatón',
      mall_boothLook: 'Fotomatón (4 poses 1 $)',
      mall_boothNeed: 'La cabina zumba. Le faltan {n} más.',
    },
    radio: {
      mall_start: [
        ['eddie', 'El centro comercial. Aquí eran todos tan felices, Sam. Todos los recuerdos de este sitio son cálidos.'],
        ['eddie', 'Por eso al juego le resulta tan fácil aferrarse a ellos.'],
      ],
      mall_mannequin: [
        ['eddie', 'No parpadees. Lo digo en serio. Camina hacia atrás si hace falta.'],
      ],
      mall_frames: [
        ['eddie', 'Las cuatro. El fotomatón está junto a la zona de restaurantes.'],
      ],
      mall_booth: [
        ['eddie', '…Los Starlight Five. Así os llamaba Walt. Ahora me acuerdo.'],
        ['eddie', 'No les cojas demasiado cariño, Sam. Son ecos. El juego los reproduce para que te quedes aquí.'],
        ['sam', '¿Eso es lo que te pasó a ti?'],
        ['eddie', '…Las puertas están abiertas. Vete.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
