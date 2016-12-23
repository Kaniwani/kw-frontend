import {
  TOGGLE_INFO_BAR,
  TOGGLE_INFO_PANELS,
  TOGGLE_NEW_SYNONYM_PANEL,
  TOGGLE_INFO_DEPTH,
} from './constants';


export function toggleInfoBar({ show, hide } = {}) {
  return {
    type: TOGGLE_INFO_BAR,
    payload: {
      show,
      hide,
    },
  };
}

export function toggleInfoPanels({ show, hide } = {}) {
  return {
    type: TOGGLE_INFO_PANELS,
    payload: {
      show,
      hide,
    },
  };
}

export function toggleNewSynonymPanel({ show, hide } = {}) {
  return {
    type: TOGGLE_NEW_SYNONYM_PANEL,
    payload: {
      show,
      hide,
    },
  };
}

export function toggleInfoDepth({ level } = {}) {
  return {
    type: TOGGLE_INFO_DEPTH,
    payload: {
      level,
    },
  };
}
