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
      <ProgressBar value={calculatePercentage(completed, total)} />
      <ExitQuiz />
      <StatsList
        correct={calculatePercentage(correct, completed)}
        completed={completed}
        remaining={total - completed}
      />
    </Wrapper>
  );
}

// TODO: change to container and import selectors here instead of props from Review index
ReviewHeader.propTypes = {
  total: React.PropTypes.number,
  completed: React.PropTypes.number,
  correct: React.PropTypes.number,
};

export default ReviewHeader;
