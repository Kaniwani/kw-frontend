import React, { Fragment } from 'react';
import { createLogic } from 'redux-logic';
import { hasToken, clearToken } from 'common/utils/auth';
import { camelCaseKeys } from 'common/utils/caseKeys';

import { app } from 'common/actions';
import user from './actions';
import { selectUserShouldLoad } from 'features/user/selectors';
import notify from 'features/notifications/actions';
import A from 'common/components/A';

export const loadUserLogic = createLogic({
  type: user.load.request,
  warnTimeout: 10000,
  validate({ getState, action }, allow, reject) {
    if (!!action.payload.force || (hasToken() && selectUserShouldLoad(getState()))) {
      allow(action);
    } else {
      reject();
    }
  },
  process({ api, serializers: { serializeUserResponse } }, dispatch, done) {
    api.user
      .fetch()
      .then((res) => {
        dispatch(user.load.success(serializeUserResponse(res)));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, {}));
        dispatch(user.load.failure(err));
        if (err.status === 401) {
          dispatch(
            notify.warning({
              content: 'Your authentication token is no longer valid. Please sign in again.',
              duration: 5000,
            })
          );
          dispatch(user.logout());
        }
        done();
      });
  },
});

export const quizCountsLogic = createLogic({
  type: user.quizCounts.request,
  warnTimeout: 10000,
  validate({ action }, allow, reject) {
    hasToken() ? allow(action) : reject();
  },
  process({ api }, dispatch, done) {
    api.user
      .fetchQuizCounts()
      .then((res) => {
        dispatch(user.quizCounts.success(camelCaseKeys(res)));
        done();
      })
      .catch((err) => {
        dispatch(app.captureError(err, {}));
        dispatch(user.quizCounts.failure(err));
        if (/^5/.test(err.status)) {
          dispatch(
            notify.warning({
              content:
                'The server failed to return user details. It may be down for maintenance or just under heavy load. Please try again in a short while.',
            })
          );
        } else {
          dispatch(
            notify.warning({
              content:
                'Unable to load quiz counts from server. You may be experiencing connection problems.',
              duration: 5000,
            })
          );
        }
        done();
      });
  },
});

export const checkApiValidLogic = createLogic({
  type: user.load.success,
  process({ action: { payload: { profile } } }, dispatch, done) {
    if (profile.apiValid === false) {
      dispatch(
        notify.warning({
          content: (
            <Fragment>
              <p>Your WaniKani Api Key is invalid!</p>
              <p>
                Please visit the <A to="/settings">settings</A> page to update it.
              </p>
            </Fragment>
          ),
        })
      );
    }
    done();
  },
});

export const logoutLogic = createLogic({
  type: user.logout,
  process({ history }) {
    clearToken();
    history.push('/welcome');
  },
});

export default [loadUserLogic, quizCountsLogic, checkApiValidLogic, logoutLogic];
