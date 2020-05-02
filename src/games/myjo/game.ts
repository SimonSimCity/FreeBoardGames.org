import { Ctx } from 'boardgame.io';

export interface IG {
  count: number;
}

function TakeCard(G : Object, ctx: Ctx) {
}

function ChooseToDrawCard(G : Object, ctx: Ctx) {
}

function DrawnCard(G : Object, ctx: Ctx) {
}

function ChooseToFlipCard(G : Object, ctx: Ctx) {
}

function ChooseCardToSwap(G : Object, ctx: Ctx) {
}

function ChooseCardToFlip(G : Object, ctx: Ctx) {
}

export const MyjoGame = {
  name: 'myjo',

  setup: (ctx : Ctx) => {
    const deck = ctx.random.Shuffle([
      ...Array(5).fill(-2),
      ...Array(10).fill(-1),
      ...Array(15).fill(0),
      ...Array(10).fill(1),
      ...Array(10).fill(2),
      ...Array(10).fill(3),
      ...Array(10).fill(4),
      ...Array(10).fill(5),
      ...Array(10).fill(6),
      ...Array(10).fill(7),
      ...Array(10).fill(8),
      ...Array(10).fill(9),
      ...Array(10).fill(10),
      ...Array(10).fill(11),
      ...Array(10).fill(12),
    ]);

    return {
      cards: Array(ctx.numPlayers).map(() => Array(12).map(() => deck.pop())),
      deck,
    };
  },

  phases: {
    pickOrDraw: {
      moves: { TakeCard, ChooseToDrawCard },
      start: true,
    },

    drawOrFlip: {
      moves: { DrawnCard, ChooseToFlipCard },
    },

    swapCard: {
      moves: { ChooseCardToSwap },
    },

    flip: {
      moves: { ChooseCardToFlip },
    },

    play: {
      moves: {
        plusone(G: IG) {
          return { count: G.count + 1 };
        },
      },
    },
  },

  flow: {
    movesPerTurn: 1,
  },
};
