import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withContentRect, MeasureProps } from 'react-measure';
import smoothScrollY from 'common/utils/smoothScrollY';
import { compose, branch, renderNothing } from 'recompose';
import { selectCurrentId } from 'features/quiz/QuizSession/selectors';
import { selectInfoDetailLevel, selectInfoDisabled, selectInfoOpen } from './selectors';

import VocabDetail from 'common/components/VocabDetail';
import { Wrapper } from './styles';

class QuizInfo extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    detailLevel: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    ...MeasureProps,
  };

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.isOpen && this.props.isOpen) ||
      (this.props.isOpen && prevProps.detailLevel !== this.props.detailLevel)
    ) {
      this.scrollIntoView();
    }
  }

<<<<<<< 2676324703b59b8349ee19ec41ad1d9462f08828
  scrollIntoView = () => smoothScrollY(this.props.contentRect.bounds.top - 20, 500);
=======
  scrollIntoView = () => smoothScrollY(this.props.contentRect.bounds.top);
>>>>>>> fix: less aggressive scroll top in quiz info

  render() {
    const { id, detailLevel, isOpen, isDisabled, measureRef } = this.props;
    const isMidDetail = detailLevel >= 1;
    const isHighDetail = detailLevel === 2;

    return (
      <Wrapper innerRef={measureRef} isMinimized={isDisabled || !isOpen}>
        <VocabDetail
          id={id}
          showFuri={isMidDetail}
          showSecondaryReadings={isMidDetail}
          showTags={isMidDetail}
          showLinks={isHighDetail}
          showSentence={isHighDetail}
          showPitch={isHighDetail}
          showStroke={isHighDetail}
          showNotes={isHighDetail}
          showLock={isHighDetail}
          showAddSynoynm={false}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  id: selectCurrentId(state, props),
  detailLevel: selectInfoDetailLevel(state, props),
  isOpen: selectInfoOpen(state, props),
  isDisabled: selectInfoDisabled(state, props),
});

const enhance = compose(
  connect(mapStateToProps),
  branch(({ id }) => Number.isNaN(+id), renderNothing),
  withContentRect('bounds')
);

export default enhance(QuizInfo);
