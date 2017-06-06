import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PARTS_OF_SPEECH } from 'shared/constants';

import SynonymHeader from '../index';

storiesOf('components.SynonymHeader', module)
  .add('single SynonymHeader with default props', () => (
    <SynonymHeader
      handleRemoveSynonym={action('remove-synonym clicked')}
      tags={PARTS_OF_SPEECH.slice(4, 10)}
    />
  ));
