import styled from 'styled-components';
import { innerMedium } from 'shared/styles/shadows';
import * as COLORS from 'shared/styles/colors';

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 0;
  outline: none;
  border: 0;
  line-height: 2;
  text-align: center;
  color: currentColor;
  box-shadow: ${innerMedium};
  background-color: rgb(${COLORS.whiteLight});
  .is-invalid & {
    background-color: rgb(${COLORS.yellow});
  }
  .is-incorrect & {
    background-color: rgb(${COLORS.red});
  }
  .is-correct & {
    background-color: rgb(${COLORS.green});
  }

  /*hide stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
  &[disabled] {
    color: rgb(${COLORS.white}); /* Override Android / IE font color change */
    -webkit-opacity: 1; /* Override iOS opacity change affecting text & background color */
    &::-webkit-input-placeholder { color: rgb(${COLORS.white}); }
    &::-moz-placeholder { color: rgb(${COLORS.white}); }
    &:-ms-input-placeholder { color: rgb(${COLORS.white}); }
    &:placeholder-shown { color: rgb(${COLORS.white}); }
  }
`;

export default Input;
