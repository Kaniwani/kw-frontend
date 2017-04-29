import styled from 'styled-components';
import { darken, transparentize, timingFunctions } from 'polished';
import * as COLORS from 'shared/styles/colors';

const toggleBackgroundMixin = ({ on }) => ({ toggleOnColor, toggleOffColor }) => {
  const color = on ? COLORS[toggleOnColor] : COLORS[toggleOffColor];
  return `
    background-color: ${color};
    background: ${`linear-gradient(${darken(0.08, color)} 0%, ${color} 100%)`};
  `;
};

// toggle background
const sharedBeforeMixin = ({ width, height }) => `
  display: block;
  content: "";
  width: ${width};
  height: ${height};
  transition: all .5s ${timingFunctions('easeOutQuint')};
  border: 1px solid ${COLORS.greyDark};
  border-radius: 50px;
`;

// toggle knob
const sharedAfterMixin = ({ on }) => ({ width, height }) => {
  const transform = `translateX(${on ? '2px' : `calc((${width} - (${width} /3)) + 2px)`})`;
  return `
    display: block;
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

  &:before {
    visibility: visible;
    position: relative;
    box-shadow: inset 0 0 8px -2px ${COLORS.greyDark},
      0 -4px 8px -2px ${transparentize(0.3, COLORS.greyLight)},
      0 2px 6px ${COLORS.whiteDark};
    ${sharedBeforeMixin}
    ${toggleBackgroundMixin({ on: true })}
  }
  &:checked:before {
    position: absolute;
    ${sharedBeforeMixin}
    ${toggleBackgroundMixin({ on: false })}
  }
  &:after {
    position: absolute;
    visibility: visible;
    ${sharedAfterMixin({ on: true })}
  }
  &:checked:after {
    position: absolute;
    ${sharedAfterMixin({ on: false })}
  }
`;
