import styled from 'styled-components';
import { white, black } from 'shared/styles/colors';

const Form = styled.form`
  position: relative;
  width: 100%;
  color: ${({ marked, valid }) => (marked && valid ? white : black)};
`;

export default Form;
