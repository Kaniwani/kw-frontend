import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const Wrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const Stat = styled.li`
  padding-left: .35em;
  padding-right: .35em;
`;

const Label = styled.span`
  vertical-align: middle; /* Icon has va-m */
  margin-left: .15em;
`;

function StatsList({ correctness, completed, remaining }) {
  return (
    <Wrapper>
      <Stat title="Correctness">
        <Icon name="CHECK" />
        <Label>{`${correctness}%`}</Label>
      </Stat>
      <Stat title="Reviews completed">
        <Icon name="ASSIGNMENT_CHECK" />
        <Label>{completed}</Label>
      </Stat>
      <Stat title="Reviews remaining">
        <Icon name="ASSIGNMENT_INBOX" />
        <Label>{remaining}</Label>
      </Stat>
    </Wrapper>
  );
}

StatsList.propTypes = {
  correctness: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
};

export default StatsList;
