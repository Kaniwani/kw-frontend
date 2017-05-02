import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ReadingDetail from '../index';

storiesOf('components.ReadingDetail', module)
  .add('single ReadingDetail with required props', () => (
    <ReadingDetail
      detailLevel="HIGH"
      character="近"
      kana={['ちか', 'じか']}
    />
   ));
