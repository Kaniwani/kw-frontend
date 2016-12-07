import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  display: block;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 1.75em;
  cursor: pointer;
  color: currentColor;
`;

// TODO: alter Icon component, removing style prop (but still using attributes like below)
// use styled-components within Icon instead to handle passed in attributes

function IgnoreButton({ onIgnoreClick }) {
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
  onIgnoreClick: PropTypes.func.isRequired,
};

export default IgnoreButton;
