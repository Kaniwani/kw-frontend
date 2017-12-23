import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { titleCase } from "voca";
import { distanceInWordsToNow } from "date-fns";

import QuizSummaryHeader from "containers/QuizSummaryHeader";

import PageWrapper from "base/PageWrapper";
import Container from "base/Container";
import H2 from "base/H2";
import H4 from "base/H4";
import Toggle from "components/Toggle";
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
  const recentHistory = !!incorrectIds.length && !!correctIds.length;

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
            <Container flexRow>
              <PercentageBar count={percentCorrect} />
              <VocabListToggleButton cardsExpanded={on} onToggle={toggle} />
            </Container>
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
                {lastActivityDate && (
                  <Container>
                    <H4>
                      {`Last session activity: ${distanceInWordsToNow(lastActivityDate, {
                        includeSeconds: true,
                      })} ago`}
                    </H4>
                  </Container>
                )}
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
