import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import titleCase from 'voca/title_case';

import {
  selectLoading,
  selectTotalCount,
  selectCompleteCount,
  selectRemainingCount,
  selectQueue,
  selectCurrentItem,
  makeSelectPercentCorrect,
  makeSelectPercentComplete,
} from 'containers/SessionRoutes/selectors';
import actions from 'containers/App/actions';

import backgroundImage from 'shared/assets/img/reviews.svg';
import ReviewAnswerContainer from 'containers/ReviewAnswerContainer';
import ReviewInfoContainer from 'containers/ReviewInfoContainer';
import ReviewHeader from 'components/ReviewHeader';
import ReviewQuestion from 'components/ReviewQuestion';
import { Wrapper, Upper, Lower, ReviewBackgroundImg } from './styles';

class SessionPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    entry: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    queue: PropTypes.arrayOf(PropTypes.number).isRequired,
    total: PropTypes.number.isRequired,
    complete: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
    loadQueue: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { queue, total, loadQueue, match: { params: { category } } } = this.props;
    if (total > 0 && queue.length <= 0) {
      loadQueue({}, { category });
    }
  }

  componentDidUpdate() {
    // const { queue, remaining, complete, loadQueue, match: { params: { category } } } = this.props;
    // const needMoreReviews = queue.length < 10 && queue.length < remaining;
    // if (needMoreReviews) {
    //   loadQueue({ offset: complete }, { category });
    // }
  }

  render() {
    const { match: { params: { category } }, entry, ...props } = this.props;
    const title = `${titleCase(category)} Session`;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={`Kaniwani ${title}`} />
        </Helmet>
        {entry && (
          <Wrapper>
            <Upper>
              <ReviewHeader category={category} {...props} />
              <ReviewQuestion {...entry.vocabulary} />
            </Upper>
            <Lower>
              <ReviewAnswerContainer streakName={entry.streakName} />
              <ReviewInfoContainer entry={entry} />
              <ReviewBackgroundImg imgSrc={backgroundImage} />
            </Lower>
            </Wrapper>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  total: selectTotalCount,
  complete: selectCompleteCount,
  remaining: selectRemainingCount,
  queue: selectQueue,
  entry: selectCurrentItem,
  percentCorrect: makeSelectPercentCorrect(),
  percentComplete: makeSelectPercentComplete(),
});

const mapDispatchToProps = (dispatch) => ({
  loadQueue: (payload, meta) => dispatch(actions.queue.load.request(payload, meta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
