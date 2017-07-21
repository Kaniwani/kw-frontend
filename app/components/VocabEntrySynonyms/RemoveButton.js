import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from 'containers/App/actions';
import { Button } from './styles';

RemoveButton.propTypes = {
  removeSynonym: PropTypes.func.isRequired,
};

function RemoveButton({ removeSynonym }) {
  return (
    <Button
      name="CLOSE"
      title="Remove Synonym"
      type="button"
      size="1.3em"
      onClick={removeSynonym}
    />
  );
}

const mapDispatchToProps = (dispatch, { id, reviewId }) => ({
  removeSynonym: () => dispatch(actions.review.synonym.remove.request({ id, reviewId })),
});

export default connect(null, mapDispatchToProps)(RemoveButton);
