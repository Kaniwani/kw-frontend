import styled from 'styled-components';

import H3 from 'base/H3';
import TagsList from 'components/TagsList';
import IconButton from 'components/IconButton';

import { whiteLight, red } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter({ type: 'outer' })}
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const Heading = styled(H3)`
  display: flex;
  margin: 0;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  align-self: flex-start;
  line-height: 1;
`;

export const Tags = styled(TagsList)`
  display: flex;
  flex-flow: row wrap;
`;

export const RemoveButton = styled(IconButton)`
  color: ${whiteLight};
  background-color: ${red};
  opacity: .6;
  border-radius: 5px;
  align-self: center;
  margin-left: .5em;
  margin-right: .75em;
  &:hover {
    opacity: .8;
  }
`;
