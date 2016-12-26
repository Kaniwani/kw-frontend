import React, { PropTypes } from 'react';
import styled from 'styled-components';
import {
  centerByPadding,
  centerByMargin,
} from 'shared/styles/layout';

const StyledSection = styled.section`
  ${(props) => {
    if (props.fullWidth) {
      return 'width: 100%;';
    }
    if (props.fullWidthBg) {
      return `
        position: relative;
        ${centerByPadding}
      `;
    }
    return centerByMargin;
  }}
`;

const BackgroundImg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  align-self: stretch;
  height: 100%;
`;

const Section = ({ children, backgroundImg }) => (
  <StyledSection>
    {children}
    {backgroundImg && <BackgroundImg img={backgroundImg} />}
  </StyledSection>
);

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  backgroundImg: PropTypes.string,
};

export default Section;
