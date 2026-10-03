/* Español — Capítulo 5: Ventisca blanca (Berghotel Weisshorn). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      lodge: {
        name: 'CAPÍTULO 5', title: 'Ventisca blanca', place: 'Berghotel Weisshorn, a 2.914 metros',
        intro: 'Lunes 28 de febrero de 1983, ya de noche. Tormenta en la montaña.\n\nAquella mañana el valle envió un telegrama al hotel de lo alto del teleférico. Por la tarde, cinco huéspedes y su monitor de esquí estaban bajo la nieve en la estación superior. El hotel dice que no llegó ningún telegrama.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'El libro de huéspedes', from: 'Berghotel Weisshorn', date: 'Febrero de 1983', body:
`26.2.  Fam. Aebi (3)          habitación 4
26.2.  Sr. y Sra. Coulter     habitación 2
27.2.  R. Fankhauser          habitación 1
27.2.  L. Brunner (escuela de esquí, personal)

Salidas:
Sra. Coulter — 2.3., en el trineo del valle.
(Todos los demás nombres de arriba están tachados el 28.2. de un solo trazo limpio, con otro bolígrafo.)` },
      lodge_weather: { kind: 'report', title: 'El cuaderno del tiempo en el escritorio', from: 'G. Imhof', date: '28 de febrero de 1983', body:
`06.30  Nieva fuerte desde las 3. Viento NO 60.
07.10  Línea de teléfono cortada (lo de siempre).
08.15  Sube el trineo del correo desde la estación. Correo, leche y el pan.
09.20  Teleférico en marcha. Escuela de esquí arriba a las 9.30 como todos los días. Semana completa, todas las habitaciones ocupadas, la primera semana completa desde 1979.

(La línea de las 08.15 está repasada dos veces a lápiz, como si alguien se hubiera quedado parado ahí.)` },
      lodge_telegram: { kind: 'telegram', title: 'Un telegrama, quemado por los bordes', from: 'Estación del valle, servicio de aludes', date: '28.2.83 07.55', body:
`A BERGHOTEL WEISSHORN STOP
PELIGRO DE ALUDES 5 STOP LADERAS SUPERIORES CARGADAS STOP
CERRAR HOY PISTAS SUPERIORES Y ESTACIÓN SUPERIOR STOP
PROHIBIDO ESQUIAR POR ENCIMA DEL HOTEL STOP
CONFIRMEN A VUELTA STOP
SERVICIO DE ALUDES

(Al dorso, con letra cuidadosa: «Recibido 8.15. — G.I.». El resto es hollín. Debería haberse quemado. No se quemó.)` },
      lodge_menu: { kind: 'notice', title: 'La carta del desayuno en una mesa', from: 'Berghotel Weisshorn', body:
`LUNES 28 DE FEBRERO
Café — Té — Chocolate caliente
Birchermüesli
Rösti con huevo frito
Pan del valle, mantequilla, miel de las abejas del hotel

Esta noche: ¡fondue en la terraza si el tiempo lo permite!
La escuela de esquí se reúne a las 9.30 en la estación superior. Leo dice: traed las gafas.` },
      lodge_postcard: { kind: 'card', title: 'Una postal en la mesilla, habitación 1', from: 'Ruth Fankhauser', body:
`(Una foto del hotel al sol, con una cabina del teleférico subiendo a su lado.)

Querida Hanni:
Nieva como si se acabara el mundo. Dicen que la bajada desde la cima es la mejor del valle, y subimos por la mañana, haya tormenta o no. Leo, el monitor, se ríe de todo. Soy feliz. Te llamo el domingo.
R.

(Con sello, nunca enviada.)` },
      lodge_roomNote: { kind: 'note', title: 'Una nota infantil en la habitación 4', from: 'Lisa Aebi, 10 años', body:
`Mamá dice que si hace mucho viento podemos quedarnos dentro y jugar a las cartas con la señora Imhof.
La señora Imhof dice que aquí arriba el viento no es nada.
Le pregunté si la nieve se puede caer de la montaña. Dijo que esta semana no.` },
      lodge_school: { kind: 'notice', title: 'Hoja de inscripción de la escuela de esquí', from: 'L. Brunner', date: '28.2.83', body:
`ESCUELA DE ESQUÍ — ESTACIÓN SUPERIOR 9.30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Monitor: Leo Brunner
(Debajo, a lápiz:) Greta dice que desde el valle está todo bien. Estupendo. Vamos allá.` },
      lodge_kitchenNote: { kind: 'note', title: 'Clavada junto a la cámara frigorífica', from: 'Greta Imhof', date: '28.2.83', body:
`Anton:
Si llama el valle o el trineo sube cualquier cosa del servicio de aludes, me llega a MÍ, no a los huéspedes ni a Leo. Yo me encargo.
Una semana completa. Necesitamos esta semana.
La llave maestra del teleférico está en el gancho junto a la cámara. Nadie la coge salvo tú o yo.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'De la investigación, un recorte de prensa', from: 'Periódico del valle', date: 'Abril de 1983', body:
`WEISSHORN: LA HOTELERA DICE QUE NO RECIBIÓ NINGUNA ALERTA

La propietaria del Berghotel Weisshorn, la señora Greta Imhof (52), declaró ayer ante la investigación que el 28 de febrero no llegó al hotel ninguna alerta de aludes. La línea telefónica estaba cortada desde las 7 y «en el trineo del correo no subió más que el correo», dijo.

El servicio de aludes sostiene que se envió un telegrama con el trineo de las 8.15. No se ha encontrado ninguna copia en el hotel.

Cinco huéspedes y el monitor de esquí Leo Brunner (29) murieron cuando las laderas superiores se desprendieron a las 14.40.` },
    },
    items: {
      telegram: { name: 'Telegrama', desc: 'Quemado por los bordes, y aún legible. Recibido 8.15.' },
      masterKey: { name: 'Llave maestra', desc: 'Una llave pesada con un llavero de madera: SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Ponte a salvo de la tormenta',
      lodge_find: 'Averigua qué pasó en el Weisshorn',
      lodge_telegram: 'Encuentra el telegrama que nunca llegó',
      lodge_pin: 'Vuelve a clavar el telegrama en el tablón de recepción',
      lodge_key: 'Coge la llave maestra de la cocina',
      lodge_power: 'Arranca el teleférico en la sala de máquinas',
      lodge_board: 'Sube a la cabina',
    },
    mono: {
      lodge_start: 'No me veo la mano. Hay una luz. Un edificio.',
      lodge_inside: 'Hace calor. Hay un fuego encendido y nadie que lo cuide.',
      lodge_cold: 'Tengo muchísimo frío. Tengo que entrar.',
      lodge_colder: 'No siento los dedos.',
      lodge_warm: 'Calor. Ay, eso está mejor.',
      lodge_frozen: 'Están en sus mesas. Blancos de arriba abajo. Hace mucho que nadie se mueve.',
      lodge_frozenMove: 'El de la ventana se ha movido. Cuando me he acercado al fuego, se ha movido.',
      lodge_board: 'Una chincheta y la esquina rota de algo que antes estaba colgado aquí.',
      lodge_book: 'Seis de ellos tachados el veintiocho. Todos con el mismo bolígrafo, todos de una vez.',
      lodge_stove: 'Ceniza fría. Y algo dentro que no se ha quemado.',
      lodge_telegram: '«Cerrar pistas superiores». Lo tenía a las ocho y cuarto. Subieron a las nueve y media.',
      lodge_pinned: 'Ya está. Donde todo el mundo habría podido leerlo.',
      lodge_claimed: 'El viento ha amainado. Solo un respiro. Como si la montaña escuchara.',
      lodge_stationLit: 'Luces, al otro lado de la nieve. La estación del teleférico.',
      lodge_key: 'La llave maestra.',
      lodge_cook: 'Hay alguien en la cocina. Un hombre grande. Con algo en la mano.',
      lodge_prints: 'Huellas. Formándose. Ahora mismo, delante de mí.',
      lodge_power: 'Está en marcha. La cabina tiene luz.',
      lodge_noKey: 'Necesita una llave.',
      lodge_notYet: 'El motor no arranca. No mientras este sitio me siga sujetando.',
      lodge_boarding: 'Puertas. Cerraos. Cerraos, por favor.',
      lodge_away: 'Nos movemos. Hacia abajo, a la nada.',
      lodge_office: 'Su despacho. La puerta de la estufa cuelga abierta.',
      lodge_station: 'La estación. El cable sale hacia el blanco y simplemente deja de estar.',
    },
    lines: {
      lodge_bookPrompt: 'El libro de huéspedes',
      lodge_boardPrompt: 'El tablón de telegramas',
      lodge_boardPin: 'Clavar el telegrama',
      lodge_stovePrompt: 'Sacarlo de la ceniza (mantener)',
      lodge_controlPrompt: 'Arrancar el teleférico (mantener)',
      lodge_controlLook: 'Pupitre de mando',
      lodge_gondolaPrompt: 'Subir a la cabina',
      lodge_gondolaLook: 'La cabina',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[viento sobre la estática]'],
        ['otto', 'Nueve a Ada. Se la oye muy fuerte. ¿Es una tormenta? El Weisshorn, entonces. Tengo seis pares de esquís en mi estantería y un juego de fondue que nunca se usó.'],
        ['ada', 'Aquí hay gente. Congelada en las mesas.'],
        ['otto', 'Entonces no se quede junto al fuego. Van hacia el calor. Y fuera, escuche los pasos que no sean suyos.'],
      ],
      lodge_otto2: [
        ['otto', 'Algo ha salido de mi estantería. Un telegrama. Ahora está en su sitio. Juraría que he oído esquís.'],
      ],
    },
    recap: {
      lodge: 'El Weisshorn, 28 de febrero de 1983. Greta Imhof tuvo la alerta de aludes en la mano a las ocho y cuarto, la metió en su estufa para que no se cancelara la semana completa y mandó arriba a la escuela de esquí a las nueve y media. Cinco huéspedes y su monitor murieron en la estación superior; ella dijo a la investigación que no llegó ninguna alerta. El telegrama nunca se quemó. Lo clavé donde todos pudieran leerlo, y el teleférico me bajó fuera de la tormenta.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
