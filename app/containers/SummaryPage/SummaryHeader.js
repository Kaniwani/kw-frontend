import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';
import H1 from 'components/H1';
import LogoLink from 'components/LogoLink';
import {
  Nav,
  AlignToIcon,
  LinkBlock,
  InboxIcon,
} from './UI';

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
      <AlignToIcon>Review Summary</AlignToIcon>
    </H1>
  </header>
);

SummaryHeader.propTypes = {
  remainingReviews: PropTypes.number.isRequired,
};

export default SummaryHeader;
