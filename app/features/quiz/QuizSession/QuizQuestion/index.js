import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { purple } from 'common/styles/colors';

import { selectCurrent, selectIsLessonQuiz } from 'features/quiz/QuizSession/selectors';
import {
  selectAnswerDisabled,
  selectAnswerIgnored,
} from 'features/quiz/QuizSession/QuizAnswer/selectors';
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
    isFlyoverActive: PropTypes.bool,
    isAnswerIgnored: PropTypes.bool,
    isAnswerDisabled: PropTypes.bool,
    streak: PropTypes.number,
    bgColor: PropTypes.string,
  };

  static defaultProps = {
    primaryMeaning: '',
    secondaryMeanings: [],
    tags: [],
    streak: null,
    isFlyoverActive: false,
    isAnswerIgnored: false,
    isAnswerDisabled: false,
    bgColor: purple,
  };

  state = {
    initialStreak: this.props.streak,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAnswerDisabled === false) {
      this.setState({ initialStreak: nextProps.streak });
    }
  }

  render() {
    const {
      primaryMeaning,
      secondaryMeanings,
      tags,
      isFlyoverActive,
      isAnswerIgnored,
      bgColor,
    } = this.props;
    return (
      <Wrapper bgColor={bgColor}>
        <Question primaryMeaning={primaryMeaning} secondaryMeanings={secondaryMeanings} />
        <TagsList tags={tags} isVisible={!isFlyoverActive} />
        {isFlyoverActive && (
          <Flyover
            isIgnored={isAnswerIgnored}
            from={this.state.initialStreak}
            to={this.props.streak}
          />
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
  const isAnswerDisabled = selectAnswerDisabled(state, props);
  const isAnswerIgnored = selectAnswerIgnored(state, props);
  const isLessonQuiz = selectIsLessonQuiz(state, props);

  return {
    primaryMeaning,
    secondaryMeanings,
    tags,
    isFlyoverActive: isAnswerDisabled && !isLessonQuiz,
    streak,
    isAnswerDisabled,
    isAnswerIgnored,
  };
};

export default connect(mapStateToProps)(QuizQuestion);
