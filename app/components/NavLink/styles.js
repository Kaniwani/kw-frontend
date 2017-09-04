import styled, { css } from 'styled-components';

import A from 'base/A';

import { resetButton } from 'shared/styles/utils';
import { grey, blueLight, purple } from 'shared/styles/colors';
import { epsilon, giga } from 'shared/styles/typography';
import { gutter } from 'shared/styles/layout';

export const Text = styled.span`
  position: relative;
  transform: translateY(-4px);
  padding-bottom: 4px;
  bottom: -4px;

  &:not(:only-child) {
    padding-right: .4em;
  }

  /* underline */
  &:after {
    display: block;
    position: absolute;
    content: "";
    width: 0;
    bottom: 0;
    left: 50%;
    opacity: 0;
    height: 3px;
    background: ${purple};
    transition: all .3s ease-out;
    transform: translateX(-50%);
  }
`;

export const Count = styled.span`
  margin-left: .3em;
  font-size: .7em;
  color: ${({ disabled }) => disabled ? grey : blueLight};
`;

const linkStyle = css`
  ${gutter({ type: 'outer' })}
  display: flex;
  font-size: 1.25em;
  font-weight: 600;
  font-variant: small-caps;
  justify-content: center;
  line-height: 1;
  align-items: center;
  cursor: pointer;
  color: currentColor;

  &:hover,
  &:focus,
  &:active,
  &.active {
    ${Text}:after {
      opacity: 1;
      width: 100%;
    }
  }

  ${({ disabled }) => disabled && `
    color: grey;
    pointer-events: none;
  `}
`;

export const Link = styled(A)`
  ${linkStyle}
`;

export const LinkButton = styled.button`
  ${resetButton}
  ${linkStyle}
`;

export const Li = styled.li`
  ${epsilon}
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 70px;

  ${({ isOffCanvas }) => isOffCanvas && css`
    ${giga}

    ${Link},
    ${LinkButton} {
      width: 100%;
      height: 100%;

      &:hover:not(.active) > ${Text}:after {
        opacity: 0;
        width: 0;
      }
    }
    ${Text} {
      bottom: 0;
    }
  `};

  ${({ disabled }) => disabled && `
    cursor: not-allowed;
  `}
`;
