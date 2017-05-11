import styled from 'styled-components';
import { transparentize } from 'polished';

import { white, grey } from 'shared/styles/colors';
import { delta } from 'shared/styles/typography';
import { elementGutterHorizontal } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${elementGutterHorizontal}
`;

export const Heading = styled.h3`
  ${delta}
  margin: 0 0 1.25em;
  color: ${transparentize(0.1, grey)};
  font-weight: 400;
  line-height: 1.15;
  border-bottom: 2px solid ${transparentize(0.75, grey)};
`;

export const Text = styled.span`
  display: inline-block;
  position: relative;
  top: .5em;
  margin-left: .5em;
  padding: 0 .25em;
  background-color: white;
`;

export const Count = styled.strong`
  font-size: 0.9em;
  margin-right: .3em;
  padding: .1em .4em .15em;
  color: ${white};
  background-color: ${transparentize(0.1, grey)};
  border-radius: 2px;
`;
