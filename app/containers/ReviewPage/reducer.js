import { Record } from 'immutable';
import { AnswerRecord, PanelsRecord } from 'shared/models';
import { PANELS } from 'shared/constants';
import { getRotatedLevel } from 'containers/ReviewSession/utils';
import types from 'containers/ReviewSession/constants';

const StateRecord = new Record({
  loading: false,
  error: false,
  answer: new AnswerRecord(),
  panels: new PanelsRecord(),
});

export const initialState = new StateRecord();

function reviewReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.CURRENT.SET_NEW:
      return state.setIn(['answer', 'focus'], true);
    case types.ANSWER.UPDATE:
    case types.ANSWER.INPUT:
    case types.ANSWER.MARK.CORRECT:
    case types.ANSWER.MARK.INCORRECT:
    case types.ANSWER.MARK.VALID:
    case types.ANSWER.MARK.INVALID:
      return state.mergeIn(['answer'], action.payload.update);
    case types.ANSWER.RESET:
      return state.set('answer', new AnswerRecord());
    case types.PANELS.UPDATE:
      return state.mergeDeepIn(['panels'], action.payload.update);
    case types.PANELS.SHOW:
      return state.mergeIn(['panels'], { show: action.payload.name });
    case types.PANELS.HIDE:
      return state.mergeIn(['panels'], { show: PANELS.NONE });
    case types.PANELS.DETAIL.CYCLE:
      return state.mergeIn(['panels', 'info'], { detail: getRotatedLevel(state.panels.info.detail) });
    default:
      return state;
  }
}

export default reviewReducer;
