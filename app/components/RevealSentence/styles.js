import styled from 'styled-components';
import { rgba } from 'polished';

import P from 'base/P';
import Icon from 'components/Icon';

import { gutter } from 'shared/styles/layout';
import { borderRadius } from 'shared/styles/sizing';
import { whiteLight, greyDark } from 'shared/styles/colors';
import { fastEaseQuad, midEaseQuad } from 'shared/styles/animation';

export const Sentence = P.extend`
  font-size: 1.1em;
  font-style: italic;
  line-height: 1.2;
  color: ${greyDark};
  transition: all ${fastEaseQuad};
  border-radius: ${borderRadius};
  background-color: ${rgba(greyDark, 0.95)};
`;

export const RevealIcon = styled(Icon)`
  position: absolute;
  left: 50%;
  top: 50%;
  color: ${whiteLight};
  opacity: 1;
  transition: opacity ${fastEaseQuad};
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const Wrapper = styled.div`
  /* padding upsets icon translate centering */
  ${gutter({ prop: 'margin', position: 'horizontal' })}
  ${gutter({ prop: 'margin', position: 'bottom' })}
  position: relative;

  &:hover,
  &:active,
  &:focus {
    & ${Sentence} {
      transition: all ${midEaseQuad};
      outline: none;
      color: greyDark;
      background-color: transparent;
    }
    & ${RevealIcon} {
      transition: opacity ${midEaseQuad};
      opacity: 0;
    }
  }
`;
