import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import Icon from 'components/Icon';

const StyledLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
  color: currentColor;
`;

function ViewSummaryLink() {
  return (
    <StyledLink to="/review/summary">
      <Icon
        name="SUMMARY"
        size="1.5em"
        tooltip={{ text: 'View current review summary', position: 'right', showDelay: 250 }}
      />
    </StyledLink>
  );
}

export default ViewSummaryLink;
