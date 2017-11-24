import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import PageWrapper from 'base/PageWrapper';
import VocabEntryMeanings from 'components/VocabEntryMeanings';
import VocabEntryReadings from 'components/VocabEntryReadings';
import VocabEntrySynonyms from 'components/VocabEntrySynonyms';
import VocabEntryNotes from 'components/VocabEntryNotes';
import VocabEntryDetails from './VocabEntryDetails';

import { Row, Column } from './styles';

View.propTypes = {
  id: PropTypes.number.isRequired,
};

function View({ id }) {
  return (
    <PageWrapper>
      <Helmet>
        <title>Vocabulary: Entry</title>
        <meta name="description" content="Kaniwani Vocabulary: Entry" />
      </Helmet>
      <Row>
        <Column>
          <VocabEntryMeanings id={id} />
          <VocabEntryReadings id={id} />
          <VocabEntrySynonyms id={id} />
          <VocabEntryNotes id={id} />
        </Column>
        <Column>
          <VocabEntryDetails id={id} />
        </Column>
      </Row>
    </PageWrapper>
  );
}

export default View;
