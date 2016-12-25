import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { white } from 'shared/styles/colors';

const Wrapper = styled.div`
  width: 100%;
  color: rgb(${white})
  ${fluidType(16, 24)}
  line-height: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
export default Wrapper;
