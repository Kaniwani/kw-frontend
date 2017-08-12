import styled from 'styled-components';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

import H4 from 'base/H4';

export const Li = styled.li`
  display: flex;
  flex-flow: column nowrap;
`;

export const Ul = styled.ul`
  ${resetList}
  width: 100%;
`;

export const ReadingContent = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

export const StrokeLoader = styled.div`
  ${gutter({ position: 'vertical', mod: 1.5 })}  
  flex: 0 1 auto;
  align-self: flex-start;
`;

export const StrokeLoaderText = H4.extend`
  display: inline-flex;
`;
