import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import VocabPageHeader from '../index';

const TITLE = 'Vocabulary > Levels > 24';

storiesOf('components.VocabPageHeader', module)
  .add('VocabPageHeader with required props', () => (
    <VocabPageHeader
      pageTitle={TITLE}
      withVocabListToggle={false}
    />
  ))
  .add('VocabPageHeader withVocabListToggle', () => (
    <VocabPageHeader
      pageTitle={TITLE}
      withVocabListToggle={{
        isExpanded: false,
        handleToggle: action('clicked'),
      }}
    />
  ));
