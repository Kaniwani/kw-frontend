import {
  TOGGLE_VOCAB_INFO,
  SHOW_VOCAB_INFO,
  HIDE_VOCAB_INFO,
} from '../constants';
import {
  toggleVocabInfo,
  showVocabInfo,
  hideVocabInfo,
} from '../actions';

describe('ReviewInfo actions', () => {
  describe('#toggleVocabInfo', () => {
    it(`has a type of ${TOGGLE_VOCAB_INFO} and a payload`, () => {
      const expected = {
        type: TOGGLE_VOCAB_INFO,
        payload: {},
      };
      expect(toggleVocabInfo()).toEqual(expected);
    });
  });
  describe('#showVocabInfo', () => {
    it(`has a type of ${SHOW_VOCAB_INFO}`, () => {
      const expected = {
        type: SHOW_VOCAB_INFO,
      };
      expect(showVocabInfo()).toEqual(expected);
    });
  });
  describe('#hideVocabInfo', () => {
    it(`has a type of ${HIDE_VOCAB_INFO}`, () => {
      const expected = {
        type: HIDE_VOCAB_INFO,
      };
      expect(hideVocabInfo()).toEqual(expected);
    });
  });
});
