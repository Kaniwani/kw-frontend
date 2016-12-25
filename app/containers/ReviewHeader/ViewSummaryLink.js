import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledLink = styled(Link)`
  display: block;
  cursor: pointer;
  color: currentColor;
  /* magic numbers to make icon alignment more visually pleasing */
  /*margin-top: 0.1em;
  margin-left: -0.1em;*/
`;

function ViewSummaryLink() {
  return (
    <StyledLink to="/review/summary" title="View current review summary">
      <Icon name="SUMMARY" size="1.5em" />
    </StyledLink>
  );
}

export default ViewSummaryLink;
