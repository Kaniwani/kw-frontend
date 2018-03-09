import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import review from 'features/reviews/actions';

import {
  selectReviewVocabIds,
  selectReviewSynonymIds,
  selectIsHidden,
} from 'features/reviews/selectors';

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
import AddSynonym from 'common/components/AddSynonym';
import VocabLockButton from 'common/components/VocabLockButton';
import Notes from 'features/reviews/Notes';
import styled from 'styled-components';

VocabDetail.propTypes = {
  showFuri: PropTypes.bool,
  showSecondaryReadings: PropTypes.bool,
  showTags: PropTypes.bool,
  showLinks: PropTypes.bool,
  showSentence: PropTypes.bool,
  showPitch: PropTypes.bool,
  showStroke: PropTypes.bool,
  showNotes: PropTypes.bool,
  showLock: PropTypes.bool,
  showAddSynoynm: PropTypes.bool,
  id: PropTypes.number.isRequired,
  vocabIds: PropTypes.array.isRequired,
  synonymIds: PropTypes.array.isRequired,
  isReviewLocked: PropTypes.bool,
  lockReview: PropTypes.func.isRequired,
  unlockReview: PropTypes.func.isRequired,
};

VocabDetail.defaultProps = {
  isReviewLocked: false,
  showFuri: true,
  showSecondaryReadings: true,
  showTags: true,
  showLinks: true,
  showSentence: true,
  showPitch: true,
  showStroke: true,
  showNotes: true,
  showAddSynoynm: true,
  showLock: true,
};

export function VocabDetail({
  id,
  vocabIds,
  synonymIds,
  isReviewLocked,
  showFuri,
  showSecondaryReadings,
  showTags,
  showLinks,
  showSentence,
  showPitch,
  showStroke,
  showNotes,
  showAddSynoynm,
  showLock,
  lockReview,
  unlockReview,
}) {
  return (
    <Fragment>
      {vocabIds.map((vocabId) => (
        <ReadingWrapper key={cuid()}>
          {<VocabWord id={vocabId} showFuri={showFuri} showSecondary={showSecondaryReadings} />}
          {showPitch && <PitchDiagramList id={vocabId} />}
          {showTags && <TagsList id={vocabId} />}
          {showLinks && <ReadingLinks id={vocabId} />}
          {showSentence && <SentencePair id={vocabId} />}
          {showStroke && <StrokeLoader id={vocabId} />}
        </ReadingWrapper>
      ))}
      {showNotes && <Notes id={id} />}
      {showAddSynoynm && <AddSynonym id={id} />}
      <VocabSynonymList ids={synonymIds} reviewId={id} />
      {showLock && (
        <VocabLockButton
          isLocked={isReviewLocked}
          onClick={isReviewLocked ? unlockReview : lockReview}
        />
      )}
    </Fragment>
  );
}

const mapStateToProps = (state, props) => ({
  vocabIds: selectReviewVocabIds(state, props),
  synonymIds: selectReviewSynonymIds(state, props),
  isReviewLocked: selectIsHidden(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  lockReview: () => dispatch(review.lock.request(props)),
  unlockReview: () => dispatch(review.unlock.request(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabDetail);
