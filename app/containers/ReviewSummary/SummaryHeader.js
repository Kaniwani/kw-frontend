import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';
import LogoLink from 'components/LogoLink';
import {
  Header,
  Title,
  SummaryNav,
  AlignToIcon,
  LinkBlock,
  LogoWrapper,
  InboxIcon,
} from './UI';

const SummaryHeader = ({ remainingReviews }) => (
  <Header>
    <Title>
      <Icon name="CHECK_CIRCLE" />
      <AlignToIcon>Review Summary</AlignToIcon>
    </Title>
    <SummaryNav>
      <LogoWrapper title="Return to Dashboard">
        <LogoLink size="50px" />
      </LogoWrapper>
      <LinkBlock>
        <Link to="/review/">
          Continue Session
        </Link>
        <span title="Remaining reviews">
          <span>
            <InboxIcon name="ASSIGNMENT_INBOX" color="white" size="1.2em" />
            <AlignToIcon>{remainingReviews}</AlignToIcon>
          </span>
        </span>
      </LinkBlock>
    </SummaryNav>
  </Header>
);

SummaryHeader.propTypes = {
  remainingReviews: PropTypes.number.isRequired,
};

export default SummaryHeader;
