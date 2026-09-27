/* Português (Brasil) — Nível 3: a piscina (Nell). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      pool: {
        name: 'LEVEL 3', title: 'A piscina', place: 'A lembrança da Nell — piscina municipal de Harlow, 12 de julho de 1985',
        intro: 'Azulejos brancos, água parada, o ardor do cloro. Devia parecer tranquilo. Está limpo demais. Está quieto demais.\n\nA Nell tirou os olhos do irmãozinho por um segundo, aqui, e desde então não parou de olhar para esta água.',
      },
    },
    docs: {
      pool_intro: { kind: 'note', title: 'Enfiado na porta de um armário', from: 'Eddie', body:
`Quatro válvulas de drenagem. Abre todas e a piscina grande esvazia. Tem um alçapão na parte funda.

A turquesa te ouve na água. Fica no azulejo seco sempre que der.

Ela não vai estar onde você viu por último. Nunca está.

—E.` },
      pool_rules: { kind: 'notice', title: 'Placa com as regras da piscina', from: 'Piscina municipal de Harlow', body:
`PISCINA MUNICIPAL DE HARLOW
PROIBIDO CORRER
PROIBIDO MERGULHAR NA PARTE RASA
PROIBIDO COMER E BEBER NA BORDA
CRIANÇAS MENORES DE 8 ANOS DEVEM SER VIGIADAS O TEMPO TODO
SALVA-VIDAS DE PLANTÃO DAS 10H ÀS 18H

A linha sobre a vigilância está sublinhada duas vezes a lápis azul. Ao lado, bem pequenininho: EU SEI` },
      pool_report: { kind: 'report', title: 'Relatório de ocorrência do salva-vidas', from: 'Piscina municipal de Harlow', date: '12 de julho de 1985', body:
`OCORRÊNCIA: quase afogamento, parte funda
HORA: 15h40
VÍTIMA: Theo Park, 6 anos
ATENDIMENTO: retirado do fundo pelo salva-vidas de plantão. Respiração boca a boca aplicada. Reagiu depois de cerca de 40 segundos. Levado ao St. Agnes para observação; liberado na mesma noite.

TESTEMUNHA: a irmã (Nell Park, 13 anos), responsável por vigiá-lo.
DEPOIMENTO: “Eu desviei o olhar por um segundo para terminar um desenho. Um segundo.”

OBS.: a irmã não quis sair da borda até a ambulância ir embora. Não falou mais nada naquele dia.` },
      pool_theo1: { kind: 'letter', title: 'Uma carta com letra de criança', from: 'Theo, 7 anos', date: 'Natal de 1986', body:
`Querida Nell,

Feliz Natal. Eu não tenho mais medo da piscina. Você pode parar de desenhar gibis tristes.

Beijos Theo

PS desenha um tubarão para mim
PS um tubarão bonzinho` },
      pool_theo2: { kind: 'letter', title: 'Outra carta do Theo', from: 'Theo, 9 anos', date: 'Abril de 1988', body:
`Nell,

Todo mundo na escola diz que você fugiu. Eu sei que não. Você teria levado os seus lápis.

Eles estão no meu quarto. Não deixo ninguém usar o azul.

A mãe ainda põe o seu prato na mesa. O pai diz para ela não pôr, e depois ele mesmo põe quando ela não está olhando.

Theo` },
      pool_theo3: { kind: 'letter', title: 'Uma carta em papel da equipe de natação', from: 'Theo, 11 anos', date: '12 de julho de 1990', body:
`Nell,

Hoje faz cinco anos. Agora estou na equipe de natação. Ganhei minha primeira prova em junho. Borboleta.

Eu sei que você acha que foi culpa sua. Não foi. Eu tinha seis anos e pulei onde a placa dizia para não pular. Você desviou o olhar por um segundo. Todo mundo faz isso.

Nunca foi culpa sua.

Volta para casa e vem me ver nadar. Guardo um lugar para você na arquibancada, o da sombra.

Theo` },
      pool_comic: { kind: 'drawing', title: 'Uma página de gibi encharcada', from: 'Nell', date: '1986', body:
`Quatro quadrinhos em tinta azul.

1. Uma menina de óculos grandes, desenhando na beira de uma piscina.
2. A água, completamente lisa.
3. A menina encara a água. Ela nunca mais vai desviar o olhar.
4. A menina, já adulta, sozinha numa sala branca. Os lápis dela estão no chão.

Título, em letras caprichadas: A MENINA QUE DESVIOU O OLHAR` },
      pool_tiles: { kind: 'wall', title: 'Riscado nos azulejos', body:
`EU DESVIEI O OLHAR POR UM SEGUNDO
EU DESVIEI O OLHAR POR UM SEGUNDO
EU DESVIEI O OLHAR POR UM SEGUNDO` },
      pool_walt4: { kind: 'diary', title: 'O diário do Walt', from: 'Walt', date: 'Lá dentro, dia ?', body:
`A turquesa nunca fica parada. Ela salta de uma ponta da piscina para a outra, como se não conseguisse decidir onde tem permissão de ficar.

No fliperama, a Nell desenhava os caminhos das Assombrações para os outros. Ela sempre acertava, e nunca acreditou nisso nem uma vez.

Deixei minha última lata de Star Pop no trampolim para ela. Quando voltei, tinha sumido, e o anel estava alinhado certinho com a borda. Obrigado, Nell.` },
      pool_tape: { kind: 'tape', title: 'Fita: “Rádio Rosie entrevista a Nell”', from: 'O gravador da Rosie', date: 'Março de 1987', body:
`[Clique. Um corredor de escola, com eco.]

ROSIE: Aqui é a Rádio Rosie, cento e sete ponto três, com uma convidada muito especial. Nell, qual é o seu superpoder?

NELL: Eu não tenho.

ROSIE: Todo mundo tem. O do Danny é ser barulhento.

NELL: [ri] …Tá. Desenhar. Talvez.

ROSIE: O que você teria medo de desenhar?

NELL: [uma longa pausa] Água. Não consigo acertar a água. Sempre sai parada demais.

ROSIE: …O Theo está bem, Nell. Ontem ele estava no clube. Deu uma bomba bem do lado do salva-vidas.

NELL: Eu sei. Eu estava lá. Não tirei os olhos dele o tempo todo.

[Clique.]` },
    },
    obj: {
      pool_valves: 'Abra as válvulas de drenagem ({n}/4)',
      pool_drain: 'Espere a piscina grande esvaziar',
      pool_hatch: 'Abra o alçapão no fundo da piscina',
    },
    mono: {
      pool_start: 'Água para todo lado. Meus passos ecoam como se alguém andasse atrás de mim.',
      pool_nellSeen: 'Turquesa. Um lençol molhado com dois olhos redondos. Ali. Não… aqui.',
      pool_valve: 'A válvula guincha. O som se espalha por tudo.',
      pool_drained: 'A água sumiu. Tem um alçapão no fundo.',
      pool_glasses: 'Os óculos dela. Bem perto, alguém está respirando.',
    },
    lines: {
      pool_valve: 'Girar a válvula (segurar)',
      pool_hatch: 'Abrir o alçapão e descer',
    },
    radio: {
      pool_start: [
        ['eddie', 'A piscina municipal. Aprendi a nadar aqui. Todo mundo em Harlow aprendeu.'],
        ['eddie', 'Esta é da Nell, Sam. Aposto a minha vida. Cuidado com a água.'],
      ],
      pool_nell: [
        ['eddie', 'A turquesa é a que não dá para prever. Ela vai estar em outro lugar antes de você piscar. E ouve um respingo do outro lado do prédio.'],
      ],
      pool_glasses: [
        ['eddie', 'Os óculos da Nell. Sem eles ela não enxergava um palmo. Empurrava para cima com um dedo quando estava pensando.'],
      ],
      pool_freed: [
        ['eddie', 'Ela está… te seguindo? Com cuidado. Como se conferisse cada passo antes de dar.'],
        ['eddie', 'É ela. É exatamente ela.'],
      ],
      pool_drain: [
        ['eddie', 'Esse ralo parece um motor de avião. Nada de área aberta enquanto esvazia.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
