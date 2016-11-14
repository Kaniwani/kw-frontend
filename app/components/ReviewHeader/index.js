/**
*
* ReviewHeader
*
*/

import React from 'react';
import styled from 'styled-components';
import { white } from 'shared/styles/colors';
import ProgressBar from 'components/ProgressBar';
import ExitQuiz from 'components/ExitQuiz';
import StatsList from 'components/StatsList';

// TODO: extract to utils, add tests, check if ignored is > 0 instead of the || 0 ?
const calculatePercentage = (correct, completed) =>
  Math.floor((correct / completed) * 100) || 0; // guard against divide by 0 (when first answer was ignored)

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: ${white}
`;

function ReviewHeader({ progress }) {
  const { completed, correct, remaining } = progress;
  return (
    <Wrapper>
      <ProgressBar value={completed} />
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
  progress: React.PropTypes.shape({
    remaining: React.PropTypes.number.isRequired,
    completed: React.PropTypes.number.isRequired,
    correct: React.PropTypes.number.isRequired,
  }),
};

export default ReviewHeader;
