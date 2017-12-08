import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';
import PageWrapper from 'base/PageWrapper';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabLevelsList from './VocabLevelsList';

View.propTypes = {
  levelIds: PropTypes.array.isRequired,
};

function View({ levelIds }) {
  const PAGE_TITLE = 'Vocabulary: Levels';
  return (
    <div>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={`Kaniwani ${PAGE_TITLE}`} />
      </Helmet>
      <PageWrapper>
        <VocabPageHeader pageTitle={PAGE_TITLE} withVocabListToggle={false} />
        <VocabLevelsList levelIds={levelIds} />
      </PageWrapper>
    </div>
  );
}

export default View;
