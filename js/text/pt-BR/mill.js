/* Português (Brasil) — Nível 1: o depósito da fábrica (Danny). */
(function (root) {
  'use strict';
  root.PB.I18N.register('pt-BR', 'story', {
    chapters: {
      mill: {
        name: 'LEVEL 1', title: 'O depósito da fábrica', place: 'A lembrança do Danny — Harlow Mill, Front Street',
        intro: 'O teto fica a seis metros de altura. As prateleiras somem no escuro. Em algum lugar um relógio tiquetaqueia, sempre no mesmo segundo.\n\nO pai do Danny embalou caixas neste prédio por vinte e cinco anos. Aí, numa sexta-feira, deram um relógio para ele e o mandaram para casa.',
      },
    },
    docs: {
      mill_intro: { kind: 'note', title: 'Colado na porta do elevador de carga', from: 'Eddie', body:
`O elevador de carga precisa de três fusíveis. O quadro fica perto do escritório de carregamento.

O vermelho patrulha os corredores. Rápido, nunca para, mas é BARULHENTO. Presta atenção nele.

Não tenta correr mais que ele em campo aberto. Ninguém corre mais que o Danny.

—E.` },
      mill_layoff: { kind: 'letter', title: 'Uma carta em papel timbrado', from: 'Harlow Mill, Depto. de Expedição', date: '30 de maio de 1986', body:
`Prezado Ray,

Como parte da reestruturação da expedição da Front Street, seu cargo será extinto a partir de 30 de junho de 1986.

Agradecemos por vinte e cinco anos de serviço leal. Por favor, devolva a chave do armário e o crachá no escritório da frente.

Aceite o relógio anexo como sinal do nosso reconhecimento.

Diretoria da Harlow Mill` },
      mill_punch: { kind: 'card', title: 'Um cartão de ponto', from: 'Harlow Mill', date: 'Verão de 1986', body:
`FUNCIONÁRIO: KOWALSKI, D. (VERÃO — FAXINA)
SALÁRIO: US$ 3,35/hora

6/02  07:00 — 15:00
6/03  07:00 — 15:00
6/04  06:52 — 15:04
...
6/30  07:00 — 11:15

Atravessando a última linha, a caneta azul:
ÚLTIMO DIA DO PAI TAMBÉM` },
      mill_graffiti: { kind: 'wall', title: 'Tinta spray nas prateleiras', body:
`DAN #1
O DANNY ESTEVE AQUI
O DANNY ESTÁ SEMPRE AQUI` },
      mill_danny1: { kind: 'note', title: 'Um bilhete dobrado no bolso de uma jaqueta', from: 'Danny', date: 'Março de 1987', body:
`Todo mundo acha que eu não tenho medo de nada.

Eu tenho medo do meu pai sentado na cozinha o dia inteiro com o rádio desligado.

Então eu jogo. Quem está em primeiro lugar não fica sentado na cozinha.

(Se a Rosie ler isto, eu mato ela de verdade.)` },
      mill_ray: { kind: 'letter', title: 'Uma carta que nunca foi enviada', from: 'Ray, pai do Danny', date: 'Maio de 1987', body:
`Danny,

A polícia perguntou da chave de novo. Eu disse que não me importo com chave nenhuma. Você pode ficar com todas as chaves desta cidade.

Agora estou na loja de ferragens. Está tudo bem. Menos horas. Escuto o jogo no rádio.

Consertei a sua bicicleta. Corrente nova, freio novo. Está na garagem.

Volta para casa e anda nela. Eu não vou dizer uma palavra.

Pai` },
      mill_manifest: { kind: 'printout', title: 'Um manifesto de carga', from: 'Harlow Mill, doca 3', date: '17 de abril de 1987', body:
`CARGA Nº 0256
CONTEÚDO: 1 relógio de pulso (parado às 3h17)
PESO: nada
DESTINO: —
RECEBIDO POR: —

O papel está morno, como se tivesse acabado de sair da impressora.` },
      mill_walt3: { kind: 'diary', title: 'O diário do Walt', from: 'Walt', date: 'Lá dentro, dia ?', body:
`O vermelho nunca para. Faz as mesmas voltas sem parar, do jeito que o Danny jogava o labirinto: sempre em primeiro, sempre o mais rápido, sem respirar.

Hoje ele veio para cima de mim gritando. VOCÊ SOLTOU. VOCÊ SOLTOU.

Eu nunca soltei nada. Segurei cada um deles durante cinco anos. Então com quem ele está gritando?

Depois eu fui atrás dele e não lembro por quê. Acho que eu estava com fome.` },
      mill_shrine: { kind: 'note', title: 'Embaixo da foto no altar', from: 'W.', body:
`Ele sempre tinha que ser o primeiro.
O primeiro na máquina. O primeiro a passar de 900.000.
O primeiro a atravessar a tela.

Dá para ele alguma coisa que para.` },
      mill_tape: { kind: 'tape', title: 'Fita: “Primeiro lugar, para a história”', from: 'O gravador da Rosie', date: '16 de abril de 1987, 23h52', body:
`[Clique. Barulho de fliperama. Crianças rindo.]

DANNY: Aqui é Danny Kowalski, primeiro lugar, gravando para a história. Hoje à noite a gente zera a kill screen.

ROSIE: Hoje à noite a gente TENTA zerar a kill screen.

DANNY: O Walt diz que é impossível. O Walt também dizia que ninguém passava de novecentos mil.

TOBY: A gente vai se encrencar? Minha mãe acha que eu estou dormindo na casa de Sam.

DANNY: Encrenca é para quem é pego, Toby.

NELL: …Sam foi para casa, Danny.

DANNY: Sam amarelou. Mais kill screen para a gente.

[Uma pausa.]

TOBY: Sam não amarelou. Sam vai vir.

[Clique.]` },
    },
    obj: {
      mill_fuses: 'Encontre os fusíveis ({n}/3)',
      mill_panel: 'Coloque os fusíveis no quadro do elevador',
      mill_wait: 'O elevador está vindo… Sobreviva ({n} s)',
      mill_leave: 'Entre no elevador',
    },
    mono: {
      mill_start: 'Um relógio tiquetaqueando. Sempre o mesmo segundo.',
      mill_dannySeen: 'Vermelho. Um lençol encharcado, abaulado como uma cabeça, a barra rasgada em pontas. Dois olhos enormes e nenhum rosto. Tem alguma coisa do tamanho de um menino embaixo dele.',
      mill_fuse: 'Mais um fusível.',
      mill_elevator: 'O elevador está vindo. Devagar. Tão devagar.',
      mill_watch: '3h17. Igual ao relógio.',
    },
    lines: {
      mill_panel: 'Colocar os fusíveis',
      mill_panelIdle: 'Quadro de fusíveis ({n}/3)',
      mill_slots: 'O quadro tem três encaixes vazios.',
    },
    radio: {
      mill_start: [
        ['eddie', 'Sam? Tá aí? …Ah. Eu conheço este lugar. Harlow Mill, o depósito da Front Street. O pai do Danny trabalhou aqui vinte e cinco anos.'],
        ['eddie', 'Ou seja, o vermelho vai estar aqui também.'],
      ],
      mill_danny: [
        ['eddie', 'Ele está na sua cola! Não aposta corrida com ele em campo aberto. Quebra a linha, faz a curva, põe alguma coisa entre vocês!'],
        ['sam', 'Ele está gritando alguma coisa!'],
        ['eddie', 'Ele sempre grita. “Você soltou.” Gritou para mim, gritou para o Walt. Não sei de quem ele está falando. CORRE.'],
      ],
      mill_watch: [
        ['eddie', 'Isso é um relógio? …O relógio do Ray. Deram para ele no dia em que o mandaram embora. O Danny usou todo dia depois disso.'],
        ['eddie', 'Tem um altar aqui por perto. Leva lá. Quem sabe ele lembra.'],
      ],
      mill_freed: [
        ['eddie', '…Ele parou? Sam, o que você fez? Ele está só… parado ali.'],
        ['eddie', 'Meu Deus. É o Danny. É o Danny mesmo.'],
      ],
      mill_elevator: [
        ['eddie', 'Esse elevador é barulhento. Tudo aqui dentro ouviu. Aguenta firme até ele chegar.'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
