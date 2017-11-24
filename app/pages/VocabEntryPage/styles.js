import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { media } from 'shared/styles/media';

export const Row = styled.div`
  ${gutter({ position: 'horizontal' })} display: flex;
  flex-flow: row wrap;
  & > div:first-of-type {
    flex: 10 1 800px;
  }
  & > div:last-of-type {
    flex: 1 2 320px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;
  ${media().md`
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    text-align: left;
  `};
`;

export const ColumnContainer = Column.extend`
  ${gutter()};
`;

export const LockContainer = Column.extend`
  ${gutter()} ${gutter({ prop: 'margin', position: 'vertical', mod: 3 })};
`;
