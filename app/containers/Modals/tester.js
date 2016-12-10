import React, { PropTypes } from 'react';

const TestModal = ({ test }) => <div>{test}</div>;

TestModal.propTypes = {
  test: PropTypes.string,
};

export default TestModal;
