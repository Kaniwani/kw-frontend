import styled from 'styled-components';
import { white, black } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

const Form = styled.form`
  position: relative;
  max-width: 100%;
  ${fluidType(22, 50, 300, 2000)}
  color: rgb(${black});
  background-color: transparent;
  margin: .5rem .6rem;
  border: 0;
  border-radius: 0;
  outline: none;
  appearance: none;
  z-index: 2;
  &.is-marked {
    color: rgb(${white});
  }
`;

export default Form;
