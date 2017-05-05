import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import A from 'base/A';
import Icon from 'components/Icon';
import { fastEaseQuad } from 'shared/styles/animation';

const StyledAnchor = styled(A)`
  transition: all ${fastEaseQuad}, transform 100ms linear;
  cursor: pointer;
  opacity: .7;

  &:focus,
  &:hover {
    opacity: .9;
    outline: none;
  }

  &:active {
    opacity: 1;
    transform: scale(.9);
  }
`;

IconLink.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

IconLink.defaultProps = {
  color: 'currentColor',
  size: '1em',
  href: '',
  to: '',
};

function IconLink({ name, title, color, size, href, to, ...props }) {
  return (
    <StyledAnchor title={title} href={href} to={to} {...props} >
      <Icon
        display="block"
        name={name}
        color={color}
        size={size}
      />
    </StyledAnchor>
  );
}


export default IconLink;
