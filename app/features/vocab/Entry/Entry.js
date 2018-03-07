import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { review } from 'features/reviews/actions';
import { selectShouldLoad, selectLastLoad, selectReviewVocabIds } from 'features/reviews/selectors';
import { selectVocabById } from 'features/vocab/selectors';

import A from 'common/components/A';
import H1 from 'common/components/H1';
import H3 from 'common/components/H3';
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
    level: PropTypes.number,
  };

  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadReview();
    }
  }

  render() {
    const { id, level, lastLoad } = this.props;
    return !lastLoad ? (
      <Spinner />
    ) : (
      <Fragment>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <VocabMeaning id={id} renderPrimary={({ text }) => <H1>{text}</H1>} />
          <H3 style={{ fontWeight: '400' }}>
            <A to={`/vocabulary/levels/${level}`}>Level {level}</A>
          </H3>
        </div>
        <VocabDetail id={id} />
        <VocabStats id={id} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const vocabId = selectReviewVocabIds(state, props)[0];
  const { level } = selectVocabById(state, { id: vocabId });
  return {
    shouldLoad: selectShouldLoad(state, props),
    lastLoad: selectLastLoad(state, props),
    level,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  loadReview: () => dispatch(review.load.request(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabEntry);
