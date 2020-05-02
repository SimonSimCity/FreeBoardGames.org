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

function SwapCard(G: IG, ctx: Ctx, playerId: number, cardId: number) {
  const card = G.activeCard;
  G.activeCard = G.cards[playerId][cardId].value;
  G.cards[playerId][cardId].value = card;
  G.cards[playerId][cardId].flipped = true;
}

function DiscardCard(G: IG) {
  G.discardedCards.push(G.activeCard);
  G.activeCard = null;
}

function FlipCard(G: IG, ctx: Ctx, playerId: number, cardId: number) {
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
      moves: {
        FlipCardStart: (G: IG, ctx: Ctx, playerId: number, cardId: number) => {
          if (G.cards[playerId].filter(card => card.flipped).length < 2) {
            FlipCard(G, ctx, playerId, cardId);
          }
        },
      },
      endIf: (G : IG) => G.cards.every(playerCards => playerCards.filter(card => card.flipped).length >= 2),
      next: null,
    },
  },

  turn: {
    onBegin: (G: IG, ctx: Ctx) => { if (ctx.phase === null) { ctx.events.setStage('takeOrDraw'); } },

    stages: {
      takeOrDraw: {
        moves: {
          ChooseDiscardedCard: (G: IG, ctx: Ctx) => {
            G.activeCard = G.discardedCards.pop();
            ctx.events.setStage('swapCard');
          },
          DrawCard: (G: IG, ctx: Ctx) => {
            G.activeCard = G.deck.pop();
            ctx.events.setStage('takeOrFlip');
          },
        },
      },

      takeOrFlip: {
        moves: {
          TakeDrawnCard: (G: IG, ctx: Ctx) => {
            ctx.events.setStage('swapCard');
          },
          GoToFlipCard: (G: IG, ctx: Ctx) => {
            DiscardCard(G);
            ctx.events.setStage('flipCard');
          },
        },
      },

      swapCard: {
        moves: {
          SwapCard: (G: IG, ctx: Ctx, playerId: number, cardId: number) => {
            SwapCard(G, ctx, playerId, cardId);
            DiscardCard(G);
          },
        },
      },

      flipCard: {
        moves: { FlipCard },
      },
    },
  },

  flow: {
    movesPerTurn: 1,
  },
};
