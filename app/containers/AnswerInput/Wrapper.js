import styled from 'styled-components';
import { shadowBox } from 'shared/styles/shadows';
import {
  whiteLight,
  yellow,
  red,
  green,
} from 'shared/styles/colors';

export default styled.div`
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
