import React from 'react';
import { storiesOf } from '@storybook/react';
import sample from 'lodash/sample';

import Container from 'base/Container';
import Element from 'base/Element';
import * as COLORS from 'shared/styles/colors';

import Icon from '../index';
import ICONS from '../constants';

/* eslint-disable react/no-array-index-key */
storiesOf('components.Icons', module)
  .add('all icons', () => (
    <Container flexRow flexWrap justifyContent="space-around">
      {Object.keys(ICONS).map((name, index) => (
        <Element flex="0 0 200px" key={`icon-${index}`}>
          <Icon
            name={name}
            size="2rem"
            color={sample(Object.keys(COLORS))}
          />
          <span style={{ marginLeft: '.5em', fontSize: '.7em' }}>{name}</span>
        </Element>
      ))}
    </Container>
  ));
/* eslint-enable */
