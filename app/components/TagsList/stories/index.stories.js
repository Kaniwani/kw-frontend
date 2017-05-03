import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { PARTS_OF_SPEECH } from 'shared/constants';

import TagsList from '../index';

storiesOf('components.TagsList', module)
  .add('TagsList', () => <TagsList tags={PARTS_OF_SPEECH} />);
