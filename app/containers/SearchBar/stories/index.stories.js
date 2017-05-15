import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SearchBar from '../index';

storiesOf('containers.SearchBar', module)
  .add('SearchBar with default props', () => (
    <SearchBar />
  ));
