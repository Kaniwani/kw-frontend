import { createSelector } from 'reselect';
import { get, identity, partialRight, flowRight as compose } from 'lodash';
import dateOrFalse from 'common/utils/dateOrFalse';

export const getProp = (keyPath) => (_, props) => get(props, keyPath);
// TODO: rename getState to getDefault, and getVal to getTransform
export const getState = (keyPath, defaultVal) => (state) => {
  const ret = get(state, keyPath);
  return ret === undefined ? defaultVal : ret;
};
export const getVal = (val, transform = identity) => (state) =>
  compose(transform, partialRight(get, val))(state);

export const makeSelectDomain = (domain) => (state) => get(state, domain);
export const makeSelectEntityDomain = (domain) => (state) => get(state, ['entities', domain]);

export const selectLocationPath = createSelector(
  makeSelectDomain('router'),
  getState('location.pathname', '/')
);

// FIXME: these are recomputing, sigh
export const makeSelectDomainLastLoad = (uiDomain) =>
  createSelector(makeSelectDomain(uiDomain), getVal('lastLoad', dateOrFalse));

export const makeSelectDomainShouldLoad = (uiDomain, predicate) =>
  createSelector(
    makeSelectDomain(uiDomain),
    (ui) => (predicate ? predicate(ui) : !ui.isLoading && !ui.lastLoad)
  );

export const makeSelectDomainIsLoading = (uiDomain) =>
  createSelector(makeSelectDomain(uiDomain), getState('isLoading', false));

export const makeSelectDomainError = (uiDomain) =>
  createSelector(makeSelectDomain(uiDomain), getState('error', false));

export const makeSelectItemIds = (domainSelector) =>
  createSelector(domainSelector, (domain) => Object.keys(domain));

export const makeSelectItemById = (itemsSelector) =>
  createSelector([itemsSelector, getProp('id')], (items, id) => items[`${id}`] || {});
