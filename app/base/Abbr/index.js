import styled from 'styled-components';
import * as COLORS from 'shared/styles/colors';

const Abbr = styled.abbr`
  border-bottom: 1px dotted ${({ color }) => COLORS[color] || 'currentColor'};
  color: ${({ color }) => COLORS[color] || 'currentColor'};
  cursor: help;
`;

export default Abbr;
