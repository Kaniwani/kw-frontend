import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';
import { titleCase } from 'voca';

import { selectRemainingCount, selectVacationDate } from 'shared/selectors';
import app from 'shared/actions';
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

const mapStateToProps = (state, props) => ({
  remainingCount: selectRemainingCount(state, props),
  onVacation: !!selectVacationDate(state),
});

const mapDispatchToProps = (dispatch, { category }) => ({
  resetSummary: () => dispatch(app[category].resetSummary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryHeader);
