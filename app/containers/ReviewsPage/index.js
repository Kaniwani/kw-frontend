import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import * as globalActions from 'containers/App/actions';
import ReviewsContainer from 'containers/ReviewsContainer';
import { makeSelectQueue, makeSelectReviewCount } from 'containers/App/selectors';

export class ReviewsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    queueLoad: PropTypes.func.isRequired,
    queue: PropTypes.array,
    reviewsComplete: PropTypes.number,
    reviewsRemaining: PropTypes.number,
  }

  componentDidMount() {
    this.props.queueLoad();
  }

  componentDidUpdate() {
    const { queue, reviewsRemaining, reviewsComplete } = this.props;
    const needMoreReviews = queue.length < 10 && queue.length < reviewsRemaining;
    if (needMoreReviews) {
      this.props.queueLoad({ offset: reviewsComplete });
    }
  }

  render() {
    const { queue } = this.props;
    return (
      <div>
        <Helmet>
          <title>Review Session</title>
          <meta name="description" content="Kaniwani Review Session" />
        </Helmet>
        <ReviewsContainer queue={queue} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  queue: makeSelectQueue(),
  reviewCount: makeSelectReviewCount(),
});

const mapDispatchToProps = (dispatch) => ({
  queueLoad: () => dispatch(globalActions.queueLoadRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsPage);
