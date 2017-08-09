import React from 'react';
import PropTypes from 'prop-types';

import P from 'base/P';
import Element from 'base/Element';

QuizStatus.propTypes = {
  text: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

function QuizStatus({ text, status }) {
  return (
    <Element>
      <P><b>{text}</b>: {status}</P>
    </Element>
  );
}

export default QuizStatus;
