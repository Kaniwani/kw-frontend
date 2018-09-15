import { VERSION, IS_DEV_ENV } from 'common/constants';
import { persistReducer as persist } from 'redux-persist';
import localForage from 'localforage';

const baseConfig = {
  debug: IS_DEV_ENV,
  storage: localForage,
  debounce: 1000,
  // https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
  version: VERSION,
};

export const persistReducer = (
  { key = 'kaniwani', blacklist = [], whitelist = [] } = {},
  reducer
) => {
  const config = {
    ...baseConfig,
    key,
    blacklist,
  };
  if (whitelist.length) {
    config.whitelist = whitelist;
  }
  return persist(config, reducer);
};

export const persistUiReducer = (key = 'kaniwani', reducer) => persistReducer({ key, whitelist: ['lastLoad'] }, reducer);

export default persistReducer;
