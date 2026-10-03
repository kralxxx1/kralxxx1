/* Español — Capítulo 3: Sesión doble (autocine Pinewood). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      pinewood: {
        name: 'CAPÍTULO 3', title: 'Sesión doble', place: 'Autocine Pinewood, al norte de Nordvik',
        intro: 'Viernes 22 de agosto de 1975, poco después de las once de la noche. La última noche de la temporada.\n\nLa segunda película se proyecta en una pantalla entre los árboles. No tiene sonido y no termina. Un niño de ocho años fue a los aseos durante el cambio de rollo y no volvió.',
      },
    },
    docs: {
      pine_program: { kind: 'notice', title: 'Un folleto en el mostrador del bar', from: 'Autocine Pinewood', body:
`ÚLTIMA NOCHE DE LA TEMPORADA — VIERNES 22 DE AGOSTO

20:45   EL LARGO VERANO
22:40   EL LAGO DE NOCHE

¡SORTEO DE LA ENTRADA DE LA SUERTE!
Guarda el resguardo de tu entrada. En el descanso, llévalo a la ventanilla de la cabina y échalo en la lata. El señor Hardy sacará al ganador al final de la segunda película.
Premio: un PASE DE TEMPORADA para 1976. Todas las películas, todo el coche.

Por favor, vuelvan a colgar los altavoces en sus postes. Conduzcan despacio. Cuidado con los niños.` },
      pine_missing: { kind: 'notice', title: 'Un cartel en la pared de los aseos', from: 'Policía de Nordvik', date: 'Agosto de 1975', body:
`DESAPARECIDO
MIKKEL STRAND, 8 años

Visto por última vez en el autocine Pinewood el viernes 22 de agosto, hacia las 23:00, de camino a los aseos.
Pelo rubio. Anorak azul, botas de goma rojas. Llevaba la linterna de su padre.

Si lo vio, o si vio cualquier cosa esa noche, llame a la comisaría de Nordvik.
Su madre y su padre se lo piden. Lo que sea.` },
      pine_statement: { kind: 'report', title: 'Declaración, copia', from: 'L. Hardy, proyeccionista', date: '23 de agosto de 1975, 9:10', body:
`Estuve en la cabina desde las siete de la tarde hasta las dos de la madrugada, como todas las noches de proyección. Proyecté las dos películas sin pausa, salvo los cambios de rollo.

No vi al niño. Los niños no suben a la cabina. Las ventanillas dan a la pantalla y desde la cabina no se ven los aseos.

No salí de la cabina. No había bebido.

Leído y firmado,
L. Hardy` },
      pine_letter: { kind: 'letter', title: 'Una carta bajo la almohada del catre', from: 'L. Hardy', date: 'Marzo de 1981, nunca enviada', body:
`Señora Strand:

He escrito esto nueve veces. Esta vez la enviaré.

Su hijo vino a la ventanilla de la cabina a las once menos diez con su resguardo para el sorteo. Yo tenía una botella abierta y un cambio de rollo encima, y le dije que volviera después. Me dijo: «¿Prometes que lo echarás?». Le dije anda, largo.

A las once y cinco salí detrás del bar a tomar el aire y vi una linternita entrar en los árboles detrás de los aseos. Había otra luz delante, más adentro. Una roja, como una luz de freno. Pensé que eran los chicos mayores haciendo el tonto. Pensé, no es asunto mío. Pensé, si bajo ahí y alguien me huele el aliento, pierdo la licencia, y la cabina es lo único que tengo.

Le dije a la policía que no vi nada. Les dije que los niños no vienen a la cabina.

Nunca saqué al ganador. La lata sigue en el banco.

L. Hardy` },
      pine_kiosk: { kind: 'note', title: 'El libro de objetos perdidos de la taquilla', from: 'Pinewood, temporada 1975', body:
`16/8   rebeca de señora, verde, fila 2
16/8   termo (sin tapa)
22/8   un calcetín, infantil, fila 4
22/8   23:40   LLAVES DE COCHE con etiqueta roja, «STRAND». Se le cayeron al padre junto a los aseos mientras buscaban. Las entregó Jonna L. Le dije que estaban aquí. No ha vuelto a por ellas.` },
      pine_wiper: { kind: 'note', title: 'Una nota bajo el limpiaparabrisas de la ranchera', from: 'Papá', body:
`(A bolígrafo, en el reverso de un mapa de carreteras, sujeta bajo el limpiaparabrisas para que mire hacia los árboles.)

MIKKEL —
QUÉDATE DONDE VEAS LAS LUCES DEL COCHE.
CAMINA HACIA ELLAS.
TE ESTAMOS BUSCANDO.
NADIE ESTÁ ENFADADO.
— PAPÁ` },
      pine_staff: { kind: 'note', title: 'Clavado en el almacén', from: 'Bo', body:
`PERSONAL —
El generador alimenta el bar y las luces del recinto.
Para los clientes que se quedan sin gasolina: el depósito diario tiene un grifo de purga en un lado. Medio bidón rojo, no más, y apuntadlo en el libro. Abrid el grifo DESPACIO. Escupe y da golpes, y todo el recinto os mira.

La batería de Lyle es para la lámpara de SU cabina. No para arrancar coches. Otra vez no.
— Bo` },
      pine_search: { kind: 'report', title: 'Un aviso de búsqueda clavado en el puesto de caza', from: 'Policía de Nordvik', date: 'Sábado 23 de agosto de 1975', body:
`BÚSQUEDA — SECTOR C (bosque del noroeste)
Filas de diez, a un brazo de distancia.

Los perros perdieron el rastro en el viejo puesto de caza.
Se encontró una bota infantil, izquierda, roja, a unos 40 m al norte del puesto.
No se encontró nada más.

Búsqueda suspendida al anochecer. Se reanuda a las 06:00.` },
      wren4: { kind: 'drawing', drawing: 4, title: 'Un dibujo entre las hojas', from: 'Wren, 7 años', body:
`Ceras. Una enorme pantalla blanca de pie entre árboles negros. Delante, un niño pequeño con abrigo azul y botas rojas, con una linterna, mirando por encima del hombro. En el borde de arriba de la pantalla, el pajarito rojo.

Debajo:
MIRÓ ATRÁS` },
    },
    items: {
      stub: { name: 'Resguardo de entrada', desc: 'INFANTIL — AUTOCINE PINEWOOD — 22 AGO 75 — N.º 1147. Nunca lo echaron en la lata.' },
      carBattery: { name: 'Batería de coche', desc: 'Doce voltios y muy pesada. Alimentaba la lámpara de la cabina.' },
      carKeys: { name: 'Llaves del coche', desc: 'Dos llaves en una etiqueta de plástico roja. STRAND.' },
      jerrycan: { name: 'Bidón rojo', desc: 'Vacío. Huele a gasolina.' },
      fuel: { name: 'Bidón de gasolina', desc: 'Medio lleno. Chapotea al andar.' },
    },
    obj: {
      pine_start: 'Encuentra la manera de salir de Pinewood',
      pine_parts: 'Haz que arranque la ranchera: batería, gasolina, llaves ({n}/3)',
      pine_startCar: 'Arranca la ranchera',
      pine_stubFind: 'Encuentra el resguardo de entrada del niño',
      pine_claim: 'Echa el resguardo en la lata de la cabina de proyección',
      pine_leave: 'Sal por la verja en coche',
    },
    mono: {
      pine_start: 'Una pantalla de cine entre los árboles. La película está en marcha y no hay ningún sonido.',
      pine_gate: 'La verja tiene cadena. Con candado por este lado, lo cual no tiene sentido.',
      pine_wagon: 'A esta la sacaron de su fila y la giraron hacia los árboles. Los faros están encendidos. La batería, muerta.',
      pine_wagonNeeds: 'Batería muerta, depósito vacío, sin llaves. Alguien tuvo este coche toda la noche con las luces encendidas.',
      pine_battery: 'Una batería de coche. Alimentaba la lámpara de la cabina.',
      pine_batteryDark: 'Y ahora la cabina está a oscuras.',
      pine_keys: 'STRAND. Se le cayeron buscando a su hijo.',
      pine_can: 'Un bidón rojo. Vacío.',
      pine_fill: 'Escupe. Da golpes. Todo lo que hay ahí fuera puede oírlo.',
      pine_filled: 'Medio bidón. Bastará.',
      pine_tankNoCan: 'El depósito diario del generador. Tiene un grifo de purga. Necesito algo que llenar.',
      pine_fitBattery: 'Batería puesta. Los faros se han encendido solos. Nunca los apagaron.',
      pine_inBeam: 'Uno de los árboles en la luz está mal puesto.',
      pine_fuel: 'Gasolina echada.',
      pine_startFail: 'Gira. Gira. Se cala. Eso lo ha oído todo.',
      pine_notYet: 'Gira y no prende. Como si este sitio no hubiera terminado conmigo.',
      pine_stubHint: 'Vino a la cabina con su resguardo para el sorteo. Luego fue a los aseos.',
      pine_stub: 'El resguardo de la entrada de un niño. Número mil ciento cuarenta y siete. Nunca llegó a echarlo.',
      pine_claimed: 'Ya está. Estuviste aquí. Te han contado.',
      pine_draw: 'Habría ganado.',
      pine_start2: 'Ha arrancado. Ay, ha arrancado.',
      pine_end: 'En el retrovisor la pantalla se pone blanca y luego negra. Alguien ha apagado el proyector.',
      pine_booth: 'La cabina. Polvo caliente y whisky.',
      pine_toilets: 'La puerta trasera está abierta hacia los árboles.',
      pine_clearing: 'Un puesto de caza. Las hojas están pisoteadas en círculo a su alrededor.',
      pine_pines: 'Algunos de estos árboles se han movido desde la última vez que miré.',
      pine_stag: 'Algo grande acaba de cruzar el recinto. Una cornamenta más ancha que un coche.',
      pine_usher: 'Una luz roja entre los coches. Alguien que acompaña a la gente a su sitio.',
      pine_swing: 'El columpio se mueve. No hay viento.',
      pine_gateOpen: 'A lo lejos, una cadena que cae sobre la grava.',
      pine_canLook: 'La lata del sorteo. Un puñado de resguardos en el fondo, debajo del último rollo.',
    },
    lines: {
      pine_stubPrompt: 'Un resguardo de entrada en el suelo',
      pine_canPut: 'Echar el resguardo en la lata',
      pine_canLook: 'Una lata de película abierta en el banco de rebobinado',
      pine_tankPrompt: 'Llenar el bidón en el grifo de purga (mantener)',
      pine_tankLook: 'El depósito diario del generador',
      pine_wagonLook: 'La ranchera de los Strand',
      pine_wagonBattery: 'Poner la batería',
      pine_wagonFuel: 'Echar la gasolina',
      pine_wagonStart: 'Arrancar el motor (mantener)',
      pine_wagonGo: 'Subir y conducir',
    },
    radio: {
      pine_otto1: [
        ['radio', '[estática, y debajo el traqueteo de un proyector]'],
        ['otto', 'Nueve a Ada. ¿Árboles? ¿Una pantalla? Pinewood. Un autocine al norte de Nordvik, 1975. Tengo aquí una caja: once llaves de coche, una bota roja de niño y el último rollo de una película que nadie terminó de ver.'],
        ['ada', 'La película sigue en marcha. Sin sonido.'],
        ['otto', 'Aquí abajo nunca lo hay. Dos cosas. Los árboles de ahí solo se mueven mientras usted se mueve. Y si ve una luz roja entre los coches, no está ahí para ayudarla a encontrar su sitio.'],
      ],
      pine_ottoStag: [
        ['otto', 'Ese era el Ciervo. Escucha. Cuando baje la cabeza, ponga algo sólido entre los dos. Un árbol. Un coche. No se detiene por nada más.'],
      ],
      pine_draw: [
        ['lyle', '[todos los altavoces del recinto a la vez: un chasquido, una respiración, un hombre demasiado cerca del micrófono]'],
        ['lyle', 'Señoras y señores. La entrada de la suerte. Un pase de temporada para mil novecientos setenta y seis.'],
        ['lyle', 'Número mil ciento... cuarenta y siete.'],
        ['lyle', 'Mil ciento cuarenta y siete. ¿Está aquí el mil ciento cuarenta y siete?'],
        ['lyle', 'Sube a la cabina, chaval. Te lo prometí.'],
      ],
      pine_otto2: [
        ['otto', 'La caja de Pinewood. La bota ya no está. En su lugar hay un resguardo de entrada. Alguien ha escrito encima a lápiz: «Ganador».'],
      ],
    },
    recap: {
      pinewood: 'El autocine Pinewood, la última noche de 1975. El proyeccionista, Lyle Hardy, le dijo a la policía que los niños nunca iban a su cabina y que no había visto nada. Mikkel Strand, de ocho años, fue a la cabina con su resguardo para el sorteo, lo mandaron fuera, y siguió una luz roja entre los árboles mientras Lyle miraba. Eché el resguardo del niño en la lata y todos los altavoces del recinto leyeron su número. Luego salí por la verja en el coche de su padre.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
