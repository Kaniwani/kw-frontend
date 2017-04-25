import React from 'react';
import { storiesOf } from '@kadira/storybook';
import H1 from 'components/H1';
import H2 from 'components/H2';
import H3 from 'components/H3';
import H4 from 'components/H4';
import H5 from 'components/H5';
import H6 from 'components/H6';
import P from 'components/P';
import Container from 'layouts/Container';

/* eslint-disable max-len */
storiesOf('Typography', module)
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
  ));
/* eslint-enable */
