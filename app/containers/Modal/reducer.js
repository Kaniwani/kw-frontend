import { fromJS } from 'immutable';
import {
  SHOW_MODAL,
  HIDE_MODAL,
} from './constants';

export const modalInitialState = fromJS({
  isVisible: false,
  modalType: null,
  contentProps: {},
});

export function modalReducer(state = modalInitialState, action = {}) {
  switch (action.type) {
    case SHOW_MODAL:
      return state.merge(action.payload).set('isVisible', true);
    // TODO: add UPDATE_MODAL action, separate from SHOW_MODAL which should only set visibility really
    case HIDE_MODAL:
      return state.set('isVisible', false);
    default:
      return state;
  }
}

export default modalReducer;
