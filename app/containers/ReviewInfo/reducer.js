import { fromJS } from 'immutable';
import {
  TOGGLE_INFO_BAR,
  TOGGLE_INFO_PANELS,
  TOGGLE_NEW_SYNONYM_PANEL,
  TOGGLE_INFO_DEPTH,
  MAX_INFO_DEPTH,
} from './constants';

/**
 * Rotates through numbers without going above max depth
 * @param  {Number} [level=1]
 * @return {Number} Previous level incremented by 1 || 1 if above max depth
 */
const getRotatedLevel = (level = 1) => {
  const newLevel = level + 1;
  return newLevel > MAX_INFO_DEPTH ? 1 : newLevel;
};

export const reviewInfoInitialState = fromJS({
  toggleBarVisible: false,
  panelsVisible: false,
  newSynonymPanelVisible: false,
  detailLevel: 1, /* TODO: set level based on settings + localStorage */
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
      const isVisible = state.get('panelsVisible');
      const showState = state.set('panelsVisible', true).set('newSynonymPanelVisible', false);
      if (show) return showState;
      if (hide || isVisible) return state.set('panelsVisible', false);
      return showState;
    }
    case TOGGLE_NEW_SYNONYM_PANEL: {
      const { show, hide } = action.payload;
      const isVisible = state.get('newSynonymPanelVisible');
      const showState = state.set('newSynonymPanelVisible', true).set('panelsVisible', false);
      if (show) return showState;
      if (hide || isVisible) return state.set('newSynonymPanelVisible', false);
      return showState;
    }
    case TOGGLE_INFO_DEPTH: {
      if (action.payload.level <= MAX_INFO_DEPTH) return state.set('detailLevel', action.payload.level);
      return state.set('detailLevel', getRotatedLevel(state.get('detailLevel')));
    }
    default:
      return state;
  }
}

export default reviewInfoReducer;
