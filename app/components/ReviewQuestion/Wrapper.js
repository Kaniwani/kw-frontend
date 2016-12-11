import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import { media } from 'shared/styles/media';

const Wrapper = styled.div`
  display: table-row;
  width: 100%;
  background-color: #6a3bbc;
  background-image: linear-gradient(180deg, #774ac6, #5f35a9);
  background-repeat: repeat-x;
  color: rgb(${white});
  text-align: center;
  height: 25vh;
  ${media('min').md`height: 33vh;`}
  ${media('min').lg`height: 40vh;`}
`;

export default Wrapper;
