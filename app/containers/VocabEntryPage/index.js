import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import app from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';
import VocabEntryDetail from 'components/VocabEntryDetail';
import { selectReview } from './selectors';

export class VocabEntryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    review: PropTypes.object,
    loadReview: PropTypes.func.isRequired,
  }

  static defaultProps = {
    review: false,
  }

  componentDidMount() {
    this.props.loadReview();
  }

  render() {
    const { review } = this.props;
    const title = (review && review.meanings[0]) || '';
    return (
      <div>
        <Helmet>
          <title>{`Vocabulary: ${title}`}</title>
          <meta name="description" content={`Kaniwani Vocabulary: ${title}`} />
        </Helmet>
        <PageWrapper>
          <VocabEntryDetail review={review} />
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  review: selectReview,
});

function mapDispatchToProps(dispatch, { match: { params: { id } } }) {
  return {
    loadReview: () => dispatch(app.review.load.request({ id })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
