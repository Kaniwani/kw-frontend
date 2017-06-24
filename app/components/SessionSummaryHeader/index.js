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
  count: PropTypes.number,
  match: PropTypes.object.isRequired,
};

SessionSummaryHeader.defaultProps = {
  count: 0,
};

function SessionSummaryHeader({ count, match: { params: { category } } }) {
  return (
    <Header>
      <Wrapper>
        <LogoLink />
        <Title>{titleCase(category)} Summary</Title>
        <SessionLink
          text="Continue Session"
          to={`/${category}/session`}
          count={count}
        />
      </Wrapper>
    </Header>
  );
}

export default SessionSummaryHeader;
