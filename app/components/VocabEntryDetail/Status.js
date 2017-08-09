import React from 'react';
import PropTypes from 'prop-types';

import P from 'base/P';
import Element from 'base/Element';

Status.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

function Status({ text, status }) {
  return (
    <Element style={{ flex: '1 1 100%' }}>
      <P><b>{text}</b>: {status}</P>
    </Element>
  );
}

export default Status;
