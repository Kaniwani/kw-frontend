import React from 'react';
import PropTypes from 'prop-types';

import P from 'common/components/P';

Status.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

function Status({ text, status }) {
  return (
    <P><b>{text}</b>: {status}</P>
  );
}

export default Status;
