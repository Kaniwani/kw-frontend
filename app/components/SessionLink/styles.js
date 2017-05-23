import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import * as COLORS from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';
import { borderRadius } from 'shared/styles/sizing';
import { fastEaseQuad } from 'shared/styles/animation';
import { zeta } from 'shared/styles/typography';

import A from 'base/A';
import Icon from 'components/Icon';

export const Wrapper = styled.div`
  ${gutter({ type: 'outer', position: 'vertical' })}
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1 0 auto;
`;

// peel off bgColor prop so it's not applied to <A/> as html attr
export const LinkBlock = styled(({ bgColor, children, ...rest }) => <A {...rest}>{children}</A>)`
  display: inline-flex;
  line-height: 1;
  transition: background-color ${fastEaseQuad};
  border-radius: ${borderRadius};

  ${({ bgColor }) => `
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
  ${zeta}
  letter-spacing: -0.01em;
`;
export const Right = styled.div`
  ${leftRightStyle}
  background-color: black;
  border-radius: ${borderRadius};
`;

export const InboxIcon = styled(Icon)`
  margin-right: .45em;
`;

export const Count = styled.div`
  font-weight: 600;
`;
