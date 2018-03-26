import styled, { css } from 'styled-components';
import { mix, darken, lighten } from 'polished';

import { white, black, red, green, orange, blue } from 'common/styles/colors';
import { media } from 'common/styles/media';
import Icon from 'common/components/Icon';

import { TYPES } from '../constants';

const COLORS = {
  [TYPES.INFO]: blue[2],
  [TYPES.SUCCESS]: green[3],
  [TYPES.WARNING]: orange[3],
  [TYPES.ERROR]: red[3],
};

const MAX_HEIGHT_PX = '150px';

export const IconWrapper = styled.div`
  display: flex;
  top: 0;
  left: 0;
  height: 100%;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  padding: 1rem .75rem;
  border-top: 1px solid hsla(0,0%,0%,.1);
  max-height: ${MAX_HEIGHT_PX};
  overflow-y: auto;
  border-top: none;
  flex: 1;

  & p:last-child {
    margin-bottom: 0;
  }
`;

export const Close = styled(Icon).attrs({
  name: "CLOSE",
  size: '1.5rem',
})`
  cursor: pointer;
  align-self: center;
  height: 100%;
  margin: 0 .4rem;
  color: ${black[6]};
  opacity: .6;
  &:hover, &:focus {
    opacity: 1;
  }
  &:active {
    opacity: .2;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  word-wrap: break-word;
  pointer-events: auto;
  width: 100%;
  overflow: hidden;
  z-index: 9999;
  max-height: ${MAX_HEIGHT_PX};

  ${media().sm`
    border-radius: 5px;
  `}

  ${({ type }) => css`
    background: ${lighten(0.1, COLORS[type])};

    & ${Content} {
      color: ${mix(0.9, '#000', COLORS[type])};
    }

    & ${IconWrapper} {
      color: ${white[0]};
      background: ${darken(0.15, COLORS[type])};
    }
  `}
`;
