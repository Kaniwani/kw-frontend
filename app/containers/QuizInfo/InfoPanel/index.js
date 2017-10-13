import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { selectInfoActivePanel, selectInfoDetailLevel } from 'pages/QuizPage/selectors';

import QuizInfoReadings from 'components/QuizInfoReadings';
import QuizInfoSynonyms from 'components/QuizInfoSynonyms';
import ReviewLock from 'components/ReviewLock';

import { QuizInfoWrapper, LockWrapper } from '../styles';

InfoPanel.propTypes = {
  id: PropTypes.number.isRequired,
  detailLevel: PropTypes.number.isRequired,
};

function InfoPanel({ id, detailLevel }) {
  return (
    <QuizInfoWrapper detailLevel={detailLevel}>
      <QuizInfoReadings id={id} detailLevel={detailLevel} />
      <QuizInfoSynonyms id={id} detailLevel={detailLevel} />
      {detailLevel > 1 && <LockWrapper><ReviewLock id={id} /></LockWrapper>}
    </QuizInfoWrapper>
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
