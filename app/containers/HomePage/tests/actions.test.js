import {
  TYPES,
  userLoad,
  userLoadSuccess,
  userLoadFailure,
  userLoadCancel,
} from '../actions';

describe('HOMEPAGE actions', () => {
  describe('userLoad', () => {
    it('has a type of APP/HOMEPAGE/USER/LOAD', () => {
      expect(userLoad()).toEqual({ type: TYPES.USER.LOAD });
    });
    it('will set payload and meta from params', () => {
      const actual = userLoad('payloadval', 'metaval');
      const expected = {
        type: TYPES.USER.LOAD,
        payload: 'payloadval',
        meta: 'metaval',
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('userLoadSuccess', () => {
    it('it has a type of APP/HOMEPAGE/USER/SUCCESS', () => {
      expect(userLoadSuccess()).toEqual({ type: TYPES.USER.SUCCESS });
    });
  });
  describe('userLoadFailure', () => {
    it('it has a type of APP/HOMEPAGE/USER/FAILURE', () => {
      expect(userLoadFailure()).toEqual({ type: TYPES.USER.FAILURE });
    });
  });
  describe('userLoadCancel', () => {
    it('it has a type of APP/HOMEPAGE/USER/CANCEL', () => {
      expect(userLoadCancel()).toEqual({ type: TYPES.USER.CANCEL });
    });
  });
});
