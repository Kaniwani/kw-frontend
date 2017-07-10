import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import flatten from 'lodash/flatten';
import { branch, renderComponent } from 'recompose';

import { makeSelectReviewsGroupedByRank } from 'containers/App/selectors';
import Placeholder from '../Placeholder';

import RankedVocabList from '../RankedVocabList';

RankedVocabLists.propTypes = {
  rankedEntries: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
};

const withPlaceholder = branch(
  ({ rankedEntries }) => flatten(Object.values(rankedEntries)).length < 1,
  renderComponent(Placeholder),
);

function RankedVocabLists({ rankedEntries, color }) {
  return (
    <div>
      {Object.entries(rankedEntries).map(([rank, ids]) =>
        <RankedVocabList key={cuid()} rank={rank} ids={ids} color={color} />
      )}
    </div>
  );
}

const mapStateToProps = (state, { ids }) => ({
  rankedEntries: makeSelectReviewsGroupedByRank(ids)(state),
});

export default connect(mapStateToProps)(withPlaceholder(RankedVocabLists));
