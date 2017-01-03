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
  // FIXME: move loading to occur if queue size < 10 on take('LOAD_STORAGE')
  componentDidMount() {
    console.log('queue size', this.props.queue.size);
    if (this.props.queue.size < 10) this.props.loadReviewData();
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
