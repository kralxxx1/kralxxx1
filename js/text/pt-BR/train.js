/* Português (Brasil) — Capítulo 7: Última parada (o Nordlys Express). Bíblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      train: {
        name: 'CAPÍTULO 7', title: 'Última parada', place: 'Estação de Brenna, na linha norte',
        intro: 'Quarta-feira, 19 de dezembro de 1990, 23h40.\n\nO trem-leito noturno para Nordvik está parado na plataforma com todas as janelas acesas. Ninguém sobe. Ninguém desce. Uma porta está aberta.',
      },
    },
    docs: {
      train_route: { kind: 'notice', title: 'O horário ao lado da porta da plataforma', from: 'Linhas do Norte', date: 'Horário de inverno 1990–91', body:
`NORDLYS EXPRESS — trem-leito noturno, diário
Halvard part. 21.10
Ostra 22.25
Brenna 23.40
Kvitfjell (parada a pedido)* 00.50
Nordvik cheg. 06.15

* Os trens só param em Kvitfjell se um passageiro avisar o condutor antes de Brenna, ou se houver um passageiro esperando na plataforma. No inverno a parada não tem funcionários nem iluminação.` },
      train_notice: { kind: 'notice', title: 'Um aviso na sala de espera', from: 'Linhas do Norte, escritório regional de tráfego', date: '1º de dezembro de 1990', body:
`AS PASSAGENS DEVEM SER COMPRADAS ANTES DO EMBARQUE.

Não há venda de passagens nos trens noturnos. O passageiro que não puder apresentar uma passagem válida ao condutor deverá deixar o trem na parada seguinte.

Obrigado por viajar com as Linhas do Norte.

(Alguém escreveu embaixo, a caneta: “até em Kvitfjell?”, e outra pessoa: “PRINCIPALMENTE em Kvitfjell”)` },
      train_menu: { kind: 'note', title: 'O cardápio do vagão-restaurante', from: 'Vagão-restaurante do Nordlys Express', date: '19.12.90', body:
`Sopa de peixe com pão — 48
Ensopado de rena, mirtilo-vermelho, batatas — 95
Waffles com geleia e creme azedo — 32
Café — 12   Chocolate — 14

O vagão-restaurante fecha às 23h. Depois das 23h, os passageiros dos vagões-leito são atendidos mediante apresentação da passagem do leito.

(A marca de uma xícara. Embaixo do cardápio, a lápis: “Mesa perto da copa: chocolate, leito 24, pago em dinheiro.”)` },
      train_waiter: { kind: 'note', title: 'Um bloco de pedidos perto da copa', from: 'R. Moe, garçom', date: '19.12.90', body:
`23.55  Leito 24 (vagão 2) — mocinha, sozinha — chocolate, waffles.
       Vagão fechado, mas ela me mostrou a passagem do leito, então.
       Indo para casa em Nordvik passar o Natal. Primeira vez sozinha no trem.
       Guardou a passagem de volta no bolso do casaco. Falei para não perder.

00.30  O sr. Saether passa na ronda. Neve nos trilhos
       desde Ostra, e ele está descontando em todo mundo.` },
      train_paper: { kind: 'clipping', title: 'Um jornal esquecido numa mesa', from: 'Nordvik Tidende', date: 'Sábado, 22 de dezembro de 1990', body:
`MENINA DE 15 ANOS DESAPARECIDA DESDE QUARTA-FEIRA

Lina Berg, 15 anos, de Nordvik, não é vista desde que embarcou no Nordlys Express em Halvard na quarta-feira à noite para vir passar o Natal em casa.

Ela não chegou. As Linhas do Norte afirmam que nenhum passageiro deixou o trem entre Brenna e Nordvik, e que o leito dela foi encontrado vazio quando o trem chegou.

Desde então neva todos os dias em toda a região. A polícia pede que quem viajou no trem se apresente.` },
      train_lina: { kind: 'letter', title: 'Uma carta na mesinha do leito 24', from: 'Lina', date: '19.12.90, no trem', body:
`Querida mamãe,

Estou no trem!!! Comprei a passagem sozinha com o dinheiro dos sábados no café, o caminho todo, com cama. É do tamanho de um armário. Fiquei com o beliche de baixo e não tem ninguém no de cima, então pus o meu casaco lá e parece uma pessoa.

A gente chega às seis e quinze. Não venham à estação no escuro, eu sei o caminho. Chego em casa a tempo do café da manhã. Diz para o Jonas que ele não vai ficar com o meu quarto.

Vou te entregar esta carta eu mesma, para não precisar de selo.

Lina` },
      train_saether: { kind: 'report', title: 'Um relatório de serviço, dobrado na cabine do condutor', from: 'E. Saether, condutor', date: '19/20.12.90', body:
`Nordlys Express, Halvard–Nordvik. Condutor: E. Saether.

21.10 Part. Halvard. 61 passageiros.
23.40 Brenna. 4 desembarques, 0 embarques.
00.40 Verificação de passagens, vagão 2: leito 24, passageira, aprox. 17–18 anos, não apresentou passagem. Alega ter comprado uma. Casaco e bolsa revistados na presença dela. Sem passagem.
00.50 Kvitfjell. Passageira sem passagem desembarcada conforme o regulamento.
06.15 Cheg. Nordvik. Nada mais a relatar.

(As linhas das 00.40 e das 00.50 foram repassadas com outra tinta, com muito cuidado, até ficarem quase ilegíveis.)` },
      train_inquiry: { kind: 'report', title: 'Um depoimento na mesa do condutor', from: 'Inquérito das Linhas do Norte: depoimento de E. Saether', date: '4 de janeiro de 1991', body:
`Eu era o condutor do Nordlys Express na noite de 19 de dezembro.

Não me lembro de nenhuma moça viajando sozinha. Verifiquei todas as passagens do trem, como sempre. Ninguém precisou ser desembarcado.

O trem não parou em Kvitfjell. Nenhum passageiro tinha pedido, e a parada estava fechada por causa da neve.

Trabalho na ferrovia há vinte e seis anos.

E. Saether` },
      train_docket: { kind: 'note', title: 'Uma ficha de achados e perdidos amarrada num malote', from: 'Depósito 9, estação central de Halvard — Achados e perdidos', date: 'Janeiro de 1991', body:
`Nº 97 / 1991
Uma passagem de trem, só ida, Halvard–Nordvik, leito, vagão 2 leito 24, 19.12.90. Não picotada.
Encontrada: Nordlys Express, vagão 2, debaixo do beliche de baixo, pela equipe de limpeza em Nordvik, 20.12.90.
Recebida no Depósito 9: 7.1.91.
Funcionária: A. Lind
Situação: NÃO RETIRADA` },
      train_cabLog: { kind: 'report', title: 'O diário do maquinista na cabine', from: 'Maquinista K. Aune', date: '19/20.12.90', body:
`00.47  Campainha do condutor: parar em Kvitfjell.
00.50  Parado em Kvitfjell. Parada sem luz, plataforma debaixo de neve. Neve forte.
00.51  Um passageiro desembarcou, no fim do vagão 2. Partida liberada pelo condutor.
00.52  Partida.

(A página foi arrancada do caderno e posta de volta, solta.)` },
      wren7: { kind: 'drawing', drawing: 7, title: 'Um desenho num travesseiro do vagão 3', from: 'Wren, 7 anos', body:
`Giz de cera em papel quadriculado. Um trem azul comprido no escuro, com todas as janelas acesas de amarelo, indo embora para a direita. Atrás, na neve, uma menina de gorro vermelho parada ao lado de um poste de luz, com os braços caídos. Em cima dela, o passarinho vermelho.

Embaixo:
ELA TINHA SIM` },
    },
    items: {
      ticket: { name: 'Passagem de trem', desc: 'Só ida, Halvard–Nordvik, 19.12.90, já picotada uma vez. De outra pessoa. Tinha sido deixada numa mesa, debaixo de um pires.' },
      linaTicket: { name: 'A passagem de Lina', desc: 'Só ida, Halvard–Nordvik, leito, vagão 2 leito 24, 19.12.90. Não picotada. Ela mesma tinha comprado.' },
    },
    obj: {
      train_start: 'Entre no trem',
      train_ticket: 'Encontre uma passagem antes que o condutor encontre você',
      train_who: 'Descubra quem foi desembarcado em Kvitfjell',
      train_lina: 'Encontre a passagem de Lina no leito 24',
      train_punch: 'Faça picotar a passagem dela',
      train_brake: 'Pare o trem em Kvitfjell: o freio de emergência fica na cabine do maquinista',
    },
    mono: {
      train_start: 'Um trem. Todas as janelas acesas e nem uma alma na plataforma.',
      train_board: 'Entrei. A porta fechou atrás de mim.',
      train_moving: 'Estamos andando.',
      train_conductor: 'Alguém com uma lanterna vindo pelo corredor.',
      train_sleeper: 'Tem alguém dormindo ali dentro, virado para a porta. Devagar, Ada.',
      train_gangway: 'Tem alguma coisa debaixo das chapas. Não fique aqui.',
      train_ticket: 'Uma passagem. Não é minha. Vai ter que servir.',
      train_check: 'Ele quer a minha passagem.',
      train_punched: 'Clique. Ele segue em frente. Nem olhou no meu rosto.',
      train_letter: 'Lina. Quinze anos. Em casa para o café da manhã.',
      train_report: 'Leito 24. “Alega ter comprado uma.” Kvitfjell, dez para a uma da madrugada, na neve.',
      train_found: 'Debaixo do beliche. Onde ela disse.',
      train_turn: 'A lanterna parou. Ele se virou.',
      train_docket: 'A. Lind. Essa é a minha letra. Minha segunda semana. Arquivei e nunca perguntei de quem era.',
      train_punchIt: 'O picotador dele. A passagem dela.',
      train_claimed: 'Picotada. Válida. Ela tinha o direito de estar neste trem.',
      train_sat: 'Ele se sentou. Tirou o quepe.',
      train_kvitfjell: '“Kvitfjell.” Não estamos diminuindo.',
      train_passed: 'Lá se vai. Um poste de luz na neve. Não paramos.',
      train_again: 'Próxima parada, Kvitfjell. De novo. Fica dando voltas.',
      train_brake: 'Segure em alguma coisa.',
      train_brakeWait: 'O freio de emergência. Ainda não. Não antes de ela ter a passagem dela.',
      train_punchWait: 'O picotador do condutor. Não é a minha passagem que precisa dele.',
      train_stopped: 'Kvitfjell.',
      train_out: 'Um poste de luz e a neve. Foi aqui que ele a deixou. Ela deve ter ficado bem aqui, vendo as janelas irem embora.',
    },
    lines: {
      train_boardPrompt: 'Entrar no trem',
      train_punchPrompt: 'Picotar a passagem de Lina',
      train_punchLook: 'O picotador do condutor',
      train_brakePrompt: 'Puxar o freio de emergência (segurar)',
      train_brakeLook: 'O freio de emergência',
      pa_kvitfjell: '“Kvitfjell. Kvitfjell. Parada a pedido.”',
    },
    radio: {
      train_otto1: [
        ['radio', '[as rodas, por baixo do chiado]'],
        ['otto', 'Nove para Ada. Esse barulho. A senhora está num trem. Gostaria que me dissesse que tem passagem.'],
        ['ada', 'Não tenho.'],
        ['otto', 'Então encontre uma antes que o condutor encontre a senhora. Na minha prateleira, os condutores são os piores. São muito educados e não param.'],
      ],
      train_otto2: [
        ['otto', 'Ada. Uma ficha acabou de chegar sozinha pelo tubo. Uma passagem de trem, não retirada. Na sua letra. Então a senhora já enchia as minhas prateleiras muito antes de descer até elas.'],
      ],
      train_otto3: [
        ['otto', 'Ficou tudo quieto aí do seu lado. Isso é ou muito bom ou muito ruim. Se o trem ainda estiver andando, pare. Trens assim não chegam. Só dão voltas.'],
      ],
    },
    recap: {
      train: 'Nordlys Express, 19 de dezembro de 1990. O condutor Edvin Saether tirou Lina Berg, de quinze anos, do trem noturno na parada de Kvitfjell, na neve, porque ela não achava a passagem. Ela mesma tinha comprado; estava debaixo do beliche. Ele disse ao inquérito que ninguém foi desembarcado. A equipe de limpeza achou a passagem em Nordvik e mandou para o Depósito 9, e eu arquivei sem nunca perguntar de quem era. Fiz picotar a passagem e parei o trem onde ela desceu.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
