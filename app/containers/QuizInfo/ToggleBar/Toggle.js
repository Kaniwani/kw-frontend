import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectInfoDisabled } from 'containers/QuizPage/selectors';
import { createStructuredSelector } from 'reselect';

import { ToggleButton } from './styles';

Toggle.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function Toggle({ isActive, isDisabled, handleClick, children }) {
  return (
    <ToggleButton
      tabIndex="0"
      onClick={handleClick}
      isActive={isActive}
      disabled={isDisabled} // html attr -> css:pseudo
    >
      {children}
    </ToggleButton>
  );
}

const mapStateToProps = createStructuredSelector({
  isDisabled: selectInfoDisabled,
});

export default connect(mapStateToProps)(Toggle);
