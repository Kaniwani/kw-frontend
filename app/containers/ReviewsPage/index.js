import React from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import backgroundImage from 'shared/assets/img/reviews.svg';
import ReviewAnswerContainer from 'containers/ReviewAnswerContainer';
import ReviewInfoContainer from 'containers/ReviewInfoContainer';
import ReviewHeader from './Header';
import ReviewQuestion from './Question';
import { Wrapper, Upper, Lower, ReviewBackgroundImg } from './styles';

class ReviewsPage extends React.Component {

  componentDidUpdate() {
    // fetch/select reviews (saga/logic should check if already have 100)
  }

  render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Review Session</title>
          <meta name="description" content="Kaniwani Review Session" />
        </Helmet>
        <Upper>
          <ReviewHeader
            percentComplete={25}
            percentCorrect={33}
            reviewsComplete={5}
            reviewsRemaining={20}
          />
          <ReviewQuestion
            meanings={['confinement', 'imprisonment', 'incarceration', 'confinement', 'imprisonment', 'incarceration', 'confinement', 'imprisonment', 'incarceration']}
            tags={['Noun', 'Verb', 'Noun', 'Verb', 'Noun', 'Verb', 'Common', 'JLPT N1']}
          />
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

export default ReviewsPage;
