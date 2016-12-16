import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  display: block;
  position: absolute;
  height: 100%;
  padding: 0;
  transform: translateY(-50%);
  top: 50%;
  right: 0;
  cursor: pointer;
  color: currentColor;
  appearance: none !important;
`;

function SubmitButton() {
  return (
    <Button type="submit" title="Submit answer">
      <Icon name="ARROW_RIGHT" size="1.75em" />
    </Button>
  );
}

export default SubmitButton;
