import styled from 'styled-components';

import {
  white,
  red,
  green,
  yellow,
} from 'shared/styles/colors';

const markedBgColor = ({ marked, valid, matches }) => {
  switch (true) {
    case (marked && !valid): return yellow;
    case (marked && valid && !matches): return red;
    case (marked && valid && matches): return green;
    default: return white;
  }
};

export default styled.div`
  background-color: ${(props) => markedBgColor(props)};
  color: currentColor;
`;
