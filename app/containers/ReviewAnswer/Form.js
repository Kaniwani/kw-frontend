import styled from 'styled-components';
import { white, black } from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

const Form = styled.form`
  position: relative;
  width: 100%;
  ${fluidType(22, 50, 300, 2000)}
  color: ${({ marked, valid }) => (marked && valid ? white : black)};
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  outline: none;
  /* ios has rounded inputs by default ffs */
  appearance: none;
  -webkit-appearance: none;
`;

export default Form;
