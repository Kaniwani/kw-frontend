import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import { makeSelectReviewNotes } from 'containers/App/selectors';
import { selectInfoActivePanel } from 'containers/QuizPage/selectors';

import { PanelWrapper } from '../styles';

NotesPanel.propTypes = {
  notes: PropTypes.string.isRequired,
};

function NotesPanel({ notes }) {
  return (
    <PanelWrapper>
      <div>{notes}</div>
    </PanelWrapper>
  );
}

const mapStateToProps = (state, { id }) => ({
  notes: makeSelectReviewNotes(id)(state),
  activePanel: selectInfoActivePanel(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ activePanel }) => activePanel !== 'NOTES', renderNothing)
);

export default enhance(NotesPanel);
