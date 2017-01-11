import styled from 'styled-components';
import { visuallyhidden, resetButton } from 'shared/styles/utils';
import { shadowBox, innerMedium } from 'shared/styles/shadows';
import { white, whiteLight, yellow, red, green } from 'shared/styles/colors';

export const Wrapper = styled.div`
  position: relative;
  color: currentColor;
  background-color: ${whiteLight};
  .is-invalid & {
    background-color: ${yellow};
  }
  .is-incorrect & {
    background-color: ${red};
  }
  .is-correct & {
    background-color: ${green};
  }
  ${shadowBox}
  transition: background-color 150ms ease-in-out;
`;

export const Label = styled.label`
  ${visuallyhidden}
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  margin: 0;
  outline: none;
  border: 0;
  line-height: 2;
  text-align: center;
  color: currentColor;
  box-shadow: ${innerMedium};
  background-color: inherit;

  /* leave some space for streak icon / submit button */
  padding-left: 30px;
  padding-right: 40px;

  /*hide stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
  &:focus {
    outline: none;
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

export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  & > button {
    ${resetButton}
    display: block;
    height: 100%;
    align-self: center;
    cursor: pointer;
    color: currentColor;
    background-color: rgba(0, 0, 0, 0);
    transition: opacity .3s ease-out;
    &:hover {
      opacity: 1;
    }
    & > span {
      display: block;
    }
  }
`;
