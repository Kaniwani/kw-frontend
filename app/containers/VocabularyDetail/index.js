import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { ReviewEntryRecord } from 'shared/models';
import Container from 'components/Container';
import H1 from 'components/H1';
import { selectVocabularyDetail } from 'containers/VocabularyPage/selectors';
import { getItem } from 'containers/VocabularyPage/actions';
import Entry from 'containers/VocabularyPage/Entry';

export class VocabularyDetail extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getItem: PropTypes.func.isRequired,
    item: PropTypes.instanceOf(ReviewEntryRecord),
    params: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getItem(this.props.params.id);
  }

  render() {
    const { item, params: { level } } = this.props;
    return (
      <div>
        <Helmet
          title="Vocabulary" // `| ${this.props.params.id}` ?
          meta={[{ name: 'description', content: 'KaniWani Vocabulary Item Detail' }]}
        />
        {/* TODO: breadcrumbs */}
        <Container>
          <H1>Vocabulary</H1>
          <Entry item={item} level={level} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  item: selectVocabularyDetail,
});

const mapDispatchToProps = (dispatch) => ({
  getItem: (id) => dispatch(getItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyDetail);
