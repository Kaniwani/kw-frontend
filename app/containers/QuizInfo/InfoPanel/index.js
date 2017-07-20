import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { selectInfoActivePanel } from 'containers/QuizPage/selectors';

import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';

import { PanelWrapper } from '../styles';

InfoPanel.propTypes = {
  id: PropTypes.number.isRequired,
};

function InfoPanel({ id }) {
  return (
    <PanelWrapper>
      <VocabEntryReadings id={id} showLock />
      <VocabEntrySynonyms id={id} />
    </PanelWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  activePanel: selectInfoActivePanel,
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ activePanel }) => activePanel !== 'INFO', renderNothing)
);

export default enhance(InfoPanel);
