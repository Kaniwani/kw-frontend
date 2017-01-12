import * as VOCAB from './constants';

export function getLevels() {
  return {
    type: VOCAB.LOAD_LEVELS,
  };
}
export function levelsLoaded(data) {
  return {
    type: VOCAB.LOAD_LEVELS_SUCCESS,
    payload: data,
  };
}
export function levelsLoadingError(error) {
  return {
    type: VOCAB.LOAD_LEVELS_ERROR,
    payload: error,
  };
}

export function getItems(level) {
  return {
    type: VOCAB.LOAD_ITEMS,
    payload: level,
  };
}
export function itemsLoaded(data) {
  return {
    type: VOCAB.LOAD_ITEMS_SUCCESS,
    payload: data,
  };
}
export function itemsLoadingError(error) {
  return {
    type: VOCAB.LOAD_ITEMS_ERROR,
    payload: error,
  };
}

export function getItem(id) {
  return {
    type: VOCAB.LOAD_ITEM,
    payload: id,
  };
}
export function itemLoaded(data) {
  return {
    type: VOCAB.LOAD_ITEM_SUCCESS,
    payload: data,
  };
}
export function itemLoadingError(error) {
  return {
    type: VOCAB.LOAD_ITEM_ERROR,
    payload: error,
  };
}
