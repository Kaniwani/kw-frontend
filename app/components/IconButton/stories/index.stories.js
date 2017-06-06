import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import sample from 'lodash/sample';

import Container from 'layouts/Container';
import Element from 'layouts/Element';
import * as COLORS from 'shared/styles/colors';

import ICONS from 'components/Icon/constants';
import IconButton from '../index';

/* eslint-disable react/no-array-index-key */
storiesOf('components.IconButtons', module)
  .add('all icons', () => (
    <Container flexRow flexWrap justifyContent="space-around">
      {Object.keys(ICONS).map((name, index) => (
        <Element flexRow alignItems="center" flex="0 0 200px" key={`icon-${index}`}>
          <IconButton
            name={name}
            size="2rem"
            color={sample(Object.keys(COLORS))}
            handleClick={action('button-click')}
            title={`Does some kind of ${name} action`}
          />
          <span style={{ marginLeft: '.5em', fontSize: '.7em' }}>{name}</span>
        </Element>
      ))}
    </Container>
  ));
/* eslint-enable */
