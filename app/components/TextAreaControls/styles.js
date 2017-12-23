import styled from 'styled-components';

import { gutter } from 'shared/styles/layout';
import { greyLight, grey, greyDark, black, orange, red } from 'shared/styles/colors';

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
