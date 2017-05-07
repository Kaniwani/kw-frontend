import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';

import ReactTooltip from 'react-tooltip';

import Ul from 'base/Ul';
import VocabChip from 'components/VocabChip';
import WithTooltip from 'containers/WithTooltip';
import * as COLORS from 'shared/styles/colors';

VocabChipList.propTypes = {
  items: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabChipList.defaultProps = {
  color: 'purple',
};

// FIXME: operate in item selector instead
const generateToolTip = ({ meaning, kana, correctPercent }) => `
  <ul>
    <li>
      <span>EN</span>
      <span>${meaning}</li>
    <li>
      <span>JA</span>
      <span lang="ja">${kana}
    </li>
    <li>
      <span>RC</span>
      <span>${correctPercent}%
    </li>
  </ul>
`;

// SELECTOR map over items!
// import titleCase from 'voca/title_case';
// import calculateCorrectnessPercentage from 'utils/calculateCorrectnessPercentage';
// meaning = titleCase(item.meanings[0]);
// { kana, character } = item.readings[0];
// correctPercent = calculateCorrectnessPercentage(item.history, item.session);
// tooltipText = generateToolTip(item)

// `.vocab-tip` tooltip styles are injected in `globalStyles.js`
const VocabChipWithToolTip = WithTooltip(VocabChip);

function VocabChipList({ items, color, ...props }) {
  return (
    <div>
      <ReactTooltip
        id="vocabChipTip"
        className="vocab-tip"
        html
      />
      <Ul plainList {...props}>
        {items.map((item) => {
          const tooltipText = generateToolTip(item); // FIXME: map onto item in memoized item selector instead
          return (
            <VocabChipWithToolTip
              key={cuid()}
              id={item.id}
              color={color}
              character={item.character}
              data-for="vocabChipTip"
              data-tip={tooltipText}
            />
          );
        })}
      </Ul>
    </div>
  );
}

export default VocabChipList;
