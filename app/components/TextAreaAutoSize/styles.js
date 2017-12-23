import styled from 'styled-components';
import { placeholder } from 'polished';

import TextareaAutosize from "react-autosize-textarea";
import { gutter } from 'shared/styles/layout';
import { visuallyHidden } from 'shared/styles/utils';
import { zeta } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { greyLight, grey } from 'shared/styles/colors';

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

  ${({ isHidden }) => isHidden && visuallyHidden}
`;
//
// export const Form = styled.form`
//   display: flex;
//   flex-flow: column nowrap;
//   justify-content: inherit;
//   align-content: inherit;
//   align-items: inherit;
//   width: 100%;
//   min-width: 320px;
//   max-width: 45em;
// `;

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
