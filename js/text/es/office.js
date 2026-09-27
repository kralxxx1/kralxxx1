/* Español — Nivel 4: Harlow Mutual (Rosie). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      office: {
        name: 'LEVEL 4', title: 'Harlow Mutual', place: 'El recuerdo de Rosie — Keystone Building, 3.ª planta',
        intro: 'Cubículos, pantallas verdes, café frío. Suena un teléfono. Luego otro. Luego todos se callan a la vez.\n\nRosie hacía aquí los deberes cada noche mientras su madre echaba horas extra, y hablaba con una grabadora para que la oficina pareciera menos vacía.',
      },
    },
    docs: {
      office_lily4: { kind: 'drawing', drawing: 4, title: 'Un dibujo en una carpeta que pone «LIL — GUARDAR»', from: 'Lily, 9 años', body:
`Cera. Un edificio alto con muchas ventanas. En una ventana, una chica con auriculares habla por un micrófono. Las notas de música vuelan por encima de todo el pueblo.

ROSIE VA A SALIR EN LA RADIO.
(ROSIE ME ACONPAÑA A CASA DESDE EL SALÓN A VECES.)
ME DEJA ELEGIR LAS CANCIONES.` },
      office_intro: { kind: 'notice', title: 'Cartel en la puerta de la sala de seguridad', from: 'Mantenimiento', body:
`SALA DE SEGURIDAD
Código cambiado en abril de 1987 según la normativa de la empresa.
Cada jefe de departamento ha recibido UNA cifra.
No apunte su cifra.

(Cuatro personas distintas han apuntado su cifra en algún lugar de esta planta).` },
      office_clue1: { kind: 'printout', title: 'Un memorando olvidado en la impresora', from: 'Mantenimiento', date: '2 de abril de 1987', clue: 1, body:
`PARA: Departamento de Siniestros
DE: Mantenimiento

Su cifra del nuevo código de seguridad es: 1
Es la PRIMERA cifra.

Memorícela y destruya este memorando.

(Nadie destruyó este memorando).` },
      office_clue2: { kind: 'screen', title: 'Terminal: CODE.TXT', from: 'Terminal de la oficina', clue: 2, body:
`C:\\> TYPE CODE.TXT

CÓDIGO DE LA SALA DE SEGURIDAD
POSICIÓN 2 = 0
POSICIONES 3 Y 4: preguntar a Carol, de Siniestros.
Total, ella lo sabe todo.

C:\\> _` },
      office_clue3: { kind: 'wall', title: 'Pizarra blanca de la sala de descanso', from: 'Rosie', clue: 3, body:
`ROSIE RADIO
10_.3 FM
LA ÚNICA EMISORA QUE PONE
LO QUE NECESITAS OÍR

número que falta = mi número de la suerte = 7
(Mamá dice que no puedo meter mi emisora en el código. ¡Demasiado tarde!)` },
      office_clue4: { kind: 'phone', title: 'Buzón de voz, extensión 1073', from: 'Carol, Siniestros', clue: 4, body:
`[Pitido].

CAROL: Rosie, cariño, soy mamá. Estoy atrapada en la reunión de siniestros, otra vez se alarga.

CAROL: Si llaman de Mantenimiento por lo del código, diles que la última cifra es tres. Tres, como nosotros tres: tú, yo y el microondas.

CAROL: No te comas todas las galletas de la máquina. Te quiero. Primero los deberes y luego la radio.

[Pitido].` },
      office_carol: { kind: 'note', title: 'Nota en la nevera de la sala de descanso', from: 'Carol, la madre de Rosie', date: 'Abril de 1987', body:
`R:

La reunión se alarga otra vez. La cena está en el congelador, el táper de la tapa azul. Siete minutos, no diez.

Los deberes ANTES que la radio.

Estoy orgullosa de ti. Sé que no te lo digo. Te lo digo en la nevera.

—Mamá` },
      office_tracklist: { kind: 'card', title: 'La carátula de una cinta', from: 'Rosie', date: 'Abril de 1987', body:
`OPERACIÓN 256 — RECOPILATORIO OFICIAL

CARA A: PARA ESTA NOCHE
1. Neon Hearts — The Arcadians
2. Kill Screen Boogie — DJ Lantern
3. Midnight at the Starlight — Rosie (en directo desde la sala de descanso)
4. Don’t Look Back — Harbor Lights

CARA B: PARA DESPUÉS
(vacía — la grabamos cuando ganemos)` },
      office_rosie_tape: { kind: 'tape', title: 'Cinta: «Rosie Radio, en directo»', from: 'La grabadora de Rosie', date: '14 y 17 de abril de 1987', body:
`[Clic. Zumbido de fluorescentes. Un microondas en cuenta atrás].

ROSIE: ¡Buenas noches, Harlow! Aquí Rosie Radio, ciento siete punto tres, en directo desde la sala de descanso de Harlow Mutual, donde el café está quemado y el futuro es brillante.

ROSIE: [más bajo] A veces hablo con este trasto una hora y nadie lo oye. No pasa nada. Es bonito fingir que hay alguien al otro lado.

[La cinta sisea y salta. Ahora: lluvia en el cristal, música de máquinas, un ventilador. El contador marca 12:40].

ROSIE: [susurrando] Rosie Radio, en directo desde el Starlight después del cierre. Nivel doscientos doce. Danny está a los mandos y está sudando.

[Tres golpes en una puerta metálica].

NELL: Hay alguien en la puerta de atrás.

TOBY: [ya corriendo] ¡Lo sabía! ¡Lo SABÍA!

[Se corre un cerrojo. La lluvia suena fuerte].

ROSIE: Vaya, vaya, vaya. Mira quién vuelve arrastrándose.

TOBY: [riendo, casi llorando] ¡Has vuelto!

ROSIE: Saluda a Harlow, so cagueta—

[Clic. La cinta acaba ahí].` },
      office_walt5: { kind: 'diary', title: 'El diario de Walt', from: 'Walt', date: 'Dentro, día ?', body:
`La violeta siempre está donde yo estoy a punto de estar. Me lee como un mapa.

Rosie también lo hacía en la máquina. Se ponía detrás de Danny y le susurraba: «izquierda, izquierda, ahora espera, ahora YA». Él nunca admitió que le hacía caso.

Hoy he ido a la izquierda. Ella ya estaba allí. No me ha tocado. Solo me ha mirado, como si lo sintiera.` },
      office_eddie_page: { kind: 'note', title: 'Una página arrancada y arrugada', from: 'Eddie', body:
`…uno entra, uno sale. O sea, que la puerta quiere que alguien se quede atrás. Alguien que cruce la pantalla después de mí. Podría ser cualquiera. Podría ser un crío.

No. Para.

Tú no eres de esos, Eddie.` },
      office_board: { kind: 'wall', title: 'Pizarra de la sala de reuniones', from: 'Sala de reuniones B', body:
`REVISIÓN DE SINIESTROS
- atrasados: 212 expedientes
- horas extra: aprobadas (otra vez)
- viernes: comida de traje

Cruzando todo, con otro rotulador:
DÓNDE SE FUERON TODOS` },
      office_phone2: { kind: 'phone', title: 'Línea 0256', from: 'Línea desconocida', body:
`[Estática. Luego una voz plana, infantil, contando despacio].

…doscientos cincuenta y tres…
…doscientos cincuenta y cuatro…
…doscientos cincuenta y cinco…

[La cuenta se detiene. Una respiración, pegada al auricular].

…doscientos cincuenta y-

[La línea se corta].` },
      office_phone3: { kind: 'phone', title: 'Una llamada de 1987', from: 'Maggie Marsh', date: '17 de abril de 1987, 7:12', body:
`[Timbre, y luego una mujer que se esfuerza mucho por sonar tranquila].

MAGGIE: ¿Hola? ¿Carol? Soy Maggie, la madre de Toby. Perdona que te llame al trabajo tan temprano. ¿Está Rosie contigo? Toby dijo que dormía en casa de Sam, pero Sam dice que Toby nunca llegó…

MAGGIE: ¿Hay alguien ahí?

MAGGIE: …Le he dejado encendida la luz del porche. La voy a dejar encendida.

[Clic].` },
      office_personnel: { kind: 'screen', title: 'Terminal: PERSONNEL.TXT', from: 'Terminal de la oficina', body:
`HARLOW MUTUAL — DPTO. DE SINIESTROS
CAROL A. ..... TASADORA ....... HORAS EXTRA T1: 212 H
DENNIS R. .... SUPERVISOR ..... HORAS EXTRA T1:  12 H
MARGE T. ..... ADMINISTRATIVA . HORAS EXTRA T1:   0 H

REGISTRO DE VISITAS (DESPUÉS DE LAS 18:00):
ROSIE A. (HIJA DE CAROL A.) ... 61 VISITAS

C:\\> _` },
    },
    obj: {
      office_code: 'Encuentra las cifras del código de seguridad ({n}/4)',
      office_keypad: 'Introduce el código en el teclado de la sala de seguridad',
      office_card: 'Coge la tarjeta de seguridad',
      office_stairs: 'Usa la tarjeta en la puerta de la escalera de incendios',
    },
    mono: {
      office_start: 'Una oficina. Pantallas verdes. No hay nadie, pero parece que todos se acaban de levantar.',
      office_rosieSeen: 'Violeta… delante de mí. Llegó antes que yo. Sus ojos están donde yo quiero ir.',
      office_code: 'Ya están las cuatro. Uno, cero, siete, tres. La emisora de Rosie.',
      office_cameras: 'Los monitores muestran las cámaras de la planta. Ahora las veo en el mapa.',
      office_tape: 'La cara B está vacía. «Para después».',
    },
    lines: {
      office_keypad: 'Introducir el código',
      office_card: 'Pasar la tarjeta',
      office_cardIdle: 'Lector de tarjetas (rojo)',
      office_cardRed: 'La luz del lector de tarjetas está en rojo.',
    },
    radio: {
      office_start: [
        ['eddie', '¿Una oficina? …Harlow Mutual. La madre de Rosie trabajaba aquí. Rosie hacía los deberes en la sala de descanso todas las noches hasta las nueve.'],
        ['eddie', 'Llamaba al salón desde su teléfono y nos daba el parte del tiempo. Todas las noches sin falta.'],
      ],
      office_rosie: [
        ['eddie', '¡La violeta va por delante! Lee hacia dónde vas. Vuelve sobre tus pasos. Date la vuelta sin motivo. Ya sé cómo suena.'],
      ],
      office_tape: [
        ['eddie', 'El recopilatorio. Hizo uno para esa noche. La cara B era «para después».'],
        ['sam', '¿Después de qué?'],
        ['eddie', 'Después de ganar. Después de volver a casa.'],
      ],
      office_freed: [
        ['eddie', 'Camina a tu lado. No delante. A tu lado.'],
        ['eddie', 'Así se ponía detrás de Danny en la máquina. Justo ahí, susurrándole los movimientos.'],
      ],
      office_page: [
        ['sam', 'Eddie. Aquí hay una página. Con tu letra. «Uno entra, uno sale. Podría ser un crío».'],
        ['eddie', '…Eso es viejo. La primera semana escribí muchas tonterías. Olvídalo.'],
        ['eddie', 'La escalera, Sam. Ve a la escalera.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
