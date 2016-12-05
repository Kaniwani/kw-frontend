import { fromJS } from 'immutable';


import selectHomeDomain, {
  // selectUsername,
} from '../selectors';

describe('selectHomeDomain', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      user: {},
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHomeDomain()(mockedState)).toEqual(homeState);
  });
});

// describe('selectUsername', () => {
//   const usernameSelector = selectUsername();
//   it('should select the username', () => {
//     const username = 'mxstbr';
//     const mockedState = fromJS({
//       home: {
//         username,
//       },
//     });
//     expect(usernameSelector(mockedState)).toEqual(username);
//   });
// });
