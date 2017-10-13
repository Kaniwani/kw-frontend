import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';

import { selectInfoActivePanel } from 'pages/QuizPage/selectors';
import VocabEntryNotes from 'components/VocabEntryNotes';

import { PanelWrapper } from '../styles';

NotesPanel.propTypes = {
  id: PropTypes.number.isRequired,
};

function NotesPanel({ id }) {
  return (
    <PanelWrapper>
      <VocabEntryNotes id={id} rows={10} />
    </PanelWrapper>
  );
}

const mapStateToProps = (state) => ({
  activePanel: selectInfoActivePanel(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ activePanel }) => activePanel !== 'NOTES', renderNothing)
);

export default enhance(NotesPanel);
