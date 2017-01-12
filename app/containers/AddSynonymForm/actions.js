
import {
  LOAD_JISHODATA,
  LOAD_JISHODATA_SUCCESS,
  LOAD_JISHODATA_ERROR,
  ADD_SYNONYM,
  ADD_SYNONYM_SUCCESS,
  ADD_SYNONYM_ERROR,
  REMOVE_SYNONYM,
  REMOVE_SYNONYM_ERROR,
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

export function addSynonymSuccess(message) {
  return {
    type: ADD_SYNONYM_SUCCESS,
    payload: message,
  };
}

export function addSynonymError(error) {
  return {
    type: ADD_SYNONYM_ERROR,
    payload: error,
  };
}

export function removeSynonym(id) {
  return {
    type: REMOVE_SYNONYM,
    payload: id,
  };
}

export function removeSynonymError(error) {
  return {
    type: REMOVE_SYNONYM_ERROR,
    payload: error,
  };
}
