import styled from 'styled-components';
import { rgba, placeholder } from 'polished';

import { fluidType } from 'shared/styles/utils';
import { orange, greyLight, black } from 'shared/styles/colors';
import { gutter } from 'shared/styles/layout';

export const Label = styled.label`
  ${gutter()}
  display: flex;
  justify-content: center;
`;

export const LabelText = styled.div`
  ${gutter()}
  ${gutter({ type: 'outer', prop: 'margin', position: 'right', mod: 2 })}
  flex: 0 1 auto;
  text-align: right;
`;

export const ValidationMessage = styled.div`
  flex: 1 0 100%;
  font-size: .8em;
  font-style: italic;
  color: ${orange};
`;

export const Input = styled.input`
  display: inline-block;
  max-width: 500px;
  ${fluidType(16, 28)}
  appearance: none;
  line-height: 1.8; /* lowercase descenders are cut off otherwise */
  flex: 1 5 100px;
  vertical-align: middle;
  padding: 0 .5rem;
  border: 1px solid ${rgba(greyLight, 0.3)};
  border-radius: 3px;
  box-shadow: inset 0 3px 20px -8px ${rgba(black, 0.3)};
  ${placeholder({ greyLight })}

  &:placeholder-shown {
    ${placeholder({ color: greyLight })} /* focused input placeholder text color */
  }

  &:focus {
    outline: none;
  }

  /*hide stupid X on IE*/
  &::-ms-clear {
    display: none;
  }
`;
