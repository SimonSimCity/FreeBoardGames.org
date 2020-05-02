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
    return (
      <GameLayout
        gameArgs={this.props.gameArgs}> 
        <h2>Hello world!</h2>
        <pre>{JSON.stringify(this.props.gameArgs, null, 2)}</pre>
      </GameLayout>
    );
  }
}
