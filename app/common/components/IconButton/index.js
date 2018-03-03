import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { gutter } from 'common/styles/layout';

import Aux from 'common/components/Aux';
import Button from 'common/components/Button';
import Icon from 'common/components/Icon';

// prettier-ignore
export const Text = styled.span`
  ${gutter({ position: 'left' })}
  ${gutter({ position: 'right', mod: 2 })}
`;

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  inline: PropTypes.bool,
  plainButton: PropTypes.bool,
  text: PropTypes.any,
  isSubmitting: PropTypes.bool,
};

IconButton.defaultProps = {
  type: 'button',
  plainButton: true,
  color: 'currentColor',
  size: '1.5em',
  disabled: false,
  inline: false,
  text: '',
  isSubmitting: false,
  onClick: (event) => event /* passthrough, for submit buttons in forms with onSubmit */,
};

function IconButton({ name, text, title, color, size, inline, isSubmitting, ...props }) {
  const RenderedText = text ? <Text>{text}</Text> : null;
  const RenderedIcon = (
    <Icon
      isRotating={isSubmitting}
      name={isSubmitting ? 'SYNC' : name}
      inline={inline}
      size={size}
      color={color}
    />
  );

  return (
    <Button {...props} title={title} aria-label={title} color={color}>
      <Aux>
        {RenderedText}
        {RenderedIcon}
      </Aux>
    </Button>
  );
}

export default IconButton;
