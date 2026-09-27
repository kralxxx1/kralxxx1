/* Português (Brasil) — Fase 255 (A casa) e fase 256 (Tela da morte). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: 'A casa', place: 'O próprio jogo',
        intro: 'Hungry House, por dentro. Paredes que brilham nas emendas como uma tela, estrelas flutuando na altura do quadril e, no meio, a casa das Assombrações, com a porta mantida fechada por quatro lampiões.\n\nVocê conhece este tabuleiro melhor do que o seu próprio quarto. Já jogou dez mil vezes. Ele estava esperando você jogar mais uma vez.',
      },
      killscreen: {
        name: 'LEVEL 256', title: 'Tela da morte', place: 'A metade que ninguém devia ver',
        intro: 'A metade esquerda do tabuleiro é a casa que você conhece. A metade direita são letras, números e cores que se soltaram e ficaram penduradas no ar.\n\nEm algum lugar no núcleo, alguma coisa ainda está ligada na tomada.',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: 'Letras brilhantes na parede do labirinto', from: 'W.', body:
`SE VOCÊ CONSEGUE LER ISTO,
VOCÊ ESTÁ NO MEU JOGO.
DESCULPE.
COMA AS ESTRELAS.
NÃO MACHUQUE AS ASSOMBRAÇÕES.
—W.` },
      maze_rules: { kind: 'wall', title: 'Uma placa, fria como pedra', body:
`REGRAS DA CASA

1. O Jogador come.
2. As Assombrações perseguem.
3. O tabuleiro é limpo.
4. O próximo tabuleiro começa.
5. Não existe regra cinco.` },
      maze_house: { kind: 'note', title: 'Na porta da casa das Assombrações', from: 'Eddie', body:
`Quatro lampiões mantêm a cortina fechada. Um em cada canto.

A casa é o caminho pra baixo. O último caminho pra baixo.

A gente se vê do outro lado. —E.` },
      maze_fruit: { kind: 'memory', title: 'A bala — uma lembrança', body:
`Na primeira vez que a Lily pegou o prêmio da bala, ela gritou tão alto que o Walt derrubou o café.

“Papai! A BALA! Eu peguei a BALA!”

Depois disso, todo sábado ele colocava uma moeda pra ela e ficava atrás dela a partida inteira, sem nunca dizer pra onde ela devia ir.` },
      ks_glitch1: { kind: 'wall', title: 'Caracteres quebrados pendurados no ar', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: 'Um arquivo de salvamento corrompido', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: 'A última carta do Walt', from: 'W. (acho que esse é o meu nome)', date: 'Um dia que não dava pra contar', body:
`Pra quem chegar ao núcleo.

A tomada está aqui. Puxada de dentro, não é assassinato, é um fim. GAME OVER. Todos que ainda são eles mesmos voltam pra casa.

Mas ela não se mexe com um par de mãos só. O jogo começou com cinco mãos no controle. Termina com cinco. E os quatro precisam lembrar quem são, ou as mãos deles são só luz.

Eu tentei sozinho, na minha primeira noite aqui dentro. O jogo entendeu como uma jogada e me fez o Jogador dele. É isso que eu sou agora.

Uma mão soltou às 3h16. Desde então, o jogo espera por essa mão.

Diga à Nora que eu sinto muito. Diga à Ruth que ela tinha razão. Diga à tabela pra guardar a pontuação da Lily.

—W.` },
      ks_eddie: { kind: 'note', title: 'Um bilhete preso ao lado do EXIT', from: 'Eddie', body:
`Um entra, um sai.

Achei esta porta na primeira semana. Lá fora faz um ano e meio. Aqui dentro pareceu uma noite só, muito longa.

Desculpa, Sam.` },
    },
    obj: {
      maze_pellets: 'Pegue os lampiões dos quatro cantos ({n}/4)',
      maze_house: 'Entre na casa das Assombrações',
      ks_core: 'Chegue ao núcleo no lado quebrado',
      ks_choice: 'Escolha: a porta EXIT ou a tomada',
    },
    mono: {
      maze_start: 'Isto é… o próprio jogo. Eu estou dentro dele.',
      maze_rules: 'Quem come as estrelas? Eu.',
      maze_house: 'A cortina caiu. Tem uma porta dentro da casa.',
      ks_start: 'O lado direito está… quebrado. Letras penduradas no ar.',
      ks_core: 'O núcleo. Tem uma tomada enorme aqui. A tomada da máquina. Vista de dentro.',
      ks_exit: 'EXIT. Um de verdade, desta vez. Sinto o vento.',
      ks_plugTry: 'Não se mexe. Não com duas mãos. Precisa de cinco.',
      ks_plugReady: 'Quatro luzes coloridas vêm pro meu lado. Vermelha, violeta, turquesa, âmbar.',
    },
    lines: {
      maze_portal: 'Descer para a fase que não dá pra contar',
      maze_fruitTake: 'Pegar a bala',
      ks_plug: 'PUXAR A TOMADA',
      ks_plugTry: 'Tentar puxar a tomada',
      ks_exitGo: 'Passar pelo EXIT',
      ks_exitHold: 'Segurar a porta para o Eddie',
      ks_missing: '(Faltam: {names})',
    },
    radio: {
      maze_start: [
        ['eddie', 'É isso. Fase duzentos e cinquenta e cinco. O último tabuleiro antes do quebrado.'],
        ['eddie', 'Pega os cantos. Vou estar esperando lá embaixo.'],
      ],
      ks_start: [
        ['eddie', 'Sam. Estou aqui. Não no rádio. Aqui. Perto da porta da direita.'],
        ['eddie', 'Vem me achar. Por favor.'],
      ],
      ks_plea: [
        ['eddie', 'Esse é o de verdade. Vento, chuva, Front Street. Casa.'],
        ['eddie', 'Ele deixa um sair e fica com um. Achei na minha primeira semana. Desde então estou aqui do lado.'],
        ['sam', 'Você ia me deixar abrir e passar você mesmo.'],
        ['eddie', 'A Hope tem quinze meses, Sam. Eu nunca peguei ela no colo. [A voz dele falha.] Não estou pedindo que você me perdoe. Estou pedindo que você segure a porta.'],
      ],
      ks_pleaTrust: [
        ['eddie', 'Esse é o de verdade. Vento, chuva, Front Street. Casa.'],
        ['eddie', 'Eu te disse no motel que não ia pedir. Então não estou pedindo.'],
        ['sam', 'Mas você quer.'],
        ['eddie', 'Cada segundo. [Uma respiração longa.] Vai primeiro ao núcleo, Sam. Se existir outro jeito, é lá. Se não existir… eu ainda vou estar aqui.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
