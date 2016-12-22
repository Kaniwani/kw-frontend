import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import ReviewHeader from 'containers/ReviewHeader';
import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewInfo from 'containers/ReviewInfo';
import ReviewQuestion from 'components/ReviewQuestion';
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
  selectInfoVisible,
  selectInfoFullDetails,
} from 'containers/ReviewInfo/selectors';

import {
  selectCurrentMeaning,
  selectCurrentReadings,
} from './selectors';

export function ReviewSession({ loading, error, meaning, readings, isInfoVisible, isFullyDetailed }) {
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
      {/*  need to put info and bg into same container so bg stops resizing */}
      {isInfoVisible && <ReviewInfo fullDetails={isFullyDetailed} readings={readings} />}
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
  isInfoVisible: PropTypes.bool.isRequired,
  isFullyDetailed: PropTypes.bool.isRequired,
  meaning: PropTypes.string.isRequired,
  readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  isInfoVisible: selectInfoVisible(),
  isFullyDetailed: selectInfoFullDetails(),
  meaning: selectCurrentMeaning(),
  readings: selectCurrentReadings(),
});

export default connect(mapStateToProps)(ReviewSession);
