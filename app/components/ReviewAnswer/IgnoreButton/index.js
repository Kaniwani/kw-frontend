import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  display: block;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 4em;
  cursor: pointer;
`;

// TODO: alter Icon component, remove style prop and add use styled-components instead

function IgnoreButton() {
  return (
    <Button type="button">
      <Icon
        name="CLOSE"
        size={50}
      />
    </Button>
  );
}

export default IgnoreButton;
