import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withStateHandlers } from 'recompose';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Container from 'base/Container';
import H2 from 'base/H2';
import H4 from 'base/H4';
import PageWrapper from 'base/PageWrapper';
import AccuracyBar from 'components/AccuracyBar';
import SummarySection from 'components/SummarySection';
import ToggleVocabListButton from 'components/ToggleVocabListButton';

import {
  selectSummaryCorrectIds,
  selectSummaryIncorrectIds,
  selectSummaryCriticalIds,
  selectSummaryPercentCorrect,
  selectLastActivityDate,
} from 'containers/App/selectors';

import { Heading } from './styles';

QuizSummaryContent.propTypes = {
  correctIds: PropTypes.array.isRequired,
  incorrectIds: PropTypes.array.isRequired,
  criticalIds: PropTypes.array.isRequired,
  percentCorrect: PropTypes.number.isRequired,
  cardsExpanded: PropTypes.bool.isRequired,
  toggleCardsExpanded: PropTypes.func.isRequired,
  lastActivityDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
};

function QuizSummaryContent({
  correctIds,
  incorrectIds,
  criticalIds,
  percentCorrect,
  lastActivityDate,
  cardsExpanded,
  toggleCardsExpanded,
}) {
  const noHistory = !incorrectIds.length && !correctIds.length && !criticalIds.length;
  return (
    <PageWrapper>
      <Heading>
        <AccuracyBar percent={percentCorrect} />
        <ToggleVocabListButton
          cardsExpanded={cardsExpanded}
          toggleCardsExpanded={toggleCardsExpanded}
        />
      </Heading>
      {noHistory ? (
        <Container><H2>No recent history.</H2></Container>
      ) : (
        <div>
          <SummarySection
            summaryType="INCORRECT"
            ids={incorrectIds}
            cardsExpanded={cardsExpanded}
          />
          <SummarySection
            summaryType="CORRECT"
            ids={correctIds}
            cardsExpanded={cardsExpanded}
          />
          <SummarySection
            summaryType="CRITICAL"
            ids={criticalIds}
            cardsExpanded={cardsExpanded}
          />
          {lastActivityDate && (
            <Container>
              <H4>
                Last session activity: {
                  distanceInWordsToNow(lastActivityDate, { includeSeconds: true })
                } ago
              </H4>
            </Container>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  correctIds: selectSummaryCorrectIds,
  incorrectIds: selectSummaryIncorrectIds,
  criticalIds: selectSummaryCriticalIds,
  percentCorrect: selectSummaryPercentCorrect,
  lastActivityDate: selectLastActivityDate,
});

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers(
    { cardsExpanded: false },
    { toggleCardsExpanded: ({ cardsExpanded }) => () => ({ cardsExpanded: !cardsExpanded }) },
  ),
);

export default enhance(QuizSummaryContent);
