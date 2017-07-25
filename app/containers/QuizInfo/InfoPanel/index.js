import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { selectInfoActivePanel, selectInfoDetailLevel } from 'containers/QuizPage/selectors';

import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';

import { PanelWrapper } from '../styles';

InfoPanel.propTypes = {
  id: PropTypes.number.isRequired,
  detailLevel: PropTypes.number.isRequired,
};

function InfoPanel({ id, detailLevel }) {
  return (
    <PanelWrapper detailLevel={detailLevel}>
      <VocabEntryReadings id={id} detailLevel={detailLevel} showLock />
      <VocabEntrySynonyms id={id} detailLevel={detailLevel} />
    </PanelWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  activePanel: selectInfoActivePanel,
  detailLevel: selectInfoDetailLevel,
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ activePanel }) => activePanel !== 'INFO', renderNothing)
);

export default enhance(InfoPanel);
