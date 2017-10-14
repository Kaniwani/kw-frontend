import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, branch, renderComponent, shouldUpdate } from 'recompose';
import { isEqual } from 'lodash';

import {
  selectCurrent,
  makeSelectQuizMeanings,
  makeSelectReviewReadings,
  makeSelectReviewStreak,
} from 'components/App/selectors';

import { selectAnswerDisabled, selectAnswerIgnored } from 'pages/QuizPage/selectors';

import LoadingCrabigator from 'components/LoadingCrabigator';
import TagsList from 'components/TagsList';
import Flyover from './Flyover';

import {
  Wrapper,
  QuestionWrapper,
  Question,
  Primary,
  Secondary,
} from './styles';

QuizQuestion.propTypes = {
  category: PropTypes.string.isRequired,
  meanings: PropTypes.array.isRequired,
  readings: PropTypes.array.isRequired,
  answerDisabled: PropTypes.bool.isRequired,
  answerIgnored: PropTypes.bool.isRequired,
  streak: PropTypes.number.isRequired,
  prevStreak: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]).isRequired,
};

function QuizQuestion({ category, meanings, readings, streak, prevStreak, answerDisabled, answerIgnored }) {
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
      <TagsList tags={readings[0].tags} isHidden={answerDisabled} />
      {answerDisabled && category === 'reviews' && <Flyover from={prevStreak} to={streak} ignored={answerIgnored} />}
    </Wrapper>
  );
}

const mapStateToProps = (state, { category }) => {
  const { id, streak } = selectCurrent(state, { category });
  const prevStreak = makeSelectReviewStreak(id)(state);
  return {
    answerDisabled: selectAnswerDisabled(state),
    answerIgnored: selectAnswerIgnored(state),
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
    ({ answerDisabled, meanings, readings, streak }, nextProps) => (
      nextProps.answerIgnored || answerDisabled !== nextProps.answerDisabled || streak !== nextProps.streak ||
      !isEqual(meanings, nextProps.meanings) || !isEqual(readings, nextProps.readings)
    )
  ),
);

export default enhance(QuizQuestion);
