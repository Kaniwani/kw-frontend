import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(128,128,128,.9);
  z-index: 10;
`;

export const ContentWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  z-index: 11;
  &:before {
    content: '';
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
`;

export const Content = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  margin: 0 auto;
  min-width: 200px;
  max-width: 95vw;
  box-shadow: 0 0 20px 0 rgba(0,0,0,.2);
`;

export const CloseButton = styled.button`
  position: absolute;
  appearance: none;
  padding: .5em;
  top: 0;
  right: 0;
  cursor: pointer;
`;
