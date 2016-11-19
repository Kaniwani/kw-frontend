/**
*
* ReviewHeader
*
*/

import React from 'react';
import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import ProgressBar from './ProgressBar';
import ExitQuiz from './ExitQuiz';
import StatsList from './StatsList';
import calculatePercentage from 'utils/calculatePercentage';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: ${white}
`;

function ReviewHeader({ total, completed, correct }) {
  return (
    <Wrapper>
      <ProgressBar value={(completed / total) * 100} />
      <ExitQuiz />
      <StatsList
        completed={completed}
        correct={calculatePercentage(correct, completed)}
        remaining={total - completed}
      />
    </Wrapper>
  );
}

ReviewHeader.propTypes = {
  total: React.PropTypes.number,
  completed: React.PropTypes.number,
  correct: React.PropTypes.number,
};

export default ReviewHeader;
