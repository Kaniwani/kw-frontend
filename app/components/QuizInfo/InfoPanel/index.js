import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { has } from 'lodash';

import {
  selectInfoActivePanel,
  selectInfoDetailLevel,
} from 'pages/QuizPage/selectors';

import QuizInfoReadings from 'components/QuizInfoReadings';
import QuizInfoSynonyms from 'components/QuizInfoSynonyms';
import ReviewLock from 'components/ReviewLock';

import { withContentRect } from 'react-measure';
import smoothScrollY from 'utils/smoothScrollY';
import shouldUpdateDeepEqual from 'utils/shouldUpdateDeepEqual';

import { QuizInfoWrapper, LockWrapper } from '../styles';

InfoPanel.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  detailLevel: PropTypes.number.isRequired,
  measureRef: PropTypes.func.isRequired,
  contentRect: PropTypes.object.isRequired,
};

function InfoPanel({
  id, category, detailLevel, measureRef, contentRect,
}) {
  if (has(contentRect, 'bounds', 'top')) {
    smoothScrollY(contentRect.bounds.top);
  }

  return (
    <QuizInfoWrapper innerRef={measureRef} detailLevel={detailLevel}>
      <QuizInfoReadings id={id} detailLevel={detailLevel} />
      <QuizInfoSynonyms id={id} detailLevel={detailLevel} />
      {category !== 'lessons' &&
        detailLevel > 1 && (
          <LockWrapper>
            <ReviewLock id={id} data-ignore-hotkeys />
          </LockWrapper>
        )}
    </QuizInfoWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  activePanel: selectInfoActivePanel,
  detailLevel: selectInfoDetailLevel,
});

export default compose(
  connect(mapStateToProps),
  branch(({ activePanel }) => activePanel !== 'INFO', renderNothing),
  withContentRect('bounds'),
  shouldUpdateDeepEqual(['bounds', 'id', 'detailLevel']),
)(InfoPanel);
