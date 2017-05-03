import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Ul from '../index';

storiesOf('base.Ul', module)
  .add('single Ul', () => (
    <Ul>
      <li>List Item 1</li>
      <li>List Item 2</li>
      <li>List Item 3</li>
      <li>List Item 4</li>
    </Ul>
  ))
  .add('single Ul with nested Ul', () => (
    <Ul>
      <li>List Item 1</li>
      <Ul>
        <li>List Item 1.1</li>
        <li>List Item 1.2</li>
        <li>List Item 1.3</li>
      </Ul>
      <li>List Item 3</li>
      <li>List Item 4</li>
    </Ul>
  ))
  .add('multiple Ul', () => (
    <div>
      <Ul>
        <li>Ul 1 List Item 1</li>
        <li>Ul 1 List Item 2</li>
        <li>Ul 1 List Item 3</li>
      </Ul>
      <Ul>
        <li>Ul 2 List Item 1</li>
        <li>Ul 2 List Item 2</li>
        <li>Ul 2 List Item 3</li>
      </Ul>
    </div>
  ))
  .add('Ul with plainList', () => (
    <Ul plainList>
      <li>List Item 1</li>
      <li>List Item 2</li>
      <li>List Item 3</li>
      <li>List Item 4</li>
    </Ul>
  ));
