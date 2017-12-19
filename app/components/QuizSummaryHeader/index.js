import React from "react";
import PropTypes from "prop-types";

import LogoLink from "components/LogoLink";
import SessionLink from "./SessionLink";

import { Header, Wrapper, Heading } from "./styles";

QuizSummaryHeader.propTypes = {
  heading: PropTypes.string, // {titleCase(category)} Summary
  linkText: PropTypes.string, // (onVacation && 'On Vacation!') || (isDisabled ? `No ${titleCase(category)}` : 'Begin Session')
  count: PropTypes.number, // remainingCount
  sessionRoute: PropTypes.func, // `/${category}/session`
  isDisabled: PropTypes.bool, // onVacation || remainingCount < 1;
  onResetSummary: PropTypes.func, // reset recent history
};

QuizSummaryHeader.defaultProps = {
  heading: "Quiz Summary",
  linkText: "No Reviews",
  count: 0,
  sessionRoute: "/reviews/session",
  isDisabled: false,
  onResetSummary: () => {},
};

function QuizSummaryHeader({
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

export default QuizSummaryHeader;
