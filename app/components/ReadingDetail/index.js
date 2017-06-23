import React from 'react';
import PropTypes from 'prop-types';

import { DETAIL_LEVELS } from 'shared/constants';

import { Reading, Character, Kana } from './styles';

const isNotLowDetail = detailLevel => detailLevel !== DETAIL_LEVELS.LOW;

ReadingDetail.propTypes = {
  detailLevel: PropTypes.oneOf(Object.values(DETAIL_LEVELS)),
  character: PropTypes.string.isRequired,
  kana: PropTypes.array.isRequired,
};

ReadingDetail.defaultProps = {
  detailLevel: DETAIL_LEVELS.MEDIUM,
};

function ReadingDetail({ detailLevel, character, kana }) {
  return (
    <Reading>
      <Character lang="ja">{character}</Character>
      {/* TODO: accept a list of kana readings */}
      {isNotLowDetail(detailLevel) && <Kana lang="ja">{kana}</Kana> }
    </Reading>
  );
}

export default ReadingDetail;
