import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Icon from 'components/Icon';
import Button from '../index';

storiesOf('base.Button', module)
  .add('with text and onClick prop', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('disabled', () => (
    <Button disabled onClick={action('clicked')}>Disabled Button</Button>
  ))
  .add('plainButton', () => (
    <Button plainButton onClick={action('clicked')}>Disabled Button</Button>
  ))
  .add('with icon and onClick prop', () => (
    <Button onClick={action('clicked')}><Icon name="SEARCH" /></Button>
  ))
  .add('with text and "href" prop', () => (
    <Button href="http://google.com">Hello Button</Button>
  ))
  .add('with icon and "href" prop', () => (
    <Button href="http://google.com"><Icon name="SEARCH" /></Button>
  ))
  .add('with text and "to" prop', () => (
    <Button to="/">Hello Button</Button>
  ))
  .add('with icon and "to" prop', () => (
    <Button to="/">Search <Icon name="SEARCH" /></Button>
  ));
