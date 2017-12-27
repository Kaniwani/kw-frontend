import styled from 'styled-components';

export const StyledMark = styled.mark`
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  padding: 1px 2px 2px;
  border-radius: 2px;
`;
