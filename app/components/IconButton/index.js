import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { resetButton } from 'shared/styles/utils';
import { transitionAllEase } from 'shared/styles/animation';
import Icon from 'components/Icon';

const Button = styled.button`
  ${resetButton}
  ${transitionAllEase}
  cursor: pointer;
  opacity: .7;

  &:active,
  &:focus,
  &:hover {
    opacity: .9;
    outline: none;
  }

  &:active {
    opacity: 1;
  }
`;

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
};

IconButton.defaultProps = {
  type: 'button',
  color: 'currentColor',
  bgColor: 'rgba(0,0,0,0)',
  size: '1em',
};

function IconButton({ name, title, color, size, type, handleClick, ...props }) {
  return (
    <Button type={type} title={title} onClick={handleClick} {...props} >
      <Icon
        name={name}
        display="block"
        size={size}
        color={color}
      />
    </Button>
  );
}


export default IconButton;
