
import {
  LOAD_JISHODATA,
  LOAD_JISHODATA_SUCCESS,
  LOAD_JISHODATA_ERROR,
  ADD_SYNONYM,
  ADD_SYNONYM_ERROR,
} from './constants';

export function loadJishoData(keyword) {
  return {
    type: LOAD_JISHODATA,
    payload: keyword,
  };
}

export function jishoDataLoaded(data) {
  return {
    type: LOAD_JISHODATA_SUCCESS,
    payload: data,
  };
}

export function jishoDataLoadingError(error) {
  return {
    type: LOAD_JISHODATA_ERROR,
    payload: error,
  };
}

export function addSynonym(data) {
  return {
    type: ADD_SYNONYM,
    payload: data,
  };
}


export function addSynonymError(error) {
  return {
    type: ADD_SYNONYM_ERROR,
    payload: error,
  };
}
