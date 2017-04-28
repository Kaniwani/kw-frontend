import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { whiteLight, blue, blueDark } from 'shared/styles/colors';
import { StyledA, StyledButton } from './styles';


Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  href: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  to: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  onClick: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]),
  color: PropTypes.string,
  colorHover: PropTypes.string,
  bgColor: PropTypes.string,
  bgColorHover: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  href: '',
  to: '',
  onClick: false,
  color: whiteLight,
  colorHover: blueDark,
  bgColor: blue,
  bgColorHover: whiteLight,
};

function Button({ children, type, href, to, onClick, ...colorProps }) {
  const link = () => (
    <StyledA plainLink href={href} to={to} {...colorProps}>
      {Children.toArray(children)}
    </StyledA>
  );

  const button = () => (
    <StyledButton type={type} onClick={onClick} {...colorProps}>
      {Children.toArray(children)}
    </StyledButton>
  );

  // minor optimization by only rendering one item, if these were variables instead of functions the unreturned item would still be created/rendered internally - then thrown away
  return (href || to) ?
    link() :
    button();
}

export default Button;
