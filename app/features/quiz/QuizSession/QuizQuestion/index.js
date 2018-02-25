import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectCurrent, selectIsLessonQuiz } from 'features/quiz/QuizSession/selectors';
import { selectAnswer } from 'features/quiz/QuizSession/QuizAnswer/selectors';
import {
  selectPrimaryMeaning,
  selectSecondaryMeanings,
  selectPrimaryVocabId,
} from 'features/reviews/selectors';
import { selectTags } from 'features/vocab/selectors';

import Question from './Question';
import { TagsList } from 'common/components/TagsList';
import Flyover from './Flyover';

import { Wrapper } from './styles';

export class QuizQuestion extends React.Component {
  static propTypes = {
    primaryMeaning: PropTypes.string,
    secondaryMeanings: PropTypes.array,
    tags: PropTypes.array,
    streak: PropTypes.number,
    isLessonQuiz: PropTypes.bool,
    isIgnored: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isCorrect: PropTypes.bool,
    isIncorrect: PropTypes.bool,
  };

  static defaultProps = {
    primaryMeaning: '',
    secondaryMeanings: [],
    tags: [],
    streak: null,
    isLessonQuiz: false,
    isIgnored: false,
    isDisabled: false,
    isCorrect: false,
    isIncorrect: false,
  };

  state = {
    initialStreak: this.props.streak,
  };

  componentWillReceiveProps(nextProps) {
    // answer reset = new question
    if (!nextProps.isDisabled) {
      this.setState({ initialStreak: nextProps.streak });
    }
    // forced incorrect
    if (this.props.isCorrect && nextProps.isIncorrect) {
      this.setState({ initialStreak: this.props.streak });
    }
  }

  render() {
    const {
      primaryMeaning,
      secondaryMeanings,
      tags,
      isLessonQuiz,
      isDisabled,
      isIgnored,
    } = this.props;
    return (
      <Wrapper>
        <Question primaryMeaning={primaryMeaning} secondaryMeanings={secondaryMeanings} />
        <TagsList tags={tags} isVisible={!isDisabled} />
        {!isLessonQuiz &&
          isDisabled && (
            <Flyover isIgnored={isIgnored} from={this.state.initialStreak} to={this.props.streak} />
          )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id: reviewId, streak } = selectCurrent(state, props);
  const primaryVocabId = selectPrimaryVocabId(state, { id: reviewId });
  const tags = selectTags(state, { id: primaryVocabId });
  const primaryMeaning = selectPrimaryMeaning(state, { id: reviewId });
  const secondaryMeanings = selectSecondaryMeanings(state, { id: reviewId });
  const isLessonQuiz = selectIsLessonQuiz(state, props);

  return {
    primaryMeaning,
    secondaryMeanings,
    tags,
    streak,
    isLessonQuiz,
    ...selectAnswer(state, props),
  };
};

export default connect(mapStateToProps)(QuizQuestion);
