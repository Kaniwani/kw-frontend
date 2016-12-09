import { createSelector } from 'reselect';
import { selectModal } from 'containers/App/selectors';

const selectVisible = () => createSelector(
  selectModal(),
  (substate) => substate.get('isVisible'),
);

export default selectModal;
export {
  selectVisible,
};
