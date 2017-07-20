import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from 'containers/App/actions';
import { Wrapper, Heading, RemoveButton } from './styles';

SynonymHeader.propTypes = {
  removeSynonym: PropTypes.func.isRequired,
};

function SynonymHeader({ removeSynonym }) {
  return (
    <Wrapper>
      <Heading>
        Synonym
      </Heading>
      <RemoveButton
        name="CLOSE"
        title="Remove Synonym"
        type="button"
        size="1.3em"
        onClick={removeSynonym}
      />
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch, { id, reviewId }) => ({
  removeSynonym: () => dispatch(actions.review.synonym.remove.request({ id, reviewId })),
});

export default connect(null, mapDispatchToProps)(SynonymHeader);
