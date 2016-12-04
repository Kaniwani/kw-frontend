import { fromJS } from 'immutable';

import {
  selectGlobal,
  selectLoading,
  selectError,
  selectUser,
  selectLocationState,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('selectLoading', () => {
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(selectLoading(mockedState)).toEqual(loading);
  });
});

describe('selectError', () => {
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(selectError(mockedState)).toEqual(error);
  });
});

describe('selectUser', () => {
  it('should select the user', () => {
    const user = fromJS({});
    const mockedState = fromJS({
      global: {
        user,
      },
    });
    expect(selectUser(mockedState)).toEqual(user);
  });
});

describe('selectLocationState', () => {
  it('should select the route as a plain JS object', () => {
    const route = fromJS({
      locationBeforeTransitions: null,
    });
    const mockedState = fromJS({
      route,
    });
    expect(selectLocationState()(mockedState)).toEqual(route.toJS());
  });
});
