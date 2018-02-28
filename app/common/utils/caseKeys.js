import { snakeCase, camelCase } from 'voca';
import typeOf from 'common/utils/typeOf';

const cache = new WeakMap();

export function deepMapKeys(target, mapFn) {
  function map(value) {
    return typeOf(value) === 'array'
      ? mapArray(value)
      : typeOf(value) === 'object' ? mapObject(value) : value;
  }

  function mapArray(arr) {
    if (cache.has(arr)) {
      return cache.get(arr);
    }
    const result = [];
    cache.set(arr, result);
    arr.forEach((x) => {
      result.push(map(x));
    });
    return result;
  }

  function mapObject(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = {};
    cache.set(obj, result);
    Object.keys(obj).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[mapFn.call(null, key, obj[key])] = map(obj[key]);
      }
    });
    return result;
  }

  return map(target);
}

const makeCaseKeys = (mapFn) => (target) => deepMapKeys(target, mapFn);

export const snakeCaseKeys = makeCaseKeys(snakeCase);
export const camelCaseKeys = makeCaseKeys(camelCase);
