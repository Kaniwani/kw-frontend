import selectHomePageDomain, { makeSelectHomePage } from '../selectors';

describe('HomePage selectors', () => {
  const state = { homepage: 'winner!' };
  const HomePageDomain = selectHomePageDomain()(state);
  const selectHomePage = makeSelectHomePage();

  it('selecting homepage domain state should match snapshot', () => {
    expect(HomePageDomain).toMatchSnapshot();
  });

  it('selecting homepage substate should match snapshot', () => {
    expect(selectHomePage(state)).toMatchSnapshot();
  });
});
