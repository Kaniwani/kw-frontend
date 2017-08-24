import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getSrsRankName from 'utils/getSrsRankName';
import StreakIcon from 'components/StreakIcon';

import { gutter } from 'shared/styles/layout';
import H5 from 'base/H5';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  ${gutter({ type: 'outer', position: 'right' })}
`;
const Text = H5.extend`
`;

StreakStatus.propTypes = {
  streak: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

function StreakStatus({ streak, category }) {
  return (
    <Wrapper>
      <Text>{category}: </Text>
      <StreakIcon streakName={getSrsRankName(streak)} />
    </Wrapper>
  );
}


export default StreakStatus;
