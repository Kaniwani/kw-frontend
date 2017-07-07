import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers, setPropTypes } from 'recompose';

import app from 'containers/App/actions';
import { Wrapper, Heading, RemoveButton } from './styles';

SynonymHeader.propTypes = {
  handleRemoveSynonym: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeSynonym: (payload) => dispatch(app.review.synonym.remove.request(payload)),
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  setPropTypes({
    reviewId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
  withHandlers({
    handleRemoveSynonym: ({ id, reviewId, removeSynonym }) => () => removeSynonym({ id, reviewId }),
  }),
);

function SynonymHeader({ handleRemoveSynonym }) {
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
        onClick={handleRemoveSynonym}
      />
    </Wrapper>
  );
}

export default enhance(SynonymHeader);
