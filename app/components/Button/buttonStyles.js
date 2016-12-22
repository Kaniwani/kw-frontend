import { css } from 'styled-components';

const bgColor = '#41addd';

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
  border: 2px solid ${bgColor};
  color: rgb(${bgColor});

  &:active {
    background: ${bgColor};
    color: #fff;
  }

`;

export default buttonStyles;
