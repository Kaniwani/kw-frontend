import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from 'layouts/Container';
import JishoSearchLink from '../index';

storiesOf('components.JishoSearchLink', module)
  .add('JishoSearchLink', () => (
    <Container flexRow>
      <JishoSearchLink keyword="下着" />
    </Container>
  ))
  .add('JishoSearchLink visually hidden but still taking up space between two words', () => (
    <Container flexRow>
      <div>Two</div>
      <JishoSearchLink keyword="下着" visuallyHidden />
      <div>Words</div>
    </Container>
  ));
