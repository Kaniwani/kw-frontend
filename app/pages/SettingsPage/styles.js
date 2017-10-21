import styled, { keyframes } from 'styled-components';
import { FormSection } from 'redux-form';
import { rgba, timingFunctions } from 'polished';

import { gutter } from 'shared/styles/layout';
import { grey, whiteLight, orange, blueLight } from 'shared/styles/colors';

export const Form = styled.form`
  ${gutter()};
  display: flex;
  flex-flow: row wrap;
`;

export const Controls = styled.div`
  ${gutter()};
  flex: 1 0 100%;
`;

export const Section = styled(FormSection)`
  flex: 1 1 500px;
`;

export const SubSection = styled(FormSection)`
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
    display: block;
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
  color: ${orange};
`;


/* NOTE: scale is almost identical, but we need *different* animation names to trigger animation
* and styled components will just re-use the *same* name if declared animations are identical */
const switchOn = keyframes` 50% { transform: scaleX(1.3);  } `;
const switchOff = keyframes` 50% { transform: scaleX(1.31);  } `;

export const ToggleSwitch = styled.input`
  position: absolute;
  opacity: 0;

  /* switch track container */
  & + .toggle-display {
    ${gutter({ prop: 'margin', type: 'inner', position: 'right' })}
    position: relative;
    flex: 0 0 auto;
    width: ${({ trackWidth }) => trackWidth}rem;
    height: ${({ trackHeight }) => trackHeight}rem;
    cursor: pointer;
    vertical-align: middle;
  }

  /* switch track */
  & + .toggle-display:before {
    display: block;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ uncheckedColor }) => uncheckedColor};
    border-radius: 50px;
    transition: background 0.2s 0.1s ${timingFunctions('easeQuint')};
    box-shadow: ${({ uncheckedColor }) => `inset 0px 1px 1px ${rgba(uncheckedColor, 0.5)}`}
  }

  &:checked + .toggle-display:before {
    content: "";
    background-color: ${({ checkedColor }) => checkedColor};
    box-shadow: ${({ checkedColor }) => `inset 0px 1px 1px ${rgba(checkedColor, 0.5)}`}
  }

  /* switch button */
  & + .toggle-display:after {
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
    background-color: ${whiteLight};
    box-shadow: 0 2px 5px ${rgba(grey, 0.5)};
    z-index: 2;
  }

  &:checked + .toggle-display:after {
    animation: ${switchOff} 0.3s ${timingFunctions('easeOutQuint')};
    left: ${({ trackWidth, switchWidth }) => `calc(${trackWidth}rem - ${switchWidth}rem)`};
  }

  &:focus + .toggle-display:before,
  .user-is-tabbing &:focus + .toggle-display:before, {
    outline: ${blueLight} auto .2rem;
  }
`;
