import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { white } from 'shared/styles/colors';
import { innerMedium } from 'shared/styles/shadows';

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  outline: none;
  border: 0;
  ${fluidType(22, 50, 300, 2000)}
  line-height: 2.5;
  text-align: center;
  color: currentColor;
  box-shadow: ${innerMedium};
  /*hide stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
  &[disabled] {
    color: ${white}; /* Override Android / IE font color change */
    -webkit-opacity: 1; /* Override iOS opacity change affecting text & background color */
    &::-webkit-input-placeholder { color: ${white}; }
    &::-moz-placeholder { color: ${white}; }
    &:-ms-input-placeholder { color: ${white}; }
    &:placeholder-shown { color: ${white}; }
  }
`;

export default Input;
