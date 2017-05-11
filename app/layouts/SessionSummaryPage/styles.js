import styled from 'styled-components';

import IconButton from 'components/IconButton';
import { containerGutter, containerGutterHorizontal } from 'shared/styles/layout';

export const Heading = styled.div`
  ${containerGutter}
  display: flex;
  padding-bottom: 0;
`;

export const ToggleButton = styled(IconButton)`
  ${containerGutterHorizontal}
  line-height: 1;
  font-size: 1.25em;
`;
