import { random } from 'lodash';

function randomInsert(arr = [], item) {
  if (item == null) return arr;
  const loc = random(arr.length);
  return [...arr.slice(0, loc), item, ...arr.slice(loc)];
}

export default randomInsert;
