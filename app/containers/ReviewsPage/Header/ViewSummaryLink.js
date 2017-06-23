import React from 'react';
import Icon from 'components/Icon';
import { SummaryLink } from './styles';

function ViewSummaryLink() {
  return (
    <SummaryLink to="/reviews/summary" title="View current review summary">
      <Icon name="SUMMARY" size="1.5em" />
    </SummaryLink>
  );
}

export default ViewSummaryLink;
