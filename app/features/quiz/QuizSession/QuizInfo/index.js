import React from 'react';
import PropTypes from 'prop-types';
import { has } from 'lodash';
import { connect } from 'react-redux';
import { withContentRect } from 'react-measure';
import smoothScrollY from 'common/utils/smoothScrollY';
import { compose, branch, renderNothing } from 'recompose';

import { selectCurrentId } from 'features/quiz/QuizSession/selectors';
import { selectInfoDetailLevel, selectInfoDisabled, selectInfoOpen } from './selectors';

import VocabDetail from 'common/components/VocabDetail';
import { Wrapper } from './styles';

QuizInfo.propTypes = {
  id: PropTypes.number.isRequired,
  detailLevel: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  measureRef: PropTypes.func.isRequired,
  contentRect: PropTypes.object.isRequired,
};

function QuizInfo({ id, detailLevel, isOpen, isDisabled, measureRef, contentRect }) {
  if (has(contentRect, 'bounds', 'top')) {
    smoothScrollY(contentRect.bounds.top);
  }

  const isMidDetail = detailLevel >= 1;
  const isHighDetail = detailLevel === 2;

  return (
    <Wrapper innerRef={measureRef} isMinimized={isDisabled || !isOpen}>
      <VocabDetail
        id={id}
        showFuri={isMidDetail}
        showSecondaryReadings={isMidDetail}
        showTags={isMidDetail}
        showLinks={isHighDetail}
        showSentence={isHighDetail}
        showPitch={isHighDetail}
        showStroke={isHighDetail}
        showNotes={isHighDetail}
        showLock={isHighDetail}
        showAddSynoynm={false}
      />
    </Wrapper>
  );
}

const mapStateToProps = (state, props) => ({
  id: selectCurrentId(state, props),
  detailLevel: selectInfoDetailLevel(state, props),
  isOpen: selectInfoOpen(state, props),
  isDisabled: selectInfoDisabled(state, props),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ id }) => !Number.isFinite(id), renderNothing),
  withContentRect('bounds')
);

export default enhance(QuizInfo);
