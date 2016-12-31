import React, { PropTypes } from 'react';
import A from 'components/A';
import LogoLink from 'components/LogoLink';
import Container from 'components/Container';
import Element from 'components/Element';
import {
  Title,
  AlignToIcon,
  LinkBlock,
  InboxIcon,
} from './styles';

const SummaryHeader = ({ remainingReviews }) => (
  <Container flexRow flexWrap justifyContent="space-between">
    <Element flexCol flexCenter>
      <LogoLink size="4em" />
    </Element>
    <Element flexCol flexCenter flex="0 1 auto">
      <Title>Review Summary</Title>
    </Element>
    <Element tag="nav" flexRow justifyContent="flex-end" alignItems="center" flex="1 0 auto">
      <LinkBlock>
        <A to="/review/" plainLink>
          Continue Session
        </A>
        <span title="Remaining reviews">
          <span>
            <InboxIcon name="ASSIGNMENT_INBOX" color="white" size="1.2em" />
            <AlignToIcon>{remainingReviews}</AlignToIcon>
          </span>
        </span>
      </LinkBlock>
    </Element>
  </Container>
);

SummaryHeader.propTypes = {
  remainingReviews: PropTypes.number.isRequired,
};

export default SummaryHeader;
