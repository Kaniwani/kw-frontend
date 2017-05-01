import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ReviewPanel from '../index';

storiesOf('components.ReviewPanel', module)
  .add('single ReviewPanel with default props', () => <ReviewPanel />);
