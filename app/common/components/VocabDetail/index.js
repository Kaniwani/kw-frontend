import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import styled from 'styled-components';

import review from 'features/reviews/actions';
import { selectVocabById } from 'features/vocab/selectors';
import {
  selectReviewVocabIds,
  selectReviewSynonymIds,
  selectIsHidden,
} from 'features/reviews/selectors';

import { gutter } from 'common/styles/layout';

const ReadingWrapper = styled.div`
  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

const SentenceWrapper = styled.div`
  ${gutter({ type: 'outer', position: 'vertical' })};
`;

import VocabMeaning from 'common/components/VocabMeaning';
import VocabWord from 'common/components/VocabWord';
import VocabSynonymList from 'common/components/VocabSynonym';
import TagsList from 'common/components/TagsList';
import SentencePair from 'common/components/SentencePair';
import StrokeLoader from 'common/components/KanjiStroke';
import ReadingLinks from 'common/components/ReadingLinks';
import PitchDiagramList from 'common/components/PitchDiagram';
import AddSynonym from 'common/components/AddSynonym';
import VocabLockButton from 'common/components/VocabLockButton';
import VocabStats from 'features/vocab/Entry/VocabStats';
import Notes from 'features/reviews/Notes';
import Element from 'common/components/Element';
import A from 'common/components/A';
import H1 from 'common/components/H1';
import H3 from 'common/components/H3';

VocabDetail.propTypes = {
  id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  vocabIds: PropTypes.array.isRequired,
  synonymIds: PropTypes.array.isRequired,
  isReviewLocked: PropTypes.bool.isRequired,
  lockReview: PropTypes.func.isRequired,
  unlockReview: PropTypes.func.isRequired,
};

export function VocabDetail({
  id,
  level,
  vocabIds,
  synonymIds,
  isReviewLocked,
  lockReview,
  unlockReview,
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <div>
        <VocabMeaning id={id} renderPrimary={({ text }) => <H1>{text}</H1>} />
        <div>
          {vocabIds.map((vocabId) => (
            <ReadingWrapper key={cuid()}>
              <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-end' }}>
                <div style={{ marginRight: '1rem' }}>
                  <VocabWord id={vocabId} showFuri showSecondary />
                </div>
                <PitchDiagramList id={vocabId} />
              </div>
              <ReadingLinks id={vocabId} />
              <TagsList id={vocabId} />
              <SentenceWrapper>
                <SentencePair id={vocabId} />
              </SentenceWrapper>
              <StrokeLoader id={vocabId} />
            </ReadingWrapper>
          ))}
        </div>
        <Notes id={id} />
        <div>
          <AddSynonym id={id} />
          <VocabSynonymList ids={synonymIds} reviewId={id} />
        </div>
      </div>
      <div>
        <Element>
          <H3 style={{ fontWeight: '400' }}>
            <A to={`/vocabulary/levels/${level}`}>Level {level}</A>
          </H3>
        </Element>
        <VocabStats id={id} />
        <Element>
          <VocabLockButton
            isLocked={isReviewLocked}
            onClick={isReviewLocked ? unlockReview : lockReview}
          />
        </Element>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const vocabIds = selectReviewVocabIds(state, props);
  const { level } = selectVocabById(state, { id: vocabIds[0] });
  return {
    vocabIds,
    level,
    synonymIds: selectReviewSynonymIds(state, props),
    isReviewLocked: selectIsHidden(state, props),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  lockReview: () => dispatch(review.lock.request(props)),
  unlockReview: () => dispatch(review.unlock.request(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabDetail);
