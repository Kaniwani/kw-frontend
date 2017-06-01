import React from 'react';

import VocabEntryDetail from 'components/VocabEntryDetail';

import { vocabs } from 'shared/testTables';

const entry = [...vocabs][0];
const primaryReading = entry.readings[0];

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <VocabEntryDetail entry={entry} primaryReading={primaryReading} />
      </div>
    );
  }
}
