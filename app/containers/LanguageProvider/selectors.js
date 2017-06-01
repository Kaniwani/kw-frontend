import { createSelector } from 'reselect';

const selectLanguage = state => state.language;

const makeSelectLocale = () => createSelector(
  selectLanguage,
  languageState => languageState.locale
);

export {
  selectLanguage,
  makeSelectLocale,
};
