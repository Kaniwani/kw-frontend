import update from 'immutability-helper';
import appReducer from '../reducer';
import {
  loadRepos,
  reposLoaded,
  repoLoadingError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      currentUser: false,
      userData: {
        repositories: false,
      },
    };
  });

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual(state);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = update(state, {
      loading: { $set: true },
      error: { $set: false },
      userData: { repositories: { $set: false } },
    });

    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [{
      name: 'My Repo',
    }];
    const username = 'test';
    const expectedResult = update(state, {
      loading: { $set: false },
      currentUser: { $set: username },
      userData: { repositories: { $set: fixture } },
    });

    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(expectedResult);
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = { ...state, error: fixture, loading: false };

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(expectedResult);
  });
});
