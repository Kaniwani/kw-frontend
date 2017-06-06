import React from 'react';
import { storiesOf } from '@storybook/react';
import Container from 'layouts/Container';
import A from 'base/A';
import H1 from 'base/H1';
import H2 from 'base/H2';
import H3 from 'base/H3';
import H4 from 'base/H4';
import H5 from 'base/H5';
import H6 from 'base/H6';
import P from 'base/P';

/* eslint-disable max-len */
storiesOf('base.Typography', module)
  .add('headings', () => (
    <Container>
      <H1>H1 along this line.</H1>
      <H2>H2 along this line.</H2>
      <H3>H3 along this line.</H3>
      <H4>H4 along this line.</H4>
      <H5>H5 along this line.</H5>
      <H6>H6 along this line.</H6>
    </Container>
  ))
  .add('headings and paragraphs', () => (
    <Container>
      <H1>H1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, voluptas?</H1>
      <P>P Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis omnis sed repellat unde voluptatum nostrum animi architecto repudiandae doloribus earum?</P>
      <H1>H1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, voluptas?</H1>
      <H2>H2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, voluptas?</H2>
      <P>P Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis omnis sed repellat unde voluptatum nostrum animi architecto repudiandae doloribus earum?</P>
      <H3>H3 Lorem ipsum dolor sit amet, consectetur.</H3>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nostrum sed cum assumenda officia ea et distinctio eum quasi. Pariatur, ipsum, vel!</P>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex cupiditate, quos maiores, incidunt voluptatem porro ratione debitis odio nostrum, labore architecto tempore! Repellat quidem, possimus in nihil iure odio voluptatibus repellendus modi nostrum.</P>
      <H4>H4 Lorem ipsum dolor sit amet, consectetur.</H4>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nostrum sed cum assumenda officia ea et distinctio eum quasi. Pariatur, ipsum, vel!</P>
      <H5>H5 Lorem ipsum dolor sit amet, consectetur.</H5>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nostrum sed cum assumenda officia ea et distinctio eum quasi. Pariatur, ipsum, vel!</P>
      <H6>H6 Lorem ipsum dolor sit amet, consectetur.</H6>
      <P>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nostrum sed cum assumenda officia ea et distinctio eum quasi. Pariatur, ipsum, vel!</P>
    </Container>
  ))
  .add('paragraph with inline link', () => (
    <P>This has an <A href="nowhere.com">an inline link</A></P>
  ));
/* eslint-enable */
