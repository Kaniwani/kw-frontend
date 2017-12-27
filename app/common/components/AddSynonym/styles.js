import styled from "styled-components";
import { rgba, placeholder } from "polished";

import Button from "common/components/Button";

import { delta } from "common/styles/typography";
import { orange, greyLight, black } from "common/styles/colors";
import { gutter } from "common/styles/layout";

export const Form = styled.form`
  ${gutter()}
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: inherit;
  justify-content: inherit;
  align-content: inherit;
`;

export const Label = styled.label`
  ${gutter()}
  display: flex;
  justify-content: center;
`;

export const LabelText = styled.div`
  ${gutter()}
  ${gutter({ prop: "margin", position: "right" })}
  flex: 0 1 4.5em;
  text-align: right;
`;

export const ValidationMessage = styled.div`
  flex: 1 0 100%;
  font-size: 0.8em;
  font-style: italic;
  color: ${orange};
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
  border: 1px solid ${rgba(greyLight, 0.3)};
  border-radius: 3px;
  box-shadow: inset 0 3px 20px -8px ${rgba(black, 0.3)};
  ${placeholder({ color: greyLight })}
  &:placeholder-shown {
    ${placeholder({ color: greyLight })};
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
