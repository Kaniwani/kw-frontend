import React from "react";
import PropTypes from "prop-types";

import Aux from "common/components/Aux";
import QuizSummaryHeader from "./QuizSummaryHeader";
import QuizSummarySections from "./QuizSummarySections";

QuizSummary.propTypes = {
  category: PropTypes.string.isRequired,
};

export function QuizSummary({ category }) {
  return (
    <Aux>
      <QuizSummaryHeader category={category} />
      <QuizSummarySections category={category} />
    </Aux>
  );
}

export default QuizSummary;
