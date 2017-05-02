import styled from 'styled-components';

import H3 from 'base/H3';
import A from 'base/A';
import TagsList from 'components/TagsList';

import { elementGutter } from 'shared/styles/layout';
import { transparent, whiteLight, purple } from 'shared/styles/colors';
import { outerLine } from 'shared/styles/shadows';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export const Heading = styled(H3)`
  ${elementGutter}
  display: flex;
  margin: 0;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  align-self: flex-start;
`;

export const VocabLink = styled(A)`
  text-decoration: none;
  color: ${whiteLight};
  border-radius: 5px;
  background-color: ${purple};
  margin: 0 .15em;
  align-self: flex-end;
  font-size: .7em;
  line-height: 1.1;
  padding: .25em .5em;
  opacity: .9;

  &:first-child {
    margin-left: .75em;
  }
  &:hover {
    color: ${purple};
    background-color: ${transparent};
    box-shadow: ${outerLine};
  }
`;

export const Tags = styled(TagsList)`
  ${elementGutter}
  padding-left: 1rem;
  display: flex;
  flex-flow: row wrap;
  flex: 1 1 0%;
  align-self: flex-end;
  justify-content: flex-end;
  /* negate chip margin */
  margin-top: -.15em;
  margin-bottom: -.15em;
`;
