import selectSessionSummaryPageDomain, { makeSelectSessionSummaryPage } from '../selectors';


describe('SessionSummaryPage selectors', () => {
  const state = { sessionSummaryPage: 'winner!' };
  const SessionSummaryPageDomain = selectSessionSummaryPageDomain()(state);
  const selectSessionSummaryPage = makeSelectSessionSummaryPage();

  it('selecting sessionSummaryPage domain state should match snapshot', () => {
    expect(SessionSummaryPageDomain).toMatchSnapshot();
  });

  it('selecting sessionSummaryPage substate should match snapshot', () => {
    expect(selectSessionSummaryPage(state)).toMatchSnapshot();
  });
});
