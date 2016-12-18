import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import ReactTooltip from 'react-tooltip';

import {
  selectCorrectCategorized,
  selectIncorrectCategorized,
  selectCriticalItems,
  selectPercentCorrect,
  selectIgnoredCount,
  selectTotalCount,
} from './selectors';

import List from 'components/List';
import SummaryHeader from './SummaryHeader';
import PercentageBar from './PercentageBar';
import SummarySection from './SummarySection';
import VocabChip from './VocabChip';
import {
  Main,
  Section,
  SectionHeader,
} from './UI';

export class ReviewSummary extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    correctItems: PropTypes.object,
    incorrectItems: PropTypes.object,
    criticalItems: PropTypes.array,
    ignoredCount: PropTypes.number,
    percentCorrect: PropTypes.number,
    remainingCount: PropTypes.number,
  }

  render() {
    const { correctItems, incorrectItems, criticalItems, percentCorrect, ignoredCount, remainingCount } = this.props;

    let content = (
      <section>
        <div>No reviews completed</div>
      </section>
    );

    if (correctItems.count || incorrectItems.count) {
      content = (
        <section>
          <ReactTooltip id="vocabCardTip" place="bottom" html />
          <PercentageBar percent={percentCorrect} />
          <SummarySection items={incorrectItems} count={incorrectItems.count} correct={false} />
          <SummarySection items={correctItems} count={correctItems.count} correct />
          {criticalItems.length &&
            <div>
              {/* FIXME: SectionHeader as percentage bar!!! then animate! */}
              <SectionHeader color="orange">{criticalItems.length} Critical Items:</SectionHeader>
              <Section color="orange">
                <List items={criticalItems} component={VocabChip} componentProps={{ color: 'orange' }} />
              </Section>
            </div>
          }
          { ignoredCount > 0 && <h4>Items ignored: {ignoredCount}</h4>}
        </section>
      );
    }

    return (
      <div>
        <Helmet
          title="Review Summary"
          meta={[{ name: 'description', content: 'Summary of Session Review' }]}
        />
        <Main>
          <SummaryHeader remainingReviews={remainingCount} />
          {content}
        </Main>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  correctItems: selectCorrectCategorized(),
  incorrectItems: selectIncorrectCategorized(),
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSummary);
