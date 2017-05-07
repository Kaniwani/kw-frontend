import styled from 'styled-components';
import { darken, transparentize } from 'polished';

import * as COLORS from 'shared/styles/colors';
import { containerGutterVertical } from 'shared/styles/layout';
import { fastEaseQuad } from 'shared/styles/animation';
import { milli } from 'shared/styles/typography';

import A from 'base/A';
import Icon from 'components/Icon';

export const Wrapper = styled.div`
  ${containerGutterVertical}
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1 0 auto;
`;

export const LinkBlock = styled(A)`
  display: inline-flex;
  line-height: 1;
  transition: background-color ${fastEaseQuad};

  ${({ bgColor }) => `
    text-shadow: 0.05em 0.05em 0.1em ${transparentize(0.2, darken(0.4, COLORS[bgColor]))};
    background-color: ${COLORS[bgColor]};
    &:hover {
      background-color:  ${darken(0.08, COLORS[bgColor])};
    }
    &:focus,
    &:active {
      background-color:  ${darken(0.12, COLORS[bgColor])};
    }
  `}
`;

const leftRightStyle = `
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: .85rem 1rem;
  color: ${COLORS.whiteLight};
`;

export const Left = styled.div`
  ${leftRightStyle}
  ${milli}
  letter-spacing: -0.01em;
  text-transform: uppercase;
  font-variant: small-caps;
  border-radius: 3px 0 0 3px;
`;
export const Right = styled.div`
  ${leftRightStyle}
  background-color: black;
  border-radius: 0 3px 3px 0;
`;

export const InboxIcon = styled(Icon)`
  margin-right: .45em;
`;

export const Count = styled.div`
  font-weight: 600;
`;
