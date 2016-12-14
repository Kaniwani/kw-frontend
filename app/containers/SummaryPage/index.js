import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
  selectSession,
  selectCompleted,
  selectCompletedCount,
  selectCorrectCount,
  selectIncorrectCount,
  selectIgnoredCount,
  selectAnsweredCount,
  selectTotalCount,
} from './selectors';

import { selectPercentCorrect } from 'containers/ReviewHeader/selectors';

import SummarySection from './SummarySection';

export class SummaryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    session: PropTypes.object,
    completed: PropTypes.object,
    percentCorrect: PropTypes.number,
    // completedCount: PropTypes.number,
    // correctCount: PropTypes.number,
    // incorrectCount: PropTypes.number,
    // ignoredCount: PropTypes.number,
    // answeredCount: PropTypes.number,
    // totalCount: PropTypes.number,
  }

  render() {
    const {
      percentCorrect,
    } = this.props;

    // temporary
    const sessionStats = this.props.session.toJS();
    const completedItems = this.props.completed.toJS();
    console.log('completed', completedItems);
    const correctItems = completedItems.filter(({ session }) => session.correct >= 1 && session.incorrect < 1);
    const incorrectItems = completedItems.filter(({ session }) => session.incorrect >= 1);

    console.log(
      'correct', correctItems,
      'incorrect', incorrectItems,
    );

    return (
      <div>
        <Helmet
          title="SummaryPage"
          meta={[
            { name: 'description', content: 'Description of SummaryPage' },
          ]}
        />
        <section className="summary-section">
          <div className="inner">

            <h1 className="section-heading correctPercent">{percentCorrect}% Accuracy</h1>
            <div className="percentage-bar"><span className="percentage" /></div>
            <SummarySection items={incorrectItems} correct={false} />
            <SummarySection items={correctItems} correct />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  session: selectSession(),
  completed: selectCompleted(),
  percentCorrect: selectPercentCorrect(),
  // completedCount: selectCompletedCount(),
  // correctCount: selectCorrectCount(),
  // incorrectCount: selectIncorrectCount(),
  // ignoredCount: selectIgnoredCount(),
  // answeredCount: selectAnsweredCount(),
  // totalCount: selectTotalCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
