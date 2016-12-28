import styled from 'styled-components';
import { shadowBox } from 'shared/styles/shadows';
import { whiteLight } from 'shared/styles/colors';

export default styled.div`
  position: relative;
  color: currentColor;
  background-color: ${whiteLight}
  ${shadowBox}
  transition: background-color 150ms ease-in-out;
`;
