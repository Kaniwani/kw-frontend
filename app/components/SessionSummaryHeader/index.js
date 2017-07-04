import React from 'react';
import PropTypes from 'prop-types';
import titleCase from 'voca/title_case';

import LogoLink from 'components/LogoLink';
import SessionLink from 'components/SessionLink';

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

export default SessionSummaryHeader;
