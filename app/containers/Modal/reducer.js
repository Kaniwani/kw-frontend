import { fromJS } from 'immutable';
import {
  HIDE_MODAL,
  SHOW_MODAL,
  defaultSettings,
} from './constants';

export const initialState = fromJS({
  isVisible: false,
  modalType: null,
  modalProps: {},
  ...defaultSettings,
});

export function modalReducer(state = initialState, action = {}) {
  switch (action.type) {
    case HIDE_MODAL:
      return state.set('isVisible', false);
    case SHOW_MODAL:
      return state.merge(action.payload).set('isVisible', true);
    default:
      return state;
  }
}

export default modalReducer;
