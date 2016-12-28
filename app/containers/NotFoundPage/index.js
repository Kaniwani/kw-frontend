/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 * */

import React from 'react';
import Wrapper from 'components/Wrapper';
import Section from 'components/Section';
import H1 from 'components/H1';
import P from 'components/P';


export default function NotFound() {
  return (
    <Section>
      <Wrapper>
        <H1>Wuh-oh, we couldn’t find what you were looking for.</H1>
        <P>Perhaps retrace your steps, follow those breadcrumbs...</P>
      </Wrapper>
    </Section>
  );
}
