import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StreakIcon from 'common/components/StreakIcon';
import { gutter } from 'common/styles/layout';
import H5 from 'common/components/H5';

const Wrapper = styled.div`
  ${gutter({ type: 'outer', position: 'right' })};
  display: inline-flex;
  align-items: center;
`;

StreakStatus.propTypes = {
  streak: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

function StreakStatus({ streak, category }) {
  return (
    <Wrapper>
      <H5>{category}: </H5>
      <StreakIcon streak={streak} colored />
    </Wrapper>
  );
}

export default StreakStatus;
