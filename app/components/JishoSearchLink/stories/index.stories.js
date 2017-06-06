import React from 'react';
import { storiesOf } from '@storybook/react';

import Container from 'layouts/Container';
import JishoSearchLink from '../index';

storiesOf('components.JishoSearchLink', module)
  .add('JishoSearchLink', () => (
    <Container flexRow>
      <JishoSearchLink keyword="下着" />
    </Container>
  ));
