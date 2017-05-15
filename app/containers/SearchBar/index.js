import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import ExpandingSearch from 'components/ExpandingSearch';

// import makeSelectSearchBar from './selectors';

export class SearchBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  // TODO: props from redux state / redux-form
  state = {
    keywords: '',
    isExpanded: false,
    isSubmitting: false,
  };

  expandInput = (event) => {
    event.stopPropagation();
    this.setState({ isExpanded: true });
    this.inputElement.focus();
  }

  contractInput = (event) => {
    event.stopPropagation();
    this.setState({ isExpanded: false });
  }

  handleInputChange = (event) => {
    this.setState({ keywords: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.isExpanded) {
      // dispatch submission
      this.setState(() => ({
        isSubmitting: true,
        isExpanded: false,
      }));
    } else {
      this.expandInput(event);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ExpandingSearch
          onClick={this.expandInput}
          handleInputChange={this.handleInputChange}
          handleInputFocus={this.expandInput}
          keywords={this.state.keywords}
          inputRef={(node) => { this.inputElement = node; }}
          isExpanded={this.state.isExpanded}
          isSubmitting={this.state.isSubmitting}
        />
      </form>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   SearchBar: makeSelectSearchBar(),
// });
//
// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

export default /* connect(mapStateToProps, mapDispatchToProps)(*/SearchBar/* )*/;
