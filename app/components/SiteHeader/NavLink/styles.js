import styled from 'styled-components';
import { transparentize } from 'polished';

import { whiteDark, grey, blueLight, purple } from 'shared/styles/colors';
import { epsilon } from 'shared/styles/typography';
import { media } from 'shared/styles/media';

import A from 'base/A';

export const Li = styled.li`
  ${epsilon}
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &.is-off-canvas {
    flex: 1 0 auto;
    border-bottom: 1px solid ${transparentize(0.25, whiteDark)};
  }
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

  ${media('max').sm`
    padding: 0 .4em;
  `}

  &:hover,
  &:focus,
  &:active,
  &.is-active {
    > .NavLink__Text:after {
      opacity: 1;
      width: 100%;
    }
  }

  .is-off-canvas & {
    padding: 1rem 1rem .4rem;

    &:hover:not(.is-active) > .NavLink__Text:after {
      opacity: 0;
      width: 0;
    }
  }
`;

export const Text = styled.span`
  position: relative;
  transform: translateY(-4px);
  padding-bottom: 4px;
  bottom: -4px;

  .is-off-canvas & {
    bottom: 0; /* different centering to onCanvas NavLink when in vertical list */
  }

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
  color: ${({ isDisabled }) => isDisabled ? grey : blueLight};
`;
