import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import titleCase from 'voca/title_case';

import actions from 'containers/App/actions';
import {
  selectCompleteCount,
  selectRemainingCount,
  selectQueue,
  selectCurrentItem,
  selectTotalCount,
  makeSelectPercentCorrect,
  makeSelectPercentComplete,
} from 'containers/App/selectors';

import backgroundImage from 'shared/assets/img/reviews.svg';
import ReviewAnswerContainer from 'containers/ReviewAnswerContainer';
import ReviewInfoContainer from 'containers/ReviewInfoContainer';
import ReviewHeader from 'components/ReviewHeader';
import ReviewQuestion from 'components/ReviewQuestion';
import { Wrapper, Upper, Lower, ReviewBackgroundImg } from './styles';

class SessionPage extends React.Component {
  static propTypes = {
    entry: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
    queue: PropTypes.arrayOf(PropTypes.number).isRequired,
    total: PropTypes.number.isRequired,
    complete: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    loadQueue: PropTypes.func.isRequired,
    setNewCurrent: PropTypes.func.isRequired,
  }

  // componentDidUpdate() {
  //   const { queue, entry, remaining, complete, loadQueue, setNewCurrent, category } = this.props;
  //   const needMoreReviews = queue.length < 10 && queue.length < remaining;
  //   const needCurrent = queue.length && !entry;
  //   console.log({ needMoreReviews, needCurrent });
  //   // FIXME: in logic: that fires after set new current (IE. queue reduction)
  //   if (needMoreReviews) {
  //     loadQueue({ offset: complete }, { category });
  //   }
  //   // FIXME: in logic: set new current after loading queue success if no current set..
  //   if (needCurrent) {
  //     setNewCurrent();
  //   }
  // }

  render() {
    const { category, entry, ...props } = this.props;
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

const mapStateToProps = (state, props) => ({
  total: selectTotalCount(state, { category: props.match.params.category }),
  complete: selectCompleteCount(state),
  remaining: selectRemainingCount(state),
  queue: selectQueue(state),
  entry: selectCurrentItem(state),
  percentCorrect: makeSelectPercentCorrect()(state),
  percentComplete: makeSelectPercentComplete()(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadQueue: (payload, meta) => dispatch(actions.queue.load.request(payload, meta)),
  setNewCurrent: () => dispatch(actions.queue.current.set()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
