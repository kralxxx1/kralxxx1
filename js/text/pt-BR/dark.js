/* Português (Brasil) — Nível 6: Luzes apagadas (Toby). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      dark: {
        name: 'LEVEL 6', title: 'Luzes apagadas', place: 'A lembrança do Toby — o escuro',
        intro: 'As mesmas salas amarelas, com todas as luzes mortas. O escuro aqui é tão grosso que dá para se encostar nele.\n\nO Toby teve medo do escuro a vida inteira. Aqui dentro, o escuro não tem medo de nada. Em algum lugar dele, alguma coisa está se esforçando muito para não rir.',
      },
    },
    docs: {
      dark_intro: { kind: 'note', title: 'Em cima de um gerador', from: 'Eddie', body:
`Três geradores. Tem galão de diesel espalhado por todo canto.

Aqui o escuro tem dentes. Eu chamo eles de Sorridentes. A luz faz eles sumirem. Lanterna, bastão luminoso, qualquer coisa.

O âmbar… mantenha a luz nele. Não dê as costas para ele por muito tempo.

—E.` },
      dark_diary1: { kind: 'diary', title: 'Uma folha de caderno da escola', from: 'Toby', date: '15 de abril de 1987', body:
`Amanhã é a Operação 256!!!

O Danny disse que eu sou o responsável pela lanterna. A Rosie fez uma fita. A Nell fez um mapa dos caminhos das Assombrações e ficou muito bom mesmo.

Hoje eu sentei em cima do walkman de Sam. Fez crec. Sam ainda não sabe. Vou dar para Sam a minha mesada de março E de abril.

O Danny diz que a Assombração âmbar da nº 7 sou eu porque é a medrosa. O Walt diz que é a esperta. De qualquer jeito é a MINHA Assombração.` },
      dark_diary2: { kind: 'diary', title: 'A última página', from: 'Toby', date: '17 de abril de 1987, 0h50 — no fliperama', body:
`Escrito na luz do isqueiro. O Danny apagou as luzes dos fundos pra dar medo. Deu certo.

Sam foi pra casa às 21h40. Sam disse: “Tá bom. Então some.” Eu não respondi nada. Chorei na sala dos fundos, onde ninguém podia ver.

Aí à 0h40 alguém bateu na porta dos fundos e era SAM. Pingando de chuva.

SAM VOLTOU!!! Sam sempre volta.

Eu pedi desculpa primeiro. Quer dizer que eu ganhei.

Fase 212. O Danny diz que 256 até as três. As cinco mãos. Ninguém solta.` },
      dark_grandpa: { kind: 'card', title: 'Um cartãozinho numa caixa de isqueiro', from: 'O avô do Toby', date: '1985', body:
`Toby —

Sua avó me deu isto em 1951 para eu achar o caminho de casa depois do turno da noite.

Agora é seu. Você nunca vai precisar ficar no escuro.

—Vovô` },
      dark_grinners: { kind: 'note', title: 'Letra tremida', from: 'Eddie', body:
`Os Sorridentes não são gente. Não são nem Assombrações.

Acho que são a ideia que o jogo faz do que existe no escuro. A ideia do Toby. O que um menino de treze anos acha que mora debaixo da cama.

Quebre um bastão luminoso, conte até três, e eles somem.

Eu não durmo muito nesta fase.` },
      dark_walt6: { kind: 'diary', title: 'O diário do Walt, letra apertada', from: 'Walt', date: 'Lá dentro', body:
`Não lembro do meu nome. Começa com W.

Lembro da letra de uma menininha. Letras redondas. Ela desenhou uma coisa laranja com chifres e escreveu PAPAI embaixo.

Lembro do gosto de moeda.

O âmbar também não olha para mim. Ninguém olha mais para mim.

COMA, diz o tabuleiro. COMA.` },
      dark_wall: { kind: 'wall', title: 'Escrito na parede com fuligem de isqueiro', body:
`NÃO OLHA PRA MIM

DESCULPA SAM` },
      dark_porch: { kind: 'note', title: 'Um bilhete colado numa porta de tela', from: 'Maggie, mãe do Toby', date: 'Abril de 1987', body:
`Toby —

A luz da varanda fica acesa até você chegar em casa.

Beijos, mamãe` },
      dark_tape: { kind: 'tape', title: 'Fita: “A piada do Toby”', from: 'O gravador da Rosie', date: '16 de abril de 1987, 23h58', body:
`[Clique. A sala dos fundos do fliperama. As luzes estão apagadas. Um isqueiro estala.]

TOBY: Tá, tá. Por que o Muncher atravessou a rua?

DANNY: Porque as Assombrações estavam deste lado.

TOBY: Não! Porque a rua tinha ESTRELAS!

[Silêncio. Aí a Nell solta uma bufada, depois a Rosie, depois todo mundo está rindo muito mais do que a piada merece.]

TOBY: [ainda rindo] Sam devia estar aqui. Sam sempre ri dessa.

[As risadas vão sumindo.]

ROSIE: …Sam vem, Toby.

[Clique.]` },
    },
    obj: {
      dark_generators: 'Ligue os geradores ({n}/3)',
      dark_leave: 'Chegue ao elevador de serviço',
    },
    mono: {
      dark_start: 'Não enxergo nada. A lanterna… não sei se é suficiente.',
      dark_tobySeen: 'Alguma coisa âmbar no canto. Um lençol com a barra queimada. Não se mexe. Não enquanto eu olho.',
      dark_grinner: 'Um sorriso no escuro. Só dentes.',
      dark_gen: 'O gerador acorda tossindo. Luz.',
      dark_lighter: 'O isqueiro dele. Uma vez, em 1986, ele me deixou segurar. Depois de dez segundos pediu de volta.',
      dark_diary2: 'Sam voltou. …Não. Não. Eu fui pra casa. Às 21h40 eu fui pra casa.',
    },
    lines: {
      dark_gen: 'Coloque o diesel e dê a partida (segurar)',
      dark_genEmpty: 'Gerador (sem diesel)',
      dark_needFuel: 'Primeiro é preciso achar um galão de diesel.',
      dark_tankEmpty: 'O tanque do gerador está vazio.',
    },
    radio: {
      dark_start: [
        ['eddie', 'Eu odeio esta. Odeio demais. Fica na luz, Sam. Estou falando sério.'],
      ],
      dark_toby: [
        ['eddie', 'Âmbar… é o Toby. Ele não vem para cima de você enquanto você olha para ele. Quando ficava com medo, ele nunca conseguia olhar ninguém nos olhos.'],
        ['sam', 'Nos meus olhos ele olhava. O tempo todo.'],
        ['eddie', '…É. Acho que olhava.'],
      ],
      dark_lighter: [
        ['eddie', 'O isqueiro do avô dele. Ele não deixava ninguém encostar. Nem o Danny.'],
      ],
      dark_freed: [
        ['eddie', '…Ele é só uma criança, Sam. São todos só crianças.'],
        ['eddie', 'Que tipo de jogo faz isso com crianças?'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
