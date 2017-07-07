import React from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import titleCase from 'voca/title_case';

import ReactTooltip from 'react-tooltip';

import withTooltip from 'decorators/withTooltip';
import VocabChip from 'components/VocabChip';
import calculatePercentage from 'utils/calculatePercentage';
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
const VocabChipWithToolTip = withTooltip(VocabChip);

const correctnessText = (correct, incorrect) => {
  const total = correct + incorrect;
  const previouslyAnswered = total > 0;
  return `${previouslyAnswered ? `${calculatePercentage(correct, total)}%` : '<small>N/A</small>'}`;
};

const generateToolTip = (meaning, kana, correctness) => `
  <ul>
    <li>
      <span>JA </span>
      <span lang="ja">${kana}</span>
    </li>
    <li>
      <span>EN</span>
      <span>${meaning}</span>
    </li>
    <li>
      <span>RC</span>
      <span>${correctness}</span>
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
        {/* FIXME: ids not full items, selector should do all this destructuring instead */}
        {items.map(({ id, correct, incorrect, vocabulary: { meanings, readings } }) => {
          const { kana, character } = readings[0];
          const tooltipText = generateToolTip(titleCase(meanings[0]), kana, correctnessText(correct, incorrect));
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
