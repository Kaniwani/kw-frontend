import { fromJS } from 'immutable';
import {
  TOGGLE_INFO_BAR,
  TOGGLE_INFO_PANELS,
  TOGGLE_NEW_SYNONYM_PANEL,
  TOGGLE_INFO_DEPTH,
} from './constants';

export const reviewInfoInitialState = fromJS({
  toggleBarVisible: false,
  panelsVisible: false,
  newSynonymPanelVisible: false,
  fullDetails: false,
});

function reviewInfoReducer(state = reviewInfoInitialState, action) {
  switch (action.type) {
    case TOGGLE_INFO_BAR: {
      const { show, hide } = action.payload;
      if (show) return state.set('toggleBarVisible', true);
      if (hide) return state.set('toggleBarVisible', false);
      return state.set('toggleBarVisible', !state.get('toggleBarVisible'));
    }
    case TOGGLE_INFO_PANELS: {
      const { show, hide } = action.payload;
      if (show) return state.set('panelsVisible', true);
      if (hide) return state.set('panelsVisible', false);
      return state.set('panelsVisible', !state.get('panelsVisible'));
    }
    case TOGGLE_NEW_SYNONYM_PANEL: {
      const { show, hide } = action.payload;
      if (show) return state.set('newSynonymPanelVisible', true);
      if (hide) return state.set('newSynonymPanelVisible', false);
      return state.set('newSynonymPanelVisible', !state.get('newSynonymPanelVisible'));
    }
    case TOGGLE_INFO_DEPTH: {
      const { show, hide } = action.payload;
      if (show) return state.set('fullDetails', true);
      if (hide) return state.set('fullDetails', false);
      return state.set('fullDetails', !state.get('fullDetails'));
    }
    default:
      return state;
  }
}

export default reviewInfoReducer;
