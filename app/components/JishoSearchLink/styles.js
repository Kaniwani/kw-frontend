import React from 'react';
import styled, { css } from 'styled-components';
import { timingFunctions } from 'polished';
import { ghost } from 'shared/styles/utils';
import A from 'base/A';

const style = css`
  display: block;
  margin: .2em .4em;
  transform: scale(.95);
  transition: transform .3s ${timingFunctions('easeInQuint')};
  &:hover {
    transform: scale(1);
    transition: transform .3s ${timingFunctions('easeOutQuint')};
  }
  ${({ visuallyHidden }) => visuallyHidden && ghost}
`;

export const StyledAnchor = styled(({
  visuallyHidden,
  ...props
}) => <A {...props} />)`${style}`;
