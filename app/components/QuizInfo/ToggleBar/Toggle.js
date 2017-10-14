import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectInfoDisabled } from 'pages/QuizPage/selectors';
import { createStructuredSelector } from 'reselect';

import { ToggleButton } from './styles';

Toggle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function Toggle({ isActive, isDisabled, handleClick, children, ...props }) {
  return (
    <ToggleButton
      type="button"
      className="quizToggle"
      tabIndex="0"
      onClick={handleClick}
      isActive={isActive}
      disabled={isDisabled} // html attr -> css:pseudo
      {...props}
    >
      {children}
    </ToggleButton>
  );
}

const mapStateToProps = createStructuredSelector({
  isDisabled: selectInfoDisabled,
});

export default connect(mapStateToProps)(Toggle);
