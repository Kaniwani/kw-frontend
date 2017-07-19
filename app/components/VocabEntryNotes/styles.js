import styled from 'styled-components';
import { placeholder } from 'polished';
import { Field } from 'redux-form';

import { gutter } from 'shared/styles/layout';
import { zeta } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { greyLight, grey, black, orange, red } from 'shared/styles/colors';

export const Form = styled.form`
  ${gutter()}
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-width: 800px;
`;

export const TextArea = styled(Field)`
  ${gutter({ type: 'outer', prop: 'padding' })}
  ${gutter({ prop: 'margin', position: 'vertical' })}
  ${placeholder({ color: grey })};
  ${zeta}

  resize: none;
  border-radius: ${borderRadius};

  &:not(:focus) {
    border: 1px dashed ${greyLight};
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  & > button {
    ${gutter({ prop: 'margin', position: 'horizontal' })}
  }
`;

const textColorMixin = ({ count }) => {
  switch (true) {
    case count < 25: return red;
    case count < 75: return orange;
    case count < 100: return black;
    default: return greyLight;
  }
};

export const Count = styled.div`
  ${gutter({ type: 'outer', prop: 'margin', position: 'right' })}
  color: ${textColorMixin};
  align-self: center;
`;
