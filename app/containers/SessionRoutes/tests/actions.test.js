import sessionRoutes from '../actions';

describe('SESSIONROUTES actions', () => {
  describe('sessionRoutes.load.request', () => {
    it('has a type of SESSIONROUTES/LOAD/REQUEST', () => {
      expect(sessionRoutes.load.request()).toEqual({ type: 'SESSIONROUTES/LOAD/REQUEST' });
    });
    it('will set payload and meta from params', () => {
      const actual = sessionRoutes.load.request('payloadval', 'metaval');
      const expected = {
        type: 'SESSIONROUTES/LOAD/REQUEST',
        payload: 'payloadval',
        meta: 'metaval'
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('sessionRoutes.load.success', () => {
    it('it has a type of SESSIONROUTES/LOAD/SUCCESS', () => {
      expect(sessionRoutes.load.success()).toEqual({ type: 'SESSIONROUTES/LOAD/SUCCESS' });
    });
  });
  describe('sessionRoutes.load.failure', () => {
    it('it has a type of SESSIONROUTES/LOAD/FAILURE', () => {
      const anError = Error('herpaderp');
      expect(sessionRoutes.load.failure(anError))
        .toEqual({ type: 'SESSIONROUTES/LOAD/FAILURE', payload: anError, error: true });
    });
  });
  describe('sessionRoutes.load.cancel', () => {
    it('it has a type of SESSIONROUTES/LOAD/CANCEL', () => {
      expect(sessionRoutes.load.cancel()).toEqual({ type: 'SESSIONROUTES/LOAD/CANCEL' });
    });
  });
});
