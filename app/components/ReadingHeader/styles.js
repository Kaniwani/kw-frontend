import styled from 'styled-components';

import H3 from 'base/H3';
import A from 'base/A';
import TagsList from 'components/TagsList';

import { elementGutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Heading = styled(H3)`
  ${elementGutter}
  display: flex;
  margin: 0;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
`;

export const VocabLink = styled(A)`
  display: inline-flex;
  padding: .2em .5em;
  margin: 0 .2em;
  text-decoration: underline;
  align-self: center;

  &:first-of-type {
    margin-left: .5em;
  }
  &:last-of-type {
    margin-right: .5em;
  }
`;

export const Tags = styled(TagsList)`
  ${elementGutter}
  display: flex;
  flex-flow: row wrap;
  align-self: center;
`;
