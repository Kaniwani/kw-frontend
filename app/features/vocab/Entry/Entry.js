import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { review } from 'features/reviews/actions';
import { selectShouldLoad, selectLastLoad } from 'features/reviews/selectors';

import Aux from 'common/components/Aux';
import H1 from 'common/components/H1';
import Spinner from 'common/components/Spinner';
import VocabMeaning from 'common/components/VocabMeaning';
import VocabDetail from 'common/components/VocabDetail';
import VocabStats from './VocabStats';

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
    return !lastLoad ? (
      <Spinner />
    ) : (
      <Aux>
        <VocabMeaning id={id} renderPrimary={({ text }) => <H1>{text}</H1>} />
        <VocabDetail id={id} />
        <VocabStats id={id} />
      </Aux>
    );
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
