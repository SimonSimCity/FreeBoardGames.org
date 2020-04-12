import Enzyme from 'enzyme';
import { GameModePicker, GameMode, IGameModeInfo } from './GameModePicker';
import { IGameDef } from 'games';

const GAME_DEF: IGameDef = {
  code: 'foocode',
  name: 'foo name',
  imageURL: { src: 'foo.jpg', 0: 'foo.jpg' },
  description: 'foo desc',
  descriptionTag: 'foo tag',
  instructions: {
    videoId: 'dQw4w9WgXcQ',
  },
  config: () => {
    return null as any;
  },
  minPlayers: 2,
  maxPlayers: 3,
  modes: [],
};

const ALL_GAME_MODES: IGameModeInfo[] = [
  { mode: GameMode.AI },
  { mode: GameMode.OnlineFriend },
  { mode: GameMode.LocalFriend },
];

let wrapper: Enzyme.ReactWrapper;

beforeEach(() => {
  wrapper = Enzyme.mount(<GameModePicker gameDef={GAME_DEF} />);
});

it('renders', () => {
  expect(wrapper.text()).toContain('Choose game mode');
});

it('should show all game modes', () => {
  wrapper.setProps({ gameDef: { ...GAME_DEF, modes: ALL_GAME_MODES } });
  const text = wrapper.text();
  expect(text).toContain('Online Friend');
  expect(text).toContain('Computer (AI)');
  expect(text).toContain('Local Friend');
});

it('should display error button', () => {
  wrapper.setProps({ gameDef: { ...GAME_DEF, modes: ALL_GAME_MODES } });
  wrapper.setState({ playButtonError: true });
  const button = wrapper.find('[data-testid="playButton"]').at(0);
  expect(button.text()).toEqual('Error');
});

it('should display loading button', () => {
  wrapper.setProps({ gameDef: { ...GAME_DEF, modes: ALL_GAME_MODES } });
  wrapper.setState({ playButtonDisabled: true });
  const button = wrapper.find('[data-testid="playButton"]').at(0);
  expect(button.text()).toEqual('Loading');
  expect(button.prop('disabled')).toBeTruthy();
});

// import React from 'react';
// import { GameModePicker, GameMode, IGameModeInfo } from './GameModePicker';
// import { IGameModeExtraInfoSlider, IGameModeExtraInfoDropdown } from './GameModePicker';

// import { IGameDef } from 'games';
// import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
// require('@testing-library/jest-dom/extend-expect');

// const GAME_DEF_TEST: IGameDef = {
//   code: 'foocode',
//   name: 'foo name',
//   imageURL: {src:'foo.jpg', 0:'foo.jpg'},
//   description: 'foo desc',
//   descriptionTag: 'foo tag',
//   instructions: {
//     videoId: 'dQw4w9WgXcQ',
//   },
//   config: () => {
//     return null as any;
//   },
//   minPlayers: 2,
//   maxPlayers: 3,
//   modes: [],
// };

// function getWrapper(modes: IGameModeInfo[]): RenderResult {
//   return render(<GameModePicker gameDef={{ ...GAME_DEF_TEST, modes }} />);
// }

// afterEach(cleanup);

// describe('Game Mode Picker', () => {
//   it('should show all 5 options and accept clicks', () => {
//     const modes: IGameModeInfo[] = [
//       { mode: GameMode.AI },
//       { mode: GameMode.OnlineFriend },
//       { mode: GameMode.LocalFriend },
//     ];
//     const wrapper = getWrapper(modes);
//     expect(wrapper.queryByText('Online Friend')).toBeInTheDocument();
//     expect(wrapper.queryByText('Computer (AI)')).toBeInTheDocument();
//     expect(wrapper.queryByText('Local Friend')).toBeInTheDocument();
//   });

//   it('should show option to select number of players', () => {
//     const modes: IGameModeInfo[] = [
//       {
//         mode: GameMode.OnlineFriend,
//       },
//     ];
//     const wrapper = getWrapper(modes);
//     expect(wrapper.queryByText('2 Players')).toBeInTheDocument();
//   });

//   // FIXME: various problems with this test
//   // it.only('should select 3 players', () => {
//   //   const modes: IGameModeInfo[] = [
//   //     {
//   //       mode: GameMode.OnlineFriend,
//   //     },
//   //   ];
//   //   const wrapper = getWrapper(modes);

//   //   const playButtonBeforeClick = wrapper.getByTestId('playButton');
//   //   expect(playButtonBeforeClick.getAttribute('href')).toEqual('/room/new/foocode/2');

//   //   // select dropdown
//   //   const twoPlayers = wrapper.getByText('2 Players');
//   //   fireEvent.click(twoPlayers);

//   //   // select 3 players
//   //   const threePlayers = wrapper.getByText('3 Players');
//   //   fireEvent.click(threePlayers);

//   //   const playButtonAfterClick = wrapper.getByTestId('playButton');
//   //   expect(playButtonAfterClick.getAttribute('href')).toEqual('/room/new/foocode/3');
//   // });

//   it('should show a slider', () => {
//     const modes: IGameModeInfo[] = [
//       {
//         mode: GameMode.AI,
//         extraInfo: { type: 'slider', min: 1, max: 8 } as IGameModeExtraInfoSlider,
//       },
//     ];
//     const wrapper = getWrapper(modes);
//     expect(wrapper.queryByRole('slider')).toBeInTheDocument();
//   });

//   it('should show a dropdown', () => {
//     const wrapper = makeDropdownWrapper();
//     expect(wrapper.queryAllByRole('menuitem').length).toEqual(2);
//     expect(wrapper.queryByText('Easy')).toBeInTheDocument();
//     expect(wrapper.queryByText('Hard')).toBeInTheDocument();
//   });

//   it('should have the correct dropdown defaults', async () => {
//     const wrapper = makeDropdownWrapper();
//     const playButton = wrapper.getByRole('button');
//     expect(playButton).toBeInTheDocument();
//     // expect(playButton.getAttribute('href')).toEqual('/g/foocode/AI/1');
//   });

//   it('it should be a functional dropdown', () => {
//     const wrapper = makeDropdownWrapper();
//     const easy = wrapper.queryAllByRole('menuitem')[0];
//     const hard = wrapper.queryAllByRole('menuitem')[1];

//     fireEvent.click(hard);
//     const afterHardClicked = wrapper.getByRole('button');
//     // expect(afterHardClicked.getAttribute('href')).toEqual('/g/foocode/AI/2');
//     expect(afterHardClicked).toBeInTheDocument();

//     fireEvent.click(easy);
//     const afterEasyClicked = wrapper.getByRole('button');
//     // expect(afterEasyClicked.getAttribute('href')).toEqual('/g/foocode/AI/1');
//     expect(afterEasyClicked).toBeInTheDocument();
//   });
// });

// function makeDropdownWrapper(): RenderResult {
//   const modes: IGameModeInfo[] = [
//     {
//       mode: GameMode.AI,
//       extraInfo: { type: 'dropdown', options: ['Easy', 'Hard'] } as IGameModeExtraInfoDropdown,
//     },
//   ];
//   const wrapper = render(<GameModePicker gameDef={{ ...GAME_DEF_TEST, modes }} />);
//   return wrapper;
// }
