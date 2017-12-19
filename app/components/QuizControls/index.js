import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { resetButton } from 'shared/styles/utils';
import { transparent, whiteLight, greyLight, greyDark } from 'shared/styles/colors';
import { micro } from 'shared/styles/typography';
import { gutter } from 'shared/styles/layout';
import { shadowBox } from 'shared/styles/shadows';

// prettier-ignore
const QuizControls = styled.div`
  ${gutter({ position: 'top', mod: 0.25 })}
  ${gutter({ position: 'horizontal', mod: 0.5 })}
  ${gutter({ position: 'bottom' })}
  display: flex;
  z-index: 2;
  list-style: none;
  justify-content: center;
  background-color: ${transparent};
  width: 100%;
`;

// prettier-ignore
export const ControlButton = styled.button`
  ${resetButton}
  ${micro}
  ${shadowBox}
  ${gutter({ mod: 0.5 })}
  ${gutter({ prop: 'margin', position: 'horizontal', mod: 0.5 })}
  position: relative;
  text-align: center;
  text-transform: uppercase;
  flex: 0 1 300px;
  background-color: ${whiteLight};
  color: ${greyLight};

  &:not(:disabled):hover,
  &:focus {
    color: ${darken(0.1, greyDark)};
    background-color: ${lighten(1, whiteLight)};
  }

  &:disabled {
    opacity: .7;
    cursor: not-allowed;
  }
`;

export default QuizControls;
