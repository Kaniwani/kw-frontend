import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose } from 'recompose';

import { makeSelectReviewSynonyms } from 'components/App/selectors';

import Element from 'base/Element';
import AddSynonym from 'components/AddSynonym';
import Reading from 'components/Reading';
import RemoveButton from 'components/QuizInfoSynonyms/RemoveButton';
import { Ul, Li } from './styles';

VocabEntrySynonyms.propTypes = {
  synonyms: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
};

function VocabEntrySynonyms({ id, synonyms }) {
  return (
    <Element flexRow flexWrap>
      <Element>
        <b>Add Synonym:</b>
        <AddSynonym id={id} />
      </Element>
      <Ul>
        {synonyms.length > 0 && synonyms.map(({ id: synonymId, reviewId, character, kana }) => (
          <Li key={cuid()}>
            <Reading character={character} kana={kana} />
            <RemoveButton id={synonymId} reviewId={reviewId} />
          </Li>
        ))}
      </Ul>
    </Element>
  );
}

const mapStateToProps = (state, { id }) => ({
  id,
  synonyms: makeSelectReviewSynonyms(id)(state),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(VocabEntrySynonyms);
