import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VocabWord from 'common/components/VocabWord';
import VocabMeaning from 'common/components/VocabMeaning';
import getSrsRankName from 'common/utils/getSrsRankName';
import { selectStreak, selectIsHidden, selectPrimaryVocabId } from 'features/reviews/selectors';
import { white, purple, grey, SRS_COLORS } from 'common/styles/colors';

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
  textColor: white[1],
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

const mapStateToProps = (state, props) => {
  const streak = selectStreak(state, props);
  const isHidden = selectIsHidden(state, props);
  const vocabId = selectPrimaryVocabId(state, props);
  const textColor = !props.withSrsColors ? props.textColor : isHidden ? grey[1] : white[1];
  const bgColor = !props.withSrsColors
    ? props.bgColor
    : isHidden ? grey[6] : SRS_COLORS[getSrsRankName(streak)];

  return {
    vocabId,
    bgColor,
    textColor,
  };
};

export default connect(mapStateToProps)(VocabCard);
