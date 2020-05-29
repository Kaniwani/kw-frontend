import styled from 'styled-components';

import TextareaAutosize from "react-autosize-textarea";
import { gutter } from 'common/styles/layout';
import { visuallyHidden } from 'common/styles/utils';
import { zeta, ffJapanese } from 'common/styles/typography';
import { borderRadius } from 'common/styles/sizing';
import { grey } from 'common/styles/colors';

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

export const TextArea = styled(TextareaAutosize)`
  ${gutter({ prop: 'margin' })}
  ${gutter({ type: 'outer', prop: 'padding' })}
  ${zeta}
  font-family: ${ffJapanese};
  line-height: 1.2;
  resize: none;
  border-radius: ${borderRadius};
  border: 1px solid ${grey[2]};
  min-width: 300px;
  max-width: 100%;


  &:not(:focus) {
    border: 1px dashed ${grey[2]};
  }
`;
