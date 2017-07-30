import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

import Icon from 'components/Icon';

import {
  selectPercentComplete,
  selectPercentCorrect,
  selectCorrectCount,
  selectRemainingCount,
} from 'containers/App/selectors';

import { Wrapper, SummaryLink, StatsWrapper, Stat, Label } from './styles';
import ProgressBar from './ProgressBar';

const mapStateToProps = createStructuredSelector({
  percentComplete: selectPercentComplete,
  percentCorrect: selectPercentCorrect,
  correctCount: selectCorrectCount,
  remainingCount: selectRemainingCount,
});

/* eslint-disable react/prop-types */
const enhance = compose(
  connect(mapStateToProps),
  onlyUpdateForPropTypes,
  setPropTypes({
    category: PropTypes.string.isRequired,
    percentComplete: PropTypes.number.isRequired,
    percentCorrect: PropTypes.number.isRequired,
    correctCount: PropTypes.number.isRequired,
    remainingCount: PropTypes.number.isRequired,
  })
);

function QuizHeader({
  category,
  percentComplete,
  percentCorrect,
  correctCount,
  remainingCount,
}) {
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
            <Label>{`${percentCorrect}%`}</Label>
          </Stat>
          <Stat title="Items complete">
            <Icon inline={false} size="1.1em" name="ASSIGNMENT_CHECK" />
            <Label>{correctCount}</Label>
          </Stat>
          <Stat title="Items remaining">
            <Icon inline={false} size="1.1em" name="ASSIGNMENT_INBOX" />
            <Label>{remainingCount}</Label>
          </Stat>
        </StatsWrapper>
      </Wrapper>
    </div>
  );
}

export default enhance(QuizHeader);
