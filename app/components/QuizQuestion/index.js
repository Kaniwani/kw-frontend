import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderComponent, shouldUpdate } from 'recompose';
import isEqual from 'lodash/isEqual';
import getSrsRankName from 'utils/getSrsRankName';
import titleCase from 'voca/title_case';

import {
  selectCurrentId,
  makeSelectQuizMeanings,
  makeSelectReviewReadings,
  makeSelectReviewStreak,
} from 'containers/App/selectors';

import { selectAnswerDisabled, selectBackup } from 'containers/QuizPage/selectors';

import LoadingCrabigator from 'components/LoadingCrabigator';
import TagsList from 'components/TagsList';

import {
  Wrapper,
  QuestionWrapper,
  Question,
  Primary,
  Secondary,
  StreakAnimation,
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

// FIXME: use react-motion or react-anime for animation
function StreakChange({ from, to }) {
  const [fromName, toName] = [from, to].map(getSrsRankName);
  const rankUp = to > from;
  const changed = fromName !== toName;
  const glyph = rankUp ? '⏫' : '⏬';
  return (
    <StreakAnimation streakName={toName}>
      {changed ? `${glyph}  ${titleCase(toName)}` : '　'}
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
      {answerChecked ? <StreakChange from={prevStreak} to={streak} /> : <TagsList tags={readings[0].tags} />}
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
    meanings: makeSelectQuizMeanings(id)(state),
    readings: makeSelectReviewReadings(id)(state),
    streak,
    prevStreak,
  };
};

const enhance = compose(
  connect(mapStateToProps),
  branch(
    ({ meanings, readings }) => !meanings.length || !readings.length,
    renderComponent(LoadingCrabigator)
  ),
  shouldUpdate(
    ({ answerChecked, meanings, readings, streak }, nextProps) => (
      answerChecked !== nextProps.answerChecked || streak !== nextProps.streak ||
      !isEqual(meanings, nextProps.meanings) || !isEqual(readings, nextProps.readings)
    )
  ),
);

export default enhance(QuizQuestion);
