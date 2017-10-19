import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { titleCase } from 'voca';

import QuizSummaryHeader from 'components/QuizSummaryHeader';
import QuizSummaryContent from 'components/QuizSummaryContent';

import app from 'shared/actions';

import {
  selectCategoryFromMatch,
  selectRemainingCount,
  selectVacationDate,
  selectSummaryCorrectIds,
  selectSummaryIncorrectIds,
  selectSummaryCriticalIds,
  selectSummaryPercentCorrect,
  selectLastActivityDate,
} from 'shared/selectors';

QuizSummaryPage.propTypes = {
  category: PropTypes.string.isRequired,
  remainingCount: PropTypes.number.isRequired,
  onVacation: PropTypes.bool.isRequired,
  resetSummary: PropTypes.func.isRequired,
  correctIds: PropTypes.array.isRequired,
  incorrectIds: PropTypes.array.isRequired,
  criticalIds: PropTypes.array.isRequired,
  percentCorrect: PropTypes.number.isRequired,
  lastActivityDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.oneOf([false])]).isRequired,
};

function QuizSummaryPage({ category, ...props }) {
  const categoryTitle = titleCase(category);
  return (
    <div>
      <Helmet>
        <title>{`${categoryTitle} Summary`}</title>
        <meta name="description" content={`Kaniwani ${categoryTitle} Summary`} />
      </Helmet>
      <QuizSummaryHeader category={category} {...props} />
      <QuizSummaryContent {...props} />
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

const mapDispatchToProps = (dispatch, { category }) => ({
  resetSummary: () => dispatch(app[category].resetSummary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryPage);
