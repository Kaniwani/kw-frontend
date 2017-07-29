import { createSelector } from 'reselect';

import { PANELS } from './constants';

const selectMultiLoginDomain = (state) => state.multiLogin;

export const selectRedirect = createSelector(
  selectMultiLoginDomain,
  ({ redirectToDashboard }) => redirectToDashboard,
);

export const selectActivePanel = createSelector(
  selectMultiLoginDomain,
  ({ activePanel }) => activePanel,
);

export const selectRegisterSelected = createSelector(
  selectActivePanel,
  (activePanel) => activePanel === PANELS[0],
);

export const selectLoginSelected = createSelector(
  selectActivePanel,
  (activePanel) => activePanel === PANELS[1],
);

export const selectResetSelected = createSelector(
  selectActivePanel,
  (activePanel) => activePanel === PANELS[2],
);

export const selectMainInputText = createSelector(
  [selectLoginSelected, selectRegisterSelected],
  (loginSelected, registerSelected) => {
    if (loginSelected) return 'Username or Email';
    if (registerSelected) return 'Username';
    return 'Email';
  }
);

export const selectMainInputName = createSelector(
  selectResetSelected,
  (resetSelected) => !resetSelected ? 'username' : 'email'
);

export default selectMultiLoginDomain;
