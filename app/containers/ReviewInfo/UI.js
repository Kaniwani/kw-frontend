import styled from 'styled-components';
import { whiteLight, greyLight } from 'shared/styles/colors';

export const Wrapper = styled.div`
  background-color: rgb(${whiteLight});
  overflow: hidden;
  width: 100%;
  text-align: center;
  z-index: 2;
`;

export const InfoHeading = styled.h4`
    opacity: .8;
    text-align: left;
    padding-bottom: .2em;
    margin: .4em .5em .2em;
    border-bottom: 1px solid rgb(${greyLight});
`;
