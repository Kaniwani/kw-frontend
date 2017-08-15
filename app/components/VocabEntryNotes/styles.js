import styled from 'styled-components';
import { placeholder } from 'polished';
import { Field } from 'redux-form';

import { gutter } from 'shared/styles/layout';
import { zeta } from 'shared/styles/typography';
import { borderRadius } from 'shared/styles/sizing';
import { greyLight, grey, black, orange, red } from 'shared/styles/colors';

export const Form = styled.form`
  ${gutter({ position: 'vertical' })}
  ${gutter({ position: 'horizontal', mod: 2 })}
  display: flex;
  flex-flow: column nowrap;
  justify-content: inherit;
  align-content: inherit;
  align-items: inherit;
  width: 100%;
  min-width: 320px;
  max-width: 75vw;
`;

export const TextArea = styled(Field)`
  ${gutter({ type: 'outer', prop: 'padding' })}
  ${gutter({ type: 'outer', prop: 'margin' })}
  ${placeholder({ color: grey })};
  ${zeta}
  width: 100%;
  max-width: 100%;
  resize: none;
  border-radius: ${borderRadius};

  &:not(:focus) {
    border: 1px dashed ${greyLight};
  }
`;

export const Controls = styled.div`
  ${gutter({ prop: 'margin', position: 'vertical' })}
  ${gutter({ type: 'outer', position: 'horizontal', prop: 'padding' })}
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
