import styled from 'styled-components';

import IconButton from 'common/components/IconButton';
import { gutter } from 'common/styles/layout';
import { fastEaseQuad } from 'common/styles/animation';

export const ToggleButton = styled(IconButton)`
  ${gutter({ position: 'horizontal', mod: 1.5 })}
  line-height: 1;
  font-size: 1.3em;
  transition: all ${fastEaseQuad}, transform 100ms linear;
  transform: scale(1);

  &:active {
    opacity: 1;
    transform: scale(.9);
  }
`;
