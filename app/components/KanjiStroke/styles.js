
import styled from 'styled-components';
import IconButton from 'components/IconButton';

import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;
`;

export const Canvas = styled.div`
  ${gutter()}
  min-height: 200px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

export const Controls = styled.div`
  ${gutter({ position: 'bottom' })}
  display: flex;
  justify-content: center;
`;

export const ControlButton = styled(IconButton)`
  ${gutter({ position: 'horizontal', mod: 3 })}
`;
