import styled from 'styled-components';
import { black } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

const Entry = styled.p`
  color: rgb(${black});
  background-color: hsla(0,0%,94%,.95);
  padding: 10px 15px;
  ${fluidType(26, 50, 300, 2000)}
  line-height: 1.5;
  margin: 0;
`;

export default Entry;
