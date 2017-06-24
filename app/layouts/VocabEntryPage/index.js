import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import SiteHeader from 'components/SiteHeader';
import VocabPageHeader from 'components/VocabPageHeader';
import VocabEntryDetail from 'components/VocabEntryDetail';
import PageWrapper from 'base/PageWrapper';

VocabEntryPage.propTypes = {
  entry: PropTypes.object.isRequired,
};

function VocabEntryPage({ entry }) {
  const primaryReading = entry.readings[0];
  const PAGE_TITLE = `Vocabulary > Level ${primaryReading.level} > ${primaryReading.character}`;

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
        <VocabEntryDetail
          entry={entry}
          primaryReading={primaryReading}
        />
      </PageWrapper>
    </div>
  );
}

export default VocabEntryPage;
