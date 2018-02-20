import React from 'react';
import PropTypes from 'prop-types';

import { white, blue } from 'common/styles/colors';

import { Wrapper, LinkBlock, Left, Right, InboxIcon, Count } from './styles';

SessionLink.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

SessionLink.defaultProps = {
  color: blue[5],
};

function SessionLink({ text, to, count, color, isDisabled, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <LinkBlock plainLink isDisabled={isDisabled} bgColor={color} to={to}>
        <Left>{text}</Left>
        <Right title="Remaining reviews">
          <InboxIcon inline={false} name="ASSIGNMENT_INBOX" color={white[5]} size="1.2em" />
          <Count>{count}</Count>
        </Right>
      </LinkBlock>
    </Wrapper>
  );
}

export default SessionLink;
