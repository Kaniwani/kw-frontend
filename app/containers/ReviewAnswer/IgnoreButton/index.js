import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  display: block;
  position: absolute;
  height: 100%;
  transform: translateY(-50%);
  top: 50%;
  right: 1.75em;
  cursor: pointer;
  color: currentColor;
  opacity: .5;
  transition: opacity .3s ease-out;
  &:hover {
    opacity: 1;
  }
`;

// TODO: alter Icon component, removing style prop (but still using attributes like below)
// use styled-components within Icon instead to handle passed in attributes

function IgnoreButton({ onIgnoreClick, marked, valid }) {
  if (!valid && !marked) return null;
  return (
    <Button type="button" onClick={onIgnoreClick}>
      <Icon
        name="CLOSE"
        size="1.3em"
      />
    </Button>
  );
}

IgnoreButton.propTypes = {
  valid: PropTypes.bool,
  marked: PropTypes.bool,
  onIgnoreClick: PropTypes.func.isRequired,
};

export default IgnoreButton;
