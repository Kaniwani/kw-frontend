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

const Section = ({ children, ...props }) => (
  <StyledSection {...props}>
    {children}
  </StyledSection>
);

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  fullWidth: PropTypes.bool,
  fullWidthBg: PropTypes.bool,
};

export default Section;
