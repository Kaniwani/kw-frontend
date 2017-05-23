import styled from 'styled-components';

import IconButton from 'components/IconButton';
import { gutter } from 'shared/styles/layout';

export const ToggleButton = styled(IconButton)`
  ${gutter({ position: 'horizontal' })}
  line-height: 1;
  font-size: 1.3em;
`;
