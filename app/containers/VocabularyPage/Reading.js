// TODO, make as some kind of component!
import React, { PropTypes } from 'react';
import { ReadingRecord } from 'shared/models';

const Reading = ({ item: {
  character,
  kana,
  sentenceEn,
  sentenceJa,
} }) => (
  <div>
    <div>character: {character}</div>
    <div>kana: {kana}</div>
    <div>sentenceEn: {sentenceEn}</div>
    <div>sentenceJa: {sentenceJa}</div>
  </div>
  );
Reading.propTypes = {
  item: PropTypes.instanceOf(ReadingRecord),
};

export default Reading;
