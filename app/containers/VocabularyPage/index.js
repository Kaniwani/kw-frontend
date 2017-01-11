import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { selectVocabularyLevels } from './selectors';
import { getVocabularyLevels } from './actions';
import Container from 'components/Container';
import Element from 'components/Element';
import List from 'components/List';
import A from 'components/A';
import H1 from 'components/H1';

const Level = ({ item }) => (
  <Container tag="li" style={{ border: '1px solid grey' }}>
    <Element>level:{item.get('level')}</Element>
    <Element>{`${item.get('unlocked') ? 'un' : ''}locked`}</Element>
    <Element>count:{item.get('count')}</Element>
    {/* // TODO: make child route for /vocabulary/level/:levelId */}
    <A to={`/vocabulary/:${item.get('id')}`}>View Item</A>
  </Container>
  );

Level.propTypes = {
  item: PropTypes.instanceOf(Immutable.Iterable),
};

export class VocabularyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getVocabularyLevels: PropTypes.func.isRequired,
    levels: PropTypes.instanceOf(Immutable.Iterable).isRequired,
  }

  componentDidMount() {
    this.props.getVocabularyLevels();
  }

  render() {
    return (
      <div>
        <Helmet
          title="Vocabulary"
          meta={[{ name: 'description', content: 'KaniWani Vocabulary' }]}
        />
        {/* TODO: react-router breadcrumbs */}
        <Container>
          <H1>Vocabulary</H1>
          <List items={this.props.levels} component={Level} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  levels: selectVocabularyLevels(),
});

const mapDispatchToProps = (dispatch) => ({
  getVocabularyLevels: () => dispatch(getVocabularyLevels()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyPage);
