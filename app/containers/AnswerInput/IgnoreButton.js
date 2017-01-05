import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  & { /* higher specifity to overwrite sanitize.css */
    opacity: .5;
  }
`;

function IgnoreButton({ onIgnoreClick }) {
  return (
    <Button type="button" title="Ignore answer" onClick={onIgnoreClick}>
      <Icon name="CLOSE" size="1.4em" />
    </Button>
  );
}

IgnoreButton.propTypes = {
  onIgnoreClick: PropTypes.func.isRequired,
};

export default IgnoreButton;
