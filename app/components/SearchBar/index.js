import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, propTypes as formPropTypes } from "redux-form";
import { isMixed, isRomaji, isJapanese } from "wanakana";

import { whiteLight, blueLight, yellow } from "shared/styles/colors";

import { Form, SubmitButton, InputWrapper, Label } from "./styles";

/* eslint-disable react/prop-types */
const InputField = ({
  input, meta, label, ...props
}) => (
  <InputWrapper invalid={!meta.valid}>
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
  labelText: "Search",
  placeholderText: "meaning, かな, 漢字",
};

function SearchBar({
  labelText, placeholderText, submitting, handleSubmit, invalid,
}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        lang="ja"
        name="keywords"
        label={labelText}
        component={InputField}
        autoCapitalize="none"
        autoCorrect="none"
        autoComplete="off"
        spellCheck="false"
        placeholder={placeholderText}
      />
      <SubmitButton
        type="submit"
        name={submitting ? "SYNC" : "SEARCH"}
        title={submitting ? "Searching..." : "Search"}
        color={whiteLight}
        bgColor={invalid ? yellow : blueLight}
        isSubmitting={submitting}
        submittingText=""
      />
    </Form>
  );
}

export default reduxForm({
  form: "searchBar",
  validate: ({ keywords }) => (
    isMixed(keywords) ? { keywords: "Mixed input" } : {}
  ),
  onSubmit: ({ keywords }, dispatch, { syncErrors }) => {
    if (syncErrors.keywords) {
      // then don't submit
      return { keywords: syncErrors.keywords };
    }

    const payload = {
      meaningContains: isRomaji(keywords) ? keywords : "",
      readingContains: isJapanese(keywords) ? keywords : "",
    };
    return payload;
  },
})(SearchBar);
