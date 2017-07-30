import selectWelcomePageDomain, { makeSelectWelcomePage } from '../selectors';


describe('WelcomePage selectors', () => {
  const state = { welcomePage: 'winner!' };
  const WelcomePageDomain = selectWelcomePageDomain(state);
  const selectWelcomePage = makeSelectWelcomePage();

  it('selecting welcomePage domain state should match snapshot', () => {
    expect(WelcomePageDomain).toMatchSnapshot();
  });

  it('selecting welcomePage substate should match snapshot', () => {
    expect(selectWelcomePage(state)).toMatchSnapshot();
  });
});
