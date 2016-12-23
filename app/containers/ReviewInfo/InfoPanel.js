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

const InfoPanel = ({ item, category, detailLevel }) => {
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
    <PanelWrapper addPadding={detailLevel > 2}>
      {(detailLevel > 2) && <InfoHeading category={category} tags={allTags} />}
      <Row asReadingPair>
        <RowItem lang="ja">{char}</RowItem>
        {(detailLevel > 1) && <RowItem lang="ja">「{kana}」</RowItem> }
      </Row>
      {(detailLevel > 2) && <Divider />}
      {(detailLevel > 2) && (
        <Row asSentencePair>
          <RowItem lang="ja">{sentenceJA}</RowItem>
          <RowItem>{sentenceEN}</RowItem>
        </Row>
      )}
    </PanelWrapper>
  );
};

InfoPanel.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  category: PropTypes.string.isRequired,
  detailLevel: PropTypes.number.isRequired,
};

export default InfoPanel;
