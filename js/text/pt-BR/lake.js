/* Português (Brasil) — Capítulo 9: O gelo (lago Ostra) e os três finais. Bíblia: docs/STORY.md. */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      lake: {
        name: 'CAPÍTULO 9', title: 'O gelo', place: 'Lago Ostra',
        intro: 'Domingo, 14 de janeiro de 1979, 15h40.\n\nA casa da vovó, na margem. O fogão está aceso e o rádio, ligado. Lá no lago, os mais velhos estão nas cabanas de pesca, e a neve vem chegando do norte.\n\nWren está lá fora, em algum lugar.',
      },
    },
    docs: {
      lake_radio: { kind: 'transcript', title: 'O rádio, baixinho, na mesa', from: 'Previsão do tempo para a região dos lagos', date: 'Domingo, 14 de janeiro de 1979, 15h30', body:
`...pancadas de neve à tarde, virando neve forte a partir das quatro horas, mais ou menos, com ventos fortes do norte e acúmulo. Visibilidade quase zero em campo aberto e sobre os lagos depois que escurecer.

O gelo do lago Ostra está sendo considerado inseguro sobre o antigo leito do rio, no lado noroeste. Pede-se à população que não pise de jeito nenhum no gelo naquele trecho.

E agora, as notícias das três e meia...` },
      lake_granNote: { kind: 'note', title: 'Um bilhete na mesa da cozinha', from: 'Vovó', date: 'Domingo', body:
`Ada —

Subi até a fazenda para buscar leite. Volto às quatro e meia.
A Wren NÃO vai para o gelo. Fique com ela aqui dentro.
Tem pão doce na lata, um para cada uma.

Vovó` },
      lake_wrenNote: { kind: 'note', title: 'Uma folha grudada na porta das meninas', from: 'Wren', date: '(sem data)', body:
`ADA
EU VOU TAMBÉM

(Embaixo, um passarinho vermelho desenhado voando atrás de um passarinho maior com uma listra verde no pescoço.)` },
      lake_diary: { kind: 'note', title: 'Um diário debaixo do travesseiro de cima', from: 'Ada, 12 anos', date: '14 jan. 1979', body:
`A Sunna e o Per e todo mundo vão estar nas cabanas depois do almoço. A SUNNA ME CHAMOU.

A Sunna disse traz o seu passarinho, a gente joga ela no buraco. Ha ha.

Eu NÃO vou levar. Ela me segue para todo lado feito um cachorro e depois chora e todo mundo olha para mim. Só uma vez eu quero ir a algum lugar sem ela.` },
      lake_search: { kind: 'report', title: 'Um relatório dobrado no galpão dos barcos', from: 'Polícia do distrito de Ostra', date: 'Janeiro de 1979', body:
`Criança desaparecida: Wren LIND, 7 anos, da casa dos Lind, margem sul, lago Ostra.

14.1, 16h50. Desaparecimento comunicado pela avó, Sra. Ingrid Lind, ao voltar para casa.
A irmã da criança, Ada Lind, 12 anos, declara que Wren não foi com ela para o gelo e que achava que Wren estava em casa.
Busca: a casa, as edificações anexas, as matas ao sul e a estrada, durante toda a noite. Neve forte.
16.1, 11h20. Uma luva de dedão vermelha infantil (mão direita) encontrada sobre o gelo cerca de 300 metros a noroeste das cabanas de pesca, sobre o antigo leito do rio. Gelo inseguro. Mergulho impossível até o degelo.` },
      lake_hutNote: { kind: 'note', title: 'Um maço de cigarros, com coisas escritas', from: '(os mais velhos)', date: '14.1.79', body:
`PER + SUNNA

O PASSARINHO DA ADA SEGUIU ELA DE NOVO
PIU PIU

(o desenho de um passarinho com cara triste e uma seta apontando para fora da cabana)` },
      lake_tape: { kind: 'transcript', title: 'Uma fita no gravador: “PARA A ADA”', from: 'Ingrid Lind', date: 'Dezembro de 1995', body:
`[um clique; um relógio de cozinha tiquetaqueando; alguém se ajeitando numa cadeira]

Ada. É a vovó. Estão dizendo que eu não estou bem, então vou dizer na fita, porque nunca consegui dizer na sua cara.

Eu sempre soube que você a viu no gelo. Eu soube pela sua cara naquela noite. Nunca perguntei, porque tinha medo do que dizer aquilo faria com você. Eu me convenci de que isso era bondade.

Não era. As mulheres desta família ficam caladas e chamam isso de bondade. Minha mãe esperou o meu irmão ir buscá-la, e ele nunca foi, e ninguém nunca disse isso em voz alta, nem uma vez.

Fala, minha menina. Fala em voz alta, para alguém. E depois vai e encontra ela.

[o relógio; uma respiração longa; a fita corre até o fim]` },
    },
    items: {
      mitten: { name: 'Luva vermelha', desc: 'Uma luva de dedão infantil, vermelha, mão esquerda. Veio no pacote. A outra foi encontrada no gelo.' },
    },
    obj: {
      lake_start: 'Encontre a Wren',
      lake_trail: 'Siga as pegadas dela até o gelo',
      lake_huts: 'Vá até as cabanas, onde estavam os mais velhos',
      lake_remember: 'Lembre',
      lake_thin: 'Vá até o gelo fino sobre o rio antigo',
      lake_say: 'Diga a ela',
    },
    mono: {
      lake_start: 'A casa da vovó. O fogão está aceso. O rádio está ligado. É mil novecentos e setenta e nove.',
      lake_empty: 'Ninguém em casa. A vovó foi buscar leite. As botas da Wren não estão perto da porta.',
      lake_note: '“Fique com ela aqui dentro.” Eu não fiquei.',
      lake_wrenNote: 'Ela sempre escrevia o meu nome primeiro.',
      lake_out: 'Pegadas pequenas na neve. Descendo até a margem. Para cima do gelo.',
      lake_ice: 'O gelo está cantando. Ele faz isso quando está frio.',
      lake_wren: 'Vermelho. Lá longe. Indo embora.',
      lake_huts: 'As cabanas. Tem alguém rindo lá dentro.',
      lake_laughers: 'Estão rindo de mim. Riam de mim naquela época também.',
      lake_hole: 'O buraco no gelo. Eu estava parada aqui quando ouvi.',
      lake_remember1: 'Ela entrou atrás de mim. O rosto todo rosado de frio. “Ada, eu vim também.”',
      lake_remember2: 'E todo mundo olhou para mim. E eu tirei a mão dela da minha manga e disse, some daqui, Wren. Vai para casa. Some.',
      lake_remember3: 'Ela foi. Para o lado errado. Na neve não dava para ver a margem.',
      lake_remember4: 'E aí o gelo fez um barulho. Um barulho comprido. Lá longe, à esquerda. E eu não me virei, porque eles estavam olhando para mim.',
      lake_storm: 'A neve está chegando. Não vejo a casa.',
      lake_thin: 'O gelo aqui é escuro. Fino. Ande. Não corra.',
      lake_hush: 'Alguma coisa na neve atrás de mim. Um cachecol verde.',
      lake_quiet: 'Ficou tudo tão quieto. Não ouço os meus próprios passos.',
      lake_found: 'Lá está ela.',
      lake_tape: 'A voz da vovó. Faz dois anos que esta fita está no meu armário e eu nunca ouvi.',
      lake_gone: 'As pegadas continuam, para a esquerda. Para o rio.',
    },
    lines: {
      lake_radioPrompt: 'Ouvir o rádio',
      lake_tapePrompt: 'Tocar a fita',
      lake_holePrompt: 'Olhar dentro do buraco',
      lake_choiceTitle: 'Wren está de pé no gelo fino, de costas para você.',
      lake_sayIt: 'Dizer. Tudo.',
      lake_vanished: '“Ela simplesmente sumiu. Ninguém viu nada.”',
      lake_say1: '“Eu mandei você sumir.”',
      lake_say2: '“Você foi para o lado errado, e eu ouvi o gelo e não me virei.”',
      lake_say3: '“Eu disse à vovó que você nunca saiu de casa. Deixei que procurassem você no mato.”',
      lake_give: 'Dar a luva para ela',
    },
    radio: {
      lake_otto1: [
        ['radio', '[neve sobre o chiado, bem suave]'],
        ['otto', 'Nove para Ada. Mal consigo ouvir a senhora. Esta não é a minha prateleira. Não consigo vê-la de jeito nenhum. Acho que é a sua.'],
        ['otto', 'O que quer que a senhora encontre lá fora, diga a ela. Não a mim.'],
      ],
      lake_otto2: [
        ['otto', 'Ada. Alguma coisa nesta prateleira está tirando o som de tudo. Não deixe ela chegar perto o bastante para tirar o seu.'],
      ],
    },
    recap: {
      lake: 'Lago Ostra, 14 de janeiro de 1979. Eu tinha doze anos. A Wren me seguiu até o gelo e entrou na cabana onde estavam os mais velhos, e eu mandei ela sumir. Ela foi para o lado errado na neve, para cima do rio antigo onde o gelo é fino, e eu ouvi, e não me virei. Depois fui para casa e disse à vovó que ela nunca tinha saído.',
    },
    endings: {
      thaw: {
        title: 'DEGELO', subtitle: 'A verdade, dita em voz alta',
        lines: [
          'Eu digo. Tudo. As palavras saem de mim como uma coisa que eu segurei na boca por dezenove anos.',
          'Wren se vira. O rosto dela está rosado de frio. Ela me olha como sempre olhava, como se eu fosse mais alta do que sou.',
          'Dou a luva para ela. Ela calça. Levanta as duas mãos para me mostrar: duas luvas vermelhas, um par de novo.',
          'Depois ela se vira e volta para casa pelo gelo, na direção das luzes da casa, e não olha para trás. Tudo bem. Agora ela sabe o caminho.',
          'Às seis e dez da manhã eu acordo no balcão do Depósito 9, com o pacote aberto na minha frente. A chuva parou.',
          'Escrevo RETIRADO na retirada 256. Ligo para a polícia de Halvard sobre um caso de dezenove anos atrás. Depois tiro a fita da vovó do armário e escuto, até o fim.',
          'Em abril, quando o gelo derrete, os mergulhadores vasculham o antigo leito do rio.',
          'Wren está enterrada ao lado da nossa avó, no morro acima do lago, de onde dá para vê-lo inteiro.',
          'Na bandeja do Depósito 9, naquela primeira manhã, havia uma segunda etiqueta, numa letra velha e trêmula que eu ainda não conhecia: RETIRADO. ENFIM. — A.',
        ],
      },
      snowfall: {
        title: 'NEVE', subtitle: 'A que ficou',
        lines: [
          '“Ela simplesmente sumiu”, eu digo. “Ninguém viu nada.”',
          'Wren não se vira. Atrás de mim, a coisa de cachecol verde está muito perto. Ela começa a desenrolar o cachecol, volta após volta, até não sobrar nada para desenrolar.',
          'Embaixo está o meu próprio rosto, aos doze anos, com o frio nas bochechas.',
          'A neve cai sobre o lago e cobre o gelo escuro e a figura vermelha em cima dele e as pegadas, as minhas e as dela, até não sobrar nada para ver.',
          'Em algum lugar lá embaixo, um bilhete sobe por um tubo pneumático numa letra nova. FUNCIONÁRIA DA NOITE, NÍVEL 256. PRIMEIRO TURNO.',
          'No canal nove, bem baixinho: “Bem-vinda ao turno da noite, Ada.”',
        ],
      },
      morning: {
        title: 'MANHÃ', subtitle: 'Todos os que estavam perdidos',
        lines: [
          'Eu digo. Tudo. Wren se vira. Dou a luva para ela, e ela levanta as duas mãos para me mostrar, um par de novo, e volta para casa pelo gelo, na direção das luzes da casa.',
          'Às seis e dez da manhã eu acordo no balcão do Depósito 9, com o pacote aberto na minha frente. Escrevo RETIRADO na retirada 256.',
          'Às seis e quinze, o elevador de carga no fundo do arquivo se abre sozinho.',
          'Sai um velho com um casaco fora de moda há trinta e quatro anos, um crachá de latão na mão, como se tivesse acabado de recebê-lo.',
          '“Brandt”, ele diz. “Otto. Agora eu lembro.” Ele olha o arquivo, as prateleiras, eu. “Em que ano estamos?”',
          'Eu digo. Ele pensa nisso por um bom tempo. E aí ri, uma risada de verdade, a primeira que eu ouço dele sem chiado.',
          'Em abril, quando o gelo derrete, os mergulhadores vasculham o antigo leito do rio. Wren está enterrada ao lado da nossa avó, no morro acima do lago.',
          'Na bandeja do Depósito 9, naquela manhã, há uma segunda etiqueta, numa letra velha e trêmula que eu conheço muito bem: RETIRADO. ENFIM. — A.',
        ],
      },
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
