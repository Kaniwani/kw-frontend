import styled, { css } from 'styled-components';
import { transparentize, placeholder } from 'polished';

import { gutter } from 'shared/styles/layout';
import { greyLight, blueLight } from 'shared/styles/colors';
import { spin } from 'shared/styles/animation';

import IconButton from 'components/IconButton';

import { COMPONENT_HEIGHT_EM } from './constants';

const inputHeight = COMPONENT_HEIGHT_EM;
const iconHeight = COMPONENT_HEIGHT_EM / 2; // should match <SubmitButton size="24px" /> in `../index`

export const Form = styled.form`
  ${gutter()}
  display: flex;
  width: 100%;
  max-width: 600px;
`;

export const SubmitButton = styled(IconButton)`
  background-color: ${blueLight};
  padding-top: ${(inputHeight - iconHeight) / 2}em;
  padding-bottom: ${(inputHeight - iconHeight) / 2}em;
  /* shift icon to the left a little */
  padding-left: ${((inputHeight - iconHeight) - 0.2) / 2}em;
  padding-right: ${((inputHeight - iconHeight) + 0.2) / 2}em;
  border-radius: 0 ${inputHeight}em ${inputHeight}em 0;

  /* override IconButton scaling and opacity */
  &:active:not(:disabled) {
    transform: scale(1);
    opacity: 1;
  }

  ${({ isSubmitting }) => isSubmitting && css`
    svg {
      animation: ${spin} 1s linear infinite;
    }
  `}
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 1em;
  line-height: 1.75;
  border: 1px solid ${transparentize(0.1, blueLight)};
  border-right-width: 0;
  border-radius: ${inputHeight}em 0 0 ${inputHeight}em;
  padding-left: ${inputHeight / 2.25}em;
  padding-right: ${inputHeight / 2.25}em;

  ${placeholder({ color: transparentize(0.1, greyLight) })}

  &:focus {
    ${placeholder({ color: transparentize(0.5, greyLight) })} /* focused input placeholder text color */
    outline: none;
  }

  /*hide stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
`;
