import { IGameConfig } from '../index';
import { MyjoGame } from './game';
import { Board } from './board';

const config: IGameConfig = {
  bgioGame: MyjoGame,
  bgioBoard: Board,
  debug: true,
};

export default config;
