import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectIdFromMatch } from 'shared/selectors';
import actions from 'shared/actions';

import View from './View';

export class VocabEntryPage extends React.Component {
  static propTypes = {
    loadReview: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.loadReview(this.props.id);
  }

  render() {
    return <View {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  id: selectIdFromMatch(props),
});

const mapDispatchToProps = (dispatch) => ({
  loadReview: (id) => dispatch(actions.review.load.request({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntryPage);
