import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValues, reduxForm } from 'redux-form';
import { compose, branch, renderNothing } from 'recompose';

import app from 'containers/App/actions';
import { makeSelectReviewNotes } from 'containers/App/selectors';
import { MAX_NOTES_LENGTH } from 'shared/constants';
import Button from 'base/Button';

import { Form, TextArea, Controls, Count } from './styles';

const RemainingChars = formValues('notes')(({ notes }) => {
  const remaining = MAX_NOTES_LENGTH - notes.length;
  return <Count count={remaining}>{remaining}</Count>;
});

VocabEntryNotes.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  rows: PropTypes.number,
};

VocabEntryNotes.defaultProps = {
  rows: 5,
};

function VocabEntryNotes({ rows, handleSubmit, dirty, reset }) {
  return (
    <Form onSubmit={handleSubmit}>
      {/* TODO: autoresize height rather than our dodgy rows hack here */}
      <TextArea
        name="notes"
        component="textarea"
        maxLength={MAX_NOTES_LENGTH}
        rows={rows}
        placeholder="メモがない"
      />
      {dirty && (
        <Controls>
          <RemainingChars />
          <Button type="reset" onClick={reset}>
            Undo
          </Button>
          <Button type="submit">
            Save
          </Button>
        </Controls>
      )}
    </Form>
  );
}

const mapStateToProps = (state, { id }) => ({
  initialValues: { notes: makeSelectReviewNotes(id)(state) },
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ initialValues: { notes } }) => notes == null, renderNothing),
  reduxForm({
    form: 'vocabEntryNotes',
    // enableReinitialize: true,
    onSubmit: ({ notes }, dispatch, { id }) => dispatch(app.review.notes.request({ id, notes })) }),
);

export default enhance(VocabEntryNotes);
