import React from 'react';
import { storiesOf } from '@storybook/react';

import A from '../index';

const href = 'google.com';
const to = '/';

storiesOf('base.A', module)
  .add('normal anchor link', () => (
    <A href={href}>Regular link</A>
  ))
  .add('normal anchor link with external prop', () => (
    <A href={href} external>External Link</A>
  ))
  .add('normal anchor link with plainLink prop', () => (
    <A href={href} plainLink>Plain Link</A>
  ))
  .add('react-router Link', () => (
    <A to={to}>Router Link</A>
  ))
  .add('react-router Link with plainLink prop', () => (
    <A to={to} plainLink>Plain Router Link</A>
  ));
