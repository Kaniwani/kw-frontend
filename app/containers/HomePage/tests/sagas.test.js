/**
 * Tests for HomePage sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getUserData, getUserDataWatcher, kwUserData } from '../sagas';

import { LOAD_USERDATA } from 'containers/App/constants';
import { userDataLoaded, userDataLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

const username = 'mxstbr';

describe('getUserData Saga', () => {
  let getUserDataGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getUserDataGenerator = getUserData();

    const selectDescriptor = getUserDataGenerator.next().value;
    expect(selectDescriptor).toEqual(select(selectUsername()));

    const requestURL = `https://api.github.com/users/${username}/userData?type=all&sort=updated`;
    const callDescriptor = getUserDataGenerator.next(username).value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the userDataLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First userData',
    }, {
      name: 'Second userData',
    }];
    const putDescriptor = getUserDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(userDataLoaded(response, username)));
  });

  it('should call the userDataLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getUserDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(userDataLoadingError(response)));
  });
});

describe('getUserDataWatcher Saga', () => {
  const getUserDataWatcherGenerator = getUserDataWatcher();

  it('should watch for LOAD_USERDATA action', () => {
    const takeDescriptor = getUserDataWatcherGenerator.next().value;
    expect(takeDescriptor).toEqual(fork(takeLatest, LOAD_USERDATA, getUserData));
  });
});

describe('kwUserDataSaga Saga', () => {
  const kwUserDataSaga = kwUserData();

  let forkDescriptor;

  it('should asyncronously fork getUserDataWatcher saga', () => {
    forkDescriptor = kwUserDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getUserDataWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = kwUserDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getUserDataWatcher saga',
     function* kwUserDataSagaCancellable() {
      // reuse open fork for more integrated approach
       forkDescriptor = kwUserDataSaga.next(put(LOCATION_CHANGE));
       expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
     }
   );
});
