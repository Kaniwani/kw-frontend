import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from '../app/components/Button';
import TagList from '../app/components/TagList';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('TagList', module)
  .add('with 1 tag', () => (
    <TagList items={['fhqwhqgads']} />
  ))
  .add('with many tags', () => (
    <TagList items={['I', 'said', 'come', 'on', 'fhqwhqgads', 'said', 'come', 'on', 'fhqwhqgads']} />
  ))
  .add('different colors for Common and JLPT tags', () => (
    <TagList items={['JLPT3', 'Common']} />
  ));
