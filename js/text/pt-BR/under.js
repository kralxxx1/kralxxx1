/* Português (Brasil) — Capítulo 1: Sem dono (Nível 256, o Embaixo). Bíblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      under: {
        name: 'CAPÍTULO 1', title: 'Sem dono', place: 'Nível 256',
        intro: 'O elevador desceu por muito tempo. Mais do que a estação tem de fundura. Mais do que a cidade tem de idade.\n\nAs portas se abriram para salas amarelas com cheiro de carpete molhado e de guarda-chuva dos outros. Em algum lugar ali dentro, um zumbido. Em algum lugar ali dentro, tudo o que ninguém voltou para buscar.',
      },
    },
    docs: {
      under_tag: { kind: 'card', title: 'Uma etiqueta de bagagem no carpete', body:
`SE ENCONTRAR, FAVOR DEVOLVER A:
M. STRAND, 8 ANOS
CINE DRIVE-IN PINEWOOD, FILA 5

(Letra de criança. O barbante foi roído.)` },
      under_umbrella: { kind: 'card', title: 'Uma etiqueta amarrada num guarda-chuva', from: 'O.B.', body:
`Item 41.207.
Um guarda-chuva, preto, masculino.
Deixado com pesar.

Item 41.208.
Uma luva, esquerda. Ainda não é de ninguém.
— O.B.` },
      under_suitcase: { kind: 'letter', title: 'Uma carta na mala de uma menina', from: 'Mamãe', date: '12 de dezembro de 1990', body:
`Lina —

Quando comprar a passagem, guarde no bolso de DENTRO do casaco. Não no de fora. Não fique tirando para olhar no trem, você sabe como você é.

Nordvik é a última parada, seis e quinze. Seu pai vai estar na plataforma com o carro, diga você o que disser sobre o escuro. Não desça em lugar nenhum antes disso.

Não deixe ninguém dizer que você não tem lugar naquele trem.

Beijos, Mamãe` },
      under_chalk: { kind: 'wall', title: 'Giz na parede', body:
`OS ACHATADOS SAEM DA PAREDE
QUANDO VOCÊ VIRA AS COSTAS
ENTÃO NÃO VIRE
— O.` },
      under_otto1: { kind: 'diary', title: 'O caderno de acampamento de Otto', from: 'Otto Brandt', body:
`Parei de contar os dias. Conto os itens. Hoje, 41.212: um chapéu, um aparelho auditivo, uma coleira sem cachorro.

O walkie-talkie funciona no canal nove. Ninguém responde. Eu falo assim mesmo. Mantém a voz funcionando.

Hoje de manhã chegou um bilhete pelo chão. Assinado A. “Alguém está vindo. Seja gentil com ela; ela não vai acreditar em você.”

Eu sou sempre gentil. Acreditar é que é difícil para as pessoas.` },
      under_list: { kind: 'note', title: 'Regras do andar de triagem (provisórias)', from: 'O.B.', body:
`1. As luzes perdidas são para guardar, não para comer. Algo aqui embaixo discorda.
2. Quando o zumbido ficar mais grave e as lâmpadas gaguejarem, pare de andar. Ele ouve. Ele não vê.
3. Não se deve confiar no papel de parede.
4. A Porta do Índice aceita quatro luzes. Eu nunca encontrei mais de três de uma vez.
5. Não arquive a si mesmo.
— O.B.` },
      under_puddle: { kind: 'note', title: 'Uma página úmida perto da água', from: 'O.B.', body:
`A água desta sala é fria e tem gosto de lago. Cada sala aqui embaixo pertence à pior tarde de alguém.

Esta pertence a alguém que eu ainda não conheci.` },
      under_index: { kind: 'wall', title: 'Pintado com estêncil ao lado da porta', body:
`O ÍNDICE
POR FAVOR, TENHA SEU CANHOTO EM MÃOS` },
      wren2: { kind: 'drawing', drawing: 2, title: 'Um desenho embaixo de um aquecedor', from: 'Wren, 7 anos', body:
`Giz de cera. Uma sala amarela. Uma coisa grande e redonda com a boca cheia de dentes. Voando por cima: um passarinho vermelho.

Embaixo:
ELE COME AS LUZES
O PASSARINHO É MAIS RÁPIDO` },
    },
    items: {},
    obj: {
      under_walkie: 'Encontre um caminho pelas salas amarelas',
      under_lights: 'Encontre as luzes perdidas ({n}/4)',
      under_index: 'Leve quatro luzes até a Porta do Índice',
      under_leave: 'Atravesse a Porta do Índice',
    },
    mono: {
      under_start: 'Isto não é o porão. O elevador desceu por quatro minutos. A estação não é tão funda.',
      under_walkie: 'Um walkie-talkie, preso com fita no canal nove. Alguém deixou ligado.',
      under_light1: 'Uma lampadinha. Quente. Por um instante, tudo no escuro ficou quieto, como se prendesse a respiração.',
      under_light4: 'Quatro. Em algum lugar do outro lado do andar, alguma coisa parou de mastigar.',
      under_indexSeen: 'O ÍNDICE. Quatro soquetes vazios ao lado da porta.',
      under_wpSeen: 'Estava na parede. Era a parede. E se mexeu quando eu me virei.',
      under_eaterSeen: 'Grande demais para o corredor. Pálido. Mastigando.',
      under_humNear: 'O zumbido ficou mais grave. As luzes estão gaguejando.',
    },
    lines: {
      under_slots: 'Quatro soquetes ({n}/4 luzes)',
      under_place: 'Encaixar as luzes nos soquetes',
      under_walkiePrompt: 'Pegar o walkie-talkie',
      under_lightPrompt: 'Pegar a luz perdida',
    },
    radio: {
      under_otto1: [
        ['radio', '[chiado]'],
        ['otto', '...nove. Aqui é o nove. Tem alguém na linha? Estou ouvindo a senhora respirar. Não é uma crítica.'],
        ['ada', 'Quem está falando?'],
        ['otto', 'Brandt. Depósito 9, balcão da noite. E a senhora está no meu andar de triagem sem canhoto.'],
        ['ada', 'Otto Brandt? O senhor desapareceu em 1964.'],
        ['otto', '1964. Já é... não. Me diga depois. Como a senhora se chama, colega?'],
        ['ada', 'Ada. Ada Lind. Estou no seu emprego.'],
        ['otto', 'Então tem os meus pêsames. Escute, Ada Lind. É para cá que vem tudo o que ninguém voltou para buscar. É muito grande, e não está vazio.'],
        ['otto', 'Existe uma porta. A Porta do Índice. Ela quer quatro das luzes perdidas, lampadinhas, a senhora vai reconhecer. Traga quatro e ela abre.'],
        ['ada', 'E depois da porta?'],
        ['otto', 'Mais andares. Eu chamo de prateleiras. Um bilhete disse que a senhora viria. Assinado A. A senhora conhece alguma A.?'],
        ['ada', '...Não.'],
        ['otto', 'Nem eu. Deixe o canal aberto.'],
      ],
      under_lights: [
        ['otto', 'A senhora achou uma. Mantenha perto. Algo aqui embaixo come essas luzes, e enquanto a senhora segurar uma recém-pega, ele tem medo da senhora.'],
        ['ada', 'Por quanto tempo?'],
        ['otto', 'Não muito. Nada aqui embaixo tem medo por muito tempo.'],
      ],
      under_wallpaper: [
        ['otto', 'Já viu os homens achatados? No papel de parede. Eles se soltam quando a senhora vira as costas.'],
        ['ada', 'E quando eu olho para eles?'],
        ['otto', 'Aí eles são papel de parede. Papel de parede muito paciente.'],
      ],
      under_hum: [
        ['otto', 'Se o zumbido ficar mais grave e as lâmpadas gaguejarem, pare. Tem alguma coisa parada ali. Ela não vê a senhora. Ela ouve os seus sapatos.'],
        ['ada', 'O que é?'],
        ['otto', 'Arquivei em “diversos”. É uma categoria grande.'],
      ],
      under_eater: [
        ['otto', 'Ada. Esse barulho. Ele acordou.'],
        ['otto', 'O Devorador. A coisa mais antiga aqui embaixo. Ele come o que ninguém quer. Não deixe ele decidir que é a senhora. Corra para a Porta do Índice. Faça as curvas; nas curvas ele é lento.'],
      ],
      under_index: [
        ['otto', 'A Porta do Índice. Quatro soquetes. Eu nunca encontrei mais de três luzes de uma vez. Talvez a senhora tenha mais sorte.'],
      ],
      under_open: [
        ['otto', 'Abriu. Eu nunca tinha visto ela aberta.'],
        ['ada', 'Venha comigo.'],
        ['otto', 'Não posso. Não sei por quê. Acho que estou arquivado neste andar. Vá. Eu fico no nove.'],
        ['otto', 'No fundo de cada prateleira lá embaixo existe uma mentira, Ada. Procure a mentira.'],
      ],
      under_badge: [
        ['ada', 'Otto. Trouxe uma coisa sua. Da sua mesa. Vou deixar na porta.'],
        ['otto', '[um longo silêncio]'],
        ['otto', 'O. Brandt. Otto. Era esse o nome. Eu tinha deixado em algum lugar e esquecido onde.'],
        ['otto', 'Obrigado, Ada. Deixe aí. Agora vou saber onde está.'],
      ],
    },
    recap: {
      under: 'Nível 256: salas amarelas cheias de coisas que ninguém voltou para buscar. Otto Brandt está vivo lá embaixo, no canal nove; ele acha que passou mais ou menos um ano. Entreguei quatro luzes perdidas à Porta do Índice enquanto uma coisa redonda e muito velha acordava atrás de mim.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
