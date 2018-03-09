import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectSynonymById } from 'features/synonyms/selectors';
import synonyms from 'features/synonyms/actions';
import { VocabWord } from 'common/components/VocabWord';
import Button from 'common/components/Button';
import { red } from 'common/styles/colors';

VocabSynonym.propTypes = {
  word: PropTypes.string.isRequired,
  primaryReading: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export function VocabSynonym({ word, primaryReading, onRemove }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <VocabWord word={word} primaryReading={primaryReading} />
      <Button
        style={{ maxWidth: '5em' }}
        title="Remove Synonym"
        colorHover={red[4]}
        bgColor={red[4]}
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  ...selectSynonymById(state, props),
});

const mapDispatchToProps = (dispatch, { reviewId, id }) => ({
  onRemove: () => dispatch(synonyms.remove.request({ id, reviewId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabSynonym);
