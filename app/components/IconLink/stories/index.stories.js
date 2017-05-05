import React from 'react';
import { storiesOf } from '@kadira/storybook';
import randomHexColor from 'utils/randomHexColor';
import Container from 'layouts/Container';
import Element from 'layouts/Element';

import ICONS from 'components/Icon/constants';
import IconLink from '../index';

/* eslint-disable react/no-array-index-key */
storiesOf('components.IconLinks', module)
  .add('all icons as anchors', () => (
    <Container flexRow flexWrap justifyContent="space-around">
      {Object.keys(ICONS).map((name, index) => (
        <Element flexRow alignItems="center" flex="0 0 200px" key={`icon-${index}`}>
          <IconLink
            href="http://google.com"
            name={name}
            title={'Goes to a route'}
            color={randomHexColor()}
            size="2rem"
          />
          <span style={{ marginLeft: '.5em', fontSize: '.7em' }}>{name}</span>
        </Element>
      ))}
    </Container>
  ))
  .add('all icons as react-router Links', () => (
    <Container flexRow flexWrap justifyContent="space-around">
      {Object.keys(ICONS).map((name, index) => (
        <Element flexRow alignItems="center" flex="0 0 200px" key={`icon-${index}`}>
          <IconLink
            to="/path"
            name={name}
            title={'Goes to a route'}
            color={randomHexColor()}
            size="2rem"
          />
          <span style={{ marginLeft: '.5em', fontSize: '.7em' }}>{name}</span>
        </Element>
      ))}
    </Container>
  ));
/* eslint-enable */
