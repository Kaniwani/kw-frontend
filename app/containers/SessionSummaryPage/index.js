import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import titleCase from 'voca/title_case';

import SessionSummaryHeader from 'components/SessionSummaryHeader';
import SessionSummaryContent from 'components/SessionSummaryContent';

import { selectCategoryFromMatch } from 'containers/App/selectors';

SessionSummaryPage.propTypes = {
  category: PropTypes.string.isRequired,
};

function SessionSummaryPage({ category }) {
  const categoryTitle = titleCase(category);
  return (
    <div>
      <Helmet>
        <title>{`${categoryTitle} Summary`}</title>
        <meta name="description" content={`Kaniwani ${categoryTitle} Summary`} />
      </Helmet>
      <SessionSummaryHeader category={category} linkRoute={`/${category}/session`} />
      <SessionSummaryContent category={category} />
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  category: selectCategoryFromMatch(props),
});

export default connect(mapStateToProps)(SessionSummaryPage);
