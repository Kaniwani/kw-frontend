import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';
import { createStructuredSelector } from 'reselect';

import { selectRemainingCount, selectSessionActive } from 'containers/App/selectors';
import LogoLink from 'components/LogoLink';
import SessionLink from './SessionLink';

import {
  Header,
  Wrapper,
  Title,
} from './styles';

QuizSummaryHeader.propTypes = {
  category: PropTypes.string.isRequired,
  isSessionActive: PropTypes.bool,
  remainingCount: PropTypes.number,
};

QuizSummaryHeader.defaultProps = {
  remainingCount: 0,
  isSessionActive: false,
};

function QuizSummaryHeader({ category, remainingCount, isSessionActive }) {
  const linkText = () => {
    if (isSessionActive) return 'Continue Session';
    if (!isSessionActive) return 'Begin Session';
    return `No ${titleCase(category)}`;
  };

  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{titleCase(category)} Summary</Title>
        <SessionLink
          isDisabled={remainingCount < 1}
          text={linkText()}
          to={`/${category}/session`}
          count={remainingCount}
        />
      </Wrapper>
    </Header>
  );
}

const mapStateToProps = createStructuredSelector({
  remainingCount: selectRemainingCount,
  isSessionActive: selectSessionActive,
});

export default connect(mapStateToProps)(QuizSummaryHeader);
