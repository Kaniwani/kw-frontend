import React, { PropTypes } from 'react';
import styled, { injectGlobal } from 'styled-components';
import * as COLORS from 'shared/styles/colors';
import { fluidType } from 'shared/styles/utils';

import calculatePercentage from 'utils/calculatePercentage';
import titleCase from 'utils/titleCase';

import { Link } from 'react-router';

/* eslint-disable no-unused-expressions */
injectGlobal`
  .vocab-tip {
    padding: 0 !important;
    color: rgb(${COLORS.white})
    ${fluidType(14, 16)}
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
          color: rgb(${COLORS.grey});
        }
`;
/* eslint-enable */

const ChipWrapper = styled.li`
  display: inline-flex;
  align-items: center;
  margin-right: .1rem;
  margin-bottom: .1rem;
  background-color: ${(props) => `rgb(${COLORS[props.bgColor]})`};
  border-radius: .3rem;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1;
  max-width: 100%;
  text-decoration: none;
  vertical-align: middle;
`;

const ChipLink = styled(Link)`
  color: currentColor;
  padding: .4em .6em;
`;

const ChipText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${fluidType(18, 28)}
  text-shadow: 1px 1px 0 rgba(0, 0, 0, .1);
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
      <ChipLink to={`/vocabulary/:${id}`}>
        <ChipText lang="ja">{ character }</ChipText>
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
