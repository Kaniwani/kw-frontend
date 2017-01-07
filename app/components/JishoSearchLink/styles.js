import React from 'react';
import styled, { css } from 'styled-components';
import A from 'components/A';
import { ghost } from 'shared/styles/utils';

const AnchorStyles = css`
  display: block;
  padding: .2em .4em;
  transform: scale(.95);
  transition: transform .15s ease-in;
  &:hover {
    transform: scale(1);
    transition: transform .3s ease-out;
  }
  ${(props) => props.visuallyHidden ? ghost : ''}
`;

/* eslint-disable no-unused-vars, import/prefer-default-export */
export const StyledAnchor = styled(({ visuallyHidden, ...props }) =>
  <A {...props} />)`${AnchorStyles}`;
/* eslint-enable */
