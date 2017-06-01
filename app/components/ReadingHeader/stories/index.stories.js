import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { vocabs } from 'shared/testTables';
import { PARTS_OF_SPEECH } from 'shared/constants';

import ReadingHeader from '../index';

vocabs.forEach((entry) => {
  const primaryCharacter = entry.readings[0].character;

  storiesOf('components.ReadingHeader', module)
    .add(`ReadingHeader with required props: ${primaryCharacter}`, () => (
      <ReadingHeader
        id={entry.id}
        primaryCharacter={primaryCharacter}
        tags={PARTS_OF_SPEECH.slice(4, 10)}
      />
    ));
});
