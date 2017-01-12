import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { selectVocabularyDetail } from 'containers/VocabularyPage/selectors';
import { getItem } from 'containers/VocabularyPage/actions';
import Container from 'components/Container';
// import Element from 'components/Element';
// import List from 'components/List';
// import A from 'components/A';
import H1 from 'components/H1';

// const Detail = ({ item }) => (
//   <Container tag="li" style={{ border: '1px solid grey' }}>
//     <Element>level:{item.get('level')}</Element>
//     <Element>{`${item.get('unlocked') ? 'un' : ''}locked`}</Element>
//     <Element>count:{item.get('count')}</Element>
//     <A to={`/vocabulary/${item.get('level')}`} key={item.get('level')}>View Item</A>
//   </Container>
//   );

// Detail.propTypes = {
//   item: PropTypes.instanceOf(Immutable.Iterable),
// };

export class VocabularyDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getItem: PropTypes.func.isRequired,
    item: PropTypes.instanceOf(Immutable.Iterable).isRequired,
    params: PropTypes.object.isRequired,
  }

  componentDidMount() {
    console.log('vlevel', this.props.params);
    this.props.getItem(this.props.params.id);
  }

  render() {
    return (
      <div>
        <Helmet
          title="Vocabulary" // `| ${this.props.params.id}` ?
          meta={[{ name: 'description', content: 'KaniWani Vocabulary Item Detail' }]}
        />
        {/* TODO: breadcrumbs */}
        <Container>
          <H1>Vocabulary</H1>
          <p>{JSON.stringify(this.props.item)}</p>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  item: selectVocabularyDetail(),
});

const mapDispatchToProps = (dispatch) => ({
  getItem: () => dispatch(getItem()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyDetail);
