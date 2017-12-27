import styled from 'styled-components';
import * as COLORS from 'common/styles/colors';

const Strike = styled.span`
  text-decoration: ${({ color }) => `line-through${color ? ` ${COLORS[color]}` : ''}`};
`;

export default Strike;
