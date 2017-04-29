import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from 'layouts/Container';
import JishoSearchLink from '../index';

storiesOf('components.JishoSearchLink', module)
  .add('Searchlink', () => (
    <Container flexRow>
      <JishoSearchLink keyword="下着" />
    </Container>
  ))
  .add('Searchlink visually hidden but still taking up space between two words', () => (
    <div>
      Two <JishoSearchLink keyword="下着" visuallyHidden /> Words
    </div>
  ));
