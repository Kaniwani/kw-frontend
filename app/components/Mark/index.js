import styled from 'styled-components';
import { blueLight } from 'shared/styles/colors';

const Mark = styled.mark`
  background-color: rgba(${blueLight}, .3);
  padding: 1px 2px 2px;
  border-radius: 1px;
`;

export default Mark;
