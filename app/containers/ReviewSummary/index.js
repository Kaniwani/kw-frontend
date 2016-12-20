import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import ReactTooltip from 'react-tooltip';

import {
  selectCorrectCategorized,
  selectIncorrectCategorized,
  selectCriticalItems,
  selectPercentCorrect,
  selectIgnoredCount,
  selectRemainingCount,
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

  componentWillMount() {
    // redirect to review if no items answered yet
    if (!this.props.correctItems.count || !this.props.correctItems.count) {
      browserHistory.push('/review');
    }
  }

  render() {
    const { correctItems, incorrectItems, criticalItems, percentCorrect, ignoredCount, remainingCount } = this.props;

    return (
      <div>
        <Helmet
          title="Review Summary"
          meta={[{ name: 'description', content: 'Summary of Session Review' }]}
        />
        <Main>
          <SummaryHeader remainingReviews={remainingCount} />
          <section>
            <ReactTooltip id="vocabCardTip" place="bottom" html />
            <PercentageBar percent={percentCorrect} />
            <SummarySection items={incorrectItems} count={incorrectItems.count} correct={false} />
            <SummarySection items={correctItems} count={correctItems.count} correct />
            {criticalItems.length > 0 &&
              <div>
                {/* FIXME: SectionHeader as percentage bar!!! then animate! */}
                <SectionHeader color="orange">{criticalItems.length} Critical Items:</SectionHeader>
                <Section color="orange">
                  <List items={criticalItems} component={VocabChip} componentProps={{ color: 'orange' }} />
                </Section>
              </div>
            }
            { ignoredCount > 0 && <h4>{ignoredCount} Items ignored.</h4>}
          </section>
        </Main>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  correctItems: selectCorrectCategorized(),
  incorrectItems: selectIncorrectCategorized(),
  remainingCount: selectRemainingCount(),
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
