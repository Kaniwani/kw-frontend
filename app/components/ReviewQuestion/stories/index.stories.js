import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ReviewQuestion from '../index';

storiesOf('components.ReviewQuestion', module)
  .add('ReviewQuestion with meaning and tags', () => (
    <ReviewQuestion meaning="large, round" tags={['JLPT N1', 'Noun']} />
  ));
