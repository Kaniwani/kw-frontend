import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { titleCase } from 'voca';
import shouldUpdateDeepEqual from 'utils/shouldUpdateDeepEqual';

import LogoLink from 'components/LogoLink';
import SessionLink from './SessionLink';

import { Header, Wrapper, Title } from './styles';

QuizSummaryHeader.propTypes = {
  category: PropTypes.string.isRequired,
  remainingCount: PropTypes.number.isRequired,
  onVacation: PropTypes.bool.isRequired,
  resetSummary: PropTypes.func.isRequired,
};

function QuizSummaryHeader({ category, remainingCount, onVacation, resetSummary }) {
  const isDisabled = onVacation || remainingCount < 1;
  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{titleCase(category)} Summary</Title>
        <SessionLink
          isDisabled={isDisabled}
          text={(onVacation && 'On Vacation!') || (isDisabled ? `No ${titleCase(category)}` : 'Begin Session')}
          to={`/${category}/session`}
          count={remainingCount}
          handleClick={isDisabled ? noop : resetSummary}
        />
      </Wrapper>
    </Header>
  );
}

export default shouldUpdateDeepEqual([
  'remainingCount',
  'onVacation',
])(QuizSummaryHeader);
