import {
  SHOW_MODAL,
  HIDE_MODAL,
} from './constants';

/**
 * Shows modal with children using the passed props
 * @param  {Object} contentProps Props to be passed to the children components
 * @return {Object} Action of type 'SHOW_MODAL' with payload of contentprops
 */
export function showModal({ modalType, contentProps = {} }) {
  return {
    type: SHOW_MODAL,
    payload: {
      modalType,
      contentProps,
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
