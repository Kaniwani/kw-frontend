import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';
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

QuizSummaryContent.propTypes = {
  category: PropTypes.string.isRequired,
  resetSession: PropTypes.func.isRequired,
  isSessionActive: PropTypes.bool,
  count: PropTypes.number,
};

QuizSummaryContent.defaultProps = {
  count: 0,
  isSessionActive: false,
};

function QuizSummaryContent({ category, count, isSessionActive, resetSession }) {
  const linkText = () => {
    if (isSessionActive && count > 0) return 'Continue Session';
    if (!isSessionActive && count > 0) return 'Begin Session';
    return `No ${titleCase(category)}`;
  };

  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{titleCase(category)} Summary</Title>
        <SessionLink
          isDisabled={count <= 0}
          text={linkText()}
          to={`/${category}/session`}
          count={count}
          onClick={resetSession}
        />
      </Wrapper>
    </Header>
  );
}

const mapStateToProps = createStructuredSelector({
  count: selectRemainingCount,
  isSessionActive: selectSessionActive,
});

const mapDispatchToProps = (dispatch, { category }) => ({
  resetSession: () => dispatch(app[category].session.reset),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizSummaryContent);
