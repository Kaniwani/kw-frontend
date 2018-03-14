import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';
import { isMixed, isRomaji, isJapanese } from 'wanakana';

import search from './actions';
import { white, blue, yellow } from 'common/styles/colors';

import { Form, SubmitButton, InputWrapper, Label } from './styles';

/* eslint-disable react/prop-types */
const InputField = ({ input, meta, label, bgColor, ...props }) => (
  <InputWrapper bgColor={bgColor}>
    <Label htmlFor={input.name}>{label}</Label>
    <input id={input.name} type="search" {...input} {...props} />
  </InputWrapper>
);

SearchBar.propTypes = {
  ...formPropTypes,
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
};

SearchBar.defaultProps = {
  labelText: 'Search',
  placeholderText: 'meaning, かな, 漢字',
};

export function SearchBar({ labelText, placeholderText, submitting, handleSubmit, invalid }) {
  const bgColor = invalid ? yellow[6] : blue[3];
  return (
    <Form onSubmit={handleSubmit}>
      {/* // TODO: add a button to allow users to toggle kana input in search field
        <KanaButton
        type="button"
        onClick={toggleKanaInput}
      /> */}
      <Field
        lang="ja"
        name="keywords"
        label={labelText}
        component={InputField}
        autoCapitalize="none"
        autoCorrect="off"
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholderText}
        bgColor={bgColor}
      />
      <SubmitButton
        type="submit"
        name={submitting ? 'SYNC' : 'SEARCH'}
        title={submitting ? 'Searching...' : 'Search'}
        color={white[2]}
        bgColor={bgColor}
        isSubmitting={submitting}
      />
    </Form>
  );
}

export default reduxForm({
  form: 'searchBar',
  onSubmit: ({ keywords }, dispatch, form) => {
    if (isMixed(keywords)) {
      form.stopSubmit({ keywords: 'Mixed input' });
    } else {
      const query = {};
      if (isRomaji(keywords)) {
        query.meaningContains = keywords.toLowerCase();
      } else if (isJapanese(keywords)) {
        query.readingContains = keywords;
      }
      dispatch(search.query.request(query, { form }));
    }
  },
})(SearchBar);
