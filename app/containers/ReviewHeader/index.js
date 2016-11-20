/*
 *
 * ReviewHeader
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCorrectCount,
  selectTotalCount,
  selectAnsweredCount,
  selectCompletedCount,
} from 'containers/Review/selectors';

import Wrapper from './Wrapper';
import ProgressBar from './ProgressBar';
import ExitQuiz from './ExitQuiz';
import StatsList from './StatsList';
import calculatePercentage from 'utils/calculatePercentage';

export class ReviewHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { completed, correct, answered, total } = this.props;
    return (
      <Wrapper>
        <ProgressBar value={calculatePercentage(answered, total)} />
        <ExitQuiz />
        <StatsList
          correctness={calculatePercentage(correct, answered)}
          completed={completed}
          remaining={(total - 1 /* current review */) - completed}
        />
      </Wrapper>
    );
  }
}

ReviewHeader.propTypes = {
  completed: React.PropTypes.number,
  correct: React.PropTypes.number,
  answered: React.PropTypes.number,
  total: React.PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  completed: selectCompletedCount(),
  correct: selectCorrectCount(),
  answered: selectAnsweredCount(),
  total: selectTotalCount(),
});

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

export default connect(mapStateToProps)(ReviewHeader);
