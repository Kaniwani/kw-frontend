import multiLogin from '../actions';

describe('MULTILOGIN actions', () => {
  describe('multiLogin.load.request', () => {
    it('has a type of MULTILOGIN/LOAD/REQUEST', () => {
      expect(multiLogin.load.request()).toEqual({ type: 'MULTILOGIN/LOAD/REQUEST' });
    });
    it('will set payload and meta from params', () => {
      const actual = multiLogin.load.request('payloadval', 'metaval');
      const expected = {
        type: 'MULTILOGIN/LOAD/REQUEST',
        payload: 'payloadval',
        meta: 'metaval',
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('multiLogin.load.success', () => {
    it('it has a type of MULTILOGIN/LOAD/SUCCESS', () => {
      expect(multiLogin.load.success()).toEqual({ type: 'MULTILOGIN/LOAD/SUCCESS' });
    });
  });
  describe('multiLogin.load.failure', () => {
    it('it has a type of MULTILOGIN/LOAD/FAILURE', () => {
      const anError = Error('herpaderp');
      expect(multiLogin.load.failure(anError))
        .toEqual({ type: 'MULTILOGIN/LOAD/FAILURE', payload: anError, error: true });
    });
  });
  describe('multiLogin.load.cancel', () => {
    it('it has a type of MULTILOGIN/LOAD/CANCEL', () => {
      expect(multiLogin.load.cancel()).toEqual({ type: 'MULTILOGIN/LOAD/CANCEL' });
    });
  });
});
