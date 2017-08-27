import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';
import noop from 'lodash/noop';
import { createStructuredSelector } from 'reselect';

import { selectRemainingCount, selectSessionActive } from 'containers/App/selectors';
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
  isActive: PropTypes.bool.isRequired,
  remainingCount: PropTypes.number.isRequired,
  resetSession: PropTypes.func.isRequired,
};

const linkText = (remainingCount, isActive, category) => {
  if (remainingCount < 1) return `No ${titleCase(category)}`;
  if (isActive) return 'Continue Session';
  return 'Begin Session';
};

function QuizSummaryHeader({ category, remainingCount, isActive, resetSession }) {
  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{titleCase(category)} Summary</Title>
        <SessionLink
          isDisabled={remainingCount < 1}
          text={linkText(remainingCount, isActive, category)}
          to={`/${category}/session`}
          count={remainingCount}
          handleClick={!isActive && remainingCount > 0 ? resetSession : noop}
        />
      </Wrapper>
    </Header>
  );
}

const mapStateToProps = createStructuredSelector({
  isActive: selectSessionActive,
  remainingCount: selectRemainingCount,
});

const mapDispatchToProps = (dispatch, { category }) => ({
  resetSession: () => dispatch(app[category].resetSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryHeader);
