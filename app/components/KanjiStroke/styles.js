
import styled from 'styled-components';
import IconButton from 'components/IconButton';

import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

export const Canvas = styled.div`
  ${gutter()}
  display: flex;
  justify-content: center;
  flex: 1 1 100%;
  min-height: 150px;
`;

export const Controls = styled.div`
  ${gutter()}
  display: flex;
  flex: 0 1 auto;
  justify-content: space-around;
  align-items: center;
`;

export const ControlButton = styled(IconButton)`
  ${gutter({ position: 'horizontal', mod: 3 })}
`;
