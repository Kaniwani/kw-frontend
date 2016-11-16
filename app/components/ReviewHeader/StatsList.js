/**
*
* StatsList
*
*/

import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin: .75em;
  float: right;
  font-size: calc(16px + 4 * ((100vw - 300px) / 1700));
`;

const ListItem = styled.li`
  display: inline-block;
  margin-left: .9em;
`;

const Label = styled.span`
  margin-left: .15em;
  vertical-align: middle;
`;

function StatsList({ correct, completed, remaining }) {
  return (
    <List>
      <ListItem title="Correct answers">
        <Icon name="THUMBS_UP" />
        <Label>{correct}</Label>%</ListItem>
      <ListItem title="Reviews completed">
        <Icon name="CHECK" />
        <Label>{completed}</Label>
      </ListItem>
      <ListItem title="Reviews remaining">
        <Icon name="INBOX" />
        <Label>{remaining}</Label>
      </ListItem>
    </List>
  );
}

StatsList.propTypes = {
  correct: React.PropTypes.number.isRequired,
  completed: React.PropTypes.number.isRequired,
  remaining: React.PropTypes.number.isRequired,
};

export default StatsList;