import sessionPage from '../actions';

describe('SESSIONPAGE actions', () => {
  describe('sessionPage.load.request', () => {
    it('has a type of SESSIONPAGE/LOAD/REQUEST', () => {
      expect(sessionPage.load.request()).toEqual({ type: 'SESSIONPAGE/LOAD/REQUEST' });
    });
    it('will set payload and meta from params', () => {
      const actual = sessionPage.load.request('payloadval', 'metaval');
      const expected = {
        type: 'SESSIONPAGE/LOAD/REQUEST',
        payload: 'payloadval',
        meta: 'metaval',
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('sessionPage.load.success', () => {
    it('it has a type of SESSIONPAGE/LOAD/SUCCESS', () => {
      expect(sessionPage.load.success()).toEqual({ type: 'SESSIONPAGE/LOAD/SUCCESS' });
    });
  });
  describe('sessionPage.load.failure', () => {
    it('it has a type of SESSIONPAGE/LOAD/FAILURE', () => {
      const anError = Error('herpaderp');
      expect(sessionPage.load.failure(anError))
        .toEqual({ type: 'SESSIONPAGE/LOAD/FAILURE', payload: anError, error: true });
    });
  });
  describe('sessionPage.load.cancel', () => {
    it('it has a type of SESSIONPAGE/LOAD/CANCEL', () => {
      expect(sessionPage.load.cancel()).toEqual({ type: 'SESSIONPAGE/LOAD/CANCEL' });
    });
  });
});
