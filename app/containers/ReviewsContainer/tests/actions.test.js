import {
  TYPES,
  defaultLoadRequest,
  defaultLoadCancel,
} from '../actions';

describe('REVIEWSPAGECONTAINER actions', () => {
  describe('defaultLoadRequest', () => {
    it('has a type of APP/REVIEWSPAGECONTAINER/DEFAULT/LOAD/REQUEST', () => {
      expect(defaultLoadRequest()).toEqual({ type: TYPES.DEFAULT.LOAD.REQUEST });
    });
    it('will set payload and meta from params', () => {
      const actual = defaultLoadRequest('payloadval', 'metaval');
      const expected = {
        type: TYPES.DEFAULT.LOAD.REQUEST,
        payload: 'payloadval',
        meta: 'metaval'
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('defaultLoadSuccess', () => {
    it('it has a type of APP/REVIEWSPAGECONTAINER/DEFAULT/LOAD/SUCCESS', () => {
      expect(defaultLoadSuccess()).toEqual({ type: TYPES.DEFAULT.LOAD.SUCCESS });
    });
  });
  describe('defaultLoadFailure', () => {
    it('it has a type of APP/REVIEWSPAGECONTAINER/DEFAULT/LOAD/FAILURE', () => {
      expect(defaultLoadFailure()).toEqual({ type: TYPES.DEFAULT.LOAD.FAILURE });
    });
  });
  describe('defaultLoadCancel', () => {
    it('it has a type of APP/REVIEWSPAGECONTAINER/DEFAULT/LOAD/CANCEL', () => {
      expect(defaultLoadCancel()).toEqual({ type: TYPES.DEFAULT.LOAD.CANCEL });
    });
  });
});
