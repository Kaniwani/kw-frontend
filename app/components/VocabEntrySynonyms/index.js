import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, withHandlers, branch, renderNothing } from 'recompose';
import { makeSelectReviewSynonyms } from 'containers/App/selectors';
import actions from 'containers/App/actions';

import Element from 'base/Element';
import Button from 'base/Button';
import SynonymHeader from 'components/SynonymHeader';
import { Character, Kana } from 'components/VocabEntryReadings/styles';

VocabEntrySynonyms.propTypes = {
  synonyms: PropTypes.array.isRequired,
  handleAddSynonym: PropTypes.func.isRequired,
};

function VocabEntrySynonyms({ synonyms, handleAddSynonym }) {
  return (
    <div>
      <Element>
        <p>This will have kanji/kana input boxes etc</p>
        <Button onClick={handleAddSynonym}>Add Synonym</Button>
      </Element>
      <Element flexRow>
        { synonyms.map(({ reviewId, id, character, kana }) => (
          <div key={cuid()}>
            <SynonymHeader key={cuid()} id={id} reviewId={reviewId} />
            <Element>
              <Character>{character}</Character>
              <Kana>{kana.join('・')}</Kana>
            </Element>
          </div>
        ))}
      </Element>
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
  branch(({ synonyms }) => !synonyms.length, renderNothing),
  withHandlers({
    handleAddSynonym: ({ id, addSynonym }) => () =>
      addSynonym({ reviewId: id, character: '漢字', kana: 'かな' }),
  })
);

export default enhance(VocabEntrySynonyms);
