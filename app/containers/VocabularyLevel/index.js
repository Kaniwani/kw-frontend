import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { selectVocabularyItems } from 'containers/VocabularyPage/selectors';
import { getItems } from 'containers/VocabularyPage/actions';
import Container from 'components/Container';
import List from 'components/List';
import A from 'components/A';
import H1 from 'components/H1';

const Reading = ({ item }) => {
  const character = item.get('character'); // '刀',
  const kana = item.get('kana'); // 'かたな',
  const level = item.get('level'); // 2,
  const tags = item.get('tags'); // ['Noun'],
  const sentenceEn = item.get('sentence_en'); // 'Play one\'s trump card.',
  const sentenceJa = item.get('sentence_ja'); // '伝家の宝刀をぬく',
  const jlpt = item.get('jlpt'); // 'JLPT N3',
  const common = item.get('common'); // true
  return (
    <div>
      <div>character: {character}</div>
      <div>kana: {kana}</div>
      <div>level: {level}</div>
      <div>tags: {tags.toJS().join(',')}</div>
      <div>sentenceEn: {sentenceEn}</div>
      <div>sentenceJa: {sentenceJa}</div>
      <div>jlpt: {jlpt}</div>
      <div>common: {common ? 'true' : 'false'}</div>
    </div>
  );
};
Reading.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable),
};

const Item = ({ item }) => {
  const meaning = item.get('meaning');
  const readings = item.get('readings');
  return (
    <Container tag="li" style={{ border: '1px solid grey' }}>
      <div>meaning: {meaning}</div>
      <List items={readings} component={Reading} />
      <A to={`/vocabulary/${item.get('id')}`}>View Item</A>
    </Container>
  );
};

Item.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable),
};

export class VocabularyLevel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    items: PropTypes.instanceOf(Immutable.Iterable),
    params: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getItems(this.props.params.level);
  }

  render() {
    return (
      <div>
        <Helmet
          title="Vocabulary"
          meta={[{ name: 'description', content: 'KaniWani Vocabulary' }]}
        />
        {/* TODO: breadcrumbs */}
        {this.props.items.size > 0 && (
          <Container>
            <H1>Vocabulary</H1>
            <List items={this.props.items} component={Item} />
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  items: selectVocabularyItems(),
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (level) => dispatch(getItems(level)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyLevel);
