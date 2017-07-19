
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
`;

export const Controls = styled.div`
  ${gutter()}
  display: flex;
  flex: 0 1 320px;
  align-items: center;
  justify-content: space-between;
`;

export const ControlButton = styled(IconButton)`
  padding-left: 1rem;
  padding-right: 1rem;
`;
