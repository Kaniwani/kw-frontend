import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledLink = styled(Link)`
  display: block;
  cursor: pointer;
  color: currentColor;
  /* magic number to make icon alignment more visually pleasing */
  transform: translateX(-.1rem);
`;

function ViewSummaryLink() {
  return (
    <StyledLink to="/review/summary" title="View current review summary">
      <Icon name="SUMMARY" size="1.5em" />
    </StyledLink>
  );
}

export default ViewSummaryLink;
