import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import cuid from 'cuid';
import InfoHeading from './InfoHeading';
import { Wrapper, Row, RowItem } from './UI';

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

const InfoPanel = ({ item, heading, showAll }) => {
  // TODO: selectors
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
      {showAll && <InfoHeading text={heading} tags={allTags} />}
      <Row asReadingPair>
        <RowItem lang="ja">{char}</RowItem>
        <RowItem lang="ja">「{kana}」</RowItem>
      </Row>
      {showAll && (
        <Row asSentencePair>
          <RowItem lang="ja" fullWidth>{sentenceJA}</RowItem>
          <RowItem fullWidth>{sentenceEN}</RowItem>
        </Row>
      )}
    </div>
  );
};

InfoPanel.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  heading: PropTypes.string.isRequired,
  showAll: PropTypes.bool.isRequired,
};

export const ReviewInfo = ({ readings, showAll }) => (
  <Wrapper>
    <InfoPanel key={cuid()} item={readings.first()} heading="Main" />
    {readings.slice(1).map((reading) => <InfoPanel key={cuid()} item={reading} heading="Synonym" />)}
  </Wrapper>
  );

ReviewInfo.propTypes = {
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  showAll: PropTypes.bool.isRequired,
};

export default ReviewInfo;
