import React from 'react';
import { storiesOf } from '@storybook/react';
import ReadingDetail from '../index';

storiesOf('components.ReadingDetail', module)
  .add('single ReadingDetail with required props', () => (
    <ReadingDetail
      detailLevel="HIGH"
      character="近"
      kana={['ちか', 'じか']}
    />
   ));
