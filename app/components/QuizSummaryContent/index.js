import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import H2 from 'base/H2';
import Container from 'base/Container';
import PageWrapper from 'base/PageWrapper';
import AccuracyBar from 'components/AccuracyBar';
import SummarySection from 'components/SummarySection';
import ToggleVocabListButton from 'components/ToggleVocabListButton';

import {
  selectCorrectIds,
  selectIncorrectIds,
  selectCriticalIds,
  selectPercentCorrect,
} from 'containers/App/selectors';

import { Heading } from './styles';

QuizSummaryContent.propTypes = {
  correctIds: PropTypes.array.isRequired,
  incorrectIds: PropTypes.array.isRequired,
  criticalIds: PropTypes.array.isRequired,
  percentCorrect: PropTypes.number.isRequired,
};

function QuizSummaryContent({
  correctIds,
  incorrectIds,
  criticalIds,
  percentCorrect,
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
        <Container><H2>No history. Get quizzing!</H2></Container>
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
        </div>
      )}
    </PageWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  correctIds: selectCorrectIds,
  incorrectIds: selectIncorrectIds,
  criticalIds: selectCriticalIds,
  percentCorrect: selectPercentCorrect,
});

const enhance = compose(
  connect(mapStateToProps),
  withStateHandlers(
    { cardsExpanded: false },
    { toggleCardsExpanded: ({ cardsExpanded }) => () => ({ cardsExpanded: !cardsExpanded }) },
  ),
);

export default enhance(QuizSummaryContent);
