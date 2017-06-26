import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

import { StatsWrapper, Stat, Label } from './styles';

function StatsList({ correctness, complete, remaining }) {
  return (
    <StatsWrapper>
      <Stat title="Correctness">
        <Icon inline={false} size="1.15em" name="CHECK" />
        <Label>{`${correctness}%`}</Label>
      </Stat>
      <Stat title="Reviews complete">
        <Icon inline={false} size="1.1em" name="ASSIGNMENT_CHECK" />
        <Label>{complete}</Label>
      </Stat>
      <Stat title="Reviews remaining">
        <Icon inline={false} size="1.1em" name="ASSIGNMENT_INBOX" />
        <Label>{remaining}</Label>
      </Stat>
    </StatsWrapper>
  );
}

StatsList.propTypes = {
  correctness: PropTypes.number.isRequired,
  complete: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
};

export default StatsList;