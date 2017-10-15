import { isString, uniq } from 'lodash';

/**
 * Takes a comma separated string or array and casts to an array of unique strings
 * @param  {String|Array} data strings
 * @return {Array} unique strings
 */
const toUniqueStringsArray = (data = []) => {
  const isCommaString = isString(data) && data.includes(', ');
  if (isCommaString) {
    return uniq(data.split(', '));
  } else if (Array.isArray(data)) {
    return uniq(data);
  } else if (isString(data) && data.length) {
    return [data];
  }
  return [];
};

export default toUniqueStringsArray;
