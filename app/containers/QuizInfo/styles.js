import styled from 'styled-components';
import { transparentize } from 'polished';

import { transparent, whiteLight, greyDark } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';
import { media } from 'shared/styles/media';

export const Wrapper = styled.div`
  z-index: 2; /* Stay above absolute Quiz Background Image */
`;

export const PanelsWrapper = Wrapper.extend`
  background-color: ${transparent};
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 2000px;

  ${media().sm`
    margin-bottom: 2rem;
  `}
`;

export const PanelWrapper = styled.div`
  background-color: ${whiteLight};
  display: flex;
  flex-flow: row wrap;
  ${gutter({ position: 'horizontal' })}

  &:not(:first-of-type) {
    border-top: 2px dashed ${transparentize(0.3, greyDark)};
  }

  &:last-of-type {
    ${({ addPadding }) => addPadding ? 'padding-bottom: 2rem;' : ''}
    padding-bottom: 1rem;
  }

  ${media().sm`
    &:first-child {
      border-radius: .3rem .3rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 .3rem .3rem;
    }
    &:only-child {
      border-radius: .3rem;
    }
  `}
`;
