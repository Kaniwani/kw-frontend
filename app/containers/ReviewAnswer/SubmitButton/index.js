import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  display: block;
  position: absolute;
  height: 100%;
  transform: translateY(-50%);
  top: 50%;
  right: 0;
  cursor: pointer;
  color: currentColor;
`;

// TODO: alter Icon component, removing style prop (but still using attributes like below)
// use styled-components within Icon instead to handle passed in attributes

function SubmitButton() {
  return (
    <Button type="submit">
      <Icon
        name="ARROW_RIGHT"
        size="1.75em"
      />
    </Button>
  );
}

export default SubmitButton;
