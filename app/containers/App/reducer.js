import { Record, Map } from 'immutable';
import { UserProfileRecord, SessionRecord } from 'shared/models';
import * as storageTypes from 'redux-storage';
import types from './constants';
import reviewTypes from 'containers/ReviewSession/constants';
import { add, subtract, getDecreasedStreak } from 'containers/ReviewSession/utils';

const StateRecord = Record({
  loading: true,
  error: false,
  token: '',
  user: new UserProfileRecord(),
  reviewCount: 0,
  reviews: new Map(),
  session: new SessionRecord(),
});

// The initial state of the App
export const initialState = new StateRecord();

function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.GLOBAL.UPDATE:
      return state.mergeDeep(action.payload.globalState);

    case types.AUTH.LOGIN.SUCCESS:
      return state.merge({ token: action.payload.token });

    case types.USER.LOAD.REQUEST:
      return state.merge({
        loading: action.payload.loading.indicate,
        error: false,
      });

    case types.USER.LOAD.SUCCESS:
      return state.mergeDeep({
        loading: false,
        user: action.payload.data,
      });

    case types.USER.LOAD.FAILURE:
      return state.merge({
        loading: false,
      });

    case types.REVIEWS.LOAD.SUCCESS: {
      const { total, ids, reviews } = action.payload.data;
      const mergedQueue = state.session.queue
        .toList().concat(ids).toSet()
        .subtract(state.session.complete, [state.session.currentId]);
      const mergedReviews = state.reviews.merge(reviews);
      return state
        .set('reviews', mergedReviews)
        .mergeIn(['session'], {
          total,
          queue: mergedQueue,
        });
    }

    case reviewTypes.CURRENT.SET_NEW: {
      const queueList = state.session.queue.toList();
      const sampleIndex = Math.floor(Math.random() * queueList.size);
      return state.mergeIn(['session'], {
        currentId: queueList.get(sampleIndex),
        queue: queueList.delete(sampleIndex).toSet(),
      });
    }

    case reviewTypes.CURRENT.ADD_TO.QUEUE:
      return state.mergeIn(['session', 'queue'], [state.session.currentId]);

    case reviewTypes.CURRENT.ADD_TO.COMPLETE:
      return state.mergeIn(['session', 'complete'], [state.session.currentId]);

    case reviewTypes.CURRENT.ADD_TO.CORRECT:
      return state.mergeIn(['session', 'correct'], [state.session.currentId]);

    case reviewTypes.CURRENT.ADD_TO.INCORRECT:
      return state.mergeIn(['session', 'incorrect'], [state.session.currentId]);

    case reviewTypes.CURRENT.REMOVE_FROM.QUEUE:
      return state.mergeIn(['session'], { queue: state.session.queue.subtract([state.session.currentId]) });

    case reviewTypes.CURRENT.REMOVE_FROM.COMPLETE:
      return state.mergeIn(['session'], { complete: state.session.complete.subtract([state.session.currentId]) });

    case reviewTypes.CURRENT.REMOVE_FROM.CORRECT:
      return state.mergeIn(['session'], { correct: state.session.correct.subtract([state.session.currentId]) });

    case reviewTypes.CURRENT.REMOVE_FROM.INCORRECT:
      return state.mergeIn(['session'], { incorrect: state.session.incorrect.subtract([state.session.currentId]) });

    case reviewTypes.CURRENT.SYNONYM.ADD: {
      const reviewId = `${action.payload.synonym.review}`; // needs to be string for reviews.get()
      const synonymList = state.reviews.get(reviewId).vocabulary.synonyms;
      const newSynonyms = synonymList.concat([action.payload.synonym]);
      return state.updateIn(['reviews', reviewId, 'vocabulary', 'synonyms'], () => newSynonyms);
    }

    case reviewTypes.CURRENT.SYNONYM.REMOVE: {
      const reviewId = `${action.payload.synonym.review}`; // needs to be string for reviews.get()
      const synonymSet = state.reviews.get(reviewId).vocabulary.synonyms.toSet();
      const newSynonyms = synonymSet.subtract([action.payload.synonym]).toList();
      return state.updateIn(['reviews', reviewId, 'vocabulary', 'synonyms'], () => newSynonyms);
    }

    case reviewTypes.CURRENT.STREAK.INCREASE: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.updateIn(['session', 'streak'], add(1)));
    }

    case reviewTypes.CURRENT.STREAK.DECREASE: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.updateIn(['session', 'streak'], getDecreasedStreak));
    }

    case reviewTypes.CURRENT.STREAK.REVERT: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.setIn(['session', 'streak'], current.history.streak));
    }

    case reviewTypes.CURRENT.CORRECT.INCREASE: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.updateIn(['session', 'correct'], add(1)));
    }

    case reviewTypes.CURRENT.CORRECT.DECREASE: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.updateIn(['session', 'correct'], subtract(1)));
    }

    case reviewTypes.CURRENT.INCORRECT.INCREASE: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.updateIn(['session', 'incorrect'], add(1)));
    }

    case reviewTypes.CURRENT.IGNORED.INCREASE: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.updateIn(['session', 'ignored'], add(1)));
    }

    case reviewTypes.CURRENT.INCORRECT.DECREASE: {
      const id = state.session.currentId;
      const current = state.reviews.get(id);
      return state.setIn(['reviews', id], current.updateIn(['session', 'incorrect'], subtract(1)));
    }

    case storageTypes.LOAD:
      console.info('%cStorage loaded!', 'color: blue'); // eslint-disable-line no-console
      return state;

    case storageTypes.SAVE:
      console.info('%cStorage saved!', 'color: blue'); // eslint-disable-line no-console
      return state;

    default:
      return state;
  }
}

export default appReducer;
