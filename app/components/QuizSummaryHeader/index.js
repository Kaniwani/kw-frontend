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
  sessionActive: PropTypes.bool.isRequired,
  sessionCount: PropTypes.number.isRequired,
  resetSession: PropTypes.func.isRequired,
};

const linkText = (sessionCount, sessionActive, category) => {
  if (sessionCount < 1) return `No ${titleCase(category)}`;
  if (sessionActive) return 'Continue Session';
  return 'Begin Session';
};

function QuizSummaryHeader({ category, sessionCount, sessionActive, resetSession }) {
  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{titleCase(category)} Summary</Title>
        <SessionLink
          isDisabled={sessionCount < 1}
          text={linkText(sessionCount, sessionActive, category)}
          to={`/${category}/session`}
          count={sessionCount}
          handleClick={!sessionActive ? resetSession : noop}
        />
      </Wrapper>
    </Header>
  );
}

const mapStateToProps = createStructuredSelector({
  sessionCount: selectRemainingCount,
  sessionActive: selectSessionActive,
});

const mapDispatchToProps = (dispatch, { category }) => ({
  resetSession: () => dispatch(app[category].resetSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryHeader);
