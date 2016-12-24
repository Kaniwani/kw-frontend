import { fromJS } from 'immutable';
import {
  TOGGLE_INFO_PANELS,
  TOGGLE_NEW_SYNONYM_PANEL,
  TOGGLE_INFO_DEPTH,
  MAX_DETAIL_DEPTH,
} from './constants';

import { getRotatedLevel } from './utils';

export const reviewInfoInitialState = fromJS({
  panelsVisible: false,
  newSynonymPanelVisible: false,
  detailLevel: 1, /* TODO: set level based on settings + localStorage */
});

function reviewInfoReducer(state = reviewInfoInitialState, action) {
  switch (action.type) {
    case TOGGLE_INFO_PANELS: {
      const { show, hide } = action.payload;
      const isVisible = state.get('panelsVisible');
      // TODO: use a saga watcher instead to hide synonympanel via action?
      const showState = state.set('panelsVisible', true).set('newSynonymPanelVisible', false);
      if (show) return showState;
      if (hide || isVisible) return state.set('panelsVisible', false);
      return showState;
    }
    case TOGGLE_NEW_SYNONYM_PANEL: {
      const { show, hide } = action.payload;
      const isVisible = state.get('newSynonymPanelVisible');
      // TODO: use a saga watcher instead to hide infopanels via action?
      const showState = state.set('newSynonymPanelVisible', true).set('panelsVisible', false);
      if (show) return showState;
      if (hide || isVisible) return state.set('newSynonymPanelVisible', false);
      return showState;
    }
    case TOGGLE_INFO_DEPTH: {
      if (action.payload.level <= MAX_DETAIL_DEPTH) return state.set('detailLevel', action.payload.level);
      return state.set('detailLevel', getRotatedLevel(state.get('detailLevel')));
    }
    default:
      return state;
  }
}

export default reviewInfoReducer;
