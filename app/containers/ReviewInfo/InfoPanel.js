import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import InfoHeading from './InfoHeading';
import Divider from 'components/Divider';
import Mark from 'components/Mark';
import splitKeepingDelimiter from 'utils/splitKeepingDelimiter';
import { stripOkurigana } from 'kanawana';
import { TILDE_JA } from 'containers/ReviewAnswer/constants';
import { combineTags } from './utils';
import { PanelWrapper, Row, RowItem } from './styles';

const InfoPanel = ({ item, category, detailLevel }) => {
  const char = item.get('character');
  const kana = item.get('kana');
  const tags = item.get('tags');
  const jlpt = item.get('jlpt');
  const common = item.get('common');
  const matchTarget = stripOkurigana(char).replace(new RegExp(TILDE_JA, 'g'), '');
  // TODO: attempt normal full match (with tilde stripped first)
  // if that doesn't match, only then attempt partial match with strippedOkurigana
  let sentenceJA = splitKeepingDelimiter(item.get('sentence_ja'), matchTarget).map((s) => (s.length > 0 && s) || null);
  sentenceJA = {
    head: sentenceJA[0],
    mark: sentenceJA[1],
    tail: sentenceJA[2],
  };
  const sentenceEN = item.get('sentence_en');
  const allTags = combineTags(tags, jlpt, common);

  return (
    <PanelWrapper addPadding={detailLevel > 2}>
      {(detailLevel > 2) && <InfoHeading category={category} tags={allTags} />}
      <Row className="is-reading-pair">
        <RowItem lang="ja">{char}</RowItem>
        {(detailLevel > 1) && <RowItem lang="ja">{kana}</RowItem> }
      </Row>
      {(detailLevel > 2) && <Divider fade />}
      {(detailLevel > 2) && (
        <Row className="is-sentence-pair">
          <RowItem lang="ja">
            {sentenceJA.head && <span>{sentenceJA.head}</span>}
            {sentenceJA.mark && <Mark>{sentenceJA.mark}</Mark>}
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