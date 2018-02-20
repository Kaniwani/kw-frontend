import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VocabWord from 'common/components/VocabWord';
import VocabMeaning from 'common/components/VocabMeaning';
import getSrsRankName from 'common/utils/getSrsRankName';
import { selectStreak, selectPrimaryVocabId } from 'features/reviews/selectors';
import { white, purple, SRS_COLORS } from 'common/styles/colors';

import { Wrapper, Link } from './styles';

VocabCard.propTypes = {
  id: PropTypes.number.isRequired,
  vocabId: PropTypes.number.isRequired,
  showSecondary: PropTypes.bool,
  showFuri: PropTypes.bool,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

VocabCard.defaultProps = {
  showSecondary: false,
  showFuri: false,
  bgColor: purple[5],
  textColor: white[2],
};

export function VocabCard({ id, vocabId, showFuri, showSecondary, textColor, bgColor, ...props }) {
  return (
    <Wrapper textColor={textColor} bgColor={bgColor} {...props}>
      <Link plainLink to={`/vocabulary/entry/${id}`}>
        <VocabWord id={vocabId} showFuri={showFuri} showSecondary={showSecondary} />
        <VocabMeaning id={id} showSecondary={showSecondary} />
      </Link>
    </Wrapper>
  );
}

// FIXME: use readableColor() instead of textColor ternary below
const mapStateToProps = (state, props) => {
  const streak = selectStreak(state, props);
  const vocabId = selectPrimaryVocabId(state, props);
  const textColor = props.withSrsColors ? white[1] : props.textColor;
  const bgColor = props.withSrsColors ? SRS_COLORS[getSrsRankName(streak)] : props.bgColor;

  return {
    vocabId,
    bgColor,
    textColor,
  };
};

export default connect(mapStateToProps)(VocabCard);
