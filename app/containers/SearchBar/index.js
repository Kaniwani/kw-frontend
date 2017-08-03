import React from 'react';

import { Form, SearchInput, SubmitButton } from './styles';

const COMPONENT_HEIGHT_EM = 2.25;

export class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // TODO: props from redux state / redux-form
  state = {
    inputValue: '',
    isSubmitting: false,
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <SearchInput
          lang="ja"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="意味, かな, 漢字"
        />
        <SubmitButton
          type="submit"
          size={`${COMPONENT_HEIGHT_EM / 2}em`}
          name={this.state.isSubmitting ? 'SYNC' : 'SEARCH'}
          title={this.state.isSubmitting ? 'Searching...' : `Search vocabulary for: ${this.state.inputValue}`}
          color="whiteLight"
          bgColor="blueLight"
          isSubmitting={this.state.isSubmitting}
        />
      </Form>
    );
  }
}

export default SearchBar;
