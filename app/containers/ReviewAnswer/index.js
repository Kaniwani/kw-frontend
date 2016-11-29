/**
*
* ReviewAnswer
*
*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentStreak } from 'containers/Review/selectors';
import {
  selectAnswerMarked,
  selectAnswerValid,
 } from 'containers/AnswerInput/selectors';

import {
  markIgnored,
  checkAnswer,
  processAnswer,
} from 'containers/Review/actions';

import AnswerInput from 'containers/AnswerInput';
import Form from './Form';
import StreakIcon from './StreakIcon';
import SubmitButton from './SubmitButton';
import IgnoreButton from './IgnoreButton';

class ReviewAnswer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { streak, marked, valid, checkAnswer, processAnswer, ignoreAnswer } = this.props; // eslint-disable-line no-shadow
    return (
      <Form
        marked={marked}
        valid={valid}
        onSubmit={marked && valid ? processAnswer : checkAnswer}
      >
        <StreakIcon streak={streak} />
        <AnswerInput />
        <IgnoreButton onIgnoreClick={ignoreAnswer} />
        <SubmitButton />
        {/* <StreakAnimation /> */}
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  streak: selectCurrentStreak(),
  marked: selectAnswerMarked(),
  valid: selectAnswerValid(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAnswer: (event) => {
      event.preventDefault();
      dispatch(checkAnswer());
    },
    processAnswer: (event) => {
      event.preventDefault();
      dispatch(processAnswer());
    },
    ignoreAnswer: () => dispatch(markIgnored()),
  };
}

ReviewAnswer.propTypes = {
  streak: PropTypes.number,
  marked: PropTypes.bool,
  valid: PropTypes.bool,
  checkAnswer: PropTypes.func.isRequired,
  processAnswer: PropTypes.func.isRequired,
  ignoreAnswer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer);
