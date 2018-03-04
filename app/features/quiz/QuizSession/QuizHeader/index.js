import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectCategory,
  selectPercentComplete,
  selectPercentCorrect,
  selectCorrectCount,
  selectSessionRemainingCount,
} from 'features/quiz/QuizSession/selectors';

import Icon from 'common/components/Icon';
import IconLink from 'common/components/IconLink';
import ProgressBar from './ProgressBar';
import { Wrapper, StatsWrapper, Stat, Label } from './styles';

QuizHeader.propTypes = {
  summaryRoute: PropTypes.string.isRequired, // /lessons, /reviews
  percentComplete: PropTypes.number,
  percentCorrect: PropTypes.number,
  correctCount: PropTypes.number,
  remainingCount: PropTypes.number,
};

QuizHeader.defaultProps = {
  percentComplete: 0,
  percentCorrect: 0,
  correctCount: 0,
  remainingCount: 0,
};

export function QuizHeader({
  summaryRoute,
  percentComplete,
  percentCorrect,
  correctCount,
  remainingCount,
}) {
  return (
    <Wrapper>
      <ProgressBar value={percentComplete} />
      <IconLink
        plainLink
        style={{ opacity: 1 }}
        to={summaryRoute}
        title="View session summary"
        name="SUMMARY"
        size="1.4em"
      />
      <StatsWrapper>
        <Stat title="Correctness">
          <Icon inline={false} size="1.15em" name="CHECK" />
          <Label>{`${percentCorrect}%`}</Label>
        </Stat>
        <Stat title="Items complete">
          <Icon inline={false} size="1.1em" name="ASSIGNMENT_CHECK" />
          <Label>{correctCount}</Label>
        </Stat>
        <Stat title="Items remaining">
          <Icon inline={false} size="1.1em" name="ASSIGNMENT_INBOX" />
          <Label>{Math.max(remainingCount - 1, 0) /* don't include current question */}</Label>
        </Stat>
      </StatsWrapper>
    </Wrapper>
  );
}

const mapStateToProps = (state, props) => ({
  summaryRoute: `/${selectCategory(state, props)}`,
  percentComplete: selectPercentComplete(state, props),
  percentCorrect: selectPercentCorrect(state, props),
  correctCount: selectCorrectCount(state, props),
  remainingCount: selectSessionRemainingCount(state, props),
});

export default connect(mapStateToProps)(QuizHeader);
