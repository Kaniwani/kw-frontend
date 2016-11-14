import React from 'react';
import { getSrsRankName } from 'utils';
import Icon from 'components/Icon';


// TODO: alter Icon component, remove style prop and add use styled-components instead
function StreakIcon({ streak }) {
  return (
    <Icon
      name={getSrsRankName(streak)}
      size={50}
      style={{
        display: 'block',
        position: 'absolute',
        transform: 'translateY(-50%)',
        top: '50%',
        left: '.5em',
      }}
    />
  );
}

StreakIcon.propTypes = {
  streak: React.PropTypes.number.isRequired,
};

export default StreakIcon;
