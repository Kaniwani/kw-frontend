import styled from 'styled-components';

import H3 from 'base/H3';
import TagsList from 'components/TagsList';

import { resetButton } from 'shared/styles/utils';
import { elementGutter } from 'shared/styles/layout';
import { transparent, whiteLight, red } from 'shared/styles/colors';

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
  align-self: flex-start;
`;

export const Tags = styled(TagsList)`
  ${elementGutter}
  display: flex;
  flex-flow: row wrap;
  align-self: center;
`;

export const IconButton = styled.button`
  ${resetButton}
  display: block;
  border-radius: 5px;
  align-self: center;
  transform: translateY(1px);
  padding: 2px;
  line-height: 1;
  margin-left: .5em;
  margin-right: .75em;
  font-size: .75em;
  background-color: ${transparent};
  color: currentColor;
  cursor: pointer;
  transition: opacity .2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

export const RemoveButton = styled(IconButton)`
  color: ${whiteLight};
  background-color: ${red};
  opacity: .6;
`;
