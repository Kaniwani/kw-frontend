import React, { PropTypes } from 'react';
import getSrsRankName from 'utils/getSrsRankName';
import Icon from 'components/Icon';


// TODO: alter Icon component, remove style prop and add use styled-components instead
function StreakIcon({ streak }) {
  return (
    <Icon
      name={getSrsRankName(streak).toUpperCase()}
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
  streak: PropTypes.number,
};

export default StreakIcon;
