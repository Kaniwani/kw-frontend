import { css } from 'styled-components';
import { blue, blueDark, whiteLight } from 'shared/styles/colors';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: .25em 2em;
  text-decoration: none;
  appearance: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  border: 2px solid ${blue};
  color: ${blue};

  &:active,
  &:focus,
  &:hover {
    background: ${blue};
    color: ${whiteLight};
  }

  &:active {
    background: ${blueDark};
    border-color: ${blueDark};
  }
`;

export default buttonStyles;
