import styled from 'styled-components';

const BackgroundImg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1 1 100%;
  align-self: stretch;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  z-index: -1;
`;

export default BackgroundImg;
