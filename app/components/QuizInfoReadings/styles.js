import styled from 'styled-components';

import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';
import { grey } from 'shared/styles/colors';

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
  ${gutter({ mod: 3 })}  
  flex: 0 1 auto;
  align-self: flex-start;
  color: ${grey};
`;

export const StrokeLoaderText = H4.extend`
  ${gutter()}
  ${gutter({ position: 'bottom', mod: 0.5 })}
  display: inline-flex;
  color: ${grey};
`;
