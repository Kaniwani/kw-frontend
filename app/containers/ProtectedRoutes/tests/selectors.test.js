import selectProtectedRoutesDomain, { makeSelectProtectedRoutes } from '../selectors';


describe('ProtectedRoutes selectors', () => {
  const state = { protectedRoutes: 'winner!' };
  const ProtectedRoutesDomain = selectProtectedRoutesDomain()(state);
  const selectProtectedRoutes = makeSelectProtectedRoutes();

  it('selecting protectedRoutes domain state should match snapshot', () => {
    expect(ProtectedRoutesDomain).toMatchSnapshot();
  });

  it('selecting protectedRoutes substate should match snapshot', () => {
    expect(selectProtectedRoutes(state)).toMatchSnapshot();
  });
});
