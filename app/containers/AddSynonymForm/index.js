import React, { PropTypes } from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import blockEvent from 'utils/blockEvent';
import { bind, unbind } from 'kanawana';
import { Field, reduxForm } from 'redux-form/immutable';
import validate from './utils/validate';

const FORM_NAME = 'add-synonym-form'; // must be unique per component

// import JishoSearchLink from 'components/JishoSearchLink';
//
// import {
//   selectInputText,
//   selectAnswerType,
// } from 'containers/AnswerInput/selectors';
//
// import {
//   // loadJishoData,
//   addSynonym,
// } from './actions';
//
// import {
//   Form,
//   Label,
//   LabelText,
//   Input,
//   Validation,
//   SubmitButton,
// } from './styles';

class JapaneseInput extends React.Component {
  componentDidMount() {
    bind(this.imeInput);
  }

  componentWillUnmount() {
    unbind(this.imeInput);
  }

  render() {
    const { id, type, label, input } = this.props;
    return (
      <input
        ref={(node) => { this.imeInput = node; }}
        lang="ja"
        id={id}
        type={type}
        placeholder={label}
        {...input}
      />
    );
  }
}

JapaneseInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const EnglishInput = ({ id, type, label, input }) =>
  <input id={id} type={type} placeholder={label} {...input} />;

EnglishInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};


const renderField = ({ input, label, type, meta: { touched, error }, isJapanese }) => {
  const INPUT_ID = `${FORM_NAME}-${label}`;
  return (
    <div>
      <label htmlFor={INPUT_ID}>{label}</label>
      <div>
        {isJapanese ?
          <JapaneseInput id={INPUT_ID} type={type} label={label} input={input} /> :
          <EnglishInput id={INPUT_ID} type={type} label={label} input={input} />
        }
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
};

renderField.defaultProps = {
  isJapanese: false,
};

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  isJapanese: PropTypes.bool,
};

const ImmutableForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field isJapanese name="chars" type="text" component={renderField} label="chars" />
      <Field isJapanese name="kana" type="text" component={renderField} label="kana" />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  );
};

ImmutableForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  validate,
})(ImmutableForm);
