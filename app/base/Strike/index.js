import styled from 'styled-components';

const Strike = styled.span`
  text-decoration: ${`line-through ${({ color }) => color && color}`};
`;

export default Strike;
