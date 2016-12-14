import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  margin: .5em 1em .5em .35em;
  color: currentColor;
`;

function ViewSummaryLink() {
  return (
    <StyledLink to="/review/summary" title="Exit quiz and view summary">
      <Icon name="ASSIGNMENT" size="1.25em" />
    </StyledLink>
  );
}

export default ViewSummaryLink;
