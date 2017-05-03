import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { PARTS_OF_SPEECH } from 'shared/constants';
import ReadingHeader from '../index';

storiesOf('components.ReadingHeader', module)
  .add('single ReadingHeader with required props', () => (
    <ReadingHeader
      wkVocabLink="#"
      kwVocabLink="#"
      tags={PARTS_OF_SPEECH.slice(4, 10)}
    />
  ));
