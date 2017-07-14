import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'components/Icon';

import {
  selectPercentComplete,
  selectPercentCorrect,
  selectCompleteCount,
  selectRemainingCount,
} from 'containers/App/selectors';

import { Wrapper, SummaryLink, StatsWrapper, Stat, Label } from './styles';
import ProgressBar from './ProgressBar';

QuizHeader.propTypes = {
  category: PropTypes.string.isRequired,
  percentComplete: PropTypes.number.isRequired,
  percentCorrect: PropTypes.number.isRequired,
  completeCount: PropTypes.number.isRequired,
  remainingCount: PropTypes.number.isRequired,
};

function QuizHeader({ category, percentComplete, percentCorrect, completeCount, remainingCount }) {
  return (
    <div>
      <ProgressBar value={percentComplete} />
      <Wrapper>
        <SummaryLink to={`/${category}`} title="View session summary">
          <Icon name="SUMMARY" size="1.5em" />
        </SummaryLink>
        <StatsWrapper>
          <Stat title="Correctness">
            <Icon inline={false} size="1.15em" name="CHECK" />
            <Label>{`${percentCorrect || 100}%`}</Label>
          </Stat>
          <Stat title="Reviews complete">
            <Icon inline={false} size="1.1em" name="ASSIGNMENT_CHECK" />
            <Label>{completeCount}</Label>
          </Stat>
          <Stat title="Reviews remainingCount">
            <Icon inline={false} size="1.1em" name="ASSIGNMENT_INBOX" />
            <Label>{remainingCount}</Label>
          </Stat>
        </StatsWrapper>
      </Wrapper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  percentComplete: selectPercentComplete,
  percentCorrect: selectPercentCorrect,
  completeCount: selectCompleteCount,
  remainingCount: selectRemainingCount,
});

export default connect(mapStateToProps)(QuizHeader);
