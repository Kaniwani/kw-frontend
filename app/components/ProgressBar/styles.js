import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 500ms ease-in-out;
  visibility: ${({ hidden }) => hidden ? 'hidden' : 'visible'};
  opacity: ${({ hidden }) => hidden ? '0' : '1'};
  z-index: ${({ hidden }) => hidden ? '-10' : '9999'};
`;


export const Percent = styled.div`
  height: 2px;
  background: #29D;
  transition: all 300ms ease;
`;
