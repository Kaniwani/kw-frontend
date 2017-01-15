import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  & { /* higher specifity to overwrite sanitize.css */
    opacity: .5;
  }
`;

function IgnoreButton({ handleClick }) {
  return (
    <Button type="button" title="Ignore answer" onClick={handleClick}>
      <Icon name="CLOSE" size="1.4em" inline={false} />
    </Button>
  );
}

IgnoreButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default IgnoreButton;
