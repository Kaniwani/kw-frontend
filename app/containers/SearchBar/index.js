import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import { isRomaji, isJapanese } from 'wanakana';
import app from 'containers/App/actions';

import InputField from './InputField';
import { Form, SubmitButton } from './styles';
const COMPONENT_HEIGHT_EM = 2.25;

SearchBar.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function SearchBar({ submitting, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Field name="searchInput" label="Search vocabulary" component={InputField} lang="ja" placeholder="意味, かな, 漢字" />
      <SubmitButton
        type="submit"
        size={`${COMPONENT_HEIGHT_EM / 2}em`}
        name={submitting ? 'SYNC' : 'SEARCH'}
        title={submitting ? 'Searching...' : 'Search vocabulary'}
        color="whiteLight"
        bgColor="blueLight"
        isSubmitting={submitting}
      />
    </Form>
  );
}

export default reduxForm({
  form: 'searchBar',
  onSubmit: ({ searchInput }, dispatch) => {
    const payload = {
      meaningContains: isRomaji(searchInput) ? searchInput : '',
      readingContains: isJapanese(searchInput) ? searchInput : '',
    };
    return dispatch(app.review.search.request(payload));
  },
})(SearchBar);
