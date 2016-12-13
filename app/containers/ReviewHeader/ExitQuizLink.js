import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  margin-top: .4em;
  color: currentColor;
`;

function ExitQuizLink() {
  return (
    <StyledLink to="/review/summary" title="Exit quiz and view summary">
      <Icon name="BACK" size="2rem" />
    </StyledLink>
  );
}

export default ExitQuizLink;
