import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import SiteHeader from 'components/SiteHeader';
import VocabLevelList from 'components/VocabLevelList';
import PageWrapper from 'layouts/PageWrapper';

VocabLevelsPage.propTypes = {
  levels: PropTypes.array.isRequired,
  userWKLevel: PropTypes.number.isRequired,
};

function VocabLevelsPage({ levels, userWKLevel }) {
  return (
    <div>
      <Helmet>
        <title>Vocabulary: Levels</title>
        <meta name="description" content={'Kaniwani Vocabulary: Levels'} />
      </Helmet>
      <SiteHeader />
      <PageWrapper>
        <VocabLevelList
          levels={levels}
          userWKLevel={userWKLevel}
        />
      </PageWrapper>
    </div>
  );
}

export default VocabLevelsPage;
