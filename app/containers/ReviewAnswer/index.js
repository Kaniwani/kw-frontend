/**
*
* ReviewAnswer
*
*/
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentStreak,
} from 'containers/Review/selectors';

import {
  markIgnored,
  checkAnswer,
} from 'containers/Review/actions';

import AnswerInput from 'containers/AnswerInput';
import StreakIcon from './StreakIcon';
import IgnoreButton from './IgnoreButton';
import SubmitButton from './SubmitButton';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

class ReviewAnswer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { streak, checkAnswer, ignoreAnswer } = this.props; // eslint-disable-line no-shadow

    return (
      <Wrapper>
        <StreakIcon streak={streak} />
        <AnswerInput />
        <IgnoreButton onIgnoreClick={ignoreAnswer} />
        <SubmitButton onSubmit={checkAnswer} />
        {/* <StreakAnimation /> */}
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  streak: selectCurrentStreak(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAnswer: () => dispatch(checkAnswer()),
    ignoreAnswer: () => dispatch(markIgnored()),
  };
}

ReviewAnswer.propTypes = {
  streak: PropTypes.number,
  checkAnswer: PropTypes.func.isRequired,
  ignoreAnswer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer);
