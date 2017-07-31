import selectSearchBarDomain, { makeSelectSearchBar } from '../selectors';


describe('SearchBar selectors', () => {
  const state = { searchBar: 'winner!' };
  const SearchBarDomain = selectSearchBarDomain(state);
  const selectSearchBar = makeSelectSearchBar();

  it('selecting searchBar domain state should match snapshot', () => {
    expect(SearchBarDomain).toMatchSnapshot();
  });

  it('selecting searchBar substate should match snapshot', () => {
    expect(selectSearchBar()).toMatchSnapshot();
  });
});
