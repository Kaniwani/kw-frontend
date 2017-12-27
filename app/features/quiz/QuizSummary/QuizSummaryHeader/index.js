import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { titleCase } from 'voca';

import { selectOnVacation } from 'features/user/selectors';
import { selectRemainingCount } from 'features/quiz/QuizSession/selectors';
import quiz from 'features/quiz/actions';
import LogoLink from 'common/components/LogoLink';
import SessionLink from './SessionLink';

import { Header, Wrapper, Heading } from './styles';

QuizSummaryHeader.propTypes = {
  heading: PropTypes.string, // {titleCase(category)} Summary
  linkText: PropTypes.string, // (onVacation && 'On Vacation!') || (isDisabled ? `No ${titleCase(category)}` : 'Begin Session')
  count: PropTypes.number, // remainingCount
  sessionRoute: PropTypes.string, // `/${category}/session`
  isDisabled: PropTypes.bool, // onVacation || remainingCount < 1;
  onResetSummary: PropTypes.func, // reset recent history
};

QuizSummaryHeader.defaultProps = {
  heading: 'Quiz Summary',
  linkText: 'No Reviews',
  count: 0,
  sessionRoute: '/reviews/session',
  isDisabled: false,
  onResetSummary: () => {},
};

export function QuizSummaryHeader({
  heading,
  linkText,
  count,
  sessionRoute,
  isDisabled,
  onResetSummary,
}) {
  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Heading>{heading}</Heading>
        <SessionLink
          isDisabled={isDisabled}
          text={linkText}
          to={sessionRoute}
          count={count}
          onClick={isDisabled ? () => {} : onResetSummary}
        />
      </Wrapper>
    </Header>
  );
}

const mapStateToProps = (state, { category }) => {
  const isOnVacation = selectOnVacation(state);
  const remainingCount = selectRemainingCount(state, { category });
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

const mapDispatchToProps = (dispatch, { category }) => ({
  onResetSummary: () => dispatch(quiz.summary.reset({}, { category })),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryHeader);
