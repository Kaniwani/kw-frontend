import React, { PropTypes } from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { responsiveType } from 'shared/styles/utils';

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin: .75em;
  float: right;
  font-size: ${responsiveType(16, 20)}
`;

const ListItem = styled.li`
  display: inline-block;
  margin-left: .9em;
`;

const Label = styled.span`
  margin-left: .15em;
  vertical-align: middle;
`;

function StatsList({ correctness, completed, remaining }) {
  return (
    <List>
      <ListItem title="Correct answers">
        <Icon name="THUMBS_UP" />
        <Label>{correctness}</Label>%</ListItem>
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
  correctness: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
};

export default StatsList;
