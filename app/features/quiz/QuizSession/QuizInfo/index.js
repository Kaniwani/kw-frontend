import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import cuid from 'cuid';
import { withContentRect, MeasureProps } from 'react-measure';
import { compose } from 'recompose';
import { isEqual, pick } from 'lodash';

import smoothScrollY from 'common/utils/smoothScrollY';
import review from 'features/reviews/actions';
import { selectCurrentId } from 'features/quiz/QuizSession/selectors';
import {
  selectReviewVocabIds,
  selectReviewSynonymIds,
  selectIsHidden,
} from 'features/reviews/selectors';
import { selectInfoDetailLevel, selectInfoDisabled, selectInfoOpen } from './selectors';

const ReadingWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

import VocabWord from 'common/components/VocabWord';
import VocabSynonymList from 'common/components/VocabSynonym';
import TagsList from 'common/components/TagsList';
import SentencePair from 'common/components/SentencePair';
import StrokeLoader from 'common/components/KanjiStroke';
import ReadingLinks from 'common/components/ReadingLinks';
import PitchDiagramList from 'common/components/PitchDiagram';
import VocabLockButton from 'common/components/VocabLockButton';
import Notes from 'features/reviews/Notes';

import { Wrapper } from './styles';

class QuizInfo extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    detailLevel: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    vocabIds: PropTypes.array.isRequired,
    synonymIds: PropTypes.array.isRequired,
    isReviewLocked: PropTypes.bool.isRequired,
    lockReview: PropTypes.func.isRequired,
    unlockReview: PropTypes.func.isRequired,
    ...MeasureProps,
  };

  // prevents strokeLoader being reset due to measure props changes
  // FIXME: if we extract vocabId connect and the vocabIds.map
  // to a separate component can most likely avoid this
  shouldComponentUpdate(nextProps, nextState) {
    const updateProps = [
      'detailLevel',
      'isOpen',
      'isDisabled',
      'vocabIds',
      'synonymIds',
      'isReviewLocked',
    ];
    const [current, next] = [pick(this.props, updateProps), pick(nextProps, updateProps)];
    return !isEqual(this.state, nextState) || !isEqual(current, next);
  }

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
      vocabIds,
      synonymIds,
      isReviewLocked,
    } = this.props;

    const isMidDetail = detailLevel >= 1;
    const isHighDetail = detailLevel === 2;

    return (
      <Wrapper innerRef={measureRef} isMinimized={isDisabled || !isOpen}>
        {vocabIds.map((vocabId) => (
          <ReadingWrapper key={cuid()}>
            {<VocabWord id={vocabId} showFuri={isMidDetail} showSecondary={isMidDetail} />}
            {isHighDetail && <PitchDiagramList id={vocabId} />}
            {isMidDetail && <TagsList id={vocabId} />}
            {isHighDetail && <ReadingLinks id={vocabId} />}
            {isHighDetail && <SentencePair id={vocabId} />}
            {isHighDetail && <StrokeLoader id={vocabId} />}
          </ReadingWrapper>
        ))}
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
    vocabIds: selectReviewVocabIds(state, { id }),
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
