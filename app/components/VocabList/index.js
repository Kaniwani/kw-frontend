import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cuid from 'cuid';
import { isEqual } from 'lodash';
import * as COLORS from 'shared/styles/colors';

import VocabCard from 'components/VocabCard';
import VocabChip from 'components/VocabChip';
import { Ul } from './styles';

class VocabList extends React.PureComponent {
  static propTypes = {
    ids: PropTypes.array.isRequired,
    color: PropTypes.oneOf(Object.keys(COLORS)),
    isExpanded: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    color: 'purple',
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const { ids, color, isExpanded } = this.props;

    return (
      <div>
        {!isExpanded && (
          <ReactTooltip id="vocabChipTip" className="vocab-tip" html />
        )}

        <Ul isExpanded={isExpanded}>
          {ids.map((id) => isExpanded ? (
            <VocabCard
              id={id}
              key={cuid()}
              color={color}
            />
          ) : (
            <VocabChip
              id={id}
              key={cuid()}
              color={color}
              toolTipId="vocabChipTip"
            />
          ))}
        </Ul>
      </div>
    );
  }
}

export default VocabList;
