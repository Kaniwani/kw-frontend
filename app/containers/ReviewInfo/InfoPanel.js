import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import InfoHeading from './InfoHeading';
import Divider from 'components/Divider';
import { PanelWrapper, Row, RowItem } from './UI';

const combineTags = (tags, jlpt, common) => {
  let ret = tags;
  if (jlpt) ret = ret.push(jlpt);
  if (common) ret = ret.push('Common');
  return ret;
};

const InfoPanel = ({ item, category, fullDetails }) => {
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
    <PanelWrapper addPadding={fullDetails}>
      {fullDetails && <InfoHeading category={category} tags={allTags} />}
      <Row asReadingPair>
        <RowItem lang="ja">{char}</RowItem>
        <RowItem lang="ja">「{kana}」</RowItem>
      </Row>
      {fullDetails && <Divider />}
      {fullDetails && (
        <Row asSentencePair>
          <RowItem lang="ja" fullWidth>{sentenceJA}</RowItem>
          <RowItem fullWidth>{sentenceEN}</RowItem>
        </Row>
      )}
    </PanelWrapper>
  );
};

InfoPanel.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  category: PropTypes.string.isRequired,
  fullDetails: PropTypes.bool.isRequired,
};

export default InfoPanel;
