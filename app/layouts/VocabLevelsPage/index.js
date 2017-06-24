import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import SiteHeader from 'components/SiteHeader';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelList from 'components/VocabLevelList';
import PageWrapper from 'base/PageWrapper';

VocabLevelsPage.propTypes = {
  levels: PropTypes.array.isRequired,
  userWKLevel: PropTypes.number.isRequired,
  handleLevelLock: PropTypes.func.isRequired,
};

export function VocabLevelsPage({ levels, userWKLevel, handleLevelLock }) {
  const PAGE_TITLE = 'Vocabulary: Levels';

  return (
    <div>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
      </Helmet>
      <SiteHeader />
      <PageWrapper>
        <VocabPageHeader
          pageTitle={PAGE_TITLE}
          withVocabListToggle={false}
        />
        <VocabLevelList
          levels={levels}
          userWKLevel={userWKLevel}
          handleLevelLock={handleLevelLock}
        />
      </PageWrapper>
    </div>
  );
}

export default VocabLevelsPage;
