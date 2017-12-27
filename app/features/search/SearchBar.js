import React from "react";
import PropTypes from "prop-types";
import { reduxForm, Field, propTypes as formPropTypes } from "redux-form";
import { isMixed, isRomaji, isJapanese } from "wanakana";

import search from "./actions";
import { whiteLight, blueLight, yellow } from "common/styles/colors";

import { Form, SubmitButton, InputWrapper, Label } from "./styles";

/* eslint-disable react/prop-types */
const InputField = ({ input, meta, label, ...props }) => (
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

export function SearchBar({
  labelText,
  placeholderText,
  submitting,
  handleSubmit,
  invalid,
}) {
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
  validate: ({ keywords }) => (isMixed(keywords) ? { keywords: "Mixed input" } : {}),
  onSubmit: (
    { keywords },
    dispatch,
    { syncErrors, setSubmitFailed, startSubmit, stopSubmit, reset, blur }
  ) => {
    if (syncErrors.keywords) {
      dispatch(setSubmitFailed({ keywords: syncErrors.keywords }));
    }

    const payload = {
      meaningContains: isRomaji(keywords) ? keywords.toLowerCase() : "",
      readingContains: isJapanese(keywords) ? keywords : "",
    };
    dispatch(search.query.request(payload, { startSubmit, stopSubmit, reset, blur }));
  },
})(SearchBar);
