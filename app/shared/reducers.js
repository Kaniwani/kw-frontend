import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';

import app from 'containers/App/actions';

const initialState = {
  user: {
    loading: false,
  },
  lessons: {
    loading: false,
  },
  search: {
    loading: false,
    finished: false,
  },
  reviews: {
    loading: false,
  },
};

export default handleActions({
  [app.user.load.request]: (state) => update(state, { user: { loading: { $set: true } } }),
  [app.review.search.request]: (state) => update(state, {
    search: {
      loading: { $set: true },
      finished: { $set: false },
    },
  }),
  [app.review.search.success]: (state, { payload }) => update(state, {
    search: {
      loading: { $set: payload.loading },
      finished: { $set: payload.finished },
    },
  }),
  [app.reviews.queue.load.request]: (state) => update(state, { reviews: { loading: { $set: true } } }),
  [app.lessons.queue.load.request]: (state) => update(state, { lessons: { loading: { $set: true } } }),
  [combineActions(
    app.user.load.success,
    app.user.load.failure,
  )]: (state) => update(state, { user: { loading: { $set: false } } }),
  [combineActions(
    app.reviews.queue.load.success,
    app.reviews.queue.load.failure,
  )]: (state) => update(state, { reviews: { loading: { $set: false } } }),
  [combineActions(
    app.lessons.queue.load.success,
    app.lessons.queue.load.failure,
  )]: (state) => update(state, { lessons: { loading: { $set: false } } }),
}, initialState);
