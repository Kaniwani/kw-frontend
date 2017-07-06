import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectQueue, makeSelectReviewCount } from 'containers/App/selectors';

import * as globalActions from 'containers/App/actions';
import backgroundImage from 'shared/assets/img/reviews.svg';
import ReviewAnswerContainer from 'containers/ReviewAnswerContainer';
import ReviewInfoContainer from 'containers/ReviewInfoContainer';
// TODO: extract these two to /components/component
import ReviewHeader from './Header';
import ReviewQuestion from './Question';
import { Wrapper, Upper, Lower, ReviewBackgroundImg } from './styles';

class ReviewsContainer extends React.Component {
  static propTypes = {
    queue: PropTypes.array,
  }

  render() {
    return (
      <Wrapper>
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
  queueLoad: () => dispatch(globalActions.queueLoadRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
