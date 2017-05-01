import React from 'react';
import Helmet from 'react-helmet';

import ReviewHeader from './Header';
import ReviewQuestion from './Question';
import ReviewAnswer from './Answer';
import ReviewInfo from './Info';
import ToggleBar from './ToggleBar';
import { Wrapper, Upper, Lower, ReviewBackground } from './styles';

function ReviewPanel() {
  return (
    <Wrapper>
      {/* <Helmet>
        <title>Review Session</title>
        <meta name="description" content="Kaniwani Review Session" />
      </Helmet>
      <Upper>
        <ReviewHeader />
        <ReviewQuestion />
      </Upper>
      <Lower>
        <ReviewAnswer />
        <ToggleBar />
        <ReviewInfo />
        <ReviewBackground />
      </Lower> */}
    </Wrapper>
  );
}

export default ReviewPanel;
