import styled from 'styled-components';
import { setLeftRight } from 'shared/styles/utils';

const InfoButton = styled.button`
  width: 100%;
  padding: .75em 1.5em;
  border: 1px solid #ababab;
  border-radius: 0;
  border-left-width: ${setLeftRight(0, 1)}px;
  border-right-width: ${setLeftRight(1, 0)}px;
  background-color: rgba(97,97,97,.9);
  color: #f0f0f0;
  cursor: pointer;
  -webkit-appearance: none;
  outline: 0;
  transition: all .2s ease-out;
  &:hover {
    background-color: #616161;
  }
`;

export default InfoButton;
