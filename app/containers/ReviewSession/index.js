import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import ReviewHeader from 'containers/ReviewHeader';
import ReviewQuestion from 'components/ReviewQuestion';
import ReviewAnswer from 'containers/ReviewAnswer';
import ReviewInfo from 'containers/ReviewInfo';
import ToggleBar from 'components/ToggleBar';

import { ReviewEntryRecord } from 'shared/models';
import { Wrapper, Upper, Lower, ReviewBackground } from './styles';
import globalActions from 'containers/App/actions';
import actions from './actions';
import { selectLoading, selectError } from 'containers/ReviewPage/selectors';
import { selectQueueCount, selectCurrent } from './selectors';

export class ReviewSession extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]).isRequired,
    current: PropTypes.instanceOf(ReviewEntryRecord),
    queueCount: PropTypes.number.isRequired,
    loadData: PropTypes.func.isRequired,
    setNewCurrent: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { queueCount, current, loadData, setNewCurrent } = this.props;
    if (queueCount < 10) {
      loadData(!!queueCount); // show loading indicator if nothing in queue
    } if (queueCount && !current) {
      setNewCurrent();
    }
  }

  render() {
    const { loading, error, current } = this.props;
    const isLoading = loading || !current;
    const isLoaded = !loading && !error && current != null;
    return (
      <Wrapper>
        <Helmet
          title="Review Session"
          meta={[{ name: 'description', content: 'Kaniwani Review Session' }]}
        />
        <Upper>
          <ReviewHeader />
          {isLoading && <LoadingIndicator color="white" />}
          {isLoaded &&
            <ReviewQuestion
              meaning={current.vocabulary.meanings.join(', ')}
              tags={current.vocabulary.readings.first().tags}
            />
          }
        </Upper>
        <Lower>
          {isLoaded && <ReviewAnswer /> }
          {isLoaded && <ToggleBar /> }
          {isLoaded && <ReviewInfo item={current} /> }
          <ReviewBackground />
        </Lower>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  error: selectError,
  queueCount: selectQueueCount,
  current: selectCurrent,
});

const mapDispatchToProps = (dispatch) => ({
  loadData: (payload) => dispatch(globalActions.loadReviewsRequest(payload)),
  setNewCurrent: () => dispatch(actions.setNewCurrent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSession);
