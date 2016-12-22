import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import cuid from 'cuid';
import Icon from 'components/Icon';
import TagList from 'components/TagList';
import { InfoHeading, Wrapper } from './UI';

/*
 * alignContent  String - Sets the value of the CSS align-content property
 * alignItems  String - Sets the value of the CSS align-items property
 * alignSelf  String - Sets the value of the CSS align-self property
 * debug  Bool - Draws all child columns with "bounding boxes" for easy visualization of the grid. (Default: false)
 * divisions  Number - The amount of horizontal columns this row creates. (Default: 12)
 * justifyContent  String - Sets the value of the CSS justify-content property
 * order String Sets value of CSS order property
 */

const combineTags = (tags, jlpt, common) => {
  let ret = tags;
  if (jlpt) ret = ret.push(jlpt);
  if (common) ret = ret.push('Common');
  return ret;
};

const InfoPanel = ({ item, type }) => {
  const char = item.get('character');
  const kana = item.get('kana');
  const tags = item.get('tags');
  const jlpt = item.get('jlpt');
  const common = item.get('common');
  const sentenceJA = item.get('sentence_ja');
  const sentenceEN = item.get('sentence_en');
  const allTags = combineTags(tags, jlpt, common);

  return (
    <div>
      <InfoHeading>
        <span>{type}</span>
        <TagList items={allTags} />
      </InfoHeading>
      <div justifyContent="center">
        <span lang="ja" style={{ fontSize: '2em' }}>
          <strong>{char}</strong>
          <span>「{kana}」</span>
          <button type="button"><Icon name="ARROW_DOWN" /></button>
        </span>
      </div>
      <div alignItems="center" justifyContent="space-around">
        <span sm={9}>
          <p lang="ja">{sentenceJA}</p>
          <p>{sentenceEN}</p>
        </span>
      </div>
    </div>
  );
};

InfoPanel.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  type: PropTypes.string.isRequired,
};

export const ReviewInfo = ({ readings }) => (
  <Wrapper>
    <InfoPanel key={cuid()} item={readings.first()} type="Main" />
    {readings.size > 1 && readings.slice(1).map((reading) => <InfoPanel key={cuid()} item={reading} type="Synonym" />)}
  </Wrapper>
  );

ReviewInfo.propTypes = {
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
};

export default ReviewInfo;
