import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const ListItem = styled.li`
  padding-left: .35em;
  padding-right: .35em;
`;

const Label = styled.span`
  vertical-align: middle; /* Icon has va-m */
  margin-left: .15em;
`;

function StatsList({ correctness, completed, remaining }) {
  return (
    <List>
      <ListItem title="Correctness">
        <Icon name="CHECK" />
        <Label>{`${correctness}%`}</Label>
      </ListItem>
      <ListItem title="Reviews completed">
        <Icon name="ASSIGNMENT_CHECK" />
        <Label>{completed}</Label>
      </ListItem>
      <ListItem title="Reviews remaining">
        <Icon name="ASSIGNMENT_INBOX" />
        <Label>{remaining}</Label>
      </ListItem>
    </List>
  );
}

StatsList.propTypes = {
  correctness: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
};

export default StatsList;
