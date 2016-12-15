import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { white } from 'shared/styles/colors';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: rgb(${white})
  ${fluidType(16, 24)}
  line-height: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: .5rem;
`;
export default Wrapper;
