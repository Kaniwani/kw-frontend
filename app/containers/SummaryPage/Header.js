import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
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

const DoubleBlock = styled.div`
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
    transition: background-color 0.1s ease-in;
  }

  & > *:first-child {
    border-radius: 3px 0 0 3px;
    background-color: #0af;
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
    <ReactTooltip id="summaryHeader" />
    <Nav>
      <LogoLink size="4em" />
      <DoubleBlock>
        <Link
          to="/review/"
          data-for="summaryHeader"
          data-tip="Start review session"
          data-place="left"
          data-delay-show="500"
        >
          Start Session
        </Link>
        <span
          data-for="summaryHeader"
          data-tip="Remaining reviews"
          data-place="left"
          data-delay-show="500"
        >
          <span>
            <InboxIcon name="ASSIGNMENT_INBOX" color="white" />
            <AlignToIcon>{remainingReviews}</AlignToIcon>
          </span>
        </span>
      </DoubleBlock>
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
