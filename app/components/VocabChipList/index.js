import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import ReactTooltip from 'react-tooltip';
import { lifecycle } from 'recompose';

import VocabChip from 'components/VocabChip';
import * as COLORS from 'shared/styles/colors';
import { Ul } from './styles';

VocabChipList.propTypes = {
  ids: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  isExpanded: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
};

VocabChipList.defaultProps = {
  color: 'purple',
};

const enhance = lifecycle({
  componentDidUpdate(prevProps) {
    console.log({ props: this.props, prevProps });
    const switchedToCompact = (!this.props.isExpanded) && prevProps.isExpanded;
    if (switchedToCompact) {
      ReactTooltip.rebuild();
    }
  },
});

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

export default enhance(VocabChipList);
