import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { tapTarget } from 'shared/styles/utils';

const Button = styled.button`
  display: block;
  position: absolute;
  height: auto;
  align-self: center;
  transform: translateY(-50%);
  top: 50%;
  right: 1.85em;
  cursor: pointer;
  color: currentColor;
  ${tapTarget({ x: 0, y: '.4rem' })}
  opacity: .5;
  transition: opacity .3s ease-out;
  &:hover {
    opacity: 1;
  }
`;

function IgnoreButton({ onIgnoreClick }) {
  return (
    <Button type="button" title="Ignore answer" onClick={onIgnoreClick}>
      <Icon name="CLOSE" size="1.3em" />
    </Button>
  );
}

IgnoreButton.propTypes = {
  onIgnoreClick: PropTypes.func.isRequired,
};

export default IgnoreButton;
