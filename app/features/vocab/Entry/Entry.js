import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { review } from 'features/reviews/actions';
import { selectShouldLoad, selectLastLoad } from 'features/reviews/selectors';

import Spinner from 'common/components/Spinner';
import VocabDetail from 'common/components/VocabDetail';

export class VocabEntry extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    shouldLoad: PropTypes.bool.isRequired,
    lastLoad: PropTypes.any.isRequired,
    loadReview: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadReview();
    }
  }

  render() {
    const { id, lastLoad } = this.props;
    return !lastLoad ? <Spinner /> : <VocabDetail id={id} />;
  }
}

const mapStateToProps = (state, props) => ({
  shouldLoad: selectShouldLoad(state, props),
  lastLoad: selectLastLoad(state, props),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadReview: () => dispatch(review.load.request(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntry);
