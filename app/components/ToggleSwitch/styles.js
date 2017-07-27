import styled, { css } from 'styled-components';
import { darken, transparentize, timingFunctions } from 'polished';
import * as COLORS from 'shared/styles/colors';

// toggle background
const beforeMixin = ({ checked, width, height, toggleOnColor, toggleOffColor }) => {
  const position = `
    position: ${checked ? 'absolute' : 'relative'};
  `;
  const bgColor = checked ? COLORS[toggleOnColor] : COLORS[toggleOffColor];
  const boxShadow = checked && `
    box-shadow: inset 0 0 8px -2px ${COLORS.greyDark},
      0 -4px 8px -3px ${transparentize(0.3, COLORS.greyLight)},
      0 2px 6px ${COLORS.whiteDark};
  `;
  return css`
    display: block;
    visibility: visible;
    content: "";
    width: ${width};
    height: ${height};
    ${position}
    ${boxShadow}
    background-color: ${bgColor};
    background: linear-gradient(${darken(0.08, bgColor)} 0%, ${bgColor} 100%);
    border: 1px solid ${COLORS.greyDark};
    border-radius: 50px;
    transition: all .5s ${timingFunctions('easeOutQuint')};
  `;
};

// toggle knob
const afterMixin = ({ checked, width, height }) => {
  const transform = `translateX(${checked ? '2px' : `calc((${width} - (${width} /3)) + 2px)`})`;
  return css`
    display: block;
    visibility: visible;
    position: absolute;
    content: "";
    width: calc((${width} / 3) - 4px);
    height: calc((${height}) - 4px);
    top: 1px;
    transform: ${transform};
    transition: all .5s ${timingFunctions('easeOutQuint')};
    border: 5px solid ${COLORS.whiteLight};
    border-radius: 50px;
    background-color: ${COLORS.greyLight};
    background: linear-gradient(${darken(0.16, COLORS.whiteLight)} 0%, ${darken(0.04, COLORS.whiteLight)} 100%);
    box-shadow: 0 2px 5px ${COLORS.greyDark};
  `;
};

export const Input = styled.input`
  display: inline-block;
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  cursor: pointer;
  vertical-align: middle;
  visibility: hidden;

  &:focus:before {
    outline: 2px solid purple;
  }

  &:before {
    ${beforeMixin}
  }

  &:after {
    ${afterMixin}
  }
`;
