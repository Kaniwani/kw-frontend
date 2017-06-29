import selectHomePageDomain, { makeSelectHomePage } from '../selectors';

describe('HomePage selectors', () => {
  const state = { homePage: 'winner!' };
  const HomePageDomain = selectHomePageDomain()(state);
  const selectHomePage = makeSelectHomePage();

  it('selecting homePage domain state should match snapshot', () => {
    expect(HomePageDomain).toMatchSnapshot();
  });

  it('selecting homePage substate should match snapshot', () => {
    expect(selectHomePage(state)).toMatchSnapshot();
  });
});
