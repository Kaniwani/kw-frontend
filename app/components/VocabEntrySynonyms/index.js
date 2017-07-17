import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { compose, withHandlers, branch, renderNothing } from 'recompose';
import { makeSelectReviewSynonyms } from 'containers/App/selectors';
import actions from 'containers/App/actions';

import Container from 'base/Container';
import Element from 'base/Element';
import Button from 'base/Button';
import SynonymHeader from 'components/SynonymHeader';
import Reading from 'components/VocabEntryReadings/Reading';

VocabEntrySynonyms.propTypes = {
  synonyms: PropTypes.array.isRequired,
  handleAddSynonym: PropTypes.func.isRequired,
};

function VocabEntrySynonyms({ synonyms, handleAddSynonym }) {
  return (
    <div>
      <Container >
        <p>This will have kanji/kana input boxes etc</p>
        <Button onClick={handleAddSynonym}>Add Synonym</Button>
      </Container>
      <Container flexRow>
        { synonyms.map(({ reviewId, id, character, kana }) => (
          <Element key={uuid()}>
            <SynonymHeader key={uuid()} id={id} reviewId={reviewId} />
            <Reading character={character} kana={[kana]} />
          </Element>
    ))}
      </Container>
    </div>
  );
}

const mapStateToProps = (state, { id }) => ({
  synonyms: makeSelectReviewSynonyms(id)(state),
});

const mapDispatchToProps = {
  addSynonym: actions.review.synonym.add.request,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ synonyms }) => synonyms.length < 0, renderNothing),
  withHandlers({
    handleAddSynonym: ({ id, addSynonym }) => () =>
      addSynonym({ reviewId: id, character: '漢字', kana: 'かな' }),
  })
);

export default enhance(VocabEntrySynonyms);
