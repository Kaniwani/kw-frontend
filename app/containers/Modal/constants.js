// ACTIONS
export const SHOW_MODAL = 'kw/Modal/SHOW_MODAL';
export const HIDE_MODAL = 'kw/Modal/HIDE_MODAL';
export const SYNONYM_ADD_MODAL = 'kw/Modal/SYNONYM_ADD_MODAL';

// MODALS
import AddSynonymForm from 'containers/AddSynonymForm';

// Map each `modalType` to the corresponding modal component.
export const modals = {
  [SYNONYM_ADD_MODAL]: AddSynonymForm,
};
