import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, pure } from 'recompose';

import { makeSelectReviewReadings, makeSelectVocabChipToolTipMarkup } from 'components/App/selectors';
import * as COLORS from 'shared/styles/colors';
import { ListItem, Link, Text } from './styles';

VocabChip.propTypes = {
  id: PropTypes.number.isRequired,
  character: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  toolTipId: PropTypes.string.isRequired,
  toolTipMarkup: PropTypes.string.isRequired,
};

VocabChip.defaultProps = {
  color: 'purple',
};

function VocabChip({ id, character, color, toolTipId, toolTipMarkup }) {
  return (
    <ListItem
      bgColor={color}
      data-for={toolTipId}
      data-tip={toolTipMarkup}
      data-place="bottom"
    >
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <Text lang="ja" shadowColor={color}>{ character }</Text>
      </Link>
    </ListItem>
  );
}

const mapStateToProps = (state, props) => ({
  character: createSelector(makeSelectReviewReadings(props.id), (readings) => readings[0].character)(state),
  toolTipMarkup: makeSelectVocabChipToolTipMarkup(props.id)(state),
});

export default compose(
  connect(mapStateToProps),
  pure,
)(VocabChip);
