import { createSelector } from 'reselect';
import { selectAddSynonym } from 'containers/App/selectors';

const selectJishoData = () => createSelector(
  selectAddSynonym(),
  (substate) => substate.getIn(['jisho', 'data']),
);

const selectIsFormValid = () => createSelector(
  selectAddSynonym(),
  (substate) => substate.getIn(['form', 'valid']),
);

export default selectAddSynonym;

export {
  selectJishoData,
  selectIsFormValid,
};
