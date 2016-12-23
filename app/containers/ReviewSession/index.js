import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import ReviewHeader from 'containers/ReviewHeader';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewInfo from 'containers/ReviewInfo';
import {
  Wrapper,
  Upper,
  ReviewBackground,
} from './UI';

import {
 selectLoading,
 selectError,
} from 'containers/ReviewPage/selectors';

import {
  selectInfoToggleBarVisible,
} from 'containers/ReviewInfo/selectors';

import {
  selectCurrentMeaning,
  selectCurrentReadings,
} from './selectors';

export function ReviewSession({ loading, error, meaning, readings, isInfoBarVisible }) {
  let content = meaning;

  // Show a loading indicator when we're loading
  if (loading) {
    content = (<LoadingIndicator color="white" />);
  // Show an error if there is one
  } else if (error !== false) {
    content = `Something went wrong: "${error.msg}". Please contact us or try again!`;
  // If we're not loading, don't have an error and there is review data, show the review data
  } else if (!loading && !error && meaning.length) {
    content = (
      <ReviewQuestion
        meaning={meaning}
        tags={readings && readings.getIn([0, 'tags'])}
      />
    );
  }

  return (
    <Wrapper>
      <Helmet
        title="Review Session"
        meta={[
          { name: 'description', content: 'Kaniwani Review Session' },
        ]}
      />
      <Upper>
        <ReviewHeader />
        {content}
      </Upper>
      <ReviewAnswer />
      {/* FIXME:  need to put info and bg into same container so bg stops resizing and we get proper background in margins behind centered reviewInfo on larger screens */}
      {isInfoBarVisible && <ReviewInfo showToggleBar={isInfoBarVisible} readings={readings} />}
      <ReviewBackground />
    </Wrapper>
  );
}

ReviewSession.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  meaning: PropTypes.string.isRequired,
  isInfoBarVisible: PropTypes.bool.isRequired,
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  isInfoBarVisible: selectInfoToggleBarVisible(),
  meaning: selectCurrentMeaning(),
  readings: selectCurrentReadings(),
});

export default connect(mapStateToProps)(ReviewSession);
