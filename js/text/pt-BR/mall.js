/* Português (Brasil) — Nível 7: Harlow Mall (13 de dezembro de 1986, o dia mais feliz). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      mall: {
        name: 'LEVEL 7', title: 'Harlow Mall', place: 'A lembrança de todos — sábado, 13 de dezembro de 1986',
        intro: 'O melhor sábado de 1986. Cinco crianças, vinte dólares entre todas, uma árvore de Natal de três andares.\n\nO shopping está fechado agora. Os manequins chegaram mais perto do vidro. Eles só se mexem quando ninguém está olhando.',
      },
    },
    items: {
      frame: { name: 'Foto da cabine', desc: 'Um quadrinho de uma tira de cabine de fotos, recortado. A cabine quer todos juntos de novo.' },
      frame1: { name: 'Foto da cabine', doc: 'mall_frame1' },
      frame2: { name: 'Foto da cabine', doc: 'mall_frame2' },
      frame3: { name: 'Foto da cabine', doc: 'mall_frame3' },
      frame4: { name: 'Foto da cabine', doc: 'mall_frame4' },
    },
    docs: {
      mall_intro: { kind: 'note', title: 'No verso de um mapa do shopping', from: 'Eddie', body:
`A cabine de fotos perto da praça de alimentação está quebrada. Ela quer as fotos de volta.

Quatro fotos de uma tira estão espalhadas pelas lojas. Ache todas, coloque na cabine e as portas abrem.

Os manequins. Não tire os olhos deles. Estou falando literalmente. Eles não se mexem enquanto você olha.

Este é o lugar mais feliz do jogo inteiro, e é o que eu mais odeio.

—E.` },
      mall_directory: { kind: 'note', title: 'Mapa do shopping, com o “VOCÊ ESTÁ AQUI” apagado de tanto dedo', from: 'Harlow Mall', date: '1986', body:
`PISO 1
Spins Records ......... Música, fitas, fitas virgens
Comic Vault ........... Gibis, cards, jogos
Toy Parade ............ Brinquedos para todas as idades
Cabine de fotos ....... 4 poses 1 $
Praça de alimentação .. Sunny Orange, Nonna’s Pizza, Pretzel Barn
Starlight Jr. ......... Quiosque de minifliperama (perto da fonte)

Aberto até as 21h até a véspera de Natal!` },
      mall_frame1: { kind: 'photo', photo: 'frame', title: 'Foto da cabine nº 1', from: 'Cabine de fotos', date: '13 dez. 1986', body:
`Danny e Rosie. O Danny finge que está entediado. A Rosie finge que é DJ e fala num pretzel como se fosse um microfone.` },
      mall_frame2: { kind: 'photo', photo: 'frame', title: 'Foto da cabine nº 2', from: 'Cabine de fotos', date: '13 dez. 1986', body:
`Nell e Toby. A Nell está sorrindo de verdade, um sorriso de verdade, e parece surpresa com isso. O Toby colocou um gorro de Papai Noel nela.` },
      mall_frame3: { kind: 'photo', photo: 'frame', title: 'Foto da cabine nº 3', from: 'Cabine de fotos', date: '13 dez. 1986', body:
`Você e o Toby, bochecha com bochecha, fazendo exatamente a mesma careta. Seus olhos estão fechados de tanto rir.` },
      mall_frame4: { kind: 'photo', photo: 'frame', title: 'Foto da cabine nº 4', from: 'Cabine de fotos', date: '13 dez. 1986', body:
`Vocês cinco espremidos num banquinho só. O cotovelo do Danny está na sua orelha. Ninguém olha para a câmera. Todo mundo olha um para o outro.` },
      mall_strip: { kind: 'photo', photo: 'strip', title: 'A tira de fotos, ainda quente', from: 'Cabine de fotos', date: '13 dez. 1986', body:
`Quatro fotos, uma tira. Atrás, cinco assinaturas e uma linha na letra redonda da Rosie:

“AMIGOS PARA SEMPRE. MESMO SE A GENTE FICAR VELHO E CHATO.
MESMO SE A GENTE SE MUDAR.
MESMO SE.
— os Starlight Five”

Você lembra quem guardou a tira. O Toby. Na caixa do isqueiro.` },
      mall_lists: { kind: 'note', title: 'Cinco listas de Natal numa folha de caderno só', from: 'Os Starlight Five', date: 'Dezembro de 1986', body:
`DANNY: um emprego pro meu pai. (e um skate)
ROSIE: um microfone de verdade. fitas virgens (100)
NELL: Star Rangers nº 12. que o Theo nunca mais tenha medo de água
TOBY: uma lanterna que nunca acaba. que Sam não se irrite à toa
SAM: a fase 256

(Alguém riscou o desejo de SAM e escreveu embaixo, com a letra do Toby: “a gente consegue junto”)` },
      mall_receipt: { kind: 'note', title: 'Um cupom fiscal preso num caixote de discos', from: 'Spins Records', date: '13/12/86 15h41', body:
`FITA VIRGEM KEYTONE C-90 x10 ......... $14.90
BIG BAND CHRISTMAS (LP usado) ........ $1.00
TOTAL ................................ $15.90
DINHEIRO ............................. $16.00
TROCO ................................ $0.10

No verso: “Lado A: músicas pra agora. Lado B: pra depois. — R.”` },
      mall_guard: { kind: 'note', title: 'Livro de ocorrências do segurança', from: 'Segurança do Harlow Mall', date: '13 de dezembro de 1986', body:
`14h20 — Cinco crianças na fonte jogando moedas. Mandei parar. Pararam. Depois começaram de novo. Deixei pra lá. É Natal.

16h05 — As mesmas cinco na cabine de fotos. Cabine travada. As crianças consertaram sozinhas (o grandão tinha uma chave de fenda). Não perguntei.

17h30 — O menorzinho se perdeu. Encontrado chorando perto da fonte. Os outros quatro vieram correndo de quatro direções. Todo mundo abraçado. Estou anotando porque foi bonito.` },
      mall_kiosk: { kind: 'note', title: 'Um folheto no quiosque Starlight Jr.', from: 'Walt', date: '1986', body:
`STARLIGHT JR.
O fliperama Starlight chegou ao shopping!
3 máquinas • 25 ¢ • Aberto nos fins de semana

“Toda criança merece um recorde.” — Walt, proprietário

(No canto, um desenho antigo de giz de cera colado na placa: uma criatura laranja redonda, com chifres e um sorrisão, em perninhas. Assinado: LIL.)` },
      mall_walt: { kind: 'diary', title: 'O diário do Walt, uma página borrada', from: 'Walt', date: 'Lá dentro', body:
`O shopping. Eu tinha um quiosque aqui. Colei o desenho antigo da Lily na placa. O Chompy, com pernas.

Aqueles cinco passavam todo sábado naquele inverno. O barulhento, a das fitas, a quietinha de óculos, o pequeno do isqueiro e a companhia inseparável dele.

A companhia inseparável. Não lembro o nome. Começa com S.

É importante. Não sei por que é importante.` },
      mall_lily5: { kind: 'drawing', drawing: 5, title: 'Um desenho colado dentro do quiosque Starlight Jr.', from: 'Lily, 8 anos', date: 'Dezembro de 1982', body:
`Giz de cera. A grande árvore de Natal da Front Street. No pé dela, uma criatura laranja redonda, com chifres e pernas, segura a mão de uma menininha. A neve cai em pontinhos azuis.

O PAPAI DIZ QUE UM DIA VAI TER UM STARLIGHT EM TODA CIDADE.
ATÉ UM PEQUENINHO NUM SHOPPING.
(EU DESENHEI O CHOMPY) (O PAPAI DIZ QUE FUI EU QUE INVENTEI ELE)` },
      mall_tape: { kind: 'tape', title: 'Fita: “Mensagem de Natal”', from: 'O gravador da Rosie', date: '13 de dezembro de 1986', body:
`[Clique. Barulho da praça de alimentação, música de Natal, uma fonte.]

ROSIE: Aqui é a Rádio Rosie, ao vivo da praça de alimentação, com uma mensagem de Natal para… a gente do futuro. Vai.

DANNY: Danny do futuro, é bom você estar rico.

NELL: Hã. Nell do futuro. Espero que você ainda seja amiga desses idiotas.

TOBY: Toby do futuro, você deve estar mais alto. Finalmente.

SAM: Sam do futuro… não esquece isso.

ROSIE: Que meloso, Sam.

SAM: Cala a boca, é Natal.

[Todo mundo ri. Alguém derruba uma bandeja.]

ROSIE: A Rádio Rosie se despede. Feliz Natal, Harlow.

[Clique.]` },
    },
    obj: {
      mall_frames: 'Encontre as fotos da tira ({n}/4)',
      mall_booth: 'Coloque as fotos na cabine',
      mall_leave: 'Saia pelas portas do shopping',
    },
    mono: {
      mall_start: 'O shopping. Pretzel e pinheiro. Eu era feliz aqui. Tinha esquecido disso.',
      mall_frame1: 'Danny e Rosie. Ele sempre fingia que não estava se divertindo.',
      mall_frame2: 'Nell e Toby. Ela nunca sorria em foto. Nesta, sorriu.',
      mall_frame3: 'Eu e o Toby. A mesma careta. A gente sempre fazia a mesma careta.',
      mall_frame4: 'Nós cinco num banquinho.',
      mall_strip: 'Ele guardou. Na caixa do isqueiro. Ele guardou.',
      mall_mannequin: 'Aquele manequim estava virado para a vitrine. Agora está virado para mim.',
    },
    lines: {
      mall_boothUse: 'Colocar as fotos na cabine',
      mall_boothLook: 'Cabine de fotos (4 poses 1 $)',
      mall_boothNeed: 'A cabine zumbe. Faltam mais {n}.',
    },
    radio: {
      mall_start: [
        ['eddie', 'O shopping. Eles eram todos tão felizes aqui, Sam. Toda lembrança deste lugar é quentinha.'],
        ['eddie', 'É isso que deixa tão fácil pro jogo se agarrar nelas.'],
      ],
      mall_mannequin: [
        ['eddie', 'Não pisca. Estou falando sério. Anda de costas se precisar.'],
      ],
      mall_frames: [
        ['eddie', 'As quatro. A cabine fica perto da praça de alimentação.'],
      ],
      mall_booth: [
        ['eddie', '…Os Starlight Five. O Walt chamava vocês assim. Agora eu lembro.'],
        ['eddie', 'Não se apega demais a isso, Sam. São ecos. O jogo repete tudo pra te prender aqui.'],
        ['sam', 'Foi isso que aconteceu com você?'],
        ['eddie', '…As portas estão abertas. Vai.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
