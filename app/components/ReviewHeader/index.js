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

function ReviewHeader({ initial, remaining, completed, correct }) {
  return (
    <Wrapper>
      <ProgressBar value={(completed / initial) * 100} />
      <ExitQuiz />
      <StatsList
        completed={completed}
        correct={calculatePercentage(correct, completed)}
        remaining={remaining}
      />
    </Wrapper>
  );
}

ReviewHeader.propTypes = {
  initial: React.PropTypes.number.isRequired,
  remaining: React.PropTypes.number.isRequired,
  completed: React.PropTypes.number.isRequired,
  correct: React.PropTypes.number.isRequired,
};

export default ReviewHeader;
