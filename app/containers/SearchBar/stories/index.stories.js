import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchBar from '../index';

storiesOf('containers.SearchBar', module)
  .add('SearchBar with default props', () => (
    <SearchBar />
  ));
