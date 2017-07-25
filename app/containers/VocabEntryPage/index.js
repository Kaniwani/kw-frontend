import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { selectIdFromMatch, makeSelectReview } from 'containers/App/selectors';
import actions from 'containers/App/actions';
import PageWrapper from 'base/PageWrapper';
import VocabEntry from 'components/VocabEntry';
import VocabEntryDetail from 'components/VocabEntryDetail';

import Debug from 'utils/Debug';

export class VocabEntryPage extends React.Component {
  static propTypes = {
    loadReview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    review: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
  }

  componentDidMount() {
    this.props.loadReview(this.props.id);
  }

  render() {
    const { id, review } = this.props;
    return (
      <div>
        <Helmet>
          <title>Vocabulary: Entry</title>
          <meta name="description" content="Kaniwani Vocabulary: Entry" />
        </Helmet>
        <PageWrapper>
          <VocabEntry id={id} review={review} />
          {review && <Debug value={review} />}
          <VocabEntryDetail id={id} />
        </PageWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = selectIdFromMatch(props);
  return {
    id,
    review: makeSelectReview(id)(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => dispatch(actions.review.load.request({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
