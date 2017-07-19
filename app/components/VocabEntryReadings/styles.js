import styled from 'styled-components';
import P from 'base/P';

import { gutter } from 'shared/styles/layout';
import { media } from 'shared/styles/media';
import { fluidType } from 'shared/styles/utils';
import { delta } from 'shared/styles/typography';

export const Inner = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const ReadingContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

export const Outer = styled.div`
  width: 100%;
  ${media().sm`
    text-align: center;
    & ${Inner} {
      align-items: center;
    }
    & ${ReadingContent} {
      justify-content: center;
      max-width: 800px;
    }
  `}
`;

export const Reading = styled.div`
  ${gutter()}
  ${gutter({ type: 'outer', prop: 'margin', position: 'right', mod: 1.5 })}
`;

export const Character = P.extend`
  ${fluidType(35, 50)}
  padding-top: 0 !important;
  line-height: 1.2;
`;

export const Kana = P.extend`
  ${delta}
  padding-bottom: 0 !important;
  opacity: 0.85;
  line-height: 1.2;
`;
