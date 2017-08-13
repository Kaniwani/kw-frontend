import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getSrsRankName from 'utils/getSrsRankName';
import StreakIcon from 'components/StreakIcon';

import H5 from 'base/H5';

const Wrapper = styled.span`
  &:first-of-type {
    margin-right: .75rem;
  }
`;
const Text = H5.extend`
  display: inline-flex;
`;

StreakStatus.propTypes = {
  streak: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

function StreakStatus({ streak, category }) {
  return (
    <Wrapper>
      <Text>{category}: </Text>
      <StreakIcon streakName={getSrsRankName(streak)} size="1.75em" />
    </Wrapper>
  );
}


export default StreakStatus;
