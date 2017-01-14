// TODO: extract to app/components

import React, { PropTypes } from 'react';
import { VocabEntry } from 'shared/models';
import A from 'components/A';
import Container from 'components/Container';
import List from 'components/List';
import Reading from 'containers/VocabularyPage/Reading';

const Entry = ({ level, item: { id, vocabulary: { meanings, readings } } }) => (
  <Container tag="li" style={{ border: '1px solid grey' }}>
    <div>meaning: {meanings.join(', ')}</div>
    <List items={readings} component={Reading} />
    <A to={`/vocabulary/${level}/${id}`}>View Item</A>
  </Container>
  );

Entry.propTypes = {
  item: PropTypes.instanceOf(VocabEntry),
  level: PropTypes.string.isRequired,
};

export default Entry;
