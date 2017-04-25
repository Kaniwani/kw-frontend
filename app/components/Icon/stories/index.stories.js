import React from 'react';
import { storiesOf } from '@kadira/storybook';
import randomHexColor from 'utils/randomHexColor';
import Container from 'components/Container';
import Element from 'components/Element';
import Icon from '../index';
import ICONS from '../constants';

/* eslint-disable react/no-array-index-key */
storiesOf('Icons', module)
  .add('all icons', () => (
    <Container>
      {Object.keys(ICONS).map((name, index) => (
        <Element key={`icon-${index}`}>
          <span style={{ marginRight: '1em' }}>{name}</span>
          <Icon
            name={name}
            size="4rem"
            color={randomHexColor()}
          />
        </Element>
      ))}
    </Container>
  ));
/* eslint-enable */
