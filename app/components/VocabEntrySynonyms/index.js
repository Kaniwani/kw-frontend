import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, branch, renderNothing } from 'recompose';
import { makeSelectReviewSynonyms } from 'containers/App/selectors';

import SynonymHeader from 'components/SynonymHeader';
import Reading from 'components/Reading';
import { Ul, Li, SynonymContent } from './styles';

VocabEntrySynonyms.propTypes = {
  synonyms: PropTypes.array.isRequired,
};

function VocabEntrySynonyms({ synonyms }) {
  return (
    <Ul>
      {synonyms.map(({ reviewId, id, character, kana }) => (
        <Li key={cuid()}>
          <SynonymHeader key={cuid()} id={id} reviewId={reviewId} />
          <SynonymContent>
            <Reading character={character} kana={kana} />
          </SynonymContent>
        </Li>
      ))}
    </Ul>
  );
}

const mapStateToProps = (state, { id }) => ({
  synonyms: makeSelectReviewSynonyms(id)(state),
});


const enhance = compose(
  connect(mapStateToProps),
  branch(({ synonyms }) => !synonyms.length, renderNothing),
);

export default enhance(VocabEntrySynonyms);
