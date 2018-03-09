import styled, { css, keyframes } from 'styled-components';
import { rgba, timingFunctions } from 'polished';

import { gutter } from 'common/styles/layout';
import { grey, white, orange, blue } from 'common/styles/colors';

export const Form = styled.form`
  ${gutter()}
  display: flex;
  flex-flow: row wrap;
`;

export const Controls = styled.div`
  ${gutter()}
  flex: 1 0 100%;
`;

export const Section = styled.section`
  flex: 1 1 500px;
`;

export const SubSection = styled.section`
  ${gutter({ type: 'outer', position: 'vertical' })}
`;

export const Block = styled.div`
  ${gutter()}
  display: flex;
  flex-flow: column nowrap;
`;

export const Label = styled.label`
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  align-items: center;
  & > * {
    ${gutter()}
    display: inline-flex;
  }
`;

export const ToggleLabel = Label.extend`
  flex-wrap: nowrap;
`;

export const Note = styled.div`
  ${gutter()}
  font-style: italic;
`;

export const ValidationMessage = styled.div`
  ${gutter()}
  flex: 1 0 100%;
  font-size: .9em;
  font-style: italic;
  color: ${orange[5]};
`;


/* NOTE: scale is almost identical, but we need *different* animation names to trigger animation
* and styled components will just re-use the *same* name if declared animations are identical */
const switchOn = keyframes` 50% { transform: scaleX(1.3);  } `;
const switchOff = keyframes` 50% { transform: scaleX(1.31);  } `;

export const ToggleSwitch = styled.input`
  position: absolute;
  opacity: 0;
`;

/* switch track container */
export const ToggleDisplay = styled.span`
  ${gutter({ prop: 'margin', type: 'inner', position: 'right' })}
  position: relative;
  flex: 0 0 auto;
  width: ${({ trackWidth }) => trackWidth}rem;
  height: ${({ trackHeight }) => trackHeight}rem;
  cursor: pointer;
  vertical-align: middle;

  /* switch track */
  &:before {
    display: block;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: background 0.2s 0.1s ${timingFunctions('easeQuint')};
    background-color: ${({ uncheckedColor }) => uncheckedColor};
    box-shadow: ${({ uncheckedColor }) => css`inset 0px 1px 1px ${rgba(uncheckedColor, 0.5)}`};

    ${ToggleSwitch}:checked + & {
      content: "";
      background-color: ${({ checkedColor }) => checkedColor};
      box-shadow: ${({ checkedColor }) => css`inset 0px 1px 1px ${rgba(checkedColor, 0.5)}`};
    }

    .user-is-tabbing ${ToggleSwitch}:focus + & {
      outline: ${blue[3]} auto .2rem;
    }
  }

  /* switch button */
  &:after {
    display: block;
    position: absolute;
    content: "";
    width: ${({ switchWidth }) => switchWidth}rem;
    height: ${({ switchHeight }) => switchHeight}rem;
    top: 0;
    left: 0;
    transition: all 0.2s ${timingFunctions('easeQuint')};
    animation: ${switchOn} 0.3s ${timingFunctions('easeOutQuint')};
    border-radius: 50px;
    background-color: ${white[2]};
    box-shadow: 0 1px 4px ${rgba(grey[5], 0.3)};
    z-index: 2;

    ${ToggleSwitch}:checked + & {
      animation: ${switchOff} 0.3s ${timingFunctions('easeOutQuint')};
      left: ${({ trackWidth, switchWidth }) => `calc(${trackWidth}rem - ${switchWidth}rem)`};
    }
  }
`;
