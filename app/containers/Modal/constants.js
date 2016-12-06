export const HIDE_MODAL = 'app/Modal/HIDE_MODAL';
export const SHOW_MODAL = 'app/Modal/SHOW_MODAL';

/**
 * Default settings for modals - referenced in reducer initialState
 * and merged with any passed settings in SHOW_MODAL action
 * @type {Object}
 */
export const defaultSettings = {
  shouldHideOnOverlayClick: false,
  shouldHideOnEscapeKeyDown: false,
  hasCloseButton: false,
  isMiddleAligned: false,
};
