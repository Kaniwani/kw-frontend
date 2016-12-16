import styled from 'styled-components';
import { greyLight } from 'shared/styles/colors';

const Button = styled.button`
  width: 100%;
  padding: .75em 1.5em;
  border-radius: 0;
  border: 1px solid rgb(${greyLight});
  border-left-width: 0;
  border-right-width: 0;
  background-color: rgba(97,97,97,.9);
  color: currentColor;
  cursor: pointer;
  appearance: none;
  outline: 0;
  transition: all .2s ease-out;
  &:hover {
    background-color: #616161;
  }
`;

export default Button;
