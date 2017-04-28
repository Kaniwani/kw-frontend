import React from 'react';
import { storiesOf } from '@kadira/storybook';
import A from '../index';

storiesOf('base.A', module)
  .add('normal anchor link', () => (
    <A href="google.com">Regular link</A>
  ))
  .add('normal anchor link with disabled prop', () => (
    <A disabled href="google.com">Plain</A>
  ))
  .add('normal anchor link with external prop', () => (
    <A external href="google.com">Plain</A>
  ))
  .add('normal anchor link with plainLink prop', () => (
    <A plainLink href="google.com">Plain</A>
  ))
  .add('react-router Link', () => (
    <A to="/">Plain</A>
  ))
  .add('react-router Link with disabled prop', () => (
    <A disabled to="/">Plain</A>
  ))
  .add('react-router Link with external prop', () => (
    <A external to="/">Plain</A>
  ))
  .add('react-router Link with plainLink prop', () => (
    <A plainLink to="/">Plain</A>
  ))
  .add('react-router Link with activeClassName prop', () => (
    <A activeClassName="isActive" to="/">Plain</A>
  ));
