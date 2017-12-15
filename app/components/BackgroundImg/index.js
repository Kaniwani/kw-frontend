import styled from "styled-components";

/**
 * Requires a parent with position: relative, and a valid height or min-height
 * This component renders a div with position: absolute, height/width 100%
 * expecting to fill its parent's container.
 * Easy solution is using:  <PageWrapper fullWidthBg />
 */

const BackgroundImg = styled.div`
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

BackgroundImg.defaultProps = {
  bgPosition: "center center",
  bgSize: "cover",
};

export default BackgroundImg;
