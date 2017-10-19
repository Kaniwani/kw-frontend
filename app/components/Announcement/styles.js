import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { greyLight } from 'shared/styles/colors';

import H4 from 'base/H4';
import Button from 'base/Button';

export const Article = styled.article`
  & .ReactCollapse--collapse {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  & .ReactCollapse--content {
    max-width: 600px;
    ${gutter({ type: 'outer' })}
  }
`;

export const Header = styled.header`
  ${gutter()}
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const Toggle = styled(Button)`
  border-bottom: 1px solid ${greyLight};
`;

export const Title = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const TitleText = H4.extend`
  color: inherit;
`;

export const Time = styled.time`
  ${gutter()}
`;
