import styled from 'styled-components';
import { whiteLight } from 'shared/styles/colors';

const Wrapper = styled.div`
  display: flex;
  background-color: rgb(${whiteLight});
  flex-flow: row wrap;
  overflow: hidden;
  width: 100%;
  text-align: center;
  z-index: 2;
`;

export default Wrapper;
