import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Button = styled.button`
  display: block;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 0;
  cursor: pointer;
`;

// TODO: alter Icon component, remove style prop and add use styled-components instead
function SubmitButton({ handleClick }) {
  return (
    <Button type="button" onClick={handleClick}>
      <Icon
        name="ARROW_RIGHT"
        size={50}
      />
    </Button>
  );
}

SubmitButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
};

export default SubmitButton;
