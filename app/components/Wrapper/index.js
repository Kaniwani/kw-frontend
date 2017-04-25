import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { centerByPadding, centerByMargin } from 'shared/styles/layout';

/* eslint-disable react/require-default-props */
Wrapper.propTypes = {
  fullWidth: PropTypes.bool,
  fullWidthBg: PropTypes.bool,
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};
/* eslint-enable */

Wrapper.defaultProps = {
  tag: 'div',
};

function Wrapper({ tag, children, ...props }) {
  return <StyledWrapper tag={tag} {...props}>{children}</StyledWrapper>;
}

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

export default Wrapper;
