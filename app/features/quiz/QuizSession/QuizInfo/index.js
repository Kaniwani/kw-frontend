import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { withContentRect, MeasureProps } from 'react-measure';
import { compose } from 'recompose';

import { stopAutoAdvance } from 'features/quiz/QuizSession/QuizAnswer/logic';

import smoothScrollY from 'common/utils/smoothScrollY';
import review from 'features/reviews/actions';
import { selectCurrentId } from 'features/quiz/QuizSession/selectors';
import {
  selectReviewVocabIds,
  selectReviewSynonymIds,
  selectIsHidden,
} from 'features/reviews/selectors';
import { selectInfoDetailLevel, selectInfoDisabled, selectInfoOpen } from './selectors';

import VocabWord from 'common/components/VocabWord';
import VocabSynonymList from 'common/components/VocabSynonym';
import TagsList from 'common/components/TagsList';
import SentencePair from 'common/components/SentencePair';
import StrokeLoader from 'common/components/KanjiStroke';
import ReadingLinks from 'common/components/ReadingLinks';
import PitchDiagramList from 'common/components/PitchDiagram';
import VocabLockButton from 'common/components/VocabLockButton';
import Notes from 'features/reviews/Notes';

import { Wrapper, ReadingWrapper } from './styles';

const Readings = connect((state, { id }) => ({ ids: selectReviewVocabIds(state, { id }) }))(
  ({ ids, isMidDetail, isHighDetail }) =>
    ids.map((vocabId) => (
      <ReadingWrapper key={cuid()}>
        {<VocabWord id={vocabId} showFuri={isMidDetail} showSecondary={isMidDetail} />}
        {isHighDetail && <PitchDiagramList id={vocabId} />}
        {isMidDetail && <TagsList id={vocabId} />}
        {isHighDetail && <ReadingLinks id={vocabId} />}
        {isHighDetail && <SentencePair id={vocabId} />}
        {isHighDetail && <StrokeLoader id={vocabId} />}
      </ReadingWrapper>
    ))
);

class QuizInfo extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    detailLevel: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    synonymIds: PropTypes.array.isRequired,
    isReviewLocked: PropTypes.bool.isRequired,
    lockReview: PropTypes.func.isRequired,
    unlockReview: PropTypes.func.isRequired,
    ...MeasureProps,
  };

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.isOpen && this.props.isOpen) ||
      (this.props.isOpen && prevProps.detailLevel !== this.props.detailLevel)
    ) {
      this.scrollIntoView();
    }
  }

  handleLock = () => {
    const { id, isReviewLocked, lockReview, unlockReview } = this.props;
    return isReviewLocked ? unlockReview({ id }) : lockReview({ id });
  };

  scrollIntoView = () => smoothScrollY(this.props.contentRect.bounds.top - 20, 500);

  render() {
    const {
      id,
      detailLevel,
      isOpen,
      isDisabled,
      measureRef,
      synonymIds,
      isReviewLocked,
    } = this.props;

    const isHighDetail = detailLevel === 2;
    const isMidDetail = detailLevel === 1 || isHighDetail;

    return (
      <Wrapper onClick={stopAutoAdvance} innerRef={measureRef} isMinimized={isDisabled || !isOpen}>
        <Readings id={id} isMidDetail={isMidDetail} isHighDetail={isHighDetail} />
        {isHighDetail && <Notes id={id} />}
        <VocabSynonymList ids={synonymIds} reviewId={id} />
        {isHighDetail && <VocabLockButton isLocked={isReviewLocked} onClick={this.handleLock} />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = selectCurrentId(state, props);

  return {
    id,
    detailLevel: selectInfoDetailLevel(state, props),
    isOpen: selectInfoOpen(state, props),
    isDisabled: selectInfoDisabled(state, props),
    synonymIds: selectReviewSynonymIds(state, { id }),
    isReviewLocked: selectIsHidden(state, { id }),
  };
};

const mapDispatchToProps = {
  lockReview: review.lock.request,
  unlockReview: review.unlock.request,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withContentRect('bounds'));

export default enhance(QuizInfo);
