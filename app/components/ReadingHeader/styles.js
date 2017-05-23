import styled from 'styled-components';
import { gutter } from 'shared/styles/layout';

import H3 from 'base/H3';
import A from 'base/A';
import TagsList from 'components/TagsList';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const Heading = styled(H3)`
  margin: 0;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  line-height: 1;
  align-self: flex-start;
`;

export const VocabLink = styled(A)`
  display: block;
  ${gutter()}
  margin: 0 .2em;
  text-decoration: underline;
  line-height: 1;
`;

export const Tags = styled(TagsList)`
  display: flex;
  flex-flow: row wrap;
`;
