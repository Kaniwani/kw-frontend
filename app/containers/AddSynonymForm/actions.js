
import {
  LOAD_JISHODATA,
  LOAD_JISHODATA_SUCCESS,
  LOAD_JISHODATA_ERROR,
} from './constants';

/**
 * Load the jishoData, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_JISHODATA
 */
export function loadJishoData(keyword) {
  return {
    type: LOAD_JISHODATA,
    payload: keyword,
  };
}

/**
 * Dispatched when the review data is loaded by the request saga
 *
 * @param  {object} jishoData The review data
 * @return {object} An action object with a type of LOAD_JISHODATA_SUCCESS passing the review data
 */
export function jishoDataLoaded(data) {
  return {
    type: LOAD_JISHODATA_SUCCESS,
    payload: data,
  };
}

/**
 * Dispatched when loading the jishoData fails
 *
 * @param  {object} error The error
 * @return {object} An action object with a type of LOAD_JISHODATA_ERROR passing the error
 */
export function jishoDataLoadingError(error) {
  return {
    type: LOAD_JISHODATA_ERROR,
    payload: error,
  };
}
