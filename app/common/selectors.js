import { createSelector } from 'reselect';
import { get, identity, partialRight, flowRight as compose } from 'lodash';
import dateOrFalse from 'common/utils/dateOrFalse';

export const getProp = (keyPath) => (_, props) => get(props, keyPath);
export const getState = (keyPath, defaultVal) => (state) => {
  const ret = get(state, keyPath);
  return ret === undefined ? defaultVal : ret;
};
export const getBy = (val, transform = identity) => (state) =>
  compose(transform, partialRight(get, val))(state);

const selectUiDomain = (uiDomain) => getState(uiDomain, {});

export const selectMaintenanceMode = createSelector(
  getState(['app', 'maintenance'], {}),
  getState('active', false)
);

export const selectLocationPath = createSelector(
  getState('router', {}),
  getState('location.pathname', '/')
);

export const makeSelectDomainLastLoad = (uiDomain) =>
  createSelector(selectUiDomain(uiDomain), getBy('lastLoad', dateOrFalse));
export const makeSelectDomainShouldLoad = (uiDomain, predicate) =>
  createSelector(
    selectUiDomain(uiDomain),
    (ui) => !ui.error && (predicate ? predicate(ui) : !ui.isLoading && !ui.lastLoad)
  );

export const makeSelectDomainIsLoading = (uiDomain) =>
  createSelector(selectUiDomain(uiDomain), getState('isLoading', false));

export const makeSelectDomainError = (uiDomain) =>
  createSelector(selectUiDomain(uiDomain), getState('error', false));

export const makeSelectItemIds = (domainSelector) =>
  createSelector(domainSelector, (domain) => Object.keys(domain).map(Number));

export const makeSelectItemById = (itemsSelector) =>
  createSelector([itemsSelector, getProp('id')], (items, id) => items[`${id}`] || {});
