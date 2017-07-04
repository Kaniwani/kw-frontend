import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { SummaryLink } from './styles';

ViewSummaryLink.propTypes = {
  category: PropTypes.string.isRequired,
};

function ViewSummaryLink({ category }) {
  return (
    <SummaryLink to={`/${category}`} title="View session summary">
      <Icon name="SUMMARY" size="1.5em" />
    </SummaryLink>
  );
}

export default ViewSummaryLink;
