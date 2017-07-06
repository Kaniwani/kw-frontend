import {
  TYPES,
  defaultLoad,
  defaultLoadCancel,
} from '../actions';

describe('VOCABLEVELSCONTAINER actions', () => {
  describe('defaultLoad', () => {
    it('has a type of APP/VOCABLEVELSCONTAINER/DEFAULT/LOAD', () => {
      expect(defaultLoad()).toEqual({ type: TYPES.DEFAULT.LOAD });
    });
    it('will set payload and meta from params', () => {
      const actual = defaultLoad('payloadval', 'metaval');
      const expected = {
        type: TYPES.DEFAULT.LOAD,
        payload: 'payloadval',
        meta: 'metaval'
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('defaultLoadSuccess', () => {
    it('it has a type of APP/VOCABLEVELSCONTAINER/DEFAULT/SUCCESS', () => {
      expect(defaultLoadSuccess()).toEqual({ type: TYPES.DEFAULT.SUCCESS });
    });
  });
  describe('defaultLoadFailure', () => {
    it('it has a type of APP/VOCABLEVELSCONTAINER/DEFAULT/FAILURE', () => {
      expect(defaultLoadFailure()).toEqual({ type: TYPES.DEFAULT.FAILURE });
    });
  });
  describe('defaultLoadCancel', () => {
    it('it has a type of APP/VOCABLEVELSCONTAINER/DEFAULT/CANCEL', () => {
      expect(defaultLoadCancel()).toEqual({ type: TYPES.DEFAULT.CANCEL });
    });
  });
});
