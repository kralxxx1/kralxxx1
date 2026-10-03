/* Español — Capítulo 9: El hielo (lago Ostra) y los tres finales. Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      lake: {
        name: 'CAPÍTULO 9', title: 'El hielo', place: 'Lago Ostra',
        intro: 'Domingo 14 de enero de 1979, 15:40.\n\nLa casa de la abuela, en la orilla. La estufa está encendida y la radio puesta. En el lago, los mayores están en las cabañas de pesca, y la nieve llega del norte.\n\nWren está ahí fuera, en alguna parte.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'La radio, bajita, en la mesa', from: 'El tiempo en la región de los lagos', date: 'Domingo 14 de enero de 1979, 15.30', body:
`...chubascos de nieve esta tarde, que pasarán a nevadas intensas a partir de las cuatro aproximadamente, con fuerte viento del norte y ventisca. Visibilidad casi nula en campo abierto y sobre los lagos al anochecer.

Se informa de que el hielo del lago Ostra no es seguro sobre el antiguo cauce del río, en la orilla noroeste. Se ruega a la población que no pise el hielo en esa zona bajo ningún concepto.

Y ahora, las noticias de las tres y media...` },
      lake_granNote: { kind: 'note', title: 'Una nota en la mesa de la cocina', from: 'La abuela', date: 'Domingo', body:
`Ada:

He subido a la granja a por leche. Vuelvo a las cuatro y media.
Wren NO sale al hielo. Tú la tienes dentro contigo.
Hay bollos en la lata, uno para cada una.

La abuela` },
      lake_wrenNote: { kind: 'note', title: 'Una hoja pegada a la puerta de las niñas', from: 'Wren', date: '(sin fecha)', body:
`ADA
YO TAMBIÉN VOY

(Debajo, un pájaro rojo dibujado volando detrás de un pájaro más grande con una franja verde alrededor del cuello.)` },
      lake_diary: { kind: 'note', title: 'Un diario bajo la almohada de arriba', from: 'Ada, 12 años', date: '14 ene. 1979', body:
`Sunna y Per y todos van a estar en las cabañas después de comer. SUNNA ME LO HA PEDIDO.

Sunna ha dicho trae a tu pajarito, la echamos por el agujero. Ja, ja.

NO pienso llevarla. Me sigue a todas partes como un perro y luego llora y todo el mundo me mira. Por una vez quiero ir a algún sitio sin ella.` },
      lake_search: { kind: 'report', title: 'Un informe doblado en el cobertizo de las barcas', from: 'Policía del distrito de Ostra', date: 'Enero de 1979', body:
`Menor desaparecida: Wren LIND, 7 años, de la casa Lind, orilla sur, lago Ostra.

14.1, 16.50. Denuncia la desaparición su abuela, la Sra. Ingrid Lind, al volver a casa.
La hermana de la menor, Ada Lind, de 12 años, declara que Wren no salió con ella al hielo y que creía que estaba en casa.
Búsqueda: la casa, las dependencias, los bosques del sur y la carretera, durante toda la noche. Nevada intensa.
16.1, 11.20. Se encuentra una manopla roja infantil (mano derecha) sobre el hielo a unos 300 metros al noroeste de las cabañas de pesca, sobre el antiguo cauce del río. Hielo inseguro. No es posible bucear hasta el deshielo.` },
      lake_hutNote: { kind: 'note', title: 'Un paquete de tabaco, escrito', from: '(los mayores)', date: '14.1.79', body:
`PER + SUNNA

EL PAJARITO DE ADA LA HA VUELTO A SEGUIR
PÍO PÍO

(un dibujo de un pájaro con cara triste y una flecha que apunta fuera de la cabaña)` },
      lake_tape: { kind: 'transcript', title: 'Una cinta en el radiocasete: «PARA ADA»', from: 'Ingrid Lind', date: 'Diciembre de 1995', body:
`[un clic; un reloj de cocina haciendo tictac; alguien acomodándose en una silla]

Ada. Soy la abuela. Dicen que no estoy bien, así que voy a decirlo en la cinta, porque nunca fui capaz de decírtelo a la cara.

Siempre supe que la viste en el hielo. Lo supe por tu cara aquella noche. Nunca te pregunté, porque me daba miedo lo que te haría decirlo. Me dije que eso era bondad.

No lo era. Las mujeres de esta familia callamos y lo llamamos bondad. Mi madre esperó a que mi hermano fuera a buscarla y él nunca fue, y nadie lo dijo en voz alta, ni una sola vez.

Dilo, hija mía. Dilo en voz alta, a alguien. Y luego ve a buscarla.

[el reloj; una respiración larga; la cinta sigue hasta el final]` },
    },
    items: {
      mitten: { name: 'Manopla roja', desc: 'Una manopla infantil, roja, mano izquierda. Llegó en el paquete. La otra se encontró en el hielo.' },
    },
    obj: {
      lake_start: 'Encuentra a Wren',
      lake_trail: 'Sigue sus huellas hasta el hielo',
      lake_huts: 'Ve a las cabañas, donde estaban los mayores',
      lake_remember: 'Recuerda',
      lake_thin: 'Sal al hielo fino sobre el viejo río',
      lake_say: 'Díselo',
    },
    mono: {
      lake_start: 'La casa de la abuela. La estufa encendida. La radio puesta. Es mil novecientos setenta y nueve.',
      lake_empty: 'No hay nadie. La abuela ha ido a por leche. Las botas de Wren no están junto a la puerta.',
      lake_note: '«Tú la tienes dentro contigo». No lo hice.',
      lake_wrenNote: 'Siempre escribía mi nombre primero.',
      lake_out: 'Huellas pequeñas en la nieve. Hasta la orilla. Sobre el hielo.',
      lake_ice: 'El hielo canta. Lo hace cuando hace frío.',
      lake_wren: 'Rojo. Ahí fuera. Alejándose.',
      lake_huts: 'Las cabañas. Alguien se ríe ahí dentro.',
      lake_laughers: 'Se ríen de mí. Entonces también se reían de mí.',
      lake_hole: 'El agujero en el hielo. Yo estaba aquí cuando lo oí.',
      lake_remember1: 'Entró detrás de mí. Con la cara rosada de frío. «Ada, yo también he venido».',
      lake_remember2: 'Y todos me miraron. Y le aparté la mano de mi manga y le dije, piérdete, Wren. Vete a casa. Piérdete.',
      lake_remember3: 'Se fue. Por el lado equivocado. Con la nieve no se veía la orilla.',
      lake_remember4: 'Y entonces el hielo hizo un ruido. Uno largo. Ahí fuera, a la izquierda. Y no me di la vuelta, porque me estaban mirando.',
      lake_storm: 'Llega la nieve. No veo la casa.',
      lake_thin: 'Aquí el hielo es oscuro. Fino. Camina. No corras.',
      lake_hush: 'Algo en la nieve detrás de mí. Una bufanda verde.',
      lake_quiet: 'Todo se ha quedado tan callado. No oigo mis propios pasos.',
      lake_found: 'Ahí está.',
      lake_tape: 'La voz de la abuela. Llevo dos años con esta cinta en la taquilla sin ponerla nunca.',
      lake_gone: 'El rastro sigue, hacia la izquierda. Hacia el río.',
    },
    lines: {
      lake_radioPrompt: 'Escuchar la radio',
      lake_tapePrompt: 'Poner la cinta',
      lake_holePrompt: 'Mirar dentro del agujero',
      lake_choiceTitle: 'Wren está de pie sobre el hielo fino, de espaldas a ti.',
      lake_sayIt: 'Decirlo. Todo.',
      lake_vanished: '«Desapareció sin más. Nadie vio nada».',
      lake_say1: '«Te dije que te perdieras».',
      lake_say2: '«Te fuiste por el lado equivocado, y oí el hielo y no me di la vuelta».',
      lake_say3: '«Le dije a la abuela que nunca habías salido. Dejé que te buscaran en el bosque».',
      lake_give: 'Darle la manopla',
    },
    radio: {
      lake_otto1: [
        ['radio', '[nieve sobre la estática, muy suave]'],
        ['otto', 'Nueve a Ada. Apenas la oigo. Esta no es mi estantería. No la veo en absoluto. Creo que es la suya.'],
        ['otto', 'Encuentre lo que encuentre ahí fuera, díselo a ella. No a mí.'],
      ],
      lake_otto2: [
        ['otto', 'Ada. Algo en esta estantería le quita el sonido a todo. No deje que se acerque lo bastante para quitarle el suyo.'],
      ],
    },
    recap: {
      lake: 'Lago Ostra, 14 de enero de 1979. Yo tenía doce años. Wren me siguió al hielo y hasta la cabaña donde estaban los mayores, y le dije que se perdiera. Se fue por el lado equivocado en la nieve, sobre el viejo río donde el hielo es fino, y yo lo oí, y no me di la vuelta. Luego volví a casa y le dije a la abuela que nunca había salido.',
    },
    endings: {
      thaw: {
        title: 'DESHIELO', subtitle: 'La verdad, dicha en voz alta',
        lines: [
          'Lo digo. Todo. Las palabras me salen como algo que llevara diecinueve años guardado en la boca.',
          'Wren se da la vuelta. Tiene la cara rosada de frío. Me mira como me miraba siempre, como si yo fuera más alta de lo que soy.',
          'Le doy la manopla. Se la pone. Levanta las dos manos para enseñármelas: dos manoplas rojas, otra vez un par.',
          'Luego se gira y vuelve a casa por el hielo, hacia las luces de la casa, y no mira atrás. No pasa nada. Ahora sabe el camino.',
          'A las seis y diez de la mañana me despierto en el mostrador del Depósito 9, con el paquete abierto delante. Ha dejado de llover.',
          'Escribo RECLAMADO en la reclamación 256. Llamo a la policía de Halvard por un caso de hace diecinueve años. Luego saco la cinta de la abuela de mi taquilla y la escucho, hasta el final.',
          'En abril, cuando se va el hielo, los buzos registran el antiguo cauce del río.',
          'Wren está enterrada junto a nuestra abuela, en la colina sobre el lago, desde donde se ve entero.',
          'En la bandeja del Depósito 9, aquella primera mañana, había una segunda etiqueta, con una letra vieja y temblorosa que aún no conocía: RECLAMADO. POR FIN. — A.',
        ],
      },
      snowfall: {
        title: 'NEVADA', subtitle: 'La que se quedó',
        lines: [
          '«Desapareció sin más», digo. «Nadie vio nada».',
          'Wren no se da la vuelta. Detrás de mí, la cosa de la bufanda verde está muy cerca. Empieza a desenrollar la bufanda, vuelta tras vuelta, hasta que no queda nada que desenrollar.',
          'Debajo está mi propia cara, a los doce años, con el frío en las mejillas.',
          'La nieve cae sobre el lago y cubre el hielo oscuro y la figura roja que hay encima y las huellas, las mías y las suyas, hasta que no queda nada que ver.',
          'En algún lugar muy abajo, una nota sube por un tubo neumático con una letra nueva. EMPLEADA NOCTURNA, NIVEL 256. PRIMER TURNO.',
          'En el canal nueve, muy bajito: «Bienvenida al turno de noche, Ada».',
        ],
      },
      morning: {
        title: 'MAÑANA', subtitle: 'Todos los que estaban perdidos',
        lines: [
          'Lo digo. Todo. Wren se da la vuelta. Le doy la manopla y ella levanta las dos manos para enseñármelas, otra vez un par, y vuelve a casa por el hielo, hacia las luces de la casa.',
          'A las seis y diez de la mañana me despierto en el mostrador del Depósito 9, con el paquete abierto delante. Escribo RECLAMADO en la reclamación 256.',
          'A las seis y cuarto, el montacargas del fondo del archivo se abre solo.',
          'Sale un anciano con un abrigo pasado de moda desde hace treinta y cuatro años, con una placa de latón en la mano, como si se la acabaran de dar.',
          '«Brandt», dice. «Otto. Ahora me acuerdo». Mira el archivo, las estanterías, a mí. «¿En qué año estamos?».',
          'Se lo digo. Se lo piensa mucho rato. Y luego se ríe, una risa de verdad, la primera que le oigo sin estática.',
          'En abril, cuando se va el hielo, los buzos registran el antiguo cauce del río. Wren está enterrada junto a nuestra abuela, en la colina sobre el lago.',
          'En la bandeja del Depósito 9, esa mañana, hay una segunda etiqueta, con una letra vieja y temblorosa que conozco muy bien: RECLAMADO. POR FIN. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
