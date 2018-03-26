import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flatten } from 'lodash';

import {
  selectSummaryCorrectRankedIds,
  selectSummaryIncorrectRankedIds,
  selectSummaryCriticalRankedIds,
} from 'features/quiz/QuizSummary/selectors';

import VocabListRanked from './VocabListRanked';

import { purple, green, red, orange } from 'common/styles/colors';
import { Section, Placeholder, Heading } from './styles';

export const SECTION_TYPES = {
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT',
  CRITICAL: 'CRITICAL',
};

export const PLACEHOLDERS = {
  CORRECT: 'ʕノ•ᴥ•ʔノ ︵ ┻━┻',
  INCORRECT: ' (๑•̀ㅂ•́)و',
  CRITICAL: '(^・ω・^ )',
};

const COLORS = {
  CORRECT: green[5],
  INCORRECT: red[5],
  CRITICAL: orange[5],
};

QuizSummarySection.propTypes = {
  rankedIds: PropTypes.object.isRequired,
  sectionType: PropTypes.oneOf(Object.values(SECTION_TYPES)),
  color: PropTypes.string,
  cardsExpanded: PropTypes.bool,
};

QuizSummarySection.defaultProps = {
  sectionType: SECTION_TYPES.CORRECT,
  color: purple[5],
  cardsExpanded: false,
};

function QuizSummarySection({ rankedIds, sectionType, color, cardsExpanded }) {
  const itemCount = flatten(Object.values(rankedIds)).length;
  const sectionColor = COLORS[sectionType] || color;
  const text = `${itemCount} ${sectionType.toLowerCase()}`;

  return (
    <Section>
      <Heading color={sectionColor}>{text}</Heading>
      {!itemCount ? (
        <Placeholder>{PLACEHOLDERS[sectionType]}</Placeholder>
      ) : (
        <VocabListRanked
          rankedIds={rankedIds}
          sectionType={sectionType}
          bgColor={sectionColor}
          cardsExpanded={cardsExpanded}
        />
      )}
    </Section>
  );
}

const mapStateToProps = (_, { sectionType }) => {
  let selector = () => {};
  if (sectionType === SECTION_TYPES.CORRECT) {
    selector = selectSummaryCorrectRankedIds;
  }
  if (sectionType === SECTION_TYPES.INCORRECT) {
    selector = selectSummaryIncorrectRankedIds;
  }
  if (sectionType === SECTION_TYPES.CRITICAL) {
    selector = selectSummaryCriticalRankedIds;
  }
  return (state, props) => ({
    rankedIds: selector(state, props),
  });
};

export default connect(mapStateToProps)(QuizSummarySection);
