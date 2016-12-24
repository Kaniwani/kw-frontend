import styled from 'styled-components';
import { shadowBox } from 'shared/styles/shadows';

export default styled.div`
  position: relative;
  color: currentColor;
  ${shadowBox}
  transition: background-color 150ms ease-in-out;
`;
