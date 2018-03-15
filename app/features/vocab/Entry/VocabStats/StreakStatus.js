import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getSrsRankName from 'common/utils/getSrsRankName';
import StreakIcon from 'common/components/StreakIcon';
import { SRS_COLORS } from 'common/styles/colors';
import { gutter } from 'common/styles/layout';
import H5 from 'common/components/H5';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  ${gutter({ type: 'outer', position: 'right' })};
`;
const Text = H5.extend``;

StreakStatus.propTypes = {
  streak: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

function StreakStatus({ streak, category }) {
  const name = getSrsRankName(streak);
  return (
    <Wrapper>
      <Text>{category}: </Text>
      <StreakIcon streakName={name} color={SRS_COLORS[name]} />
    </Wrapper>
  );
}

export default StreakStatus;
