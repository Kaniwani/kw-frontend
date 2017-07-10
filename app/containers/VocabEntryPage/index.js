import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import actions from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';
import VocabEntryDetail from 'components/VocabEntryDetail';

export class VocabEntryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loadReview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.loadReview(this.props.id);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>{'Vocabulary: Entry'}</title>
          <meta name="description" content={'Kaniwani Vocabulary: Entry'} />
        </Helmet>
        <PageWrapper>
          <VocabEntryDetail id={this.props.id} />
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  id: +id,
});

const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => dispatch(actions.review.load.request({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
