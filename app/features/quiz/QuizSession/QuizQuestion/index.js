import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMoraCount } from 'hatsuon';

import { selectCurrent, selectIsLessonQuiz } from 'features/quiz/QuizSession/selectors';
import { selectAnswer } from 'features/quiz/QuizSession/QuizAnswer/selectors';
import {
  selectPrimaryMeaning,
  selectSecondaryMeanings,
  selectPrimaryVocabId,
} from 'features/reviews/selectors';
import { selectTags, selectPrimaryReading } from 'features/vocab/selectors';

import A from 'common/components/A';
import { TagsList } from 'common/components/TagsList';
import Question from './Question';
import Flyover from './Flyover';

import { Wrapper, Footer, MoraCount, MoraCountSpacer } from './styles';

export class QuizQuestion extends React.Component {
  static propTypes = {
    primaryMeaning: PropTypes.string,
    secondaryMeanings: PropTypes.array,
    tags: PropTypes.array,
    moraCount: PropTypes.number,
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
    moraCount: 0,
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
    const { isCorrect, streak } = this.props;
    // answer reset = new question
    if (!nextProps.isDisabled) {
      this.setState({ initialStreak: nextProps.streak });
    }
    // forced incorrect
    if (isCorrect && nextProps.isIncorrect) {
      this.setState({ initialStreak: streak });
    }
  }

  render() {
    const { initialStreak } = this.state;
    const {
      primaryMeaning,
      secondaryMeanings,
      tags,
      moraCount,
      isLessonQuiz,
      isDisabled,
      isIgnored,
      streak,
    } = this.props;
    return (
      <Wrapper>
        <Question primaryMeaning={primaryMeaning} secondaryMeanings={secondaryMeanings} />
        <Footer>
          {moraCount > 0 && (
            <A
              plainLink
              external
              href="https://en.wikipedia.org/wiki/On_(Japanese_prosody)#Examples"
            >
              <MoraCount lang="ja" title="Answer contains this many 音 (おん)">
                {moraCount}音
              </MoraCount>
            </A>
          )}
          <TagsList tags={tags} isVisible={!isDisabled} />
          {/* ensures TagsList is properly centered */}
          {moraCount > 0 && <MoraCountSpacer>{moraCount}音</MoraCountSpacer>}
        </Footer>
        {!isLessonQuiz && isDisabled && (
          <Flyover isIgnored={isIgnored} from={initialStreak} to={streak} />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id: reviewId, streak } = selectCurrent(state, props);
  const primaryVocabId = selectPrimaryVocabId(state, { id: reviewId });
  const reading = selectPrimaryReading(state, { id: primaryVocabId });
  const moraCount = getMoraCount(reading);
  const tags = selectTags(state, { id: primaryVocabId });
  const primaryMeaning = selectPrimaryMeaning(state, { id: reviewId });
  const secondaryMeanings = selectSecondaryMeanings(state, { id: reviewId });
  const isLessonQuiz = selectIsLessonQuiz(state, props);

  return {
    primaryMeaning,
    secondaryMeanings,
    tags,
    moraCount,
    streak,
    isLessonQuiz,
    ...selectAnswer(state, props),
  };
};

export default connect(mapStateToProps)(QuizQuestion);
