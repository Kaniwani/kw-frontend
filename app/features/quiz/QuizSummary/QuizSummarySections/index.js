import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectSummaryPercentCorrect,
  selectLastActivityDate,
} from 'features/quiz/QuizSummary/selectors';

import Aux from 'common/components/Aux';
import PageWrapper from 'common/components/PageWrapper';
import Container from 'common/components/Container';
import Toggle from 'common/components/Toggle';
import VocabListToggleButton from 'common/components/VocabListToggleButton';
import PercentageBar from './PercentageBar';
import QuizSummarySection, { SECTION_TYPES } from './QuizSummarySection';
import LastActivity from './LastActivity';

import { SRS_COLORS } from 'common/styles/colors';

QuizSummarySections.propTypes = {
  category: PropTypes.string.isRequired,
  percentCorrect: PropTypes.number.isRequired,
  lastActivityDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])])
    .isRequired,
};

export function QuizSummarySections({ category, percentCorrect, lastActivityDate }) {
  return (
    <Toggle
      render={({ on, toggle }) => (
        <PageWrapper>
          {lastActivityDate !== false && (
            <Aux>
              <Container flexRow>
                <PercentageBar
                  count={percentCorrect}
                  color={category === 'lessons' ? SRS_COLORS.UNTRAINED : SRS_COLORS.GURU}
                />
                <VocabListToggleButton cardsExpanded={on} onToggle={toggle} />
              </Container>
              <QuizSummarySection
                category={category}
                sectionType={SECTION_TYPES.INCORRECT}
                cardsExpanded={on}
              />
              <QuizSummarySection
                category={category}
                sectionType={SECTION_TYPES.CORRECT}
                cardsExpanded={on}
              />
              <QuizSummarySection
                category={category}
                sectionType={SECTION_TYPES.CRITICAL}
                cardsExpanded={on}
              />
            </Aux>
          )}
          <LastActivity date={lastActivityDate} />
        </PageWrapper>
      )}
    />
  );
}

const mapStateToProps = (state, props) => ({
  percentCorrect: selectSummaryPercentCorrect(state, props),
  lastActivityDate: selectLastActivityDate(state, props),
});

export default connect(mapStateToProps)(QuizSummarySections);
