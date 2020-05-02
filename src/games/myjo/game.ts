import { Ctx } from 'boardgame.io';

export interface PlayerCard {
  value: number,
  flipped: boolean,
}

export interface IG {
  cards: Array<Array<PlayerCard>>,
  deck: Array<number>,
  discardedCards: Array<number>,
  activeCard: number,
}

function TakeCard(G : IG, ctx: Ctx, playerId: number) {
}

function ChooseToDrawCard(G : IG, ctx: Ctx, playerId: number) {
}

function DrawnCard(G : IG, ctx: Ctx, playerId: number) {
  G.activeCard
}

function ChooseToFlipCard(G : IG, ctx: Ctx, playerId: number) {
}

function SwapCard(G : IG, ctx: Ctx, playerId: number, cardId: number) {
  const card = G.activeCard;
  G.activeCard = G.cards[playerId][cardId].value;
  G.cards[playerId][cardId].value = card;
  G.cards[playerId][cardId].flipped = true;
}

function FlipCard(G : IG, ctx: Ctx, playerId: number, cardId: number) {
  G.cards[playerId][cardId].flipped = true;
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
      cards: Array(ctx.numPlayers).fill('').map(() => Array(12).fill('').map(() => ({ value: deck.pop(), flipped: false }))),
      deck,
      discardedCards: [deck.pop()],
      activeCard: null,
    };
  },

  phases: {
    start: {
      start: true,
      moves: { FlipCard },
      // endIf: (G : IG) => G.cards.every(playerCards => playerCards.filter(card => card.flipped).length >= 2),
      next: null,
    },
  },

  turn: {
    stages: {
      pickOrDraw: {
        moves: { TakeCard, ChooseToDrawCard },
      },

      drawOrFlip: {
        moves: { DrawnCard, ChooseToFlipCard },
      },

      swapCard: {
        moves: { SwapCard },
      },

      flip: {
        moves: { FlipCard },
      },

      play: {
        moves: {
          plusone(G: IG) {
            // return { count: G.count + 1 };
          },
        },
      },
    },
  },

  flow: {
    movesPerTurn: 1,
  },
};
