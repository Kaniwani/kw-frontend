import styled from 'styled-components';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';
import { media } from 'shared/styles/media';

export const Ul = styled.ul`
  ${resetList}
  width: 100%;
  align-items: inherit;
  justify-content: inherit;
`;

export const Li = styled.li`
  display: flex;
  flex-flow: row wrap;
  align-items: inherit;
  justify-content: inherit;
`;

export const ReadingContent = styled.div`
  ${gutter({ prop: 'margin', position: 'bottom', mod: 4 })}
  display: flex;
  flex-flow: column nowrap;
  align-items: inherit;
  justify-content: inherit;
  flex: 1 1 100%;
  ${media().md`
    flex: 1 2 auto;
  `}
`;

export const StrokeContent = styled.div`
  ${gutter({ prop: 'margin', position: 'vertical', mod: 2 })}
  display: flex;
  flex-flow: column nowrap;
  align-items: inherit;
  justify-content: inherit;
  flex: 1 1 100%;
  ${media().md`
    flex: 2 1 auto;
  `}
`;
