import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';
import { createStructuredSelector } from 'reselect';

import { selectRemainingCount } from 'containers/App/selectors';
import LogoLink from 'components/LogoLink';
import SessionLink from './SessionLink';

import {
  Header,
  Wrapper,
  Title,
} from './styles';

SessionSummaryHeader.propTypes = {
  category: PropTypes.string.isRequired,
  isSessionActive: PropTypes.bool,
  count: PropTypes.number,
};

SessionSummaryHeader.defaultProps = {
  count: 0,
  isSessionActive: false,
};

// FIXME: create isSessionActive selector
// remainingCount > 0 + ui state was set true when 'Begin Session' is clicked?
// remainingCount > 0 + ui state was set true when 'View Summary' from review clicked?

function SessionSummaryHeader({ category, count, isSessionActive }) {
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
        />
      </Wrapper>
    </Header>
  );
}

const mapStateToProps = createStructuredSelector({
  count: selectRemainingCount,
  // isSessionActive: selectSesionActive,
});

export default connect(mapStateToProps)(SessionSummaryHeader);
