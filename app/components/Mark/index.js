import styled from 'styled-components';
import { adjustColor } from 'shared/styles/utils';
import { blueLight } from 'shared/styles/colors';

const Mark = styled.mark`
  background-color: ${adjustColor(blueLight, 'alpha(0.25)')};
  padding: 1px 2px 2px;
  border-radius: 1px;
`;

export default Mark;
