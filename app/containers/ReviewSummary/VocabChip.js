import React, { PropTypes } from 'react';
import styled, { injectGlobal } from 'styled-components';
import * as COLORS from 'shared/styles/colors';
import { borderRadius } from 'shared/styles/sizing';
import { fluidType, adjustColor } from 'shared/styles/utils';

import calculatePercentage from 'utils/calculatePercentage';
import titleCase from 'utils/titleCase';

import A from 'components/A';


/* eslint-disable no-unused-expressions */
injectGlobal`
  .vocab-tip {
    padding: 0 !important;
    color: ${COLORS.white}
    ${fluidType(15, 18)}
  }
  .vocab-tip__list {
    margin:0;
    padding: .4em .8em .5em;
  }
  .vocab-tip__list-item {
    margin: 0;
    padding: 0;
    list-style: none;
    display: table-row;
    > * {
      display: table-cell;
      padding: 0 3px;
    }
  }
  .vocab-tip__tag {
    font-size: .95em;
    color: ${COLORS.grey};
  }
`;
/* eslint-enable */

const ChipWrapper = styled.li`
  display: inline-flex;
  align-items: center;
  line-height: 1;
  margin-right: .2em;
  margin-bottom: .2em;
  background-color: ${(props) => COLORS[props.bgColor]};
  box-shadow: 2px 2px 0 rgba(0,0,0, .1);
  border-radius: ${borderRadius};
  color: ${COLORS.whiteLight};
  font-size: 1.2em;
  max-width: 100%;
  text-decoration: none;
  vertical-align: middle;
`;

const ChipLink = styled(A)`
  color: currentColor;
  padding: .4em .6em;
`;

const ChipText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${fluidType(20, 30)}
  text-shadow: 1px 1px 0 ${({ shadowColor }) => adjustColor(COLORS[shadowColor], 'lightness(- 20%)')};
`;

/**
 * There must be a <ReactTooltip id="vocabCardTip" /> somewhere in the parent hierarchy!
 * @param {Object} item Vocab item to display
 * @param {String} color Background color to set, must be one of shared/styles/colors
 */
const VocabChip = ({ item, color }) => {
  // TODO: redo to accept immutable object instead
  const { history, session, id } = item;
  const correct = history.correct + session.correct;
  const incorrect = history.incorrect + session.incorrect;
  const meaning = titleCase(item.vocabulary.meaning.split(',')[0]);
  const { kana, character } = item.vocabulary.readings[0];
  const correctness = calculatePercentage(correct, correct + incorrect);

  return (
    <ChipWrapper
      bgColor={color}
      data-for="vocabCardTip"
      data-class="vocab-tip"
      data-tip={`
        <ul class="vocab-tip__list" lang="en">
          <li class="vocab-tip__list-item"><span class="vocab-tip__tag">EN</span> <span>${meaning}</li>
          <li class="vocab-tip__list-item"><span class="vocab-tip__tag">JA</span> <span lang="ja">${kana}</li>
          <li class="vocab-tip__list-item"><span class="vocab-tip__tag">RC</span> <span>${correctness}%</li>
        </ul>
      `}
    >
      <ChipLink plainLink to={`/vocabulary/:${id}`}>
        <ChipText shadowColor={color} lang="ja">{ character }</ChipText>
      </ChipLink>
    </ChipWrapper>
  );
};

VocabChip.propTypes = {
  color: PropTypes.oneOf(Object.keys(COLORS)).isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    history: PropTypes.object,
    session: PropTypes.object,
    vocabulary: PropTypes.object,
  }).isRequired,
};

VocabChip.defaultProps = {
  color: 'greyLight',
};

export default VocabChip;
