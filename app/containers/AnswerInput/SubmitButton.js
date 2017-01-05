import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  & { /* higher specifity to overwrite sanitize.css */
    opacity: .9;
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
