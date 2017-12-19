import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

import {
  selectPercentComplete,
  selectPercentCorrect,
  selectCorrectCount,
  selectRemainingCount,
} from 'shared/selectors';

const mapStateToProps = createStructuredSelector({
  percentComplete: selectPercentComplete,
  percentCorrect: selectPercentCorrect,
  correctCount: selectCorrectCount,
  remainingCount: selectRemainingCount,
});

/* eslint-disable react/prop-types */
const enhance = compose(
  connect(mapStateToProps),
  onlyUpdateForPropTypes,
  setPropTypes({
    category: PropTypes.string.isRequired,
    percentComplete: PropTypes.number.isRequired,
    percentCorrect: PropTypes.number.isRequired,
    correctCount: PropTypes.number.isRequired,
    remainingCount: PropTypes.number.isRequired,
  })
);

function QuizHeader(props) {
  return (
    <QuizHeader {...props} />
  );
}

export default enhance(QuizHeader);
