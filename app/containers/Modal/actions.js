import {
  SHOW_MODAL,
  HIDE_MODAL,
  defaultSettings,
} from './constants';

/**
 * Shows modal of specified modalType, with passed props and settings merged with default settings
 * @param  {String} modalType Identifier for this instantiation
 * @param  {Object} modalProps Props for this specific modal
 * @param  {*} rest Any additional settings or extra state
 * @return {Object} Action of type 'SHOW_MODAL' with a payload
 */
export function showModal({ modalType, modalProps = {}, ...rest }) {
  return {
    type: SHOW_MODAL,
    payload: {
      ...defaultSettings,
      ...rest,
      modalType,
      modalProps,
    },
  };
}

/**
 * Hides modal
 * @return {object} Action of type 'HIDE_MODAL'
 */
export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}
