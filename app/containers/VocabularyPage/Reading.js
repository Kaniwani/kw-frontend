// TODO, make as some kind of component!
import React, { PropTypes } from 'react';
import { VocabReading } from 'shared/models';

const Reading = ({ item, item: {
  character,
  kana,
  sentenceEn,
  sentenceJa,
} }) => (
  <div>
    <div>character: {character}</div>
    <div>kana: {kana}</div>
    <div>tags: {item.getAllTags().join(', ')}</div>
    <div>sentenceEn: {sentenceEn}</div>
    <div>sentenceJa: {sentenceJa}</div>
  </div>
  );
Reading.propTypes = {
  item: PropTypes.instanceOf(VocabReading),
};

export default Reading;
