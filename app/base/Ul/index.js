import styled from 'styled-components';
import { resetList } from 'shared/styles/utils';
import { elementGutter, elementGutterVertical } from 'shared/styles/layout';

const Ul = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
  ${({ plainList }) => plainList ? `
    ${resetList}
    ${elementGutter}
  ` : `
    ${elementGutterVertical} /* add top/bottom padding but keep regular ul left padding/discs */
  `}
`;

export default Ul;
