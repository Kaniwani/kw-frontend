import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SessionLink from '../index';

storiesOf('components.SessionLink', module)
  .add('SessionLink with required props', () => (
    <SessionLink text="Continue session" to="/reviews/" />
  ))
  .add('SessionLink with count prop', () => (
    <SessionLink text="Continue session" to="/reviews/" count="1487" />
  ))
  .add('SessionLink with color and count prop', () => (
    <SessionLink text="Continue session" to="/reviews/" color="purple" count="1487" />
  ));
