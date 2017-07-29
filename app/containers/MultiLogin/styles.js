import styled, { css } from 'styled-components';
import { transparentize, darken, placeholder, timingFunctions } from 'polished';

import { whiteLight, greyLight, greyDark, red, transparent } from 'shared/styles/colors';
import { fastEaseQuad } from 'shared/styles/animation';
import { delta, ffHeading } from 'shared/styles/typography';
import { resetList, resetButton, visuallyHidden } from 'shared/styles/utils';

import IconLink from 'components/IconLink';

const maxWidth = '20rem';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 2;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: .25rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: ${maxWidth};
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: ${maxWidth};
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const SelectList = styled.ul`
  ${resetList}
  ${''/* FIXME: flex fallback + supports */}
  display: grid;
  max-width: ${maxWidth};
  font-size: .9em;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: -.3rem;
`;

export const SelectListItem = styled.button`
  ${resetButton}
  width: 100%;
  text-align: center;
  color: ${greyDark};
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  opacity: .6;
  padding-top: .5rem;
  padding-bottom: .5rem;

  &:hover,
  &:focus {
    opacity: .8;
  }

  ${({ isActive }) => isActive && css`
    cursor: default;
    opacity: 1;

    &:hover,
    &:focus {
      opacity: 1;
    }
  `}
`;

export const Label = styled.label`
  ${visuallyHidden}
`;

export const InputField = styled.input`
  ${delta}
  display: flex;
  flex: 1 1 100%;
  text-align: center;
  padding: .2rem .3rem;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: ${whiteLight};
  ${placeholder({ color: greyLight })}

  &:focus {
    ${placeholder({ color: transparentize(0.5, greyLight) })}
    outline: none;
  }

  /* override chrome autocomplete yellow bg*/
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px ${whiteLight} inset;
  }

  /*override stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: ${maxWidth};
  height: 2.5rem;
  width: 100%;
  border: none;
  margin: .25rem auto;
  transition: all ${fastEaseQuad};

  &[aria-hidden="true"] {
    height: 0;
    margin: 0;
    padding: 0;
  }

  &[aria-hidden="true"] ${InputField} {
    height: 0;
    margin: 0;
    border: none;
    padding: 0;
  }
`;

export const ValidationMessage = styled.div`
  padding: .2rem;
  text-align: center;
  flex: 1 0 100%;
  font-style: italic;
  color: ${red};
`;

export const SelectedPointer = styled.span`
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid ${whiteLight};
  height: 0;
  position: relative;
  top: .3rem;
  width: 0;
  transition: transform 150ms ${timingFunctions('easeOutSine')};
  ${({ position }) => {
    if (position === 'left') return 'transform: translateX(-6.5rem);';
    if (position === 'right') return 'transform: translateX(6.5rem);';
    return 'transform: translateX(0px);';
  }}
`;

export const SubmitButton = styled.button`
  ${resetButton}
  ${delta}
  font-family: ${ffHeading};
  margin: .5rem 0;
  padding: .2rem .3rem;
  width: 12rem;
  height: 2.5rem;
  border-radius: 10px;
  transition: all ${fastEaseQuad};
  cursor: pointer;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${whiteLight};
  color: ${red};

  &:hover,
  &:focus,
  &:active {
    color: ${whiteLight};
    background-color: ${red};
    outline: none;
  }
  &:active {
    background-color: ${transparentize(0.1, darken(0.1, red))};
  }
`;

export const ApiLink = styled(IconLink)`
  position: absolute;
  right: .25em;
  top: 50%;
  background-color: ${transparent};
  opacity: .65;
  transform: translateY(-50%) scale(1);

  &:active {
    opacity: 1;
    transform: translateY(-50%) scale(.9);
  }
`;

export const ApiInput = styled.div`
  position: relative;
  max-width: ${maxWidth};
  width: 100%;
  border: none;
  border-radius: 10px;

  ${({ isHidden }) => isHidden && css`
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
    pointer-events: none;
    visibility: hidden;
    & ${ApiLink} {
      height: 0;
      visibility: hidden;
      opacity: 0;
      transform: scale(0);
    }
  `}
`;
