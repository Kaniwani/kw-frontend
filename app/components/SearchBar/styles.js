import styled, { css } from "styled-components";
import { transparentize, placeholder } from "polished";

import { gutter } from "shared/styles/layout";
import { visuallyHidden } from "shared/styles/utils";
import { greyLight, blueLight, yellow } from "shared/styles/colors";
import { fastEaseQuad } from 'shared/styles/animation';

import IconButton from "components/IconButton";

const SIZE = 2.25;
const ICON_SIZE = 1.25;

export const Form = styled.form`
  ${gutter()}
  display: flex;
  width: 100%;
  max-width: 600px;
`;

export const Label = styled.label`
  ${visuallyHidden};
`;

export const SubmitButton = styled(IconButton).attrs({
  size: `${ICON_SIZE}em`,
})`
  background-color: ${({ bgColor }) => bgColor};
  margin: 0 !important;
  padding-top: ${ICON_SIZE / 2.2}em;
  padding-bottom: ${ICON_SIZE / 2.2}em;
  /* shift icon to the left a little */
  padding-left: ${ICON_SIZE / 3}em;
  padding-right: ${ICON_SIZE / 1.75}em;
  border-radius: 0 ${ICON_SIZE}em ${ICON_SIZE}em 0;
`;

export const InputWrapper = styled.div`
  width: 100%;
  font-size: 1em;
  line-height: 1.75;
  border: 1px solid ${transparentize(0.1, blueLight)};
  border-right-width: 0;
  border-radius: ${SIZE}em 0 0 ${SIZE}em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all ${fastEaseQuad};

  ${({ invalid }) => invalid && css`
    border-color: ${yellow};
  `}

  & > input {
    margin-top: ${SIZE / 3}em;
    margin-bottom: ${SIZE / 3}em;
    margin-left: ${SIZE / 2.25}em;
    padding-right: ${SIZE / 1.5}em;
    appearance: none !important;
    box-shadow: none !important;
    border: none !important;
    width: 100%;
    ${placeholder({ color: transparentize(0.1, greyLight) })}
    &:focus {
      ${placeholder({ color: transparentize(0.5, greyLight) })}
      outline: none;
    }
  }
`;
