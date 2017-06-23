// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Divider from 'components/Divider';
// import { combineTags } from 'containers/ReviewSession/utils';
// import synonymActions from 'containers/AddSynonymForm/actions';
// import { ReadingRecord, SynonymRecord } from 'shared/models';
//
// import { PanelWrapper, ReadingPair, Reading, SentencePair, Sentence } from './styles';
// import Heading from './Heading';
// import MarkedSentence from './MarkedSentence';
//
// class VocabInfo extends React.Component {
//   static propTypes = {
//     item: PropTypes.oneOfType([
//       PropTypes.instanceOf(ReadingRecord),
//       PropTypes.instanceOf(SynonymRecord),
//     ]).isRequired,
//     category: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     detailLevel: PropTypes.number.isRequired,
//     onRemoveButtonClick: PropTypes.func.isRequired,
//   }
//
//   handleClick = () => {
//     this.props.onRemoveButtonClick(this.props.item);
//   }
//
//   render() {
//     const { id, item, category, detailLevel } = this.props;
//     const { character, kana, tags, jlpt, common } = item;
//
//     const sentenceJA = item.sentenceJa;
//     const sentenceEN = item.sentenceEn;
//     const allTags = (tags != null ? combineTags(tags, jlpt, common) : tags);
//
//     return (
//       <PanelWrapper addPadding={detailLevel > 2}>
//         {detailLevel > 2 && (
//           <Heading
//             category={category}
//             character={character}
//             id={id}
//             tags={allTags}
//             handleClick={this.handleClick}
//           />
//         )}
//         <ReadingPair>
//           <Reading lang="ja">{character}</Reading>
//           {(detailLevel > 1) && <Reading lang="ja">{kana}</Reading> }
//         </ReadingPair>
//         {(detailLevel > 2) && sentenceJA && <Divider fade />}
//         {(detailLevel > 2) && sentenceJA && (
//           <SentencePair>
//             <MarkedSentence sentence={sentenceJA} character={character} kana={kana} />
//             <Sentence>{sentenceEN}</Sentence>
//           </SentencePair>
//         )}
//       </PanelWrapper>
//     );
//   }
// }
//
// const mapDispatchToProps = dispatch => ({
//   onRemoveButtonClick: synonym => dispatch(synonymActions.removeSynonymRequest(synonym)),
// });
//
// export default connect(null, mapDispatchToProps)(VocabInfo);
