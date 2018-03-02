import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { titleCase } from 'voca';

import { selectReviewsCount, selectLessonsCount, selectOnVacation } from 'features/user/selectors';
import { selectSessionRemainingCount } from 'features/quiz/QuizSession/selectors';
import quiz from 'features/quiz/actions';
import SessionLink from './SessionLink';

import { Wrapper, Heading } from './styles';

QuizSummaryHeader.propTypes = {
  heading: PropTypes.string,
  linkText: PropTypes.string,
  count: PropTypes.number,
  sessionRoute: PropTypes.string,
  isDisabled: PropTypes.bool,
  onSessionStart: PropTypes.func,
};

QuizSummaryHeader.defaultProps = {
  heading: 'Quiz Summary',
  linkText: 'No Reviews',
  count: 0,
  sessionRoute: '/reviews/session',
  isDisabled: false,
  onSessionStart: () => {},
};

export function QuizSummaryHeader({
  heading,
  linkText,
  count,
  sessionRoute,
  isDisabled,
  onSessionStart,
}) {
  return (
    <Wrapper>
      <Heading>{heading} Summary</Heading>
      <SessionLink
        isDisabled={isDisabled}
        text={linkText}
        to={sessionRoute}
        count={count}
        onClick={isDisabled ? () => {} : onSessionStart}
      />
    </Wrapper>
  );
}

const mapStateToProps = (state, props) => {
  const { category } = props.match.params;
  const fromSession = /session/.test(state.app.fromPath);
  const sessionRemainingCount = selectSessionRemainingCount(state, { category });
  const isOnVacation = selectOnVacation(state);
  const remainingCount =
    fromSession && !sessionRemainingCount
      ? 0
      : category === 'reviews' ? selectReviewsCount(state) : selectLessonsCount(state);

  const categoryTitle = titleCase(category);
  const isHeaderLinkDisabled = isOnVacation || remainingCount < 1;
  const headerLinkText =
    (isOnVacation && 'On Vacation!') ||
    (isHeaderLinkDisabled ? `No ${titleCase(category)}` : 'Begin Session');

  return {
    heading: categoryTitle,
    linkText: headerLinkText,
    count: remainingCount,
    sessionRoute: `/${category}/session`,
    isDisabled: isHeaderLinkDisabled,
  };
};

const mapDispatchToProps = (dispatch, { match }) => ({
  onSessionStart: () => {
    dispatch(quiz.summary.reset({}, { category: match.params.category }));
    dispatch(quiz.session.reset());
    // FIXME: could preload on mouseEnter as well
    // but we need to set quiz isLoading to prevent double request on quizSessionpage mount
    //    dispatch(quiz.session.queue.load.request(match.params.category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryHeader);
