import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { purple } from "common/styles/colors";

import {
  selectCategory,
  selectPercentComplete,
  selectPercentCorrect,
  selectCorrectCount,
  selectRemainingCount,
} from 'features/quiz/QuizSession/selectors';

import Icon from "common/components/Icon";
import IconLink from "common/components/IconLink";
import ProgressBar from "./ProgressBar";
import { Wrapper, StatsWrapper, Stat, Label } from "./styles";

QuizHeader.propTypes = {
  summaryRoute: PropTypes.string.isRequired, // /lessons, /reviews
  percentComplete: PropTypes.number,
  percentCorrect: PropTypes.number,
  correctCount: PropTypes.number,
  remainingCount: PropTypes.number,
  bgColor: PropTypes.string,
};

QuizHeader.defaultProps = {
  percentComplete: 0,
  percentCorrect: 0,
  correctCount: 0,
  remainingCount: 0,
  bgColor: purple,
};

export function QuizHeader({
  summaryRoute,
  percentComplete,
  percentCorrect,
  correctCount,
  remainingCount,
  bgColor,
}) {
  return (
    <Wrapper bgColor={bgColor}>
      <ProgressBar value={percentComplete} />
      <IconLink
        plainLink
        // FIXME: remove style and allow toggling fade on/off as prop in <IconLink />
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
          <Label>{remainingCount}</Label>
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
  remainingCount: selectRemainingCount(state, props),
});

export default connect(mapStateToProps)(QuizHeader);
