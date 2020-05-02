import * as React from 'react';
import { IGameArgs } from '../../components/App/Game/GameBoardWrapper';
import { GameLayout } from '../../components/App/Game/GameLayout';
import { Ctx } from 'boardgame.io';
import { IG } from './game';

interface IBoardProps {
  G: IG;
  ctx: Ctx;
  moves: any;
  playerID: string;
  gameArgs?: IGameArgs;
}

export class Board extends React.Component<IBoardProps, {}> {
  render() {
    const players = this.props.playerID ? [this.props.gameArgs.players.find(p => `${p.playerID}` === this.props.playerID)] : this.props.gameArgs.players;

    return (
      <GameLayout
        gameArgs={this.props.gameArgs}> 
        {players.map((player) => (
          <div key={player.playerID}>
            <h2>Hello {player.playerID}!</h2>
            <pre>{JSON.stringify(this.props.gameArgs, null, 2)}</pre>
          </div>
        ))}
      </GameLayout>
    );
  }
}
