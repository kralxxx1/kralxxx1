/* Português (Brasil) — Capítulo 5: Nevasca branca (Berghotel Weisshorn). Bíblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      lodge: {
        name: 'CAPÍTULO 5', title: 'Nevasca branca', place: 'Berghotel Weisshorn, a 2.914 metros',
        intro: 'Segunda-feira, 28 de fevereiro de 1983, depois que escureceu. Tempestade na montanha.\n\nNaquela manhã, o vale mandou um telegrama para o hotel no alto do teleférico. À tarde, cinco hóspedes e o instrutor de esqui estavam debaixo da neve na estação de cima. O hotel diz que nenhum telegrama chegou.',
      },
    },
    docs: {
      lodge_guestBook: { kind: 'note', title: 'O livro de hóspedes', from: 'Berghotel Weisshorn', date: 'Fevereiro de 1983', body:
`26.2.  Fam. Aebi (3)          quarto 4
26.2.  Sr. e Sra. Coulter     quarto 2
27.2.  R. Fankhauser          quarto 1
27.2.  L. Brunner (escola de esqui, funcionário)

Saídas:
Sra. Coulter — 2.3., no trenó do vale.
(Todos os outros nomes acima foram riscados no dia 28.2., com um traço só, limpo, de outra caneta.)` },
      lodge_weather: { kind: 'report', title: 'O caderno do tempo na mesa do escritório', from: 'G. Imhof', date: '28 de fevereiro de 1983', body:
`06.30  Nevando forte desde as 3. Vento NO 60.
07.10  Linha telefônica caída (como sempre).
08.15  O trenó do correio subiu da estação. Correspondência, leite e o pão.
09.20  Teleférico funcionando. Escola de esqui lá em cima às 9.30, como todo dia. Semana lotada, todos os quartos ocupados, a primeira semana lotada desde 1979.

(A linha das 08.15 foi repassada duas vezes a lápis, como se alguém tivesse empacado ali.)` },
      lodge_telegram: { kind: 'telegram', title: 'Um telegrama, queimado nas bordas', from: 'Estação do vale, serviço de avalanches', date: '28.2.83 07.55', body:
`PARA BERGHOTEL WEISSHORN PT
PERIGO DE AVALANCHE 5 PT ENCOSTAS SUPERIORES CARREGADAS PT
FECHAR HOJE PISTAS SUPERIORES E ESTAÇÃO DE CIMA PT
PROIBIDO ESQUIAR ACIMA DO HOTEL PT
CONFIRMAR EM RESPOSTA PT
SERVIÇO DE AVALANCHES

(No verso, numa letra caprichada: “Recebido 8.15. — G.I.” O resto é fuligem. Devia ter queimado. Não queimou.)` },
      lodge_menu: { kind: 'notice', title: 'O cardápio do café da manhã numa mesa', from: 'Berghotel Weisshorn', body:
`SEGUNDA-FEIRA, 28 DE FEVEREIRO
Café — Chá — Chocolate quente
Birchermüesli
Rösti com ovo frito
Pão do vale, manteiga, mel das abelhas do próprio hotel

Hoje à noite: fondue no terraço se o tempo deixar!
A escola de esqui se encontra às 9.30 na estação de cima. O Leo avisa: tragam os óculos.` },
      lodge_postcard: { kind: 'card', title: 'Um cartão-postal no criado-mudo, quarto 1', from: 'Ruth Fankhauser', body:
`(Uma foto do hotel ao sol, com uma cabine do teleférico subindo ao lado.)

Querida Hanni,
Está nevando como se fosse o fim do mundo. Dizem que a descida lá do alto é a melhor do vale, e a gente sobe de manhã, com tempestade ou sem. O Leo, o instrutor, ri de tudo. Estou feliz. Ligo domingo.
R.

(Selado, nunca postado.)` },
      lodge_roomNote: { kind: 'note', title: 'Um bilhete de criança no quarto 4', from: 'Lisa Aebi, 10 anos', body:
`A mamãe disse que se ventar muito a gente pode ficar dentro e jogar cartas com a Sra. Imhof.
A Sra. Imhof disse que aqui em cima o vento não é nada.
Perguntei se a neve pode cair da montanha. Ela disse que esta semana não.` },
      lodge_school: { kind: 'notice', title: 'Lista de inscrição da escola de esqui', from: 'L. Brunner', date: '28.2.83', body:
`ESCOLA DE ESQUI — ESTAÇÃO DE CIMA 9.30
Aebi, Peter
Aebi, Lisa
Aebi, Ursula
Coulter, J.
Fankhauser, R.

Instrutor: Leo Brunner
(Embaixo, a lápis:) A Greta disse que do vale está tudo certo. Ótimo. Vamos lá.` },
      lodge_kitchenNote: { kind: 'note', title: 'Preso perto da câmara fria', from: 'Greta Imhof', date: '28.2.83', body:
`Anton —
Se o vale ligar ou se o trenó trouxer qualquer coisa do serviço de avalanches, vem para MIM, não para os hóspedes e não para o Leo. Eu resolvo.
Uma semana lotada. A gente precisa desta semana.
A chave-mestra do teleférico fica no gancho ao lado da câmara fria. Ninguém pega a não ser eu ou você.
— G.` },
      lodge_inquiry: { kind: 'report', title: 'Do inquérito, um recorte de jornal', from: 'Jornal do vale', date: 'Abril de 1983', body:
`WEISSHORN: HOTELEIRA DIZ QUE NÃO RECEBEU AVISO

A dona do Berghotel Weisshorn, a Sra. Greta Imhof (52), disse ontem à comissão de inquérito que nenhum aviso de avalanche chegou ao hotel em 28 de fevereiro. A linha telefônica estava caída desde as 7 da manhã e “no trenó do correio só subiu o correio”, declarou.

O serviço de avalanches sustenta que um telegrama foi enviado no trenó das 8.15. Nenhuma cópia foi encontrada no hotel.

Cinco hóspedes e o instrutor de esqui Leo Brunner (29) morreram quando as encostas superiores desabaram às 14.40.` },
    },
    items: {
      telegram: { name: 'Telegrama', desc: 'Queimado nas bordas, e ainda legível. Recebido 8.15.' },
      masterKey: { name: 'Chave-mestra', desc: 'Uma chave pesada num chaveiro de madeira: SEILBAHN — MASCHINE.' },
    },
    obj: {
      lodge_start: 'Saia da tempestade',
      lodge_find: 'Descubra o que aconteceu no Weisshorn',
      lodge_telegram: 'Encontre o telegrama que nunca chegou',
      lodge_pin: 'Prenda o telegrama de volta no quadro da recepção',
      lodge_key: 'Pegue a chave-mestra na cozinha',
      lodge_power: 'Ligue o teleférico na casa de máquinas',
      lodge_board: 'Entre na cabine',
    },
    mono: {
      lodge_start: 'Não consigo ver a minha própria mão. Tem uma luz. Um prédio.',
      lodge_inside: 'Quente. Tem uma lareira acesa e ninguém cuidando dela.',
      lodge_cold: 'Estou com muito frio. Preciso entrar.',
      lodge_colder: 'Não sinto os dedos.',
      lodge_warm: 'Quente. Ah, assim é melhor.',
      lodge_frozen: 'Estão nas mesas. Brancos da cabeça aos pés. Faz tempo que ninguém se mexe.',
      lodge_frozenMove: 'O da janela se mexeu. Quando eu cheguei perto do fogo, ele se mexeu.',
      lodge_board: 'Uma tachinha, e o canto rasgado de alguma coisa que ficava pendurada aqui.',
      lodge_book: 'Seis deles riscados no dia vinte e oito. Todos com a mesma caneta, todos de uma vez.',
      lodge_stove: 'Cinza fria. E alguma coisa dentro que não queimou.',
      lodge_telegram: '“Fechar pistas superiores.” Ela estava com isso às oito e quinze. Eles subiram às nove e meia.',
      lodge_pinned: 'Pronto. Onde todo mundo poderia ter lido.',
      lodge_claimed: 'O vento acalmou. Só por um instante. Como se a montanha estivesse escutando.',
      lodge_stationLit: 'Luzes, lá do outro lado da neve. A estação do teleférico.',
      lodge_key: 'A chave-mestra.',
      lodge_cook: 'Tem alguém na cozinha. Um homem grande. Com alguma coisa na mão.',
      lodge_prints: 'Pegadas. Se formando. Agora mesmo, na minha frente.',
      lodge_power: 'Está funcionando. A cabine acendeu.',
      lodge_noKey: 'Precisa de uma chave.',
      lodge_notYet: 'O motor não pega. Não enquanto este lugar ainda estiver me segurando.',
      lodge_boarding: 'Portas. Fechem. Fechem, por favor.',
      lodge_away: 'Estamos andando. Descendo para o nada.',
      lodge_office: 'O escritório dela. A portinhola do fogão está aberta, pendurada.',
      lodge_station: 'A estação. O cabo sai para dentro do branco e simplesmente deixa de existir.',
    },
    lines: {
      lodge_bookPrompt: 'O livro de hóspedes',
      lodge_boardPrompt: 'O quadro de telegramas',
      lodge_boardPin: 'Prender o telegrama',
      lodge_stovePrompt: 'Tirar das cinzas (segurar)',
      lodge_controlPrompt: 'Ligar o teleférico (segurar)',
      lodge_controlLook: 'Painel de controle',
      lodge_gondolaPrompt: 'Entrar na cabine',
      lodge_gondolaLook: 'A cabine',
    },
    radio: {
      lodge_otto1: [
        ['radio', '[vento por cima do chiado]'],
        ['otto', 'Nove para Ada. A senhora está muito alta. Isso é uma tempestade? O Weisshorn, então. Tenho seis pares de esqui na minha prateleira e um jogo de fondue que nunca foi usado.'],
        ['ada', 'Tem gente aqui. Congelada nas mesas.'],
        ['otto', 'Então não fique perto do fogo. Eles vêm atrás do calor. E lá fora, escute os passos que não são os seus.'],
      ],
      lodge_otto2: [
        ['otto', 'Alguma coisa saiu da minha prateleira. Um telegrama. Agora está no lugar certo. Tenho quase certeza de que ouvi esquis.'],
      ],
    },
    recap: {
      lodge: 'O Weisshorn, 28 de fevereiro de 1983. Greta Imhof estava com o aviso de avalanche na mão às oito e quinze, pôs no fogão para a semana lotada não ser cancelada e mandou a escola de esqui subir às nove e meia. Cinco hóspedes e o instrutor morreram na estação de cima; ela disse ao inquérito que nenhum aviso chegou. O telegrama nunca queimou. Prendi onde todo mundo podia ler, e o teleférico me levou para baixo, para fora da tempestade.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
