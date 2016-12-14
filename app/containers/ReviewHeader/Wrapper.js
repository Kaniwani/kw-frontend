import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { white } from 'shared/styles/colors';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: rgb(${white})
  ${fluidType(16, 20)}
`;
export default Wrapper;
