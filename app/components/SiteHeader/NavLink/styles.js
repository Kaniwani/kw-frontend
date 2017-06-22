import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

import A from 'base/A';

import { whiteDark, grey, blueLight, purple } from 'shared/styles/colors';
import { epsilon } from 'shared/styles/typography';
import { media } from 'shared/styles/media';

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

export const Link = styled(A)`
  display: flex;
  font-size: 1.25em;
  font-weight: 600;
  font-variant: small-caps;
  justify-content: center;
  line-height: 1;
  align-items: center;
  padding: .75em;
  cursor: pointer;
  color: ${({ disabled }) => disabled ? grey : 'currentColor'};

  ${media('max').sm`
    padding: 0 .4em;
  `}

  &:hover,
  &:focus,
  &:active,
  &.active {
    ${Text}:after {
      opacity: 1;
      width: 100%;
    }
  }
`;

export const Li = styled.li`
  ${epsilon}
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${({ isOffCanvas }) => isOffCanvas && css`
    flex: 1 0 auto;
    border-bottom: 1px solid ${transparentize(0.25, whiteDark)};
    ${Link} {
      padding: 1rem 1rem .4rem;
      width: 100%;

      &:hover:not(.active) > ${Text}:after {
        opacity: 0;
        width: 0;
      }
    }
    ${Text} {
      bottom: 0;
    }
  `};
`;
