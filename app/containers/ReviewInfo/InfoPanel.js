import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import InfoHeading from './InfoHeading';
import Divider from 'components/Divider';
import Mark from 'components/Mark';
import { combineTags, splitSentenceByMatch } from './utils';
import { PanelWrapper, Row, RowItem } from './styles';

const InfoPanel = ({ item, category, detailLevel }) => {
  const chars = item.get('character');
  const kana = item.get('kana');
  const tags = item.get('tags');
  const jlpt = item.get('jlpt');
  const common = item.get('common');

  const sentenceJA = splitSentenceByMatch(item.get('sentence_ja'), chars, kana);
  const sentenceEN = item.get('sentence_en');
  const allTags = combineTags(tags, jlpt, common);

  return (
    <PanelWrapper addPadding={detailLevel > 2}>
      {(detailLevel > 2) && <InfoHeading category={category} tags={allTags} />}
      {(detailLevel > 2) && <Divider fullWidth fade />}
      <Row className="is-reading-pair">
        <RowItem lang="ja">{chars}</RowItem>
        {(detailLevel > 1) && <RowItem lang="ja">{kana}</RowItem> }
      </Row>
      {(detailLevel > 2) && <Divider fade />}
      {(detailLevel > 2) && (
        <Row className="is-sentence-pair">
          <RowItem lang="ja">
            {sentenceJA.head && <span>{sentenceJA.head}</span>}
            {sentenceJA.match && <Mark>{sentenceJA.match}</Mark>}
            {sentenceJA.tail && <span>{sentenceJA.tail}</span>}
          </RowItem>
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
