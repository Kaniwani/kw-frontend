import styled from 'styled-components';

import IconButton from 'components/IconButton';
import H3 from 'base/H3';

import { gutter } from 'shared/styles/layout';
import { delta } from 'shared/styles/typography';
import { resetList } from 'shared/styles/utils';
import { whiteLight, red } from 'shared/styles/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const Heading = H3.extend`
  ${gutter({ type: 'outer' })}
  margin: 0;
  align-self: flex-start;
  opacity: .8;
  text-align: left;
  flex: 0 0 auto;
  line-height: 1;
`;

export const Ul = styled.ul`
  ${resetList}
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const Li = styled.li`
  ${gutter({ prop: 'margin' })}
  display: flex;
  align-items: center;
`;

export const Button = styled(IconButton)`
  ${gutter({ prop: 'margin' })}
  ${gutter({ prop: 'margin', position: 'bottom', mod: 4 })}
  ${delta}
  color: ${whiteLight};
  background-color: ${red};
  opacity: .4;
  align-self: flex-end;
  border-radius: 5px;

  &:hover {
    opacity: .8;
  }
`;
