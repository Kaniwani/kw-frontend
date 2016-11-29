import styled from 'styled-components';

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  outline: none;
  border: 0;
  color: currentColor;
  box-shadow: inset 0 3px 20px -8px rgba(59,59,59,.25);
  font-size: calc(22px + 28 * ((100vw - 300px) / 1700));
  line-height: 2.5;
  text-align: center;
  transition: all .1s ease-out;
`;

export default Input;
