import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { compose, branch, renderNothing } from 'recompose';

import { makeSelectReviewSynonyms } from 'containers/App/selectors';

import Reading from 'components/Reading';
import RemoveButton from './RemoveButton';
import { Wrapper, Heading, Ul, Li } from './styles';

VocabEntrySynonyms.propTypes = {
  synonyms: PropTypes.array.isRequired,
  detailLevel: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};

VocabEntrySynonyms.defaultProps = {
  detailLevel: true,
};

function VocabEntrySynonyms({ synonyms, detailLevel }) {
  return (
    <Wrapper>
      {detailLevel >= 1 && <Heading>Synonyms</Heading>}
      <Ul>
        {synonyms.map(({ id, reviewId, character, kana }) => (
          <Li key={cuid()}>
            <Reading character={character} kana={kana} />
            <RemoveButton id={id} reviewId={reviewId} />
          </Li>
        ))}
      </Ul>
    </Wrapper>
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
