/* Español — Capítulo 7: Última parada (el Nordlys Express). Biblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      train: {
        name: 'CAPÍTULO 7', title: 'Última parada', place: 'Estación de Brenna, en la línea del norte',
        intro: 'Miércoles 19 de diciembre de 1990, 23:40.\n\nEl tren nocturno a Nordvik espera en el andén con todas las ventanillas encendidas. No sube nadie. No baja nadie. Hay una puerta abierta.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'El horario junto a la puerta del andén', from: 'Líneas del Norte', date: 'Horario de invierno 1990–91', body:
`NORDLYS EXPRESS — tren nocturno con coche cama, diario
Halvard sal. 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (parada facultativa)* 00.50
Nordvik lleg. 06.15

* Los trenes solo paran en Kvitfjell si un viajero lo comunica al revisor antes de Brenna o si hay un viajero esperando en el andén. El apeadero no tiene personal ni luz en invierno.` },
      train_notice: { kind: 'notice', title: 'Un aviso en la sala de espera', from: 'Líneas del Norte, oficina regional de tráfico', date: '1 de diciembre de 1990', body:
`LOS BILLETES DEBEN COMPRARSE ANTES DE SUBIR.

En los trenes nocturnos no se venden billetes. El viajero que no pueda mostrar al revisor un billete válido deberá bajar del tren en la siguiente parada.

Gracias por viajar con Líneas del Norte.

(Alguien ha escrito debajo a bolígrafo: «¿incluso en Kvitfjell?», y otra persona: «SOBRE TODO en Kvitfjell»)` },
      train_menu: { kind: 'note', title: 'La carta del vagón restaurante', from: 'Vagón restaurante del Nordlys Express', date: '19.12.90', body:
`Sopa de pescado con pan — 48
Guiso de reno, arándanos rojos, patatas — 95
Gofres con mermelada y nata agria — 32
Café — 12   Cacao — 14

El vagón restaurante cierra a las 23.00. Después de las 23.00 se atiende a los viajeros de coche cama que presenten su billete de litera.

(El cerco de una taza. Bajo la carta, a lápiz: «Mesa junto a la cocina: cacao, litera 24, pagado en efectivo».)` },
      train_waiter: { kind: 'note', title: 'Un bloc de comandas junto a la cocina', from: 'R. Moe, camarero', date: '19.12.90', body:
`23.55  Litera 24 (coche 2) — señorita, sola — cacao, gofres.
       Vagón cerrado, pero me enseñó su billete de litera, así que.
       Vuelve a casa a Nordvik por Navidad. Primera vez sola en el tren.
       Se guardó el billete en el bolsillo del abrigo. Le dije que no lo perdiera.

00.30  Pasa el señor Saether haciendo la ronda. Nieve en la vía
       desde Ostra, y lo está pagando con todo el mundo.` },
      train_paper: { kind: 'clipping', title: 'Un periódico olvidado en una mesa', from: 'Nordvik Tidende', date: 'Sábado 22 de diciembre de 1990', body:
`UNA CHICA DE 15 AÑOS, DESAPARECIDA DESDE EL MIÉRCOLES

Lina Berg, de 15 años, vecina de Nordvik, no ha sido vista desde que subió al Nordlys Express en Halvard el miércoles por la noche para volver a casa por Navidad.

No llegó. Líneas del Norte afirma que ningún viajero bajó del tren entre Brenna y Nordvik y que su litera estaba desocupada cuando el tren llegó.

Desde entonces nieva cada día en toda la comarca. La policía pide a cualquiera que viajara en el tren que se presente.` },
      train_lina: { kind: 'letter', title: 'Una carta en la mesita de la litera 24', from: 'Lina', date: '19.12.90, en el tren', body:
`Querida mamá:

¡¡¡Estoy en el tren!!! Me compré el billete yo sola con el dinero de los sábados en la cafetería, todo el trayecto, con cama. Es del tamaño de un armario. Tengo la litera de abajo y no hay nadie en la de arriba, así que he puesto el abrigo allí y parece una persona.

Llegamos a las seis y cuarto. No vengáis a la estación a oscuras, sé el camino. Estaré en casa para el desayuno. Dile a Jonas que mi habitación no es suya.

Esta carta te la doy yo misma, así no necesito sello.

Lina` },
      train_saether: { kind: 'report', title: 'Un parte de servicio, doblado en el compartimento del revisor', from: 'E. Saether, revisor', date: '19/20.12.90', body:
`Nordlys Express, Halvard–Nordvik. Revisor: E. Saether.

21.10 Sal. Halvard. 61 viajeros.
23.40 Brenna. Bajan 4, suben 0.
00.40 Control de billetes, coche 2: litera 24, viajera, aprox. 17–18 años, no puede mostrar billete. Afirma haber comprado uno. Abrigo y bolso registrados en su presencia. Sin billete.
00.50 Kvitfjell. Viajera sin billete bajada conforme al reglamento.
06.15 Lleg. Nordvik. Nada más que informar.

(Las líneas de las 00.40 y las 00.50 están repasadas con otra tinta, con mucho cuidado, hasta quedar casi ilegibles.)` },
      train_inquiry: { kind: 'report', title: 'Una declaración en el escritorio del revisor', from: 'Investigación de Líneas del Norte: declaración de E. Saether', date: '4 de enero de 1991', body:
`Yo era el revisor del Nordlys Express la noche del 19 de diciembre.

No recuerdo a ninguna chica que viajara sola. Revisé todos los billetes del tren como de costumbre. No hubo que bajar a nadie.

El tren no paró en Kvitfjell. Ningún viajero lo había pedido, y el apeadero estaba cerrado por la nieve.

Llevo veintiséis años en el ferrocarril.

E. Saether` },
      train_docket: { kind: 'note', title: 'Una ficha de objetos perdidos atada a una saca de correo', from: 'Depósito 9, estación central de Halvard — Objetos perdidos', date: 'Enero de 1991', body:
`N.º 97 / 1991
Un billete de tren, sencillo, Halvard–Nordvik, coche cama, coche 2 litera 24, 19.12.90. Sin picar.
Hallado: Nordlys Express, coche 2, bajo la litera inferior, por el personal de limpieza en Nordvik, 20.12.90.
Recibido en el Depósito 9: 7.1.91.
Empleada: A. Lind
Estado: SIN RECLAMAR` },
      train_cabLog: { kind: 'report', title: 'El diario del maquinista en la cabina', from: 'Maquinista K. Aune', date: '19/20.12.90', body:
`00.47  Timbre del revisor: parar en Kvitfjell.
00.50  Parado en Kvitfjell. Apeadero sin luz, andén bajo la nieve. Nieva fuerte.
00.51  Baja un viajero, cola del coche 2. Salida autorizada por el revisor.
00.52  En marcha.

(La página ha sido arrancada del cuaderno y vuelta a meter, suelta.)` },
      wren7: { kind: 'drawing', drawing: 7, title: 'Un dibujo sobre una almohada del coche 3', from: 'Wren, 7 años', body:
`Ceras sobre papel cuadriculado. Un tren azul y largo en la oscuridad, con todas las ventanillas encendidas de amarillo, alejándose hacia la derecha. Detrás, en la nieve, una chica con gorro rojo de pie junto a una farola, con los brazos caídos. Encima de ella, el pajarito rojo.

Debajo:
ELLA SÍ TENÍA` },
    },
    items: {
      ticket: { name: 'Billete de tren', desc: 'Sencillo, Halvard–Nordvik, 19.12.90, ya picado una vez. De otra persona. Lo habían dejado en una mesa, bajo un platillo.' },
      linaTicket: { name: 'El billete de Lina', desc: 'Sencillo, Halvard–Nordvik, coche cama, coche 2 litera 24, 19.12.90. Sin picar. Se lo había comprado ella misma.' },
    },
    obj: {
      train_start: 'Sube al tren',
      train_ticket: 'Encuentra un billete antes de que el revisor te encuentre a ti',
      train_who: 'Averigua a quién bajaron en Kvitfjell',
      train_lina: 'Encuentra el billete de Lina en la litera 24',
      train_punch: 'Haz que le piquen el billete',
      train_brake: 'Para el tren en Kvitfjell: el freno de emergencia está en la cabina',
    },
    mono: {
      train_start: 'Un tren. Todas las ventanillas encendidas y ni un alma en el andén.',
      train_board: 'Dentro. La puerta se ha cerrado detrás de mí.',
      train_moving: 'Nos movemos.',
      train_conductor: 'Alguien con un farol viene por el pasillo.',
      train_sleeper: 'Ahí dentro duerme alguien, de cara a la puerta. Despacio, Ada.',
      train_gangway: 'Hay algo debajo de las chapas. No te quedes aquí.',
      train_ticket: 'Un billete. No es el mío. Tendrá que servir.',
      train_check: 'Quiere mi billete.',
      train_punched: 'Clic. Sigue andando. No me ha mirado a la cara.',
      train_letter: 'Lina. Quince años. En casa para el desayuno.',
      train_report: 'Litera 24. «Afirma haber comprado uno». Kvitfjell, la una menos diez de la madrugada, en la nieve.',
      train_found: 'Debajo de la litera. Donde ella decía.',
      train_turn: 'El farol se ha parado. Se ha dado la vuelta.',
      train_docket: 'A. Lind. Esa es mi letra. Mi segunda semana. Lo archivé y nunca pregunté de quién era.',
      train_punchIt: 'Su picadora. El billete de ella.',
      train_claimed: 'Picado. Válido. Tenía derecho a ir en este tren.',
      train_sat: 'Se ha sentado. Se ha quitado la gorra.',
      train_kvitfjell: '«Kvitfjell». No estamos frenando.',
      train_passed: 'Ahí se va. Una lámpara en la nieve. No hemos parado.',
      train_again: 'Próxima parada, Kvitfjell. Otra vez. Da vueltas.',
      train_brake: 'Agárrate a algo.',
      train_brakeWait: 'El freno de emergencia. Todavía no. No hasta que tenga su billete.',
      train_punchWait: 'La picadora del revisor. No es mi billete el que la necesita.',
      train_stopped: 'Kvitfjell.',
      train_out: 'Una lámpara y la nieve. Aquí es donde la bajó. Debió de quedarse justo aquí, mirando cómo se iban las ventanillas.',
    },
    lines: {
      train_boardPrompt: 'Subir al tren',
      train_punchPrompt: 'Picar el billete de Lina',
      train_punchLook: 'La picadora del revisor',
      train_brakePrompt: 'Tirar del freno de emergencia (mantener)',
      train_brakeLook: 'El freno de emergencia',
      pa_kvitfjell: '«Kvitfjell. Kvitfjell. Parada facultativa».',
    },
    radio: {
      train_otto1: [
        ['radio', '[las ruedas, bajo la estática]'],
        ['otto', 'Nueve a Ada. Ese ruido. Está en un tren. Me gustaría que me dijera que tiene billete.'],
        ['ada', 'No tengo.'],
        ['otto', 'Entonces encuentre uno antes de que el revisor la encuentre a usted. En mi estantería los revisores son lo peor. Son muy educados y no se detienen.'],
      ],
      train_otto2: [
        ['otto', 'Ada. Acaba de llegar sola por el tubo una ficha. Un billete de tren, sin reclamar. Con su letra. Así que usted ya llenaba mis estanterías mucho antes de bajar a ellas.'],
      ],
      train_otto3: [
        ['otto', 'Por su lado se ha hecho el silencio. Eso es o muy bueno o muy malo. Si el tren sigue en marcha, párelo. Esos trenes no llegan. Solo dan vueltas.'],
      ],
    },
    recap: {
      train: 'Nordlys Express, 19 de diciembre de 1990. El revisor Edvin Saether bajó del tren nocturno a Lina Berg, de quince años, en el apeadero de Kvitfjell, en la nieve, porque no encontraba su billete. Se lo había comprado ella misma; estaba debajo de su litera. Él dijo a la investigación que no bajó a nadie. El personal de limpieza encontró el billete en Nordvik y lo envió al Depósito 9, y yo lo archivé y nunca pregunté de quién era. Hice que lo picaran y paré el tren donde ella se bajó.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
