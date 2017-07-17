import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import titlecase from 'voca/title_case';
import { compose, branch, renderNothing } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { selectVocabExpanded } from 'containers/App/selectors';

import { SRS_RANKS } from 'shared/constants';
import VocabList from 'components/VocabList';
import StripeHeading from 'components/StripeHeading';
import { Wrapper } from './styles';

RankedVocabList.propTypes = {
  rank: PropTypes.oneOf(Object.values(SRS_RANKS)).isRequired,
  ids: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

function RankedVocabList({ rank, ids, color, isExpanded }) {
  return (
    <Wrapper>
      <StripeHeading text={titlecase(rank)} count={ids.length} />
      <VocabList ids={ids} color={color} isExpanded={isExpanded} />
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  isExpanded: selectVocabExpanded,
});

const enhance = compose(
  connect(mapStateToProps),
  branch(
    ({ ids }) => !ids.length,
    renderNothing,
  )
);

export default enhance(RankedVocabList);
