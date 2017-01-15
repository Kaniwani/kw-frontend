import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Immutable from 'immutable';
import { createStructuredSelector } from 'reselect';
import ReactTooltip from 'react-tooltip';
import pluralize from 'utils/pluralize';

import H2 from 'components/H2';
import Wrapper from 'components/Wrapper';
import Container from 'components/Container';
import Element from 'components/Element';
import List from 'components/List';
import SummaryHeader from './SummaryHeader';
import PercentageBar from './PercentageBar';
import SummarySection from './SummarySection';
import VocabChip from './VocabChip';
import { StyledHeader } from 'containers/SiteHeader/styles';
import { SectionHeader } from './styles';

import * as selectors from './selectors';

const ReviewSummary = ({
  correctItems,
  incorrectItems,
  criticalItems,
  percentCorrect,
  ignoredItems,
  remainingCount,
}) => {
  let content;

  if (!correctItems.count && !incorrectItems.count) {
    content = (
      <Wrapper>
        <Container>
          <Element>
            <PercentageBar percent={percentCorrect} />
          </Element>
          <Element>
            <H2>You haven’t answered anything yet!</H2>
          </Element>
        </Container>
      </Wrapper>
    );
  } else {
    content = (
      <Wrapper>
        <Container>
          <ReactTooltip id="vocabCardTip" place="bottom" html />
          <Element>
            <PercentageBar percent={percentCorrect} />
          </Element>
          <Element>
            <SummarySection items={incorrectItems} count={incorrectItems.count} correct={false} />
          </Element>
          <Element>
            <SummarySection items={correctItems} count={correctItems.count} correct />
          </Element>
          {criticalItems.size > 0 &&
          <Element>
            {/* FIXME: SectionHeader as percentage bar!!! then animate! */}
            <SectionHeader color="orange">
              {criticalItems.size} {pluralize('Critical Word', criticalItems.size)}
            </SectionHeader>
            <Container>
              <Element>
                <List items={criticalItems} component={VocabChip} componentProps={{ color: 'orange' }} />
              </Element>
            </Container>
          </Element>
        }
          {ignoredItems.size > 0 && <Element><h4>
            {ignoredItems.size} {pluralize('Ignored Word', ignoredItems.size)}
          </h4></Element>}
        </Container>
      </Wrapper>
   );
  }

  return (
    <div>
      <Helmet
        title="Review Summary"
        meta={[{ name: 'description', content: 'Summary of Session Review' }]}
      />
      <StyledHeader>
        <Wrapper>
          <SummaryHeader remainingReviews={remainingCount} />
        </Wrapper>
      </StyledHeader>
      <main>
        {content}
      </main>
    </div>
  );
};

ReviewSummary.propTypes = {
  correctItems: PropTypes.instanceOf(Immutable.Iterable),
  incorrectItems: PropTypes.instanceOf(Immutable.Iterable),
  criticalItems: PropTypes.instanceOf(Immutable.Iterable),
  ignoredItems: PropTypes.instanceOf(Immutable.Iterable),
  percentCorrect: PropTypes.number,
  remainingCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  correctItems: selectors.selectCorrectCategorized,
  incorrectItems: selectors.selectIncorrectCategorized,
  remainingCount: selectors.selectRemainingCount,
  criticalItems: selectors.selectCriticalItems,
  ignoredItems: selectors.selectIgnoredItems,
  percentCorrect: selectors.selectPercentCorrect,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSummary);
