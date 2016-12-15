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
      <ListItem>
        <Icon
          name="CHECK"
          tooltip={{ text: 'Correctness', position: 'left', showDelay: 200 }}
        />
        <Label>{`${correctness}%`}</Label>
      </ListItem>
      <ListItem>
        <Icon
          name="ASSIGNMENT_CHECK"
          tooltip={{ text: 'Reviews completed', position: 'left', showDelay: 200 }}
        />
        <Label>{completed}</Label>
      </ListItem>
      <ListItem>
        <Icon
          name="ASSIGNMENT_INBOX"
          tooltip={{ text: 'Reviews remaining', position: 'left', showDelay: 200 }}
        />
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
