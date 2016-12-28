import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledLink = styled(Link)`
  display: block;
  cursor: pointer;
  color: currentColor;
  /* svg doesn't reach viewbox edges, let's make the left alignment with gutter more visually pleasing */
  transform: translateX(-0.1em)
`;

function ViewSummaryLink() {
  return (
    <StyledLink to="/review/summary" title="View current review summary">
      <Icon name="SUMMARY" size="1.5em" />
    </StyledLink>
  );
}

export default ViewSummaryLink;
