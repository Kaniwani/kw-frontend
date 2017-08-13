import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { selectIdFromMatch, makeSelectReview } from 'containers/App/selectors';
import actions from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';
// import VocabEntry from 'components/VocabEntry';
// import VocabEntryDetail from 'components/VocabEntryDetail';

import VocabEntryNotes from 'components/VocabEntryNotes';
import StreakStatus from 'components/VocabEntryDetail/StreakStatus';
import Status from 'components/VocabEntryDetail/Status';
import CriticalStatus from 'components/VocabEntryDetail/CriticalStatus';
import ReviewStatus from 'components/VocabEntryDetail/ReviewStatus';
import QuizStatus from 'components/VocabEntryDetail/QuizStatus';
import VocabEntryMeanings from 'components/VocabEntryMeanings';
import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';
import AddSynonym from 'components/AddSynonym';
import VocabEntryLock from 'components/VocabEntryLock';

import { MeaningsWrapper, SynonymsWrapper } from 'components/VocabEntry/styles';
import getDateInWords from 'utils/getDateInWords';
import calculatePercentage from 'utils/calculatePercentage';

import { Ul as ReadingsUl } from 'components/VocabEntryReadings/styles';
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;

  & ${ReadingsUl} {
    display: flex;
    flex-flow: row wrap;
  }
`;

const correctness = (correct, incorrect) => {
  const total = correct + incorrect;
  const previouslyAnswered = total > 0;
  return previouslyAnswered ? calculatePercentage(correct, total) : 0;
};


export class VocabEntryPage extends React.Component {
  static propTypes = {
    loadReview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    review: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
  }

  componentDidMount() {
    this.props.loadReview(this.props.id);
  }

  // TODO: rather than pass down id or review, we could store in a super simple reducer,
  // then select deep inside individual components
  // OR: use recompose shouldComponentUpdate() liberally
  render() {
    const { id, review } = this.props;
    return (
      <div>
        <Helmet>
          <title>Vocabulary: Entry</title>
          <meta name="description" content="Kaniwani Vocabulary: Entry" />
        </Helmet>
        <PageWrapper>
          <Wrapper>
            <div style={{ alignSelf: 'center' }}>
              <MeaningsWrapper>
                <VocabEntryMeanings id={id} />
              </MeaningsWrapper>
            </div>

            <div style={{ alignSelf: 'center' }}>
              <VocabEntryLock id={id} />
            </div>

            <div>
              <VocabEntryReadings id={id} />
              <SynonymsWrapper>
                <VocabEntrySynonyms id={id} />
              </SynonymsWrapper>
            </div>
            <div style={{ border: '2px solid grey', borderRadius: '5px' }}>
              <StreakStatus category="KW" streak={review.streak} />
              <StreakStatus category="WK" streak={review.wkStreak} />
              <Status text="Unlocked" status={getDateInWords(review.unlockDate)} />
              <Status text="Last reviewed" status={getDateInWords(review.lastReviewDate)} />
              <ReviewStatus review={review} />
              <div style={{ display: 'flex', width: '100%' }}>
                <QuizStatus text="Correct" status={review.correct} />
                <QuizStatus text="Incorrect" status={review.incorrect} />
                <QuizStatus text="Correctness" status={correctness(review.correct, review.incorrect) || 'N/A'} />
              </div>
              <CriticalStatus isCritical={review.isCritical} />
              <VocabEntryNotes id={review.id} />
              <AddSynonym id={id} />
            </div>
          </Wrapper>
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = selectIdFromMatch(props);
  return {
    id,
    review: makeSelectReview(id)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => dispatch(actions.review.load.request({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
