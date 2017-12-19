import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { titleCase } from "voca";

import QuizSummaryHeader from "containers/QuizSummaryHeader";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import Container from "base/Container";
import Toggle from "components/Toggle";
import H1 from "base/H1";
import H2 from "base/H2";
import H4 from "base/H4";
import PageWrapper from "base/PageWrapper";
import PercentageBar from "components/PercentageBar";
import SummarySection from "containers/SummarySection";
import VocabListToggleButton from "components/VocabListToggleButton";

import app from "shared/actions";

import {
  selectCategoryFromMatch,
  selectRemainingCount,
  selectVacationDate,
  selectSummaryCorrectIds,
  selectSummaryIncorrectIds,
  selectSummaryCriticalIds,
  selectSummaryPercentCorrect,
  selectLastActivityDate,
} from "shared/selectors";

QuizSummaryPage.propTypes = {
  category: PropTypes.string.isRequired,
  remainingCount: PropTypes.number.isRequired,
  onVacation: PropTypes.bool.isRequired,
  resetSummary: PropTypes.func.isRequired,
  correctIds: PropTypes.array.isRequired,
  incorrectIds: PropTypes.array.isRequired,
  criticalIds: PropTypes.array.isRequired,
  percentCorrect: PropTypes.number.isRequired,
  lastActivityDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.oneOf([false]),
  ]).isRequired,
};

const LastActivity = ({ date }) => date && (
  <Container>
    <H4>
      Last session activity:{" "}
      {distanceInWordsToNow(date, { includeSeconds: true })}{" "}
      ago
    </H4>
  </Container>
);

function QuizSummaryPage({
  category,
  incorrectIds,
  correctIds,
  criticalIds,
  remainingCount,
  onVacation,
  resetSummary,
  percentCorrect,
  lastActivityDate,
}) {
  const categoryTitle = titleCase(category);
  const recentHistory = incorrectIds.length && correctIds.length;

  return (
    <div>
      <Helmet>
        <title>{`${categoryTitle} Summary`}</title>
        <meta name="description" content={`Kaniwani ${categoryTitle} Summary`} />
      </Helmet>
      <QuizSummaryHeader
        category={category}
        remainingCount={remainingCount}
        onVacation={onVacation}
        resetSummary={resetSummary}
      />
      <Toggle
        render={({ on, toggle }) => (
          <PageWrapper>
            <H1>
              <PercentageBar count={percentCorrect} />
              <VocabListToggleButton
                cardsExpanded={on}
                onToggle={toggle}
              />
            </H1>
            {recentHistory && (
              <div>
                <SummarySection
                  summaryType="INCORRECT"
                  ids={incorrectIds}
                  cardsExpanded={on}
                />
                <SummarySection
                  summaryType="CORRECT"
                  ids={correctIds}
                  cardsExpanded={on}
                />
                <SummarySection
                  summaryType="CRITICAL"
                  ids={criticalIds}
                  cardsExpanded={on}
                />
                <LastActivity date={lastActivityDate} />
              </div>
            )}
            {!recentHistory && (
              <Container>
                <H2>No recent history.</H2>
              </Container>
            )}
          </PageWrapper>
        )}
      />
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const category = selectCategoryFromMatch(props);
  const mergedProps = { ...props, category };
  return {
    category,
    onVacation: !!selectVacationDate(state),
    remainingCount: selectRemainingCount(state, mergedProps),
    correctIds: selectSummaryCorrectIds(state, mergedProps),
    incorrectIds: selectSummaryIncorrectIds(state, mergedProps),
    criticalIds: selectSummaryCriticalIds(state, mergedProps),
    percentCorrect: selectSummaryPercentCorrect(state, mergedProps),
    lastActivityDate: selectLastActivityDate(state, mergedProps),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  resetSummary: () => dispatch(app[selectCategoryFromMatch(props)].resetSummary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryPage);
