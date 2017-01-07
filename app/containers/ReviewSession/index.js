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
import ToggleBar from 'components/ToggleBar';

import { Wrapper, Upper, Lower, ReviewBackground } from './styles';
import { selectLoading, selectError } from 'containers/ReviewPage/selectors';
import { selectCurrentMeaning, selectCurrentReadings, selectCurrentSynonyms } from './selectors';

export class ReviewSession extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
    meaning: PropTypes.string.isRequired,
    readings: PropTypes.instanceOf(Immutable.Iterable).isRequired,
    synonyms: PropTypes.instanceOf(Immutable.Iterable),
  }

  render() {
    const { loading, error, meaning, readings, synonyms } = this.props;
    let content = meaning;

    // Show a loading indicator when we're loading
    if (loading || !meaning.length) {
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
          meta={[{ name: 'description', content: 'Kaniwani Review Session' }]}
        />
        <Upper>
          <ReviewHeader />
          {content}
        </Upper>
        <Lower>
          <ReviewAnswer />
          <ToggleBar />
          <ReviewInfo readings={readings} synonyms={synonyms} />
          <ReviewBackground />
        </Lower>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  meaning: selectCurrentMeaning(),
  readings: selectCurrentReadings(),
  synonyms: selectCurrentSynonyms(),
});

export default connect(mapStateToProps)(ReviewSession);
