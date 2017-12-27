/* eslint-disable no-param-reassign, no-console */
import { get } from 'lodash';
import { IS_DEV_ENV } from 'common/constants';

// creates object by provided key, defaults to index otherwise
const createDict = (list = [], key = '') => {
  if (!Array.isArray(list)) {
    console.warn('createDict should receive an array');
    return {};
  }
  return list.reduce((hash, item, index) => {
    const target = get(item, key) || index;
    if (IS_DEV_ENV && !!hash[target]) {
      console.warn('duplicate entries identified:');
      console.log(hash[target]);
      console.log(item);
    }
    hash[target] = item;
    return hash;
  }, {});
};

export default createDict;
