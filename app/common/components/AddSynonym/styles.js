import styled from "styled-components";
import { rgba } from "polished";

import Button from "common/components/Button";

import { delta } from "common/styles/typography";
import { orange, grey, black } from "common/styles/colors";
import { gutter } from "common/styles/layout";

export const Form = styled.form`
  ${gutter()}
  display: inline-flex;
  flex-flow: column nowrap;
`;

export const Label = styled.label`
  ${gutter()}
  display: flex;
  justify-content: center;
`;

export const LabelText = styled.div`
  ${gutter()}
`;

export const ValidationMessage = styled.div`
  flex: 1 0 100%;
  font-size: 0.8em;
  font-style: italic;
  color: ${orange[5]};
`;

export const Input = styled.input`
  ${gutter({ prop: "margin", position: "right" })}
  ${delta}
  display: inline-flex;
  appearance: none;
  line-height: 1.8; /* lowercase descenders are cut off otherwise */
  flex: 0 1 100px;
  vertical-align: middle;
  padding: 0 0.5rem;
  border: 1px solid ${rgba(grey[2], 0.3)};
  border-radius: 3px;
  box-shadow: inset 0 3px 20px -8px ${rgba(black[5], 0.3)};

  &&&::placeholder, &&&:placeholder-shown {
    color: ${grey[2]};
  }

  &:focus {
    outline: none;
  }

  /*hide unnecessary X on IE*/
  &::-ms-clear {
    display: none;
  }
`;

export const SubmitButton = styled(Button)`
  ${gutter({ type: "outer", prop: "margin" })}
  align-self: center;
`;
