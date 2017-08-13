import styled from 'styled-components';

import IconButton from 'components/IconButton';
import { gutter } from 'shared/styles/layout';
import { fastEaseQuad } from 'shared/styles/animation';

export const ToggleButton = styled(IconButton)`
  ${gutter({ position: 'horizontal' })}
  line-height: 1;
  font-size: 1.3em;
  transition: all ${fastEaseQuad}, transform 100ms linear;
  transform: scale(1);

  &:active {
    opacity: 1;
    transform: scale(.9);
  }
`;
