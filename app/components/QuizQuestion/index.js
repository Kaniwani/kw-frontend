import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';
import getSrsRankName from 'utils/getSrsRankName';

import {
  selectCurrentId,
  makeSelectReviewMeanings,
  makeSelectReviewReadings,
  makeSelectReviewStreak,
} from 'containers/App/selectors';

import { selectAnswerDisabled, selectBackup } from 'containers/QuizPage/selectors';

import LoadingIndicator from 'components/LoadingIndicator';

import {
  Wrapper,
  QuestionWrapper,
  Question,
  Primary,
  Secondary,
  Tags,
  StreakAnimation,
  StreakContent,
} from './styles';

QuizQuestion.propTypes = {
  meanings: PropTypes.array.isRequired,
  readings: PropTypes.array.isRequired,
  answerChecked: PropTypes.bool.isRequired,
  streak: PropTypes.number.isRequired,
  prevStreak: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
};
// FIXME: animation wuh
function StreakChange(from, to) {
  const [fromName, toName] = [from, to].map(getSrsRankName);
  const rankUp = to > from;
  const text = `${rankUp ? '⏫' : '⏬'} ${toName}`;
  return (
    <StreakAnimation
      changed={fromName !== toName}
      rankUp={rankUp}
      streakName={toName}
    >
      <StreakContent>{text}</StreakContent>
    </StreakAnimation>
  );
}

function QuizQuestion({ answerChecked, meanings, readings, streak, prevStreak }) {
  const [primaryTerm, ...rest] = meanings;
  // Enforce a min-height even if no terms by using japanese space ^_^
  const secondaryTerms = rest.length ? rest.join(', ') : '　';
  return (
    <Wrapper>
      <QuestionWrapper>
        <Question>
          <Primary>{primaryTerm}</Primary>
          <Secondary>{secondaryTerms}</Secondary>
        </Question>
      </QuestionWrapper>
      <Tags isInvisible={answerChecked} tags={readings[0].tags} />
      <StreakChange from={prevStreak} to={streak} />
    </Wrapper>
  );
}

const mapStateToProps = (state, { category }) => {
  const id = selectCurrentId(state, { category });
  const backup = selectBackup(state);
  const streak = makeSelectReviewStreak(id)(state);
  const prevStreak = backup ? backup.streak : streak;
  return {
    answerChecked: selectAnswerDisabled(state),
    meanings: makeSelectReviewMeanings(id)(state),
    readings: makeSelectReviewReadings(id)(state),
    streak,
    prevStreak,
  };
};

const enhance = compose(
  connect(mapStateToProps),
  branch(
    ({ meanings, readings }) => !meanings.length || !readings.length,
    renderComponent(LoadingIndicator)
  ),
);

export default enhance(QuizQuestion);
