import styled from 'styled-components';
import { placeholder } from 'polished';

import TextareaAutosize from "react-autosize-textarea";
import { gutter } from 'shared/styles/layout';
import { zeta } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { greyLight, grey, greyDark, black, orange, red } from 'shared/styles/colors';

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: inherit;
  align-content: inherit;
  align-items: inherit;
  width: 100%;
  min-width: 320px;
  max-width: 45em;
`;

export const TextArea = styled(TextareaAutosize)`
  ${gutter({ prop: 'margin' })}
  ${gutter({ type: 'outer', prop: 'padding' })}
  ${placeholder({ color: grey })};
  ${zeta}
  resize: none;
  border-radius: ${borderRadius};
  border: 1px solid ${greyLight};

  &:not(:focus) {
    border: 1px dashed ${greyLight};
  }
`;

export const Controls = styled.div`
  ${gutter({ position: 'vertical' })}
  display: flex;

  & > button {
    ${gutter({ prop: 'margin', position: 'horizontal' })}
  }
`;

const textColorMixin = ({ maxLength, remaining }) => {
  switch (true) {
    case remaining < maxLength / 10: return red;
    case remaining < maxLength / 8: return orange;
    case remaining < maxLength / 3: return black;
    case remaining < maxLength / 2: return greyDark;
    case remaining < maxLength / 1.5: return grey;
    default: return greyLight;
  }
};

export const Count = styled.div`
  ${gutter({ prop: 'margin', position: 'left' })}
  color: ${textColorMixin};
  align-self: center;
`;
