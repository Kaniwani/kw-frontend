import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  &[type="submit"] {
    display: block;
    position: absolute;
    height: auto;
    align-self: center;
    transform: translateY(-50%);
    top: 50%;
    right: 0;
    cursor: pointer;
    color: currentColor;
    background-color: inherit;
    appearance: none;
    padding: 0;
    opacity: .9;
    transition: opacity .3s ease-out;
    &:hover {
      opacity: 1;
    }
  }
`;

function SubmitButton() {
  return (
    <Button type="submit" title="Submit answer">
      <Icon name="ARROW_RIGHT" size="1.75em" />
    </Button>
  );
}

export default SubmitButton;
