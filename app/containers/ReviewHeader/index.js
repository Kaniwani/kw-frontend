import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCorrectCount,
  selectTotalCount,
  selectAnsweredCount,
  selectCompletedCount,
} from 'containers/ReviewPage/selectors';

import calculatePercentage from 'utils/calculatePercentage';
import Wrapper from './Wrapper';
import ProgressBar from './ProgressBar';
import ExitQuizLink from './ExitQuizLink';
import StatsList from './StatsList';

export class ReviewHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { completed, correct, answered, total } = this.props;
    return (
      <Wrapper>
        <ProgressBar value={calculatePercentage(answered, total)} />
        <ExitQuizLink />
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
  completed: PropTypes.number,
  correct: PropTypes.number,
  answered: PropTypes.number,
  total: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  completed: selectCompletedCount(),
  correct: selectCorrectCount(),
  answered: selectAnsweredCount(),
  total: selectTotalCount(),
});

export default connect(mapStateToProps)(ReviewHeader);
