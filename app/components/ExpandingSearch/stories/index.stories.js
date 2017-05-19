import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import ExpandingSearch from '../index';

storiesOf('components.ExpandingSearch', module)
  .add('ExpandingSearch with required props', () => (
    <ExpandingSearch
      handleInputChange={action('handleInputChange')}
      handleInputFocus={action('handleInputFocus')}
      inputRef={action('inputRef')}
      inputValue="検索"
    />
  ))
  .add('ExpandingSearch isSubmitting', () => (
    <ExpandingSearch
      handleInputChange={action('handleInputChange')}
      handleInputFocus={action('handleInputFocus')}
      inputRef={action('inputRef')}
      inputValue="検索"
      isSubmitting
    />
  ))
  .add('ExpandingSearch isExpanded', () => (
    <ExpandingSearch
      handleInputChange={action('handleInputChange')}
      handleInputFocus={action('handleInputFocus')}
      inputRef={action('inputRef')}
      inputValue="検索"
      isExpanded
    />
  ))
  .add('ExpandingSearch isExpanded isSubmitting', () => (
    <ExpandingSearch
      handleInputChange={action('handleInputChange')}
      handleInputFocus={action('handleInputFocus')}
      inputRef={action('inputRef')}
      inputValue="検索"
      isExpanded
      isSubmitting
    />
  ));
