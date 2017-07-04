import selectSessionPageDomain, { makeSelectSessionPage } from '../selectors';

describe('SessionPage selectors', () => {
  const state = { sessionPage: 'winner!' };
  const SessionPageDomain = selectSessionPageDomain()(state);
  const selectSessionPage = makeSelectSessionPage();

  it('selecting sessionPage domain state should match snapshot', () => {
    expect(SessionPageDomain).toMatchSnapshot();
  });

  it('selecting sessionPage substate should match snapshot', () => {
    expect(selectSessionPage(state)).toMatchSnapshot();
  });
});
