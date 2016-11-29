/**
*
* ReviewAnswer
*
*/
import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import blockEvent from 'utils/blockEvent';

import {
  selectCurrentStreak,
} from 'containers/Review/selectors';

import {
  selectInputMatches,
} from 'containers/AnswerInput/selectors';

import {
  markIgnored,
  checkAnswer,
} from 'containers/Review/actions';

import AnswerInput from 'containers/AnswerInput';
import StreakIcon from './StreakIcon';
import IgnoreButton from './IgnoreButton';
import SubmitButton from './SubmitButton';

const Form = styled.form`
  position: relative;
  width: 100%;
  background-color: ${({ matches }) => (matches ? 'green' : 'white')};
`;

class ReviewAnswer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { streak, checkAnswer, ignoreAnswer } = this.props; // eslint-disable-line no-shadow

    return (
      <Form>
        <StreakIcon streak={streak} />
        <AnswerInput />
        <IgnoreButton onIgnoreClick={ignoreAnswer} />
        <SubmitButton onSubmit={checkAnswer} />
        {/* <StreakAnimation /> */}
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  streak: selectCurrentStreak(),
  matches: selectInputMatches(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkAnswer: (event) => {
      blockEvent(event);
      dispatch(checkAnswer());
    },
    ignoreAnswer: () => dispatch(markIgnored()),
  };
}

ReviewAnswer.propTypes = {
  matches: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  streak: PropTypes.number,
  checkAnswer: PropTypes.func.isRequired,
  ignoreAnswer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewAnswer);
