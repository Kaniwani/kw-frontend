import styled from 'styled-components';

import H3 from 'common/components/H3';
import Button from 'common/components/Button';

import { gutter } from 'common/styles/layout';
import { epsilon } from 'common/styles/typography';
import { resetList } from 'common/styles/utils';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const Heading = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: row wrap;
`;

export const HeadingText = H3.extend`
  margin: 0;
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
  flex-flow: column nowrap;
`;

export const RemoveButton = styled(Button)`
  ${epsilon}
  opacity: .4;
  text-align: center;

  &:hover,
  &:active {
    opacity: .7;
  }
`;
