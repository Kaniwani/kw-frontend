import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localforage';
import immutableEngineFilter from 'redux-storage-decorator-immutable-filter';
import debounce from 'redux-storage-decorator-debounce';

import {
  PERSISTENCE_ACTION_WHITELIST,
  PERSISTENCE_STATE_WHITELIST,
  PERSISTENCE_STATE_BLACKLIST,
} from 'shared/constants';

const filteredEngine = immutableEngineFilter(
  createEngine('kwStorage', { name: 'kaniwani' }),
  PERSISTENCE_STATE_WHITELIST,
  PERSISTENCE_STATE_BLACKLIST,
);

const FIFTEEN_SECONDS = 15000;

export const engine = debounce(filteredEngine, FIFTEEN_SECONDS);
export const storageMiddleware = storage.createMiddleware(engine, [], PERSISTENCE_ACTION_WHITELIST);
/**
 * Action that returns a promise and loaded storage data
 * @type {Function}
 * @example
 * loadFromLocalStorage(store)
 *   .then((newState) => console.info('Loaded state:', newState))
 *   .catch((err) => console.error('Failed to load previous state:', err));
 **/
export const loadFromLocalStorage = storage.createLoader(engine);
