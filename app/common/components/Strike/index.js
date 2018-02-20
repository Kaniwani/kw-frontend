import styled from 'styled-components';

const Strike = styled.span`
  text-decoration: ${({ color }) => `line-through${color ? ` ${color}` : ''}`};
`;

export default Strike;
