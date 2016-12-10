import { createSelector } from 'reselect';
import { selectModal } from 'containers/App/selectors';

const selectVisible = () => createSelector(
  selectModal(),
  (substate) => substate.get('isVisible'),
);

const selectModalType = () => createSelector(
  selectModal(),
  (substate) => substate.get('modalType'),
);

const selectContentProps = () => createSelector(
  selectModal(),
  (substate) => substate.get('contentProps').toJS(),
);


export default selectModal;
export {
  selectVisible,
  selectContentProps,
  selectModalType,
};
