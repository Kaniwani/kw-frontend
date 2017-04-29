import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { PARTS_OF_SPEECH } from 'shared/constants';

import PartsOfSpeechList from '../index';

storiesOf('components.PartsOfSpeechList', module)
  .add('PartsOfSpeechList', () => <PartsOfSpeechList items={PARTS_OF_SPEECH} />);
