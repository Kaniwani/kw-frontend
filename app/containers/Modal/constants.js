// ACTIONS
export const SHOW_MODAL = 'kw/Modal/SHOW_MODAL';
export const HIDE_MODAL = 'kw/Modal/HIDE_MODAL';
export const ADD_SYNONYM_MODAL = 'kw/Modal/ADD_SYNONYM_MODAL';

// MODALS
import AddSynonymForm from 'containers/AddSynonymForm';

// Map each `modalType` to the corresponding modal component.
export const modals = {
  [ADD_SYNONYM_MODAL]: AddSynonymForm,
};
