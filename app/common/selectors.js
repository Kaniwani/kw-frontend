import { createSelector } from 'reselect';
import { get, identity, partialRight, flowRight as compose } from 'lodash';

export const getProp = (keyPath) => (_, props) => get(props, keyPath);
export const getState = (keyPath, defaultVal) => (state) => {
  const ret = get(state, keyPath);
  return ret === undefined ? defaultVal : ret;
};
export const getBy = (val, transform = identity) => (state) =>
  compose(transform, partialRight(get, val))(state);

export const selectLocationPath = createSelector(
  getState('router', {}),
  getState('location.pathname', '/')
);

export const makeSelectItemIds = (domainSelector) =>
  createSelector(domainSelector, (domain) => Object.keys(domain).map(Number));

export const makeSelectItemById = (itemsSelector) =>
  createSelector([itemsSelector, getProp('id')], (items, id) => items[`${id}`] || {});
