import typeOf from './typeOf';
import { parse } from 'date-fns';

// create a date instance from date-like (date, datestring etc) else false
// used when rehydrating from localstorage/json which won't store real Date instances
const dateOrFalse = (date) => {
  const shouldParse = !!date && (typeOf(date) === 'date' || typeOf(date) === 'string');
  return shouldParse ? parse(date) : false;
};

export default dateOrFalse;
