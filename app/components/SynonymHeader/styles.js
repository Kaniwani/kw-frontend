import styled from 'styled-components';

import H3 from 'base/H3';
import IconButton from 'components/IconButton';

import { whiteLight, red } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter({ type: 'inner' })}
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: center;
`;

export const Heading = H3.extend`
  margin: 0;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  line-height: 1;
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
