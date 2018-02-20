import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { white } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';
import { borderRadius } from 'common/styles/sizing';
import { fastEaseQuad } from 'common/styles/animation';
import { epsilon } from 'common/styles/typography';

import A from 'common/components/A';
import Icon from 'common/components/Icon';

export const Wrapper = styled.div`
  ${gutter({ type: 'outer', position: 'vertical' })}
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1 0 auto;
`;

// peel off bgColor/isDisabled so not applied to <A/> as html attrs
/* eslint-disable react/prop-types */
const StyledA = ({
  bgColor,
  isDisabled,
  children,
  ...rest
}) => <A {...rest}>{children}</A>;

export const LinkBlock = styled(StyledA)`
  display: inline-flex;
  line-height: 1;
  transition: background-color ${fastEaseQuad};
  border-radius: ${borderRadius};
  ${({ bgColor }) => css`
    background-color: ${bgColor};
    &:hover {
      background-color:  ${darken(0.08, bgColor)};
    }
    &:focus,
    &:active {
      background-color:  ${darken(0.12, bgColor)};
    }
  `}

  ${({ isDisabled }) => isDisabled && 'pointer-events: none;'}
`;

const leftRightStyle = css`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: .9em 1em .7em;
  color: ${white[2]};
`;

export const Left = styled.div`
  ${leftRightStyle}
  ${epsilon}
`;
export const Right = styled.div`
  ${leftRightStyle}
  background-color: black;
  border-radius: ${borderRadius};
`;

export const InboxIcon = styled(Icon)`
  margin-right: .45em;
  margin-bottom: .05em; /* inbox icon has too much whitespace at top -_- */
`;

export const Count = styled.div`
  font-weight: 600;
`;
