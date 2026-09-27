/* Español — Nivel 9: St. Agnes (Walt, octubre de 1983). */
(function (root) {
  'use strict';
  root.PB.I18N.register('es', 'story', {
    chapters: {
      hospital: {
        name: 'LEVEL 9', title: 'St. Agnes', place: 'El recuerdo de Walt — planta infantil, octubre de 1983',
        intro: 'El peor mes de Walt, conservado a la perfección. Paredes verdes, zapatos blandos, cera para suelos y naranjas.\n\nEn algún lugar de esta planta está la habitación 207. En algún lugar de esta planta algo muy alto cuenta los segundos que apartas la mirada.',
      },
    },
    items: {
      page: { name: 'Una página del diario de Walt', desc: 'Arrancada por la costura. Su letra se hace más pequeña en cada página.' },
      page1: { name: 'Una página del diario de Walt' }, page2: { name: 'Una página del diario de Walt' }, page3: { name: 'Una página del diario de Walt' }, page4: { name: 'Una página del diario de Walt' }, page5: { name: 'Una página del diario de Walt' },
      room207Key: { name: 'Llave de la habitación 207', desc: 'Una llave de planta con una etiqueta de cartón, con la letra pulcra de una enfermera: 207 — LILY. Una pegatina de sol en el reverso.' },
    },
    docs: {
      hospital_intro: { kind: 'note', title: 'Sujeto a una silla de ruedas', from: 'Eddie', body:
`Esto es de Walt. Se nota. Todo está demasiado limpio.

Hay cinco páginas de su diario repartidas por la planta. Creo que las arrancó él mismo para no tener que leerlas.

La habitación 207 está cerrada con llave. En el control de enfermería hay llaves. No entres hasta haber leído las páginas. No sé por qué. Parece que esa es la regla.

El Contador está aquí. No le des la espalda.

—E.` },
      hospital_diary1: { kind: 'diary', title: 'El diario de Walt — página 1', from: 'Walt', date: '2 de octubre de 1983', body:
`La han pasado a la 207. Tiene ventana. Quería una ventana para ver cuándo llueve.

El médico dijo semanas. Yo dije meses. No me llevó la contraria, y así es como lo sé.

Me preguntó si el salón la echa de menos. Le dije que las máquinas preguntan por ella todas las mañanas. Me dijo: «Papá, las máquinas no hablan». Le dije: estas sí.` },
      hospital_diary2: { kind: 'diary', title: 'El diario de Walt — página 2', from: 'Walt', date: '9 de octubre de 1983', body:
`Ruth se queda ahora en el coche. No sube. No se lo reprocho. Hay gente que solo sabe querer en línea recta, y esto no es una línea recta.

Hoy Lily me ha dibujado. Un hombre grande con bigote y un salón recreativo muy pequeñito en la cabeza, como un sombrero.

Subí una máquina pequeña en el ascensor. Hizo 3190 puntos. Intenté dejarla ganar en la segunda partida. Se dio cuenta. Me dijo: «No me dejes ganar, que así no cuenta». Así que no lo hice. Ganó igual.` },
      hospital_diary3: { kind: 'diary', title: 'El diario de Walt — página 3', from: 'Walt', date: '21 de octubre de 1983', body:
`Duerme casi todo el día.

Cuando está despierta, dibuja. Ya hay ocho dibujos en la pared. El salón. Chompy. El árbol de Front Street. Una cueva con niños dentro (Sam Keller y el crío de los Marsh encontraron una cueva debajo de Front Street y no la dejan entrar). Yo.

Me preguntó: «Cuando ya no esté, ¿quién va a jugar a mi juego?».

No supe qué contestar. Trabajo con máquinas. Debería haber tenido una respuesta.` },
      hospital_diary4: { kind: 'diary', title: 'El diario de Walt — página 4', from: 'Walt', date: '27 de octubre de 1983', body:
`La fiesta de Halloween de la planta, adelantada, para los que no pueden esperar.

Subí el disfraz de Chompy por las escaleras porque no cabía en el ascensor. Las enfermeras se rieron tanto que una tuvo que sentarse. Toda la planta salió en camisón.

Lily se rio hasta toser, y luego se volvió a reír.

Me hizo prometerle que su puntuación se quedaría para siempre en la tabla de récords. LIL, 3190.

Esta noche, medio dormida, me ha dicho: «Haz un juego que no se acabe nunca, papá. Para que nadie tenga que irse».

Le dije que lo haría.` },
      hospital_diary5: { kind: 'diary', title: 'El diario de Walt — página 5', from: 'Walt', date: '29 de octubre de 1983', body:
`5:40. Llovía. Le habría gustado.

…

Voy a construir una máquina que lo recuerde todo. Un juego en el que nadie se vaya nunca.

Sé cómo suena.

Lo escribo de todos modos, para que algún día, cuando haya hecho algo terrible, alguien pueda leer esto y sepa que lo hice por amor. No bastará. Sé que no bastará.` },
      hospital_nurse: { kind: 'note', title: 'Portapapeles del turno de noche', from: 'Enfermera Donna', date: 'Octubre de 1983', body:
`207 — Lily, 9. Tranquila. Ha pedido más ceras (naranja). Padre presente, como siempre. Padre ha dormido en el sillón, como siempre.

Que alguien le diga, por favor, que vaya a casa a ducharse. Dice: «Se despertará y no estaré». Ya no discutimos.

Fiesta de Halloween el 27 — el padre vendrá disfrazado. Que Dios nos pille confesados. (El mejor día que ha tenido esta planta en todo el año).` },
      hospital_ruth: { kind: 'letter', title: 'Una carta doblada en la capilla', from: 'Ruth', date: 'Septiembre de 1985', body:
`Walt:

Yo no era capaz de entrar, entonces. Tú sí. Esa es la diferencia entre nosotros, y por eso tengo que irme.

No puedo vivir en una casa donde la estás volviendo a construir con cables. Te oigo por las noches en el garaje, hablando con las máquinas.

Por favor, no dejes que esto te devore.

Lo siento. Siempre lo sentiré.
— Ruth` },
      hospital_visitors: { kind: 'note', title: 'Registro de visitas, planta infantil', from: 'St. Agnes', date: 'Octubre de 1983', body:
`207 — Walt (padre) .......... 1/10, 2/10, 3/10, 4/10, 5/10, 6/10, 7/10, 8/10, 9/10, 10/10, 11/10, 12/10, 13/10…
207 — Ruth (madre) .......... 1/10, 3/10
207 — Nora (tía) ............ 8/10, 14/10, 22/10
207 — 4.º, aula 104 ......... 14/10 (tarjeta entregada)
207 — Frank D. (amigo del padre) ... 20/10, 27/10 (trajo naranjas)` },
      hospital_card: { kind: 'note', title: 'Una tarjeta gigante de «mejórate» hecha con cartulina', from: '4.º, aula 104', date: 'Octubre de 1983', body:
`¡¡¡MEJÓRATE PRONTO, LILY!!!

Te echamos de menos en plástica. La señora K dice que las ceras se sienten solas.

— Sam (te he guardado el columpio bueno)
— Toby (te he dibujado un dragón por detrás) (es un perro)
— y 22 nombres más en mayúsculas muy cuidadas

(Recuerdas haberla escrito. Recuerdas no saber que no iba a servir de nada).` },
      hospital_chompy: { kind: 'photo', photo: 'chompy', title: 'Una foto instantánea pegada encima de la cama', from: 'Enfermera Donna', date: '27 de octubre de 1983', body:
`Un hombre con un enorme disfraz naranja y redondo, con cuernos de fieltro y una sonrisa llena de dientes de gomaespuma, arrodillado junto a una cama de hospital. Una niña muy pequeña con un gorro de fiesta abraza la cabeza del disfraz con los dos brazos.

En la franja blanca: «LIL & CHOMPY»` },
      hospital_chart: { kind: 'note', title: 'La hoja clínica a los pies de la cama', from: 'St. Agnes', date: '29 de octubre de 1983', body:
`PACIENTE: Brenner, Lily, 9
DX: Leucemia linfoblástica aguda

29/10 05:40 — Hora de la muerte.
Padre presente.
Llueve.

(Alguien ha añadido, muy pequeño, a lápiz: «3190»)` },
      hospital_lily6: { kind: 'drawing', drawing: 6, title: 'Un dibujo aún pegado junto a la ventana de la 207', from: 'Lily, 9 años', body:
`Cera. Una ventana, lluvia en rayas azules. Fuera, una criatura naranja y redonda con cuernos saluda. Dentro, una niña con gorro de fiesta le devuelve el saludo desde la cama.

CHOMPY VINO A MI FIESTA.
ERA PAPÁ.
YO LO SAVÍA PERO NO DIJE NADA.` },
      hospital_tape: { kind: 'tape', title: 'Cinta: «La hora del cuento»', from: 'La grabadora de Walt', date: 'Octubre de 1983', body:
`[Clic. Una habitación de hospital. Un monitor pita suavemente. Lluvia en la ventana].

WALT: …y el pequeño Muncher dijo: no me voy a comer a los Espectros. Son mis amigos. Solo me como las estrellas.

LILY: [adormilada] El juego no va así, papá.

WALT: Mi versión sí.

LILY: ¿Los Espectros pueden volver a casa al final?

WALT: Al final, todo el mundo vuelve a casa.

LILY: ¿Me lo prometes?

WALT: [una pausa, demasiado larga] …Te lo prometo, bichito.

[Clic].` },
    },
    obj: {
      hospital_pages: 'Encuentra las páginas del diario de Walt ({n}/5)',
      hospital_207: 'Coge la llave y entra en la habitación 207',
      hospital_leave: 'Baja en el ascensor',
    },
    mono: {
      hospital_start: 'Un hospital. Paredes verdes. Vine aquí una vez, con una tarjeta. Tenía nueve años.',
      hospital_key: 'Habitación 207. La etiqueta está escrita con la letra pulcra de una enfermera.',
      hospital_207: 'Ocho clavos en la pared, donde antes colgaban dibujos. Queda uno. Fuera de la ventana está lloviendo. Aquí siempre llueve.',
    },
    lines: {
      hospital_unlock207: 'Abrir la habitación 207',
      hospital_notYet: 'Tu mano se detiene en la llave. Todavía no. Lee primero lo que escribió.',
    },
    radio: {
      hospital_start: [
        ['eddie', 'Walt me habló de ella una vez. En el 86. Estábamos soldando a las dos de la mañana, dijo su nombre y luego no dijo nada durante una hora.'],
        ['eddie', 'Con cuidado aquí dentro, Sam. No sé qué más decirte.'],
      ],
      hospital_pages: [
        ['eddie', '…Lo construyó todo por ella. El Kernel. El juego. Todo.'],
        ['sam', 'Un juego que no se acabe nunca. Para que nadie tenga que irse.'],
        ['eddie', 'Y luego se llevó a cuatro críos. Ve a la 207. Creo que te necesita allí.'],
      ],
      hospital_207: [
        ['eddie', '¿Sam? Algo ha cambiado. El zumbido… suena distinto. Como si alguien se hubiera acordado de algo.'],
        ['eddie', 'Esté donde esté el Devorador ahora mismo, creo que acaba de dejar de masticar.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
