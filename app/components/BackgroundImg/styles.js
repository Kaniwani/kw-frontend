import styled from 'styled-components';

export const Div = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-position: ${({ bgPosition }) => bgPosition};
  background-size: ${({ bgSize }) => bgSize};
  background-repeat: no-repeat;
  z-index: -1;
  /* If parent is a flex container */
  flex: 1 1 100%;
  align-self: stretch;
`;
