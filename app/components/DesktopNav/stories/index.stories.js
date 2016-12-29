import React from 'react';
import { fromJS } from 'immutable';
import { storiesOf } from '@kadira/storybook';
import DesktopNav from '../index';

const LINKS = fromJS([
  {
    text: 'Internal link',
    to: '/review',
  },
  {
    text: 'With Count',
    to: '/review',
    count: 23,
  },
  {
    text: 'External link',
    href: 'http://thenicestplaceontheinter.net',
    external: true,
  },
  {
    text: 'Disabled Link',
    to: '/logout',
    isDisabled: true,
  },
]);

storiesOf('DesktopNav', module)
  .add('single link', () => <DesktopNav links={LINKS.slice(0, 1)} />)
  .add('multiple links', () => <DesktopNav links={LINKS} />);
