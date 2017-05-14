import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewHeader from './Header';
import ReviewQuestion from './Question';
import ReviewInfo from './Info';
import { Wrapper, Upper, Lower, ReviewBackground } from './styles';

ReviewPanel.propTypes = {
  reviewEntry: PropTypes.object.isRequired,
};

function ReviewPanel({ reviewEntry }) {
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
        <ReviewAnswer streak="APPRENTICE" />
        <ReviewInfo reviewEntry={reviewEntry} isDisabled={false} />
        <ReviewBackground />
      </Lower>
    </Wrapper>
  );
}

export default ReviewPanel;
