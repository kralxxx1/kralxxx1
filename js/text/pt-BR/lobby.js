/* Português (Brasil) — Nível 0: modo de demonstração. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      lobby: {
        name: 'LEVEL 0', title: 'Modo de demonstração', place: 'Dentro da tela',
        intro: 'Um zumbido que dá para sentir nos dentes. Carpete molhado. Paredes amarelas que nunca acabam. Lá longe, um som que você ouviu dez mil vezes pelo alto-falante de uma máquina: a sirene das Assombrações, subindo e descendo.\n\nO jogo estava esperando um jogador. Agora tem um.',
      },
    },
    docs: {
      lobby_rules: { kind: 'note', title: 'Papel colado na parede', from: 'Eddie', body:
`SE VOCÊ ESTÁ LENDO ISTO:

1. Não corra, a não ser que ele já tenha te visto. Correr faz barulho.
2. As placas de EXIT mentem. Levam mais para dentro, não para fora.
3. Quando as luzes piscarem, saia do corredor.
4. Os lampiões são de verdade. Pegue um e tudo foge de VOCÊ. Por um tempinho.
5. Star Pop (o refrigerante de cereja) acaba com a tremedeira. Não me pergunte por quê.
6. Tem um walkie-talkie no meu acampamento. Canal 7.

—Eddie` },
      lobby_camp: { kind: 'diary', title: 'O diário de acampamento do Eddie', from: 'Eddie', date: '12 de junho de 1993 (?)', body:
`Acampamento 1.

Atravessei a tela às 23h40. Caí de cara. O carpete está encharcado, mas nada está vazando. Aqui nada vaza nunca.

Nem sinal do Walt. Achei a lanterna dele, e a letra dele numa parede.

Os walkie-talkies funcionam no canal 7. Ninguém responde. Vou deixar um aqui para o próximo idiota que seguir um adulto para dentro de um videogame.

Se for você: oi. Foi mal. Canal 7.` },
      lobby_walt1: { kind: 'diary', title: 'Uma página do diário do Walt', from: 'Walt', date: 'Lá dentro, dia 1', body:
`Dia 1.

Amarelo. Zumbe como um reator com defeito. O carpete está molhado.

Ouço a sirene lá longe, a que toca quando as Assombrações saem de casa.

Eles estão aqui. Eu estava certo. Deus me ajude, eu estava certo.

Danny. Rosie. Nell. Toby. Aguentem firme. Estou chegando.` },
      lobby_walt2: { kind: 'diary', title: 'Outra página do diário do Walt', from: 'Walt', date: 'Lá dentro, dia 9 (?)', body:
`Dia 9. Ou 90.

Estou com fome o tempo todo. Tem latas de Star Pop por toda parte, o suficiente para encher a minha própria caixa térmica. Bebi todas. Não lembro de ter decidido isso.

Os lampiões têm gosto de moeda. Depois que engulo um, enxergo mais longe.

Tentei a tomada na primeira noite. Sozinho. Alguma coisa dentro de mim fez clique, como uma moeda caindo.

Vi o vermelho hoje. Ele fugiu de mim. Chamei o nome dele e ele parou, por um segundo.

Agora eu entendo. O da boca sou eu.` },
      lobby_flyer: { kind: 'flyer', title: 'Um panfleto dobrado', from: 'Rosie', date: 'Abril de 1987', body:
`★ ULTRASSECRETO ★
OPERAÇÃO 256

QUANDO: quinta 4/16, depois de fechar
MISSÃO: ver o que tem depois da kill screen

EQUIPE:
Danny — a chave (NÃO conta para o Walt)
Rosie — o plano + os lanches
Nell — o mapa dos caminhos das Assombrações
Toby — a lanterna
Sam — a sorte

OS CINCO OU NINGUÉM.
DESTRUIR DEPOIS DE LER!!!
(Toby, isso quer dizer não guarda dentro do seu gibi.)` },
      lobby_exitwall: { kind: 'wall', title: 'Riscado ao lado da porta EXIT', body:
`OS EXITS MENTEM
—E.` },
      lobby_chairs: { kind: 'wall', title: 'Escrito acima das cadeiras', body:
`AS CADEIRAS JÁ ESTAVAM
VIRADAS PARA A PAREDE
QUANDO EU CHEGUEI
—W.` },
      lobby_puddle: { kind: 'note', title: 'Um bilhete úmido perto da poça', from: 'Walt', body:
`A água aqui é morna e tem cheiro de cloro. Como a piscina municipal.

A Nell não chegava perto da piscina depois de 85. Isto aqui é dela?

Cada cômodo aqui dentro é de alguém.` },
      lobby_lily2: { kind: 'drawing', drawing: 2, title: 'Um desenho enfiado atrás de uma grade de ventilação', from: 'Lily, 9 anos', body:
`Giz de cera. Um homem grande de bigode e uma menininha de tranças laranja ao lado de uma maquininha de fliperama. Na tela: uma criatura redonda e laranja e o número 3190. A menina está com os dois braços para cima.

EU E O PAPAI E A MAQUININHA.
EU FIS 3190 PONTOS!!!
O PAPAI DIS QUE VAI FICAR NA TABELA PRA SEMPRE.` },
      lobby_tape: { kind: 'tape', title: 'Fita: “Testando, testando”', from: 'Eddie', date: 'Lá dentro', body:
`[Clique. Respiração pesada. O zumbido.]

EDDIE: Testando, testando. Diário gravado, dia… sei lá. Dia alguma coisa.

EDDIE: Se for a June: estou bem. Tudo bem mesmo. Acho o Walt, levo as crianças, chego em casa antes do bebê. Eu prometi, e eu cumpro as minhas promessas. Quase sempre.

[Pausa.]

EDDIE: Se não for a June: canal sete. Não corre. E, faça o que fizer, não deixa ele ouvir você comer.

[Clique.]` },
    },
    obj: {
      lobby_explore: 'Encontre uma saída',
      lobby_pellets: 'Encontre os lampiões ({n}/4)',
      lobby_insert: 'Encaixe os lampiões no painel ao lado do EXIT',
      lobby_leave: 'Atravesse a porta',
    },
    mono: {
      lobby_start: 'Onde… O carpete está molhado. O zumbido está dentro da minha cabeça.',
      lobby_exitSeen: 'EXIT. Quatro encaixes redondos ao lado da porta. Do tamanho de um lampião.',
      lobby_firstPellet: 'Um lampião. Quente na mão. Por um segundo tudo ficou azul e saiu correndo.',
      lobby_eaterHeard: 'Mastigando. Em algum lugar atrás das paredes, alguma coisa está mastigando.',
      lobby_eaterSeen: 'Uma coisa pálida no fim do corredor. Redonda. Grande demais para o corredor. Está mastigando.',
      lobby_allPellets: 'Quatro lampiões. Agora a porta.',
      lobby_radio: 'Um walkie-talkie. Alguém prendeu o botão no canal 7 com fita adesiva.',
    },
    lines: {
      lobby_slots: 'Quatro encaixes ({n}/4 lampiões)',
      lobby_place: 'Encaixar os lampiões',
      lobby_radioTake: 'Pegar o walkie-talkie',
    },
    radio: {
      lobby_meet: [
        ['radio', '[chiado]'],
        ['eddie', '…alô? ALÔ? Tem alguém no sete? Fala alguma coisa!'],
        ['sam', '…Alô? Quem está falando? Onde eu estou?'],
        ['eddie', 'Ah, graças a Deus. Uma pessoa. Tá. Tá bom. Meu nome é Eddie. Eu trabalhava no Starlight. Você entrou pela sete, né?'],
        ['sam', 'Eddie? O Eddie do Walt? Você sumiu faz um ano e meio. Sua mulher colou a sua foto em todos os postes de Harlow.'],
        ['eddie', 'Um ano e meio. Parece uma noite. Então o bebê já… [chiado] Não. Agora não. Qual é o seu nome?'],
        ['sam', 'Sam. Sam Keller.'],
        ['eddie', '…Sam, da turma do Toby? Sempre de bicicleta? Hm. É por isso.'],
        ['sam', 'Por isso o quê?'],
        ['eddie', 'Quando você entrou, o lugar inteiro falou. PLAYER ONE. Eu ouvi aqui de baixo como num estádio. Para mim nunca falou isso. Para mim falou INSERT COIN.'],
        ['eddie', 'Regras. Não corre, a não ser que alguma coisa te veja. As placas de EXIT mentem. Se as luzes piscarem, sai do corredor. A porta para sair daqui quer quatro lampiões. Acha eles. E, Sam? Fica no sete.'],
      ],
      lobby_pellet1: [
        ['eddie', 'Você acabou de pegar um lampião? Ah, não. Tá. Ele ouviu. Sempre acorda alguma coisa quando a gente pega um.'],
        ['eddie', 'As curvas, Sam. Ele é rápido na reta e lento nas curvas.'],
      ],
      lobby_eater: [
        ['eddie', 'Você viu ele. Não fica olhando muito tempo. Eu chamo de Devorador.'],
        ['sam', 'O que é aquilo?'],
        ['eddie', 'É o Jogador. Todo jogo precisa de um. Esse aí era… [chiado] Só faz as curvas.'],
      ],
      lobby_panel: [
        ['eddie', 'Quatro encaixes. Tudo aqui dentro é o jogo, Sam. Limpa o tabuleiro e a porta abre.'],
      ],
      lobby_open: [
        ['eddie', 'Essa porta não é uma saída. Os EXITS mentem. Mas é o caminho para baixo, e é lá embaixo que eles estão.'],
        ['sam', 'Quem?'],
        ['eddie', 'Você sabe quem. Quatro crianças de abril de 87. Vai. Estou no sete.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
