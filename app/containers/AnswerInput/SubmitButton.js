import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  & { /* higher specifity to overwrite sanitize.css */
    opacity: .9;
  }
`;

function SubmitButton({ handleClick }) {
  return (
    <Button type="submit" title="Submit answer" onClick={handleClick}>
      <Icon name="ARROW_RIGHT" size="1.75em" inline={false} />
    </Button>
  );
}

SubmitButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SubmitButton;
