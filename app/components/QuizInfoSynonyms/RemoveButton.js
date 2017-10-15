import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from 'shared/actions';
import { RemoveButton as Button } from './styles';

RemoveButton.propTypes = {
  removeSynonym: PropTypes.func.isRequired,
};

function RemoveButton({ removeSynonym }) {
  return (
    <Button
      name="CLOSE"
      title="Remove Synonym"
      colorHover="red"
      bgColor="red"
      onClick={removeSynonym}
    >
      Remove
    </Button>
  );
}

const mapDispatchToProps = (dispatch, { id, reviewId }) => ({
  removeSynonym: () => dispatch(actions.review.synonym.remove.request({ id, reviewId })),
});

export default connect(null, mapDispatchToProps)(RemoveButton);
