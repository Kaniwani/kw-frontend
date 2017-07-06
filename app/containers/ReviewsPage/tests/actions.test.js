import {
  TYPES,
  defaultLoadRequest,
  defaultLoadSuccess,
  defaultLoadFailure,
  defaultLoadCancel,
} from '../actions';

describe('REVIEWSPAGE actions', () => {
  describe('defaultLoadRequest', () => {
    it('has a type of APP/REVIEWSPAGE/DEFAULT/LOAD/REQUEST', () => {
      expect(defaultLoadRequest()).toEqual({ type: TYPES.DEFAULT.LOAD.REQUEST });
    });
    it('will set payload and meta from params', () => {
      const actual = defaultLoadRequest('payloadval', 'metaval');
      const expected = {
        type: TYPES.DEFAULT.LOAD.REQUEST,
        payload: 'payloadval',
        meta: 'metaval',
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('defaultLoadSuccess', () => {
    it('it has a type of APP/REVIEWSPAGE/DEFAULT/LOAD/SUCCESS', () => {
      expect(defaultLoadSuccess()).toEqual({ type: TYPES.DEFAULT.LOAD.SUCCESS });
    });
  });
  describe('defaultLoadFailure', () => {
    it('it has a type of APP/REVIEWSPAGE/DEFAULT/LOAD/FAILURE', () => {
      expect(defaultLoadFailure()).toEqual({ type: TYPES.DEFAULT.LOAD.FAILURE });
    });
  });
  describe('defaultLoadCancel', () => {
    it('it has a type of APP/REVIEWSPAGE/DEFAULT/LOAD/CANCEL', () => {
      expect(defaultLoadCancel()).toEqual({ type: TYPES.DEFAULT.LOAD.CANCEL });
    });
  });
});
