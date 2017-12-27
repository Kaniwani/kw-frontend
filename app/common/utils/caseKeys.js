import { snakeCase, camelCase } from 'voca';
import deepMapKeys from 'deep-map-keys';

const makeCaseKeys = (mapFn) => (obj) => deepMapKeys(obj, mapFn);

export const snakeCaseKeys = makeCaseKeys(snakeCase);
export const camelCaseKeys = makeCaseKeys(camelCase);
