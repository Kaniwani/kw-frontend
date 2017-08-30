import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import titleCase from 'voca/title_case';
import { createStructuredSelector } from 'reselect';

import { selectRemainingCount } from 'containers/App/selectors';
import app from 'containers/App/actions';
import LogoLink from 'components/LogoLink';
import SessionLink from './SessionLink';

import {
  Header,
  Wrapper,
  Title,
} from './styles';

QuizSummaryHeader.propTypes = {
  category: PropTypes.string.isRequired,
  remainingCount: PropTypes.number.isRequired,
  resetSummary: PropTypes.func.isRequired,
};

function QuizSummaryHeader({ category, remainingCount, resetSummary }) {
  const isDisabled = remainingCount < 1;
  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{titleCase(category)} Summary</Title>
        <SessionLink
          isDisabled={isDisabled}
          text={isDisabled ? `No ${titleCase(category)}` : 'Begin Session'}
          to={`/${category}/session`}
          count={remainingCount}
          handleClick={isDisabled ? noop : resetSummary}
        />
      </Wrapper>
    </Header>
  );
}

const mapStateToProps = createStructuredSelector({
  remainingCount: selectRemainingCount,
});

const mapDispatchToProps = (dispatch, { category }) => ({
  resetSummary: () => dispatch(app[category].resetSummary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryHeader);
