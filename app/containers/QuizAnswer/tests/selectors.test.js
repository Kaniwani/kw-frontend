import selectQuizAnswerDomain, { makeSelectQuizAnswer } from '../selectors';

describe('QuizAnswer selectors', () => {
  const state = { quizAnswer: 'winner!' };
  const QuizAnswerDomain = selectQuizAnswerDomain()(state);
  const selectQuizAnswer = makeSelectQuizAnswer();

  it('selecting quizAnswer domain state should match snapshot', () => {
    expect(QuizAnswerDomain).toMatchSnapshot();
  });

  it('selecting quizAnswer substate should match snapshot', () => {
    expect(selectQuizAnswer(state)).toMatchSnapshot();
  });
});
