import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import VocabPageHeader from '../index';

const TITLE = 'Vocabulary > Levels > 24';

storiesOf('components.VocabPageHeader', module)
  .add('VocabPageHeader with required props', () => (
    <VocabPageHeader
      pageTitle={TITLE}
      vocabListExpanded
      handleToggleVocabList={action('clicked')}
    />
  ))
  .add('VocabPageHeader with vocabListExpanded={false}', () => (
    <VocabPageHeader
      pageTitle={TITLE}
      vocabListExpanded={false}
      handleToggleVocabList={action('clicked')}
    />
  ));
