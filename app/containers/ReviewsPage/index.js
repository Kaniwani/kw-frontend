import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { queueLoad } from 'containers/App/actions';
import { makeSelectQueue, makeSelectReviewCount } from 'containers/App/selectors';

import backgroundImage from 'shared/assets/img/reviews.svg';
import ReviewAnswerContainer from 'containers/ReviewAnswerContainer';
import ReviewInfoContainer from 'containers/ReviewInfoContainer';
import ReviewHeader from './Header';
import ReviewQuestion from './Question';
import { Wrapper, Upper, Lower, ReviewBackgroundImg } from './styles';

class ReviewsPage extends React.Component {
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
    return (
      <Wrapper>
        <Helmet>
          <title>Review Session</title>
          <meta name="description" content="Kaniwani Review Session" />
        </Helmet>
        <Upper>
          <ReviewHeader />
          <ReviewQuestion />
        </Upper>
        <Lower>
          <ReviewAnswerContainer />
          <ReviewInfoContainer />
          <ReviewBackgroundImg imgSrc={backgroundImage} />
        </Lower>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  queue: makeSelectQueue(),
  reviewCount: makeSelectReviewCount(),
});

const mapDispatchToProps = (dispatch) => ({
  queueLoad: () => dispatch(queueLoad()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsPage);
