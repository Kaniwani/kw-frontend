import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createStructuredSelector,
  createSelector,
} from 'reselect';

import { selectReviewReadings, selectVocabChipToolTipMarkup } from 'containers/App/selectors';
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

function VocabChip({ id, toolTipId, toolTipMarkup, character, color }) {
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

const mapStateToProps = createStructuredSelector({
  character: createSelector(selectReviewReadings, (readings) => readings[0].character),
  toolTipMarkup: selectVocabChipToolTipMarkup,
});

export default connect(mapStateToProps)(VocabChip);
