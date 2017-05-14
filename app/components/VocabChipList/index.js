import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import titleCase from 'voca/title_case';

import ReactTooltip from 'react-tooltip';

import VocabChip from 'components/VocabChip';
import WithTooltip from 'utils/WithTooltip';
import calculateCorrectnessPercentage from 'utils/calculateCorrectnessPercentage';
import * as COLORS from 'shared/styles/colors';

import { Ul } from './styles';

VocabChipList.propTypes = {
  items: PropTypes.array.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
};

VocabChipList.defaultProps = {
  color: 'purple',
};

// `.vocab-tip` tooltip styles are injected in `globalStyles.js`
const VocabChipWithToolTip = WithTooltip(VocabChip);

const generateToolTip = (meaning, kana, correctPercent) => `
  <ul>
    <li>
      <span>EN</span>
      <span>${meaning}</span>
    <li>
      <span>JA </span>
      <span lang="ja">${kana}</span>
    </li>
    <li>
      <span>RC</span>
      <span>${correctPercent}%</span>
    </li>
  </ul>
`;

function VocabChipList({ items, color }) {
  return (
    <div>
      <ReactTooltip
        id="vocabChipTip"
        className="vocab-tip"
        html
      />
      <Ul>
        {/* FIXME: memoize */}
        {items.map(({ id, meanings, readings, history, session }) => {
          const meaning = titleCase(meanings[0]);
          const { kana, character } = readings[0];
          const correctPercent = calculateCorrectnessPercentage(history, session);

          const tooltipText = generateToolTip(meaning, kana, correctPercent);
          return (
            <VocabChipWithToolTip
              key={cuid()}
              id={id}
              color={color}
              character={character}
              data-for="vocabChipTip"
              data-tip={tooltipText}
              data-place="bottom"
            />
          );
        })}
      </Ul>
    </div>
  );
}

export default VocabChipList;
