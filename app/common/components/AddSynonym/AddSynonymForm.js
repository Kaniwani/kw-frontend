import React from 'react';
import PropTypes from 'prop-types';
import { toKana } from 'wanakana';
import { reduxForm, Field, SubmissionError, propTypes as formPropTypes } from 'redux-form';

import synonyms from 'features/synonyms/actions';
import { onlyKanjiOrKana, onlyKana } from 'common/validations';

import AddSynonymField from './AddSynonymField';
import Button from 'common/components/Button';
import { blue } from 'common/styles/colors';
import { Form } from './styles';

export const ANSWER_TYPES = {
  WORD: 'WORD',
  READING: 'READING',
};

AddSynonymForm.propTypes = {
  ...formPropTypes,
  id: PropTypes.number.isRequired, // associated review id
  answerValue: PropTypes.string,
  answerType: PropTypes.oneOf([...Object.keys(ANSWER_TYPES), '']),
};

AddSynonymForm.defaultProps = {
  answerValue: '',
  answerType: '',
};

export function AddSynonymForm({ handleSubmit, submitting, answerValue, answerType }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="word"
        type="text"
        component={AddSynonymField}
        label={ANSWER_TYPES.WORD}
        // FIXME: use a react-wanakana input component instead
        normalize={(value) => toKana(value, { IMEMode: true })}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Field
        name="reading"
        type="text"
        component={AddSynonymField}
        label={ANSWER_TYPES.READING}
        // FIXME: use a react-wanakana input component instead
        normalize={(value) => toKana(value, { IMEMode: true })}
        userAnswer={answerValue}
        answerType={answerType}
      />
      <Button
        style={{ maxWidth: '5em' }}
        type="submit"
        title="Add Synonym"
        colorHover={blue[7]}
        bgColor={blue[5]}
        disabled={submitting}
      >
        {submitting ? 'Adding' : 'Add'}
      </Button>
    </Form>
  );
}

export default reduxForm({
  form: 'addSynonym',
  onSubmit: ({ word, reading }, dispatch, { id, ...form }) => {
    const errors = {
      word: onlyKanjiOrKana(word),
      reading: onlyKana(reading),
    };
    if (Object.values(errors).some(Boolean)) {
      throw new SubmissionError(errors);
    }
    dispatch(synonyms.add.request({ reviewId: id, word, reading }, { form }));
  },
})(AddSynonymForm);
