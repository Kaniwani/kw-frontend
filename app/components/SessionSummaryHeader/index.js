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
  category: PropTypes.string.isRequired,
  linkRoute: PropTypes.string.isRequired,
  count: PropTypes.number,
};

SessionSummaryHeader.defaultProps = {
  count: 0,
};

function SessionSummaryHeader({ category, count, linkRoute }) {
  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{category} Summary</Title>
        <SessionLink
          text="Continue Session"
          to={linkRoute}
          count={count}
        />
      </Wrapper>
    </Header>
  );
}

export default SessionSummaryHeader;
