import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import InfoHeading from './InfoHeading';
import Divider from 'components/Divider';
import Mark from 'components/Mark';
import { combineTags, splitSentenceByMatch } from 'containers/ReviewSession/utils';
import synonymActions from 'containers/AddSynonymForm/actions';
import { PanelWrapper, Row, RowItem } from './styles';
import { ReadingRecord, SynonymRecord } from 'shared/models';

const InfoPanel = ({ item, category, detailLevel, onRemoveButtonClick }) => {
  const { character, kana, tags, jlpt, common } = item;

  let sentenceJA = item.sentenceJa;
  if (sentenceJA != null) sentenceJA = splitSentenceByMatch(sentenceJA, character, kana); // FIXME: selector! this recomputes on every detail level cycle
  const sentenceEN = item.sentenceEn;
  const allTags = (tags != null ? combineTags(tags, jlpt, common) : tags);

  return (
    <PanelWrapper addPadding={detailLevel > 2}>
      {detailLevel > 2 && (
        <InfoHeading
          category={category}
          tags={allTags}
          handleClick={() => onRemoveButtonClick(item)}
        />
      )}
      <Row className="is-reading-pair">
        <RowItem lang="ja">{character}</RowItem>
        {(detailLevel > 1) && <RowItem lang="ja">{kana}</RowItem> }
      </Row>
      {(detailLevel > 2) && sentenceJA && <Divider fade />}
      {(detailLevel > 2) && sentenceJA && (
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
  item: PropTypes.oneOfType([
    PropTypes.instanceOf(ReadingRecord),
    PropTypes.instanceOf(SynonymRecord),
  ]).isRequired,
  category: PropTypes.string.isRequired,
  detailLevel: PropTypes.number.isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onRemoveButtonClick: (synonym) => dispatch(synonymActions.removeSynonymRequest(synonym)),
});

export default connect(null, mapDispatchToProps)(InfoPanel);
