import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import H1 from 'components/H1';
import LogoLink from 'components/LogoLink';
import Icon from 'components/Icon';

const Nav = styled.nav`
  width: 100%;
  padding: .5em;
  display: flex;
  justify-content: space-between;
  align-items: top;
`;

const AlignToIcon = styled.span`
  vertical-align: middle;
  line-height: 1;
`;


import { blueLight, blue } from 'shared/styles/colors';
const LinkBlock = styled.div`
  display: inline-flex;
  flex-flow: row nowrap;
  padding-bottom: 1em;

  > * {
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    justify-content: center;
    padding: 0 1em;
    background-color: black;
    color: #fff;
    letter-spacing: -1px;
    text-shadow: 1px 1px 0 rgba(0,0,0,0.1);
  }

  & > *:first-child {
    transition: background-color 0.2s ease-in;
    border-radius: 3px 0 0 3px;
    background-color: rgb(${blue});
    &:hover {
      background-color: rgb(${blueLight});
    }
  }

  & > *:last-child {
    border-radius: 0 3px 3px 0;
  }
`;

const InboxIcon = styled(Icon)`
  margin-right: .4em;
`;

const SummaryHeader = ({ remainingReviews }) => (
  <header>
    <Nav>
      <LogoLink size="4em" />
      <LinkBlock>
        <Link
          to="/review/"
          title="Start review session"
        >
          Start Session
        </Link>
        <span title="Remaining reviews">
          <span>
            <InboxIcon name="ASSIGNMENT_INBOX" color="white" size="1.2em" />
            <AlignToIcon>{remainingReviews}</AlignToIcon>
          </span>
        </span>
      </LinkBlock>
    </Nav>
    <H1>
      <Icon name="CHECK_CIRCLE" />
      <AlignToIcon>Reviews Summary</AlignToIcon>
    </H1>
  </header>
);

SummaryHeader.propTypes = {
  remainingReviews: PropTypes.number.isRequired,
};

export default SummaryHeader;
