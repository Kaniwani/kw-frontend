import React, { PropTypes } from 'react';
import styled, { css } from 'styled-components';

import {
  centerByPadding,
  centerByMargin,
} from 'shared/styles/layout';

const wrapperStyle = css`
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

/* eslint-disable no-unused-vars */
const StyledWrapper = styled(({ tag, children, fullWidth, fullWidthBg, ...props }) => React.createElement(
  tag,
  props,
  children,
))`${wrapperStyle}`;
/* eslint-enable */

const Wrapper = ({ tag, children, ...props }) =>
  <StyledWrapper tag={tag} {...props}>{children}</StyledWrapper>;


Wrapper.propTypes = {
  fullWidth: PropTypes.bool,
  fullWidthBg: PropTypes.bool,
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

Wrapper.defaultProps = {
  tag: 'div',
};

export default Wrapper;
