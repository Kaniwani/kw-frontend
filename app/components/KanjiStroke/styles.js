
import styled from 'styled-components';
import IconButton from 'components/IconButton';

import { gutter } from 'shared/styles/layout';

export const Wrapper = styled.div`
  ${gutter()}
`;

export const Canvas = styled.div`
  ${gutter()}
  min-height: 210px;
`;

export const Controls = styled.div`
  ${gutter()}
`;

export const ControlButton = styled(IconButton)`
  ${gutter({ position: 'horizontal', mod: 3 })}
`;
