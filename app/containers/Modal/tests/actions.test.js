import {
  SHOW_MODAL,
  HIDE_MODAL,
} from '../constants';
import {
  showModal,
  hideModal,
} from '../actions';

describe('Modal actions', () => {
  describe('#showModal', () => {
    it(`has a type of ${SHOW_MODAL}`, () => {
      const payload = { modalType: 'MyModal', contentProps: { hello: 'you' } };
      const expected = {
        type: SHOW_MODAL,
        payload,
      };
      expect(showModal(payload)).toEqual(expected);
    });
  });
  describe('#hideModal', () => {
    it(`has a type of ${HIDE_MODAL}`, () => {
      const expected = {
        type: HIDE_MODAL,
      };
      expect(hideModal()).toEqual(expected);
    });
  });
});
