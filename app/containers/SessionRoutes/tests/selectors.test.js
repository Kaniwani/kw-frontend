import selectSessionRoutesDomain, { makeSelectSessionRoutes } from '../selectors';

describe('SessionRoutes selectors', () => {
  const state = { sessionRoutes: 'winner!' };
  const SessionRoutesDomain = selectSessionRoutesDomain()(state);
  const selectSessionRoutes = makeSelectSessionRoutes();

  it('selecting sessionRoutes domain state should match snapshot', () => {
    expect(SessionRoutesDomain).toMatchSnapshot();
  });

  it('selecting sessionRoutes substate should match snapshot', () => {
    expect(selectSessionRoutes(state)).toMatchSnapshot();
  });
});
