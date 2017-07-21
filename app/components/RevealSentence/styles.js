import styled from 'styled-components';
import { rgba } from 'polished';

import P from 'base/P';
import Icon from 'components/Icon';

import { gutter } from 'shared/styles/layout';
import { borderRadius } from 'shared/styles/sizing';
import { whiteLight, greyDark, transparent } from 'shared/styles/colors';
import { fastEaseQuad, midEaseQuad } from 'shared/styles/animation';

export const Sentence = P.extend`
  font-size: 1.1em;
  font-style: italic;
  line-height: 1.2;
  color: ${greyDark};
  transition: all ${fastEaseQuad};
  border-radius: ${borderRadius};
  background-color: ${rgba(greyDark, 0.95)};
  @supports( filter: blur() ) {
    background-color: ${transparent};
    filter: blur(5px);
  }
`;

export const RevealIcon = styled(Icon)`
  position: absolute;
  ${gutter({ prop: 'margin', position: 'top', mod: 0.5 })}
  left: 50%;
  top: 0;
  opacity: 1;
  transition: opacity ${fastEaseQuad};
  transform: translate(-50%, 0);
  z-index: 1;
  color: ${whiteLight};
  @supports( filter: blur() ) {
    color: ${greyDark};
  }
`;

export const Wrapper = styled.div`
  position: relative;
  align-self: flex-start;

  &:hover,
  &:active,
  &:focus {
    & ${Sentence} {
      transition: all ${midEaseQuad};
      outline: none;
      color: greyDark;
      background-color: transparent;
      @supports( filter: blur() ) {
        filter: blur(0px);
      }
    }
    & ${RevealIcon} {
      transition: opacity ${midEaseQuad};
      opacity: 0;
    }
  }
`;
