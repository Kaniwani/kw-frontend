import React from "react";
import PropTypes from "prop-types";

import TagsList from "components/TagsList";
import Question from "./Question";
import Flyover, { IGNORED } from "./Flyover";

import { Wrapper } from "./styles";

QuizQuestion.propTypes = {
  primaryMeaning: PropTypes.string,
  secondaryMeanings: PropTypes.array,
  tags: PropTypes.array,
  isFlyoverActive: PropTypes.bool, // answerDisabled && category !== 'lessons'
  streakChange: PropTypes.shape({
    from: PropTypes.number, // 0-8
    to: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, IGNORED]),
  }),
};

QuizQuestion.defaultProps = {
  primaryMeaning: "",
  secondaryMeanings: [],
  tags: [],
  isFlyoverActive: false,
  streakChange: {
    from: 0,
    to: 0,
  },
};

function QuizQuestion({
  primaryMeaning,
  secondaryMeanings,
  tags,
  isFlyoverActive,
  streakChange,
}) {
  return (
    <Wrapper>
      <Question primaryMeaning={primaryMeaning} secondaryMeanings={secondaryMeanings} />
      <TagsList tags={tags} isVisible={!isFlyoverActive} />
      {isFlyoverActive && <Flyover {...streakChange} />}
    </Wrapper>
  );
}

export default QuizQuestion;
