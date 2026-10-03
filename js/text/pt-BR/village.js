/* Português (Brasil) — Capítulo 6: Águas baixas (Gammel Ostra). Bíblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      village: {
        name: 'CAPÍTULO 6', title: 'Águas baixas', place: 'Gammel Ostra, vale do Ostra',
        intro: 'Sexta-feira, 2 de outubro de 1964, depois que escureceu, na chuva.\n\nAs comportas da represa fecharam hoje às seis da manhã. Os cartazes em todas as porteiras dizem dia nove. A vila está vazia, e o rio já transbordou nas partes baixas. Uma casa ainda tem um lampião aceso na janela.',
      },
    },
    docs: {
      village_notice: { kind: 'notice', title: 'Um aviso numa porteira', from: 'Prefeitura do distrito', date: 'Setembro de 1964', body:
`REGULARIZAÇÃO DO RIO OSTRA

As comportas da represa serão fechadas e o vale será inundado na
SEXTA-FEIRA, 9 DE OUTUBRO DE 1964.

Todos os moradores devem ter deixado Gammel Ostra até essa data. Os caminhões de mudança saem todas as manhãs às 8h do pátio da escola.

(Nesta cópia o 9 foi riscado com lápis vermelho e por cima está escrito SEXTA-FEIRA, 2 DE OUTUBRO. Nem todas as porteiras foram corrigidas.)` },
      village_torLetter: { kind: 'letter', title: 'Uma carta na mesa da cozinha', from: 'Tor', date: '24 de setembro de 1964', body:
`Mãe,

Pare de escrever para o jornal. Não adianta nada e o conselho lê cada palavra.

As comportas fecham na sexta, dia 9. A senhora tem todo o tempo do mundo. Subo de carro na manhã do dia 8, a gente põe as suas coisas dentro, e a senhora desce para a casa da Ingrid em Halvard como uma mulher sensata, e no caminho pode ficar brava comigo o quanto quiser.

Não faça nenhuma bobagem.
Tor` },
      village_diary: { kind: 'report', title: 'Diário de obra, guarita do vigia da represa', from: 'T. Holm, engenheiro residente', date: 'Setembro–outubro de 1964', body:
`28.9  O conselho antecipa o fechamento em uma semana: comportas no dia 2.10, às 06.00. Anunciado no rádio hoje à noite. Cartazes a corrigir.
      A mãe não tem rádio. Eu mesmo conto quando for buscá-la. No dia é mais fácil.
29.9  Concretagem do vertedouro adiada. Chuva.
1.10  Concretagem a noite toda. Não consegui sair. Liguei para a Ingrid em Halvard: a mãe disse a ela que eu vou no dia 8, então a Ingrid não precisa se preocupar.
2.10  06.00 Comportas fechadas conforme o previsto. O vale está enchendo.
      Não subi até a casa.

(Não há mais registros nesta letra.)` },
      village_ingrid: { kind: 'note', title: 'Uma etiqueta amarrada num caixote no sótão', from: 'I.', date: '30.9.64', body:
`COISAS DA MÃE — PARA HALVARD

Ela diz que não sai de casa e ponto final. O Tor diz que vem buscá-la no dia 8.
Peguei a caixinha de música dela, para ela ter um motivo para vir buscar.
— I.` },
      village_removal: { kind: 'report', title: 'A lista de mudanças na mesa da professora', from: 'Escola de Gammel Ostra', date: 'Outubro de 1964', body:
`Aas, Olav, 64 — para a casa do filho, Nordvik — saiu 21.9
Família Berg (5) — Halvard — saiu 23.9
Dahl, Marit, 80 — para o asilo de Ostra — saiu 25.9
Holm, Signe, 71, Stuegata 4 — para a casa da filha (I. Lind), Halvard — levada pelo filho, 8.10
Kvam, Per e Anna — saíram 26.9

(Todas as linhas menos uma estão marcadas.)` },
      village_parish: { kind: 'note', title: 'Um bilhete na mesa da sacristia', from: 'Pastor A. Rø', date: '27.9.64', body:
`Último culto hoje. Os sinos descem no dia 30.
O coro pediu para cantar o hino da noite mais uma vez e eu deixei, embora a igreja estivesse quase vazia.

A Sra. Holm pediu que a igreja não fosse fechada enquanto ela ainda estiver na vila. Eu disse que o Senhor não fecha. O conselho pensa diferente.

As chaves das casas dos idosos ficam no quadro da sacristia até a mudança.` },
      village_shop: { kind: 'note', title: 'O caderno de fiado do armazém, aberto', from: 'Armazém de Gammel Ostra', date: 'Outubro de 1964', body:
`1.10  Sra. Holm — querosene, 2 litros. Fósforos. Café, ¼ kg. Fiado.
        (Diz que acerta no dia 8.)

(O armazém fechou naquela mesma noite. As prateleiras estão vazias.)` },
      wren6: { kind: 'drawing', drawing: 6, title: 'Um desenho debaixo do travesseiro', from: 'Wren, 7 anos', body:
`Giz de cera, amolecido pela umidade. Uma igreja branca debaixo de água verde, com peixes nadando perto da torre. Do lado, uma casinha vermelha, e na janela uma senhora de cabelo branco segurando um lampião no alto. Em cima da água, o passarinho vermelho.

Embaixo:
ELA FICOU ESPERANDO ACORDADA` },
    },
    items: {
      signeKey: { name: 'Chave da casa', desc: 'Num laço de barbante vermelho. Uma etiqueta de papel: S. HOLM, STUEGATA 4.' },
      musicBox: { name: 'Caixinha de música', desc: 'De jacarandá, com uma bailarina na tampa. Quando se dá corda, toca uma valsa que você quase conhece.' },
    },
    obj: {
      village_start: 'Descubra quem acendeu o lampião',
      village_key: 'Encontre uma chave da casa do lampião',
      village_box: 'Encontre o que ficava em cima da lareira',
      village_mantel: 'Ponha a caixinha de música de volta em cima da lareira',
      village_run: 'A água está vindo. Vá até a escada da represa',
      village_climb: 'Suba',
    },
    mono: {
      village_start: 'Uma vila. Vazia. Cortaram todas as árvores. Tem uma luz numa janela.',
      village_locked: 'Trancada. Tem um lampião aceso lá dentro e ninguém atende.',
      village_church: 'Eles estão cantando. No escuro, virados para o altar. Nem um pio.',
      village_silence: 'Pararam.',
      village_turn: 'Estão se virando.',
      village_resume: 'Voltaram a cantar.',
      village_key: 'S. Holm, Stuegata 4. Holm. Conheço esse nome.',
      village_school: 'A escola. Era daqui que os caminhões saíam.',
      village_list: 'Holm, Signe. Para a casa da filha, I. Lind. Lind. I. Lind é a vovó.',
      village_attic: 'Caixotes. Etiquetas. Uma vila inteira encaixotada.',
      village_box: 'Uma caixinha de música. “Coisas da mãe.” Mãe. A mãe da vovó.',
      village_house: 'O lampião está aceso. O fogão está quente. Ninguém.',
      village_dust: 'Tem um quadrado limpo na poeira em cima da lareira. Alguma coisa ficou aqui por muito tempo.',
      village_placed: 'Pronto. Onde a senhora guardava.',
      village_claimed: 'Está tocando sozinha. O relógio está batendo. São seis horas.',
      village_water: 'Esse estrondo. A água. Está vindo.',
      village_ladder: 'A escada. Para cima. Suba.',
      village_top: 'O alto. O vale inteiro é água.',
      village_gran: 'A vovó nunca disse que tinha uma mãe aqui. Nem uma vez.',
    },
    lines: {
      village_mantelLook: 'O console da lareira',
      village_mantelPut: 'Pôr a caixinha de música em cima da lareira',
      village_ladderPrompt: 'Subir a escada (segurar W)',
      village_wellLook: 'Um poço',
    },
    radio: {
      village_otto1: [
        ['radio', '[chuva sobre o chiado]'],
        ['otto', 'Nove para Ada. Chuva, uma vila vazia, uma represa? Gammel Ostra. Tenho uma prateleira inteira dela. Maçanetas, principalmente. As pessoas levam as chaves e deixam as maçanetas.'],
        ['ada', 'Tem alguém cantando. Na igreja.'],
        ['otto', 'Então deixe cantar. Enquanto cantam, olham para o altar. Se pararem, não espere para ver por quê.'],
      ],
      village_otto2: [
        ['otto', 'Ada. Uma caixinha de música na minha prateleira acabou de começar a tocar sozinha. A água no chão aqui está subindo. Eu iria embora, no seu lugar. Iria embora agora.'],
      ],
    },
    recap: {
      village: 'Gammel Ostra, 2 de outubro de 1964. Minha bisavó, Signe Holm, não queria sair de casa. O filho dela, Tor, o engenheiro da represa, disse que as comportas fechariam no dia nove; fecharam no dia dois, e ele não subiu até a casa. A vovó achava que o Tor ia buscá-la. O lampião ainda estava aceso quando a água chegou. Pus a caixinha de música dela de volta em cima da lareira e depois escalei a represa enquanto o vale enchia debaixo de mim.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
