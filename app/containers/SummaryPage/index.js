import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
  selectIgnoredCount,
  selectCorrectItems,
  selectIncorrectItems,
  selectCriticalItems,
  selectPercentCorrect,
  selectTotalCount,
} from './selectors';

import SummaryHeader from './Header';
import PercentageBar from './PercentageBar';
import SummarySection from './SummarySection';

export class SummaryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    correctItems: PropTypes.object,
    incorrectItems: PropTypes.object,
    criticalItems: PropTypes.object,
    ignoredCount: PropTypes.number,
    percentCorrect: PropTypes.number,
    remainingCount: PropTypes.number,
  }

  render() {
    const { percentCorrect, ignoredCount, remainingCount } = this.props;
    let { correctItems, incorrectItems, criticalItems } = this.props;

    let content = (
      <section>
        <div>No reviews completed</div>
      </section>
    );

    correctItems = correctItems.toJS();
    incorrectItems = incorrectItems.toJS();
    criticalItems = criticalItems.toJS();

    if (correctItems.length || incorrectItems.length) {
      content = (
        <section>
          <h1>{percentCorrect}% Accuracy</h1>
          <PercentageBar percent={percentCorrect} />
          <SummarySection items={incorrectItems} count={incorrectItems.length} correct={false} />
          <SummarySection items={correctItems} count={correctItems.length} correct />
          {criticalItems.length &&
            <div>
              <h3>Critical Items:</h3>
              {criticalItems.map((item, index) => <p key={`crit-${index}`}>{item.vocabulary.meaning}</p>)}
            </div>
          }
          { ignoredCount && <h4>Items ignored: {ignoredCount}</h4>}
        </section>
      );
    }

    return (
      <div>
        <Helmet
          title="Review Summary"
          meta={[
            { name: 'description', content: 'Summary of Session Review' },
          ]}
        />
        <SummaryHeader remainingReviews={remainingCount} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  correctItems: selectCorrectItems(),
  incorrectItems: selectIncorrectItems(),
  remainingCount: selectTotalCount(),
  criticalItems: selectCriticalItems(),
  ignoredCount: selectIgnoredCount(),
  percentCorrect: selectPercentCorrect(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
