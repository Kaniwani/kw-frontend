import quizAnswer from '../actions';

describe('QUIZANSWER actions', () => {
  describe('quizAnswer.load.request', () => {
    it('has a type of QUIZANSWER/LOAD/REQUEST', () => {
      expect(quizAnswer.load.request()).toEqual({ type: 'QUIZANSWER/LOAD/REQUEST' });
    });
    it('will set payload and meta from params', () => {
      const actual = quizAnswer.load.request('payloadval', 'metaval');
      const expected = {
        type: 'QUIZANSWER/LOAD/REQUEST',
        payload: 'payloadval',
        meta: 'metaval',
      };
      expect(actual).toEqual(expected);
    });
  });
  describe('quizAnswer.load.success', () => {
    it('it has a type of QUIZANSWER/LOAD/SUCCESS', () => {
      expect(quizAnswer.load.success()).toEqual({ type: 'QUIZANSWER/LOAD/SUCCESS' });
    });
  });
  describe('quizAnswer.load.failure', () => {
    it('it has a type of QUIZANSWER/LOAD/FAILURE', () => {
      const anError = Error('herpaderp');
      expect(quizAnswer.load.failure(anError))
        .toEqual({ type: 'QUIZANSWER/LOAD/FAILURE', payload: anError, error: true });
    });
  });
  describe('quizAnswer.load.cancel', () => {
    it('it has a type of QUIZANSWER/LOAD/CANCEL', () => {
      expect(quizAnswer.load.cancel()).toEqual({ type: 'QUIZANSWER/LOAD/CANCEL' });
    });
  });
});
