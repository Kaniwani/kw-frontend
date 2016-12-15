import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  margin: .6em 1em .5em .6em;
  color: currentColor;
`;

function ViewSummaryLink() {
  return (
    <StyledLink to="/review/summary" title="View current review summary">
      <Icon name="SUMMARY" size="1.5em" />
    </StyledLink>
  );
}

export default ViewSummaryLink;
