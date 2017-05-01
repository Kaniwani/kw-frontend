import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ToggleBar from '../index';

storiesOf('components.ToggleBar', module)
  .add('single ToggleBar', () => (
    <ToggleBar
      detailLevel={'MEDIUM'}
      isDisabled={false}
      notes={{ isActive: false }}
      info={{ isActive: true }}
      synonym={{ isActive: false }}
      showNotesPanel={action('show notes panel')}
      showInfoPanel={action('show info panel')}
      showSynonymPanel={action('show synonym panel')}
    />
  ));
