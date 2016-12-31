/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 * */

import React from 'react';
import Container from 'components/Container';
import Wrapper from 'components/Wrapper';
import H1 from 'components/H1';
import P from 'components/P';


export default function NotFound() {
  return (
    <Wrapper>
      <Container>
        <H1>Wuh-oh, we couldn’t find what you were looking for.</H1>
        <P>Perhaps retrace your steps, follow those breadcrumbs...</P>
      </Container>
    </Wrapper>
  );
}
