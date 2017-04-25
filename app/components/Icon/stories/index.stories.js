import React from 'react';
import { storiesOf } from '@kadira/storybook';
import randomHexColor from 'utils/randomHexColor';
import Container from 'layouts/Container';
import Element from 'layouts/Element';

import Icon from '../index';
import ICONS from '../constants';

/* eslint-disable react/no-array-index-key */
storiesOf('Icons', module)
  .add('all icons', () => (
    <Container>
      {Object.keys(ICONS).map((name, index) => (
        <Element key={`icon-${index}`}>
          <Icon
            name={name}
            size="4rem"
            color={randomHexColor()}
          />
          <span style={{ marginLeft: '.5em' }}>{name}</span>
        </Element>
      ))}
    </Container>
  ));
/* eslint-enable */
