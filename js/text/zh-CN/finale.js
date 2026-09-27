/* 简体中文 — 第 255 关（房子）与第 256 关（死亡画面）。 */
(function (root) {
  'use strict';
  root.PB.I18N.register('zh-CN', 'story', {
    chapters: {
      maze: {
        name: 'LEVEL 255', title: '房子', place: '游戏本身',
        intro: '从里面看的 Hungry House。墙缝像屏幕一样发着光，星星悬浮在齐腰的高度，正中间是游魂的房子，门被四盏灯笼封着。\n\n你对这张棋盘比对自己的卧室还熟。你玩过一万遍了。它一直在等你再玩一次。',
      },
      killscreen: {
        name: 'LEVEL 256', title: '死亡画面', place: '本不该有人看到的那一半',
        intro: '棋盘的左半边是你熟悉的那栋房子。右半边是松脱后悬在半空中的字母、数字和颜色。\n\n在核心的某处，有样东西还插着电。',
      },
    },
    docs: {
      maze_neon: { kind: 'wall', title: '迷宫墙上发光的字', from: 'W.', body:
`如果你能读到这些
你就在我的游戏里了。
对不起。
吃掉星星。
别伤害游魂。
——W.` },
      maze_rules: { kind: 'wall', title: '一块像石头一样冰冷的牌子', body:
`房子的规则

1. 玩家吃。
2. 游魂追。
3. 棋盘被清空。
4. 下一张棋盘开始。
5. 没有第五条规则。` },
      maze_house: { kind: 'note', title: '在游魂房子的门上', from: '埃迪', body:
`四盏灯笼把帘子封着。每个角落一盏。

这栋房子是往下走的路。最后一条往下走的路。

我们在另一边见。——E.` },
      maze_fruit: { kind: 'memory', title: '糖果——一段记忆', body:
`莉莉第一次拿到糖果奖励的时候，叫得太大声，沃尔特把咖啡都打翻了。

“爸爸！糖果！我拿到糖果了！”

从那以后，每个星期六他都给她投一枚硬币，整局都站在她身后，却一次也没告诉过她该往哪边走。` },
      ks_glitch1: { kind: 'wall', title: '悬在半空中的破碎字符', body:
`L̷E̵V̶E̸L̴ ̶2̵5̴6̸
R̴I̸G̶H̵T̵ ̷H̸A̵L̷F̴:
̶N̸O̵T̵ ̷F̵O̷U̶N̸D̷` },
      ks_glitch2: { kind: 'wall', title: '一个损坏的存档', body:
`SAVE DATA
PLAYER 1 (04/17/87 03:16): S̷A̶M̸ — LEFT GAME
PLAYER 1 (03/03/92): W̶L̸T̵ (HUNGRY)
HAUNTS: D̵A̸N R̴O̷S N̷E̵L T̸O̵B
GUESTS: E̶D̵D
PLAYER 1: S̷A̶M̸ — CONTINUE?` },
      ks_walt8: { kind: 'letter', title: '沃尔特的最后一封信', from: 'W.（我想那是我的名字）', date: '无法计数的一天', body:
`致抵达核心的人。

插头就在这里。从里面拔掉，不算谋杀，而是结束。GAME OVER。所有还是自己的人，都能回家。

但一双手拔不动它。这个游戏开始时是五只手握着摇杆。结束时也要五只手。那四个人必须记起自己是谁，否则他们的手只是光。

我进来的第一个晚上就试过一个人拔。游戏把那当成了一步操作，让我成了它的玩家。我现在就是这个。

3:16 的时候，有一只手松开了。从那以后，游戏一直在等那只手。

告诉诺拉我很抱歉。告诉露丝她是对的。告诉那张榜，留着莉莉的分数。

——W.` },
      ks_eddie: { kind: 'note', title: '钉在 EXIT 旁边的一张纸条', from: '埃迪', body:
`一个进，一个出。

我第一个星期就找到了这扇门。外面已经过了一年半。在这里面，感觉就像一个很长很长的夜晚。

对不起，孩子。` },
    },
    obj: {
      maze_pellets: '拿走四个角落的灯笼（{n}/4）',
      maze_house: '进入游魂的房子',
      ks_core: '抵达坏掉那一侧的核心',
      ks_choice: '选择：EXIT 门，还是插头',
    },
    mono: {
      maze_start: '这是……游戏本身。我在它里面。',
      maze_rules: '谁吃星星？我。',
      maze_house: '帘子落下了。房子里面有一扇门。',
      ks_start: '右边……坏掉了。字母悬在半空中。',
      ks_core: '核心。这里有一个巨大的插头。机台的插头。从里面看。',
      ks_exit: 'EXIT。这次是真的。我感觉到风了。',
      ks_plugTry: '拔不动。两只手不够。要五只。',
      ks_plugReady: '四团彩色的光来到我身边。红、紫、青、琥珀。',
    },
    lines: {
      maze_portal: '下到那个无法计数的关卡',
      maze_fruitTake: '拿走糖果',
      ks_plug: '拔掉插头',
      ks_plugTry: '试着拔掉插头',
      ks_exitGo: '走出 EXIT',
      ks_exitHold: '为埃迪扶住门',
      ks_missing: '（还缺：{names}）',
    },
    radio: {
      maze_start: [
        ['eddie', '就是这里了。第二百五十五关。坏掉的那一关之前的最后一张棋盘。'],
        ['eddie', '拿下四个角。我在底下等你。'],
      ],
      ks_start: [
        ['eddie', '萨姆。我在这儿。不是在对讲机里。就在这儿。右边的门旁边。'],
        ['eddie', '来找我。求你了。'],
      ],
      ks_plea: [
        ['eddie', '那是真的出口。风、雨、前街。家。'],
        ['eddie', '它放一个人出去，留一个人在里面。我第一个星期就找到了它。从那以后我一直站在它旁边。'],
        ['sam', '你本来打算让我开门，然后你自己走出去。'],
        ['eddie', '霍普十五个月大了，萨姆。我一次都没抱过她。[他的声音哽住了。] 我不是求你原谅我。我是求你扶住这扇门。'],
      ],
      ks_pleaTrust: [
        ['eddie', '那是真的出口。风、雨、前街。家。'],
        ['eddie', '我在汽车旅馆跟你说过我不会开口。所以我不开口。'],
        ['sam', '但你想。'],
        ['eddie', '每一秒都想。[长长地吸了一口气。] 先去核心，萨姆。如果还有别的办法，就在那儿。如果没有……我还会站在这里。'],
      ],
    },
  });
})(typeof window !== 'undefined' ? window : globalThis);
