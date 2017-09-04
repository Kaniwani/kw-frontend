import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { titleCase } from 'voca';

import QuizSummaryHeader from 'components/QuizSummaryHeader';
import QuizSummaryContent from 'components/QuizSummaryContent';

import { selectCategoryFromMatch } from 'containers/App/selectors';

QuizSummaryPage.propTypes = {
  category: PropTypes.string.isRequired,
};

function QuizSummaryPage({ category }) {
  const categoryTitle = titleCase(category);
  return (
    <div>
      <Helmet>
        <title>{`${categoryTitle} Summary`}</title>
        <meta name="description" content={`Kaniwani ${categoryTitle} Summary`} />
      </Helmet>
      <QuizSummaryHeader category={category} />
      <QuizSummaryContent category={category} />
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  category: selectCategoryFromMatch(props),
});

export default connect(mapStateToProps)(QuizSummaryPage);
