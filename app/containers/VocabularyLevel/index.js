import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { selectVocabularyItems } from 'containers/VocabularyPage/selectors';
import { getItems } from 'containers/VocabularyPage/actions';
import Entry from 'containers/VocabularyPage/Entry';
import Container from 'components/Container';
import List from 'components/List';
import H1 from 'components/H1';

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
    const { items, params: { level } } = this.props;
    return (
      <div>
        <Helmet
          title="Vocabulary"
          meta={[{ name: 'description', content: 'KaniWani Vocabulary' }]}
        />
        {/* TODO: breadcrumbs */}
        {items.size > 0 && (
          <Container>
            <H1>Vocabulary</H1>
            <List
              items={items}
              component={Entry}
              componentProps={{ level }}
            />
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  items: selectVocabularyItems,
});

const mapDispatchToProps = (dispatch) => ({
  getItems: (level) => dispatch(getItems(level)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyLevel);
