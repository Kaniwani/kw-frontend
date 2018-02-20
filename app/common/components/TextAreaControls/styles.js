import styled from 'styled-components';

import { gutter } from 'common/styles/layout';
import { grey, black, orange, red } from 'common/styles/colors';

export const Controls = styled.div`
  ${gutter({ position: 'vertical' })}
  display: flex;

  & > button {
    ${gutter({ prop: 'margin', position: 'horizontal' })}
  }
`;

const textColorMixin = ({ maxLength, remaining }) => {
  switch (true) {
    case remaining < maxLength / 10: return red[5];
    case remaining < maxLength / 8: return orange[5];
    case remaining < maxLength / 3: return black[5];
    case remaining < maxLength / 2: return grey[8];
    case remaining < maxLength / 1.5: return grey[5];
    default: return grey[2];
  }
};

export const Count = styled.div`
  ${gutter({ prop: 'margin', position: 'left' })}
  color: ${textColorMixin};
  align-self: center;
`;
