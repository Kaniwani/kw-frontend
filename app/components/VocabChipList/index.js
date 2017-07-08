import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import ReactTooltip from 'react-tooltip';

import VocabChip from 'components/VocabChip';
import * as COLORS from 'shared/styles/colors';
import { Ul } from './styles';

VocabChipList.propTypes = {
  ids: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabChipList.defaultProps = {
  color: 'purple',
};

function VocabChipList({ ids, color }) {
  return (
    <div>
      <ReactTooltip
        id="vocabChipTip"
        className="vocab-tip"
        html
      />
      <Ul>
        {ids.map((id) => (
          <VocabChip
            key={cuid()}
            id={id}
            toolTipId="vocabChipTip"
            color={color}
          />)
        )}
      </Ul>
    </div>
  );
}

export default VocabChipList;
