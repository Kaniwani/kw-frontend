import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import InfoHeading from './InfoHeading';
import Divider from 'components/Divider';
import Mark from 'components/Mark';
import { combineTags, splitSentenceByMatch } from './utils';
import { PanelWrapper, Row, RowItem } from './styles';
import { removeSynonym } from 'containers/AddSynonymForm/actions';


const InfoPanel = ({ item, category, detailLevel, onRemoveButtonClick }) => {
  const chars = item.get('character');
  const kana = item.get('kana');
  const tags = item.get('tags');
  const jlpt = item.get('jlpt');
  const common = item.get('common');

  let sentenceJA = item.get('sentence_ja');
  if (sentenceJA != null) sentenceJA = splitSentenceByMatch(sentenceJA, chars, kana);
  const sentenceEN = item.get('sentence_en');
  const allTags = (tags != null ? combineTags(tags, jlpt, common) : tags);

  const synonymId = (category === 'Synonym' ? item.get('id') : null);

  return (
    <PanelWrapper addPadding={detailLevel > 2}>
      {detailLevel > 2 && (
        <InfoHeading
          category={category}
          tags={allTags}
          handleClick={() => onRemoveButtonClick(synonymId)}
        />
      )}
      <Row className="is-reading-pair">
        <RowItem lang="ja">{chars}</RowItem>
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
  item: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  category: PropTypes.string.isRequired,
  detailLevel: PropTypes.number.isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onRemoveButtonClick: (id) => dispatch(removeSynonym(id)),
});

export default connect(null, mapDispatchToProps)(InfoPanel);
