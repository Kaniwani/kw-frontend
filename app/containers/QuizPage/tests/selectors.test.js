import selectQuizPageDomain, { makeSelectQuizPage } from '../selectors';

describe('QuizPage selectors', () => {
  const state = { sessionPage: 'winner!' };
  const QuizPageDomain = selectQuizPageDomain(state);
  const selectQuizPage = makeSelectQuizPage();

  it('selecting sessionPage domain state should match snapshot', () => {
    expect(QuizPageDomain).toMatchSnapshot();
  });

  it('selecting sessionPage substate should match snapshot', () => {
    expect(selectQuizPage(state)).toMatchSnapshot();
  });
});
