import styled from 'styled-components';
import { transparentize } from 'polished';

import { transparent, whiteLight, greyDark } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';
import { media } from 'shared/styles/media';

export const Wrapper = styled.div`
  z-index: 2; /* Stay above absolute ReviewBackgroundImg component */
`;

export const PanelsWrapper = Wrapper.extend`
  background-color: ${transparent};
  overflow: hidden;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  max-width: 2000px;

  ${media().sm`
    margin-bottom: 2rem;
  `}
`;

export const PanelWrapper = styled.div`
  ${gutter({ type: 'outer' })}
  background-color: ${whiteLight};

  &:not(:first-of-type) {
    border-top: 2px dashed ${transparentize(0.3, greyDark)};
  }

  &:last-of-type {
    ${({ addPadding }) => addPadding ? 'padding-bottom: 2rem;' : ''}
  }

  ${media().sm`
    margin-left: .4rem;
    margin-right: .4rem;
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
