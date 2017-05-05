import styled from 'styled-components';
import { transparentize, placeholder, timingFunctions } from 'polished';

import Ul from 'base/Ul';

import { whiteLight, whiteDark, greyLight, blackLight, red, orange, purple } from 'shared/styles/colors';
import { fastEaseQuad } from 'shared/styles/animation';
import { delta } from 'shared/styles/typography';
import { resetButton, visuallyHidden } from 'shared/styles/utils';

export const Wrapper = styled.div`
  background-color: ${red};
  height: 100vh;
  transition: background-color ${fastEaseQuad};
  ${({ loginSelected }) => loginSelected && `
    background-color: ${orange};
  `}
  ${({ registerSelected }) => registerSelected && `
    background-color: ${red};
  `}
  ${({ resetSelected }) => resetSelected && `
    background-color: ${purple};
  `}
`;

export const Form = styled.form`
  display: flex;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 2rem;
`;

export const SelectList = styled(Ul)`
  display: grid;
  width: 320px;
  grid-template-columns: 1fr 1fr 1fr;
  position: absolute;
  margin-bottom: .5rem;
  top: 10px;
`;

export const SelectListItem = styled.li`
  text-align: center;
  color: ${whiteLight};
  cursor: pointer;
  font-weight: 500;
  text-transform: capitalize;
  opacity: .6;
  ${({ isActive }) => isActive && `
    opacity: 1;
  `}
`;

export const Label = styled.label`
  ${visuallyHidden}
`;

export const InputField = styled.input`
  ${delta}
  display: inline-flex;
  border-radius: 10px;
  height: 2.5rem;
  border: none;
  width: 320px;
  margin: .4rem 0;
  background-color: ${whiteLight};
  text-align: center;
  padding: .2rem .3rem;
  transition: all ${fastEaseQuad};
  ${placeholder({ color: greyLight })} /* focused input placeholder text color */

  &:focus {
    ${placeholder({ color: whiteDark })} /* focused input placeholder text color */
    outline: none;
  }

  /*hide stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
  ${({ isVisible }) => !isVisible && `
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
  `}
`;

export const SelectedPointer = styled.span`
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid ${whiteLight};
  height: 0;
  position: relative;
  top: .6rem;
  width: 0;
  transition: transform 100ms ${timingFunctions('easeOutQuad')};
  ${({ registerSelected }) => registerSelected && 'transform: translateX(-105px);'};
  ${({ resetSelected }) => resetSelected && 'transform: translateX(105px);'};
`;

export const SubmitButton = styled.button`
  ${resetButton}
  ${delta}
  margin: .5rem 0;
  padding: .2rem .3rem;
  width: 75%;
  height: 2.5rem;
  color: ${whiteLight};
  background-color: ${transparentize(0.8, whiteLight)};
  border-radius: 10px;
  transition: all ${fastEaseQuad};
  cursor: pointer;
  font-weight: 500;
  text-transform: capitalize;

  &:hover,
  &:focus,
  &:active {
    background-color: ${transparentize(0.9, blackLight)};
    outline: none;
    width: 100%;
  }
  &:active {
    background-color: ${transparentize(0.8, blackLight)};
  }
`;
