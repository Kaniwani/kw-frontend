import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  loadReviewData,
} from './actions';

import {
  selectQueue,
} from './selectors';

export class ReviewPage extends React.Component {
  // FIXME: move to review session - this is loading on summary page hits etc
  componentDidMount() {
    if (this.props.queue.size < 5) this.props.loadReviewData();
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

ReviewPage.propTypes = {
  children: PropTypes.element,
  queue: PropTypes.object.isRequired,
  loadReviewData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  queue: selectQueue(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadReviewData: () => dispatch(loadReviewData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPage);
