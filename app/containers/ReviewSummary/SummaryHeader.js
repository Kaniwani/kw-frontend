import React, { PropTypes } from 'react';
import A from 'components/A';
import LogoLink from 'components/LogoLink';
import Container from 'components/Container';
import Element from 'components/Element';
import {
  Title,
  SummaryNav,
  AlignToIcon,
  LinkBlock,
  InboxIcon,
} from './UI';

const SummaryHeader = ({ remainingReviews }) => (
  <Container flexRow justifyContent="center">
    <Element flexCol flexCenter>
      <LogoLink size="3em" />
    </Element>
    <Element flexCol flexCenter flex="0 1 auto">
      <Title>Review Summary</Title>
    </Element>
    <Element flexCol justifyContent="center" alignItems="flex-end" flex="1 0 auto">
      <SummaryNav>
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
      </SummaryNav>
    </Element>
  </Container>
);

SummaryHeader.propTypes = {
  remainingReviews: PropTypes.number.isRequired,
};

export default SummaryHeader;
