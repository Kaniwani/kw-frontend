import styled, { css } from 'styled-components';

import A from 'common/components/A';

import { rubberBand } from 'common/styles/animation';
import { resetButton } from 'common/styles/utils';
import { blackLight, grey, pink, blueLight, purple } from 'common/styles/colors';
import { epsilon, giga } from 'common/styles/typography';
import { gutter } from 'common/styles/layout';

export const Text = styled.span`
  position: relative;
  transform: translateY(-4px);
  padding-top: 4px;
  padding-bottom: 4px;
  bottom: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;

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

export const Count = styled.div`
  padding-top: 1px;
  margin-left: 5px;
  color: ${({ disabled }) => disabled ? grey : blueLight};
  transform: scale3d(1, 1, 1);
  animation-duration: 0.9s;
  animation-fill-mode: both;
  ${({ changed }) => changed && `
    animation-name: ${rubberBand};
  `};
`;

const linkStyle = css`
  ${gutter()}
  ${gutter({ position: 'horizontal', mod: 2 })}
  display: flex;
  font-weight: 600;
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

  ${({ disabled, isOffCanvas }) => disabled && css`
    color: ${isOffCanvas ? blackLight : grey };
    pointer-events: none;
  `}
`;

export const Link = styled(A).attrs({
  plainLink: true,
})`
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
    width: 100%;
    min-height: 8vh;

    & ${Link},
    & ${LinkButton} {
      height: 100%;
      width: 100%;
    }

    & ${Text} {
      bottom: 0;
      &:after {
        opacity: 0;
        width: 0;
        height: 0;
      }
    }

    & ${Count} {
      color: ${pink};
    }
  `};

  ${({ disabled }) => disabled && css`
    cursor: not-allowed;
  `}
`;
