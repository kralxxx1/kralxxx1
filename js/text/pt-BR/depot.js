/* Português (Brasil) — Prólogo: Turno da noite (Depósito 9). Bíblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      depot: {
        name: 'PRÓLOGO', title: 'Turno da noite', place: 'Depósito 9, estação central de Halvard',
        intro: 'Halvard, a noite de 13 de janeiro de 1998. Chuva no teto de vidro da estação central.\n\nEmbaixo do saguão fica o Depósito 9, onde tudo o que a cidade perde espera noventa dias que alguém volte para buscar. Ada Lind trabalha no balcão da noite há oito anos. Ninguém desce depois da meia-noite.\n\nFoi por isso que ela aceitou o emprego.',
      },
    },
    docs: {
      depot_handover: { kind: 'note', title: 'Bilhete de passagem de turno', from: 'Benny', date: 'Ter. 13 jan.', body:
`Ada —

Passagem de turno:
• Entraram 14 guarda-chuvas. Está chovendo, né.
• O homem do trombone voltou. Continua não sendo o trombone dele.
• A calha está emperrando de novo. Bate do lado ESQUERDO.
• Seu armário não fecha. A fita ainda está lá dentro. Não mexi.
• Alguém lá de cima perguntou se “a gente ainda tem o elevador”. Eu disse que ninguém usa aquele elevador desde 1964. Ele disse: “Não foi isso que eu perguntei.”

Acabou o café. Foi mal.
— Benny` },
      depot_log: { kind: 'printout', title: 'Livro da noite, página 212', from: 'A. Lind', date: '13/14.01.98', body:
`DEPÓSITO 9 — LIVRO DA NOITE — A. LIND

23:10  Canhoto 4471: luva, feminina, cinza. Retirada.
00:40  Limpeza da plataforma 2: mala, marrom-clara, sem etiqueta. Registrada sob o nº 241.
01:15  Telefone. Ninguém. (Terceira noite.)
02:30  Chuva forte. Calha quieta.
02:56  Nada mais a relatar.` },
      depot_tag: { kind: 'card', title: 'A etiqueta de retirada no pacote', from: 'A.', body:
`ESTAÇÃO CENTRAL DE HALVARD — DEPÓSITO 9 — ACHADOS E PERDIDOS

RETIRADA 256
Uma luva de dedão, vermelha, infantil, mão esquerda.
Encontrada: lago Ostra, 14 de janeiro de 1979.
GUARDAR PARA: ADA LIND.

— A.

(Datilografada numa máquina com o “e” caído, do tipo que o depósito jogou fora em 1964. A tinta ainda está molhada.)` },
      wren1: { kind: 'drawing', drawing: 1, title: 'Um desenho dobrado dentro do pacote', from: 'Wren, 7 anos', body:
`Giz de cera. Um passarinho vermelho numa cerca. Uma menina alta de cachecol verde indo embora por uma estrada, de costas. Em cima dela, em letras grandes: ADA.

No verso, com o mesmo giz:
PRA VOCÊ SABER O CAMINHO` },
      depot_ledger: { kind: 'report', title: 'Livro de achados e perdidos, 1979, vol. 1', from: 'Depósito 9', body:
`Nº 253 — 14.01.79 — Luvas, masculinas, couro marrom — Plataforma 3 — retiradas 16.01
Nº 254 — 14.01.79 — Guarda-chuva, preto — Sala de espera — retirado 15.01
Nº 255 — 14.01.79 — Livro, “A Rainha da Neve”, infantil — Plataforma 4 — não retirado
Nº 256 — 14.01.79 — Luva de dedão, vermelha, infantil, mão esquerda — encontrada: lago Ostra — Requerente: a irmã, quando se lembrar.

(O último registro está numa letra trêmula que você quase reconhece. A tinta está molhada. Colada com fita por dentro da tampa: uma chave de latão gravada SUPT.)` },
      depot_ottoNotes: { kind: 'diary', title: 'Anotações na mesa do superintendente', from: 'Otto Brandt', date: '14 de fevereiro de 1964', body:
`Quarenta e um mil itens desde 1906. Cada um era de alguém.

Comecei a ouvir o velho tubo à noite. Bilhetes, assinados “A.” Ela conhece o nosso livro melhor do que eu.

Ela escreve que existe um andar debaixo dos andares, para onde vai tudo o que ninguém voltou para buscar. Uma central de triagem. Ela escreve que falta um funcionário lá.

Risquei o número em cima do botão para não perder a coragem.

Se eu não voltar até de manhã: os guarda-chuvas vão para a gaiola, não para o lixo.

— O.B.` },
      depot_memo: { kind: 'note', title: 'Um bilhete na cápsula do tubo', from: 'A.', body:
`ÍNDICE — NÍVEL 256 — INTERNO

Para: Depósito 9, balcão da noite.

Ada.
A chave do elevador está na mesa dele. Traga a luva, e não a solte.
Otto estará no canal nove. Diga a ele que os guarda-chuvas estão na gaiola.

— A.` },
      depot_calendar: { kind: 'notice', title: 'Calendário da Transportes de Halvard, 1964', body:
`FEVEREIRO DE 1964

(Os dias estão riscados até o 13. No 14, a lápis: “Turno da noite. O último?” Debaixo da foto da nova represa de Ostra, o mesmo lápis: “Vão inundar o vale no outono. O jornal diz que uma senhora lá de cima se recusa a sair.” Desde então, ninguém virou a página.)` },
      depot_poster: { kind: 'notice', title: 'Aviso no saguão público', from: 'Transportes de Halvard', body:
`ACHADOS E PERDIDOS — DEPÓSITO 9

Os objetos encontrados nas estações e nos trens ficam guardados aqui por NOVENTA DIAS.
Por favor, traga um comprovante de propriedade.
Os objetos não retirados são vendidos ou destruídos.

(Preso embaixo, a canetinha: “ACHADO: gato cinza, atende por Almirante. Falar com o Benny.”)` },
      depot_kitchen: { kind: 'card', title: 'Um cartão-postal em cima da pia', from: 'Vovó', date: '1995', body:
`(Uma vista de inverno do lago Ostra. Lá no gelo, bem pequenininha, a torre da igreja submersa.)

Ada —
O gelo está grosso este ano. O dia 14 cai num sábado. Venha se puder. Vou pôr a vela na janela como sempre.
Vovó` },
    },
    items: {
      mitten: { name: 'Luva vermelha (esquerda)', desc: 'Uma luva de dedão infantil, de lã vermelha, cerzida no polegar. A outra foi encontrada no gelo dezenove anos atrás.' },
      ottoKey: { name: 'Chave do superintendente', desc: 'De latão, gravada SUPT. Estava colada por dentro da tampa da caixa do livro de 1979.' },
      elevatorKey: { name: 'Chave do elevador de carga', desc: 'Uma chave comprida numa etiqueta que diz CARGA. A de Otto Brandt.' },
      badge: { name: 'O crachá de Otto', desc: 'Oval de latão: DEPÓSITO 9 — OTTO BRANDT. Gasto onde um polegar o esfregava.' },
      parcel: { name: 'Pacote' },
    },
    obj: {
      depot_log: 'Termine o livro da noite na sua máquina de escrever',
      depot_parcel: 'Veja o que caiu pela calha',
      depot_torch: 'Pegue a lanterna no seu armário',
      depot_power: 'Religue o disjuntor geral na sala de triagem',
      depot_ledger: 'Encontre o livro de 1979 no arquivo',
      depot_otto: 'Revire a sala de Otto Brandt',
      depot_elevator: 'Desça no elevador de carga',
    },
    mono: {
      depot_start: '02:51. Chuva lá em cima, no vidro do saguão. Mais uma linha e o livro da noite está pronto.',
      depot_start2: 'Ninguém desce aqui depois da meia-noite. Esse é o sentido do emprego.',
      depot_logDone: '02:56. Nada mais a relatar.',
      depot_chute: 'A calha. Ninguém manda pacote às três da manhã.',
      depot_mitten: 'Mão esquerda. Vermelha. As de Wren eram vermelhas. Em 1979 as de todo mundo eram vermelhas.',
      depot_dark: 'E lá se vai a luz. Minha lanterna está no armário.',
      depot_torch: 'As pilhas ainda estão boas. O Benny nunca pega nada útil emprestado.',
      depot_tape: 'A fita da vovó. Dois anos no meu armário. Hoje não.',
      depot_tape2: 'Eu disse hoje não.',
      depot_powerBack: 'Pronto. A fiação velha sempre fica emburrada um minuto antes.',
      depot_tube: 'Era o velho tubo pneumático da sala do superintendente. Não funciona desde 1964. A etiqueta diz 1979. O livro está no arquivo.',
      depot_archive: 'Quarenta e uma mil coisas que ninguém voltou para buscar.',
      depot_sorter: 'Tinha alguém no fim do corredor. Alto, de casaco cinza. Separando caixas no escuro.',
      depot_ledgerAfter: 'Essa não é a letra do Benny. Não é a letra de ninguém. E tem uma chave colada na tampa: SUPT. A sala de Otto Brandt.',
      depot_ottoLocked: 'SUPERINTENDENTE. Trancada desde 1964. O Benny diz que a chave sumiu junto com ele.',
      depot_ottoLocked2: 'Continua trancada.',
      depot_ottoIn: 'O abajur dele está aceso. Ainda tem café na xícara. Trinta e quatro anos.',
      depot_badge: 'OTTO BRANDT. Ninguém deixa o crachá para trás a não ser que pretenda voltar para buscar.',
      depot_elevKey: 'CARGA. O elevador que ninguém usou depois dele.',
      depot_noKey: 'O painel precisa de uma chave. Claro que precisa.',
      depot_noKey2: 'Ainda falta a chave.',
      depot_256: 'Alguém riscou um número em cima do botão mais baixo. 256.',
      depot_wren: 'Tinha alguém na cabine. Uma criança de macacão de neve vermelho. Por um segundo.',
      depot_gate: 'O portão do saguão. Trancado lá de cima à meia-noite. Regra da estação.',
      depot_elevatorShut: 'O elevador de carga. Fora de serviço desde 1964.',
    },
    lines: {
      depot_typePrompt: 'Datilografar a última linha do livro da noite',
      depot_parcelPrompt: 'Abrir o pacote',
      depot_tapePrompt: 'A fita da vovó',
      depot_breakerPrompt: 'Religar o disjuntor geral (segurar)',
      depot_ledgerPrompt: 'Caixa do livro: 1979',
      depot_badgePrompt: 'O crachá de Otto',
      depot_callPrompt: 'Girar a chave, apertar o botão mais baixo',
      depot_ottoUnlock: 'Destrancar com a chave do superintendente',
    },
    recap: {
      depot: 'Depósito 9, 02:56. Um pacote caiu pela calha: uma luva vermelha, mão esquerda, e uma etiqueta que dizia “Guardar para Ada Lind”. O livro de 1979 dizia: requerente, a irmã, quando se lembrar. Desci no elevador de carga de Otto Brandt até o botão em que alguém tinha riscado um número: 256.',
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
