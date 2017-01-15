import { List } from 'immutable';

function listUnion(left, right) {
  const union = {};
  left.forEach((x) => { union[x] = undefined; });
  right.forEach((x) => { union[x] = undefined; });
  return new List(Object.keys(union).map((i) => parseInt(i, 10)));
}
export default listUnion;
