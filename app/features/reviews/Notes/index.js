import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, propTypes as formPropTypes } from 'redux-form';
import styled from 'styled-components';

import review from 'features/reviews/actions';
import { selectNotes } from 'features/reviews/selectors';

import TextAreaAutoSize from 'common/components/TextAreaAutoSize';
import { MAX_NOTES_LENGTH } from 'common/constants';
const Form = styled.form`
  display: flex;
`;

Notes.propTypes = {
  id: PropTypes.number.isRequired,
  ...formPropTypes,
};

export function Notes({ handleSubmit, reset }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Field
        component={TextAreaAutoSize}
        maxLength={MAX_NOTES_LENGTH}
        name="notes"
        required={false}
        onReset={reset}
        placeholder="メモがない"
        showControls
        rows={1}
      />
    </Form>
  );
}

const mapStateToProps = (state, props) => ({
  initialValues: {
    notes: selectNotes(state, props),
  },
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'notes',
    enableReinitialize: true,
    onSubmit: (values, dispatch, { id }) => dispatch(review.updateNotes.request({ id, ...values })),
  })
);

export default enhance(Notes);
