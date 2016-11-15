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
import { calculatePercentage } from 'utils';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: ${white}
`;

function ReviewHeader({ progress: { correct, completed, remaining } }) {
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
  progress: React.PropTypes.object.isRequired,
};

export default ReviewHeader;
