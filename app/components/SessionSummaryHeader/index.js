import React from 'react';
import PropTypes from 'prop-types';

import LogoLink from 'components/LogoLink';
import SessionLink from 'components/SessionLink';

import {
  Header,
  Wrapper,
  Title,
} from './styles';

SessionSummaryHeader.propTypes = {
  remainingReviews: PropTypes.number,
};

SessionSummaryHeader.defaultProps = {
  remainingReviews: 0,
};

function SessionSummaryHeader({ remainingReviews }) {
  return (
    <Header>
      <Wrapper flexRow flexWrap alignItems="center" justifyContent="space-between">
        <LogoLink />
        <Title>Review Summary</Title>
        <SessionLink text="Continue session" to="/review/" count={remainingReviews} />
      </Wrapper>
    </Header>
  );
}

export default SessionSummaryHeader;
