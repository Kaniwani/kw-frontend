// TODO: extract to app/components

import React, { PropTypes } from 'react';
import { ReviewEntryRecord } from 'shared/models';
import A from 'components/A';
import Container from 'components/Container';
import List from 'components/List';
import Reading from 'containers/VocabularyPage/Reading';

const Entry = ({ level, item: { id, vocabulary } }) => (
  <Container tag="li" style={{ border: '1px solid grey' }}>
    <div>meaning: {vocabulary.meanings.join(', ')}</div>
    <List items={vocabulary.readings} component={Reading} />
    <A to={`/vocabulary/${level}/${id}`}>View Item</A>
  </Container>
  );

Entry.propTypes = {
  item: PropTypes.instanceOf(ReviewEntryRecord),
  level: PropTypes.string.isRequired,
};

export default Entry;
