import styled from 'styled-components';
import { adjustColor } from 'shared/styles/utils';
import { black, blueLight } from 'shared/styles/colors';

const Mark = styled.mark`
  background-color: ${adjustColor(blueLight, 'alpha(0.2)')};
  color: ${black};
  padding: 1px 2px 2px;
  border-radius: 2px;
`;

export default Mark;
