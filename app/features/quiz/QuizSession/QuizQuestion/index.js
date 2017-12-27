import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { purple } from "common/styles/colors";

import { selectCurrentId } from "features/quiz/QuizSession/selectors";
import {
  selectPrimaryMeaning,
  selectSecondaryMeanings,
  selectPrimaryVocabId,
} from "features/reviews/selectors";
import { selectTags } from "features/vocab/selectors";

import Question from "./Question";
import { TagsList } from "common/components/TagsList";
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
  bgColor: PropTypes.string,
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
  bgColor: purple,
};

export function QuizQuestion({
  primaryMeaning,
  secondaryMeanings,
  tags,
  isFlyoverActive,
  streakChange,
  bgColor,
}) {
  return (
    <Wrapper bgColor={bgColor}>
      <Question primaryMeaning={primaryMeaning} secondaryMeanings={secondaryMeanings} />
      <TagsList tags={tags} isVisible={!isFlyoverActive} />
      {isFlyoverActive && <Flyover {...streakChange} />}
    </Wrapper>
  );
}

const mapStateToProps = (state, props) => {
  const reviewId = selectCurrentId(state, props);
  const primaryMeaning = selectPrimaryMeaning(state, { id: reviewId });
  const secondaryMeanings = selectSecondaryMeanings(state, { id: reviewId });
  const primaryVocabId = selectPrimaryVocabId(state, { id: reviewId });
  const tags = selectTags(state, { id: primaryVocabId });

  return {
    primaryMeaning,
    secondaryMeanings,
    tags,
    isFlyoverActive: false, // answerDisabled && category !== 'lessons,
    // have to store state somewhere I guess? if streak changes && answerMarked then update this?
    streakChange: {
      from: 0, // 0-8
      to: "IGNORED", // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, IGNORED]
    },
  };
};

export default connect(mapStateToProps)(QuizQuestion);
