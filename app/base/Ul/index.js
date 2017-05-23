import styled from 'styled-components';
import { resetList } from 'shared/styles/utils';
import { gutter } from 'shared/styles/layout';

const Ul = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
  ${({ plainList }) => plainList ? `
    ${resetList}
    ${gutter()}
  ` : `
    ${gutter({ position: 'vertical' })}
  `}
`;

export default Ul;
