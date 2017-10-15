import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import { isEqual, flatten } from 'lodash';
import { compose, shouldUpdate, branch, renderComponent } from 'recompose';

import { makeSelectReviewsGroupedByRank } from 'shared/selectors';
import Placeholder from '../Placeholder';

import RankedVocabList from '../RankedVocabList';

RankedVocabLists.propTypes = {
  rankedEntries: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  cardsExpanded: PropTypes.bool.isRequired,
};

function RankedVocabLists({ rankedEntries, color, cardsExpanded }) {
  return (
    <div>
      {Object.entries(rankedEntries).map(([rank, ids]) => (
        <RankedVocabList
          key={cuid()}
          rank={rank}
          ids={ids}
          color={color}
          cardsExpanded={cardsExpanded}
        />
      ))}
    </div>
  );
}


const mapStateToProps = (state, { ids }) => ({
  rankedEntries: makeSelectReviewsGroupedByRank(ids)(state),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(
    ({ rankedEntries }) => flatten(Object.values(rankedEntries)).length < 1,
    renderComponent(Placeholder),
  ),
  shouldUpdate((props, nextProps) =>
    props.cardsExpanded !== nextProps.cardsExpanded ||
    !isEqual(props.ids, nextProps.ids))
);

export default enhance(RankedVocabLists);
