const Thumbnail = require('./media/thumbnail.png?lqip-colors');
import { GameMode } from '../../components/App/Game/GameModePicker';
import { IGameDef } from '../../games';
import instructions from './instructions.md';

export const myjoGameDef: IGameDef = {
  code: 'myjo',
  name: 'Myjo Game',
  imageURL: Thumbnail,
  modes: [{ mode: GameMode.OnlineFriend }, { mode: GameMode.LocalFriend }],
  minPlayers: 2,
  maxPlayers: 2,
  description: 'Similar to Skyjo!',
  descriptionTag: '',
  instructions: {
    videoId: 'yFrAN-LFZRU',
    text: instructions,
  },
  config: () => import('./config'),
};
