/**
 * Tests for HomePage sagas
 */

import expect from 'expect';
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { getUserData, getUserDataWatcher, userData } from '../sagas';

import { LOAD_USERDATA } from 'containers/App/constants';
import { userDataLoaded, userDataLoadingError } from 'containers/App/actions';

import request from 'utils/request';

describe('getUserData Saga', () => {
  let getUserDataGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getUserDataGenerator = getUserData();

    const requestURL = 'api/profiles';
    const callDescriptor = getUserDataGenerator.next().value;
    expect(callDescriptor).toEqual(call(request, requestURL));
  });

  it('should dispatch the userDataLoaded action if it requests the data successfully', () => {
    const response = {
      name: 'userData name',
    };
    const putDescriptor = getUserDataGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(userDataLoaded(response)));
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

describe('UserDataSaga Saga', () => {
  const UserDataSaga = userData();

  let forkDescriptor;

  it('should asyncronously fork getUserDataWatcher saga', () => {
    forkDescriptor = UserDataSaga.next();
    expect(forkDescriptor.value).toEqual(fork(getUserDataWatcher));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = UserDataSaga.next();
    expect(takeDescriptor.value).toEqual(take(LOCATION_CHANGE));
  });

  it('should finally cancel() the forked getUserDataWatcher saga',
     function* UserDataSagaCancellable() {
      // reuse open fork for more integrated approach
       forkDescriptor = UserDataSaga.next(put(LOCATION_CHANGE));
       expect(forkDescriptor.value).toEqual(cancel(forkDescriptor));
     }
   );
});
