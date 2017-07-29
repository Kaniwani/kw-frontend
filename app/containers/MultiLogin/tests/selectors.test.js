import selectMultiLoginDomain, { makeSelectMultiLogin } from '../selectors';

describe('MultiLogin selectors', () => {
  const state = { multiLogin: 'winner!' };
  const MultiLoginDomain = selectMultiLoginDomain(state);
  const selectMultiLogin = makeSelectMultiLogin();

  it('selecting multiLogin domain state should match snapshot', () => {
    expect(MultiLoginDomain).toMatchSnapshot();
  });

  it('selecting multiLogin substate should match snapshot', () => {
    expect(selectMultiLogin(state)).toMatchSnapshot();
  });
});
