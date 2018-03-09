import styled, { css } from 'styled-components';
import { transparentize, darken, placeholder, timingFunctions } from 'polished';

import { white, grey, purple, red, transparent } from 'common/styles/colors';
import { fastEaseQuad } from 'common/styles/animation';
import { delta, gamma } from 'common/styles/typography';
import { gutter } from 'common/styles/layout';
import { resetList, resetButton, visuallyHidden } from 'common/styles/utils';
import { bgImgColor } from 'pages/LandingPage/styles';

import IconLink from 'common/components/IconLink';

const maxWidth = '23rem';

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
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
  display: flex;
  justify-content: space-between;
  max-width: ${maxWidth};
  font-size: .9em;
  width: 100%;
  margin-bottom: -.3rem;
  & li {
    flex: 1 1 33%;
  }
`;

export const SelectListItem = styled.li`
  width: 100%;
  text-align: center;
  color: ${grey[8]};
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  opacity: .5;
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
  ${gutter({ mod: 2 })}
  display: flex;
  flex: 1 0 2.5rem;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: ${white[2]};
  ${placeholder({
    color: grey[2],
    opacity: 1, // firefox sets lower opacity >_<
  })}

  &:focus {
    ${placeholder({ color: transparentize(0.5, grey[2]) })}
    outline: none;
  }

  /* override chrome autocomplete yellow bg*/
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px ${white[2]} inset;
  }

  /*override stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
`;

export const ApiLink = styled(IconLink)`
  position: absolute;
  top: .5rem;
  right: .25em;
  background-color: ${transparent};
  opacity: .65;
  transform: scale(1);

  &:active {
    opacity: 1;
    transform: scale(.9);
  }
`;

export const ValidationMessage = styled.div`
  ${gutter()}
  ${gutter({ prop: 'margin', position: 'top' })}
  text-align: center;
  flex: 1 0 auto;
  font-style: italic;
  color: ${red[5]};
  background-color: ${bgImgColor};
  border-radius: 5px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  max-width: ${maxWidth};
  max-height: 5rem;
  width: 100%;
  border: none;
  margin: .25rem auto;
  transition: all 300ms ${timingFunctions('easeOutSine')};

  &[aria-hidden="true"] {
    transition: all 150ms ${timingFunctions('easeOutSine')};
    max-height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;

    ${InputField},
    ${ValidationMessage} {
      border: none;
    }

    ${ApiLink} {
      pointer-events: none;
      opacity: 0;
      transform: translateY(-33%) scale(0);
    }
  }
`;

export const SelectedPointer = styled.span`
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1rem solid ${white[2]};
  height: 0;
  position: relative;
  top: .3rem;
  width: 0;
  transition: transform 150ms ${timingFunctions('easeOutSine')};
  ${({ position }) => {
    if (position === 'left') return 'transform: translateX(-7.8rem);';
    if (position === 'right') return 'transform: translateX(7.6rem);';
    return 'transform: translateX(0px);';
  }}
`;

export const SubmitButton = styled.button`
  ${resetButton}
  ${gamma}
  margin: .5rem 0;
  padding: .2rem .3rem;
  width: 12rem;
  height: 2.5rem;
  border-radius: 10px;
  transition: all ${fastEaseQuad};
  cursor: pointer;
  font-weight: 700;
  background-color: ${white[2]};
  color: ${purple[5]};
  align-self: center;

  &:hover,
  &:focus,
  &:active {
    color: ${white[2]};
    background-color: ${purple[5]};
    outline: none;
  }
  &:active {
    background-color: ${transparentize(0.1, darken(0.1, purple[5]))};
  }
`;
