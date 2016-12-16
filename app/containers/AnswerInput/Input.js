import styled from 'styled-components';
import { fluidType } from 'shared/styles/utils';
import { white } from 'shared/styles/colors';
import { innerMedium } from 'shared/styles/shadows';

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0 1.8em;
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
    color: rgb(${white}); /* Override Android / IE font color change */
    -webkit-opacity: 1; /* Override iOS opacity change affecting text & background color */
    &::-webkit-input-placeholder { color: rgb(${white}); }
    &::-moz-placeholder { color: rgb(${white}); }
    &:-ms-input-placeholder { color: rgb(${white}); }
    &:placeholder-shown { color: rgb(${white}); }
  }
`;

export default Input;
